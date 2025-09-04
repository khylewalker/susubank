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
