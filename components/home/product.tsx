"use client";

import React from "react";
import { Card, Carousel } from "../acernityui/apple-cards-carousel";
import AccordionContent from "./product/AccordionContent";
import DemoContent from "./product/DemoContent";


export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full  h-full ">
    
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <img
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="400"
              width="400"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
{
    category: "AI-Powered",
    title: "Credit Risk Management Solutions.",
    src: "./img/industry/fintech-applications.jpg",
    content:<DemoContent />,
  },
  {
    category: "Productivity",
    title: "Enhance your productivity.",
    src: "./img/industry/productivity.webp",
    content: <DemoContent />,
  },
  {
    category: "AI-Powered",
    title: "Vehicle Price \n Prediction",
    src: "./img/industry/car.webp",
    content:  <AccordionContent />,
  }
];
