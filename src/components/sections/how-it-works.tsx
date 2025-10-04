import React from 'react';

const features = [
  {
    title: 'Video Tutorial',
    description: 'Watch a tutorial on how to take an IELTS mock test on Examy.',
  },
  {
    title: 'Detailed report',
    description: 'Receive a comprehensive report with your scores and areas for improvement.',
  },
  {
    title: 'Listening section',
    description: 'Listen to a recording and answer questions based on it.',
  },
  {
    title: 'Writing section',
    description: 'Write two essays based on the given topics.',
  },
  {
    title: 'Reading section',
    description: 'Read three passages and answer related questions.',
  },
  {
    title: 'Speaking section',
    description: 'Answer questions orally during a simulated speaking test.',
  },
];

const HowItWorks = () => {
  return (
    <section id="howToUse" className="py-20 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-12">
          how does this actually work?
        </h2>
        <div className="flex flex-col md:flex-row gap-x-12 gap-y-8 items-start">
          {/* Left Column: Video */}
          <div className="w-full md:w-7/12">
            <div className="relative w-full overflow-hidden rounded-xl shadow-lg" style={{ paddingTop: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full border-0"
                src="https://www.youtube.com/embed/iptpIK5XDx4"
                title="How To Take Free IELTS Mock Test on Examy 2024 (AI based IELTS mock exam platform)"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          
          {/* Right Column: Features Grid */}
          <div className="w-full md:w-5/12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 pt-2">
              {features.map((feature, index) => (
                <div key={index}>
                  <h6 className="text-xl font-bold text-text-primary mb-2">{feature.title}</h6>
                  <p className="text-base text-text-secondary">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;