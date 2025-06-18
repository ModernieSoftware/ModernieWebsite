"use client";
import React from "react";
import Image from "next/image";
import { ContainerScroll } from "../acernityui/container-scroll-animation";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export function HeroScrollDemo() {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  
    useEffect(() => {
      if (inView) {
        controls.start({ opacity: 1, scale: 1, y: 0 });
      }
    }, [inView, controls]);
  
  return (
    <div className="flex flex-col -mt-28 overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
             <h1 className="text-4xl font-semibold text-blue-300">
            AT MODERNIE
            </h1>
            <h1 className="text-4xl font-semibold text-white">
          we don’t just follow trends  <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
              We Shape the Future.
              </span>
            </h1>
          </>
        }
      >
          <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.9, y: 80 }}
        animate={controls}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="max-w-7xl mx-auto  rounded-3xl overflow-hidden shadow-lg"
      >
        <div className="flex flex-col md:flex-row items-center">
          {/* Background Image */}
          <div className="relative w-full md:w-1/2 h-[300px] md:h-[500px]">
            <Image 
              src="/img/abouthero.png" 
              alt="Astronaut working"
              fill
              className="object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="p-6 sm:p-8 md:p-10 w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
              GIVE LIFE TO <br /> <span className="text-blue-500">YOUR IDEA</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mb-6">
              We transform visionary ideas into reality using cutting-edge technology and expert guidance. 
              Our mission is to empower businesses by delivering future-driven solutions in AI, SaaS, and digital innovation.
            </p>
            <p className="text-gray-600 text-base sm:text-lg mb-6">
              Together, let&apos;s build a smarter future powered by intelligent systems and creative technology.
            </p>

            {/* Gradient Button */}
            <button className="p-[3px] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg" />
              <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-300 text-white hover:bg-transparent">
                Get In Touch
              </div>
            </button>
          </div>
        </div>
      </motion.div>
      </ContainerScroll>
    </div>
  );
}
