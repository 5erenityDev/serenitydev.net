"use client";
import { motion } from "framer-motion";

export default function LobotomyEndPage() {
  return (
    <main className="w-[1920px] h-[1080px] bg-[#050505] relative overflow-hidden font-sans text-white flex items-center justify-center">
      {/* Background Darkening */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />

      <div className="relative z-20 w-[1000px] bg-[#1a1a1a] border-4 border-[#333] shadow-[0_0_100px_rgba(0,0,0,0.8)] p-12 text-center">
        
        {/* HEADER */}
        <h2 className="text-6xl font-black text-white uppercase mb-2 tracking-tight">
            Work Day Completed
        </h2>
        <p className="text-gray-500 font-mono text-xl mb-12 tracking-widest border-b border-[#333] pb-8">
            ALL CONTAINMENT UNITS SECURED
        </p>
        
        {/* REPORT CARD GRID */}
        <div className="grid grid-cols-3 gap-8 mb-12">
            <StatBox label="Energy Collected" value="100%" color="#00bcd4" delay={0.5} />
            <StatBox label="Casualties" value="0" color="#ef4444" delay={0.8} />
            <StatBox label="Chat Sanity" value="STABLE" color="#f59e0b" delay={1.1} />
        </div>

        {/* THE BIG RANK STAMP */}
        <motion.div 
            initial={{ scale: 2, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: -12 }}
            transition={{ delay: 1.5, type: "spring", bounce: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-8 border-[#eab308] text-[#eab308] font-black text-9xl px-12 py-4 rounded-lg bg-black/80 shadow-[0_0_50px_rgba(234,179,8,0.4)] backdrop-blur-sm"
        >
            S RANK
        </motion.div>

        {/* FOOTER MESSAGE */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="mt-16 text-gray-600 font-mono text-sm"
        >
            SYSTEM SHUTDOWN IMMINENT... <span className="animate-blink">_</span>
        </motion.div>

      </div>
    </main>
  );
}

function StatBox({ label, value, color, delay }: { label: string, value: string, color: string, delay: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-[#0a0a0a] border border-[#333] p-6 flex flex-col items-center gap-2"
        >
            <span className="text-gray-500 text-xs uppercase tracking-widest">{label}</span>
            <span className="text-4xl font-black" style={{ color }}>{value}</span>
        </motion.div>
    );
}