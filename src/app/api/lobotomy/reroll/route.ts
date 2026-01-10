import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateNewAgent } from '@/lib/lobotomy-utils';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { username } = await req.json();
    if (!username) return NextResponse.json({ success: false });

    const cleanName = username.toLowerCase();
    const agent = await prisma.lobotomyAgent.findUnique({ where: { username: cleanName }});

    if (!agent) {
       return NextResponse.json({ success: false, message: "Agent not found." });
    }

    // Cost Check (0 for now)
    const COST = 0; 
    if (agent.totalPeBoxes < COST) {
        return NextResponse.json({ success: false, message: "Not enough PE-Boxes" });
    }

    // --- CRITICAL CHANGE ---
    // We pass the CURRENT department to the generator so it doesn't change
    const currentDept = { name: agent.department, color: agent.userColor };
    const fullStats = generateNewAgent(cleanName, currentDept);
    
    const { username: _ignored, ...appearanceStats } = fullStats;

    const updatedAgent = await prisma.lobotomyAgent.update({
        where: { username: cleanName },
        data: {
            ...appearanceStats,
            totalPeBoxes: { decrement: COST }
        }
    });

    return NextResponse.json({ success: true, message: "Reroll Complete.", agent: updatedAgent });

  } catch (error) {
    return NextResponse.json({ error: "Reroll failed" }, { status: 500 });
  }
}