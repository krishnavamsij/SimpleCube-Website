"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const defaultProcessSteps = [
  {
    num: "01",
    title: "Understand",
    desc: "Gain a clear view of business priorities, operational challenges and customer expectations.",
    angle: 45
  },
  {
    num: "02",
    title: "Modernize",
    desc: "Redesign processes and modernize enterprise systems to improve agility and operational efficiency.",
    angle: -30
  },
  {
    num: "03",
    title: "Enable",
    desc: "Introduce intelligent capabilities through AI, trusted data and cloud technologies where they create measurable impact.",
    angle: 120
  },
  {
    num: "04",
    title: "Evolve",
    desc: "Continuously optimize, expand and refine digital capabilities as your business grows and market demands change.",
    angle: -80
  }
];

interface TimelineProcessProps {
  eyebrow?: string;
  title?: string;
  description?: React.ReactNode;
  steps?: {
    num: string;
    title: string;
    desc: string;
    angle: number;
  }[];
}

export function TimelineProcess({
  eyebrow = "OUR APPROACH",
  title = "Transform with Purpose",
  description = (
    <>
      Every organization follows a different transformation journey, but lasting change comes from balancing <br className="hidden md:block" />business priorities with modern engineering. Our approach creates a structured path from strategy to measurable outcomes.
    </>
  ),
  steps = defaultProcessSteps
}: TimelineProcessProps) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Ping-pong sequence: 0, 1, 2, 3, 2, 1
  const cycle = [0, 1, 2, 3, 2, 1];
  const activeStep = cycle[tick % cycle.length];

  // Sizes based on distance from the active step [distance 0, distance 1, distance 2, distance 3]
  const sizeMap = [400, 300, 260, 240];

  return (
    <section className="bg-[#030b1e] py-24 relative overflow-hidden text-white font-sans select-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020918] via-[#030b1e] to-[#020918]" />
      
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="eyebrow text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20">
              <span className="dot bg-[#3B82F6] shadow-[#3B82F6]" />
              {eyebrow}
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold max-w-3xl mx-auto leading-tight tracking-tight">
            {title}
          </h2>
          <p className="mt-6 text-slate-400 text-lg max-w-[1200px] mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative w-full h-[550px] mx-auto max-w-[1400px]">
          
          {/* Base Horizontal Timeline Line */}
          <div className="absolute top-[50%] left-0 right-0 h-[1px] bg-white/20 border-t border-dashed border-white/30 z-0" />
          
          <div className="flex flex-row items-center justify-center relative w-full h-full">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              const isPast = activeStep >= idx;
              
              // Calculate distance to the active step
              const distance = Math.abs(idx - activeStep);
              // Retrieve cascading size based on distance
              const size = sizeMap[distance];
              
              return (
                <div key={step.title} className="relative h-full flex flex-col justify-center items-center transition-all duration-1000 ease-in-out" style={{ width: size, flexShrink: 0 }}>
                  
                  {/* Outer Large Circle Container */}
                  <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 pointer-events-none transition-all duration-1000 ease-in-out"
                       style={{ width: size, height: size }}>
                    
                    {/* Main Circle - with overflow visible for soft bleeding glow */}
                    <div 
                      className="rounded-full border transition-all duration-1000 absolute w-full h-full flex justify-center items-center"
                      style={{
                        borderColor: isPast ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                        backgroundColor: isActive ? 'rgba(255,255,255,0.02)' : 'transparent',
                      }}
                    >
                      {/* The Pure Movement Seamless Glow (NO fades, pure spatial morphing) */}
                      {isActive && (
                        <motion.div
                          layoutId="activeGlowOrb"
                          className="absolute pointer-events-none mix-blend-screen z-0 rounded-full"
                          transition={{ type: "spring", stiffness: 45, damping: 15 }}
                          style={{
                            width: '110%',
                            height: '110%',
                            rotate: step.angle,
                            // Darkened Teal inner core, Dark Blue middle space, Blue outer glow
                            background: `radial-gradient(circle at 60% 60%, rgba(0,160,130,0.7) 0%, rgba(3,11,30,1) 45%, rgba(37,99,235,0.7) 80%, transparent 100%)`,
                            filter: 'blur(15px)',
                          }}
                        />
                      )}

                      {/* Grid Pattern inside active circle */}
                      <div className={`absolute inset-0 rounded-full transition-opacity duration-1000 overflow-hidden ${isActive ? 'opacity-100' : 'opacity-0'}`} 
                           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    </div>

                    {/* Secondary Inner Arc / Circle */}
                    <div 
                      className="rounded-full border-t border-r transition-all duration-1000 absolute"
                      style={{
                        width: size * 0.65,
                        height: size * 0.65,
                        borderColor: isActive ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.05)',
                        transform: isActive ? 'rotate(45deg)' : 'rotate(-45deg)'
                      }}
                    />

                    {/* Step Number IN THE TOP INNER BOUNDARY of circle */}
                    <div className={`absolute top-4 left-1/2 -translate-x-1/2 text-[12px] font-bold tracking-widest font-mono transition-colors duration-1000 ${isActive ? 'text-white' : 'text-white/40'}`}>
                      {step.num}
                    </div>

                    {/* Small Node Dot on the timeline */}
                    <div className={`absolute w-1.5 h-1.5 rounded-full transition-all duration-700 ${isPast ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-white/30'}`} />
                  </div>

                  {/* Title Above the middle line */}
                  <div className={`absolute bottom-[50%] mb-3 left-1/2 -translate-x-1/2 w-[280px] text-center transition-all duration-1000 z-30 ${isActive ? 'opacity-100 scale-110' : 'opacity-60 scale-90'}`}>
                    <h3 className={`font-bold tracking-wide transition-colors duration-1000 ${isActive ? 'text-white drop-shadow-md' : 'text-slate-300'}`}>
                      {step.title}
                    </h3>
                  </div>

                  {/* Description below the circle */}
                  <div className={`absolute top-[50%] left-1/2 -translate-x-1/2 w-[280px] text-center transition-all duration-1000 ease-in-out z-30 ${isActive ? 'scale-105' : 'scale-90'}`} style={{ marginTop: (size / 2) + 15 }}>
                    <p className={`leading-relaxed text-[13px] transition-colors duration-1000 ${isActive ? 'text-slate-200' : 'text-slate-500'}`}>
                      {step.desc}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet Vertical Timeline */}
        <div className="lg:hidden relative border-l border-white/10 ml-6 pl-8 space-y-16 mt-16">
          {steps.map((step, idx) => {
             const isActive = activeStep === idx;
             return (
               <div key={step.title} className="relative">
                  {/* Node Dot */}
                  <div className={`absolute -left-[37px] top-2 w-3 h-3 rounded-full transition-all duration-700 ${isActive ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] scale-125' : 'bg-white/20'}`} />
                  
                  <div className="text-[10px] font-mono text-white/50 mb-1">{step.num}</div>
                  <h3 className={`text-xl font-bold mb-3 transition-colors duration-500 ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
               </div>
             )
          })}
        </div>

      </div>
    </section>
  );
}
