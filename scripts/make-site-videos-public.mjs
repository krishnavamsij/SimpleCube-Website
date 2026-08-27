/**
 * Make site-videos/* publicly readable on the configured bucket.
 * Usage: node --env-file=.env.local scripts/make-site-videos-public.mjs
 */
import {
  S3Client,
  GetBucketPolicyCommand,
  PutBucketPolicyCommand,
  GetPublicAccessBlockCommand,
  PutPublicAccessBlockCommand,
} from "@aws-sdk/client-s3";

const region = process.env.REGION || process.env.AWS_REGION || "us-east-1";
const accessKeyId = process.env.ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;
const bucket = process.env.BUCKET_NAME;

if (!accessKeyId || !secretAccessKey || !bucket) {
  console.error("Missing ACCESS_KEY_ID / SECRET_ACCESS_KEY / BUCKET_NAME");
  process.exit(1);
}

const client = new S3Client({
  region,
  credentials: { accessKeyId, secretAccessKey },
});

// Relax block-public-policy so we can attach a prefix policy (keep block ACL).
try {
  const current = await client.send(new GetPublicAccessBlockCommand({ Bucket: bucket }));
  console.log("Current PublicAccessBlock:", JSON.stringify(current.PublicAccessBlockConfiguration));
} catch (e) {
  console.log("GetPublicAccessBlock:", e.name || e.message);
}

try {
  await client.send(
    new PutPublicAccessBlockCommand({
      Bucket: bucket,
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        IgnorePublicAcls: true,
        BlockPublicPolicy: false,
        RestrictPublicBuckets: false,
      },
    })
  );
  console.log("Updated PublicAccessBlock to allow public bucket policy on prefix");
} catch (e) {
  console.error("PutPublicAccessBlock failed:", e.name || e.message);
  // continue; policy put may still work
}

let existing = {};
try {
  const res = await client.send(new GetBucketPolicyCommand({ Bucket: bucket }));
  existing = JSON.parse(res.Policy || "{}");
} catch (e) {
  if (e.name !== "NoSuchBucketPolicy") {
    console.log("GetBucketPolicy:", e.name || e.message);
  }
  existing = { Version: "2012-10-17", Statement: [] };
}

if (!Array.isArray(existing.Statement)) existing.Statement = [];
existing.Version = existing.Version || "2012-10-17";

const sid = "PublicReadSiteVideos";
existing.Statement = existing.Statement.filter((s) => s.Sid !== sid);
existing.Statement.push({
  Sid: sid,
  Effect: "Allow",
  Principal: "*",
  Action: ["s3:GetObject"],
  Resource: [`arn:aws:s3:::${bucket}/site-videos/*`],
});

await client.send(
  new PutBucketPolicyCommand({
    Bucket: bucket,
    Policy: JSON.stringify(existing),
  })
);

console.log("Bucket policy updated for public GetObject on site-videos/*");
