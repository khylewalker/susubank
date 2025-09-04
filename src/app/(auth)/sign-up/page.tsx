import Link from "next/link";
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

export default function SignUpPage() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <Logo />
        </div>
        <CardTitle className="font-headline text-2xl">Create your account</CardTitle>
        <CardDescription>Personal details - Step 3 of 3</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full-name">Full Name</Label>
            <Input
              id="full-name"
              placeholder="As shown on your government ID"
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Select>
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
            <Input id="address" placeholder="123 Main St, Anytown" required />
            <p className="text-xs text-muted-foreground">
              We use this to verify your identity and eligibility.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="id-type">Government ID Type</Label>
              <Input
                id="id-type"
                placeholder="Passport, Driver's license, etc."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="id-number">ID Number</Label>
              <Input id="id-number" placeholder="GHA-123456789-0" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="source-of-funds">Source of Funds</Label>
            <Input
              id="source-of-funds"
              placeholder="Employment, Savings, Business, etc."
              required
            />
          </div>
          <div className="flex items-start space-x-2 pt-2">
            <Checkbox id="terms" required />
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
        <div className="flex w-full items-center justify-between">
          <Button variant="outline" asChild>
            <Link href="/sign-in">Back</Link>
          </Button>
          <Button asChild>
            <Link href="/">Create Account</Link>
          </Button>
        </div>
         <p className="text-xs text-muted-foreground">Final step: Review & submit</p>
      </CardFooter>
    </Card>
  );
}
