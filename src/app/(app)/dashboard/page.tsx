
"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import DashboardClient from '../dashboard-client';

export default function DashboardPage() {
  const router = useRouter();
  
  // A real app would have a session check here.
  // For now, we'll simulate a simple check.
  const isLoggedIn = true; // In a real app, this would come from a session/auth context

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/sign-in');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    // You can return a loader here while the redirect happens
    return null; 
  }
  
  return <DashboardClient />;
}
