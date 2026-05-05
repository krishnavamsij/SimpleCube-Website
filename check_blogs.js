const fs = require('fs');
const content = fs.readFileSync('src/content/blog-details.ts', 'utf-8');
const matches = content.match(/^[ \t]+"[^"]+": \{/gm);
console.log('Keys in blogDetails:', matches ? matches.length : 0);
