const fs = require('fs');

const pageFile = 'src/app/about/page.tsx';
const approachFile = 'src/components/approach.tsx';

let pageContent = fs.readFileSync(pageFile, 'utf8');
const approachContent = fs.readFileSync(approachFile, 'utf8');

// Extract SVG from approach.tsx
const svgStart = approachContent.indexOf('<svg');
const svgEnd = approachContent.indexOf('</svg>') + 6;
const svgContent = approachContent.substring(svgStart, svgEnd);

// Add import
if (!pageContent.includes('approachContent')) {
    pageContent = pageContent.replace('import { aboutContent } from "@/content/about";', 'import { aboutContent } from "@/content/about";\nimport { approachContent } from "@/content/site-content";');
}

// Find OperationsSection
const sectionStart = pageContent.indexOf('function OperationsSection() {');
const nextSectionStart = pageContent.indexOf('/* ─────────────── Timeline Section ─────────────── */');
if (sectionStart === -1 || nextSectionStart === -1) {
    throw new Error('Could not find boundaries');
}

const sectionContent = pageContent.substring(sectionStart, nextSectionStart);

const newSection = `function OperationsSection() {
    const roles = ["IT Business Analyst", "Manual QA", "Release Manager", "Support Engineer"];

    return (
        <section className="bg-[#f0f9ff] py-24 pb-32">
            <div className="mx-auto max-w-[1400px] px-6">
                
                {/* Unified Card Container */}
                <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 mx-auto max-w-5xl flex flex-col">
                    
                    {/* Top Half: How We Work (White) */}
                    <div className="bg-white p-10 sm:p-16">
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <div className="text-[12px] font-black tracking-widest text-[#2563eb] uppercase mb-4">
                                HOW WE WORK
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f172a] mb-6">
                                {aboutContent.operations.howWeOperate.title}
                            </h2>
                            <p className="text-slate-500 text-lg">
                                {aboutContent.operations.howWeOperate.description}
                            </p>
                        </div>
                        
                        <div className="relative pt-4 pb-4">
                            {/* Connecting Line */}
                            <div className="absolute top-[24px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-[#2563eb] via-[#06b6d4] to-[#10b981] hidden md:block"></div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-12">
                                {aboutContent.operations.howWeOperate.steps.map((item, idx) => (
                                    <div key={idx} className="flex flex-col items-center text-center relative z-10">
                                        <div className="w-[48px] h-[48px] rounded-full bg-[#2563eb] text-white flex items-center justify-center font-bold text-xl shadow-[0_0_15px_rgba(37,99,235,0.5)] mb-6 ring-8 ring-white">
                                            {idx + 1}
                                        </div>
                                        <h4 className="font-bold text-[15px] text-slate-900 mb-3">
                                            {item.title}
                                        </h4>
                                        <p className="text-[13px] text-slate-500 leading-relaxed max-w-[240px]">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Half: Digital Factory Graphic (Navy) */}
                    <div className="relative overflow-hidden bg-[#030B3B] p-10 sm:p-16 text-white pt-16 sm:pt-20">
                        {/* Background glow effects */}
                        <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#00D4AA]/10 blur-[120px]" />
                        <div className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-[#1F35A4]/20 blur-[100px]" />

                        <div className="relative z-10 mx-auto max-w-[1400px]">
                            {/* ── Header Row: left title + right stat ── */}
                            <motion.div
                                variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
                                className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-8 mb-2"
                            >
                                {/* Left: Headline & Callout */}
                                <div className="flex-1 w-full lg:max-w-2xl">
                                    <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[48px] font-extrabold leading-[1.1] tracking-tight text-white mb-4 sm:mb-6 font-display">
                                        Digital Factory <span className="text-[#00D4AA]">Model.</span>
                                    </h2>
                                    <p className="text-[13px] sm:text-[14px] md:text-[15px] font-medium leading-[1.6] sm:leading-[1.7] text-white/70">
                                        The developer owns the full lifecycle enabling <strong className="font-bold text-white">Zero Handoff Friction,</strong> reducing overhead and increasing accountability at every stage.
                                    </p>
                                </div>

                                {/* Right: Punch Stat */}
                                <div className="flex flex-col items-center lg:items-end text-center lg:text-right flex-shrink-0 mt-6 lg:mt-0 w-full lg:w-auto">
                                    <div className="text-[56px] sm:text-[64px] lg:text-[72px] font-black leading-[0.85] tracking-[-3px] text-white font-display">
                                        40<span className="text-white text-[40px] sm:text-[48px] lg:text-[52px]">%</span>
                                    </div>
                                    <div className="text-[13px] sm:text-[14px] font-bold mt-2 lg:mt-3 leading-[1.3] text-white/70 tracking-widest uppercase">
                                        faster delivery<br />vs. traditional model
                                    </div>
                                </div>
                            </motion.div>

                            {/* ── Roles Eliminated Row ── */}
                            <motion.div
                                variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
                                className="mt-8 lg:mt-10 mb-8 lg:mb-10 flex flex-col items-center justify-center gap-6 pt-1"
                            >
                                <span className="text-[11.5px] font-bold tracking-widest text-white/70 text-center uppercase">
                                    Roles you no longer need to staff
                                </span>
                                <div className="flex flex-wrap justify-center gap-2.5">
                                    {roles.map((role) => (
                                        <span
                                            key={role}
                                            className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.07] px-4 py-2 text-[12.5px] font-semibold text-white/90 shadow-sm font-display uppercase tracking-wider"
                                        >
                                            <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border border-red-500/50 bg-red-500/20 text-[10px] font-black text-red-400 leading-none flex-shrink-0">✕</span>
                                            {role}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* ── Planet Wave SVG ── */}
                            <motion.div
                                variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
                                className="w-full flex justify-center mt-20 lg:mt-32 mb-[-30px] lg:mb-[-50px]"
                            >
                                <style>{\`
                                    @keyframes hFloat0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
                                    @keyframes hFloat1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
                                    @keyframes hFloat2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
                                    @keyframes hFloat3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
                                    @keyframes hFloat4 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
                                    .hpg { cursor:pointer; }
                                    .hpg:hover .hs { filter: brightness(1.25) drop-shadow(0 0 14px rgba(0,212,170,0.6)); }
                                    .hpg:hover .hlabel { fill:#00D4AA; }
                                    .hfloat-0 { animation: hFloat0 5s ease-in-out infinite 0s; }
                                    .hfloat-1 { animation: hFloat1 6s ease-in-out infinite 0.8s; }
                                    .hfloat-2 { animation: hFloat2 4.5s ease-in-out infinite 1.6s; }
                                    .hfloat-3 { animation: hFloat3 5.5s ease-in-out infinite 0.4s; }
                                    .hfloat-4 { animation: hFloat4 4.8s ease-in-out infinite 1.2s; }
                                \`}</style>

                                SVG_PLACEHOLDER
                            </motion.div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
`;

pageContent = pageContent.replace(sectionContent, newSection.replace('SVG_PLACEHOLDER', svgContent) + '\n\n');

fs.writeFileSync(pageFile, pageContent);
console.log('Successfully updated OperationsSection.');
