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
import { Search, PlusCircle, Download, Filter } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const pendingApprovals = [
    { ref: 'W-REF-0045', amount: '$5,000.00', member: 'Yaw Mensah', status: 'Awaiting' },
    { ref: 'W-REF-0044', amount: '$2,500.00', member: 'Adwoa Boateng', status: 'Needs 1 more' },
    { ref: 'W-REF-0043', amount: '$1,000.00', member: 'Esi Williams', status: 'Awaiting' },
];

const withdrawalHistory = [
    { desc: 'Business Investment', member: 'Kofi Adu', type: 'Withdrawal', amount: '$10,000.00', date: '2024-07-05' },
    { desc: 'Family Emergency', member: 'Ama Badu', type: 'Withdrawal', amount: '$3,000.00', date: '2024-06-20' },
];


export default function WithdrawalsPage() {
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
                <BreadcrumbPage>Withdrawals</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-bold font-headline mt-2">Withdrawals</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search withdrawals..." className="pl-10" />
          </div>
          <Button variant="outline"><Download /> Export</Button>
          <Button><PlusCircle /> New Withdrawal</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Available Pool</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">$36,550.00</p>
            <p className="text-sm text-muted-foreground">Total funds available for withdrawal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">3</p>
            <p className="text-sm text-muted-foreground">Totaling $8,500.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">My Last Withdrawal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">$10,000.00</p>
            <p className="text-sm text-muted-foreground">On July 5, 2024</p>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <CardTitle className="font-headline">Filters</CardTitle>
                <Filter className="h-5 w-5 text-muted-foreground" />
            </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select>
                <SelectTrigger><SelectValue placeholder="All Members" /></SelectTrigger>
            </Select>
            <Select>
                <SelectTrigger><SelectValue placeholder="Current Cycle" /></SelectTrigger>
            </Select>
            <Select defaultValue="pending">
                <SelectTrigger><SelectValue /></SelectTrigger>
                 <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                     <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
            </Select>
             <Button>Apply Filters</Button>
        </CardContent>
       </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <Card className="xl:col-span-2">
            <CardHeader>
                <CardTitle className="font-headline">Request Withdrawal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" placeholder="5,000.00" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Select>
                        <SelectTrigger><SelectValue placeholder="Select Account" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="primary">Primary Account (...1234)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="reason">Reason</Label>
                    <Input id="reason" placeholder="e.g., Business Investment" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="reference">Reference (Auto-generated)</Label>
                    <Input id="reference" value="W-REF-0046" disabled />
                </div>
                <p className="text-xs text-muted-foreground pt-2">Note: All withdrawal requests require approval from at least two admins.</p>
                <div className="flex justify-end gap-2 pt-4">
                    <Button variant="ghost">Cancel</Button>
                    <Button>Submit Request</Button>
                </div>
            </CardContent>
        </Card>
        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Reference</TableHead>
                        <TableHead>Amount</TableHead>
                         <TableHead>Member</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pendingApprovals.map(item => (
                        <TableRow key={item.ref}>
                            <TableCell className="font-medium">{item.ref}</TableCell>
                            <TableCell>{item.amount}</TableCell>
                            <TableCell>{item.member}</TableCell>
                            <TableCell>
                                <Badge variant="secondary" className="bg-orange-100 text-orange-800">{item.status}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
       <Card>
        <CardHeader>
            <CardTitle className="font-headline">Withdrawal History</CardTitle>
        </CardHeader>
        <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Member</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {withdrawalHistory.map((item, i) => (
                        <TableRow key={i}>
                            <TableCell className="font-medium">{item.desc}</TableCell>
                            <TableCell>{item.member}</TableCell>
                            <TableCell>
                                <Badge className="bg-red-100 text-red-800">{item.type}</Badge>
                            </TableCell>
                            <TableCell>{item.amount}</TableCell>
                            <TableCell>{item.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
       </Card>
    </div>
  );
}
