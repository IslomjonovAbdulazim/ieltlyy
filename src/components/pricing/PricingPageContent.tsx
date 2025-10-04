"use client";

import { PricingTable } from "@/components/autumn/pricing-table";
import { PaymeCheckoutButton } from "@/components/pricing/PaymeCheckoutButton";
import { useEffect, useState } from "react";

export default function PricingPageContent() {
  const [userCount, setUserCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users/count')
      .then(res => res.json())
      .then(data => {
        setUserCount(data.count || 0);
        setLoading(false);
      })
      .catch(() => {
        setUserCount(0);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-[var(--text-primary)] mb-4">
          Choose Your Plan
        </h1>
        <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
          Get unlimited access to IELTS practice tests and detailed feedback. Start your first test for free!
        </p>
        {/* Trust Badge */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white border border-[var(--border-gray)] px-6 py-3 shadow-sm">
          <svg className="h-5 w-5 text-[var(--success-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-medium text-[var(--text-primary)]">
            Trusted by <span className="text-[#E60012] font-bold">{loading ? '...' : `${userCount.toLocaleString()}+`}</span> users
          </span>
        </div>
      </div>

      {/* Payme Quick Payment Section */}
      <div className="mb-12 max-w-3xl mx-auto">
        <div className="bg-gradient-to-r from-[#00D4FF] to-[#00B8E6] rounded-2xl p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">Pay with Payme</h2>
              <p className="text-white/90 text-lg">
                🇺🇿 For users in Uzbekistan - Quick payment in UZS
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <PaymeCheckoutButton
                productId="pro"
                productName="Pro Plan"
                amount={50000}
                className="bg-white text-[#00D4FF] hover:bg-gray-100 font-semibold px-8 py-4 rounded-full shadow-lg transition-all hover:scale-105"
              />
              <PaymeCheckoutButton
                productId="premium"
                productName="Premium Plan"
                amount={100000}
                className="bg-[#6B46C1] text-white hover:bg-[#5a3aa3] font-semibold px-8 py-4 rounded-full shadow-lg transition-all hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Table */}
      <PricingTable />

      {/* Payme Payment Section */}
      <div className="mt-12 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl border border-[var(--border-gray)] p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                Pay with Payme
              </h3>
              <p className="text-[var(--text-secondary)]">
                For users in Uzbekistan - Pay directly with Payme in UZS
              </p>
            </div>
            <svg
              className="h-12 w-12"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="48" height="48" rx="8" fill="#00D4FF" />
              <path
                d="M14 24L21 31L34 18"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-[var(--border-gray)] rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-[var(--text-primary)]">Pro Plan</h4>
                <span className="text-sm bg-[var(--background-light)] px-3 py-1 rounded-full">Monthly</span>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-[var(--text-primary)]">50,000</span>
                <span className="text-[var(--text-secondary)] ml-2">UZS/month</span>
              </div>
              <ul className="space-y-2 mb-6 text-sm text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <span className="text-[var(--success-green)]">✓</span>
                  Unlimited practice tests
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--success-green)]">✓</span>
                  Detailed feedback
                </li>
              </ul>
              <PaymeCheckoutButton
                productId="pro"
                productName="Pro Plan"
                amount={50000}
                className="w-full"
              />
            </div>

            <div className="border border-[var(--border-gray)] rounded-lg p-6 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[var(--brand-primary)] text-white text-xs font-medium px-3 py-1 rounded-full">
                Popular
              </div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-[var(--text-primary)]">Premium Plan</h4>
                <span className="text-sm bg-[var(--background-light)] px-3 py-1 rounded-full">Monthly</span>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-[var(--text-primary)]">100,000</span>
                <span className="text-[var(--text-secondary)] ml-2">UZS/month</span>
              </div>
              <ul className="space-y-2 mb-6 text-sm text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <span className="text-[var(--success-green)]">✓</span>
                  Everything in Pro
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--success-green)]">✓</span>
                  AI-powered evaluations
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[var(--success-green)]">✓</span>
                  1-on-1 expert session
                </li>
              </ul>
              <PaymeCheckoutButton
                productId="premium"
                productName="Premium Plan"
                amount={100000}
                className="w-full"
              />
            </div>
          </div>

          <p className="text-sm text-[var(--text-secondary)] text-center mt-6">
            💳 Secure payment processing by Payme • Cancel anytime
          </p>
        </div>
      </div>

      {/* Features Comparison */}
      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[var(--text-primary)] mb-8">
          All Plans Include
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3 bg-white p-6 rounded-xl border border-[var(--border-gray)]">
            <div className="text-[var(--success-green)] text-xl">✓</div>
            <div>
              <h4 className="font-semibold text-[var(--text-primary)] mb-1">Instant Results</h4>
              <p className="text-sm text-[var(--text-secondary)]">Get your band scores within 60 seconds of completing your test</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white p-6 rounded-xl border border-[var(--border-gray)]">
            <div className="text-[var(--success-green)] text-xl">✓</div>
            <div>
              <h4 className="font-semibold text-[var(--text-primary)] mb-1">Detailed Feedback</h4>
              <p className="text-sm text-[var(--text-secondary)]">Comprehensive reports on your performance across all sections</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white p-6 rounded-xl border border-[var(--border-gray)]">
            <div className="text-[var(--success-green)] text-xl">✓</div>
            <div>
              <h4 className="font-semibold text-[var(--text-primary)] mb-1">Real IELTS Format</h4>
              <p className="text-sm text-[var(--text-secondary)]">Tests designed to match actual IELTS exam patterns and difficulty</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white p-6 rounded-xl border border-[var(--border-gray)]">
            <div className="text-[var(--success-green)] text-xl">✓</div>
            <div>
              <h4 className="font-semibold text-[var(--text-primary)] mb-1">All Test Types</h4>
              <p className="text-sm text-[var(--text-secondary)]">Access to Listening, Reading, Writing, and Speaking sections</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[var(--text-primary)] mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <details className="bg-white p-6 rounded-xl border border-[var(--border-gray)] group">
            <summary className="font-semibold text-[var(--text-primary)] cursor-pointer list-none flex items-center justify-between">
              <span>What happens after I use my free test?</span>
              <span className="text-[var(--text-secondary)] group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-4 text-[var(--text-secondary)]">
              After your free test, you can upgrade to Premium to get 10 tests per month or Pro for unlimited tests. All paid plans include detailed feedback and results tracking.
            </p>
          </details>
          <details className="bg-white p-6 rounded-xl border border-[var(--border-gray)] group">
            <summary className="font-semibold text-[var(--text-primary)] cursor-pointer list-none flex items-center justify-between">
              <span>Can I cancel my subscription anytime?</span>
              <span className="text-[var(--text-secondary)] group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-4 text-[var(--text-secondary)]">
              Yes! You can cancel your subscription at any time from your account settings. Your access will continue until the end of your billing period.
            </p>
          </details>
          <details className="bg-white p-6 rounded-xl border border-[var(--border-gray)] group">
            <summary className="font-semibold text-[var(--text-primary)] cursor-pointer list-none flex items-center justify-between">
              <span>Do you offer refunds?</span>
              <span className="text-[var(--text-secondary)] group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-4 text-[var(--text-secondary)]">
              We offer a 7-day money-back guarantee on all paid plans. If you're not satisfied, contact us for a full refund within the first week.
            </p>
          </details>
          <details className="bg-white p-6 rounded-xl border border-[var(--border-gray)] group">
            <summary className="font-semibold text-[var(--text-primary)] cursor-pointer list-none flex items-center justify-between">
              <span>How accurate are the band scores?</span>
              <span className="text-[var(--text-secondary)] group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-4 text-[var(--text-secondary)]">
              Our scoring algorithm is calibrated to closely match official IELTS band scores. While practice test scores are indicative, they provide excellent preparation for the real exam.
            </p>
          </details>
        </div>
      </div>
    </>
  );
}