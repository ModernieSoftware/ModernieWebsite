'use client';

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingImages = ({
  images,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  images: string[]; // Array of image URLs
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      setDirection();
      setSpeed();
      setStart(true);
    }
  }

  const setDirection = () => {
    containerRef.current?.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
  };

  const setSpeed = () => {
    const duration =
      speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
    containerRef.current?.style.setProperty("--animation-duration", duration);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 mt-8 overflow-hidden text-center [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-12 py-6 justify-center",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
    {images.slice(0, 5).map((img, idx) => (
  <li
    key={idx}
    className="relative h-14  flex items-center justify-center rounded-xl overflow-hidden shadow-lg"
  >
    <img
      src={img}
      alt={`Image ${idx}`}
      className="h-full  object-contain"
    />
  </li>
))}


      </ul>
    </div>
  );
};
