"use client";

import * as React from "react";
import Image from "next/image";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Mamura Yuldasheva",
    title: "IELTS Expert, Band 9 holder",
    quote: "This platform provides an excellent simulation of the real IELTS exam. The detailed feedback helps students identify their weak points and improve effectively.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/1416fa2c-8c10-4a93-a858-5c92f2e3a530/generated_images/professional-female-ielts-instructor-por-91169b38-20251002194753.jpg?",
  },
  {
    name: "Barno Asqarova",
    title: "IELTS Instructor, 8+ years experience",
    quote: "I recommend this to all my students. The scoring system is accurate and the instant results help maintain motivation throughout the preparation journey.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    name: "Bekhzod Shukhratov",
    title: "IELTS Trainer, Band 8.5 holder",
    quote: "The variety of practice tests and the user-friendly interface make this an invaluable tool for anyone preparing for IELTS. Highly recommended!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
];

export default function Testimonials() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section id="experts" className="bg-[#F8F9FA] py-20">
      <div className="container mx-auto px-6">
        <div className="w-full md:w-7/12">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-12">
            what experts say about us:
          </h2>
        </div>
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="bg-[#E8D5C4] rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[300px] md:items-stretch">
                  <div className="relative p-8 md:p-10 flex-grow w-full md:w-auto">
                    <p
                      className="absolute top-2 left-2 text-8xl text-black opacity-10 font-serif leading-none"
                      aria-hidden="true"
                    >
                      ❝
                    </p>
                    <div className="relative z-10">
                      <p className="italic text-lg text-black mb-6 max-w-lg">
                        {testimonial.quote}
                      </p>
                      <h6 className="font-bold text-xl text-black">
                        {testimonial.name}
                      </h6>
                      <p className="text-sm text-text-secondary mt-1">
                        {testimonial.title}
                      </p>
                      <a
                        href={testimonial.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-text-secondary underline mt-4 inline-block hover:text-black transition-colors"
                      >
                        Learn more ⤴
                      </a>
                    </div>
                  </div>
                  <div className="relative flex-none self-center md:self-auto md:flex md:items-end md:pr-4 h-[250px] w-[180px] md:h-auto md:w-auto">
                    <Image
                      src={testimonial.image.replace("?", "")}
                      alt={testimonial.name}
                      width={180}
                      height={270}
                      className="object-contain object-bottom h-full w-full"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === i ? "w-5 bg-gray-500" : "w-2 bg-gray-300"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </section>
  );
}