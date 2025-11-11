import { prisma } from '@/lib/db';
import { logger } from '@/lib/logger';
import { extractTextFromSources } from '@/lib/parsing/extract-text';
import { pickBestImage } from '@/lib/parsing/pick-image';
import { ResearchService } from '@/lib/research';
import { detectTechnologies, fillSections } from '@/lib/llm';
import { renderHtmlTemplate } from '@/lib/generation/template';

interface OrchestratorInput {
  jobId: string;
  onePagerId: string;
  sources: string[];
}

export async function runOrchestration({ jobId, onePagerId, sources }: OrchestratorInput) {
  logger.info({ jobId, onePagerId }, 'starting orchestration');
  await prisma.job.update({
    where: { id: jobId },
    data: { state: 'PROCESSING', progress: 10 }
  });

  const extracted = await extractTextFromSources(sources);
  const detection = await detectTechnologies(extracted.text);

  await prisma.job.update({
    where: { id: jobId },
    data: { progress: 30 }
  });

  const research = new ResearchService();
  const researchQueries = [
    `${detection.candidates[0]?.name ?? 'technology'} market size TAM SAM SOM`,
    `${detection.candidates[0]?.name ?? 'technology'} CAGR outlook`,
    `Top vendors ${detection.candidates[0]?.name ?? 'technology'}`
  ];
  const snippets: string[] = [];
  for (const query of researchQueries) {
    const result = await research.searchFacts(query, detection.candidates[0]?.name);
    snippets.push(...result.snippets.map((item) => `${item.text} (${item.url})`));
  }

  await prisma.job.update({
    where: { id: jobId },
    data: { progress: 60 }
  });

  const sections = await fillSections({
    techName: detection.candidates[0]?.name ?? 'Technology',
    chunks: extracted.text,
    researchFindings: snippets
  });

  const heroImage = pickBestImage(extracted.images);
  const html = renderHtmlTemplate(detection.candidates[0]?.name ?? 'Technology', sections, heroImage);

  await prisma.onePager.update({
    where: { id: onePagerId },
    data: {
      techName: detection.candidates[0]?.name ?? 'Technology',
      title: detection.candidates[0]?.name ?? 'Technology',
      status: 'DONE',
      html,
      sections: {
        deleteMany: {},
        create: [
          {
            key: 'DESCRIPTION',
            content: sections,
            order: 0
          }
        ]
      }
    }
  });

  await prisma.job.update({
    where: { id: jobId },
    data: { state: 'DONE', progress: 100 }
  });

  logger.info({ jobId, onePagerId }, 'orchestration complete');
}
