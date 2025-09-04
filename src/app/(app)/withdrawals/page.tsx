
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
import { PlusCircle, Filter } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const pendingApprovals = [
];

const withdrawalHistory = [
    { desc: 'Business Investment', member: 'Kofi Adu', type: 'Withdrawal', amount: 'GH₵10,000.00', date: '2024-07-05' },
];


export default function WithdrawalsPage() {
  const isAdmin = true; // This would be replaced with actual role-based logic

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
        {!isAdmin && (
            <div className="flex items-center gap-4">
            <Button><PlusCircle /> New Withdrawal</Button>
            </div>
        )}
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Available Pool</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">GH₵36,550.00</p>
            <p className="text-sm text-muted-foreground">Total funds available for withdrawal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Totaling GH₵0.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">My Last Withdrawal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">GH₵10,000.00</p>
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
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
        {!isAdmin && (
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
        )}
        <Card className={isAdmin ? "xl:col-span-5" : "xl:col-span-3"}>
          <CardHeader>
            <CardTitle className="font-headline">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
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
            </div>
          </CardContent>
        </Card>
      </div>
      
       <Card>
        <CardHeader>
            <CardTitle className="font-headline">Withdrawal History</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="w-full overflow-x-auto">
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead>Member</TableHead>
                          <TableHead className="hidden sm:table-cell">Type</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead className="hidden md:table-cell">Date</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {withdrawalHistory.map((item, i) => (
                          <TableRow key={i}>
                              <TableCell className="font-medium">{item.desc}</TableCell>
                              <TableCell>{item.member}</TableCell>
                              <TableCell className="hidden sm:table-cell">
                                  <Badge className="bg-red-100 text-red-800">{item.type}</Badge>
                              </TableCell>
                              <TableCell>{item.amount}</TableCell>
                              <TableCell className="hidden md:table-cell">{item.date}</TableCell>
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
