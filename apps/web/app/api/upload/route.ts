import { NextRequest, NextResponse } from 'next/server';
import { saveUploadedSources } from '@/lib/storage';

export const runtime = 'nodejs';

type Uploadable = Blob & { name?: string; size: number };

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const files = formData.getAll('files').filter((value): value is Uploadable => value instanceof Blob) as Uploadable[];
  const metaRaw = formData.get('meta');
  const meta = typeof metaRaw === 'string' ? JSON.parse(metaRaw) : {};

  const result = await saveUploadedSources(files, meta);

  return NextResponse.json(result);
}
