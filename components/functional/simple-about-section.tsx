import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { Locale } from "@/types";

const translations = {
  en: {
    title: "We are not just a distributor.",
    paragraph1: "Sač is today recognized as one of the leading distributors of high-quality raw materials and additives for bakery, confectionery, meat processing industry, as well as for beer production, wine additives and animal feed market.",
    paragraph2: "Our slogan 'All the best from nature' is not just empty words, but a principle we follow in every segment of our business.",
    buttonText: "About Us"
  },
  me: {
    title: "Mi nismo samo distributer.",
    paragraph1: "Sač je danas prepoznat kao jedan od vodećih distributera visokokvalitetnih sirovina i dodataka za pekarsku, poslastičarsku, mesno-prerađivačku industriju, ali i za proizvodnju piva, dodataka za vino i tržište stočne hrane.",
    paragraph2: "Naš slogan 'Sve najbolje iz prirode' – nisu samo isprazne riječi, već princip kojim se vodimo u svakom segmentu poslovanja.",
    buttonText: "O nama"
  },
  sq: {
    title: "Ne jemi thjesht një shpërndarës.",
    paragraph1: "Saç sot njihet si një nga shpërndarësit kryesorë të lëndëve të para dhe aditivëve me cilësi të lartë për furrën, ëmbëlsirën, industrinë e përpunimit të mishit, si dhe për prodhimin e birrës, aditivëve për verë dhe tregun e ushqimit për kafshë.",
    paragraph2: "Slogani ynë 'Gjithçka më e mira nga natyra' nuk janë thjesht fjalë bosh, por një parim që ndjekim në çdo segment të biznesit tonë.",
    buttonText: "Rreth nesh"
  },
  ru: {
    title: "Мы не просто дистрибьютор.",
    paragraph1: "Sač сегодня признан одним из ведущих дистрибьюторов высококачественного сырья и добавок для хлебопекарной, кондитерской, мясоперерабатывающей промышленности, а также для производства пива, добавок для вина и рынка кормов для животных.",
    paragraph2: "Наш слоган 'Всё лучшее от природы' - это не просто пустые слова, а принцип, которому мы следуем в каждом сегменте нашего бизнеса.",
    buttonText: "О нас"
  }
} as const;

export default function SimpleAboutSection({locale}: {locale: Locale}) {
  const t = translations[locale];

  return (
    <section className="w-full px-4 md:px-0 py-8 md:py-16 container mx-auto p-0">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-full h-64 md:h-80 overflow-hidden shadow-lg">
            <Image
              src="/img/cover3.png"
              alt="Warehouse forklift"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        {/* Right: Text */}
        <div className="w-full flex flex-col justify-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-[#18181b]">{t.title}</h2>
          <div className="space-y-4 text-[#18181b] text-sm">
            <p>{t.paragraph1}</p>
            <p>{t.paragraph2}</p>
          </div>
          <Link href={`/${locale}/o-nama`} className={cn(buttonVariants({}),"bg-[#7D1C21] flex mt-8 w-full md:w-fit self-end items-center gap-2")}>
            {t.buttonText} <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
