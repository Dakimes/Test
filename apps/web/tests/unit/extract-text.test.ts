import { describe, expect, it } from 'vitest';
import { extractTextFromSources } from '@/lib/parsing/extract-text';

describe('extractTextFromSources', () => {
  it('returns mock data when USE_MOCKS=true', async () => {
    process.env.USE_MOCKS = 'true';
    const result = await extractTextFromSources(['a', 'b']);
    expect(result.text).toHaveLength(2);
  });
});
