const fs = require('fs');

const pageFile = 'src/app/about/page.tsx';

let content = fs.readFileSync(pageFile, 'utf8');

content = content.replace(
    '<div className="bg-white rounded-[2rem] p-10 sm:p-16 shadow-sm border border-slate-100 mx-auto mb-16">',
    '<div className="rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 mx-auto max-w-5xl flex flex-col">\n                    <div className="bg-white p-10 sm:p-16">'
);

content = content.replace(
    `                    </div>
                </div>

                {/* Bottom: Digital Factory Graphic */}
                    <motion.div 
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        className="bg-[#0b1426] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl"
                    >
                        {/* 3D Sphere Background Effect */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none">
                            {/* Lines */}
                            <svg className="w-full h-full absolute inset-0" preserveAspectRatio="xMidYMid slice">
                                <path d="M 100,200 Q 300,300 500,200 T 900,100" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" className="opacity-50" />
                                <path d="M 200,100 Q 400,200 600,100 T 800,200" fill="none" stroke="#10b981" strokeWidth="2" className="opacity-30" />
                            </svg>
                        </div>
                        
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                            <div className="max-w-md">
                                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                                    <span className="text-white">Digital Factory </span>
                                    <span className="text-emerald-400">Model.</span>
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {aboutContent.operations.digitalFactory.description}
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-5xl md:text-6xl font-black text-white">{aboutContent.operations.digitalFactory.stat}</div>
                                <div className="text-xs text-slate-400 max-w-[150px] mt-2 ml-auto leading-tight">
                                    {aboutContent.operations.digitalFactory.statLabel}
                                </div>
                            </div>
                        </div>`,
    `                    </div>

                    {/* Bottom: Digital Factory Graphic */}
                    <div className="bg-[#030B3B] p-10 sm:p-16 text-white relative overflow-hidden pt-16 sm:pt-20">
                        {/* Background glow effects */}
                        <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#00D4AA]/10 blur-[120px]" />
                        <div className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-[#1F35A4]/20 blur-[100px]" />

                        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-8 mb-2">
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
                        </div>`
);

content = content.replace(
    `                    </motion.div>
                </div>
        </section>`,
    `                    </div>
                </div>
        </section>`
);

fs.writeFileSync(pageFile, content);
console.log("Patched successfully");
