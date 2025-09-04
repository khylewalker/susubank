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
import { Logo } from "@/components/logo";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function VerifyPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <Logo />
        </div>
        <CardTitle className="font-headline text-2xl">Verify your details</CardTitle>
        <CardDescription>Step 2 of 2</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertDescription>
            For your security, we sent codes to your email and phone.
          </AlertDescription>
        </Alert>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-code">Email Verification Code</Label>
            <Input id="email-code" placeholder="123456" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone-code">Phone Verification Code</Label>
            <Input id="phone-code" placeholder="123456" required />
          </div>
        </div>
        <Button variant="outline" className="w-full">
          Use authenticator app
        </Button>
        <div className="text-center text-sm text-muted-foreground">
          <span>Code expires in 02:59. </span>
          <Link href="#" className="text-primary hover:underline">
            Resend
          </Link>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <Button variant="ghost" asChild>
            <Link href="/sign-in">Back</Link>
          </Button>
          <Link
            href="#"
            className="text-sm font-medium text-primary hover:underline"
          >
            Change email/phone
          </Link>
        </div>
        <Button asChild className="w-full">
           <Link href="/dashboard">Continue</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
