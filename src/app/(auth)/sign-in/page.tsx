
"use client";

import { useState, useEffect } from "react";
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
import { Logo } from "@/components/logo";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Mock user data for demonstration
const mockUsers = [
  { email: "admin@susu.bank", password: "password123", status: "approved", firstLogin: false, name: "Admin" },
  { email: "new@susu.bank", password: "password123", status: "pending", firstLogin: true, name: "New User" },
  { email: "first.timer@susu.bank", password: "password123", status: "approved", firstLogin: true, name: "First Timer" },
  { email: "approved@susu.bank", password: "password123", status: "approved", firstLogin: false, name: "Approved User" },
];

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [accountApproved, setAccountApproved] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Check on load if the user was previously pending and is now approved
  useEffect(() => {
    const lastLoginAttemptEmail = localStorage.getItem('lastLoginAttemptEmail');
    const user = mockUsers.find(u => u.email === lastLoginAttemptEmail);

    if (user && user.status === 'approved') {
       const previouslyPending = localStorage.getItem(`status_${user.email}`) === 'pending';
       if(previouslyPending) {
         setAccountApproved(true);
         localStorage.removeItem('lastLoginAttemptEmail');
         localStorage.setItem(`status_${user.email}`, 'approved');
       }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAccountApproved(false); // Hide approval message on new login attempt

    // Simulate API call
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email);
      
      if (!user || user.password !== password) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Wrong credentials. Please try again.",
        });
      } else if (user.status === 'pending') {
        localStorage.setItem('lastLoginAttemptEmail', user.email);
        localStorage.setItem(`status_${user.email}`, 'pending');
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Cannot Login At The Moment, Please Wait For Admin's Approval",
          duration: 5000,
        });
      } else if (user.status === 'approved') {
        const welcomeMessage = user.firstLogin ? `Welcome, ${user.name}!` : `Welcome back, ${user.name}!`;
        toast({
          title: "Success",
          description: welcomeMessage,
        });
        
        // In a real app, you would update the user's `firstLogin` status in the database.
        if(user.firstLogin) {
            const userIndex = mockUsers.findIndex(u => u.email === user.email);
            if(userIndex !== -1) mockUsers[userIndex].firstLogin = false;
        }

        localStorage.removeItem('lastLoginAttemptEmail');
        localStorage.removeItem(`status_${user.email}`);

        router.push("/dashboard"); // Redirect to dashboard
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <Logo />
        </div>
        <CardTitle className="font-headline text-2xl">Welcome to Susu Bank</CardTitle>
        <CardDescription>Securely sign in to your account.</CardDescription>
      </CardHeader>
      <CardContent>
         {accountApproved && (
          <Alert className="mb-4 border-green-500 bg-green-50 text-green-800">
            <AlertDescription>Your account has been approved! You may now log in.</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email/Number</Label>
            <Input 
              id="email" 
              placeholder="you@example.com or 0241234567" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
           <div className="pt-4">
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="font-medium text-primary hover:underline">
                Create Account
            </Link>
        </div>
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4" />
          Your information is protected with bank-grade security.
        </p>
      </CardFooter>
    </Card>
  );
}
