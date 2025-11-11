import { describe, expect, it } from 'vitest';
import { SectionSchema } from '@/lib/generation/schema';

describe('SectionSchema', () => {
  it('validates a correct payload', () => {
    const result = SectionSchema.safeParse({
      description: 'desc',
      purpose: 'purpose',
      challenges: ['c1'],
      advantages: ['a1'],
      economics: { valueProps: ['v1'], sampleROI: '— / TODO' },
      navigation: { area: 'Innovation' },
      useCases: ['u1'],
      market: { TAM: '1', SAM: '2', SOM: '3', growth: { metric: '10%', years: '2023-2028' } },
      vendors: ['Vendor'],
      references: [{ title: 'Ref', url: 'https://example.com' }]
    });
    expect(result.success).toBe(true);
  });
});
