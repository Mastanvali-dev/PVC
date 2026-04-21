import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");

    const db = mongoose.connection.db;
    const ordersCollection = db.collection("orders");

    // Find orders with old URL fields
    const orders = await ordersCollection.find({ 
      $or: [
        { "rcImages.frontUrl": { $exists: true } },
        { "rcImages.backUrl": { $exists: true } }
      ] 
    }).toArray();

    console.log(`Found ${orders.length} orders to migrate keys.`);

    let updated = 0;

    for (const order of orders) {
      console.log(`Migrating order ${order._id}...`);
      
      let frontKey = "";
      let backKey = "";

      if (order.rcImages?.frontUrl) {
        // Extract filename from URL
        frontKey = order.rcImages.frontUrl.split('/').pop();
      }

      if (order.rcImages?.backUrl) {
        backKey = order.rcImages.backUrl.split('/').pop();
      }

      const updateResult = await ordersCollection.updateOne(
        { _id: order._id },
        { 
          $set: { 
            "rcImages.frontKey": frontKey, 
            "rcImages.backKey": backKey 
          },
          $unset: { 
            "rcImages.frontUrl": "", 
            "rcImages.backUrl": "" 
          }
        }
      );

      if (updateResult.modifiedCount > 0) {
        updated++;
        console.log(`✅ Migrated order ${order._id}`);
      }
    }

    console.log(`Migration complete. Updated ${updated} orders.`);
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

migrate();
