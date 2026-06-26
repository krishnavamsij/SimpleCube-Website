"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

type ShapeType = "hexagon" | "circle" | "rounded";

export function SecurityDiagram() {
    const [shape, setShape] = useState<ShapeType>("hexagon");

    const ShapeNode = ({ 
        className, 
        borderClass, 
        bgClass, 
        children 
    }: { 
        className: string, 
        borderClass: string, 
        bgClass: string, 
        children: React.ReactNode 
    }) => {
        const isHex = shape === "hexagon";
        const clipPath = isHex ? "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" : undefined;
        const roundedClass = shape === "circle" ? "rounded-full" : shape === "rounded" ? "rounded-[2rem]" : "";

        return (
            <div 
                className={`absolute flex items-center justify-center p-[2px] shadow-xl transition-all duration-500 ${roundedClass} ${borderClass} ${className}`}
                style={{ clipPath }}
            >
                <div 
                    className={`w-full h-full flex flex-col items-center justify-center p-4 transition-all duration-500 ${roundedClass} ${bgClass}`}
                    style={{ clipPath }}
                >
                    {children}
                </div>
            </div>
        );
    };

    return (
        <div className="w-full max-w-[600px] mx-auto flex flex-col items-center">
            
            {/* Shape Toggle Controls */}
            <div className="flex gap-4 mb-8 bg-white/80 backdrop-blur-sm p-2 rounded-full border border-slate-200 shadow-sm z-20">
                {(["hexagon", "circle", "rounded"] as ShapeType[]).map((s) => (
                    <button
                        key={s}
                        onClick={() => setShape(s)}
                        className={`px-4 py-1.5 text-xs font-bold rounded-full capitalize transition-colors ${
                            shape === s ? "bg-[#2563EB] text-white" : "text-slate-600 hover:bg-slate-100"
                        }`}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* Diagram Container */}
            <div className="relative w-full aspect-square max-w-[500px]">
                
                {/* SVG Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500">
                    <defs>
                        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0ea5e9" />
                            <stop offset="100%" stopColor="#2563eb" />
                        </linearGradient>
                    </defs>
                    
                    {/* Line to Top Right (ISO) */}
                    <path d="M 250 250 L 350 150 L 400 150" stroke="url(#lineGrad)" strokeWidth="2" fill="none" />
                    <circle cx="350" cy="150" r="4" fill="#0ea5e9" />

                    {/* Line to Bottom Right (SOC) */}
                    <path d="M 250 250 L 320 250 L 350 350 L 400 350" stroke="url(#lineGrad)" strokeWidth="2" fill="none" />
                    <circle cx="350" cy="350" r="4" fill="#0ea5e9" />

                    {/* Line to Bottom Left (Secure by Design) */}
                    <path d="M 250 250 L 150 250 L 120 350 L 100 350" stroke="url(#lineGrad)" strokeWidth="2" fill="none" />
                    <circle cx="150" cy="250" r="4" fill="#0ea5e9" />
                </svg>

                {/* Nodes */}
                
                {/* Center Node: Hyniva */}
                <ShapeNode 
                    className="w-[200px] h-[220px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                    borderClass="bg-gradient-to-br from-cyan-400 to-[#2563eb]"
                    bgClass="bg-[#0a1930]"
                >
                    <Image 
                        src="/images/2024/06/HynivaLogo_blue.png" 
                        alt="Hyniva" 
                        width={120} 
                        height={40} 
                        className="brightness-0 invert mb-1" 
                    />
                    <span className="text-[10px] text-cyan-400 tracking-wider">Simplify Enterprise</span>
                </ShapeNode>

                {/* Top Right: ISO 27001 */}
                <ShapeNode 
                    className="w-[140px] h-[160px] right-[5%] top-[10%]"
                    borderClass="bg-gradient-to-br from-cyan-400 to-[#2563eb]"
                    bgClass="bg-white"
                >
                    <Image 
                        src="/images/Certifications_Image/ISO.png" 
                        alt="ISO 27001" 
                        width={60} 
                        height={60} 
                        className="object-contain mb-2" 
                    />
                    <h4 className="text-xs font-extrabold text-slate-900 mb-0.5">ISO 27001</h4>
                    <p className="text-[8px] text-center text-slate-500 leading-tight">Certified Information<br/>Security Management</p>
                </ShapeNode>

                {/* Bottom Right: SOC 2 */}
                <ShapeNode 
                    className="w-[140px] h-[160px] right-[5%] bottom-[10%]"
                    borderClass="bg-gradient-to-br from-cyan-400 to-[#2563eb]"
                    bgClass="bg-white"
                >
                    <Image 
                        src="/images/Footer/SOC.png" 
                        alt="SOC 2" 
                        width={60} 
                        height={60} 
                        className="object-contain mb-2" 
                    />
                    <h4 className="text-xs font-extrabold text-slate-900 mb-0.5">SOC 2</h4>
                    <p className="text-[8px] text-center text-slate-500 leading-tight">System and Organization<br/>Controls 2</p>
                </ShapeNode>

                {/* Bottom Left: Secure by Design */}
                <ShapeNode 
                    className="w-[140px] h-[160px] left-[5%] bottom-[10%]"
                    borderClass="bg-gradient-to-br from-[#0f172a] to-[#2563eb]"
                    bgClass="bg-white"
                >
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                        <ShieldCheck className="w-6 h-6 text-[#2563EB]" />
                    </div>
                    <h4 className="text-xs font-extrabold text-slate-900 mb-0.5 text-center leading-tight">Secure by<br/>Design</h4>
                    <p className="text-[8px] text-center text-slate-500 leading-tight mt-1">Built with security<br/>in every layer</p>
                </ShapeNode>

            </div>
        </div>
    );
}
