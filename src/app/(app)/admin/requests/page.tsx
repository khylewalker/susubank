"use client";

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
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X } from 'lucide-react';

const userRequests = [
    { id: 'REQ-001', member: 'Yaw Mensah', type: 'Withdrawal', details: '$5,000.00 for Business', date: '2024-07-20', status: 'Pending' },
    { id: 'REQ-002', member: 'Adwoa Boateng', type: 'Loan', details: '$1,200.00 for School Fees', date: '2024-07-19', status: 'Pending' },
    { id: 'REQ-003', member: 'Kofi Adu', type: 'KYC Update', details: 'New Passport Uploaded', date: '2024-07-18', status: 'Approved' },
    { id: 'REQ-004', member: 'Ama Badu', type: 'Dispute', details: 'Incorrect contribution amount', date: '2024-07-17', status: 'Rejected' },
];

export default function UserRequestsPage() {
    
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
                        <BreadcrumbItem><BreadcrumbPage>User Requests</BreadcrumbPage></BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h1 className="text-3xl font-bold font-headline mt-2">User Requests</h1>
                </div>
            </header>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card><CardHeader><CardDescription>Pending Requests</CardDescription><CardTitle className="text-2xl font-bold">2</CardTitle></CardHeader></Card>
                <Card><CardHeader><CardDescription>Approved Today</CardDescription><CardTitle className="text-2xl font-bold">5</CardTitle></CardHeader></Card>
                <Card><CardHeader><CardDescription>Rejected Today</CardDescription><CardTitle className="text-2xl font-bold">1</CardTitle></CardHeader></Card>
            </div>

            <Card>
                <CardHeader>
                    <Tabs defaultValue="all">
                        <TabsList>
                            <TabsTrigger value="all">All Requests</TabsTrigger>
                            <TabsTrigger value="pending">Pending</TabsTrigger>
                            <TabsTrigger value="approved">Approved</TabsTrigger>
                            <TabsTrigger value="rejected">Rejected</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow>
                            <TableHead>Request ID</TableHead><TableHead>Member</TableHead><TableHead>Type</TableHead>
                            <TableHead>Details</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow></TableHeader>
                        <TableBody>
                            {userRequests.map(req => (
                                <TableRow key={req.id}>
                                    <TableCell className="font-mono text-xs">{req.id}</TableCell>
                                    <TableCell>{req.member}</TableCell>
                                    <TableCell><Badge className={getTypeColor(req.type)}>{req.type}</Badge></TableCell>
                                    <TableCell>{req.details}</TableCell>
                                    <TableCell>{req.date}</TableCell>
                                    <TableCell><Badge className={getStatusColor(req.status)}>{req.status}</Badge></TableCell>
                                    <TableCell className="text-right">
                                        {req.status === 'Pending' && (
                                            <div className="flex gap-2 justify-end">
                                                <Button size="icon" variant="outline" className="text-green-600 border-green-600 hover:bg-green-100 hover:text-green-700"><Check className="h-4 w-4"/></Button>
                                                <Button size="icon" variant="outline" className="text-red-600 border-red-600 hover:bg-red-100 hover:text-red-700"><X className="h-4 w-4"/></Button>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
