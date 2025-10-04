"use client";

import PricingPageContent from "@/components/pricing/PricingPageContent";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[var(--background-light)] py-16">
      <div className="container mx-auto px-6">
        <PricingPageContent />
      </div>
    </div>
  );
}