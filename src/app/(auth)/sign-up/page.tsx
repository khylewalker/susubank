
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";
import { addUser } from "@/lib/mock-users";

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fullName = formData.get("full-name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;
    const terms = formData.get("terms") === "on";

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
      });
      return;
    }
    
    if (!terms) {
         toast({
            variant: "destructive",
            title: "Terms and Conditions",
            description: "You must agree to the terms and conditions.",
        });
        return;
    }

    // A real app would have more robust validation
    addUser({
      email,
      password,
      status: 'pending',
      firstLogin: true,
      name: fullName,
    });

    toast({
      title: "Account Created!",
      description: "Your account has been created. Please wait for admin approval.",
    });

    router.push("/sign-in");
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <Logo />
        </div>
        <CardTitle className="font-headline text-2xl">Create your account</CardTitle>
        <CardDescription>Enter your details to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="signup-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full-name">Full Name</Label>
            <Input
              id="full-name"
              name="full-name"
              placeholder="As shown on your government ID"
              required
            />
          </div>
           <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" name="confirm-password" type="password" required />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Select name="nationality">
                <SelectTrigger id="nationality">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ghana">Ghana</SelectItem>
                  <SelectItem value="nigeria">Nigeria</SelectItem>
                  <SelectItem value="usa">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Residential Address</Label>
            <Input id="address" name="address" placeholder="123 Main St, Anytown" required />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="id-type">Government ID Type</Label>
              <Input
                id="id-type"
                name="id-type"
                placeholder="Passport, Driver's license, etc."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="id-number">ID Number</Label>
              <Input id="id-number" name="id-number" placeholder="GHA-123456789-0" required />
            </div>
          </div>
          <div className="flex items-start space-x-2 pt-2">
            <Checkbox id="terms" name="terms" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I confirm my information is correct and agree to the terms.
              </label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="w-full flex justify-end items-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/sign-in">Back</Link>
          </Button>
          <Button type="submit" form="signup-form">Create Account</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
