
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { Label } from "@/components/ui/label";
import { Save, Undo2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const defaultSettings = {
  reminders: true,
  twoFactorAuth: true,
  language: "en-us",
};

export default function SettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState(defaultSettings);

  const handleReset = () => {
    setSettings(defaultSettings);
    toast({
      title: "Settings Reset",
      description: "Your settings have been reset to their default values.",
    });
  };

  const handleSave = () => {
    console.log("Settings saved:", settings);
    toast({
      title: "Settings Saved",
      description: "Your changes have been successfully saved.",
    });
  };

  const handleDeleteGroup = () => {
    toast({
        variant: "destructive",
        title: "Group Deleted",
        description: "The group has been permanently deleted.",
    });
  }

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
            <Button variant="outline" onClick={handleReset}><Undo2 /> Reset</Button>
            <Button onClick={handleSave}><Save /> Save Changes</Button>
        </div>
      </header>
      
      <Tabs defaultValue="general" className="w-full">
        <div className="w-full overflow-x-auto">
          <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="general" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                     <CardHeader>
                        <CardTitle className="font-headline">Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="reminders">Reminders</Label>
                            <Switch 
                              id="reminders" 
                              checked={settings.reminders}
                              onCheckedChange={(checked) => setSettings(s => ({...s, reminders: checked}))}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="2fa">Two-factor authentication</Label>
                            <Switch 
                              id="2fa" 
                              checked={settings.twoFactorAuth}
                              onCheckedChange={(checked) => setSettings(s => ({...s, twoFactorAuth: checked}))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="language">Language</Label>
                            <Select 
                              value={settings.language}
                              onValueChange={(value) => setSettings(s => ({...s, language: value}))}
                            >
                                <SelectTrigger><SelectValue/></SelectTrigger>
                                <SelectContent>
                                     <SelectItem value="en-us">English (US)</SelectItem>
                                     <SelectItem value="hausa">Hausa</SelectItem>
                                     <SelectItem value="ga">Ga</SelectItem>
                                     <SelectItem value="twi">Twi</SelectItem>
                                     <SelectItem value="fante">Fante</SelectItem>
                                </SelectContent>
                            </Select>
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
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="self-start">Delete Group</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the group and remove all associated data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDeleteGroup}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
        <TabsContent value="notifications">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Notification Settings</CardTitle>
                    <CardDescription>Manage how you receive notifications from SusuBank.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Placeholder for notification settings */}
                     <p className="text-sm text-muted-foreground">Notification settings will be available here.</p>
                </CardContent>
            </Card>
        </TabsContent>
         <TabsContent value="compliance">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Compliance & Legal</CardTitle>
                    <CardDescription>Review compliance documents and legal information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Placeholder for compliance settings */}
                    <p className="text-sm text-muted-foreground">Compliance and legal information will be available here.</p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
