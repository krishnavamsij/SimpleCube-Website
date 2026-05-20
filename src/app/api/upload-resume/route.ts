import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx"]);
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const awsRegion = process.env.AWS_REGION;
const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.AWS_BUCKET_NAME;

const s3Client =
  awsRegion && awsAccessKeyId && awsSecretAccessKey
    ? new S3Client({
        region: awsRegion,
        credentials: {
          accessKeyId: awsAccessKeyId,
          secretAccessKey: awsSecretAccessKey,
        },
      })
    : null;

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_");
}

export async function POST(request: Request) {
  try {
    if (!s3Client || !bucketName || !awsRegion) {
      return NextResponse.json(
        { error: "Resume upload service is not configured." },
        { status: 500 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("resume");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Please attach your resume file." },
        { status: 400 },
      );
    }

    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !ALLOWED_EXTENSIONS.has(fileExtension)) {
      return NextResponse.json(
        { error: "Only PDF, DOC, and DOCX files are allowed." },
        { status: 400 },
      );
    }

    if (file.type && !ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Only PDF, DOC, and DOCX files are allowed." },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Resume file must be 5MB or smaller." },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const safeName = sanitizeFileName(file.name);
    const key = `resumes/${Date.now()}_${safeName}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: file.type || "application/octet-stream",
      }),
    );

    const url = `https://${bucketName}.s3.${awsRegion}.amazonaws.com/${key}`;
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Resume upload failed:", error);
    return NextResponse.json(
      { error: "Unable to upload resume at the moment. Please try again." },
      { status: 500 },
    );
  }
}
