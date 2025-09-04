
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
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";

const Step1 = ({ nextStep, formData, setFormData }: any) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="groupName">Group Name</Label>
      <Input id="groupName" placeholder="e.g., Accra Innovators" value={formData.groupName} onChange={(e) => setFormData({...formData, groupName: e.target.value})} />
    </div>
    <div className="space-y-2">
      <Label htmlFor="groupDescription">Group Description</Label>
      <Textarea id="groupDescription" placeholder="A brief description of the group's purpose." value={formData.groupDescription} onChange={(e) => setFormData({...formData, groupDescription: e.target.value})} />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label htmlFor="rotationFrequency">Rotation Frequency</Label>
            <Select value={formData.rotationFrequency} onValueChange={(value) => setFormData({...formData, rotationFrequency: value})}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
            <Label htmlFor="maxMembers">Maximum Members</Label>
            <Input id="maxMembers" type="number" placeholder="6" min="3" max="6" value={formData.maxMembers} onChange={(e) => setFormData({...formData, maxMembers: e.target.value})} />
        </div>
    </div>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label htmlFor="contributionAmount">Contribution Amount (GH₵)</Label>
            <Input id="contributionAmount" type="number" placeholder="30.00" min="30" step="5" value={formData.contributionAmount} onChange={(e) => setFormData({...formData, contributionAmount: e.target.value})} />
        </div>
        <div className="space-y-2">
            <Label htmlFor="payoutMethod">Payout Order Method</Label>
            <Select value={formData.payoutMethod} onValueChange={(value) => setFormData({...formData, payoutMethod: value})}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="random">Random Selection</SelectItem>
                    <SelectItem value="sequential">Sequential Order</SelectItem>
                    <SelectItem value="preference">Preference-based</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label htmlFor="expectedDuration">Expected Duration (Months)</Label>
            <Input id="expectedDuration" type="number" placeholder="12" min="1" value={formData.expectedDuration} onChange={(e) => setFormData({...formData, expectedDuration: e.target.value})} />
        </div>
    </div>
    <div className="flex justify-end pt-4">
      <Button onClick={nextStep}>Next</Button>
    </div>
  </div>
);

const Step2 = ({ nextStep, prevStep, formData, setFormData }: any) => {
  const handleMemberChange = (index: number, field: string, value: string) => {
    const newMembers = [...formData.members];
    newMembers[index][field as keyof typeof newMembers[0]] = value;
    setFormData({ ...formData, members: newMembers });
  };

  const addMember = () => {
    setFormData({
      ...formData,
      members: [...formData.members, { fullName: "", email: "", phone: "" }],
    });
  };

  const removeMember = (index: number) => {
    const newMembers = formData.members.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, members: newMembers });
  };

  return (
    <div className="space-y-4">
      {formData.members.map((member: any, index: number) => (
        <div key={index} className="p-4 border rounded-lg space-y-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`fullName-${index}`}>Full Name</Label>
              <Input id={`fullName-${index}`} placeholder="John Doe" value={member.fullName} onChange={(e) => handleMemberChange(index, 'fullName', e.target.value)} />
            </div>
             <div className="space-y-2">
              <Label htmlFor={`email-${index}`}>Email</Label>
              <Input id={`email-${index}`} type="email" placeholder="j.doe@email.com" value={member.email} onChange={(e) => handleMemberChange(index, 'email', e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`phone-${index}`}>Phone</Label>
            <Input id={`phone-${index}`} placeholder="+233 24 123 4567" value={member.phone} onChange={(e) => handleMemberChange(index, 'phone', e.target.value)} />
          </div>
           {formData.members.length > 1 && (
            <Button size="icon" variant="destructive" className="absolute top-2 right-2 h-7 w-7" onClick={() => removeMember(index)}>
                <Trash2 className="h-4 w-4" />
            </Button>
           )}
        </div>
      ))}
       <Button onClick={addMember} variant="outline">Add Another Member</Button>
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next</Button>
      </div>
    </div>
  );
};

const Step3 = ({ nextStep, prevStep, formData, setFormData }: any) => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label htmlFor="contributionDay">Contribution Deadline (days)</Label>
            <Input id="contributionDay" type="number" placeholder="5" value={formData.contributionDay} onChange={(e) => setFormData({...formData, contributionDay: e.target.value})} />
        </div>
        <div className="space-y-2">
            <Label htmlFor="gracePeriod">Grace Period (days)</Label>
            <Input id="gracePeriod" type="number" placeholder="2" value={formData.gracePeriod} onChange={(e) => setFormData({...formData, gracePeriod: e.target.value})} />
        </div>
    </div>
    <div className="space-y-2">
        <Label htmlFor="minMembers">Minimum members needed to keep group active</Label>
        <Input id="minMembers" type="number" placeholder="3" value={formData.minMembers} onChange={(e) => setFormData({...formData, minMembers: e.target.value})} />
    </div>
     <div className="space-y-2">
        <Label htmlFor="latePenalty">Late Payment Penalty</Label>
        <Select value={formData.latePenalty} onValueChange={(value) => setFormData({...formData, latePenalty: value})}>
            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent><SelectItem value="none">None</SelectItem><SelectItem value="fixed">Fixed Amount (e.g., GH₵10)</SelectItem><SelectItem value="percentage">Percentage (e.g., 1%)</SelectItem></SelectContent>
        </Select>
    </div>
     <div className="space-y-2">
        <Label htmlFor="startDate">Contribution Start Date</Label>
        <Input id="startDate" type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
    </div>
    <div className="flex justify-between pt-4">
      <Button variant="outline" onClick={prevStep}>Back</Button>
      <Button onClick={nextStep}>Next</Button>
    </div>
  </div>
);

