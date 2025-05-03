"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function CarouselComponent() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="container px-4 md:px-0">
      <Carousel items={cards} />
    </div>
  );
}

const data = [
  {
    category: "Pekarstvo",
    title: "Premium sastojci za vrhunsko pekarstvo",
    src: "/img/pekarstvo.png",
    description: "Otkrijte našu široku ponudu visokokvalitetnih sastojaka za pekarsku industriju, od brašna do aditiva.",
    link: "/",
  },
  {
    category: "Slasticarstvo",
    title: "Kreativna rješenja za slastičarstvo",
    src: "/img/poslasticarstvo.png",
    description: "Inspirativni sastojci za moderne slastice i tradicionalne poslastice.",
    link: "/",
  },
  {
    category: "Brasno",
    title: "Vrhunska brašna za sve namjene",
    src: "/img/brasno.png",
    description: "Širok izbor visokokvalitetnih brašna za sve vrste pekarskih i slastičarskih proizvoda.",
    link: "/",
  },
  {
    category: "Sirevi",
    title: "Ekskluzivni sirevi svjetskog kvaliteta",
    src: "/img/sir.png",
    description: "Bogata selekcija premium sireva za profesionalnu upotrebu.",
    link: "/",
  },
  {
    category: "Pizza sos",
    title: "Autentični italijanski pizza sosevi",
    src: "/img/pica-sos.png",
    description: "Tradicionalni recepti za savršenu pizzu svakog puta.",
    link: "/",
  },
  {
    category: "Meso",
    title: "Selekcija vrhunskog mesa",
    src: "/img/meso.png",
    description: "Pažljivo odabrano i pripremljeno meso najvišeg kvaliteta.",
    link: "/",
  },
  {
    category: "Pivarstvo",
    title: "Sastojci za craft pivarstvo",
    src: "/img/pivo.png",
    description: "Sve što je potrebno za proizvodnju zanatskog piva.",
    link: "/",
  },
  {
    category: "Arome",
    title: "Prirodne i vještačke arome",
    src: "/img/arome.png",
    description: "Bogat izbor aroma za sve vrste prehrambenih proizvoda.",
    link: "/",
  },
  {
    category: "Etericna ulja i ekstrati",
    title: "Premium eterična ulja i ekstrakti",
    src: "/img/etericna-ulja.png",
    description: "Visokokvalitetna eterična ulja i ekstrakti za prehrambenu industriju.",
    link: "/",
  },
  {
    category: "Vina",
    title: "Ekskluzivna selekcija vina",
    src: "/img/vino.png",
    description: "Pažljivo odabrana kolekcija premium vina iz cijelog svijeta.",
    link: "/",
  },
];
