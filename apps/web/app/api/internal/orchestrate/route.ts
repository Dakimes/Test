import { NextRequest, NextResponse } from 'next/server';
import { runOrchestration } from '@/lib/generation/orchestrator';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const body = await request.json();
  await runOrchestration(body);
  return NextResponse.json({ ok: true });
}
