import { readFileSync, writeFileSync } from 'fs';

let content = readFileSync('src/content/case-study-details.ts', 'utf8');

// The broken pattern: content object closes with },\n then "footer": ... as a separate section-level field
// We need to:
//   1. Remove the premature closing }, of content 
//   2. Put footer INSIDE content before the closing }

// Find the specific broken block using the unique surrounding text
const broken = `                    ]\r\n                },\n                    "footer": "<div class=\\"cs-section__body\\" style=\\"margin-top:24px;\\">\\n        <p>Enabling agencies to operate with greater speed, accuracy, and confidence — built on a platform designed to continuously adapt and scale.</p>\\n      </div>"\r\n            },`;

const fixed = `                    ],\n                    "footer": "<div class=\\"cs-section__body\\" style=\\"margin-top:24px;\\">\\n        <p>Enabling agencies to operate with greater speed, accuracy, and confidence — built on a platform designed to continuously adapt and scale.</p>\\n      </div>"\r\n                }\r\n            },`;

if (content.includes(broken)) {
  content = content.replace(broken, fixed);
  writeFileSync('src/content/case-study-details.ts', content, 'utf8');
  console.log('✅ Fixed the misplaced footer field in Campaign Management case study.');
} else {
  // Try normalizing line endings
  const brokenNorm = broken.replace(/\r\n/g, '\n');
  const contentNorm = content.replace(/\r\n/g, '\n');
  if (contentNorm.includes(brokenNorm)) {
    const fixedNorm = fixed.replace(/\r\n/g, '\n');
    const result = contentNorm.replace(brokenNorm, fixedNorm);
    writeFileSync('src/content/case-study-details.ts', result, 'utf8');
    console.log('✅ Fixed (with line-ending normalization).');
  } else {
    // Print what we actually see around line 1265
    const lines = content.split('\n');
    console.log('❌ Pattern not found. Showing lines 1262-1268:');
    for (let i = 1261; i <= 1268; i++) {
      console.log(`Line ${i+1}: ${JSON.stringify(lines[i])}`);
    }
  }
}
