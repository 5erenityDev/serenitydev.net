import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { username, command } = await req.json(); // command: 'insanity' | 'death'
    if (!username) return NextResponse.json({ success: false });

    const cleanName = username.toLowerCase();
    
    // 1. Find Agent
    let agent = await prisma.lobotomyAgent.findUnique({ where: { username: cleanName }});

    if (!agent) {
       return NextResponse.json({ success: false, message: "Agent not found. Speak first!" });
    }

    let updates: any = {};
    let message = "";

    // 2. Logic Switch
    if (command === 'insanity') {
        if (agent.sp > 0) {
            // GO INSANE
            updates = { sp: 0, status: 'PANIC', cooldownUntil: new Date(Date.now() + 60000) };
            message = "Psychotic Break Induced.";
        } else {
            // RESTORE SANITY
            // (Only restore status to ACTIVE if they aren't also dead)
            const newStatus = agent.hp <= 0 ? 'DEAD' : 'ACTIVE';
            updates = { sp: 100, status: newStatus, cooldownUntil: null };
            message = "Sanity Restored.";
        }
    } 
    else if (command === 'death') {
        if (agent.hp > 0) {
            // DIE
            updates = { hp: 0, status: 'DEAD', cooldownUntil: new Date(Date.now() + 60000) };
            message = "Vital Signs Ceased.";
        } else {
            // REVIVE
            // (Only restore status to ACTIVE if they aren't also panicked, though usually revive fixes all)
            // For simplicity, reviving sets HP to 100. If SP is 0, they might still be panicked, but let's reset status to ACTIVE to be nice.
            updates = { hp: 100, status: 'ACTIVE', cooldownUntil: null };
            message = "Resurrection Protocol Complete.";
        }
    }

    // 3. Update DB
    const updatedAgent = await prisma.lobotomyAgent.update({
        where: { username: cleanName },
        data: updates
    });

    return NextResponse.json({ success: true, message, agent: updatedAgent });

  } catch (error) {
    console.error("Toggle API Error:", error);
    return NextResponse.json({ error: "Toggle failed" }, { status: 500 });
  }
}