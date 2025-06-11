import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/functional/header";
import { Locale } from "@/types";
import Footer from "@/components/functional/footer";
import Providers from "@/utils/providers";
import AutoScrollToTop from "@/components/functional/auto-scroll-fix";
import { getDictionary } from "@/utils/dictionaries";
import Widget from "@/components/functional/widget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return {
    title: {
      default: "Sač",
      template: "%s | Sač",
    },
  
    description: dict.hero.subtitle,
    authors: [{ name: "Sač" }],
    openGraph: {
      title: "Sač",
      description: dict.hero.subtitle,
      type: "website",
      locale: lang,
      images: "/img/cover3.png",
    },
    twitter: {
      card: "summary_large_image",
      images: "/img/cover3.png",
      title: "Sač",
      description: dict.hero.subtitle,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-white antialiased `}>
        <Providers>
          <>
            <AutoScrollToTop />
            <Header locale={lang as Locale} />
            {children}
            <Footer locale={lang as Locale} />
            <Widget locale={lang as Locale} />
          </>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
