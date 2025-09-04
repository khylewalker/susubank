
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
import { MessageSquare, MoreHorizontal, Trash2, UserX, UserCheck } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';


const initialUsers: any[] = [
];

type User = (typeof initialUsers)[0];

export default function UsersPage() {
    const { toast } = useToast();
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [suspensionDays, setSuspensionDays] = useState('');

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'contributor': return 'bg-blue-100 text-blue-800';
            case 'member': return 'bg-green-100 text-green-800';
            case 'loan': return 'bg-yellow-100 text-yellow-800';
            case 'suspended': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }
    
     const getTransactionStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'approved': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            case 'suspended': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    const handleSelectUser = (user: User) => {
        setSelectedUser(user);
        setSuspensionDays(''); // Reset suspension days when user changes
    };

    const handleToggleSuspend = () => {
        if (!selectedUser) return;

        const isSuspending = selectedUser.status !== 'Suspended';
        const days = parseInt(suspensionDays, 10);
        if (isSuspending && (isNaN(days) || days <= 0)) {
            toast({
                variant: "destructive",
                title: "Invalid Duration",
                description: "Please enter a valid number of days for the suspension.",
            });
            return;
        }

        const updatedUsers = users.map(u => {
            if (u.id === selectedUser.id) {
                const newStatus = isSuspending ? 'Suspended' : u.previousStatus;
                const newPreviousStatus = isSuspending ? u.status : u.previousStatus;
                return { ...u, status: newStatus, previousStatus: newPreviousStatus };
            }
            return u;
        });

        const updatedSelectedUser = updatedUsers.find(u => u.id === selectedUser.id) || null;
        
        setUsers(updatedUsers);
        setSelectedUser(updatedSelectedUser);
        setSuspensionDays('');

        toast({
            title: `User ${isSuspending ? 'Suspended' : 'Unsuspended'}`,
            description: `${selectedUser.name} has been ${isSuspending ? `suspended for ${days} day(s)` : 'unsuspended'}.`,
        });
    };

    return (
        <div className="flex flex-col gap-6">
             <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <Breadcrumb>
                        <BreadcrumbList>
                        <BreadcrumbItem><BreadcrumbLink href="/dashboard">Home</BreadcrumbLink></BreadcrumbItem>
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
                <Card><CardHeader><CardDescription>Total Members</CardDescription><CardTitle className="text-2xl font-bold">0</CardTitle></CardHeader></Card>
                <Card><CardHeader><CardDescription>Active Groups</CardDescription><CardTitle className="text-2xl font-bold">0</CardTitle></CardHeader></Card>
                <Card><CardHeader><CardDescription>Monthly Deposits</CardDescription><CardTitle className="text-2xl font-bold">GH₵0</CardTitle></CardHeader></Card>
                <Card><CardHeader><CardDescription>Loan Outstanding</CardDescription><CardTitle className="text-2xl font-bold">GH₵0</CardTitle></CardHeader></Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1 h-fit">
                    <CardHeader>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="flex flex-col">
                            {users.map(user => (
                                <button key={user.id} onClick={() => handleSelectUser(user)} className={`flex items-center gap-3 p-4 w-full text-left hover:bg-muted ${selectedUser?.id === user.id ? 'bg-muted' : ''}`}>
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
                                    <Link href={`/members/${selectedUser.id}`}><CardTitle className="font-headline text-2xl hover:underline">{selectedUser.name}</CardTitle></Link>
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
                                    <Button variant="outline" onClick={handleToggleSuspend}>
                                        {selectedUser.status === 'Suspended' ? <UserCheck/> : <UserX/>}
                                        {selectedUser.status === 'Suspended' ? 'Unsuspend' : 'Suspend'}
                                    </Button>
                                    {selectedUser.status !== 'Suspended' && (
                                        <Input 
                                            type="number" 
                                            placeholder="Days" 
                                            className="w-24" 
                                            value={suspensionDays}
                                            onChange={(e) => setSuspensionDays(e.target.value)}
                                            min="1"
                                        />
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="contributions">
                                <TabsList>
                                    <TabsTrigger value="contributions">Contributions</TabsTrigger>
                                    <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
                                    <TabsTrigger value="loans">Loans</TabsTrigger>
                                </TabsList>
                                <TabsContent value="contributions" className="mt-4">
                                    <div className="w-full overflow-x-auto">
                                        <Table>
                                            <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Activity</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                                            <TableBody>
                                                {selectedUser.transactions.filter(tx => tx.activity.toLowerCase().includes('contribution')).map((tx, i) => (
                                                    <TableRow key={i}>
                                                        <TableCell>{tx.date}</TableCell>
                                                        <TableCell>{tx.activity}</TableCell>
                                                        <TableCell>{tx.amount}</TableCell>
                                                        <TableCell><Badge className={getTransactionStatusColor(tx.status)}>{tx.status}</Badge></TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </TabsContent>
                                 <TabsContent value="withdrawals" className="mt-4">
                                    <div className="w-full overflow-x-auto">
                                        <Table>
                                            <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Activity</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                                            <TableBody>
                                                {selectedUser.transactions.filter(tx => tx.activity.toLowerCase().includes('withdrawal')).map((tx, i) => (
                                                    <TableRow key={i}>
                                                        <TableCell>{tx.date}</TableCell>
                                                        <TableCell>{tx.activity}</TableCell>
                                                        <TableCell>{tx.amount}</TableCell>
                                                        <TableCell><Badge className={getTransactionStatusColor(tx.status)}>{tx.status}</Badge></TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </TabsContent>
                                <TabsContent value="loans" className="mt-4">
                                    <div className="w-full overflow-x-auto">
                                        <Table>
                                            <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Activity</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                                            <TableBody>
                                                {selectedUser.transactions.filter(tx => tx.activity.toLowerCase().includes('loan')).map((tx, i) => (
                                                    <TableRow key={i}>
                                                        <TableCell>{tx.date}</TableCell>
                                                        <TableCell>{tx.activity}</TableCell>
                                                        <TableCell>{tx.amount}</TableCell>
                                                        <TableCell><Badge className={getTransactionStatusColor(tx.status)}>{tx.status}</Badge></TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
