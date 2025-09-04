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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Save, Undo2 } from "lucide-react";

export default function SettingsPage() {
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
                <BreadcrumbPage>Settings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-bold font-headline mt-2">Settings</h1>
        </div>
        <div className="flex items-center gap-4">
            <Button variant="outline"><Undo2 /> Reset</Button>
            <Button><Save /> Save Changes</Button>
        </div>
      </header>
      
      <Tabs defaultValue="general" className="w-full">
        <div className="w-full overflow-x-auto">
          <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="members">Members & Roles</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="general" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="font-headline">Organization</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="group-name">Group name</Label>
                            <Input id="group-name" defaultValue="Accra Fintech Collective" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="currency">Currency</Label>
                            <Select defaultValue="GHS">
                                <SelectTrigger><SelectValue/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="GHS">GHS (Ghana Cedi)</SelectItem>
                                    <SelectItem value="USD">USD (US Dollar)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="cadence">Contribution cadence</Label>
                            <Select defaultValue="monthly">
                                <SelectTrigger><SelectValue/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="contribution-amount">Default contribution amount</Label>
                            <Input id="contribution-amount" defaultValue="250.00" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                     <CardHeader>
                        <CardTitle className="font-headline">Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="reminders">Reminders</Label>
                            <Switch id="reminders" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="2fa">Two-factor authentication</Label>
                            <Switch id="2fa" defaultChecked />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="language">Language</Label>
                            <Select defaultValue="en-us">
                                <SelectTrigger><SelectValue/></SelectTrigger>
                                <SelectContent>
                                     <SelectItem value="en-us">English (US)</SelectItem>
                                     <SelectItem value="fr">French</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle className="font-headline">Payments & Compliance</CardTitle>
                    </CardHeader>
                     <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="primary-method">Primary method</Label>
                            <Select defaultValue="momo"><SelectTrigger><SelectValue/></SelectTrigger></Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="backup-method">Backup method</Label>
                            <Select defaultValue="bank"><SelectTrigger><SelectValue/></SelectTrigger></Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="settlement-account">Settlement account</Label>
                            <Select defaultValue="gcb"><SelectTrigger><SelectValue/></SelectTrigger></Select>
                        </div>
                         <div className="flex items-center justify-between">
                            <Label htmlFor="kyc">KYC required</Label>
                            <Switch id="kyc" defaultChecked />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="retention">Data retention</Label>
                             <Select defaultValue="7y"><SelectTrigger><SelectValue/></SelectTrigger></Select>
                        </div>
                    </CardContent>
                </Card>

                 <Card className="lg:col-span-3 border-destructive">
                    <CardHeader>
                        <CardTitle className="font-headline text-destructive">Danger Zone</CardTitle>
                        <CardDescription>These actions are irreversible. Please be certain.</CardDescription>
                    </CardHeader>
                     <CardContent className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <h4 className="font-semibold">Archive Cycle</h4>
                            <p className="text-sm text-muted-foreground">Archive the current contribution cycle data. This will not delete the data but will hide it from the main views.</p>
                        </div>
                        <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive self-start">Archive Cycle</Button>
                    </CardContent>
                     <CardContent className="flex flex-col md:flex-row gap-4 border-t pt-6">
                        <div className="flex-1">
                            <h4 className="font-semibold">Delete Group</h4>
                            <p className="text-sm text-muted-foreground">Permanently delete the entire group, including all members, transactions, and settings. This cannot be undone.</p>
                        </div>
                        <Button variant="destructive" className="self-start">Delete Group</Button>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
