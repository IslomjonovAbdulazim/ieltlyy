"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export const HeroSection = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "Take a fake test and get your IELTS score for free in 60 seconds",
    "Take a full test covering all 4 sections or practice each section separately",
    "Your convenience is important. Our tests are also available on mobile devices",
    "Join our telegram channel to stay up to date with the new features"
  ];

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="font-sans">
      <div className="relative isolate w-full pt-20" style={{ height: '550px' }}>
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
            alt="IELTS preparation background"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-50/60 to-gray-100/60" />
        </div>
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div>
              <h1 className="text-[72px] font-bold uppercase leading-[1.1] text-black">
                Prepare
                <br />
                for the
                <br />
                <span className="mt-2 inline-block rounded-lg bg-[#E60012] px-6 py-3 text-white">
                  IELTS LY
                </span>
              </h1>
            </div>
            <div className="flex flex-col items-start md:items-end md:justify-self-end">
                <p className="max-w-[450px] text-2xl leading-normal text-[#666666] min-h-[120px] transition-opacity duration-500">
                    {slides[currentSlide]}
                </p>
                <div className="mt-8 flex items-center space-x-3">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`rounded-full transition-all ${
                          index === currentSlide
                            ? 'h-2 w-6 bg-[#666666]'
                            : 'h-2 w-2 bg-[#d9d9d9]'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-[60px] max-w-[1200px] px-6">
        <div className="rounded-xl border border-[#EEEEEE] bg-white p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05),0_4px_6px_-2px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-black">
                Trusted by <span className="text-[#E60012]">{loading ? '...' : `${userCount.toLocaleString()}+`}</span> users
              </h2>
              <p className="mt-1 text-base text-[#666666]">
                someone registered <span className="font-medium text-[#22C55E]">recently</span>
              </p>
            </div>
            <a
              href="/tests"
              className="flex-shrink-0 rounded-full bg-[#E60012] px-8 py-4 text-base font-medium text-white transition-opacity hover:opacity-90"
            >
              Start Test
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};