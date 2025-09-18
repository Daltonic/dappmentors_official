"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MarketingLayout from "@/components/layouts/MarketingLayout";
import PaymentStatusCard from "./PaymentStatusCard";

export default function PageClient() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"success" | "failure" | null>(null);
  const [transactionId, setTransactionId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [service, setService] = useState<string>("");

  useEffect(() => {
    // Get status from query params (success or failure)
    const statusParam = searchParams.get("status");
    const txId = searchParams.get("tx_id") || "";
    const amountParam = searchParams.get("amount") || "";
    const serviceParam = searchParams.get("service") || "";

    if (statusParam === "success" || statusParam === "failure") {
      setStatus(statusParam);
      setTransactionId(txId);
      setAmount(amountParam);
      setService(serviceParam);
    } else {
      // Default to failure if no valid status is provided
      setStatus("failure");
    }
  }, [searchParams]);

  if (status === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <MarketingLayout>
      <div className="max-w-md mx-auto">
        <div className="h-20" />
        <PaymentStatusCard
          status={status}
          transactionId={transactionId}
          amount={amount}
          service={service}
        />
      </div>
    </MarketingLayout>
  );
}
