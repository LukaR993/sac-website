import { cn } from '@/lib/utils';
import { Locale } from '@/types';
import { getDictionary } from '@/utils/dictionaries';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { buttonVariants } from '../ui/button';

export default async function After20Years({locale}:{locale:Locale}) {
  const dict = await getDictionary(locale);
  
  return (
    <section className="w-full py-8 md:py-16">
      <div className="container px-4 md:pl-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
          <h2 className="text-2xl md:text-4xl font-bold text-[#310b0d] text-center md:col-span-3">
            {dict.after20.title}
          </h2>
          <div className='flex md:col-span-9 flex-col items-end gap-2'>
            <p className="text-sm md:text-base  text-[#310b0d] ">
              {dict.after20.paragraph}
              
            </p>
            <Link href={`/${locale}/o-nama`} className={cn(buttonVariants({}),"bg-[#7D1C21] flex items-center gap-2")}>
              {dict.after20.link} <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
