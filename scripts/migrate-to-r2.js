import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const base64ToBuffer = (base64) => {
  // Extract content type and base64 string
  const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (matches.length !== 3) {
    throw new Error("Invalid input string");
  }

  const contentType = matches[1];
  const buffer = Buffer.from(matches[2], "base64");
  
  // Determine extension
  let ext = "png";
  if (contentType === "application/pdf") ext = "pdf";
  else if (contentType === "image/jpeg") ext = "jpg";

  return { buffer, contentType, ext };
};

const uploadBuffer = async (buffer, contentType, ext) => {
  const fileName = `${uuidv4()}.${ext}`;
  const uploadParams = {
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ContentType: contentType,
  };

  await s3Client.send(new PutObjectCommand(uploadParams));
  return `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${fileName}`;
};

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");

    const db = mongoose.connection.db;
    const ordersCollection = db.collection("orders");

    // Find orders that still have frontBase64
    const orders = await ordersCollection.find({ "rcImages.frontBase64": { $exists: true } }).toArray();
    console.log(`Found ${orders.length} orders to migrate.`);

    for (const order of orders) {
      console.log(`Migrating order ${order._id}...`);
      
      let frontUrl = "";
      let backUrl = "";

      if (order.rcImages.frontBase64) {
        const { buffer, contentType, ext } = base64ToBuffer(order.rcImages.frontBase64);
        frontUrl = await uploadBuffer(buffer, contentType, ext);
      }

      if (order.rcImages.backBase64) {
        const { buffer, contentType, ext } = base64ToBuffer(order.rcImages.backBase64);
        backUrl = await uploadBuffer(buffer, contentType, ext);
      }

      await ordersCollection.updateOne(
        { _id: order._id },
        { 
          $set: { "rcImages.frontUrl": frontUrl, "rcImages.backUrl": backUrl },
          $unset: { "rcImages.frontBase64": "", "rcImages.backBase64": "" }
        }
      );

      console.log(`Successfully migrated order ${order._id}.`);
    }

    console.log("Migration completed.");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

migrate();
