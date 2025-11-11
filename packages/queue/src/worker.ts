import 'dotenv/config';
import { Worker } from 'bullmq';
import { createLogger } from './services/logger';
import { processGenerationJob } from './processors/generateOnePager';

const logger = createLogger();

const worker = new Worker(
  'generate-one-pager',
  async (job) => {
    logger.info({ jobId: job.id }, 'received job');
    await processGenerationJob(job.data);
  },
  {
    connection: {
      host: process.env.REDIS_HOST ?? 'localhost',
      port: Number(process.env.REDIS_PORT ?? 6379)
    }
  }
);

worker.on('completed', (job) => {
  logger.info({ jobId: job.id }, 'job completed');
});

worker.on('failed', (job, error) => {
  logger.error({ jobId: job?.id, error }, 'job failed');
});
