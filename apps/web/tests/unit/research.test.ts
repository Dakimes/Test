import { describe, expect, it } from 'vitest';
import { ResearchService } from '@/lib/research';

describe('ResearchService', () => {
  it('returns mock data when USE_MOCKS=true', async () => {
    process.env.USE_MOCKS = 'true';
    const service = new ResearchService();
    const result = await service.searchFacts('test query');
    expect(result.snippets.length).toBeGreaterThan(0);
  });
});
