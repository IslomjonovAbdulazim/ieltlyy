"use client";

import Link from 'next/link';
import { Circle } from 'lucide-react';
import { useEffect, useState } from 'react';

const advantagesList = [
  "Band scores closely match the real exam.",
  "Get your results via sms/email.",
  "Get feedback about your performance.",
  "Fast and affordable.",
];

interface Statistic {
  main: string;
  sub?: string;
  description: string;
}

const StatisticItem = ({ stat }: { stat: Statistic }) => (
  <div>
    <p className="text-[64px] font-bold text-text-primary leading-none">
      {stat.main}
      {stat.sub && <span className="text-[48px] align-baseline ml-1">{stat.sub}</span>}
    </p>
    <p className="mt-2 text-text-secondary text-base max-w-[200px]">
      {stat.description}
    </p>
  </div>
);

export const AdvantagesSection = () => {
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

  const statisticsData: Statistic[] = [
    { main: "30", sub: "sec", description: "results are out within 30 seconds on average" },
    { main: "5X", description: "5 times cheaper than traditional mock test" },
    { main: loading ? "..." : `${userCount.toLocaleString()}+`, description: "Users registered" },
    { main: "44500+", description: "Tests completed" },
  ];

  return (
    <section className="bg-[#F8F9FA] py-20">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
          
          <div className="w-full md:w-7/12">
            <p className="text-sm text-text-secondary uppercase tracking-widest mb-4">
              About Us
            </p>
            <h2 className="text-[48px] font-bold text-text-primary mb-8 leading-tight">
              what are our advantages?
            </h2>
            <ul className="space-y-5 mb-12">
              {advantagesList.map((advantage, index) => (
                <li key={index} className="flex items-center">
                  <Circle className="w-2.5 h-2.5 fill-current text-black mr-4 flex-shrink-0" />
                  <span className="text-xl text-text-primary">{advantage}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/all-tests" className="btn-primary text-center">
                start exam
              </Link>
              <Link href="/#howToUse" className="btn-secondary text-center">
                video about us
              </Link>
            </div>
          </div>

          <div className="w-full md:w-5/12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
              {statisticsData.map((stat, index) => (
                <StatisticItem key={index} stat={stat} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;