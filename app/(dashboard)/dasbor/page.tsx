import { redirect } from 'next/navigation';
import { getUser } from '@/lib/db/actions/users';

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  return <h1>Hello World</h1>;
}
