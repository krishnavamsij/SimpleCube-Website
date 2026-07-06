#!/usr/bin/env node

/**
 * Find Old Container Patterns
 * 
 * This script finds all components that still use old container patterns
 * and need to be updated to use the new standardized CONTAINER_CLASS.
 * 
 * Usage: node find-old-containers.mjs
 */

import { readdir, readFile } from 'fs/promises';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Patterns to search for
const OLD_PATTERNS = [
  /className="[^"]*mx-auto[^"]*max-w-\[1400px\][^"]*px-6/g,
  /className="[^"]*mx-auto[^"]*max-w-6xl[^"]*px-6/g,
  /className="[^"]*mx-auto[^"]*max-w-7xl[^"]*px-6/g,
  /className="[^"]*mx-auto[^"]*max-w-\[1200px\][^"]*px-6/g,
  /className="[^"]*mx-auto[^"]*max-w-\[1600px\][^"]*px-6/g,
];

// Files already updated
const UPDATED_FILES = [
  'hero-carousel.tsx',
  'approach.tsx',
  'navbar.tsx',
  'footer.tsx',
  'container-utils.ts',
];

async function findFiles(dir, pattern = /\.(tsx?|jsx?)$/) {
  const files = [];
  
  async function scan(currentDir) {
    const entries = await readdir(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name);
      
      // Skip node_modules, .next, .git
      if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') {
        continue;
      }
      
      if (entry.isDirectory()) {
        await scan(fullPath);
      } else if (pattern.test(entry.name)) {
        files.push(fullPath);
      }
    }
  }
  
  await scan(dir);
  return files;
}

async function analyzeFile(filePath) {
  const content = await readFile(filePath, 'utf-8');
  const matches = [];
  
  for (const pattern of OLD_PATTERNS) {
    const found = content.match(pattern);
    if (found) {
      matches.push(...found);
    }
  }
  
  return matches.length > 0 ? { path: filePath, matches } : null;
}

async function main() {
  console.log('🔍 Scanning for old container patterns...\n');
  
  const srcDir = join(__dirname, 'src');
  const files = await findFiles(srcDir);
  
  const results = [];
  
  for (const file of files) {
    const fileName = file.split(/[\\/]/).pop();
    
    // Skip already updated files
    if (UPDATED_FILES.includes(fileName)) {
      continue;
    }
    
    const result = await analyzeFile(file);
    if (result) {
      results.push(result);
    }
  }
  
  if (results.length === 0) {
    console.log('✅ All files are up to date! No old container patterns found.\n');
    return;
  }
  
  console.log(`Found ${results.length} file(s) with old container patterns:\n`);
  
  // Group by directory
  const byDir = {};
  for (const result of results) {
    const relPath = relative(__dirname, result.path);
    const dir = relPath.split(/[\\/]/)[1]; // src/components, src/app, etc.
    
    if (!byDir[dir]) {
      byDir[dir] = [];
    }
    byDir[dir].push(relPath);
  }
  
  // Print grouped results
  for (const [dir, paths] of Object.entries(byDir)) {
    console.log(`📁 ${dir}/`);
    for (const path of paths) {
      const fileName = path.split(/[\\/]/).pop();
      console.log(`   - ${fileName}`);
    }
    console.log('');
  }
  
  console.log('\n📋 To fix these files:\n');
  console.log('1. Add import at the top:');
  console.log('   import { CONTAINER_CLASS } from "@/lib/container-utils";\n');
  console.log('2. Replace old pattern with:');
  console.log('   className={CONTAINER_CLASS}\n');
  console.log('3. Or if combining with other classes:');
  console.log('   className={`other-classes ${CONTAINER_CLASS}`}\n');
  
  console.log(`\n⚠️  Total files to update: ${results.length}`);
  console.log('✅ Already updated: 4 files (hero-carousel, approach, navbar, footer)\n');
}

main().catch(console.error);
