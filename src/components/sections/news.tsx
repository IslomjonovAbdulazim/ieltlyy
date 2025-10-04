import React from 'react';
import Link from 'next/link';

interface NewsArticle {
  date: string;
  title: string;
  description: string;
  href: string;
}

const newsData: NewsArticle[] = [
  {
    date: "03.08.2024",
    title: "Invite Friends and Earn Free Credits",
    description: "Examy has introduced a new feature that rewards you with 4 free credits for each friend you invite. To learn more about this offer, visit the bottom of the pricing page.",
    href: "/news/1",
  },
  {
    date: "01.01.2024",
    title: "Enterprise version coming soon.",
    description: "Schools, lyceums, and universities will soon be able to implement Examy in their institutions to facilitate exams for their students.",
    href: "/news/2",
  },
];

const NewsCard: React.FC<{ article: NewsArticle }> = ({ article }) => (
  <Link href={article.href} className="block group">
    <p className="font-body text-sm text-text-secondary mb-2">
      {article.date}
    </p>
    <h3 className="font-heading text-2xl font-bold text-text-primary mb-4 group-hover:text-brand-primary transition-colors duration-200 ease-in-out">
      {article.title}
    </h3>
    <p className="font-body text-base text-text-secondary leading-relaxed">
      {article.description}
    </p>
  </Link>
);

const NewsSection = () => {
  return (
    <section id="news" className="bg-background py-20">
      <div className="container mx-auto px-6">
        <h2 className="font-heading text-[48px] font-bold text-text-primary mb-6 lowercase">
          news
        </h2>
        <hr className="border-t border-border-gray mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {newsData.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;