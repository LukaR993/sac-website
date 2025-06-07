"use client";

import React, { useEffect, useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getSingleCategory } from "@/actions/starko";
import { Locale } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

const translations = {
  me: "Pogledaj sve proizvode",
  en: "View all",
  ru: "Посмотреть все",
  sq: "Shiko të gjitha"
} as const;

interface SubCategory {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string | null;
  thumbnail_url: string | null;
}

interface Category {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string | null;
  thumbnail_url: string | null;
  sub_categories: SubCategory[];
}

interface SingleCategoryResponse {
  ok: boolean;
  message: string;
  data: Category;
}

export function CarouselComponent(params: {locale: Locale}) {
  const key = params.locale === "me" ? "c14f2d91-6005-4b3a-ab4c-30d621fde5b9" : params.locale === "en" ? "466cb5d3-77d3-480c-ac68-e465257f9517" :  params.locale === "ru" ? "fe5633e7-e212-413b-8b79-9b129dcdc6d7" : "35039ed9-5330-40cf-897d-2dee7d19d00b";
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const data = useQuery({
    queryKey: ["categories", key],
    queryFn: () => getCategories(key),
  });
  const searchParams = useSearchParams();
  const [categoryId, setCategoryId] = useState<string | null>(searchParams.get("category") || null);
  const singleCategoryInfo = useQuery({
    queryKey: ["singleCategoryInfo", categoryId],
    queryFn: () => getSingleCategory(categoryId || "", key),
    enabled: !!categoryId,
  });
  const pathname = usePathname();
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    setCategoryId(searchParams.get("category") || null);
    setSelectedSubCategory(searchParams.get("subcategory") || null);
  }, [searchParams]);
  useEffect(() => {
    if (!pathname.includes("products") || searchParams.get("category") || searchParams.get("subcategory")) {
      setShowAll(true);
    } else {
      setShowAll(false);
    }
  }, [pathname, searchParams]);
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
      {showAll && <div className="w-full flex items-end justify-end">
        <Link href={`/${params.locale}/products`} className={cn(buttonVariants({variant:'default'}), 'mt-4')}>
          {translations[params.locale]}
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </Link>
      </div>}
      <div className="mt-8 flex flex-row gap-4 overflow-x-auto scrollbar-hide">
      {(singleCategoryInfo.data?.data as Category)?.sub_categories?.map((subcategory: SubCategory, index: number) => (
        <div key={subcategory.id} className="md:mt-8">
          <div className="flex flex-row max-w-full overflow-x-auto gap-4 ">
            <Link 
              key={subcategory.id}
              href={`/${params.locale}/products?category=${(singleCategoryInfo.data?.data as Category)?.id}&subcategory=${subcategory.id}`}
              className={`px-2 py-1 border whitespace-nowrap rounded-lg hover:shadow-md transition-shadow hover:bg-[#7D1C21]/20  ${selectedSubCategory === subcategory.id ? 'bg-[#7D1C21] text-white' : ''}`}
            >
              <h4 className="font-medium">{subcategory.name}</h4>
              <p className={`text-sm mt-1 line-clamp-2 ${selectedSubCategory === subcategory.id ? 'text-white/90' : 'text-gray-500'}`}>{subcategory.description}</p>
            </Link>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
