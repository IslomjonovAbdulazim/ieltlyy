"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const tests = Array.from({ length: 20 }, (_, i) => ({ id: i + 1 }));

const TestCard = ({ number }: { number: number }) => (
  <Link href={`/tests/${number}`} className="block flex-shrink-0">
    <div className="relative w-[260px] h-[370px] bg-black rounded-3xl overflow-hidden p-8 flex flex-col justify-between cursor-pointer group transition-transform duration-300 hover:scale-105">
      <div 
        className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#E60012] to-transparent opacity-90"
        style={{
          backgroundImage: 'radial-gradient(circle at bottom, #E60012 0%, transparent 70%)',
        }}
      ></div>
      <div 
        className="absolute inset-0 bg-no-repeat bg-bottom"
        style={{
          backgroundImage: `url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1416fa2c-8c10-4a93-a858-5c92f2e3a530-examy-me/assets/images/ielts-test-card-4.png?')`,
          backgroundSize: '80%',
          opacity: 0.08,
        }}
      ></div>
      
      <div className="relative z-10 text-white">
        <p className="text-[32px] font-bold leading-tight">
          Real<br/>LET<br/>Exam
        </p>
      </div>
      <div className="relative z-10 text-white self-end">
        <p className="text-[128px] font-black leading-none -mb-2">{number}</p>
      </div>
    </div>
  </Link>
);

const TestSelection = () => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="cards" className="py-20 bg-white" style={{ fontFamily: 'var(--font-primary, "Inter", sans-serif)' }}>
      <div className="container">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-4">
          <h2 className="text-[48px] font-bold text-black" style={{ fontFamily: 'var(--font-heading, "Inter", sans-serif)' }}>
            select one of the tests:
          </h2>
          <div className="flex items-center flex-wrap gap-4 sm:gap-6">
            <h4 className="text-[24px] font-bold text-black" style={{ fontFamily: 'var(--font-heading, "Inter", sans-serif)' }}>
              first exam is <span className="text-brand-primary">FREE</span>
            </h4>
            <Link href="/all-tests" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
              See all tests
            </Link>
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black p-8 text-white"
          style={{
            backgroundImage: `url('https://v3.fal.media/files/monkey/6jkscl3MlOOyFq3bnBtkS_output.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-4">
            <h2 className="text-[48px] font-bold text-white" style={{ fontFamily: 'var(--font-heading, "Inter", sans-serif)' }}>
              select one of the tests:
            </h2>
            <div className="flex items-center flex-wrap gap-4 sm:gap-6">
              <h4 className="text-[24px] font-bold text-white" style={{ fontFamily: 'var(--font-heading, "Inter", sans-serif)' }}>
                first exam is <span className="text-brand-primary">FREE</span>
              </h4>
              <Link href="/all-tests" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
                See all tests
              </Link>
            </div>
          </div>

          <div className="relative">
            <button 
              onClick={() => scroll('left')}
              className="absolute left-[-24px] top-1/2 -translate-y-1/2 z-10 text-white hidden xl:block" aria-label="Previous test">
              <ChevronLeft size={48} />
            </button>

            <div 
              ref={scrollContainerRef}
              className="flex gap-8 overflow-x-auto pb-4 "
              style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {tests.map((test) => (
                 <TestCard key={test.id} number={test.id} />
              ))}
               <style jsx>{`
                .overflow-x-auto::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
            </div>
            
            <button 
              onClick={() => scroll('right')}
              className="absolute right-[-24px] top-1/2 -translate-y-1/2 z-10 text-white hidden xl:block" aria-label="Next test">
              <ChevronRight size={48} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestSelection;