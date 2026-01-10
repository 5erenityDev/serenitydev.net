"use client";
import { useEffect, useRef } from 'react';
import { useContainmentProtocol } from '@/hooks/use-containment-protocol';
import { useTwitchChat } from '@/hooks/use-twitch-chat'; 
import { motion } from 'framer-motion';

export default function ContainmentUnit({ className = "" }: { className?: string }) {
  const { lastLog, processReroll, processJoin, processToggle } = useContainmentProtocol();
  
  const messages = useTwitchChat("serenity_dev");
  const processedRef = useRef<string | null>(null);

  useEffect(() => {
    if (messages.length === 0) return;

    const latest = messages[messages.length - 1];
    if (latest.id === processedRef.current) return;
    processedRef.current = latest.id;

    const text = latest.text.trim().toLowerCase();
    
    // --- COMMAND LISTENER ---
    if (text === '!reroll') {
        processReroll(latest.user);
    } 
    else if (text.startsWith('!join ')) {
        const args = text.split(' ');
        if (args.length > 1) processJoin(latest.user, args[1]);
    }
    else if (text === '!insanity') {
        processToggle(latest.user, 'insanity');
    }
    else if (text === '!death') {
        processToggle(latest.user, 'death');
    }

  }, [messages, processReroll, processJoin, processToggle]);

  return (
    <div className={`flex bg-[#0a0a0a] border-t-4 border-[#333] shadow-[0_-10px_30px_rgba(0,0,0,0.5)] font-mono text-white overflow-hidden ${className}`}>
        
        {/* --- LEFT: VACANT CELL --- */}
        <div className="w-[280px] border-r-4 border-[#333] relative flex flex-col">
            <div className="bg-[#111] p-2 border-b border-[#333] flex justify-between items-center z-10">
                <div className="flex items-center gap-2 opacity-50">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-black text-sm border-2 border-white/50 shadow-lg bg-[#22c55e]">
                        Z
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 font-bold tracking-widest">X-00-00</span>
                    </div>
                </div>
                <div className="bg-[#1a1a1a] text-gray-500 border border-gray-700 px-2 py-1 text-xs font-black rounded">
                    SAFE
                </div>
            </div>

            <div className="flex-1 relative flex items-center justify-center bg-[#050505] overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[url('/assets/noise.png')] mix-blend-overlay" />
                <div className="relative w-32 h-32 flex flex-col items-center justify-center opacity-30">
                    <div className="w-24 h-24 border-4 border-dashed border-white/20 rounded-full animate-[spin_10s_linear_infinite]" />
                    <span className="absolute text-xs font-black text-white/50 tracking-[0.2em]">VACANT</span>
                </div>
            </div>
        </div>

        {/* --- CENTER: INSTRUCTIONS (2x2 Grid) --- */}
        <div className="flex-1 flex flex-col border-r-4 border-[#333] relative bg-[#080808]">
            <div className="bg-[#151515] p-2 border-b border-[#333] flex items-baseline gap-4">
                <h2 className="text-xl font-black uppercase tracking-tight text-gray-400">Standard Containment</h2>
                <span className="text-xs text-[#22c55e] uppercase tracking-widest animate-pulse">
                    {">> REGISTRY OPEN"}
                </span>
            </div>

            {/* 2x2 COMMAND GRID */}
            <div className="flex-1 grid grid-cols-2 grid-rows-2 p-2 gap-2">
                
                {/* REROLL */}
                <div className="flex flex-col justify-center items-start bg-[#111] border border-[#333] px-4 rounded hover:bg-[#1a1a1a] transition-colors">
                    <span className="text-[#eab308] font-black text-[10px] uppercase tracking-widest">Identity</span>
                    <span className="text-xl font-black text-white tracking-tighter">!reroll</span>
                </div>

                {/* JOIN */}
                <div className="flex flex-col justify-center items-start bg-[#111] border border-[#333] px-4 rounded hover:bg-[#1a1a1a] transition-colors">
                    <span className="text-[#3b82f6] font-black text-[10px] uppercase tracking-widest">Transfer</span>
                    <span className="text-xl font-black text-white tracking-tighter">!join <span className="text-sm opacity-50">[DEPT]</span></span>
                </div>

                {/* INSANITY */}
                <div className="flex flex-col justify-center items-start bg-[#111] border border-[#333] px-4 rounded hover:bg-[#1a1a1a] transition-colors group">
                    <span className="text-purple-500 font-black text-[10px] uppercase tracking-widest group-hover:animate-pulse">Sanity Check</span>
                    <span className="text-xl font-black text-white tracking-tighter">!insanity</span>
                </div>

                {/* DEATH */}
                <div className="flex flex-col justify-center items-start bg-[#111] border border-[#333] px-4 rounded hover:bg-[#1a1a1a] transition-colors group">
                    <span className="text-red-600 font-black text-[10px] uppercase tracking-widest group-hover:animate-pulse">Vital Sign</span>
                    <span className="text-xl font-black text-white tracking-tighter">!death</span>
                </div>

            </div>

            <div className="h-8 bg-[#111] border-t border-[#333] relative flex items-center justify-between px-4">
                <span className="text-gray-600 font-bold text-[10px]">SEPHIRAH: SERENITY</span>
                <div className="flex gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-green-500/50 rounded-full" />
                    <div className="w-2 h-2 bg-green-500/20 rounded-full" />
                </div>
            </div>
        </div>

        {/* --- RIGHT: LOG TERMINAL --- */}
        <div className="w-[300px] bg-black flex flex-col p-2 relative">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 border-b border-[#333] pb-1">
                System Log
            </span>
            <div className="flex-1 overflow-hidden flex flex-col justify-end gap-1 text-xs font-mono">
                <div className="opacity-30 text-[10px] text-gray-600">Database... Connected.</div>
                <div className="opacity-30 text-[10px] text-gray-600">Protocol... V-2.4.</div>
                <motion.div 
                    key={lastLog} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[#00bcd4] font-bold leading-tight bg-[#111] p-2 border-l-2 border-[#00bcd4]"
                >
                    {lastLog}
                </motion.div>
            </div>
        </div>

    </div>
  );
}