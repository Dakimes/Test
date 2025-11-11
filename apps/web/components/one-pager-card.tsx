import Link from 'next/link';
import { format } from 'date-fns';
import type { OnePagerSummary } from '@/lib/data';

interface Props {
  pager: OnePagerSummary;
}

const statusColor: Record<string, string> = {
  PENDING: 'text-amber-600',
  PROCESSING: 'text-blue-600',
  DONE: 'text-emerald-600',
  FAILED: 'text-red-600'
};

export function OnePagerCard({ pager }: Props) {
  return (
    <article className="flex flex-col gap-2 rounded-lg bg-white p-4 shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">{pager.title}</h3>
        <span className={`text-xs font-medium uppercase ${statusColor[pager.status]}`}>{pager.status}</span>
      </div>
      <p className="text-sm text-slate-600">{pager.techName}</p>
      <p className="text-xs text-slate-500">Created {format(new Date(pager.createdAt), 'PPP')}</p>
      <div className="mt-2 flex justify-end">
        <Link className="text-sm font-medium text-brand-600 hover:underline" href={`/p/${pager.slug}`}>
          Open
        </Link>
      </div>
    </article>
  );
}
