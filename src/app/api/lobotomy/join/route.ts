import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { DEPARTMENTS, generateNewAgent } from '@/lib/lobotomy-utils';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { username, departmentName } = await req.json();
    if (!username || !departmentName) return NextResponse.json({ success: false });

    const cleanName = username.toLowerCase();
    const targetDeptName = departmentName.toUpperCase();

    // 1. Validate Department
    const targetDept = DEPARTMENTS.find(d => d.name === targetDeptName);
    
    if (!targetDept) {
        return NextResponse.json({ success: false, message: `Unknown Department: ${targetDeptName}` });
    }

    // 2. Find or Create Agent
    let agent = await prisma.lobotomyAgent.findUnique({ where: { username: cleanName }});
    
    // If they don't exist, create them with this department immediately
    if (!agent) {
        const newLook = generateNewAgent(cleanName, targetDept);
        agent = await prisma.lobotomyAgent.create({
            data: { ...newLook, hp: 100, sp: 100 }
        });
        return NextResponse.json({ success: true, message: `Registered to ${targetDept.name}`, agent });
    }

    // 3. Update Existing Agent
    // We only update department and userColor
    const updatedAgent = await prisma.lobotomyAgent.update({
        where: { username: cleanName },
        data: {
            department: targetDept.name,
            userColor: targetDept.color
        }
    });

    return NextResponse.json({ success: true, message: `Transferred to ${targetDept.name}`, agent: updatedAgent });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Join failed" }, { status: 500 });
  }
}