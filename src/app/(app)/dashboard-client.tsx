
"use client";

import { useEffect, useState } from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { mockUsers as initialMockUsers, User } from "@/lib/mock-users";
import UserDashboard from './user-dashboard';

export default function DashboardClient() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // In a real app, this data would come from an API/auth context
    const storedUsers = localStorage.getItem('mockUsers');
    const users: User[] = storedUsers ? JSON.parse(storedUsers) : initialMockUsers;
    
    // Simulate a logged-in user. Change this to test different users.
    const loggedInUserEmail = "approved@susu.bank"; // or "admin@susu.bank"
    const user = users.find(u => u.email === loggedInUserEmail) || null;
    setCurrentUser(user);

    const adminCheck = user?.email === 'admin@susu.bank';
    setIsAdmin(adminCheck);

    if (adminCheck) {
      const registeredUsers = users.filter(u => u.status === 'approved' && u.email !== 'admin@susu.bank');
      setTotalUsers(registeredUsers.length);
      
      const pendingRequests = users
          .filter(user => user.status === 'pending')
          .map((user, index) => ({
              id: `REQ-00${index+1}`,
              member: user.name,
              type: 'New Member',
              status: 'Pending',
          }));
      setRequests(pendingRequests);
      
      // For now, transactions are empty
      setTransactions([]);
    }

  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'approved': return 'bg-green-100 text-green-800';
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
  }
  
  if (!currentUser) {
    return <div>Loading...</div>; // Or a proper loader
  }
  
  if (!isAdmin) {
    return <UserDashboard user={currentUser} />;
  }


  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Admin!</p>
      </header>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-2xl font-bold">{totalUsers}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Total Groups Created</CardDescription>
            <CardTitle className="text-2xl font-bold">0</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>All Group Contributions</CardDescription>
            <CardTitle className="text-2xl font-bold">GH₵0.00</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>All Group Withdrawals</CardDescription>
            <CardTitle className="text-2xl font-bold">GH₵0.00</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-headline">Recent Transactions</CardTitle>
                    <CardDescription>A log of the latest financial activities.</CardDescription>
                </div>
                <Button asChild variant="outline" size="sm">
                    <Link href="/transactions">View All <ArrowUpRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Member</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.length > 0 ? transactions.map((tx) => (
                            <TableRow key={tx.id}>
                                <TableCell>{tx.member}</TableCell>
                                <TableCell>{tx.type}</TableCell>
                                <TableCell className="text-right">{tx.amount}</TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">No recent transactions.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-headline">Pending Requests</CardTitle>
                    <CardDescription>Member requests awaiting your approval.</CardDescription>
                </div>
                 <Button asChild variant="outline" size="sm">
                    <Link href="/admin/requests">View All <ArrowUpRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Member</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requests.length > 0 ? requests.map((req) => (
                             <TableRow key={req.id}>
                                <TableCell>{req.member}</TableCell>
                                <TableCell>{req.type}</TableCell>
                                <TableCell><Badge className={getStatusColor(req.status)}>{req.status}</Badge></TableCell>
                            </TableRow>
                        )): (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">No pending requests.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
