import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'crypto';
import { prisma } from '@/lib/db';
import { logger } from '@/lib/logger';

const STORAGE_ROOT = process.env.STORAGE_ROOT ?? path.join(process.cwd(), 'storage');

type Uploadable = Blob & { name?: string; size: number };

interface SaveResult {
  sourceIds: string[];
}

export async function saveUploadedSources(files: Uploadable[], meta: Record<string, unknown>): Promise<SaveResult> {
  await fs.mkdir(STORAGE_ROOT, { recursive: true });
  const storedIds: string[] = [];
  for (const file of files) {
    if (!file || typeof file.arrayBuffer !== 'function') continue;
    if (file.size > 25 * 1024 * 1024) {
      throw new Error('File too large');
    }
    const arrayBuffer = await file.arrayBuffer();
    const id = randomUUID();
    const safeName = file.name ?? 'upload.bin';
    const filePath = path.join(STORAGE_ROOT, `${id}-${safeName}`);
    await fs.writeFile(filePath, Buffer.from(arrayBuffer));
    const saved = await prisma.source.create({
      data: {
        type: 'UPLOAD',
        filename: safeName,
        meta,
        textSnippet: null
      }
    });
    storedIds.push(saved.id);
  }
  logger.info({ storedIds }, 'sources uploaded');
  return { sourceIds: storedIds };
}
