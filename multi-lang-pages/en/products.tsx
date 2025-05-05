import { Locale } from "@/types";
import { getDictionary } from "@/utils/dictionaries";
import React from "react";
import Image from "next/image";
import { CarouselComponent } from "@/components/functional/carusel";
import ProductCard from "@/components/functional/product-card";

export default async function Products({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);

  return (
    <main className="min-h-screen py-8 md:py-16">
      <CarouselComponent/>
      <div className="container mx-auto px-4 md:px-0 mb-8 py-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7D1C21] focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {dict.products.items.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            description={product.description}
            image={product.image}
            locale={locale}
          />
        ))}
      </div>
    </main>
  );
} 