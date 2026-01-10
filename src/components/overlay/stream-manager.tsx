"use client";
import { useState, useEffect } from "react";
import { useTwitchChat } from "@/hooks/use-twitch-chat";

// Define the shape of data the Design layer needs
export interface StreamData {
  status: 'OFFLINE' | 'STARTING' | 'LIVE' | 'ENDING';
  channel: string;
}

interface StreamManagerProps {
  channel: string;
  // This is the "Render Prop" pattern - we pass the logic down to the design
  children: (data: StreamData) => React.ReactNode;
}

export default function StreamManager({ channel, children }: StreamManagerProps) {
  const [status, setStatus] = useState<StreamData['status']>('OFFLINE');
  
  // NOTE: This is where you plug in your real Stream Start/End listener.
  // For now, I added a keyboard listener so you can trigger it manually to test visuals.
  // Press '[' for START and ']' for END.
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
        if (e.key === '[') setStatus('STARTING');
        if (e.key === ']') setStatus('ENDING');
        if (e.key === '\\') setStatus('LIVE'); // Force Live
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Simulate "Starting" transition (e.g. intro animation time)
  useEffect(() => {
    if (status === 'STARTING') {
        const timer = setTimeout(() => setStatus('LIVE'), 4000); // 4s Intro
        return () => clearTimeout(timer);
    }
  }, [status]);

  return <>{children({ status, channel })}</>;
}