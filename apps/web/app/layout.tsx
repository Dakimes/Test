import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  title: 'TechOnePager',
  description: 'Generate concise technology one pagers with research-backed facts.',
  openGraph: {
    title: 'TechOnePager',
    description: 'Generate concise technology one pagers with research-backed facts.'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
