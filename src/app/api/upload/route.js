import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const frontFile = formData.get("front");
    const backFile = formData.get("back");

    if (!frontFile) {
      return NextResponse.json({ error: "Front file is required" }, { status: 400 });
    }

const uploadToR2 = async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      
      const uploadParams = {
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
      };

      await s3Client.send(new PutObjectCommand(uploadParams));

      return fileName;
    };

    const frontKey = await uploadToR2(frontFile);
    let backKey = "";

    if (backFile && backFile !== "null") {
      backKey = await uploadToR2(backFile);
    }

    return NextResponse.json({ frontKey, backKey }, { status: 200 });

  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Failed to upload files" }, { status: 500 });
  }
}
