"use client";
import LobotomyLayout from "@/components/lobotomy/lobotomy-layout";
import LobotomyEventAlerts from "@/components/lobotomy/event-alert-system";

export default function StreamOverlayPage() {
  const CHANNEL = "serenity_dev";

  return (
    <div className="relative w-full h-full">
        {/* 1. The Dashboard Layout (Static Visuals + Chat + Game Hole) */}
        <LobotomyLayout channel={CHANNEL} />

        {/* 2. The Alert System (Overlays Popups) */}
        <LobotomyEventAlerts channel={CHANNEL} />
    </div>
  );
}