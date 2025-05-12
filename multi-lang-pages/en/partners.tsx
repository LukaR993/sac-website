import { Locale } from "@/types";
import { getDictionary } from "@/utils/dictionaries";
import React from "react";
import Image from "next/image";
import { MemoizedMarkdown } from "@/components/markdown-block";
import TrustedBy from "@/components/functional/trusted-by";
import Link from "next/link";

export default async function Partners({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/img/about-hero.jpg"
            alt="Our Partners"
            fill
            className="object-cover transform scale-105 transition-transform duration-700 hover:scale-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">{dict.partners.title}</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">{dict.partners.description}</p>
        </div>
      </section>

      <TrustedBy locale={locale} />

     
    
      {/* Become a Partner Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#7D1C21] mb-6">{dict.partners.becomePartner.title}</h2>
          <p className="text-sm text-gray-600 mb-8 max-w-3xl mx-auto">{dict.partners.becomePartner.description}</p>
          <Link href={`/${locale}/contacts`} className="bg-[#7D1C21] text-white px-8 py-3 rounded-md hover:bg-[#9B2C32] transition-colors text-lg">
            {dict.partners.becomePartner.button}
          </Link>
        </div>
      </section>
    </main>
  );
} 