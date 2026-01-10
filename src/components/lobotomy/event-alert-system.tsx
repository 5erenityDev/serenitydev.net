"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTwitchChat } from "@/hooks/use-twitch-chat";

export type EventType = 'FOLLOW' | 'SUB' | 'BITS' | 'RAID';

interface AlertEvent {
  id: string;
  type: EventType;
  username: string;
  message?: string; // For bits amount or sub months
}

export default function LobotomyEventAlerts({ channel }: { channel: string }) {
  const [queue, setQueue] = useState<AlertEvent[]>([]);
  const [currentAlert, setCurrentAlert] = useState<AlertEvent | null>(null);
  const messages = useTwitchChat(channel);
  const processedRef = useRef<string | null>(null);

  // 1. LISTENER (Simulate events via Chat for now)
  // In a real production app, you would connect this to a WebSocket (EventSub/StreamElements)
  useEffect(() => {
    if (messages.length === 0) return;
    const latest = messages[messages.length - 1];
    if (latest.id === processedRef.current) return;
    processedRef.current = latest.id;

    const text = latest.text.trim();
    const user = latest.user;

    // SIMULATION COMMANDS (Type these in chat to test!)
    if (text.startsWith("!sim follow")) {
        triggerEvent("FOLLOW", "New_Roller");
    } else if (text.startsWith("!sim sub")) {
        triggerEvent("SUB", user, "Prime Subscription");
    } else if (text.startsWith("!sim bits")) {
        triggerEvent("BITS", user, "1000");
    } else if (text.startsWith("!sim raid")) {
        triggerEvent("RAID", "LobotomyCorp_Official", "50 Raiders");
    }

    // TODO: Add real TMI.js parsing here for Subs/Bits if your hook exposes tags
  }, [messages]);

  // 2. TRIGGER HELPER
  const triggerEvent = (type: EventType, username: string, message?: string) => {
    const newEvent: AlertEvent = {
        id: Math.random().toString(36),
        type,
        username,
        message
    };
    setQueue(prev => [...prev, newEvent]);
  };

  // 3. QUEUE PROCESSOR
  useEffect(() => {
    // If no alert is showing and we have items in queue
    if (!currentAlert && queue.length > 0) {
        const next = queue[0];
        setCurrentAlert(next);
        setQueue(prev => prev.slice(1)); // Remove from queue

        // Duration of alert
        setTimeout(() => {
            setCurrentAlert(null);
        }, 5000); // Show for 5 seconds
    }
  }, [queue, currentAlert]);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-start justify-center pt-24 z-50">
        <AnimatePresence>
            {currentAlert && (
                <AlertCard event={currentAlert} />
            )}
        </AnimatePresence>
    </div>
  );
}

// --- THE VISUAL COMPONENT ---
function AlertCard({ event }: { event: AlertEvent }) {
    
    // Config based on Type
    const config = {
        FOLLOW: { 
            color: "#D8D556", // Control Team Yellow
            title: "NEW AGENT HIRED",
            icon: ""
        },
        SUB: { 
            color: "#DA7F2F", // Training Team Orange
            title: "PROMOTION APPROVED",
            icon: ""
        },
        BITS: { 
            color: "#00bcd4", // Welfare/Ice Blue
            title: "ENKEPHALIN REFINED",
            icon: ""
        },
        RAID: { 
            color: "#81339C", // Info Team Purple (or Red for danger)
            title: "ORDEAL INCOMING",
            icon: ""
        }
    }[event.type];

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="relative w-[600px] h-[120px] bg-[#111] border-2 shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex overflow-hidden"
            style={{ borderColor: config.color }}
        >
            {/* LEFT ICON STRIP */}
            <div className="w-24 h-full flex items-center justify-center text-4xl relative overflow-hidden" style={{ backgroundColor: config.color }}>
                {/* Stripe Pattern Overlay */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 10px, transparent 10px, transparent 20px)' }} />
                <span className="relative z-10 drop-shadow-md text-white">{config.icon}</span>
            </div>

            {/* CONTENT */}
            <div className="flex-1 flex flex-col justify-center px-6 relative">
                {/* Background Tech Lines */}
                <div className="absolute top-2 right-2 w-full h-[1px] bg-white/10" />
                <div className="absolute bottom-2 right-2 w-2/3 h-[1px] bg-white/10" />

                <h2 className="text-xl font-black uppercase tracking-widest mb-1" style={{ color: config.color }}>
                    {config.title}
                </h2>
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-white tracking-tight">{event.username}</span>
                    {event.message && (
                        <span className="text-sm font-mono text-gray-400 border-l border-gray-600 pl-3">
                            {event.message}
                        </span>
                    )}
                </div>
            </div>

            {/* DECORATIVE CORNER */}
            <div className="absolute top-0 right-0 p-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: config.color }} />
            </div>
        </motion.div>
    );
}