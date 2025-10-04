import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const BritishCouncilPartnership = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="bg-[#F8F9FA] rounded-[24px] p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-8 items-center">
            {/* Left Column: Text Content */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/1416fa2c-8c10-4a93-a858-5c92f2e3a530/generated_images/british-council-and-ielts-official-partn-aa0483d5-20251002194704.jpg?"
                alt="British Council and IELTS Logo"
                width={300}
                height={100}
                className="mb-6"
              />
              <h2 className="text-text-primary text-[32px] font-bold mb-6 leading-[1.3]">
                Ready to take the real <span className="text-brand-primary">IELTS</span> exam?
              </h2>
              <p className="text-text-secondary text-[20.8px] mb-12 leading-[1.6]">
                Register for the official IELTS exam with the British Council and get <span className="font-bold text-text-primary">30 Units</span> added to your balance
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href="https://rebrand.ly/examy-bc-register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-primary text-white font-medium py-4 px-6 rounded-lg hover:opacity-90 transition-opacity text-base"
                >
                  Register Now
                  <ArrowUpRight size={20} className="flex-shrink-0" />
                </a>
                <p className="text-text-secondary font-medium text-base">
                  Trusted by 20,000+ students
                </p>
              </div>
            </div>
            {/* Right Column: Image */}
            <div className="md:col-span-5">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/1416fa2c-8c10-4a93-a858-5c92f2e3a530/generated_images/professional-female-ielts-instructor-por-91169b38-20251002194753.jpg?"
                alt="Student studying for IELTS"
                width={400}
                height={500}
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BritishCouncilPartnership;