import { notFound } from 'next/navigation';
import { getOnePagerBySlug } from '@/lib/data';
import { CTAFooter } from '@/components/cta-footer';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function OnePagerView({ params }: PageProps) {
  const pager = await getOnePagerBySlug(params.slug);
  if (!pager) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <article className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-12 lg:flex-row">
        <nav className="w-full max-w-xs space-y-2 text-sm text-slate-600">
          <p className="font-semibold text-slate-800">Contents</p>
          <ul className="space-y-1">
            {pager.sections.map((section) => (
              <li key={section.key}>
                <a href={`#${section.key}`} className="text-brand-600 hover:underline">
                  {section.key}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex-1 space-y-8" dangerouslySetInnerHTML={{ __html: pager.html }} />
      </article>
      <CTAFooter />
    </main>
  );
}
