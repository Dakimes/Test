import { Queue } from 'bullmq';
import { prisma } from '@/lib/db';

const connection = {
  connection: {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: Number(process.env.REDIS_PORT ?? 6379)
  }
};

const queueName = 'generate-one-pager';

export const generationQueue = new Queue(queueName, connection);

interface EnqueuePayload {
  sourceIds: string[];
  payload: Record<string, unknown>;
}

export async function enqueueGenerationJob(body: EnqueuePayload) {
  const onePager = await prisma.onePager.create({
    data: {
      slug: `onepager-${Date.now()}`,
      title: 'Processing one pager',
      techName: 'Processing',
      status: 'PROCESSING',
      html: '',
      ownerId: null
    }
  });

  const job = await prisma.job.create({
    data: {
      id: `job-${onePager.id}`,
      onePagerId: onePager.id,
      state: 'PENDING',
      progress: 0
    }
  });

  await generationQueue.add(
    'generate',
    {
      jobId: job.id,
      onePagerId: onePager.id,
      sourceIds: body.sourceIds,
      payload: body.payload
    },
    {
      removeOnComplete: true,
      removeOnFail: false
    }
  );

  return job;
}
