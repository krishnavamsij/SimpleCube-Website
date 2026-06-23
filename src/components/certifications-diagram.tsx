import React from 'react';

const Hex = ({ cx, cy, r, cornerRadius, fill, stroke, strokeWidth, filter }: any) => {
    // Math for perfect rounded hexagon
    const points = [];
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 180) * (60 * i - 90);
        points.push({
            x: cx + r * Math.cos(angle),
            y: cy + r * Math.sin(angle)
        });
    }

    let d = '';
    for (let i = 0; i < 6; i++) {
        const p1 = points[i === 0 ? 5 : i - 1];
        const p2 = points[i];
        const p3 = points[(i + 1) % 6];

        const v1 = { x: p1.x - p2.x, y: p1.y - p2.y };
        const l1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
        const u1 = { x: v1.x / l1, y: v1.y / l1 };

        const v2 = { x: p3.x - p2.x, y: p3.y - p2.y };
        const l2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
        const u2 = { x: v2.x / l2, y: v2.y / l2 };

        const dist = cornerRadius * 0.57735;

        const startX = p2.x + u1.x * dist;
        const startY = p2.y + u1.y * dist;
        const endX = p2.x + u2.x * dist;
        const endY = p2.y + u2.y * dist;

        if (i === 0) d += `M ${startX} ${startY} `;
        else d += `L ${startX} ${startY} `;

        d += `Q ${p2.x} ${p2.y} ${endX} ${endY} `;
    }
    d += 'Z';

    return <path d={d} fill={fill} stroke={stroke} strokeWidth={strokeWidth} filter={filter} />;
};

export function CertificationsDiagram() {
    return (
        <div className="relative w-full max-w-[800px] mx-auto font-sans">
            <svg viewBox="50 35 700 540" className="w-full h-auto drop-shadow-xl overflow-visible">
                <defs>
                    <filter id="hexShadow" x="-30%" y="-30%" width="160%" height="160%">
                        <feDropShadow dx="0" dy="12" stdDeviation="25" floodColor="#0B205D" floodOpacity="0.08" />
                    </filter>
                    <linearGradient id="centerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00D4AA" />
                        <stop offset="100%" stopColor="#0B205D" />
                    </linearGradient>
                    <linearGradient id="sideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0B205D" />
                        <stop offset="100%" stopColor="#00D4AA" />
                    </linearGradient>
                    <linearGradient id="hexFill" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#f8fafc" />
                    </linearGradient>
                </defs>

                {/* ─── CONNECTING LINES ─── */}
                
                {/* Left Line */}
                <path d="M 280 300 L 170 300 L 170 335" fill="none" stroke="#0B205D" strokeWidth="2.5" strokeDasharray="3 8" strokeLinecap="round" />
                <circle cx="280" cy="300" r="4.5" fill="#0B205D" />
                <circle cx="170" cy="335" r="4.5" fill="white" stroke="#0B205D" strokeWidth="2.5" />

                {/* Top Right Line */}
                <path d="M 460 195 L 485 160 L 539 160" fill="none" stroke="#0B205D" strokeWidth="2.5" strokeDasharray="3 8" strokeLinecap="round" />
                <circle cx="460" cy="195" r="4.5" fill="#0B205D" />
                <circle cx="539" cy="160" r="4.5" fill="white" stroke="#0B205D" strokeWidth="2.5" />

                {/* Bottom Right Line (Cyan) */}
                <path d="M 521 300 L 630 300 L 630 335" fill="none" stroke="#00D4AA" strokeWidth="2.5" strokeDasharray="3 8" strokeLinecap="round" />
                <circle cx="521" cy="300" r="4.5" fill="#00D4AA" />
                <circle cx="630" cy="335" r="4.5" fill="white" stroke="#00D4AA" strokeWidth="2.5" />

                {/* ─── CENTER HEXAGON ─── */}
                <Hex cx={400} cy={300} r={140} cornerRadius={16} fill="white" stroke="url(#centerGrad)" strokeWidth="3" filter="url(#hexShadow)" />
                <Hex cx={400} cy={300} r={130} cornerRadius={14} fill="#0B205D" stroke="none" />

                {/* ─── SATELLITE HEXAGONS (r=105) ─── */}
                <Hex cx={170} cy={440} r={105} cornerRadius={12} fill="url(#hexFill)" stroke="url(#sideGrad)" strokeWidth="2.5" filter="url(#hexShadow)" />
                <Hex cx={630} cy={160} r={105} cornerRadius={12} fill="url(#hexFill)" stroke="url(#sideGrad)" strokeWidth="2.5" filter="url(#hexShadow)" />
                <Hex cx={630} cy={440} r={105} cornerRadius={12} fill="url(#hexFill)" stroke="url(#sideGrad)" strokeWidth="2.5" filter="url(#hexShadow)" />

                {/* ─── HTML CONTENT INSIDE HEXAGONS ─── */}
                
                {/* Center Content */}
                <foreignObject x={280} y={230} width={240} height={140}>
                    <div className="w-full h-full flex items-center justify-center px-4">
                        <img src="/images/Certifications_Image/hyniva_logo_uploaded.png" alt="Hyniva" className="w-full max-w-[180px] object-contain" onError={(e) => { e.currentTarget.style.display='none' }} />
                    </div>
                </foreignObject>

                {/* Left Content */}
                <foreignObject x={80} y={350} width={180} height={180}>
                    <div className="w-full h-full flex flex-col items-center justify-center text-center">
                        <div className="mb-2 h-[80px] flex items-center justify-center relative group">
                            <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="#0B205D" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" className="transition-transform duration-300 group-hover:-translate-y-1">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                <path d="M9 12l2 2 4-4" stroke="#00D4AA" strokeWidth="2.5" />
                            </svg>
                        </div>
                        <h4 className="text-[#0B205D] font-extrabold text-[14px] leading-none mb-1.5">Secure by<br/>Design</h4>
                        <p className="text-slate-500 text-[10px] leading-tight font-medium px-2 max-w-[140px]">Built with security<br/>in every layer</p>
                    </div>
                </foreignObject>

                {/* Top Right Content */}
                <foreignObject x={540} y={70} width={180} height={180}>
                    <div className="w-full h-full flex flex-col items-center justify-center text-center">
                        <div className="mb-2 h-[80px] flex items-end justify-center">
                            <img src="/images/Certifications_Image/iso_logo_uploaded_2.png" alt="ISO 27001" className="w-[80px] h-[80px] object-contain transition-transform duration-300 hover:-translate-y-1" />
                        </div>
                        <h4 className="text-[#0B205D] font-extrabold text-[14px] leading-none mb-1.5">ISO 27001</h4>
                        <p className="text-slate-500 text-[10px] leading-tight font-medium px-2 max-w-[140px]">Certified Information<br/>Security Management</p>
                    </div>
                </foreignObject>

                {/* Bottom Right Content */}
                <foreignObject x={540} y={350} width={180} height={180}>
                    <div className="w-full h-full flex flex-col items-center justify-center text-center">
                        <div className="mb-2 h-[80px] flex items-end justify-center">
                            <img src="/images/Certifications_Image/soc_logo_uploaded.png" alt="AICPA SOC" className="w-[80px] h-[80px] object-contain transition-transform duration-300 hover:-translate-y-1" />
                        </div>
                        <h4 className="text-[#0B205D] font-extrabold text-[14px] leading-none mb-1.5">SOC 2</h4>
                        <p className="text-slate-500 text-[10px] leading-tight font-medium px-2 max-w-[140px]">System and Organization<br/>Controls 2</p>
                    </div>
                </foreignObject>

            </svg>
        </div>
    );
}
