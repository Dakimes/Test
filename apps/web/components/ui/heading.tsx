import { clsx } from 'clsx';
import { ReactNode } from 'react';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
}

const baseStyles = 'font-semibold text-slate-900';
const levelStyles: Record<number, string> = {
  1: 'text-3xl',
  2: 'text-2xl',
  3: 'text-xl',
  4: 'text-lg'
};

export function Heading({ level = 1, children, className }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag className={clsx(baseStyles, levelStyles[level], className)}>{children}</Tag>;
}
