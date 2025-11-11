import React from 'react';
import Image from 'next/image';
import Link from '@/components/ui/Link';
import Section from '@/components/ui/layout/Section';

interface CategoryCardProps {
  title: string;
  description?: string;
  image?: string;
  href: string;
  count?: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  image,
  href,
  count = 0,
}) => {
  return (
    <Link
      href={href}
      aria-label={`View ${title} menu`}
      className="block group rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-red-500"
    >
      <Section className="p-0">
        {image && (
          <div className="relative w-full aspect-[4/3] mb-4 bg-black/20 rounded-md overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain rounded-md transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        )}

        <div className="flex-grow flex flex-col">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          {description && <p className="text-gray-300">{description}</p>}
        </div>

        <span className="bg-red-700 text-xs font-bold px-3 py-1 rounded-full text-white self-center mt-auto">
          {count} items
        </span>
      </Section>
    </Link>
  );
};

export default CategoryCard;