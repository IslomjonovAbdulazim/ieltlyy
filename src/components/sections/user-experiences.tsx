import Image from "next/image";
import Link from "next/link";

const experiences = [
  {
    title: "Study House Learning Center",
    description: "Students preparing together",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
  },
  {
    title: "International Students",
    description: "Global community learning together",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop",
  },
  {
    title: "Individual Study Sessions",
    description: "Focused preparation environment",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
  },
  {
    title: "Library Study Group",
    description: "Collaborative learning experience",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop",
  },
];

const UserExperiences = () => {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="container">
        <h3 className="text-3xl font-bold text-text-primary mb-12">
          examiers experiences:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl aspect-[3/4] group"
            >
              <Image
                src={experience.image}
                alt={experience.title}
                fill
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-5">
                <p className="text-white text-lg font-medium leading-tight">
                  {experience.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
          <Link
            href="/community"
            className="btn-secondary w-full sm:w-auto text-center"
          >
            Explore More
          </Link>
          <Link
            href="/community"
            className="btn-primary w-full sm:w-auto text-center"
          >
            Share Yours
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UserExperiences;