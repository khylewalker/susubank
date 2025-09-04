import { appRoute } from "@genkit-ai/next";
import { simpleFlow } from "@/genkit/flows";

// Bind your flow to Next.js API routes
export const GET = appRoute(simpleFlow);
export const POST = appRoute(simpleFlow);