const Step4 = ({ prevStep, formData, submitForm }: any) => (
  <div className="space-y-6">
    <div className="space-y-4">
        <div>
            <h3 className="font-semibold">Group Details</h3>
            <Separator className="my-2" />
            <div className="grid grid-cols-2 gap-4 text-sm">
                <p className="text-muted-foreground">Group Name</p><p className="font-medium">{formData.groupName}</p>
                <p className="text-muted-foreground">Description</p><p className="font-medium">{formData.groupDescription}</p>
                <p className="text-muted-foreground">Frequency</p><p className="font-medium">{formData.rotationFrequency}</p>
                <p className="text-muted-foreground">Max Members</p><p className="font-medium">{formData.maxMembers}</p>
                <p className="text-muted-foreground">Contribution</p><p className="font-medium">GH₵{formData.contributionAmount}</p>
                <p className="text-muted-foreground">Payout Method</p><p className="font-medium">{formData.payoutMethod}</p>
                <p className="text-muted-foreground">Expected Duration</p><p className="font-medium">{formData.expectedDuration} months</p>
            </div>
        </div>
        <div>
            <h3 className="font-semibold">Members</h3>
            <Separator className="my-2" />
            <ul className="space-y-2 text-sm">
                {formData.members.map((member: any, index: number) => (
                    <li key={index} className="font-medium">{member.fullName}</li>
                ))}
            </ul>
        </div>
         <div>
            <h3 className="font-semibold">Payment Rules</h3>
            <Separator className="my-2" />
            <div className="grid grid-cols-2 gap-4 text-sm">
                <p className="text-muted-foreground">Contribution Deadline</p><p className="font-medium">{formData.contributionDay} days after cycle start</p>
                <p className="text-muted-foreground">Grace Period</p><p className="font-medium">{formData.gracePeriod} days</p>
                <p className="text-muted-foreground">Min Members Active</p><p className="font-medium">{formData.minMembers}</p>
                <p className="text-muted-foreground">Late Penalty</p><p className="font-medium">{formData.latePenalty}</p>
                <p className="text-muted-foreground">Start Date</p><p className="font-medium">{formData.startDate}</p>
            </div>
        </div>
    </div>
    <div className="flex justify-between pt-4">
      <Button variant="outline" onClick={prevStep}>Back</Button>
      <Button onClick={submitForm}>Create Group</Button>
    </div>
  </div>
);

export default function CreateGroupPage() {
    const { toast } = useToast();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        groupName: "",
        groupDescription: "",
        rotationFrequency: "",
        maxMembers: "",
        contributionAmount: "",
        payoutMethod: "",
        expectedDuration: "",
        members: [{ fullName: "", email: "", phone: "" }],
        contributionDay: "",
        gracePeriod: "",
        minMembers: "",
        latePenalty: "",
        startDate: "",
    });

    const validateStep = (stepNumber: number) => {
        const step1Fields = ['groupName', 'groupDescription', 'rotationFrequency', 'maxMembers', 'contributionAmount', 'payoutMethod', 'expectedDuration'];
        const step3Fields = ['contributionDay', 'gracePeriod', 'minMembers', 'latePenalty', 'startDate'];
        
        if (stepNumber === 1) {
            for (const field of step1Fields) {
                if (!formData[field as keyof typeof formData]) {
                    return false;
                }
            }
        } else if (stepNumber === 2) {
             for (const member of formData.members) {
                if (!member.fullName || !member.email || !member.phone) {
                    return false;
                }
            }
        } else if (stepNumber === 3) {
            for (const field of step3Fields) {
                if (!formData[field as keyof typeof formData]) {
                    return false;
                }
            }
        }
        return true;
    }

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(prev => prev + 1);
        } else {
            toast({
                variant: "destructive",
                title: "Missing Fields",
                description: "Please fill out all fields before proceeding.",
            });
        }
    };
    const prevStep = () => setStep(prev => prev - 1);

    const submitForm = () => {
        console.log("Form Submitted", formData);
        toast({
            title: "Group Created",
            description: `${formData.groupName} has been successfully created.`,
        });
        // Here you would typically send the data to your backend
    };

    const progress = (step / 4) * 100;

    const stepTitles = ["Group Details", "Add Members", "Payment Rules", "Preview"];
    const stepDescriptions = [
        "Enter the basic details for your new group.", 
        "Add the initial members to this group.",
        "Set the rules for contributions and payments.", 
        "Review the details before creating the group."
    ];

    return (
        <div className="flex flex-col gap-6">
            <header>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem><BreadcrumbPage>Admin</BreadcrumbPage></BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem><BreadcrumbPage>Create Group</BreadcrumbPage></BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className="text-3xl font-bold font-headline mt-2">Create a New Group</h1>
            </header>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                        <CardTitle className="font-headline">{stepTitles[step - 1]}</CardTitle>
                        <span className="text-sm text-muted-foreground">Step {step} of 4</span>
                    </div>
                    <CardDescription>{stepDescriptions[step - 1]}</CardDescription>
                    <Progress value={progress} className="mt-4" />
                </CardHeader>
                <CardContent>
                    {step === 1 && <Step1 nextStep={nextStep} formData={formData} setFormData={setFormData} />}
                    {step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />}
                    {step === 3 && <Step3 nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />}
                    {step === 4 && <Step4 prevStep={prevStep} formData={formData} submitForm={submitForm} />}
                </CardContent>
            </Card>
        </div>
    );
}

    