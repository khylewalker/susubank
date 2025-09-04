import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, PlusCircle } from "lucide-react";
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

const recentActivity = [
    { activity: "Contribution added", details: "Manual entry by admin", time: "2 days ago" },
    { activity: "Withdrawal approved", details: "Request #W-REF-0042", time: "15 days ago" },
    { activity: "Withdrawal requested", details: "For Business Investment", time: "16 days ago" },
];

export default function MemberOverviewPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="/admin/users">Users</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Kofi Adu</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
                <AvatarImage src="https://picsum.photos/100/100?random=2" data-ai-hint="member avatar" />
                <AvatarFallback>KA</AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-3xl font-bold font-headline">Kofi Adu</h1>
                <Badge>Member</Badge>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <Button><MessageSquare /> Message</Button>
            <Button variant="outline"><PlusCircle/> New Charge</Button>
        </div>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle className="font-headline text-base">Member Details</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        <div><p className="text-sm text-muted-foreground">Phone</p><p className="font-medium">+233 24 123 4567</p></div>
                        <div><p className="text-sm text-muted-foreground">Email</p><p className="font-medium">k.adu@email.com</p></div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle className="font-headline text-base">Financial Snapshot</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        <div><p className="text-sm text-muted-foreground">Total Saved</p><p className="font-medium">$5,250.00</p></div>
                        <div><p className="text-sm text-muted-foreground">Loans Outstanding</p><p className="font-medium">$0.00</p></div>
                    </CardContent>
                </Card>
            </div>
             <Card className="flex-grow">
                <CardHeader><CardTitle className="font-headline">Contribution Chart</CardTitle></CardHeader>
                <CardContent className="h-64 flex items-center justify-center">
                    <p className="text-muted-foreground">Mini Chart</p>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">
            <Card>
                <CardHeader><CardTitle className="font-headline text-base">Last Contribution</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">$250.00</p>
                    <p className="text-sm text-muted-foreground">on July 15, 2024</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle className="font-headline text-base">Missed Payments</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">0</p>
                     <p className="text-sm text-muted-foreground">Excellent standing</p>
                </CardContent>
            </Card>
        </div>
      </div>

       <Card>
            <CardHeader><CardTitle className="font-headline">Recent Activity</CardTitle></CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Activity</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead>Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentActivity.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{item.activity}</TableCell>
                                <TableCell>{item.details}</TableCell>
                                <TableCell>{item.time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

    </div>
  );
}
