import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import HomePage from '../page';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/signin');
  }
  return <HomePage searchParams={{}} />;
}
