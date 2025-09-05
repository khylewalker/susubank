
"use client";

import { useState, useEffect } from "react";
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, CheckCheck, XCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { mockUsers as initialMockUsers, User } from "@/lib/mock-users";

type UserRequest = {
  id: string;
  member: string;
  email: string;
  group: string;
  type: string;
  details: string;
  destination: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};

const RequestsTable = ({ requests, onUpdateRequest }: { requests: UserRequest[], onUpdateRequest: (email: string, status: 'Approved' | 'Rejected') => void }) => {
    
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'approved': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

     const getTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'withdrawal': return 'bg-blue-100 text-blue-800';
            case 'loan': return 'bg-indigo-100 text-indigo-800';
            case 'kyc update': return 'bg-purple-100 text-purple-800';
            case 'dispute': return 'bg-orange-100 text-orange-800';
            case 'new member': return 'bg-pink-100 text-pink-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    return (
        <div className="w-full overflow-x-auto">
            <Table>
                <TableHeader><TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead className="hidden md:table-cell">Group</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                    {requests.map(req => (
                        <TableRow key={req.id}>
                            <TableCell className="font-mono text-xs">{req.id}</TableCell>
                            <TableCell>{req.member}</TableCell>
                            <TableCell className="hidden md:table-cell">{req.group}</TableCell>
                            <TableCell><Badge className={getTypeColor(req.type)}>{req.type}</Badge></TableCell>
                            <TableCell>{req.details}</TableCell>
                            <TableCell>{req.date}</TableCell>
                            <TableCell><Badge className={getStatusColor(req.status)}>{req.status}</Badge></TableCell>
                            <TableCell className="text-right">
                                {req.status === 'Pending' && (
                                    <div className="flex gap-2 justify-end">
                                        <Button size="icon" variant="ghost" className="h-7 w-7 text-green-600" onClick={() => onUpdateRequest(req.email, 'Approved')}>
                                            <Check className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="ghost" className="h-7 w-7 text-red-600" onClick={() => onUpdateRequest(req.email, 'Rejected')}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};


export default function UserRequestsPage() {
    const { toast } = useToast();
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [userRequests, setUserRequests] = useState<UserRequest[]>([]);
    const [approvedToday, setApprovedToday] = useState(0);
    const [rejectedToday, setRejectedToday] = useState(0);

    const isToday = (date: Date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    }

    const loadUsers = () => {
        const storedUsers = localStorage.getItem('mockUsers');
        const users: User[] = storedUsers ? JSON.parse(storedUsers) : initialMockUsers;

        setAllUsers(users);

        const requests = users
            .map((user, index) => ({
                id: `REQ-${String(index + 1).padStart(4, '0')}`,
                member: user.name,
                email: user.email,
                group: 'Unassigned',
                type: 'New Member',
                details: 'New account registration',
                destination: 'N/A',
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                status: user.status.charAt(0).toUpperCase() + user.status.slice(1) as 'Pending' | 'Approved' | 'Rejected',
                statusChangeDate: user.statusChangeDate ? new Date(user.statusChangeDate) : undefined,
            }));

        setUserRequests(requests);

        const todayApproved = requests.filter(r => r.status === 'Approved' && r.statusChangeDate && isToday(r.statusChangeDate)).length;
        const todayRejected = requests.filter(r => r.status === 'Rejected' && r.statusChangeDate && isToday(r.statusChangeDate)).length;
        setApprovedToday(todayApproved);
        setRejectedToday(todayRejected);
    };
    
    useEffect(() => {
        loadUsers();
        // Fallback for initial load if localStorage is empty
        if (!localStorage.getItem('mockUsers')) {
            localStorage.setItem('mockUsers', JSON.stringify(initialMockUsers));
        }
    }, []);

    const updateUsersInStorage = (updatedUsers: User[]) => {
        localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
        loadUsers(); // Reload state from storage
    };

    const handleUpdateRequest = (email: string, status: 'Approved' | 'Rejected') => {
        const updatedUsers = allUsers.map(user => {
            if (user.email === email) {
                return { ...user, status: status.toLowerCase() as 'approved' | 'rejected' | 'pending', statusChangeDate: new Date().toISOString() };
            }
            return user;
        });

        updateUsersInStorage(updatedUsers);

        toast({
            title: `Request ${status}`,
            description: `Request for ${email} has been ${status.toLowerCase()}.`,
        });
    };

    const handleBulkUpdate = (status: 'Approved' | 'Rejected') => {
        const now = new Date().toISOString();
        const updatedUsers = allUsers.map(user => {
            if (user.status === 'pending') {
                return { ...user, status: status.toLowerCase() as 'approved' | 'rejected' | 'pending', statusChangeDate: now };
            }
            return user;
        });
        
        updateUsersInStorage(updatedUsers);
        
        toast({
            title: `All Pending Requests ${status}`,
            description: `All pending requests have been ${status.toLowerCase()}.`,
        });
    };

    const pendingRequests = userRequests.filter(r => r.status === 'Pending');
    
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
                        <BreadcrumbItem><BreadcrumbPage>User Requests</BreadcrumbPage></BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h1 className="text-3xl font-bold font-headline mt-2">User Requests</h1>
                </div>
            </header>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card><CardHeader><CardDescription>Pending Requests</CardDescription><CardTitle className="text-2xl font-bold">{pendingRequests.length}</CardTitle></CardHeader></Card>
                <Card><CardHeader><CardDescription>Approved Today</CardDescription><CardTitle className="text-2xl font-bold">{approvedToday}</CardTitle></CardHeader></Card>
                <Card><CardHeader><CardDescription>Rejected Today</CardDescription><CardTitle className="text-2xl font-bold">{rejectedToday}</CardTitle></CardHeader></Card>
                <Card><CardHeader><CardDescription>New Member Requests</CardDescription><CardTitle className="text-2xl font-bold">{userRequests.filter(r => r.type === 'New Member').length}</CardTitle></CardHeader></Card>
            </div>

            <Tabs defaultValue="all">
                <Card>
                    <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <TabsList>
                            <TabsTrigger value="all">All Requests</TabsTrigger>
                            <TabsTrigger value="pending">Pending</TabsTrigger>
                            <TabsTrigger value="approved">Approved</TabsTrigger>
                            <TabsTrigger value="rejected">Rejected</TabsTrigger>
                             <TabsTrigger value="new-member">New Member</TabsTrigger>
                        </TabsList>
                        <div className="flex gap-2 shrink-0">
                            <Button variant="outline" onClick={() => handleBulkUpdate('Approved')}><CheckCheck /> Approve All</Button>
                            <Button variant="destructive" onClick={() => handleBulkUpdate('Rejected')}><XCircle /> Reject All</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <TabsContent value="all">
                            <RequestsTable requests={userRequests} onUpdateRequest={handleUpdateRequest} />
                        </TabsContent>
                        <TabsContent value="pending">
                            <RequestsTable requests={userRequests.filter(r => r.status === 'Pending')} onUpdateRequest={handleUpdateRequest} />
                        </TabsContent>
                        <TabsContent value="approved">
                            <RequestsTable requests={userRequests.filter(r => r.status === 'Approved')} onUpdateRequest={handleUpdateRequest} />
                        </TabsContent>
                        <TabsContent value="rejected">
                            <RequestsTable requests={userRequests.filter(r => r.status === 'Rejected')} onUpdateRequest={handleUpdateRequest} />
                        </TabsContent>
                         <TabsContent value="new-member">
                            <RequestsTable requests={userRequests.filter(r => r.type === 'New Member')} onUpdateRequest={handleUpdateRequest} />
                        </TabsContent>
                    </CardContent>
                </Card>
            </Tabs>
        </div>
    );
}
