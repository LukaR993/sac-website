import { Locale } from "@/types";
import { getDictionary } from "@/utils/dictionaries";
import React from "react";
import Image from "next/image";
import { ArrowRightIcon, Infinity, Award, Users, Leaf } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TrustedBy from "@/components/functional/trusted-by";
import FounderWords from "@/components/functional/founder-words";

export default async function AboutUs({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);

  return (
    <main className="min-h-screen">

      

      {/* Mission Section */}
      <section className=" py-8 md:py-16 bg-gradient-to-b from-white ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center animate-fade-in">
            <div className="relative aspect-[4/3] group">
              <Image
                src="/img/about-hero.jpg"
                alt="Our Mission"
                fill
                className="object-cover  shadow-2xl transition-transform duration-500 group-"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent " />
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-[#7D1C21] leading-tight">{dict.about.mission.title}</h2>
                <p className="text-xl text-gray-700 leading-relaxed">{dict.about.mission.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3 p-4 bg-[#7d1c21]  border  transition-all ">
                  <Award className="w-8 h-8 text-white" />
                  <h3 className="text-xl font-semibold text-white">{dict.about.mission.quality.title}</h3>
                  <p className="text-white/90">{dict.about.mission.quality.description}</p>
                </div>
                <div className="space-y-3 p-4 bg-[#7d1c21]  border  transition-all ">
                  <Leaf className="w-8 h-8 text-white" />
                  <h3 className="text-xl font-semibold text-white">{dict.about.mission.sustainability.title}</h3>
                  <p className="text-white/90">{dict.about.mission.sustainability.description}</p>
                </div>
                <div className="space-y-3 p-4 bg-[#7d1c21]  border  transition-all ">
                  <Infinity className="w-8 h-8 text-white" />
                  <h3 className="text-xl font-semibold text-white">{dict.about.mission.innovation.title}</h3>
                  <p className="text-white/90">{dict.about.mission.innovation.description}</p>
                </div>
                <div className="space-y-3 p-4 bg-[#7d1c21]  border  transition-all ">
                  <Users className="w-8 h-8 text-white" />
                  <h3 className="text-xl font-semibold text-white">{dict.about.mission.trust.title}</h3>
                  <p className="text-white/90">{dict.about.mission.trust.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TrustedBy />
      {/* Values Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
            <div className="bg-gradient-to-br from-white  p-8  border  transition-all ">
              <div className="w-16 h-16 bg-[#7D1C21]  flex items-center justify-center mb-6 transform  transition-transform">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#7D1C21]">{dict.about.values.excellence.title}</h3>
              <p className="t leading-relaxed">{dict.about.values.excellence.description}</p>
            </div>
            <div className="bg-gradient-to-br from-white  p-8  border  transition-all ">
              <div className="w-16 h-16 bg-[#7D1C21]  flex items-center justify-center mb-6 transform   transition-transform">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#7D1C21]">{dict.about.values.sustainability.title}</h3>
              <p className="t leading-relaxed">{dict.about.values.sustainability.description}</p>
            </div>
            <div className="bg-gradient-to-br from-white  p-8  border  transition-all ">
              <div className="w-16 h-16 bg-[#7D1C21]  flex items-center justify-center mb-6 transform  transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#7D1C21]">{dict.about.values.partnership.title}</h3>
              <p className="t leading-relaxed">{dict.about.values.partnership.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#7D1C21] to-[#9B2C32] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">{dict.about.cta.title}</h2>
            <p className="text-base mb-12 max-w-2xl mx-auto leading-relaxed">{dict.about.cta.description}</p>
            <Link
              href={`/${locale}/contact`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-white text-[#7D1C21] hover:bg-gray-100 text-base     "
              )}
            >
              {dict.about.cta.button} <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <FounderWords locale={locale} />
    </main>
  );
}
