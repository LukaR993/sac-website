import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/types';
import { getDictionary } from '@/utils/dictionaries';

interface ProductCardProps {
  name: string;
  description: string;
  image: string;
  locale: Locale;
}

export default async function ProductCard({ name, description, image, locale }: ProductCardProps) {
  const dict = await getDictionary(locale);
  
  return (
    <div className="bg-white overflow-hidden">
      <div className="relative h-80 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="pt-4 flex flex-col justify-between">
        <h3 className="text-xl font-semibold text-[#7D1C21] mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <Link 
          href="#"
          className="inline-block self-end text-[#7D1C21] font-medium hover:text-[#9B2C32] transition-colors"
        >
          {dict.products.learnMore} →
        </Link>
      </div>
    </div>
  );
}
