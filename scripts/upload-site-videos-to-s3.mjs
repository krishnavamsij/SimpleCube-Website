/**
 * Upload site videos to S3 for production playback (bypasses Amplify LFS/public packaging).
 * Usage: node --env-file=.env.local scripts/upload-site-videos-to-s3.mjs
 */
import { createReadStream, statSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";

const region = process.env.REGION || process.env.AWS_REGION || "us-east-1";
const accessKeyId = process.env.ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;
const bucket = process.env.BUCKET_NAME;

if (!accessKeyId || !secretAccessKey || !bucket) {
  console.error("Missing ACCESS_KEY_ID / SECRET_ACCESS_KEY / BUCKET_NAME");
  process.exit(1);
}

const prefix = "site-videos";
const srcDir = join(process.cwd(), "public", "videos");
const files = readdirSync(srcDir).filter((f) => f.toLowerCase().endsWith(".mp4"));

const client = new S3Client({
  region,
  credentials: { accessKeyId, secretAccessKey },
});

const urls = [];

for (const file of files) {
  const filePath = join(srcDir, file);
  const size = statSync(filePath).size;
  if (size < 10_000) {
    console.error(`${file} looks like an LFS pointer (${size} bytes)`);
    process.exit(1);
  }

  const key = `${prefix}/${file}`;
  console.log(`Uploading s3://${bucket}/${key} (${size} bytes)...`);

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: createReadStream(filePath),
      ContentType: "video/mp4",
      CacheControl: "public, max-age=31536000, immutable",
      // ACL may fail if bucket has ACLs disabled; try without on retry below
      ACL: "public-read",
    })
  ).catch(async (err) => {
    if (String(err?.name || err).includes("AccessControlListNotSupported") || err?.Code === "AccessControlListNotSupported") {
      console.log(`ACL not supported; uploading ${key} without ACL...`);
      await client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: createReadStream(filePath),
          ContentType: "video/mp4",
          CacheControl: "public, max-age=31536000, immutable",
        })
      );
      return;
    }
    throw err;
  });

  // Verify object exists
  await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));

  const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
  urls.push({ file, url, size });
  console.log(`OK ${url}`);
}

console.log("\nUploaded:");
for (const u of urls) console.log(`- ${u.file}: ${u.url}`);
