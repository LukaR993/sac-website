import { Locale } from "@/types";
import { getDictionary } from "@/utils/dictionaries";
import Image from "next/image";

export default async function FounderWords({ locale }: { locale: Locale }) {
  const dictionary = await getDictionary(locale);

  return (
    <section className=" py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-0">
        <div className=" mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2">
              <div className="relative aspect-square  overflow-hidden ">
                <Image
                  src="/img/luka.jpg"
                  alt={dictionary.founder?.name || "Luka Vukmanovic"}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:-ml-24 z-10 md:w-2/3 bg-[#7D1C21] text-white p-8 rounded-lg">
              <blockquote className="text-lg md:text-xl text-white italic mb-6">
                {dictionary.founder?.quote || "For over two decades, we've been committed to bringing the finest raw materials to our partners. Our success is built on three pillars: quality, sustainability, and trust. Every day, we strive to exceed expectations and maintain the highest standards in our industry."}
              </blockquote>
              <div className="flex flex-col">
                <span className="text-white font-semibold text-lg">
                  {dictionary.founder?.name || "Luka Vukmanovic"}
                </span>
                <span className="text-white">
                  {dictionary.founder?.position || "CEO & Founder"}
                </span>
                <div className="mt-4">
                  <Image
                    src="/img/signature.svg"
                    alt="Signature"
                    width={150}
                    height={50}
                    className="opacity-90"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 