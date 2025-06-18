'use client';

import React from "react";
import { InfiniteMovingCards } from "../acernityui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
   
   <div className="h-[30rem] rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden">
    <h1 className="text-7xl text-white font-passion font-bold  text-center">Client Stories</h1>
        <p className="text-gray-500 text-lg mb-5">
      Together, lets build a smarter future powered by intelligent systems and creative technology.
    </p>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"  // Change to "left" if you want left scroll
        speed="normal"     // Options: "fast", "normal", "slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, an era of wisdom and foolishness alike.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question. Whether 'tis nobler in the mind to suffer or to fight against troubles.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a wealthy man must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Whenever life gets dull, I sail about to see the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
