'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Vortex } from '../acernityui/vortex';


export default function ComingSoonOverlay() {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-[98%] flex flex-col items-center justify-center px-4 sm:px-6 text-center space-y-10">
      {/* Cursor Effect */}
      {/* <SplashCursor /> */}
      <Vortex
        backgroundColor="transparent"
        className="flex items-center  flex-col justify-center px-2 md:px-10 w-full h-full"
      >
      {/* Logo */}
      <div className="w-full flex justify-center items-center mt-4 md:mt-4">
        <Image
          src="/img/About Us (6).png"
          alt="Modernie Logo"
          width={190}
          height={80}
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="text-white max-w-2xl px-2 -mt-4 sm:px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4  leading-tight tracking-tight">
           Something Brilliant is Brewing at <span className="text-blue-500">Modernie</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 leading-relaxed">
          We’re building a bold new experience that blends creativity, intelligence,
          and innovation. <br className="hidden md:block" />
          Buckle up your next favorite digital solution is on its way.
        </p>

        <p className="text-xs sm:text-sm md:text-base text-gray-500 italic">
          Modern. Smart. Ready for tomorrow.
        </p>
      </div>
      </Vortex>
    </div>
  );
}
