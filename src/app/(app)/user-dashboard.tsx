
"use client";

import type { User } from "@/lib/mock-users";
import {
  Card,
  CardContent,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const recentActivity = [
    {
        activity: 'Contribution',
        details: 'Cycle Contribution for July',
        amount: 'GH₵250.00',
        date: 'July 15, 2024',
        status: 'Completed',
    },
    {
        activity: 'Withdrawal',
        details: 'Emergency Withdrawal',
        amount: 'GH₵100.00',
        date: 'July 10, 2024',
        status: 'Approved',
    }
];

const groupMembers = [
    { name: 'Approved User', avatar: 'https://picsum.photos/seed/approved@susu.bank/100/100', status: 'Paid' },
    { name: 'First Timer', avatar: 'https://picsum.photos/seed/first.timer@susu.bank/100/100', status: 'Paid' },
    { name: 'Yaw Mensah', avatar: 'https://picsum.photos/seed/yaw.m@email.com/100/100', status: 'Pending' },
];

export default function UserDashboard({ user }: { user: User }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'completed':
        case 'approved':
        case 'paid':
             return 'bg-green-100 text-green-800';
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        default: return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold font-headline">Welcome, {user.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Here is your financial overview.</p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>My Total Contributions</CardDescription>
            <CardTitle className="text-2xl font-bold">GH₵500.00</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Current Cycle Contribution</CardDescription>
            <CardTitle className="text-2xl font-bold">GH₵250.00</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Group Pool Size</CardDescription>
            <CardTitle className="text-2xl font-bold">GH₵1,250.00</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Next Payout</CardDescription>
            <CardTitle className="text-2xl font-bold">Aug 1, 2024</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="font-headline">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Activity</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentActivity.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{item.activity}</TableCell>
                                <TableCell>{item.details}</TableCell>
                                <TableCell>{item.amount}</TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell><Badge className={getStatusColor(item.status)}>{item.status}</Badge></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">My Group (Innovators)</CardTitle>
            </CardHeader>
            <CardContent>
                 <ul className="space-y-4">
                    {groupMembers.map((member, index) => (
                        <li key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={member.avatar} data-ai-hint="member avatar" />
                                    <AvatarFallback>{member.name.substring(0,2)}</AvatarFallback>
                                </Avatar>
                                <p className="font-medium">{member.name}</p>
                            </div>
                            <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                        </li>
                    ))}
                 </ul>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
