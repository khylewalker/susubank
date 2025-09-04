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

const contributionHistory = [
    { ref: 'REF-00125', amount: '$250.00', status: 'Completed', date: '2024-07-15' },
    { ref: 'REF-00124', amount: '$250.00', status: 'Completed', date: '2024-06-15' },
    { ref: 'REF-00123', amount: '$250.00', status: 'Processing', date: '2024-05-15' },
    { ref: 'REF-00122', amount: '$250.00', status: 'Completed', date: '2024-04-15' },
];

const allContributions = [
    { desc: 'July Contribution', member: 'Kofi Adu', type: 'Contribution', amount: '$250.00', date: '2024-07-15' },
    { desc: 'July Contribution', member: 'Ama Badu', type: 'Contribution', amount: '$250.00', date: '2024-07-14' },
    { desc: 'June Contribution', member: 'Kofi Adu', type: 'Contribution', amount: '$250.00', date: '2024-06-15' },
    { desc: 'June Contribution', member: 'Yaw Mensah', type: 'Contribution', amount: '$250.00', date: '2024-06-16' },
];


export default function ContributionsPage() {
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
                <BreadcrumbPage>Contributions</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-bold font-headline mt-2">Contributions</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search contributions..." className="pl-10" />
          </div>
          <Button variant="outline"><Download /> Export</Button>
          <Button><PlusCircle /> New Contribution</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">This Cycle Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">$20,150.00</p>
            <p className="text-sm text-muted-foreground">July 1 - July 31, 2024</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">My Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">$250.00</p>
            <p className="text-sm text-muted-foreground">Cycle Total: $5,250.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Next Due</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">$250.00</p>
            <p className="text-sm text-muted-foreground">Due on August 15, 2024</p>
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
                <SelectContent>
                    <SelectItem value="kofi">Kofi Adu</SelectItem>
                    <SelectItem value="ama">Ama Badu</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger><SelectValue placeholder="Current Cycle" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="current">Current Cycle</SelectItem>
                    <SelectItem value="last">Last Cycle</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger><SelectValue placeholder="Any Status" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                </SelectContent>
            </Select>
             <Button>Apply Filters</Button>
        </CardContent>
       </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <Card className="xl:col-span-2">
            <CardHeader>
                <CardTitle className="font-headline">Make a Contribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" placeholder="250.00" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="cycle">Cycle</Label>
                    <Select>
                        <SelectTrigger><SelectValue placeholder="Select Cycle" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="july">July 2024</SelectItem>
                            <SelectItem value="august">August 2024</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="method">Method</Label>
                    <Select>
                        <SelectTrigger><SelectValue placeholder="Select Method" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="transfer">Bank Transfer</SelectItem>
                            <SelectItem value="momo">Mobile Money</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="reference">Reference</Label>
                    <Input id="reference" placeholder="REF-00125" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="note">Note (Optional)</Label>
                    <Textarea id="note" placeholder="Note..." />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                    <Button variant="ghost">Cancel</Button>
                    <Button>Submit Contribution</Button>
                </div>
            </CardContent>
        </Card>
        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Contribution History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Reference</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {contributionHistory.map(item => (
                        <TableRow key={item.ref}>
                            <TableCell className="font-medium">{item.ref}</TableCell>
                            <TableCell>{item.amount}</TableCell>
                            <TableCell>
                                <Badge variant={item.status === 'Completed' ? 'default' : 'secondary'} className={item.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>{item.status}</Badge>
                            </TableCell>
                            <TableCell>{item.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
       <Card>
        <CardHeader>
            <CardTitle className="font-headline">All Contributions</CardTitle>
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
                    {allContributions.map((item, i) => (
                        <TableRow key={i}>
                            <TableCell className="font-medium">{item.desc}</TableCell>
                            <TableCell>{item.member}</TableCell>
                            <TableCell>
                                <Badge className="bg-blue-100 text-blue-800">{item.type}</Badge>
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
