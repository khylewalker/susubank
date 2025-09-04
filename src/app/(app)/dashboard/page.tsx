
import { redirect } from 'next/navigation';

export default function DashboardPage() {
  // For now, we'll redirect to sign-in.
  // A real app would have a session check here.
  redirect('/sign-in');
}
