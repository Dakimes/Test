import { z } from 'zod';

export const SectionSchema = z.object({
  description: z.string(),
  purpose: z.string(),
  challenges: z.array(z.string()),
  advantages: z.array(z.string()),
  economics: z.object({
    valueProps: z.array(z.string()),
    sampleROI: z.string().optional()
  }),
  navigation: z.object({
    area: z.string(),
    subarea: z.string().optional(),
    direction: z.string().optional()
  }),
  useCases: z.array(z.string()),
  market: z.object({
    TAM: z.string(),
    SAM: z.string(),
    SOM: z.string(),
    growth: z.object({
      metric: z.string(),
      years: z.string()
    })
  }),
  vendors: z.array(z.string()),
  references: z.array(
    z.object({
      title: z.string(),
      url: z.string()
    })
  )
});

export type Sections = z.infer<typeof SectionSchema>;
