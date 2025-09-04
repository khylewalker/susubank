
"use client";

import { useState } from "react";
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
import { PlusCircle, Filter, Users, ArrowRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const contributionHistory: any[] = [];
const allContributions: any[] = [];
const groupsData: any[] = [];

export default function ContributionsPage() {
  const isAdmin = true; // This would be replaced with actual role-based logic
  const [selectedGroup, setSelectedGroup] = useState<(typeof groupsData)[0] | null>(null);


  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Contributions</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-bold font-headline mt-2">Contributions</h1>
        </div>
        {!isAdmin && (
            <div className="flex items-center gap-4">
            <Button><PlusCircle /> New Contribution</Button>
            </div>
        )}
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">This Cycle Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">GH₵0.00</p>
            <p className="text-sm text-muted-foreground">July 1 - July 31, 2024</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">My Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">GH₵0.00</p>
            <p className="text-sm text-muted-foreground">Cycle Total: GH₵0.00</p>
          </CardContent>
        </Card>
        {groupsData.slice(0, 2).map(group => (
            <Card key={group.id} className="cursor-pointer" onClick={() => setSelectedGroup(group)}>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center justify-between">
                        {group.name} Contributions <Users className="h-5 w-5 text-muted-foreground" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">GH₵{group.totalContributions}</p>
                    <p className="text-sm text-muted-foreground hover:underline flex items-center gap-1">
                        View Members <ArrowRight className="h-4 w-4" />
                    </p>
                </CardContent>
            </Card>
        ))}
      </div>

       <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <CardTitle className="font-headline">Filters</CardTitle>
                <Filter className="h-5 w-5 text-muted-foreground" />
            </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Select>
                <SelectTrigger><SelectValue placeholder="All Members" /></SelectTrigger>
                <SelectContent>
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
             <Button className="sm:col-span-2 md:col-span-3 lg:col-span-2">Apply Filters</Button>
        </CardContent>
       </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        {!isAdmin && (
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
        )}
        <Card className={isAdmin ? "xl:col-span-5" : "xl:col-span-3"}>
          <CardHeader>
            <CardTitle className="font-headline">Contribution History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
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
            </div>
          </CardContent>
        </Card>
      </div>
      
       <Card>
        <CardHeader>
            <CardTitle className="font-headline">All Contributions</CardTitle>
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
                      {allContributions.map((item, i) => (
                          <TableRow key={i}>
                              <TableCell className="font-medium">{item.desc}</TableCell>
                              <TableCell>{item.member}</TableCell>
                              <TableCell className="hidden sm:table-cell">
                                  <Badge className="bg-blue-100 text-blue-800">{item.type}</Badge>
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
        {selectedGroup && (
            <Dialog open={!!selectedGroup} onOpenChange={(isOpen) => !isOpen && setSelectedGroup(null)}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="font-headline">{selectedGroup.name} - Member Contributions</DialogTitle>
                        <DialogDescription>
                            Total Contributions for this group: GH₵{selectedGroup.totalContributions}
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Member</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {selectedGroup.members.length > 0 ? (
                                    selectedGroup.members.map(member => (
                                        <TableRow key={member.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-9 w-9">
                                                        <AvatarImage src={member.avatar} data-ai-hint="member avatar" />
                                                        <AvatarFallback>{member.name.substring(0,2)}</AvatarFallback>
                                                    </Avatar>
                                                    <Link href={`/members/${member.id}`} className="font-medium hover:underline">{member.name}</Link>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">GH₵{member.contribution}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={2} className="text-center">No contributions for this group yet.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </DialogContent>
            </Dialog>
        )}
    </div>
  );
}
