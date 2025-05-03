'use client';

import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function HeroImage() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newScale = 1 + scrollPosition * 0.0002;
      setScale(Math.min(newScale, 1.2));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Image 
        src="/img/hero.png" 
        alt="Hero background" 
        fill 
        priority 
        className="object-cover w-full h-full transition-transform duration-300 ease-out" 
        style={{ transform: `scale(${scale})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#7D1C21] via-[#7d1c21b2] to-transparent" />
    </div>
  );
} 