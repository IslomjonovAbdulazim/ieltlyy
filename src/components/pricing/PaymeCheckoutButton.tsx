"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PaymeCheckoutButtonProps {
  productId: string;
  productName: string;
  amount: number; // Amount in UZS
  className?: string;
  children?: React.ReactNode;
}

export function PaymeCheckoutButton({
  productId,
  productName,
  amount,
  className,
  children = "Pay with Payme",
}: PaymeCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handlePaymeCheckout = async () => {
    // Auth check
    if (!session?.user) {
      if (!isPending) {
        router.push(
          `/login?redirect=${encodeURIComponent(window.location.pathname)}`
        );
      }
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/payme/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          productId,
          userId: session.user.id,
          amount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Payment creation failed");
      }

      // Redirect to Payme checkout
      const isInIframe =
        typeof window !== "undefined" && window.self !== window.top;
      if (isInIframe) {
        window.parent?.postMessage(
          { type: "OPEN_EXTERNAL_URL", data: { url: data.paymentUrl } },
          "*"
        );
      } else {
        window.open(data.paymentUrl, "_blank", "noopener,noreferrer");
      }

      toast.success("Redirecting to Payme checkout...");
    } catch (error) {
      console.error("Payme checkout error:", error);
      toast.error("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePaymeCheckout}
      disabled={loading}
      className={className}
      variant="outline"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          Processing...
        </>
      ) : (
        <>
          <svg
            className="h-5 w-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="4" fill="#00D4FF" />
            <path
              d="M7 12L10.5 15.5L17 9"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {children}
        </>
      )}
    </Button>
  );
}