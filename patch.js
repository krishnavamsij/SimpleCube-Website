const fs = require('fs');
const file = 'src/app/about/page.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
    '<section className="relative overflow-hidden bg-[#040b16] pt-32 pb-24 lg:pt-48 lg:pb-32">\n            {/* Globe Graphic (Image) */}\n            <div className="absolute top-[5%] lg:top-[10%] right-[-10%] lg:right-[5%] w-[100%] lg:w-[45%] max-w-[650px] aspect-square pointer-events-none z-0 opacity-60 lg:opacity-100 [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_75%)]">\n                <Image src="/globe-previous.png" alt="Global Network" fill className="object-contain scale-110" priority />\n            </div>\n\n            <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6">\n                <motion.div\n                    variants={staggerContainer}\n                    initial="hidden"\n                    animate="visible"\n                    className="max-w-3xl"\n                >\n                    <motion.div variants={fadeInUp} className="mb-4 inline-block text-xs font-bold tracking-wider text-blue-400 uppercase">\n                        WHO WE ARE\n                    </motion.div>',
    `<section className="relative overflow-hidden bg-[#030b1e] pt-32 pb-24 lg:pt-48 lg:pb-32">
            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#020918] via-[#061244]/90 to-[#030b1e]" />
            <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(ellipse_at_70%_40%,rgba(37,99,235,0.18)_0%,transparent_65%)]" />
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "url(\\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\\")",
                }}
            />
            <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-[#020918] via-[#020918]/85 to-transparent" />

            {/* Globe Graphic (Image) */}
            <div className="absolute top-[5%] lg:top-[10%] right-[-10%] lg:right-[5%] w-[100%] lg:w-[45%] max-w-[650px] aspect-square pointer-events-none z-0 opacity-60 lg:opacity-100 [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_75%)]">
                <Image src="/globe-previous.png" alt="Global Network" fill className="object-contain scale-110" priority />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-[950px]"
                >
                    <motion.div variants={fadeInUp} className="mb-6">
                        <span className="eyebrow text-[#1e90ff] bg-[#1e90ff]/[0.08] border border-[#1e90ff]/25 backdrop-blur-md">
                            <span className="dot bg-[#1e90ff] shadow-[#1e90ff]" />
                            WHO WE ARE
                        </span>
                    </motion.div>`
);

content = content.replace(
    '<section className="bg-white py-24 relative overflow-hidden">\n            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-10">\n                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">',
    '<section className="bg-white py-24 relative overflow-hidden">\n            <div className="mx-auto max-w-[1400px] px-6 relative z-10">\n                <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-8">'
);

content = content.replace(
    '<section className="bg-[#0b1426] py-24 text-white">\n            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">\n                <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">',
    '<section className="bg-[#0b1426] py-24 text-white">\n            <div className="mx-auto max-w-[1400px] px-6">\n                <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">'
);

content = content.replace(
    '<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">\n                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">',
    '<div className="mx-auto max-w-[1400px] px-6 relative z-10">\n                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">'
);

content = content.replace(
    '<section className="bg-[#f0f9ff] py-24 pb-32">\n            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">\n                \n                {/* Top: How We Operate White Card */}\n                <div className="bg-white rounded-[2rem] p-10 sm:p-16 shadow-sm border border-slate-100 max-w-5xl mx-auto mb-16">\n                    <div className="text-center mb-12">\n                        <div className="text-[15px] font-black tracking-widest text-[#0f172a] uppercase">\n                            HOW WE OPERATE\n                        </div>\n                    </div>',
    '<section className="bg-[#f0f9ff] py-24 pb-32">\n            <div className="mx-auto max-w-[1400px] px-6">\n                \n                {/* Top: How We Operate White Card */}\n                <div className="bg-white rounded-[2rem] p-10 sm:p-16 shadow-sm border border-slate-100 max-w-5xl mx-auto mb-16">\n                    <div className="text-center mb-12">\n                        <div className="text-[15px] font-black tracking-widest text-[#0f172a] uppercase">\n                            HOW WE WORK\n                        </div>\n                    </div>'
);

content = content.replace(
    '<div className="max-w-md">\n                                <div className="text-xs text-blue-400 font-bold tracking-widest uppercase mb-2">OUR FRAMEWORK</div>\n                                <h3 className="text-3xl md:text-4xl font-bold mb-4">',
    '<div className="max-w-md">\n                                <h3 className="text-3xl md:text-4xl font-bold mb-4">'
);

content = content.replace(
    '<section className="bg-[#040b16] text-white py-24 sm:py-32 overflow-hidden relative">\n            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">\n                <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">',
    '<section className="bg-[#040b16] text-white py-24 sm:py-32 overflow-hidden relative">\n            <div className="mx-auto max-w-[1400px] px-6">\n                <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">'
);

fs.writeFileSync(file, content);
console.log("Patched correctly");
