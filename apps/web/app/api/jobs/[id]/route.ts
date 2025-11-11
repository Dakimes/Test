import { NextResponse } from 'next/server';
import { getJobStatus } from '@/lib/data';

export const runtime = 'nodejs';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(_: Request, { params }: Params) {
  const job = await getJobStatus(params.id);
  if (!job) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(job);
}
