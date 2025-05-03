import { Locale } from "@/types";
import { getDictionary } from "@/utils/dictionaries";
import Link from "next/link";

export default async function Footer({ locale }: { locale: Locale }) {
  const dictionary = await getDictionary(locale);

  return (
    <footer className="bg-[#7D1C21] mt-12 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Address */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-4">{dictionary.footer?.addressTitle || "Address"}</h3>
            <p className="text-white/90 text-sm">4 Jul 62</p>
            <p className="text-white/90 text-sm">81000 Podgorica</p>
            <p className="text-white/90 text-sm">Crna Gora</p>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-4">{dictionary.footer?.contactTitle || "Contact"}</h3>
            <p className="text-white/90 text-sm">Tel/Fax: +382 20 223 693</p>
            <p className="text-white/90 text-sm">Mob: +382 69 010 766</p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-4">{dictionary.footer?.emailTitle || "Email"}</h3>
            <Link href="mailto:sacpg@t-com.me" className="text-white/90 text-sm hover:text-white block">sacpg@t-com.me</Link>
            <Link href="mailto:sach-ireks@t-com.me" className="text-white/90 text-sm hover:text-white block">sach-ireks@t-com.me</Link>
          </div>

          {/* Website */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-4">{dictionary.footer?.websiteTitle || "Website"}</h3>
            <Link 
              href="http://www.sac-cg.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/90 text-sm hover:text-white block"
            >
              www.sac-cg.com
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/70">
          <p className="text-xs">&copy; {new Date().getFullYear()} SAC. {dictionary.footer?.copyright || "All rights reserved."}</p>
        </div>
      </div>
    </footer>
  );
} 