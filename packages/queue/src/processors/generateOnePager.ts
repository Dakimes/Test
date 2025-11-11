import { createLogger } from '../services/logger';
import { orchestrate } from '../services/orchestrator';

const logger = createLogger();

interface JobPayload {
  jobId: string;
  onePagerId: string;
  sourceIds: string[];
  payload: Record<string, unknown>;
}

export async function processGenerationJob(data: JobPayload) {
  logger.info({ jobId: data.jobId }, 'processing generation job');
  await orchestrate(data);
}
