import { logger } from '@/lib/logger';

export interface ExtractedContent {
  text: string[];
  images: string[];
}

export async function extractTextFromSources(sourcePaths: string[]): Promise<ExtractedContent> {
  logger.info({ sources: sourcePaths.length }, 'extracting text');
  if (process.env.USE_MOCKS === 'true') {
    return {
      text: sourcePaths.map((_, index) => `Mock content chunk ${index + 1}`),
      images: []
    };
  }
  // Placeholder extraction logic
  return {
    text: ['No parser implemented yet.'],
    images: []
  };
}
