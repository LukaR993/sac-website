import { Locale } from "@/types";
import { getDictionary } from "@/utils/dictionaries";
import React from "react";
import Image from "next/image";
import { CarouselComponent } from "@/components/functional/carusel";
import ProductCard from "@/components/functional/product-card";
import ProductFilters from "@/components/functional/product-filter";
import ProductList from "@/components/functional/product-list";
import StarkoAssistant from "@/components/starko-assistant";
import { Separator } from "@/components/ui/separator";

export default async function Products({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const key = locale === "me" ? "c14f2d91-6005-4b3a-ab4c-30d621fde5b9" : locale === "en" ? "466cb5d3-77d3-480c-ac68-e465257f9517" :  locale === "ru" ? "fe5633e7-e212-413b-8b79-9b129dcdc6d7" : "35039ed9-5330-40cf-897d-2dee7d19d00b";

  return (
    <main className="min-h-screen py-8 md:py-16">
      <StarkoAssistant id={key} initialMessage="" locale={locale} />
    
      
      <CarouselComponent locale={locale} />
     

      <div className="container mx-auto md:px-0 scroll-mt-24">
        <ProductList locale={locale} title={dict.products.title} />
      </div>
    </main>
  );
}
