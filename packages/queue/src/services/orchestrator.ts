import { createLogger } from './logger';

const logger = createLogger();

interface OrchestratorPayload {
  jobId: string;
  onePagerId: string;
  sourceIds: string[];
  payload: Record<string, unknown>;
}

const orchestratorUrl = process.env.ORCHESTRATOR_URL ?? 'http://web:3000/api/internal/orchestrate';

export async function orchestrate(payload: OrchestratorPayload) {
  logger.info({ jobId: payload.jobId }, 'dispatching orchestration request');
  await fetch(orchestratorUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ jobId: payload.jobId, onePagerId: payload.onePagerId, sources: payload.sourceIds })
  });
}
