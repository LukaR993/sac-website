import { Locale } from "@/types";
import { getDictionary } from "@/utils/dictionaries";
import HeroImage from "./hero-image";

export default async function HeroSection({ locale }: { locale: Locale }) {
  const dictionary = await getDictionary(locale);

  return (
    <section className="relative w-full container mx-auto aspect-video h-[70vh] md:h-[80vh] flex items-center justify-start overflow-hidden">
      <HeroImage />
      {/* Content */}
      <div className="relative z-10 max-w-2xl px-4 md:px-8 text-balance md:py-12 text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight ">
          {dictionary.hero.title1}
          <br />
          {dictionary.hero.title2}
        </h1>
        <p className="text-base md:text-lg text-white/90 font-medium ">{dictionary.hero.subtitle}</p>
      </div>
      <div className="absolute bottom-0 items-center right-0 py-2 px-4 bg-white flex flex-row gap-8">
        <span className="text-base text-center md:text-left md:text-2xl text-[#7D1C21] font-medium">{dictionary.hero.products}</span>
        <div className="h-12 border-l border-[#7D1C21]" />
        <span className="text-base text-center md:text-left md:text-2xl text-[#7D1C21] font-medium">{dictionary.hero.partners}</span>
        <div className="h-12 border-l border-[#7D1C21]" />
        <span className="text-base text-center md:text-left md:text-2xl text-[#7D1C21] font-medium">{dictionary.hero.clients}</span>
      </div>
    </section>
  );
}
