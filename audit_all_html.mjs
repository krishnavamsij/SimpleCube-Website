
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HTML_DIR = path.join(__dirname, 'public/images/Case_Studies/HTML page references');
const TS_FILE  = path.join(__dirname, 'src/content/case-study-details.ts');

// ─── helpers ────────────────────────────────────────────────────────────────
function stripTags(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}
function innerHtml(html, tagSelector) {
  // extract content between tags for a given id/class match
  const re = new RegExp(`id="${tagSelector}"[^>]*>([\\s\\S]*?)<\\/section>`, 'i');
  const m = html.match(re);
  return m ? m[1] : null;
}
function extractSection(html, id) {
  const re = new RegExp(`<section[^>]*id="${id}"[^>]*>([\\s\\S]*?)<\\/section>`, 'i');
  const m = html.match(re);
  return m ? m[1] : null;
}
function extractParagraphs(sectionHtml) {
  if (!sectionHtml) return [];
  const re = /<p>([\s\S]*?)<\/p>/gi;
  const results = [];
  let m;
  while ((m = re.exec(sectionHtml)) !== null) {
    results.push(stripTags(m[1]));
  }
  return results;
}
function extractApproachItems(sectionHtml) {
  if (!sectionHtml) return [];
  const re = /<div class="approach-item">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi;
  const items = [];
  let m;
  while ((m = re.exec(sectionHtml)) !== null) {
    const block = m[1];
    const titleMatch = block.match(/approach-item__title">([\s\S]*?)<\/div>/i);
    const descMatch  = block.match(/approach-item__desc">([\s\S]*?)<\/div>/i);
    if (titleMatch) {
      items.push({
        title: stripTags(titleMatch[1]),
        desc:  descMatch ? stripTags(descMatch[1]) : ''
      });
    }
  }
  return items;
}
function extractImpactCards(sectionHtml) {
  if (!sectionHtml) return [];
  const re = /<div class="impact-card">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi;
  const items = [];
  let m;
  while ((m = re.exec(sectionHtml)) !== null) {
    const block = m[1];
    const statMatch  = block.match(/impact-card__stat">([\s\S]*?)<\/div>/i);
    const labelMatch = block.match(/impact-card__label">([\s\S]*?)<\/div>/i);
    const descMatch  = block.match(/impact-card__desc">([\s\S]*?)<\/div>/i);
    if (statMatch) {
      items.push({
        value: stripTags(statMatch[1]),
        label: labelMatch ? stripTags(labelMatch[1]) : '',
        desc:  descMatch  ? stripTags(descMatch[1])  : ''
      });
    }
  }
  return items;
}
function extractOutcomeItems(sectionHtml) {
  if (!sectionHtml) return [];
  const re = /<div class="outcome-item">([\s\S]*?)<\/div>\s*<\/div>/gi;
  const items = [];
  let m;
  while ((m = re.exec(sectionHtml)) !== null) {
    items.push(stripTags(m[1]));
  }
  return items;
}
function extractFutureTags(sectionHtml) {
  if (!sectionHtml) return [];
  const re = /<div class="future-tag">([\s\S]*?)<\/div>/gi;
  const items = [];
  let m;
  while ((m = re.exec(sectionHtml)) !== null) {
    const text = stripTags(m[1]).replace(/^·?\s*/, '').trim();
    if (text) items.push(text);
  }
  return items;
}
function extractMetrics(html) {
  const re = /<div class="m-tile">([\s\S]*?)<\/div>\s*<\/div>/gi;
  const items = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    const block = m[1];
    const iconMatch  = block.match(/m-tile__icon">([\s\S]*?)<\/div>/i);
    const valMatch   = block.match(/m-tile__value">([\s\S]*?)<\/div>/i);
    const labelMatch = block.match(/m-tile__label">([\s\S]*?)<\/div>/i);
    const subMatch   = block.match(/m-tile__sub">([\s\S]*?)<\/div>/i);
    if (valMatch) {
      items.push({
        icon:  iconMatch  ? stripTags(iconMatch[1]).trim()  : '',
        value: stripTags(valMatch[1]).trim(),
        label: labelMatch ? stripTags(labelMatch[1]).trim() : '',
        sub:   subMatch   ? stripTags(subMatch[1]).replace('&nbsp;','').trim() : ''
      });
    }
  }
  return items;
}
function extractBannerTitle(html) {
  const m = html.match(/<h1 class="banner__heading">([\s\S]*?)<\/h1>/i);
  return m ? m[1].trim() : '';
}
function extractSummary(html) {
  const m = html.match(/<p class="banner__summary">([\s\S]*?)<\/p>/i);
  return m ? stripTags(m[1]).trim() : '';
}
function extractEyebrow(html) {
  const m = html.match(/b-eyebrow__text">([\s\S]*?)<\/span>/i);
  if (!m) return '';
  return stripTags(m[1]).replace(/Case Study\s*·\s*/i, '').trim();
}
function extractCTAHeading(html) {
  const m = html.match(/cs-cta__heading">([\s\S]*?)<\/div>/i);
  return m ? stripTags(m[1]).trim() : '';
}
function extractFeatureGrid(sectionHtml) {
  if (!sectionHtml) return [];
  const re = /<div class="impact-card">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi;
  const items = [];
  let m;
  while ((m = re.exec(sectionHtml)) !== null) {
    const block = m[1];
    const iconMatch  = block.match(/class="impact-card__stat">([\s\S]*?)<\/div>/i);
    const titleMatch = block.match(/class="impact-card__label">([\s\S]*?)<\/div>/i);
    const textMatch  = block.match(/class="impact-card__desc">([\s\S]*?)<\/div>/i);
    if (titleMatch) {
      items.push({
        icon:  iconMatch ? stripTags(iconMatch[1]).trim() : '',
        title: stripTags(titleMatch[1]),
        text:  textMatch ? stripTags(textMatch[1]) : ''
      });
    }
  }
  return items;
}

// ─── parse all HTML files ───────────────────────────────────────────────────
const files = fs.readdirSync(HTML_DIR).filter(f => f.endsWith('.html')).sort((a,b)=>{
  return parseInt(a)-parseInt(b);
});

const report = [];

for (const file of files) {
  const html = fs.readFileSync(path.join(HTML_DIR, file), 'utf-8');
  const num  = parseInt(file);

  const eyebrow    = extractEyebrow(html);
  const title      = extractBannerTitle(html);
  const summary    = extractSummary(html);
  const metrics    = extractMetrics(html);
  const ctaHeading = extractCTAHeading(html);

  const challengeHtml   = extractSection(html, 'challenge');
  const solutionHtml    = extractSection(html, 'solution');
  const impactHtml      = extractSection(html, 'impact');
  const futureHtml      = extractSection(html, 'future');
  // some have extra sections
  const implementHtml   = extractSection(html, 'implementation') || extractSection(html, 'approach');
  const outcomeHtml     = extractSection(html, 'outcome');
  const resultsHtml     = extractSection(html, 'results');
  const benefitsHtml    = extractSection(html, 'benefits');

  const challengeParas  = extractParagraphs(challengeHtml);
  const challengeItems  = extractApproachItems(challengeHtml);
  const challengeFooter = challengeHtml ? (() => {
    const m = challengeHtml.match(/style="margin-top:24px;">([\s\S]*?)<\/div>/i);
    return m ? extractParagraphs(m[1]) : [];
  })() : [];

  const solutionParas   = extractParagraphs(solutionHtml);
  const solutionItems   = extractApproachItems(solutionHtml);
  const solutionFooter  = solutionHtml ? (() => {
    const m = solutionHtml.match(/style="margin-top:24px;">([\s\S]*?)<\/div>/i);
    return m ? extractParagraphs(m[1]) : [];
  })() : [];

  const impactParas     = extractParagraphs(impactHtml);
  const impactCards     = extractImpactCards(impactHtml);
  const outcomeItems    = extractOutcomeItems(impactHtml);

  const futureParas     = extractParagraphs(futureHtml);
  const futureTags      = extractFutureTags(futureHtml);

  report.push({
    file, num, eyebrow, title, summary, metrics,
    challenge: { paras: challengeParas, items: challengeItems, footer: challengeFooter },
    solution:  { paras: solutionParas,  items: solutionItems,  footer: solutionFooter },
    impact:    { paras: impactParas, cards: impactCards, outcomes: outcomeItems },
    future:    { paras: futureParas, tags: futureTags },
    ctaHeading
  });
}

// ─── output ─────────────────────────────────────────────────────────────────
const outPath = path.join(__dirname, 'html_audit_report.json');
fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
console.log(`✅ Audit written to: ${outPath}`);
console.log(`   Parsed ${report.length} HTML files`);

// Print summary of sections per file
for (const r of report) {
  console.log(`\n[${r.num}] ${r.file}`);
  console.log(`  Eyebrow:  ${r.eyebrow}`);
  console.log(`  Metrics:  ${r.metrics.length} tiles`);
  console.log(`  Challenge paras:  ${r.challenge.paras.length}  items: ${r.challenge.items.length}  footer: ${r.challenge.footer.length}`);
  console.log(`  Solution  paras:  ${r.solution.paras.length}   items: ${r.solution.items.length}   footer: ${r.solution.footer.length}`);
  console.log(`  Impact    paras:  ${r.impact.paras.length}    cards: ${r.impact.cards.length}   outcomes: ${r.impact.outcomes.length}`);
  console.log(`  Future    paras:  ${r.future.paras.length}    tags:  ${r.future.tags.length}`);
  console.log(`  CTA:      ${r.ctaHeading}`);
}
