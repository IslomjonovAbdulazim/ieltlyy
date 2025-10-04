import { HeroSection } from '@/components/sections/hero-section';
import HowItWorks from '@/components/sections/how-it-works';
import Testimonials from '@/components/sections/testimonials';
import { AdvantagesSection } from '@/components/sections/advantages';
import TestSelection from '@/components/sections/test-selection';
import ResultsLeaderboard from '@/components/sections/results-leaderboard';
import BritishCouncilPartnership from '@/components/sections/british-council-partnership';
import FaqSection from '@/components/sections/faq';
import NewsSection from '@/components/sections/news';
import UserExperiences from '@/components/sections/user-experiences';
import Footer from '@/components/sections/footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <HowItWorks />
      <Testimonials />
      <AdvantagesSection />
      <TestSelection />
      <ResultsLeaderboard />
      <BritishCouncilPartnership />
      <FaqSection />
      <NewsSection />
      <UserExperiences />
      <Footer />
    </main>
  );
}