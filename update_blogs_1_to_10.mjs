import fs from 'fs';
import path from 'path';

const htmlDir = path.join(process.cwd(), 'public/images/Blogs/HTML References');
const tsFile = path.join(process.cwd(), 'src/content/blog-details.ts');

const blogMap = {
    "1. Intelligence Needs Infrastructure.html": "intelligence-needs-infrastructure-prepare-your-salesforce-platform-for-an-agent-led-future",
    "2. Why Financial Institutions Are Modernizing Salesforce Experience Cloud with LWR .html": "why-financial-institutions-are-modernizing-salesforce-experience-cloud-with-lwr",
    "3. Modernizing the Contact Center with Agentforce.html": "modernizing-the-contact-center-with-ai-agents-from-fragmented-interactions-to-connected-journeys",
    "4. Reimagining Loan Applications Agentforce.html": "reimagining-loan-applications-voice-and-chat-take-center-stage-with-agentforce",
    "5. Empowering Credit Unions Digital Era.html": "empowering-credit-unions-in-the-digital-era",
    "6. Hyniva SOC2 TypeII Compliance.html": "soc2-type-2-compliance-commitment-to-security-and-trust",
    "7. Accelerating Digital Transformation Credit Unions.html": "accelerating-digital-transformation-in-credit-unions-with-salesforce-fsc",
    "8. Salesforce Advanced Analytics.html": "driving-business-intelligence-with-salesforce-advanced-analytics",
    "9. Salesforce for Marketing.html": "personalizing-customer-journeys-with-salesforce-for-marketing",
    "10. Salesforce Lightning vs Classic.html": "salesforce-lightning-vs-classic-why-its-time-to-make-the-switch"
};

let tsContent = fs.readFileSync(tsFile, 'utf8');

for (const [filename, slug] of Object.entries(blogMap)) {
    const htmlPath = path.join(htmlDir, filename);
    if (!fs.existsSync(htmlPath)) {
        console.warn(`File not found: ${filename}`);
        continue;
    }

    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    const proseMatch = htmlContent.match(/<div class="prose">([\s\S]*?)<\/div>\s*<!-- CTA -->/i) || 
                       htmlContent.match(/<div class="prose">([\s\S]*?)<\/div>\s*<\/div>\s*<\/main>/i) ||
                       htmlContent.match(/<div class="prose">([\s\S]*?)<\/div>/i);
    
    if (!proseMatch) {
        console.warn(`No .prose found in ${filename}`);
        continue;
    }

    let proseHtml = proseMatch[1].trim();

    // Remove any trailing CTA if accidentally caught
    proseHtml = proseHtml.replace(/<div class="cta">[\s\S]*/i, '').trim();

    const sections = [];
    const h2Split = proseHtml.split(/<h2>([\s\S]*?)<\/h2>/i);

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
