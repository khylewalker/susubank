
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ForgotPasswordPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <Logo />
        </div>
        <CardTitle className="font-headline text-2xl">Forgot Password</CardTitle>
        <CardDescription>
          Answer the questions below to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
           <div className="space-y-2">
            <Label htmlFor="email">Email or Phone Number</Label>
            <Input id="email" placeholder="Enter your email or phone" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="security-question-1">Security Question 1</Label>
            <Select>
              <SelectTrigger id="security-question-1">
                <SelectValue placeholder="Select a question" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="q1">What was your childhood nickname?</SelectItem>
                <SelectItem value="q2">What is the name of your first pet?</SelectItem>
                <SelectItem value="q3">What is your favorite movie?</SelectItem>
              </SelectContent>
            </Select>
             <Input id="answer-1" placeholder="Your Answer" required className="mt-2" />
          </div>
           <div className="space-y-2">
            <Label htmlFor="security-question-2">Security Question 2</Label>
            <Select>
              <SelectTrigger id="security-question-2">
                <SelectValue placeholder="Select a question" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="q1">In what city were you born?</SelectItem>
                <SelectItem value="q2">What is your mother's maiden name?</SelectItem>
                <SelectItem value="q3">What high school did you attend?</SelectItem>
              </SelectContent>
            </Select>
            <Input id="answer-2" placeholder="Your Answer" required className="mt-2" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" required />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button asChild className="w-full">
            <Link href="/sign-in">Reset Password</Link>
        </Button>
         <Button variant="link" asChild>
            <Link href="/sign-in">Back to Login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
