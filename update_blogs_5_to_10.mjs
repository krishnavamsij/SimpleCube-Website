import fs from 'fs';
import path from 'path';

const htmlDir = path.join(process.cwd(), 'public/images/Blogs/HTML References');
const tsFile = path.join(process.cwd(), 'src/content/blog-details.ts');

const blogMap = {
    "5. Empowering Credit Unions Digital Era.html": "empowering-credit-unions-to-thrive-in-a-digital-era",
    "6. Hyniva SOC2 TypeII Compliance.html": "hyniva-achieves-soc-2-type-ii-compliance-security-first",
    "7. Accelerating Digital Transformation Credit Unions.html": "accelerating-digital-transformation-at-credit-unions",
    "8. Salesforce Advanced Analytics.html": "leveraging-salesforce-for-advanced-analytics-insights-into-sales-and-customer-behavior",
    "9. Salesforce for Marketing.html": "salesforce-for-marketing-integrating-salesforce-with-your-marketing-strategy",
    "10. Salesforce Lightning vs Classic.html": "salesforce-lightning-vs-classic-why-you-should-switch"
};

let tsContent = fs.readFileSync(tsFile, 'utf8');

for (const [filename, slug] of Object.entries(blogMap)) {
    const htmlPath = path.join(htmlDir, filename);
    if (!fs.existsSync(htmlPath)) {
        console.warn(`File not found: ${filename}`);
        continue;
    }

    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Some html files have <!-- CTA -->, others might not.
    // Let's capture everything inside <div class="prose"> until its closing div
    const proseRegex = /<div\s+class="prose">([\s\S]*?)<\/div>\s*(?:<!-- CTA -->|<div class="cta">|<\/div>\s*<\/main>)/i;
    const matchProse = htmlContent.match(proseRegex);
    let proseHtml = '';
    
    if (matchProse) {
        proseHtml = matchProse[1].trim();
    } else {
        // Fallback
        const fallbackMatch = htmlContent.match(/<div class="prose">([\s\S]*?)<\/div>\s*<\/div>/i);
        if (fallbackMatch) proseHtml = fallbackMatch[1].trim();
        else {
            console.warn(`No .prose found in ${filename}`);
            continue;
        }
    }

    // Explicitly remove any trailing .cta div that might be inside if the structure is weird
    proseHtml = proseHtml.replace(/<div class="cta">[\s\S]*/i, '').trim();

    const sections = [];
    const h2Split = proseHtml.split(/<h2[^>]*>([\s\S]*?)<\/h2>/i);

    if (h2Split.length > 0) {
        if (h2Split[0].trim()) {
            sections.push({
                title: "",
                content: h2Split[0].trim()
            });
        }
        for (let i = 1; i < h2Split.length; i += 2) {
            sections.push({
                title: h2Split[i].trim(),
                content: h2Split[i+1] ? h2Split[i+1].trim() : ""
            });
        }
    }

    const slugRegex = new RegExp(`("${slug}"\\s*:\\s*{[^}]*?sections\\s*:\\s*\\[)([\\s\\S]*?)(\\]\\s*},)`, 'm');
    const match = tsContent.match(slugRegex);
    if (!match) {
        console.warn(`Could not find sections for slug ${slug} in ts file`);
        continue;
    }

    let newSectionsCode = '';
    sections.forEach(sec => {
        const id = sec.title ? sec.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 40).replace(/-$/, '') : "intro";
        const contentStr = sec.content.replace(/`/g, '\\`').replace(/\\/g, '\\\\').replace(/\$/g, '\\$');
        newSectionsCode += `            {
                id: "${id}",
                title: ${sec.title ? `"${sec.title.replace(/"/g, '\\"')}"` : `""`},
                content: \`${contentStr}\`
            },\n`;
    });

    tsContent = tsContent.replace(slugRegex, `$1\n${newSectionsCode}        $3`);
    console.log(`Updated ${slug}`);
}

fs.writeFileSync(tsFile, tsContent, 'utf8');
console.log("Done updating blog-details.ts");
