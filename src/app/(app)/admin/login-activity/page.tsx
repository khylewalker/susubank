
"use client";

import {
  Card,
  CardContent,
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const loginActivity = [
    { id: 1, name: "First Timer", email: "first.timer@susu.bank", group: "Innovators", phone: "+233241234567", residence: "Accra, Ghana", timestamp: "2024-07-28 10:00 AM", status: "Active", avatar: "https://picsum.photos/100/100?random=1" },
    { id: 2, name: "Approved User", email: "approved@susu.bank", group: "Pioneers", phone: "+233241234568", residence: "Kumasi, Ghana", timestamp: "2024-07-28 09:45 AM", status: "Logged Out", avatar: "https://picsum.photos/100/100?random=2" },
    { id: 3, name: "New User", email: "new@susu.bank", group: "Innovators", phone: "+233241234569", residence: "Tema, Ghana", timestamp: "2024-07-28 09:30 AM", status: "Failed", avatar: "https://picsum.photos/100/100?random=3" },
];

export default function LoginActivityPage() {

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'logged out': return 'bg-gray-100 text-gray-800';
            case 'failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }
    
    const getRoleColor = (role: string) => {
        switch (role.toLowerCase()) {
            case 'admin': return 'bg-purple-100 text-purple-800';
            case 'member': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    return (
        <div className="flex flex-col gap-6">
             <header>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem><BreadcrumbLink href="/dashboard">Home</BreadcrumbLink></BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem><BreadcrumbPage>Admin</BreadcrumbPage></BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem><BreadcrumbPage>Login Activity</BreadcrumbPage></BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className="text-3xl font-bold font-headline mt-2">Login Activity</h1>
            </header>
            
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Login History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Member</TableHead>
                                <TableHead className="hidden md:table-cell">Group</TableHead>
                                <TableHead className="hidden lg:table-cell">Phone</TableHead>
                                <TableHead className="hidden sm:table-cell">Residence</TableHead>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loginActivity.map(log => (
                                <TableRow key={log.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={log.avatar} data-ai-hint="member avatar" />
                                                <AvatarFallback>{log.name.substring(0,2)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{log.name}</p>
                                                <p className="text-xs text-muted-foreground hidden sm:block">{log.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{log.group}</TableCell>
                                    <TableCell className="hidden lg:table-cell">{log.phone}</TableCell>
                                    <TableCell className="text-xs hidden sm:table-cell">{log.residence}</TableCell>
                                    <TableCell>{log.timestamp}</TableCell>
                                    <TableCell><Badge className={getStatusColor(log.status)}>{log.status}</Badge></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
