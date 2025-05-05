import AboutUs from "@/multi-lang-pages/en/about-us";
import Contacts from "@/multi-lang-pages/en/contacts";
import Partners from "@/multi-lang-pages/en/partners";
import Products from "@/multi-lang-pages/en/products";

import { Locale } from "@/types";
import { notFound } from "next/navigation";
import React from "react";

export default async function page({ params }: { params: Promise<{ lang: string; page: string }> }) {
  const { lang, page } = await params;
  //Languages available: en (English), ru (Russian), me (Montenegrin), sq (Albanian)
  if (
    page === "about-us" || // English
    page === "o-nas" || // Russian
    page === "o-nama" || // Montenegrin
    page === "rreth-nesh" // Albanian
  ) {
    return (
      <div className="container mx-auto">
        <AboutUs locale={lang as Locale} />
      </div>
    );
  }

  if (
    page === "products" || // English
    page === "produkty" || // Russian
    page === "proizvodi" || // Montenegrin
    page === "produktet" // Albanian
  ) {
    return (
      <div className="container mx-auto">
        <Products locale={lang as Locale} />
      </div>
    );
  }

  if (
    page === "partners" || // English
    page === "partnery" || // Russian
    page === "partneri" || // Montenegrin
    page === "partneret" // Albanian
  ) {
    return (
      <div className="container mx-auto">
        <Partners locale={lang as Locale} />
      </div>
    );
  }

  if (
    page === "contacts" || // English
    page === "kontakty" || // Russian
    page === "kontakti" || // Montenegrin
    page === "kontaktet" // Albanian
  ) {
    return (
      <div className="container mx-auto">
        <Contacts locale={lang as Locale} />
      </div>
    );
  }

  return notFound();
}
