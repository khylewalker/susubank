
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import { Checkbox } from "@/components/ui/checkbox";

export default function CreateMemberPage() {
    return (
        <div className="flex flex-col gap-6">
            <header>
                <Breadcrumb>
                    <BreadcrumbList>
                    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
                    <BreadcrumbSeparator />
                        <BreadcrumbItem><BreadcrumbPage>Admin</BreadcrumbPage></BreadcrumbItem>
                        <BreadcrumbSeparator />
                    <BreadcrumbItem><BreadcrumbPage>Add New Member</BreadcrumbPage></BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className="text-3xl font-bold font-headline mt-2">Add New Member</h1>
            </header>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Add a New Member</CardTitle>
                    <CardDescription>Enter the details below to add a new member to the group.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="full-name">Full Name</Label>
                        <Input id="full-name" placeholder="As shown on government ID" required />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="a.badu@email.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" placeholder="+233 24 123 4567" />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input id="dob" type="date" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="nationality">Nationality</Label>
                            <Select>
                                <SelectTrigger id="nationality"><SelectValue placeholder="Select" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ghana">Ghana</SelectItem>
                                    <SelectItem value="nigeria">Nigeria</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Residential Address</Label>
                        <Input id="address" placeholder="123 Main St, Anytown" required />
                    </div>
                     <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="id-type">Government ID Type</Label>
                            <Input id="id-type" placeholder="Passport, Ghana Card, etc." required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="id-number">ID Number</Label>
                            <Input id="id-number" placeholder="GHA-123456789-0" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Select>
                                <SelectTrigger id="role"><SelectValue placeholder="Select Role" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="member">Member</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="contributor">Contributor</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="initialContribution">Initial Contribution</Label>
                            <Input id="initialContribution" type="number" placeholder="250.00" />
                        </div>
                    </div>
                    <div className="flex items-start space-x-2 pt-2">
                        <Checkbox id="terms" required />
                        <div className="grid gap-1.5 leading-none">
                            <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                I confirm this information is correct and the member agrees to the terms.
                            </label>
                        </div>
                    </div>
                    <Button>Create Member</Button>
                </CardContent>
            </Card>
        </div>
    );
}
