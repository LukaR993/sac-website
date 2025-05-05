import { Locale } from "@/types";
import { getDictionary } from "@/utils/dictionaries";
import React from "react";
import Image from "next/image";

export default async function Partners({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/img/partners-hero.jpg"
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

      {/* Partners Grid Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Partner cards will be mapped here */}
            {dict.partners.items.map((partner, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
                <div className="relative h-64">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain p-8"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-[#7D1C21] mb-2">{partner.name}</h3>
                  <p className="text-gray-600 mb-4">{partner.description}</p>
                  <a 
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#7D1C21] text-white px-6 py-2 rounded-md hover:bg-[#9B2C32] transition-colors"
                  >
                    {dict.partners.visitWebsite}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#7D1C21] mb-6">{dict.partners.becomePartner.title}</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">{dict.partners.becomePartner.description}</p>
          <button className="bg-[#7D1C21] text-white px-8 py-3 rounded-md hover:bg-[#9B2C32] transition-colors text-lg">
            {dict.partners.becomePartner.button}
          </button>
        </div>
      </section>
    </main>
  );
} 