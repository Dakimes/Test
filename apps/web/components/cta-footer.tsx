import Link from 'next/link';

export function CTAFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 text-center">
        <p className="text-lg font-semibold text-slate-800">Need another one pager?</p>
        <p className="text-sm text-slate-600">Kick off a new summary with your latest materials.</p>
        <Link
          className="rounded-md bg-brand-600 px-4 py-2 text-white shadow-sm transition hover:bg-brand-500"
          href="/new"
        >
          Make another one pager
        </Link>
      </div>
    </footer>
  );
}
