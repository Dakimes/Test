import { prisma } from '@/lib/db';

export interface OnePagerSummary {
  id: string;
  slug: string;
  title: string;
  techName: string;
  status: string;
  createdAt: string;
}

interface ListOptions {
  search?: string;
  sort?: 'newest' | 'oldest';
}

export async function getOnePagers(options: ListOptions = {}): Promise<OnePagerSummary[]> {
  const { search, sort = 'newest' } = options;
  const where = search
    ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { techName: { contains: search, mode: 'insensitive' } }
        ]
      }
    : undefined;
  const items = await prisma.onePager.findMany({
    where,
    orderBy: { createdAt: sort === 'newest' ? 'desc' : 'asc' },
    select: {
      id: true,
      slug: true,
      title: true,
      techName: true,
      status: true,
      createdAt: true
    }
  });
  return items.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString()
  }));
}

export async function getOnePagerBySlug(slug: string) {
  const pager = await prisma.onePager.findUnique({
    where: { slug },
    include: {
      sections: {
        orderBy: {
          order: 'asc'
        }
      }
    }
  });
  if (!pager) return null;
  return {
    ...pager,
    createdAt: pager.createdAt.toISOString(),
    updatedAt: pager.updatedAt.toISOString(),
    sections: pager.sections.map((section) => ({
      id: section.id,
      key: section.key,
      order: section.order,
      content: section.content
    }))
  };
}

export async function getJobStatus(id: string) {
  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      onePager: true
    }
  });
  if (!job) return null;
  return {
    id: job.id,
    state: job.state,
    progress: job.progress,
    error: job.error,
    onePagerId: job.onePagerId,
    onePagerSlug: job.onePager?.slug ?? null
  };
}
