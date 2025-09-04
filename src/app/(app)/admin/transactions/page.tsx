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
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, PlusCircle, Download, MoreHorizontal, Calendar } from 'lucide-react';

const adminTransactions = [
    { time: '2024-07-20 10:05 AM', type: 'Deposit', member: 'Kofi Adu', ref: 'REF-00125', amount: '$250.00', status: 'Approved' },
    { time: '2024-07-20 09:30 AM', type: 'Withdrawal', member: 'Yaw Mensah', ref: 'W-REF-0045', amount: '$5,000.00', status: 'Pending' },
    { time: '2024-07-19 02:15 PM', type: 'Dispute', member: 'Adwoa Boateng', ref: 'DIS-0004', amount: '$250.00', status: 'Rejected' },
    { time: '2024-07-19 11:00 AM', type: 'Deposit', member: 'Ama Badu', ref: 'REF-00124', amount: '$250.00', status: 'Approved' },
];

export default function AdminTransactionsPage() {
    
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
            case 'deposit': return 'bg-blue-100 text-blue-800';
            case 'withdrawal': return 'bg-red-100 text-red-800';
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
                        <BreadcrumbItem><BreadcrumbPage>Transactions</BreadcrumbPage></BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h1 className="text-3xl font-bold font-headline mt-2">Transactions</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline"><Calendar className="mr-2 h-4 w-4"/> Custom Range</Button>
                    <Select><SelectTrigger className="w-32"><SelectValue placeholder="All types" /></SelectTrigger></Select>
                    <Select><SelectTrigger className="w-32"><SelectValue placeholder="Status: Any" /></SelectTrigger></Select>
                    <Button variant="outline"><Download /> Export</Button>
                    <Button><PlusCircle /> New</Button>
                </div>
            </header>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card><CardHeader><CardDescription>Total Deposits</CardDescription><CardTitle className="text-2xl font-bold">$85,200</CardTitle></CardHeader></Card>
                <Card><CardHeader><CardDescription>Total Withdrawals</CardDescription><CardTitle className="text-2xl font-bold">$40,150</CardTitle></CardHeader></Card>
                <Card><CardHeader><CardDescription>Pending Reviews</CardDescription><CardTitle className="text-2xl font-bold">12</CardTitle></CardHeader></Card>
                <Card><CardHeader><CardDescription>Disputes</CardDescription><CardTitle className="text-2xl font-bold">3</CardTitle></CardHeader></Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                    <Tabs defaultValue="all">
                        <div className="flex items-center justify-between">
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="deposits">Deposits</TabsTrigger>
                                <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
                                <TabsTrigger value="disputes">Disputes</TabsTrigger>
                            </TabsList>
                             <div className="relative w-full max-w-xs">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="Search transactions..." className="pl-10" />
                            </div>
                        </div>
                        <TabsContent value="all" className="mt-4">
                            <Card>
                                <CardContent className="pt-6">
                                    <Table>
                                        <TableHeader><TableRow>
                                            <TableHead>Time</TableHead><TableHead>Type</TableHead><TableHead>Member</TableHead>
                                            <TableHead>Reference</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead>
                                            <TableHead className="text-right">Action</TableHead>
                                        </TableRow></TableHeader>
                                        <TableBody>
                                            {adminTransactions.map(tx => (
                                                <TableRow key={tx.ref}>
                                                    <TableCell className="text-xs">{tx.time}</TableCell>
                                                    <TableCell><Badge className={getTypeColor(tx.type)}>{tx.type}</Badge></TableCell>
                                                    <TableCell>{tx.member}</TableCell>
                                                    <TableCell className="font-mono text-xs">{tx.ref}</TableCell>
                                                    <TableCell>{tx.amount}</TableCell>
                                                    <TableCell><Badge className={getStatusColor(tx.status)}>{tx.status}</Badge></TableCell>
                                                    <TableCell className="text-right">
                                                        {tx.status === 'Pending' && <Button size="sm">Approve</Button>}
                                                        {tx.status !== 'Pending' && <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4"/></Button>}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
                <div className="lg:col-span-1 space-y-6">
                     <Card>
                        <CardHeader><CardTitle className="font-headline">Filters</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2"><Label>Type</Label><Select><SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger></Select></div>
                            <div className="space-y-2"><Label>Date range</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <Input type="date" placeholder="From"/>
                                    <Input type="date" placeholder="To"/>
                                </div>
                            </div>
                            <div className="space-y-2"><Label>Member</Label><Select><SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger></Select></div>
                             <div className="space-y-2"><Label>Status</Label><Select><SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger></Select></div>
                            <div className="flex gap-2">
                                <Button className="flex-1">Apply</Button>
                                <Button variant="ghost" className="flex-1">Clear</Button>
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader><CardTitle className="font-headline">Bulk Actions</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">0 items selected</p>
                            <div className="flex gap-2">
                                <Button className="flex-1" disabled>Approve All</Button>
                                <Button variant="destructive" className="flex-1" disabled>Reject All</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
