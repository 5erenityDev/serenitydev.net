"use client";
import { motion } from "framer-motion";
import { generateNewAgent, DEPARTMENTS } from "@/lib/lobotomy-utils";
import AgentPortrait from "@/components/lobotomy/agent-portrait";

// MOCK DATA: Replace this with your actual list of subs/followers if you have a database fetch here.
// For now, this generates a visual example so the build passes.
const MOCK_COMMUNITY = [
  { name: "Serenity_Dev", dept: "CONTROL" },
  { name: "Nightbot", dept: "INFO" },
  { name: "Chatter_A", dept: "TRAINING" },
  { name: "Chatter_B", dept: "SECURITY" },
  { name: "Chatter_C", dept: "CENTRAL" },
];

export default function LobotomyTeamPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#ef4444] selection:text-white pb-20">
      
      {/* HEADER */}
      <header className="bg-[#111] border-b-4 border-[#ef4444] py-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/assets/noise.png')] pointer-events-none" />
        <h1 className="text-6xl font-black uppercase tracking-tighter mb-2 relative z-10">
          Organizational <span className="text-[#ef4444]">Chart</span>
        </h1>
        <p className="font-mono text-gray-500 tracking-[0.5em] uppercase text-sm relative z-10">
          Current Staff Assignment
        </p>
      </header>

      {/* DEPARTMENT GRID */}
      <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        
        {DEPARTMENTS.map((dept) => {
          // Find users assigned to this department (or just show placeholders)
          const members = MOCK_COMMUNITY.filter(u => u.dept === dept.name);
          
          // If no members, show at least one "Unknown" for visual demo
          if (members.length === 0) {
             members.push({ name: `Agent_${dept.name.substring(0,3)}`, dept: dept.name });
          }

          return (
            <motion.div 
              key={dept.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#111] border-2 border-[#333] overflow-hidden flex flex-col"
            >
              {/* DEPT HEADER */}
              <div 
                className="p-3 flex justify-between items-center border-b border-[#333]"
                style={{ backgroundColor: `${dept.color}20` }} // 20% opacity background
              >
                <h2 className="font-black text-xl uppercase tracking-tight" style={{ color: dept.color }}>
                  {dept.name} TEAM
                </h2>
                <div className="w-4 h-4 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: dept.color }} />
              </div>

              {/* AGENT LIST */}
              <div className="p-4 grid grid-cols-2 gap-4">
                {members.map((member) => {
                  // --- THE FIX: GENERATE IDENTITY HERE ---
                  const identity = generateNewAgent(member.name);

                  return (
                    <div key={member.name} className="flex flex-col items-center bg-[#1a1a1a] border border-[#333] p-2 rounded hover:border-white/20 transition-colors group">
                      
                      {/* PORTRAIT CONTAINER */}
                      <div className="w-24 h-24 relative mb-2 overflow-hidden bg-[#111] border border-white/5 rounded-full group-hover:scale-105 transition-transform">
                        <AgentPortrait 
                          // Pass the generated indexes
                          hairIndex={identity.hairIndex}
                          backHairIndex={identity.backHairIndex}
                          suitIndex={identity.suitIndex}
                          eyeIndex={identity.eyeIndex}
                          mouthIndex={identity.mouthIndex}
                          hairColor={identity.hairColor}
                          // Pass Department Info
                          deptColor={dept.color}
                          deptName={dept.name}
                        />
                      </div>

                      {/* NAME TAG */}
                      <div className="text-center">
                        <span className="block font-bold text-sm text-gray-200">{member.name}</span>
                        <span className="block text-[10px] font-mono text-gray-500 uppercase">
                          Level {Math.ceil(Math.random() * 5)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}

      </div>
    </div>
  );
}