"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LobotomyStartPage() {
  const [loadingStep, setLoadingStep] = useState(0);

  // 5-MINUTE BOOT SEQUENCE
  useEffect(() => {
    // We space these out over 300,000ms (5 minutes)
    // 60,000ms = 1 minute
    const sequence = [
      { step: 1, time: 1000 },       // Init (starts immediately)
      { step: 2, time: 60000 },      // Audio (1 min)
      { step: 3, time: 120000 },     // Video (2 mins)
      { step: 4, time: 180000 },     // Connection (3 mins)
      { step: 5, time: 300000 },     // Ready (5 mins)
    ];

    const timeouts: NodeJS.Timeout[] = [];

    sequence.forEach(({ step, time }) => {
      const t = setTimeout(() => setLoadingStep(step), time);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <main className="w-[1920px] h-[1080px] bg-[#050505] relative overflow-hidden font-sans text-white flex items-center justify-center">
      {/* Background Noise/Scanlines */}
      <div className="absolute inset-0 opacity-10 bg-[url('/assets/noise.png')] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />

      <div className="relative z-20 flex flex-col items-center w-[800px]">
        
        {/* LOGO / HEADER */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            className="mb-12 text-center"
        >
            <h1 className="text-8xl font-black text-white tracking-tighter mb-2" style={{ textShadow: "0 0 20px rgba(239, 68, 68, 0.5)" }}>
                LOBOTOMY <span className="text-[#ef4444]">CORP</span>
            </h1>
            <div className="h-1 w-full bg-[#ef4444] mb-2" />
            <p className="text-xl font-mono text-gray-500 tracking-[1em] uppercase">Face the Fear, Build the Future</p>
        </motion.div>

        {/* LOADING STEPS */}
        <div className="w-full bg-[#111] border border-[#333] p-8 font-mono text-lg shadow-2xl">
            <div className="flex flex-col gap-4">
                <Step label="INITIALIZING TT2 PROTOCOL" status={loadingStep > 0} />
                <Step label="SYNCHRONIZING AUDIO FEEDS" status={loadingStep > 1} />
                <Step label="CALIBRATING OPTICAL SENSORS" status={loadingStep > 2} />
                <Step label="ESTABLISHING NEURAL LINK" status={loadingStep > 3} />
                
                {/* FINAL READY STATE */}
                <div className="mt-4 border-t border-[#333] pt-4 flex justify-between items-center">
                    <span className={loadingStep === 5 ? "text-[#ef4444] animate-pulse font-bold" : "text-gray-600"}>
                        {loadingStep === 5 ? ">> SYSTEM READY <<" : "WAITING..."}
                    </span>
                    <span className="text-[#eab308]">
                        {/* Calculate percentage approximation based on step */}
                        {loadingStep === 5 ? "100" : Math.min(loadingStep * 20, 99)}%
                    </span>
                </div>
            </div>

            {/* PROGRESS BAR */}
            <div className="h-2 w-full bg-[#222] mt-4 relative overflow-hidden">
                <motion.div 
                    className="h-full bg-[#ef4444]"
                    initial={{ width: 0 }}
                    animate={{ width: `${loadingStep * 20}%` }}
                    // Slow transition to make the bar crawl between steps (60s duration per step)
                    transition={{ duration: 60, ease: "linear" }}
                />
            </div>
        </div>

        {/* FOOTER */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: loadingStep === 5 ? 1 : 0 }}
            className="mt-8 text-[#f59e0b] font-bold tracking-widest animate-pulse"
        >
            MANAGER ON DECK
        </motion.div>

      </div>
    </main>
  );
}

function Step({ label, status }: { label: string, status: boolean }) {
    return (
        <div className="flex justify-between items-center">
            <span className={status ? "text-white" : "text-gray-600"}>{label}</span>
            <span className={status ? "text-[#22c55e] font-bold" : "text-gray-800"}>
                {status ? "[OK]" : "..."}
            </span>
        </div>
    );
}