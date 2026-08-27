import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const srcDir = join(process.cwd(), "public", "videos");
const destDir = join(process.cwd(), ".next", "static", "videos");

if (!existsSync(srcDir)) {
  console.error(`[copy-site-videos] Missing source dir: ${srcDir}`);
  process.exit(1);
}

mkdirSync(destDir, { recursive: true });

const files = readdirSync(srcDir).filter((f) => f.toLowerCase().endsWith(".mp4"));
if (files.length === 0) {
  console.error("[copy-site-videos] No .mp4 files found in public/videos");
  process.exit(1);
}

for (const file of files) {
  const from = join(srcDir, file);
  const to = join(destDir, file);
  const size = statSync(from).size;

  // Guard against Git LFS pointer files (~130 bytes of text)
  if (size < 10_000) {
    console.error(`[copy-site-videos] ${file} is only ${size} bytes — likely an LFS pointer`);
    process.exit(1);
  }

  copyFileSync(from, to);
  console.log(`[copy-site-videos] ${file} → .next/static/videos/ (${size} bytes)`);
}
