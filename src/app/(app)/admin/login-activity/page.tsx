
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
    { id: 1, name: 'Kofi Adu', avatar: 'https://picsum.photos/100/100?random=2', role: 'Admin', ip: '192.168.1.1', timestamp: '2024-07-22 10:00 AM', status: 'Active', group: 'Group A', email: 'k.adu@email.com', phone: '+233 24 123 4567' },
    { id: 2, name: 'Ama Badu', avatar: 'https://picsum.photos/100/100?random=1', role: 'Member', ip: '10.0.0.5', timestamp: '2024-07-22 09:45 AM', status: 'Logged Out', group: 'Group B', email: 'a.badu@email.com', phone: '+233 24 234 5678' },
    { id: 3, name: 'Yaw Mensah', avatar: 'https://picsum.photos/100/100?random=3', role: 'Member', ip: '172.16.0.10', timestamp: '2024-07-22 09:30 AM', status: 'Failed', group: 'Group A', email: 'y.mensah@email.com', phone: '+233 24 345 6789' },
    { id: 4, name: 'Adwoa Boateng', avatar: 'https://picsum.photos/100/100?random=4', role: 'Member', ip: '203.0.113.25', timestamp: '2024-07-21 08:00 PM', status: 'Logged Out', group: 'Group C', email: 'a.boateng@email.com', phone: '+233 24 456 7890' },
    { id: 5, name: 'Kofi Adu', avatar: 'https://picsum.photos/100/100?random=2', role: 'Admin', ip: '192.168.1.1', timestamp: '2024-07-21 07:55 PM', status: 'Logged Out', group: 'Group A', email: 'k.adu@email.com', phone: '+233 24 123 4567' },
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
                                <TableHead className="hidden md:table-cell">Group</TableHead>
                                <TableHead className="hidden lg:table-cell">Phone</TableHead>
                                <TableHead className="hidden sm:table-cell">IP Address</TableHead>
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
                                    <TableCell className="font-mono text-xs hidden sm:table-cell">{log.ip}</TableCell>
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
