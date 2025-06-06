'use client'
import React, { useCallback, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/types';
import { ArrowRightIcon } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

interface ProductCardProps {
  name: string;
  description: string;
  image: string;
  locale: Locale;
  productId: string;
}
function extractImagesFromMarkdown(content: string): string[] {
  // Handle empty content
  if (!content) return [];

  const images: string[] = [];

  // Match both standard markdown images and HTML img tags
  const markdownRegex = /!\[(?:.*?)\]\((.*?)\)/g;
  const htmlRegex = /<img.*?src=["'](.*?)["']/g;

  // Extract markdown image URLs
  let match;
  while ((match = markdownRegex.exec(content)) !== null) {
    if (match[1] && !match[1].startsWith("data:")) {
      images.push(match[1].trim());
    }
  }

  // Extract HTML img tag URLs
  while ((match = htmlRegex.exec(content)) !== null) {
    if (match[1] && !match[1].startsWith("data:")) {
      images.push(match[1].trim());
    }
  }

  // Remove duplicates and empty strings
  return [...new Set(images)].filter((url) => url.length > 0);
}
export default  function ProductCard({ name, description, image, locale, productId }: ProductCardProps) {
  const allImages = useMemo(() => {
    if (!description) return [];
    const markdownImages = extractImagesFromMarkdown(description);
    const images = [image || "", ...markdownImages].filter((url) => url !== "");
    return [...new Set(images)]; // Remove duplicates
  }, [description]);

  const productPath = {
    en: "products",
    ru: "produkty", 
    me: "proizvodi",
    sq: "produktet"
  };
  const [api, setApi] = React.useState<CarouselApi>()
  
  return (
    <Link  
    href={`/${locale}/${productPath[locale]}/${productId}`}
    className="bg-white overflow-hidden  ">
      <div className="relative aspect-[1.5/1]  w-full">
      <Carousel  setApi={setApi} >
  <CarouselContent>
    {allImages.map((image) => (
      <CarouselItem onMouseOver={()=>{
        if(!api?.canScrollPrev()) {
          api?.scrollNext()
        } 
      }} className='w-full h-full' key={image}>
        <Image src={image} alt={name}  className='object-cover w-full  aspect-[1.5/1]'  width={400} height={400} />
      </CarouselItem>
    ))}
  </CarouselContent>
 
</Carousel>
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
            .trim()}</p>
       
      
      </div>
    </Link>
  );
}
