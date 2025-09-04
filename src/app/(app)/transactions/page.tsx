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
import { Badge } from "@/components/ui/badge";
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
import { Copy, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from '@/components/ui/separator';

const transactionsData = [
    { ref: 'REF-00125', member: 'Kofi Adu', email: 'k.adu@email.com', avatar: 'https://picsum.photos/100/100?random=2', type: 'Contribution', amount: '$250.00', date: '2024-07-15', status: 'Settled', method: 'Bank Transfer', category: 'Monthly Dues', cycle: 'July 2024' },
    { ref: 'W-REF-0045', member: 'Yaw Mensah', email: 'y.mensah@email.com', avatar: 'https://picsum.photos/100/100?random=3', type: 'Withdrawal', amount: '$5,000.00', date: '2024-07-14', status: 'Pending', method: 'Mobile Money', category: 'Loan', cycle: 'July 2024' },
    { ref: 'REF-00124', member: 'Ama Badu', email: 'a.badu@email.com', avatar: 'https://picsum.photos/100/100?random=1', type: 'Contribution', amount: '$250.00', date: '2024-07-14', status: 'Settled', method: 'Bank Transfer', category: 'Monthly Dues', cycle: 'July 2024' },
    { ref: 'FEE-0023', member: 'System', email: 'system', avatar: '', type: 'Fee', amount: '$5.00', date: '2024-07-12', status: 'Settled', method: 'N/A', category: 'Service Fee', cycle: 'July 2024' },
];

const historyData = [
    { event: 'Payment received', time: '1 hour ago'},
    { event: 'Status changed to Settled', time: '1 hour ago'},
    { event: 'Receipt uploaded', time: '2 hours ago'},
    { event: 'Transaction created', time: '4 hours ago'},
]

type Transaction = typeof transactionsData[0];

export default function TransactionsPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(transactionsData[0]);

  const getStatusBadge = (status: string) => {
      switch(status) {
          case 'Settled': return 'bg-green-100 text-green-800';
          case 'Pending': return 'bg-yellow-100 text-yellow-800';
          default: return 'bg-gray-100 text-gray-800';
      }
  }

  const getTypeBadge = (type: string) => {
      switch(type) {
          case 'Contribution': return 'bg-blue-100 text-blue-800';
          case 'Withdrawal': return 'bg-red-100 text-red-800';
          case 'Fee': return 'bg-purple-100 text-purple-800';
          default: return 'bg-gray-100 text-gray-800';
      }
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Transactions</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-bold font-headline mt-2">Transactions</h1>
        </div>
        <div className="flex items-center gap-4">
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader><CardDescription>Total Volume</CardDescription><CardTitle className="text-2xl font-bold">$125,430.00</CardTitle></CardHeader></Card>
        <Card><CardHeader><CardDescription>Contributions</CardDescription><CardTitle className="text-2xl font-bold">$85,200.00</CardTitle></CardHeader></Card>
        <Card><CardHeader><CardDescription>Withdrawals</CardDescription><CardTitle className="text-2xl font-bold">$40,150.00</CardTitle></CardHeader></Card>
        <Card><CardHeader><CardDescription>Fees & Adjustments</CardDescription><CardTitle className="text-2xl font-bold">$80.00</CardTitle></CardHeader></Card>
      </div>

       <Card>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-6">
            <Select><SelectTrigger><SelectValue placeholder="All Types" /></SelectTrigger></Select>
            <Select><SelectTrigger><SelectValue placeholder="All Members" /></SelectTrigger></Select>
            <Select><SelectTrigger><SelectValue placeholder="Any Status" /></SelectTrigger></Select>
            <Button variant="outline" className="justify-start text-left font-normal"><Calendar className="mr-2 h-4 w-4" />Date range</Button>
             <Button className="lg:col-span-1 sm:col-span-2 md:col-span-3">Apply</Button>
        </CardContent>
       </Card>

       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <Card className="xl:col-span-2">
                <CardHeader>
                    <CardTitle className="font-headline">All Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full overflow-x-auto">
                      <Table>
                          <TableHeader>
                              <TableRow>
                                  <TableHead>Reference</TableHead>
                                  <TableHead>Member</TableHead>
                                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                                  <TableHead>Amount</TableHead>
                                  <TableHead className="hidden md:table-cell">Date</TableHead>
                                  <TableHead>Status</TableHead>
                              </TableRow>
                          </TableHeader>
                          <TableBody>
                              {transactionsData.map((tx) => (
                                  <TableRow key={tx.ref} onClick={() => setSelectedTransaction(tx)} className={`cursor-pointer ${selectedTransaction?.ref === tx.ref ? 'bg-primary/10' : ''}`}>
                                      <TableCell className="font-medium">{tx.ref}</TableCell>
                                      <TableCell>
                                          <div className="flex items-center gap-2">
                                              <Avatar className="h-8 w-8">
                                                  <AvatarImage src={tx.avatar} data-ai-hint="member avatar" />
                                                  <AvatarFallback>{tx.member.substring(0,2)}</AvatarFallback>
                                              </Avatar>
                                              <div>
                                                  <p className="font-medium">{tx.member}</p>
                                                  <p className="text-xs text-muted-foreground hidden sm:block">{tx.email}</p>
                                              </div>
                                          </div>
                                      </TableCell>
                                      <TableCell className="hidden sm:table-cell"><Badge className={getTypeBadge(tx.type)}>{tx.type}</Badge></TableCell>
                                      <TableCell>{tx.amount}</TableCell>
                                      <TableCell className="hidden md:table-cell">{tx.date}</TableCell>
                                      <TableCell><Badge className={getStatusBadge(tx.status)}>{tx.status}</Badge></TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                    </div>
                </CardContent>
            </Card>

            {selectedTransaction && (
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Transaction Detail</CardTitle>
                        <CardDescription>{selectedTransaction.ref}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center"><span className="text-sm text-muted-foreground">Member</span><span className="font-medium">{selectedTransaction.member}</span></div>
                            <div className="flex justify-between items-center"><span className="text-sm text-muted-foreground">Amount</span><span className="font-medium text-lg">{selectedTransaction.amount}</span></div>
                            <div className="flex justify-between items-center"><span className="text-sm text-muted-foreground">Method</span><span className="font-medium">{selectedTransaction.method}</span></div>
                            <div className="flex justify-between items-center"><span className="text-sm text-muted-foreground">Status</span><Badge className={getStatusBadge(selectedTransaction.status)}>{selectedTransaction.status}</Badge></div>
                            <div className="flex justify-between items-center"><span className="text-sm text-muted-foreground">Category</span><span className="font-medium">{selectedTransaction.category}</span></div>
                             <div className="flex justify-between items-center"><span className="text-sm text-muted-foreground">Cycle</span><span className="font-medium">{selectedTransaction.cycle}</span></div>
                        </div>
                        <div className="flex gap-2">
                            <Button className="flex-1">Mark Settled</Button>
                            <Button variant="outline" size="icon"><Copy className="h-4 w-4" /></Button>
                        </div>
                        <Separator />
                        <div>
                            <h4 className="font-semibold mb-2">History</h4>
                            <div className="space-y-3">
                                {historyData.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="bg-muted rounded-full h-8 w-8 flex items-center justify-center shrink-0 mt-1"><Calendar className="h-4 w-4"/></div>
                                        <div>
                                            <p className="font-medium text-sm">{item.event}</p>
                                            <p className="text-xs text-muted-foreground">{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
       </div>
    </div>
  );
}
