import { logger } from '@/lib/logger';

export function pickBestImage(images: string[]): string | null {
  logger.info({ count: images.length }, 'picking best image');
  return images.length > 0 ? images[0] : null;
}
