"use client";
import { Locale } from "@/types";
import React, { use, useEffect } from "react";
import ProductCard from "./product-card";
import { useQuery } from "@tanstack/react-query";
import { getArticles } from "@/actions/starko";
import { useSearchParams } from "next/navigation";

export default function ProductList(params: { locale: Locale; categoryId?: string; title: string }) {
  const searchParams = useSearchParams();
  const key = params.locale === "me" ? "c14f2d91-6005-4b3a-ab4c-30d621fde5b9" : params.locale === "en" ? "466cb5d3-77d3-480c-ac68-e465257f9517" :  params.locale === "ru" ? "fe5633e7-e212-413b-8b79-9b129dcdc6d7" : "35039ed9-5330-40cf-897d-2dee7d19d00b";
  const { data, refetch } = useQuery({
    queryKey: ["products", params.locale, { category: searchParams.get("category"), key: key }],
    queryFn: () => getArticles({ category: searchParams.get("category") || undefined }, key),
  });

  useEffect(() => {
    const productList = document.getElementById("product-list");
    if (productList) {
      productList.scrollIntoView({ behavior: "smooth" });
    }
    refetch();
  }, [searchParams.get("category")]);
  return (
    <div id="product-list" className="grid grid-cols-2 px-4 md:px-0 mt-12    md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
     
      {data?.data.map((product, index) => (
        <ProductCard
          key={index}
          name={product.title}
          description={product.text_content}
          image={product.thumbnail || ""}
          locale={params.locale}
          productId={product.id}
        />
      ))}
      
    </div>
  );
}
