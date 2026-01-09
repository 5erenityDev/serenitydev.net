"use client";
import { useState } from "react";
import AgentPortrait from "@/components/lobotomy/agent-portrait";

// --- LOGIC REPLICATION (To ensure 1:1 match with Stream) ---

const DEPARTMENTS = [
  { name: "CONTROL", color: "#D8D556" },
  { name: "INFO", color: "#81339C" },
  { name: "TRAINING", color: "#DA7F2F" },
  { name: "SECURITY", color: "#69A448" },
  { name: "CENTRAL", color: "#FFC50B" },
  { name: "DISCIPLINE", color: "#FF0000" },
  { name: "WELFARE", color: "#456FFF" },
  { name: "EXTRACTION", color: "#2E2E2E" },
  { name: "RECORD", color: "#606060" },
  { name: "ARCHITECTURE", color: "#FFFFFF" },
  { name: "RABBIT", color: "#FD3C00" },
];

const getIdentity = (username: string) => {
  let hash = 0;
  // FIX: Force lowercase so casing doesn't change the Department
  const normalized = username.toLowerCase();

  for (let i = 0; i < normalized.length; i++) {
    hash = normalized.charCodeAt(i) + ((hash << 5) - hash);
  }
  const deptIndex = Math.abs(hash) % DEPARTMENTS.length;
  return { dept: DEPARTMENTS[deptIndex] };
};

export default function LobotomyGeneratorPage() {
  const [username, setUsername] = useState("");
  
  const displayName = username.trim() || "Employee";
  // Logic now handles casing automatically inside getIdentity
  const { dept } = getIdentity(displayName); 

  return (
    <div className="flex flex-col items-center py-12 px-4 w-full min-h-[80vh] font-sans">
      
      {/* TITLE */}
      <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter uppercase text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
        Employee Database
      </h1>
      <p className="text-gray-400 mb-10 text-center max-w-lg">
        Enter your username below to retrieve your assigned Department and Appearance record for the Lobotomy Corp stream.
      </p>

      {/* INPUT FIELD */}
      <div className="w-full max-w-md mb-12 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-amber-600 rounded opacity-25 group-hover:opacity-75 transition duration-500 blur"></div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Username..."
          className="relative w-full bg-black text-white text-xl font-mono text-center p-4 border-2 border-[#333] focus:border-white outline-none transition-all placeholder:text-gray-700 uppercase tracking-wider"
        />
      </div>

      {/* --- THE ID CARD --- */}
      <div className="relative group perspective-1000">
        
        {/* Card Container */}
        <div 
            className="w-[320px] md:w-[400px] bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl transition-all duration-500 border-2 relative"
            style={{ borderColor: dept.color, boxShadow: `0 0 30px -10px ${dept.color}40` }}
        >
            {/* Header Stripe */}
            <div className="h-16 w-full flex items-center justify-between px-6 relative overflow-hidden" style={{ backgroundColor: dept.color }}>
                <span className="font-black text-black/80 text-lg tracking-widest z-10">LOBOTOMY CORP</span>
                <span className="font-mono font-bold text-black/50 text-xs z-10">ID: {Math.abs(displayName.length * 425)}</span>
                
                {/* Stripe Pattern Overlay */}
                <div className="absolute inset-0 opacity-20" 
                     style={{ backgroundImage: `repeating-linear-gradient(-45deg, #000, #000 2px, transparent 2px, transparent 10px)` }} 
                />
            </div>

            {/* Main Content */}
            <div className="p-8 flex flex-col items-center relative">
                
                {/* Portrait Circle */}
                <div className="relative w-48 h-48 mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-[#333] bg-[#0a0a0a] overflow-hidden shadow-inner">
                        {/* THE GENERATED CHARACTER */}
                        <div className="w-full h-full transform scale-110 translate-y-2">
                            <AgentPortrait 
                                username={displayName} 
                                deptColor={dept.color} 
                                deptName={dept.name}
                            />
                        </div>
                        
                        {/* CRT Scanline Overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] pointer-events-none opacity-40" />
                    </div>
                    
                    {/* Decorative Ring */}
                    <div className="absolute -inset-2 border border-dashed rounded-full animate-[spin_10s_linear_infinite] opacity-30" style={{ borderColor: dept.color }} />
                </div>

                {/* Text Info */}
                <div className="text-center space-y-2 w-full">
                    <div className="bg-black/50 border border-white/10 p-2 rounded">
                        <h2 className="text-2xl font-bold text-white uppercase tracking-tight truncate">
                            {displayName}
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-4 w-full">
                        <div className="bg-[#222] p-2 rounded flex flex-col">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Department</span>
                            <span className="font-bold text-sm" style={{ color: dept.color }}>{dept.name}</span>
                        </div>
                        <div className="bg-[#222] p-2 rounded flex flex-col">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Clearance</span>
                            <span className="font-bold text-sm text-white">LEVEL {Math.min(5, Math.floor(displayName.length / 2) + 1)}</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Warning Stripe */}
            <div className="h-4 w-full" style={{ 
                background: `repeating-linear-gradient(45deg, ${dept.color}, ${dept.color} 10px, #111 10px, #111 20px)`
            }} />
        </div>

      </div>

    </div>
  );
}