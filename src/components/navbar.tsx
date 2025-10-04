"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, Mic, Headphones, Book, PenTool, Crown } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import Image from "next/image";
import { useCustomer } from "autumn-js/react";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [testsOpen, setTestsOpen] = useState(false);
  const { data: session, isPending, refetch } = useSession();
  const { customer, isLoading: isLoadingCustomer } = useCustomer();
  const router = useRouter();

  const logout = async () => {
    const { error } = await authClient.signOut();
    if (error?.code) {
      toast.error(error.code);
    } else {
      localStorage.removeItem("bearer_token");
      refetch();
      router.push("/");
    }
  };

  const currentPlan = customer?.products?.[0]?.name || "Free Plan";
  const isPaidPlan = customer?.products?.[0]?.id !== "free" && customer?.products?.length > 0;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border-gray)] bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image 
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/image-Photoroom-29-1759433896216.png"
            alt="IELTS LY"
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop menu */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm text-[var(--text-secondary)] hover:text-black">Home</Link>

          <div className="relative">
            <button
              className="flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-black"
              onClick={() => setTestsOpen((v) => !v)}
            >
              Tests <ChevronDown className={`h-4 w-4 transition-transform ${testsOpen ? "rotate-180" : ""}`} />
            </button>
            {testsOpen && (
              <div className="absolute left-0 mt-2 w-56 rounded-md border bg-white p-2 shadow">
                <Link href="/tests/listening" className="flex items-center gap-2 rounded px-2 py-2 text-sm hover:bg-[var(--background-light)]">
                  <Headphones className="h-4 w-4" /> Listening
                </Link>
                <Link href="/tests/reading" className="flex items-center gap-2 rounded px-2 py-2 text-sm hover:bg-[var(--background-light)]">
                  <Book className="h-4 w-4" /> Reading
                </Link>
                <Link href="/tests/writing" className="flex items-center gap-2 rounded px-2 py-2 text-sm hover:bg-[var(--background-light)]">
                  <PenTool className="h-4 w-4" /> Writing
                </Link>
                <Link href="/tests/speaking" className="flex items-center gap-2 rounded px-2 py-2 text-sm hover:bg-[var(--background-light)]">
                  <Mic className="h-4 w-4" /> Speaking
                </Link>
              </div>
            )}
          </div>

          <Link href="/tests" className="text-sm text-[var(--text-secondary)] hover:text-black">All Tests</Link>
          <Link href="/contact" className="text-sm text-[var(--text-secondary)] hover:text-black">Contact</Link>
        </div>

        {/* Auth buttons (desktop) */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/pricing" className="text-sm font-medium text-[var(--brand-primary)] hover:opacity-80">
            Pricing
          </Link>
          <Link 
            href="https://payme.uz/checkout/68beb36a09ed787f40eb1c53?back=https:%2F%2Fzehnly.ai%2Fpremium&timeout=15000&lang=ru"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
          >
            paymee
          </Link>
          {isPending ? (
            <span className="text-sm text-[var(--text-secondary)]">Loading...</span>
          ) : session?.user ? (
            <>
              {!isLoadingCustomer && (
                <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                  isPaidPlan 
                    ? "bg-gradient-to-r from-[var(--brand-primary)] to-purple-600 text-white shadow-sm" 
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {isPaidPlan && <Crown className="h-3.5 w-3.5" />}
                  {currentPlan}
                </div>
              )}
              <span className="text-sm text-[var(--text-secondary)]">Hi, {session.user.name.split(" ")[0]}</span>
              <button onClick={logout} className="rounded-full bg-[var(--brand-primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-black">Sign in</Link>
              <Link href="/register" className="rounded-full bg-[var(--brand-primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">Sign up</Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setOpen((v) => !v)} className="md:hidden" aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="container mx-auto flex flex-col gap-1 px-4 py-3">
            <Link href="/" className="rounded px-2 py-2 text-sm hover:bg-[var(--background-light)]">Home</Link>

            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded px-2 py-2 text-sm hover:bg-[var(--background-light)]">
                <span>Tests</span>
                <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
              </summary>
              <div className="ml-2 flex flex-col gap-1 py-1">
                <Link href="/tests/listening" className="rounded px-2 py-2 text-sm hover:bg-[var(--background-light)]">Listening</Link>
                <Link href="/tests/reading" className="rounded px-2 py-2 text-sm hover:bg-[var(--background-light)]">Reading</Link>
                <Link href="/tests/writing" className="rounded px-2 py-2 text-sm hover:bg-[var(--background-light)]">Writing</Link>
                <Link href="/tests/speaking" className="rounded px-2 py-2 text-sm hover:bg-[var(--background-light)]">Speaking</Link>
              </div>
            </details>

            <Link href="/tests" className="rounded px-2 py-2 text-sm hover:bg-[var(--background-light)]">All Tests</Link>
            <Link href="/contact" className="rounded px-2 py-2 text-sm hover:bg-[var(--background-light)]">Contact</Link>
            <Link href="/pricing" className="rounded px-2 py-2 text-sm font-medium text-[var(--brand-primary)] hover:bg-[var(--background-light)]">Pricing</Link>

            <div className="mt-2 flex flex-wrap items-center gap-3 border-t pt-3">
              {isPending ? (
                <span className="text-sm text-[var(--text-secondary)]">Loading...</span>
              ) : session?.user ? (
                <>
                  {!isLoadingCustomer && (
                    <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                      isPaidPlan 
                        ? "bg-gradient-to-r from-[var(--brand-primary)] to-purple-600 text-white" 
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {isPaidPlan && <Crown className="h-3.5 w-3.5" />}
                      {currentPlan}
                    </div>
                  )}
                  <span className="text-sm text-[var(--text-secondary)]">Hi, {session.user.name.split(" ")[0]}</span>
                  <button onClick={logout} className="rounded-full bg-[var(--brand-primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-black">Sign in</Link>
                  <Link href="/register" className="rounded-full bg-[var(--brand-primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">Sign up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;