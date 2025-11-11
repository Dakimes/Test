import { logger } from '@/lib/logger';
import { SectionSchema, Sections } from '@/lib/generation/schema';

interface DetectTechnologiesResult {
  candidates: { name: string; desc: string }[];
  rationale: string;
}

export async function detectTechnologies(textChunks: string[]): Promise<DetectTechnologiesResult> {
  logger.info({ chunkCount: textChunks.length }, 'detecting technologies');
  if (process.env.USE_MOCKS === 'true') {
    return {
      candidates: [
        { name: 'MockTech', desc: 'A mocked emerging technology.' }
      ],
      rationale: 'Mock rationale.'
    };
  }
  // Placeholder for integration with actual LLM providers
  return {
    candidates: [
      { name: 'SampleTech', desc: 'Generated placeholder candidate.' }
    ],
    rationale: 'LLM output placeholder.'
  };
}

export async function fillSections(input: {
  techName: string;
  chunks: string[];
  researchFindings: string[];
}): Promise<Sections> {
  logger.info({ techName: input.techName }, 'generating sections');
  if (process.env.USE_MOCKS === 'true') {
    return SectionSchema.parse({
      description: `${input.techName} overview`,
      purpose: 'Demonstrate mocked section output.',
      challenges: ['Limited real data'],
      advantages: ['Quick experimentation'],
      economics: { valueProps: ['Lower cost to explore'], sampleROI: '— / TODO' },
      navigation: { area: 'Innovation', direction: 'Exploratory' },
      useCases: ['Internal prototyping'],
      market: { TAM: '— / TODO', SAM: '— / TODO', SOM: '— / TODO', growth: { metric: '— / TODO', years: '— / TODO' } },
      vendors: ['Example Vendor'],
      references: input.researchFindings.map((entry) => ({ title: entry, url: 'https://example.com' }))
    });
  }
  return SectionSchema.parse({
    description: `${input.techName} generated description`,
    purpose: 'Placeholder purpose',
    challenges: ['Data unavailable'],
    advantages: ['Evidence-based summary'],
    economics: { valueProps: [], sampleROI: '— / TODO' },
    navigation: { area: 'Strategy' },
    useCases: [],
    market: { TAM: '— / TODO', SAM: '— / TODO', SOM: '— / TODO', growth: { metric: '— / TODO', years: '— / TODO' } },
    vendors: [],
    references: []
  });
}
