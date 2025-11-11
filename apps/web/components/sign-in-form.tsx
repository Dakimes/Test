'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heading } from '@/components/ui/heading';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent'>('idle');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    await signIn('email', { email, callbackUrl: '/' });
    setStatus('sent');
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Heading level={2} className="text-center">
        Sign in via magic link
      </Heading>
      <Input
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : 'Send magic link'}
      </Button>
      {status === 'sent' && <p className="text-sm text-green-600">Check your email inbox.</p>}
    </form>
  );
}
