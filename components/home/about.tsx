'use client';

import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export default function AboutSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, scale: 1, y: 0 });
    }
  }, [inView, controls]);

  return (
    <section className="bg-black py-16 px-4">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.9, y: 80 }}
        animate={controls}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="max-w-7xl mx-auto  rounded-3xl  overflow-hidden shadow-lg"
      >
        <div className="flex flex-col md:flex-row items-center -top-24">
          {/* Background Image */}
          <div className="relative w-full md:w-1/2 h-[500px] md:h-[800px]">
            <Image 
              src="/img/test.png" 
              alt="Astronaut working"
              fill
              className="object-cover "
            />
          </div>

         {/* Text Content */}
<div className="p-6 sm:p-8 md:p-12 w-full md:w-1/2 text-center md:text-left">
  <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight text-gray-200 mb-6">
    GIVE LIFE TO <br /> <span className="text-blue-700">YOUR IDEA</span>
  </h2>
  <p className="text-gray-300 text-base sm:text-2xl mb-6">
    We turn bold ideas into reality through cutting-edge technology, creative thinking, and expert execution.
    From AI-powered systems to scalable SaaS platforms, we build what tomorrow demands today.
  </p>
  <p className="text-gray-300 text-base sm:text-2xl mb-6">
    Let’s shape the future together with intelligent solutions, digital innovation, and purposeful design.
  </p>



            {/* Gradient Button */}
            {/* <button className="p-[3px] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg" />
              <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-300 text-white hover:bg-transparent">
                Get In Touch
              </div>
            </button> */}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
