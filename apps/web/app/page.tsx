import Link from 'next/link';
import { Suspense } from 'react';
import { getOnePagers } from '@/lib/data';
import { OnePagerCard } from '@/components/one-pager-card';
import { Heading } from '@/components/ui/heading';

interface PageProps {
  searchParams: {
    q?: string;
    sort?: 'newest' | 'oldest';
  };
}

async function OnePagerList({ searchParams }: PageProps) {
  const onePagers = await getOnePagers({ search: searchParams.q, sort: searchParams.sort });
  if (!onePagers.length) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center">
        <p className="text-slate-600">No one pagers match your filters.</p>
      </div>
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {onePagers.map((pager) => (
        <OnePagerCard key={pager.id} pager={pager} />
      ))}
    </div>
  );
}

export default function HomePage({ searchParams }: PageProps) {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Heading level={1}>Your one pagers</Heading>
        <Link
          href="/new"
          className="rounded-md bg-brand-600 px-4 py-2 text-white shadow-sm transition hover:bg-brand-500"
        >
          New one pager
        </Link>
      </div>
      <form className="flex flex-col gap-4 rounded-md bg-white p-4 shadow md:flex-row md:items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700" htmlFor="search">
            Search
          </label>
          <input
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            type="search"
            name="q"
            id="search"
            defaultValue={searchParams.q ?? ''}
            placeholder="Filter by title or technology"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="sort">
            Sort by
          </label>
          <select
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            id="sort"
            name="sort"
            defaultValue={searchParams.sort ?? 'newest'}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <button
          type="submit"
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-brand-500"
        >
          Apply
        </button>
      </form>
      <Suspense fallback={<p className="text-slate-600">Loading...</p>}>
        {/* @ts-expect-error Async Server Component */}
        <OnePagerList searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
