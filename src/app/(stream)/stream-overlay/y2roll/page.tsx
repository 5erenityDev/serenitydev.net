"use client";
import SerenityAvatar from "@/components/y2roll/serenity-avatar"; // Ensure this points to your MAIN avatar file with the audio logic
import Y2RollGoalBar from "@/components/y2roll/y2roll-goal-bar";
import Y2RollChatBox from "@/components/y2roll/y2roll-chat-box";
import Y2RollSpeechBubble from "@/components/y2roll/y2roll-speech-bubble";

export default function Y2RollOverlay() {
  return (
    <main className="w-[1920px] h-[1080px] relative overflow-hidden fixed inset-0 bg-transparent font-sans">
      
      {/* 1. BOTTOM LAYER: The Static Overlay Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         {/* eslint-disable-next-line @next/next/no-img-element */}
         <img 
           src="/assets/overlay/Y2Roll-Overlay-Base.png" 
           alt="Overlay" 
           className="w-full h-full object-cover"
         />
      </div>

      {/* 2. AVATAR LAYER (Middle) */}
      {/* The "Click to Start" overlay lives inside this component. 
          We use pointer-events-none here to let clicks pass through to the game if needed,
          BUT the 'Click to Start' button inside SerenityAvatar forces itself to capture clicks 
          when the mic is off.
      */}
      <div className="absolute inset-0 z-10 pointer-events-none">
         <SerenityAvatar />
      </div>

      {/* 3. GOALS (Left Side) */}
      <div className="absolute 
          top-[300px] 
          left-[40px] 
          w-[280px] 
          flex flex-col gap-6 z-20"
      >
         <Y2RollGoalBar label="ROLLERS" target={100} dataKey="followers" />
         <Y2RollGoalBar label="GEMS" target={50} dataKey="subs" />
      </div>

      {/* 4. CHAT (Right Side) */}
      <div className="absolute 
          top-[38px] 
          right-[38px] 
          w-[300px] 
          h-[600px] 
          z-20"
      >
         <Y2RollChatBox channel="serenitydev" className="w-full h-full" />
      </div>

      {/* 5. SPEECH BUBBLE (Bottom Center - Top Layer) */}
      <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 w-full max-w-4xl z-30 pointer-events-none flex justify-center">
         <Y2RollSpeechBubble />
      </div>

    </main>
  );
}