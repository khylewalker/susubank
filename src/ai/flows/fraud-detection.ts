// src/ai/flows/fraud-detection.ts
'use server';
/**
 * @fileOverview A fraud detection AI agent.
 *
 * - detectFraud - A function that handles the fraud detection process.
 * - FraudDetectionInput - The input type for the detectFraud function.
 * - FraudDetectionOutput - The return type for the detectFraud function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FraudDetectionInputSchema = z.object({
  recentTransactions: z.string().describe('A list of recent transactions, including details such as amount, timestamp, member ID, transaction type, and status.'),
  recentContributions: z.string().describe('A list of recent contributions, including details such as amount, timestamp, member ID, method, and reference.'),
  recentWithdrawals: z.string().describe('A list of recent withdrawals, including details such as amount, timestamp, member ID, destination, and status.'),
});
export type FraudDetectionInput = z.infer<typeof FraudDetectionInputSchema>;

const FraudDetectionOutputSchema = z.object({
  isFraudulent: z.boolean().describe('Whether or not the transactions are potentially fraudulent.'),
  fraudExplanation: z.string().describe('An explanation of why the transactions are potentially fraudulent.'),
});
export type FraudDetectionOutput = z.infer<typeof FraudDetectionOutputSchema>;

export async function detectFraud(input: FraudDetectionInput): Promise<FraudDetectionOutput> {
  return detectFraudFlow(input);
}

const detectFraudPrompt = ai.definePrompt({
  name: 'detectFraudPrompt',
  input: {schema: FraudDetectionInputSchema},
  output: {schema: FraudDetectionOutputSchema},
  prompt: `You are a fraud detection expert. You will analyze recent transactions, contributions, and withdrawals to identify potentially fraudulent activities.

  Provide a determination as to whether the transactions are fraudulent or not, and set the isFraudulent output field appropriately.  Also, provide an explanation of why the transactions are potentially fraudulent, and set the fraudExplanation output field appropriately.

  Recent Transactions: {{{recentTransactions}}}
  Recent Contributions: {{{recentContributions}}}
  Recent Withdrawals: {{{recentWithdrawals}}}
  `,
});

const detectFraudFlow = ai.defineFlow(
  {
    name: 'detectFraudFlow',
    inputSchema: FraudDetectionInputSchema,
    outputSchema: FraudDetectionOutputSchema,
  },
  async input => {
    const {output} = await detectFraudPrompt(input);
    return output!;
  }
);
