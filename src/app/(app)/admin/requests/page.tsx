
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
  type: 'New Member' | 'Withdrawal' | 'Contribution';
  details: string;
  destination: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  statusChangeDate?: Date;
};

const mockRequests: Omit<UserRequest, 'status' | 'statusChangeDate' | 'member' | 'email'>[] = [
    {
        id: 'REQ-0005',
        group: 'Innovators',
        type: 'Withdrawal',
        details: 'GH₵500.00',
        destination: 'Mobile Money',
        date: new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    },
    {
        id: 'REQ-0006',
        group: 'Pioneers',
        type: 'Contribution',
        details: 'GH₵250.00',
        destination: 'Bank Transfer',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    },
];


const RequestsTable = ({ requests, onUpdateRequest }: { requests: UserRequest[], onUpdateRequest: (id: string, email: string, status: 'Approved' | 'Rejected') => void }) => {
    
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
            case 'contribution': return 'bg-teal-100 text-teal-800';
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
                    {requests.length > 0 ? requests.map(req => (
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
                                        <Button size="icon" variant="ghost" className="h-7 w-7 text-green-600" onClick={() => onUpdateRequest(req.id, req.email, 'Approved')}>
                                            <Check className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="ghost" className="h-7 w-7 text-red-600" onClick={() => onUpdateRequest(req.id, req.email, 'Rejected')}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center">No pending requests of this type.</TableCell>
                        </TableRow>
                    )}
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

    const loadData = () => {
        const storedUsers = localStorage.getItem('mockUsers');
        const users: User[] = storedUsers ? JSON.parse(storedUsers) : initialMockUsers;
        setAllUsers(users);

        const storedRequests = localStorage.getItem('mockRequests');
        let currentRequests: UserRequest[];

        if (storedRequests) {
            currentRequests = JSON.parse(storedRequests).map((r: UserRequest) => ({...r, statusChangeDate: r.statusChangeDate ? new Date(r.statusChangeDate) : undefined}));
        } else {
             const newMemberRequests = users
                .map((user, index) => ({
                    id: `REQ-${String(index + 1).padStart(4, '0')}`,
                    member: user.name,
                    email: user.email,
                    group: 'Unassigned',
                    type: 'New Member' as 'New Member',
                    details: 'New account registration',
                    destination: 'N/A',
                    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                    status: user.status.charAt(0).toUpperCase() + user.status.slice(1) as 'Pending' | 'Approved' | 'Rejected',
                    statusChangeDate: user.statusChangeDate ? new Date(user.statusChangeDate) : undefined,
                }));

            const otherRequests = mockRequests.map((req, index) => {
                const user = users[index % users.length]; // Assign to a user
                return {
                    ...req,
                    member: user.name,
                    email: user.email,
                    status: 'Pending' as 'Pending',
                };
            });
            currentRequests = [...newMemberRequests, ...otherRequests];
        }

        setUserRequests(currentRequests);
        localStorage.setItem('mockRequests', JSON.stringify(currentRequests));

        const todayApproved = currentRequests.filter(r => r.status === 'Approved' && r.statusChangeDate && isToday(r.statusChangeDate)).length;
        const todayRejected = currentRequests.filter(r => r.status === 'Rejected' && r.statusChangeDate && isToday(r.statusChangeDate)).length;
        setApprovedToday(todayApproved);
        setRejectedToday(todayRejected);
    };
    
    useEffect(() => {
        loadData();
        // Fallback for initial load if localStorage is empty
        if (!localStorage.getItem('mockUsers')) {
            localStorage.setItem('mockUsers', JSON.stringify(initialMockUsers));
        }
    }, []);
    
    const updateDataInStorage = (updatedRequests: UserRequest[], updatedUsers: User[]) => {
        localStorage.setItem('mockRequests', JSON.stringify(updatedRequests));
        localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
        loadData(); // Reload state from storage
    };

    const handleUpdateRequest = (id: string, email: string, status: 'Approved' | 'Rejected') => {
        const now = new Date();
        const updatedRequests = userRequests.map(req => {
            if (req.id === id) {
                return { ...req, status: status, statusChangeDate: now };
            }
            return req;
        });
        
        const request = updatedRequests.find(r => r.id === id);
        let updatedUsers = [...allUsers];
        if (request && request.type === 'New Member') {
             updatedUsers = allUsers.map(user => {
                if (user.email === email) {
                    return { ...user, status: status.toLowerCase() as 'approved' | 'rejected' | 'pending', statusChangeDate: now.toISOString() };
                }
                return user;
            });
        }
        
        updateDataInStorage(updatedRequests, updatedUsers);

        toast({
            title: `Request ${status}`,
            description: `Request for ${email} has been ${status.toLowerCase()}.`,
        });
    };

    const handleBulkUpdate = (status: 'Approved' | 'Rejected') => {
        const now = new Date();
        
        const updatedRequests = userRequests.map(req => {
            if (req.status === 'Pending') {
                return { ...req, status, statusChangeDate: now };
            }
            return req;
        });

        const updatedUsers = allUsers.map(user => {
             if (user.status === 'pending') {
                return { ...user, status: status.toLowerCase() as 'approved' | 'rejected' | 'pending', statusChangeDate: now.toISOString() };
            }
            return user;
        })
        
        updateDataInStorage(updatedRequests, updatedUsers);
        
        toast({
            title: `All Pending Requests ${status}`,
            description: `All pending requests have been ${status.toLowerCase()}.`,
        });
    };

    const pendingRequests = userRequests.filter(r => r.status === 'Pending');
    const newMemberRequestsCount = userRequests.filter(r => r.type === 'New Member' && r.status === 'Pending').length;
    const withdrawalRequests = pendingRequests.filter(r => r.type === 'Withdrawal');
    const contributionRequests = pendingRequests.filter(r => r.type === 'Contribution');
    const newMemberRequests = pendingRequests.filter(r => r.type === 'New Member');
    
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
                <Card><CardHeader><CardDescription>New Member Requests</CardDescription><CardTitle className="text-2xl font-bold">{newMemberRequestsCount}</CardTitle></CardHeader></Card>
            </div>

            <Tabs defaultValue="all">
                <Card>
                    <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="new-members">New Members</TabsTrigger>
                            <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
                            <TabsTrigger value="contributions">Contributions</TabsTrigger>
                        </TabsList>
                        <div className="flex gap-2 shrink-0">
                            <Button variant="outline" onClick={() => handleBulkUpdate('Approved')}><CheckCheck /> Approve All</Button>
                            <Button variant="destructive" onClick={() => handleBulkUpdate('Rejected')}><XCircle /> Reject All</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <TabsContent value="all">
                            <RequestsTable requests={pendingRequests} onUpdateRequest={handleUpdateRequest} />
                        </TabsContent>
                        <TabsContent value="new-members">
                            <RequestsTable requests={newMemberRequests} onUpdateRequest={handleUpdateRequest} />
                        </TabsContent>
                        <TabsContent value="withdrawals">
                            <RequestsTable requests={withdrawalRequests} onUpdateRequest={handleUpdateRequest} />
                        </TabsContent>
                        <TabsContent value="contributions">
                            <RequestsTable requests={contributionRequests} onUpdateRequest={handleUpdateRequest} />
                        </TabsContent>
                    </CardContent>
                </Card>
            </Tabs>
        </div>
    );
}
