import { SignInForm } from '@/components/sign-in-form';

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <SignInForm />
      </div>
    </main>
  );
}
