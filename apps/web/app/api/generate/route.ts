import { NextRequest, NextResponse } from 'next/server';
import { enqueueGenerationJob } from '@/lib/queue';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const job = await enqueueGenerationJob(body);
  return NextResponse.json(job);
}
