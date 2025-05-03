import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";

export default function SimpleAboutSection() {
  return (
    <section className="w-full px-4 md:px-0 py-8 md:py-16 container mx-auto p-0">
      <div className="   flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-full  h-64 md:h-80  overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=800&auto=format&fit=crop"
              alt="Warehouse forklift"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        {/* Right: Text */}
        <div className="w-full  flex flex-col justify-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-[#18181b]">Mi nismo samo distributer.</h2>
          <div className="space-y-4 text-[#18181b] text-sm">
            <p>
              Sač je danas prepoznata kao jedan od vodećih distributera visokokvalitetnih sirovina i dodataka za pekarsku, poslastičarsku
            </p>
            <p>
              Sač je danas prepoznata kao jedan od vodećih distributera visokokvalitetnih sirovina i dodataka za pekarsku, poslastičarsku, mesno-prerađivačku industriju, ali i za proizvodnju piva, dodataka za vino i tržište stočne hrane. Naš slogan "Sve najbolje iz prirode" – nisu samo ispražene riječi, već princip kojim se vodimo u svakom segmentu
            </p>
            <p>
              Sač je danas prepoznata kao jedan od vodećih distributera visokokvalitetnih sirovina i dodataka za pekarsku, poslastičarsku, mesno-prerađivačku industriju, ali i za proizvodnju piva, dodataka za vino i tržište stočne hrane.
            </p>
          </div>
          <Link href={`/${''}/o-nama`} className={cn(buttonVariants({}),"bg-[#7D1C21] flex mt-8 w-full md:w-fit self-end items-center gap-2")}>
              O nama <ArrowRightIcon className="w-4 h-4" />
            </Link>
        </div>
      </div>
    </section>
  );
}
