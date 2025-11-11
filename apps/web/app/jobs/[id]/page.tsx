import { notFound } from 'next/navigation';
import { getJobStatus } from '@/lib/data';
import { Heading } from '@/components/ui/heading';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function JobStatusPage({ params }: PageProps) {
  const job = await getJobStatus(params.id);
  if (!job) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-6">
      <Heading level={1}>Generation status</Heading>
      <div className="rounded-md bg-white p-4 shadow">
        <p className="text-sm text-slate-600">State: {job.state}</p>
        <p className="text-sm text-slate-600">Progress: {job.progress}%</p>
        {job.onePagerId && (
          <a className="text-brand-600 underline" href={`/p/${job.onePagerSlug}`}>
            View one pager
          </a>
        )}
        {job.error && <p className="text-sm text-red-600">{job.error}</p>}
      </div>
    </main>
  );
}
