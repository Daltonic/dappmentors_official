import DonationForm from "@/components/donate/DonationForm";
import MakeDonationsPage from "@/components/donate/MakeDonationsPage";
import MarketingLayout from "@/components/layouts/MarketingLayout";
import React from "react";

export default function DonatePage() {
  return (
    <MarketingLayout>
      <div className="max-w-screen-xl mx-auto space-y-10">
        <MakeDonationsPage/>
        <DonationForm/>
      </div>
    </MarketingLayout>
  );
}
