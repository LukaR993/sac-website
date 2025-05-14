"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/types";
import { GlobeIcon, Menu } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Image from "next/image";

const localeNames = {
  en: "English",
  me: "Crnogorski", 
  sq: "Shqip",
  ru: "Русский",
};
const navItems  = {
    en:[
        { name: "About us", href: "/about-us" },
        { name: "Products", href: "/products" },
        { name: "Partners", href: "/partners" },
        { name: "Contact", href: "/contacts" },
    ],
    me:[
        { name: "O nama", href: "/o-nama" },
        { name: "Proizvodi", href: "/proizvodi" },
        { name: "Partneri", href: "/partneri" },
        { name: "Kontakt", href: "/kontakti" },
    ],
    sq:[    
        { name: "Rreth nesh", href: "/rreth-nesh" },
        { name: "Produktet", href: "/produktet" },
        { name: "Partnerët", href: "/partneret" },
        { name: "Kontakt", href: "/kontakt" },
    ],
    ru:[
        { name: "О нас", href: "/o-nas" },
        { name: "Продукты", href: "/produkty" },
        { name: "Партнеры", href: "/partnery" },
        { name: "Контакты", href: "/kontakty" },
    ]
}

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b  w-full md:shadow-sm bg-background">
      <div className="container px-4 md:px-0 flex h-fit py-2 items-center justify-center mx-auto">
        <div className="flex w-full justify-between items-center gap-6">
          <Link href={`/${locale}`} className="font-bold text-xl">
            <Image src="/img/logo.svg" alt="logo" width={36} height={36} />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navItems[locale].map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link href={`/${locale}${item.href}`} passHref>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname === `/${locale}${item.href}` && "font-medium bg-accent text-accent-foreground"
                      )}
                    >
                      <span className="text-lg font-medium transition-colors hover:text-primary">
                        {item.name}
                      </span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Language Switcher and Mobile Menu */}
        <div className="flex items-center gap-4 ml-1">
          <DropdownMenu >
            <DropdownMenuTrigger className="cursor-pointer  gap-2 flex-row text-xs p-2 rounded-md hidden md:flex hover:bg-accent">
              <GlobeIcon className="h-4 w-4" /> 
              <span className="text-xs">
                {localeNames[locale]}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {Object.entries(localeNames).map(([code, name]) => (
                <DropdownMenuItem key={code} asChild>
                  <Link
                    href={`/${code}${pathname.replace(`/${locale}`, "")}`}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-sm",
                      code === locale && "font-medium bg-accent text-accent-foreground"
                    )}
                  >
                    {name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-md hover:bg-accent"
              >
                <Menu className="h-8 w-8" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[300px] sm:w-[400px] bg-background"
            >
             <SheetTitle className="sr-only">
                Menu
             </SheetTitle>
              <div className="flex flex-col h-full">
                <div className="flex items-center p-4 justify-between mb-8">
                  <Link href={`/${locale}`} className="font-bold text-xl">
                    <Image src="/img/logo.svg" alt="logo" width={36} height={36} />
                  </Link>
                 
                </div>
                <nav className="flex flex-col p-4 gap-6">
                  {navItems[locale].map((item) => (
                    <Link
                      key={item.href}
                      href={`/${locale}${item.href}`}
                      className={cn(
                        "text-lg font-medium transition-colors duration-200",
                        pathname === `/${locale}${item.href}` 
                          ? "text-primary" 
                          : "text-muted-foreground hover:text-primary"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto pt-0 border-t">
                  <div className="flex flex-col gap-0">
                    {Object.entries(localeNames).map(([code, name]) => (
                      <Link
                        key={code}
                        href={`/${code}${pathname.replace(`/${locale}`, "")}`}
                        className={cn(
                          "text-sm px-4 py-2 rounded-none transition-colors duration-200",
                          code === locale 
                            ? "bg-accent text-accent-foreground" 
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        {name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
