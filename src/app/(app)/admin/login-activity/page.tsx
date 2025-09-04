
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
    { id: 1, name: 'Kofi Adu', avatar: 'https://picsum.photos/100/100?random=2', role: 'Admin', ip: '192.168.1.1', timestamp: '2024-07-22 10:00 AM', status: 'Success' },
    { id: 2, name: 'Ama Badu', avatar: 'https://picsum.photos/100/100?random=1', role: 'Member', ip: '10.0.0.5', timestamp: '2024-07-22 09:45 AM', status: 'Success' },
    { id: 3, name: 'Yaw Mensah', avatar: 'https://picsum.photos/100/100?random=3', role: 'Member', ip: '172.16.0.10', timestamp: '2024-07-22 09:30 AM', status: 'Failed' },
    { id: 4, name: 'Adwoa Boateng', avatar: 'https://picsum.photos/100/100?random=4', role: 'Member', ip: '203.0.113.25', timestamp: '2024-07-21 08:00 PM', status: 'Success' },
    { id: 5, name: 'Kofi Adu', avatar: 'https://picsum.photos/100/100?random=2', role: 'Admin', ip: '192.168.1.1', timestamp: '2024-07-21 07:55 PM', status: 'Success' },
];

export default function LoginActivityPage() {

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'success': return 'bg-green-100 text-green-800';
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
                        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
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
                                <TableHead>Role</TableHead>
                                <TableHead>IP Address</TableHead>
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
                                            <span className="font-medium">{log.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell><Badge className={getRoleColor(log.role)}>{log.role}</Badge></TableCell>
                                    <TableCell className="font-mono text-xs">{log.ip}</TableCell>
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
