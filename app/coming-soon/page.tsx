'use client';

export default function ComingSoonPage() {
  return (
    <div className="z-50 relative w-full h-screen overflow-hidden bg-black flex items-center justify-center text-white">
      {/* ✅ Animated Blackhole Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-b from-purple-900 via-black to-black opacity-80 blur-3xl animate-pulse-slow" />

      {/* ✅ Inner Circle (Shadow Edge of Blackhole) */}
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[150px] -translate-x-1/2 -translate-y-1/2 rounded-b-full bg-black z-10 shadow-inner shadow-purple-900" />

      {/* ✅ Text Content */}
      <div className="z-20 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-[0.5em] mb-4 text-white drop-shadow-lg">
          COMING SOON
        </h1>
      
      </div>
    </div>
  );
}
