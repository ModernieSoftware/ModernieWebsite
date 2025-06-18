'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Vortex } from "../acernityui/vortex";
import DecryptedText from "../acernityui/decryptedText";
import { Linkedin, Facebook, Twitter } from "lucide-react";
import SplitText from "../acernityui/splitText";

export default function HeroAnimatedLetter() {
  const greenLetterRef = useRef<HTMLSpanElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate the green "T" letter with a smooth bounce/scale
    tl.fromTo(
      greenLetterRef.current,
      { y: -100, opacity: 0, scale: 0.5, rotation: -180 },
      { y: 0, opacity: 1, scale: 1, rotation: 0, duration: 1.5, ease: "power4.out" }
    );

    // Animate paragraph after the letter
    tl.from(paraRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  return (
    <section className="min-h-screen bg-black flex flex-col items-center justify-center text-white text-center">
      <div className="w-[calc(100%)] mx-auto rounded-md h-screen overflow-hidden">
        {/* <Vortex
          backgroundColor="black"
          rangeY={900}
          particleCount={100}
          baseHue={120}
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
        > */}
          {/* Main Heading */}
{/* Main Heading */}
<div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-center">
  <h1 className="text-white font-passion font-bold text-4xl sm:text-5xl md:text-8xl whitespace-nowrap">
    Shaping
  </h1>
  <SplitText
    text="Tomorrows"
    className="text-blue-700 font-passion font-bold text-4xl sm:text-5xl md:text-8xl whitespace-nowrap"
    delay={150}
    animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
    animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
    threshold={0.2}
    rootMargin="-50px"
  />
</div>

{/* Sub Heading */}
<div className="font-bold font-passion leading-tight tracking-tight mt-4 text-center">
  <DecryptedText
    text="Technology"
    className="text-white font-passion font-bold text-3xl sm:text-5xl md:text-8xl"
    encryptedClassName="text-green-400"
    parentClassName="text-4xl  md:text-8xl"
    animateOn="view"
    sequential
  />
</div>

  {/* <TrueFocus
        sentence="Shaping Tomorrows"
        blurAmount={6}
        borderColor="#0ea5e9"  // sky-500
        glowColor="rgba(14,165,233,0.6)"
        animationDuration={0.8}
        pauseBetweenAnimations={1}
      /> */}
          {/* Tech heading with the animated green "T"
          <h1 className="hero-title text-[6rem] md:text-[7rem] font-extrabold leading-tight tracking-tight text-yellow-50">
            Te<span
              ref={paraRef}
              className="text-green-400 inline-block"
            >c
            </span>hno
            <span
              ref={greenLetterRef}
              className="text-green-400 inline-block"
            >
              l
            </span>
            ogy
          </h1>
        */}
          {/* Description */}
          <p  className="mt-6 text-xl text-gray-400 max-w-2xl">
            Harness the power of AI and cloud computing to transform your business with our enterprise-grade SaaS platform.
          </p>
          
        
        
        <button className="p-[3px] mt-4 relative">
  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg" />
  <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
    Get In Touch
  </div>
</button>
        {/* Social Media Section */}
        <div className="mt-10 flex items-center gap-6 text-white text-lg">
            <span className="text-gray-400">Follow us:</span>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <Facebook size={28} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <Linkedin size={28} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">
              <Twitter size={28} />
            </a>
          </div>
      
        {/* </Vortex> */}
      </div>
    </section>
  );
}
