'use client';

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"


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
        src="/img/slide3.png" 
        alt="" 
        fill 
        priority 
        className="object-cover" 
       
      />
      {/* <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
          })
        ]}
        className="w-full h-full"
        opts={{
          loop: true,
          align: "start"
        }}
      >
        <CarouselContent>
          <CarouselItem>
            <Image src="/img/slide1.jpg" alt="Slide 1" fill priority className="object-cover" />
          </CarouselItem>
          <CarouselItem>
            <Image src="/img/slide2.jpg" alt="Slide 2" fill priority className="object-cover" />
          </CarouselItem>
          <CarouselItem>
            <Image src="/img/slide3.png" alt="Slide 3" fill priority className="object-cover" />
          </CarouselItem>
          <CarouselItem>
            <Image src="/img/slide4.png" alt="Slide 4" fill priority className="object-cover" />
          </CarouselItem>
          <CarouselItem>
            <Image src="/img/slide5.png" alt="Slide 5" fill priority className="object-cover" />
          </CarouselItem>
          <CarouselItem>
            <Image src="/img/slide6.png" alt="Slide 6" fill priority className="object-cover" />
          </CarouselItem>
          <CarouselItem>
            <Image src="/img/slide7.png" alt="Slide 7" fill priority className="object-cover" />
          </CarouselItem>
          <CarouselItem>
            <Image src="/img/slide8.png" alt="Slide 8" fill priority className="object-cover" />
          </CarouselItem>
        </CarouselContent>
      </Carousel> */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#7D1C21] via-[#7d1c21b2] to-transparent" />
    </div>
  );
} 