import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/types";

const logos = [
  {
    name: "Logo 1",
    svg: (
      <Image src="/logos/ireks.png" alt="Logo 1" width={100} height={31} />
    ),
    url: "/partners/ireks",
  },
  {
    name: "Logo 2",
    svg: (
      <Image src="/logos/logo2.png" alt="Logo 2" width={190} height={72} />
    ),
    url: "/partners/dreidoppel",
  },
  {
    name: "Logo 3",
    svg: (
      <Image src="/logos/logo3.png" alt="Pobeda" width={190} height={72} />
    ),
    url: "/partners/pobeda",
  },
  {
    name: "Logo 4",
    svg: (
      <Image src="/logos/logo3.svg" alt="Logo 3" width={200} height={64} />
    ),
    url: "/partners/karntner",
  },
  {
    name: "Logo 5",
    svg: (
      <Image src="/logos/logo5.png" alt="Logo 5" width={190} height={72} />
    ),
    url: "/partners/glazir",
  },
  {
    name: "Logo 6",
    svg: (
      <Image src="/logos/logo6.png" alt="Logo 6" width={190} height={72} />
    ),
    url: "/partners/takasago",
  },
 
  

  {
    name: "Logo 4",
    svg: (
      <Image src="/logos/unigra.png" alt="Logo 4" width={200} height={31} />
    ),
    url: "/partners/unigra",
  },
  {
    name: "Logo 8",
    svg: (
        <Image src="/logos/logo2.svg" alt="Logo 2" width={100} height={25} />
    ),
    url: "/partners/BMM",
  },
];

const TrustedBy: React.FC<{ locale: Locale }> = ({ locale }) => {
  return (
    <section id="company" className="flex flex-col items-center justify-center gap-10  w-full relative px-4 md:px-0 py-8 md:py-16">
     <h2 className="text-2xl font-bold">{
      locale === "en" ? "Trusted by" : locale === 'me' ? "Vjeruju nam" : locale === 'ru' ? "Доверяют нам" : locale === 'sq' ? "Vlerësojmë" : "Trusted by"
      }</h2>
      <div className="grid w-full  grid-cols-2 md:grid-cols-4 overflow-hidden border border-border items-center justify-center z-20">
        {logos.map((logo, index) => (
          <Link
            key={index}
            className="group w-full h-28 flex items-center justify-center relative p-4 before:absolute before:-left-1 before:top-0 before:z-10 before:h-screen before:w-px before:bg-border before:content-[''] after:absolute after:-top-1 after:left-0 after:z-10 after:h-px after:w-screen after:bg-border after:content-['']"
            href={"/"+locale+"/"+logo.url}
          >
            <div className="transition-all grayscale duration-200 [cubic-bezier(0.165, 0.84, 0.44, 1)] translate-y-0 group-hover:scale-95 group-hover:blur-md duration-300 flex items-center justify-center w-full h-full">
              {logo.svg}
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-4 transition-all duration-300 ease-[cubic-bezier(0.165, 0.84, 0.44, 1)]">
              <span className="flex items-center gap-2 text-sm font-medium">
                Learn More <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TrustedBy;
