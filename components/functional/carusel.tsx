"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/actions/starko";
import { Locale } from "@/types";
export function CarouselComponent(params: {locale: Locale}) {
  const key = params.locale === "me" ? "c14f2d91-6005-4b3a-ab4c-30d621fde5b9" : params.locale === "en" ? "466cb5d3-77d3-480c-ac68-e465257f9517" :  params.locale === "ru" ? "fe5633e7-e212-413b-8b79-9b129dcdc6d7" : "35039ed9-5330-40cf-897d-2dee7d19d00b";

  const data = useQuery({
    queryKey: ["categories", key],
    queryFn: () => getCategories(key),
  });
  const cards = data.data?.data?.map((card, index) => (
    <Card
      key={card.id}
      card={{
        category: card.name,
        description: card.description,
        link: `/${params.locale}/products?category=${card.id}`,

        src: card.thumbnail_url || '',
      }}
      index={index}
    />
  ));

  return (
    <div className="container px-4 md:px-0">
      <Carousel items={cards || []} />
    </div>
  );
}
