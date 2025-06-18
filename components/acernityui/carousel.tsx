// Assuming this is a single file, e.g., CarouselDemo.tsx or a module that exports both.

'use client'; // This directive is important for Next.js client components

import { IconArrowNarrowRight} from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";

// --- Type Definitions ---
interface SlideData {
  title: string;
  button: string;
  src: string;
  description: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
  handleExploreClick: (description: string) => void;
}

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

interface CarouselProps {
  slides: SlideData[];
}

// --- Slide Component ---
const Slide = ({
  slide,
  index,
  current,
  handleSlideClick,
  handleExploreClick,
}: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      const x = xRef.current;
      const y = yRef.current;
      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, button, title, description } = slide;

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] mx-[4vmin] z-10"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index ? "scale(0.98) rotateX(8deg)" : "scale(1) rotateX(0deg)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <img
            className="absolute inset-0 w-[120%] h-[120%] object-cover transition-opacity duration-600 ease-in-out"
            style={{
              opacity: current === index ? 1 : 0.5,
            }}
            alt={title}
            src={src}
            onLoad={imageLoaded}
            loading="eager"
            decoding="sync"
          />
          {current === index && (
            <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
          )}
        </div>

        <article
          className={`relative p-[4vmin] transition-opacity duration-1000 ease-in-out ${
            current === index ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <h2 className="text-lg md:text-2xl lg:text-4xl font-semibold relative">
            {title}
          </h2>
          <div className="flex justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleExploreClick(description); // trigger popup with content
              }}
              className="mt-6 px-4 py-2 w-fit mx-auto sm:text-sm text-black bg-white h-12 border border-transparent text-xs flex justify-center items-center rounded-2xl hover:shadow-lg transition duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
            >
              {button}
            </button>
          </div>
        </article>
      </li>
    </div>
  );
};

// --- CarouselControl Component ---
const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => (
  <button
    className={`w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
      type === "previous" ? "rotate-180" : ""
    }`}
    title={title}
    onClick={handleClick}
  >
    <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
  </button>
);

// --- Carousel Component ---
export function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupDescription, setPopupDescription] = useState("");

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const handleExploreClick = (description: string) => {
    setPopupDescription(description);
    setIsPopupOpen(true);
  };

  const id = useId();

  return (
    <div
      className="relative w-[70vmin] h-[70vmin] mx-auto"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
            handleExploreClick={handleExploreClick}
          />
        ))}
      </ul>

      <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />
        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative bg-white max-w-xl w-full p-6 rounded shadow-xl">
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-3 right-3 text-gray-700 hover:text-red-600"
            >
              
            </button>
            <div className="text-sm text-gray-800 whitespace-pre-line">
              {popupDescription}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- CarouselDemo (Entry point, if this is a main component file) ---
export function CarouselDemo() {
  const slideData = [
    {
      title: "Mystic Mountains",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: `🔹 AI-Powered Automated Credit Decision Making...
🔹 CRIB Agent Service...
🔹 AI-Powered Collections Strategy Engine...
🔹 Early Warning System for Delinquencies...
🔹 Automated Annual Credit Review...
🔹 Strategic AI Advisory...`,
    },
    {
      title: "Urban Dreams",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Urban Dreams - AI solutions for smarter cities and urban financial ecosystems.",
    },
    // ... other slides
  ];

  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} /> {/* Carousel is accessible here */}
    </div>
  );
}