import { readFileSync } from 'fs';

const raw = readFileSync('src/content/case-study-details.ts', 'utf8');

// Strip TypeScript interfaces (everything before the export const)
const constStart = raw.indexOf('export const caseStudyDetails');
const jsonStart = raw.indexOf('{', constStart);
let jsonText = raw.slice(jsonStart);
// Remove trailing semicolons and exports
jsonText = jsonText.replace(/;\s*$/, '');

// Parse using eval workaround: extract just the object
try {
  const obj = eval('(' + jsonText + ')');
  const slugs = Object.keys(obj);
  console.log(`Total case studies in TS: ${slugs.length}`);
  console.log('');
  
  slugs.forEach((slug, i) => {
    const cs = obj[slug];
    const sections = cs.sections || [];
    console.log(`[${i+1}] ${slug}`);
    sections.forEach(sec => {
      const hasFooter = sec.content && typeof sec.content === 'object' && sec.content.footer;
      const hasContent = sec.content && (typeof sec.content === 'string' || sec.content.body || sec.content.items);
      console.log(`      - [${sec.id}] type=${sec.type} | footer=${hasFooter ? 'YES' : 'no'}`);
    });
    console.log('');
  });
} catch(e) {
  console.error('Parse error:', e.message);
  // Show location
  const lines = jsonText.split('\n');
  const errLine = parseInt(e.stack?.match(/:(\d+):/)?.[1] || 0);
  console.log('Around line', errLine);
  for(let i = Math.max(0, errLine-3); i < Math.min(lines.length, errLine+3); i++) {
    console.log(i+1, lines[i]);
  }
}
