
"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardClient from '../dashboard-client';
import UserDashboard from '../user-dashboard';
import type { User } from '@/lib/mock-users';
import { mockUsers as initialMockUsers } from '@/lib/mock-users';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulate logged in state

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/sign-in');
    } else {
      // In a real app, you'd get the current user from a session context.
      // We'll simulate it by grabbing the last logged-in user from localStorage.
      const lastLoggedInEmail = localStorage.getItem('lastLoggedInEmail');
      const mockUsers = localStorage.getItem('mockUsers') ? JSON.parse(localStorage.getItem('mockUsers')!) : initialMockUsers;
      const currentUser = mockUsers.find((u: User) => u.email === lastLoggedInEmail);
      
      // Default to admin if no one is "logged in" for demo purposes
      setUser(currentUser || mockUsers.find((u: User) => u.email === 'admin@susu.bank')!);
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) {
    // You can return a loader here while the redirect or user loading happens
    return null; 
  }
  
  if (user.email === 'admin@susu.bank') {
    return <DashboardClient />;
  }

  return <UserDashboard user={user} />;
}
