'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Linkedin, Facebook, Twitter } from "lucide-react";
import DecryptedText from "../acernityui/decryptedText";
import SplitText from "../acernityui/splitText";
import { motion } from "framer-motion";
import GlitterCard from "../card/GlitterCard";
import WobbleCard from "../card/WobbleCard";
export default function HeroAnimatedLetter() {
  const greenLetterRef = useRef<HTMLSpanElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);



  return (
    <section className="relative min-h-screen bg-[#000000] flex flex-col items-center justify-center text-white text-center overflow-hidden">
 
      {/* Background Glows */}
    {/* Floating Feature Cards */}
{/* <WobbleCard/> */}


      <div className="relative z-10 w-full px-4 max-w-6xl mx-auto">
        {/* Heading */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-center">
          <h1 className="text-white font-passion font-bold text-4xl sm:text-5xl md:text-8xl whitespace-nowrap">
            Building the Future
          </h1>
          <SplitText
            text="Finance"
            className="text-blue-500 italic font-passion font-bold text-4xl sm:text-5xl md:text-8xl whitespace-nowrap"
            delay={150}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            threshold={0.2}
            rootMargin="-50px"
          />
        </div>

        <div className="font-bold font-passion leading-tight tracking-tight mt-2 text-center text-4xl sm:text-5xl md:text-6xl">
          with <span ref={greenLetterRef} className="text-green-400 inline-block">Software </span> Excellence
        </div>

        {/* Subtext */}
        <p ref={paraRef} className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
         We are a FinTech-specialized software company delivering secure, scalable, and AI-powered SaaS platforms for banking, payments, wealth management, and digital finance innovation.
       </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition">
          Explore Our Solutions
          </button>
          <button className="border border-white hover:border-blue-400 hover:text-blue-400 text-white px-6 py-3 rounded-full font-semibold transition">
            Book a 15-min intro call
          </button>
        </div>

        {/* Social Media */}
        <div className="mt-10 flex justify-center gap-6 text-gray-400 text-xl">
          <a href="#" className="hover:text-blue-400"><Facebook /></a>
          <a href="#" className="hover:text-blue-500"><Linkedin /></a>
          <a href="#" className="hover:text-sky-400"><Twitter /></a>
        </div>
      </div>
          
    </section>
  );
}
