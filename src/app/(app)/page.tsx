
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
import { MoreVertical } from "lucide-react";

const members = [
  {
    name: "Ama Badu",
    avatar: "https://picsum.photos/100/100?random=1",
    role: "Admin",
    contributed: "GH₵5,250.00",
    status: "Active",
  },
  {
    name: "Kofi Adu",
    avatar: "https://picsum.photos/100/100?random=2",
    role: "Member",
    contributed: "GH₵4,800.00",
    status: "Active",
  },
  {
    name: "Yaw Mensah",
    avatar: "https://picsum.photos/100/100?random=3",
    role: "Member",
    contributed: "GH₵4,800.00",
    status: "On-hold",
  },
  {
    name: "Adwoa Boateng",
    avatar: "https://picsum.photos/100/100?random=4",
    role: "Member",
    contributed: "GH₵5,100.00",
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
          <h1 className="text-3xl font-bold font-headline mt-2">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Total Registered Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">48</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Total Registered Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Total Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">GH₵85,200.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Total Withdrawals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">GH₵40,150.00</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">All Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead className="hidden sm:table-cell">Role</TableHead>
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
                      <TableCell className="hidden sm:table-cell">{member.role}</TableCell>
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
