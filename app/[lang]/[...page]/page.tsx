import SingleBlogRender from "@/components/functional/single-blog-render";
import SinglePartner from "@/components/functional/single-partner";
import AboutUs from "@/multi-lang-pages/en/about-us";
import BlogPage from "@/multi-lang-pages/en/blog";
import Contacts from "@/multi-lang-pages/en/contacts";
import Partners from "@/multi-lang-pages/en/partners";
import Products from "@/multi-lang-pages/en/products";

import { Locale } from "@/types";
import { notFound } from "next/navigation";
import React from "react";

export default async function page({ params }: { params: Promise<{ lang: string; page: string[] }> }) {
  const { lang, page } = await params;
  const pagePath = page[0]; // Get first segment of page path array

  //Languages available: en (English), ru (Russian), me (Montenegrin), sq (Albanian)
  if (
    pagePath === "about-us" || // English
    pagePath === "o-nas" || // Russian
    pagePath === "o-nama" || // Montenegrin
    pagePath === "rreth-nesh" // Albanian
  ) {
    return (
      <div className="container mx-auto">
        <AboutUs locale={lang as Locale} />
      </div>
    );
  }

  if (
    pagePath === "products" || // English
    pagePath === "produkty" || // Russian
    pagePath === "proizvodi" || // Montenegrin
    pagePath === "produktet" // Albanian
  ) {
    const productId = page[1]; // Get second segment of page path array
    if (productId) {
      return (
        <div className="container mx-auto">
         <SingleBlogRender slug={productId} locale={lang as Locale} />
        </div>
      );
    }
    return (
      <div className="container mx-auto">
        <Products locale={lang as Locale} />
      </div>
    );
  }

  if (
    pagePath === "partners" || // English
    pagePath === "partnery" || // Russian
    pagePath === "partneri" || // Montenegrin
    pagePath === "partneret" // Albanian
  ) {
    if(page[1]) {
      return (
        <div className="container mx-auto">
          <SinglePartner partner={page[1] as "ireks" | "BMM" | "karntner"} locale={lang as Locale} />
        </div>
      );
    }
    return (
      <div className="container mx-auto">
        <Partners locale={lang as Locale} />
      </div>
    );
  }

  if (
    pagePath === "contacts" || // English
    pagePath === "kontakty" || // Russian
    pagePath === "kontakti" || // Montenegrin
    pagePath === "kontaktet" // Albanian
  ) {
    return (
      <div className="container mx-auto">
        <Contacts locale={lang as Locale} />
      </div>
    );
  }

  if (pagePath === "blog") {
    return (
      <div className="container mx-auto">
        <BlogPage slug={page[1]} locale={lang as Locale} />
      </div>
    );
  }

  return notFound();
}
