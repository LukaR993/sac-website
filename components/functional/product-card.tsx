'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/types';
import { ArrowRightIcon } from 'lucide-react';
import { Separator } from '../ui/separator';

interface ProductCardProps {
  name: string;
  description: string;
  image: string;
  locale: Locale;
  productId: string;
}

export default  function ProductCard({ name, description, image, locale, productId }: ProductCardProps) {
 
  const productPath = {
    en: "products",
    ru: "produkty", 
    me: "proizvodi",
    sq: "produktet"
  };
  return (
    <Link  
    href={`/${locale}/${productPath[locale]}/${productId}`}
    className="bg-white overflow-hidden  ">
      <div className="relative aspect-[1.5/1]  w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="pt-4 flex flex-col justify-between">
        <h3 className="text-lg md:text-xl font-bold text-[#7D1C21] line-clamp-1 mb-2">{name}</h3>
        <Separator/>
        <p className="text-muted-foreground mb-4 text-xs  md:text-sm mt-2 line-clamp-2">{description
            .replace(/<[^>]*>?/g, '')
            .replace(/[#*_~`]/g, '')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/^[-*+]\s+/gm, '')
            .replace(/^\d+\.\s+/gm, '')
            .trim().toLowerCase()}</p>
       
      
      </div>
    </Link>
  );
}
