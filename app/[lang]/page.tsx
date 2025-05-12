import HeroSection from "@/components/functional/hero";
import { Locale } from "@/types";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import After20Years from "@/components/functional/after-20-years";
import { CarouselComponent } from "@/components/functional/carusel";
import SimpleAboutSection from "@/components/functional/simple-about-section";
import TrustedBy from "@/components/functional/trusted-by";
import BlogsSection from "@/components/functional/blogs-section";
import FounderWords from "@/components/functional/founder-words";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <main className="container flex flex-col gap-8 mx-auto ">
      <HeroSection locale={lang as Locale} />
      <After20Years locale={lang as Locale} />

      <CarouselComponent locale={lang as Locale} />

      <SimpleAboutSection />

      <TrustedBy locale={lang as Locale} />

     

      <BlogsSection locale={lang as Locale} />
      {/* <FounderWords locale={lang as Locale} /> */}
      
    </main>
  );
}
