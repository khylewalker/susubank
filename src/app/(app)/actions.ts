"use server";

import { detectFraud } from "@/ai/flows/fraud-detection";

export async function handleFraudCheck() {
  try {
    const mockData = {
      recentTransactions: JSON.stringify([
        { amount: 100, timestamp: "2024-07-20T10:00:00Z", memberId: "user1", type: "contribution", status: "completed" },
        { amount: 500, timestamp: "2024-07-20T11:00:00Z", memberId: "user2", type: "withdrawal", status: "pending" },
        { amount: 1000, timestamp: "2024-07-19T09:00:00Z", memberId: "user1", type: "withdrawal", status: "completed" },
        { amount: 1000, timestamp: "2024-07-19T09:05:00Z", memberId: "user1", type: "contribution", status: "completed" },
      ]),
      recentContributions: JSON.stringify([
         { amount: 1000, timestamp: "2024-07-19T09:05:00Z", memberId: "user1", method: "transfer", reference: "abc" },
      ]),
      recentWithdrawals: JSON.stringify([
        { amount: 1000, timestamp: "2024-07-19T09:00:00Z", memberId: "user1", destination: "xyz", status: "completed" },
      ]),
    };
    const result = await detectFraud(mockData);
    return result;
  } catch (error) {
    console.error("Fraud detection failed:", error);
    return { isFraudulent: false, fraudExplanation: "An error occurred during the fraud check." };
  }
}
