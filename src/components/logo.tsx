import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <ShieldCheck className="h-8 w-8 text-primary" />
      <h1 className="text-2xl font-bold font-headline text-primary">SusuBank</h1>
    </div>
  );
}
