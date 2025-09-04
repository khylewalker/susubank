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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical, Users, TrendingUp, Clock } from "lucide-react";

const members = [
  {
    name: "Ama Badu",
    avatar: "https://picsum.photos/100/100?random=1",
    role: "Admin",
    contributed: "$5,250.00",
    status: "Active",
  },
  {
    name: "Kofi Adu",
    avatar: "https://picsum.photos/100/100?random=2",
    role: "Member",
    contributed: "$4,800.00",
    status: "Active",
  },
  {
    name: "Yaw Mensah",
    avatar: "https://picsum.photos/100/100?random=3",
    role: "Member",
    contributed: "$4,800.00",
    status: "On-hold",
  },
  {
    name: "Adwoa Boateng",
    avatar: "https://picsum.photos/100/100?random=4",
    role: "Member",
    contributed: "$5,100.00",
    status: "Active",
  },
];

export default function DashboardPage() {
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
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-bold font-headline mt-2">Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Group Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">$48,950.00</p>
            <p className="text-sm text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">My Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">$5,250.00</p>
            <p className="text-sm text-muted-foreground">Cycle Total: $20,150.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Upcoming Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">$250.00</p>
            <p className="text-sm text-muted-foreground">Due on July 25, 2024</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        <Card className="flex flex-row items-center justify-between p-4">
            <div>
                <CardDescription>Active Members</CardDescription>
                <CardTitle className="text-2xl font-bold">48</CardTitle>
            </div>
            <Users className="h-8 w-8 text-muted-foreground" />
        </Card>
        <Card className="flex flex-row items-center justify-between p-4">
            <div>
                <CardDescription>Loans Outstanding</CardDescription>
                <CardTitle className="text-2xl font-bold">$12,400</CardTitle>
            </div>
             <TrendingUp className="h-8 w-8 text-muted-foreground" />
        </Card>
        <Card className="flex flex-row items-center justify-between p-4">
            <div>
                <CardDescription>On-time Rate</CardDescription>
                <CardTitle className="text-2xl font-bold">98.5%</CardTitle>
            </div>
            <Clock className="h-8 w-8 text-muted-foreground" />
        </Card>
        <Card className="flex flex-row items-center justify-between p-4 bg-primary text-primary-foreground">
            <div>
                <CardDescription className="text-primary-foreground/80">Cycle Progress</CardDescription>
                <CardTitle className="text-2xl font-bold">75%</CardTitle>
            </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Members</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Contributed</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.name}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} data-ai-hint="member avatar" />
                          <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{member.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>{member.contributed}</TableCell>
                    <TableCell>
                      <Badge variant={member.status === "Active" ? "default" : "secondary"} className={member.status === "Active" ? "bg-green-500/20 text-green-700" : "bg-yellow-500/20 text-yellow-700"}>
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
