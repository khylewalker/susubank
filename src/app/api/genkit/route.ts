import { appRoute } from "@genkit-ai/next";
import { detectFraud } from "@/ai/flows/fraud-detection";

// bind your flow to Next.js API routes
export const GET = appRoute(detectFraud);
export const POST = appRoute(detectFraud);

