"use client";

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, MoreHorizontal, Trash2, UserX } from 'lucide-react';

const users = [
    { id: 1, name: 'Kofi Adu', avatar: 'https://picsum.photos/100/100?random=2', status: 'Contributor', totalContributions: '$5,250', withdrawals: '$10,000', loanBalance: '$0', joinDate: '2022-01-15' },
    { id: 2, name: 'Ama Badu', avatar: 'https://picsum.photos/100/100?random=1', status: 'Member', totalContributions: '$4,800', withdrawals: '$3,000', loanBalance: '$0', joinDate: '2022-01-20' },
    { id: 3, name: 'Yaw Mensah', avatar: 'https://picsum.photos/100/100?random=3', status: 'Loan', totalContributions: '$4,800', withdrawals: '$5,000', loanBalance: '$1,200', joinDate: '2022-02-10' },
    { id: 4, name: 'Adwoa Boateng', avatar: 'https://picsum.photos/100/100?random=4', status: 'Suspended', totalContributions: '$5,100', withdrawals: '$2,500', loanBalance: '$0', joinDate: '2022-03-01' },
];

type User = typeof users[0];

export default function UsersPage() {
    const [selectedUser, setSelectedUser] = useState<User | null>(users[0]);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'contributor': return 'bg-blue-100 text-blue-800';
            case 'member': return 'bg-green-100 text-green-800';
            case 'loan': return 'bg-yellow-100 text-yellow-800';
            case 'suspended': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    return (
        <div className="flex flex-col gap-6">
             <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <Breadcrumb>
                        <BreadcrumbList>
                        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
                        <BreadcrumbSeparator />
                         <BreadcrumbItem><BreadcrumbPage>Admin</BreadcrumbPage></BreadcrumbItem>
                         <BreadcrumbSeparator />
                        <BreadcrumbItem><BreadcrumbPage>Users</BreadcrumbPage></BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h1 className="text-3xl font-bold font-headline mt-2">Users</h1>
                </div>
            </header>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card><CardHeader><CardDescription>Total Members</CardDescription><CardTitle className="text-2xl font-bold">48</CardTitle></CardHeader></Card>
                <Card><CardHeader><CardDescription>Active Groups</CardDescription><CardTitle className="text-2xl font-bold">3</CardTitle></CardHeader></Card>
                <Card><CardHeader><CardDescription>Monthly Deposits</CardDescription><CardTitle className="text-2xl font-bold">$20,150</CardTitle></CardHeader></Card>
                <Card><CardHeader><CardDescription>Loan Outstanding</CardDescription><CardTitle className="text-2xl font-bold">$12,400</CardTitle></CardHeader></Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1 h-fit">
                    <CardHeader>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="flex flex-col">
                            {users.map(user => (
                                <button key={user.id} onClick={() => setSelectedUser(user)} className={`flex items-center gap-3 p-4 w-full text-left hover:bg-muted ${selectedUser?.id === user.id ? 'bg-muted' : ''}`}>
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={user.avatar} data-ai-hint="member avatar" />
                                        <AvatarFallback>{user.name.substring(0,2)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="font-semibold">{user.name}</p>
                                        <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {selectedUser && (
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                <div>
                                    <CardTitle className="font-headline text-2xl">{selectedUser.name}</CardTitle>
                                    <CardDescription>ID: {selectedUser.id} &bull; Joined: {selectedUser.joinDate}</CardDescription>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <Button variant="outline"><MessageSquare/> Message</Button>
                                    <Button variant="outline"><MoreHorizontal/></Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                                <div><p className="text-sm text-muted-foreground">Total Contributions</p><p className="font-bold text-lg">{selectedUser.totalContributions}</p></div>
                                <div><p className="text-sm text-muted-foreground">Withdrawals</p><p className="font-bold text-lg">{selectedUser.withdrawals}</p></div>
                                <div><p className="text-sm text-muted-foreground">Loan Balance</p><p className="font-bold text-lg">{selectedUser.loanBalance}</p></div>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-4">
                                <Button variant="destructive"><Trash2/> Delete User</Button>
                                <div className="flex gap-2">
                                  <Button variant="outline"><UserX/> Suspend</Button>
                                  <Input type="number" placeholder="Days" className="w-24" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="overview">
                                <TabsList>
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                                    <TabsTrigger value="loans">Loans</TabsTrigger>
                                    <TabsTrigger value="settings">Settings</TabsTrigger>
                                </TabsList>
                                <TabsContent value="overview" className="mt-4">
                                    <div className="w-full overflow-x-auto">
                                      <Table>
                                          <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Activity</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                                          <TableBody>
                                              <TableRow><TableCell>2024-07-15</TableCell><TableCell>Contribution</TableCell><TableCell>$250.00</TableCell><TableCell><Badge className="bg-green-100 text-green-800">Approved</Badge></TableCell></TableRow>
                                              <TableRow><TableCell>2024-07-05</TableCell><TableCell>Withdrawal</TableCell><TableCell>$10,000.00</TableCell><TableCell><Badge className="bg-green-100 text-green-800">Approved</Badge></TableCell></TableRow>
                                              <TableRow><TableCell>2024-06-25</TableCell><TableCell>Loan Request</TableCell><TableCell>$1,200.00</TableCell><TableCell><Badge className="bg-red-100 text-red-800">Rejected</Badge></TableCell></TableRow>
                                          </TableBody>
                                      </Table>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle className="font-headline">Create Member</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2"><Label>Full Name</Label><Input placeholder="Ama Badu" /></div>
                        <div className="space-y-2"><Label>Phone</Label><Input placeholder="+233 24 123 4567" /></div>
                        <div className="space-y-2"><Label>Role</Label><Select><SelectTrigger><SelectValue placeholder="Select Role" /></SelectTrigger></Select></div>
                        <Button>Create Member</Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="font-headline">Bulk User Actions</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">Select users from the directory to perform bulk actions.</p>
                        <div className="flex flex-wrap gap-2">
                            <Button>Notify Selected</Button>
                            <Button variant="outline">Delete Selected</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
