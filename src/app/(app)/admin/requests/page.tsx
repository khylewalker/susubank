
"use client";

import { useState } from "react";
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

const initialUserRequests: any[] = [
];


type UserRequest = (typeof initialUserRequests)[0];

const RequestsTable = ({ requests, onUpdateRequest }: { requests: UserRequest[], onUpdateRequest: (id: string, status: 'Approved' | 'Rejected') => void }) => {
    
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
        <Table>
            <TableHeader><TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Member</TableHead>
                <TableHead className="hidden md:table-cell">Group</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="hidden lg:table-cell">Destination</TableHead>
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
                        <TableCell className="hidden lg:table-cell">{req.destination}</TableCell>
                        <TableCell>{req.date}</TableCell>
                        <TableCell><Badge className={getStatusColor(req.status)}>{req.status}</Badge></TableCell>
                         <TableCell className="text-right">
                            {req.status === 'Pending' && (
                                <div className="flex gap-2 justify-end">
                                    <Button size="icon" variant="ghost" className="h-7 w-7 text-green-600" onClick={() => onUpdateRequest(req.id, 'Approved')}>
                                        <Check className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-7 w-7 text-red-600" onClick={() => onUpdateRequest(req.id, 'Rejected')}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};


export default function UserRequestsPage() {
    const { toast } = useToast();
    const [userRequests, setUserRequests] = useState<UserRequest[]>(initialUserRequests);

    const handleUpdateRequest = (id: string, status: 'Approved' | 'Rejected') => {
        setUserRequests(prev => prev.map(req => req.id === id ? { ...req, status } : req));
        toast({
            title: `Request ${status}`,
            description: `Request ID ${id} has been ${status.toLowerCase()}.`,
        });
    };

    const handleBulkUpdate = (status: 'Approved' | 'Rejected') => {
        setUserRequests(prev => prev.map(req => req.status === 'Pending' ? { ...req, status } : req));
        toast({
            title: `All Pending Requests ${status}`,
            description: `All pending requests have been ${status.toLowerCase()}.`,
        });
    };
    
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
                        <BreadcrumbItem><BreadcrumbPage>User Requests</BreadcrumbPage></BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h1 className="text-3xl font-bold font-headline mt-2">User Requests</h1>
                </div>
            </header>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card><CardHeader><CardDescription>Pending Requests</CardDescription><CardTitle className="text-2xl font-bold">{userRequests.filter(r => r.status === 'Pending').length}</CardTitle></CardHeader></Card>
                <Card><CardHeader><CardDescription>Approved Today</CardDescription><CardTitle className="text-2xl font-bold">0</CardTitle></CardHeader></Card>
                <Card><CardHeader><CardDescription>Rejected Today</CardDescription><CardTitle className="text-2xl font-bold">0</CardTitle></CardHeader></Card>
                <Card><CardHeader><CardDescription>New Member Requests</CardDescription><CardTitle className="text-2xl font-bold">{userRequests.filter(r => r.type === 'New Member' && r.status === 'Pending').length}</CardTitle></CardHeader></Card>
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
