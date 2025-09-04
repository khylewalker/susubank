"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { FraudDetectionOutput } from "@/ai/flows/fraud-detection";
import { useToast } from "@/hooks/use-toast";
import { handleFraudCheck } from "./actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function DashboardClient() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [fraudResult, setFraudResult] = useState<FraudDetectionOutput | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onCheck = async () => {
    setIsLoading(true);
    setFraudResult(null);
    try {
      const result = await handleFraudCheck();
      setFraudResult(result);
      setIsDialogOpen(true);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to run fraud detection.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
       <div className="flex flex-col gap-6">
        <header>
          <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Admin!</p>
        </header>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card><CardHeader><CardDescription>Total Users</CardDescription><CardTitle className="text-2xl font-bold">0</CardTitle></CardHeader></Card>
          <Card><CardHeader><CardDescription>Total Groups Created</CardDescription><CardTitle className="text-2xl font-bold">0</CardTitle></CardHeader></Card>
          <Card><CardHeader><CardDescription>All Group Contributions</CardDescription><CardTitle className="text-2xl font-bold">GH₵0.00</CardTitle></CardHeader></Card>
          <Card><CardHeader><CardDescription>All Group Withdrawals</CardDescription><CardTitle className="text-2xl font-bold">GH₵0.00</CardTitle></CardHeader></Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Security</CardTitle>
            <CardDescription>Run manual checks for potentially fraudulent activities in the system.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button onClick={onCheck} disabled={isLoading}>
              <ShieldCheck />
              {isLoading ? 'Running Check...' : 'Run Fraud Check'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {fraudResult && (
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-headline">
                Fraud Detection Result
              </AlertDialogTitle>
              <AlertDialogDescription>
                {fraudResult.isFraudulent
                  ? "Potential fraudulent activity has been detected."
                  : "No fraudulent activity detected."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4">
                <p className="font-semibold mb-2">Analysis:</p>
                <p className="text-sm text-muted-foreground">{fraudResult.fraudExplanation}</p>
            </div>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setIsDialogOpen(false)}>Close</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
