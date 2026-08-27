/**
 * Allow browser <video> range requests from the website origins.
 * Usage: node --env-file=.env.local scripts/set-site-videos-cors.mjs
 */
import { S3Client, PutBucketCorsCommand, GetBucketCorsCommand } from "@aws-sdk/client-s3";

const region = process.env.REGION || process.env.AWS_REGION || "us-east-1";
const accessKeyId = process.env.ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;
const bucket = process.env.BUCKET_NAME;

const client = new S3Client({
  region,
  credentials: { accessKeyId, secretAccessKey },
});

const CORSRules = [
  {
    AllowedHeaders: ["*"],
    AllowedMethods: ["GET", "HEAD"],
    AllowedOrigins: [
      "https://www.hyniva.com",
      "https://hyniva.com",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ],
    ExposeHeaders: ["Accept-Ranges", "Content-Range", "Content-Length", "Content-Type", "ETag"],
    MaxAgeSeconds: 86400,
  },
];

await client.send(
  new PutBucketCorsCommand({
    Bucket: bucket,
    CORSConfiguration: { CORSRules },
  })
);

const current = await client.send(new GetBucketCorsCommand({ Bucket: bucket }));
console.log("CORS set:", JSON.stringify(current.CORSRules, null, 2));
