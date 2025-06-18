

"use client";  


const circuitBackground = () => {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-radial from-[#0a0f20] to-black">
        <svg
          viewBox="0 0 100 100"
          className="w-[200%] h-[200%] opacity-20 animate-circuit-drift"
        >
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00faff" stopOpacity="1" />
              <stop offset="100%" stopColor="#001f3f" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g stroke="#00faff" strokeWidth="0.3">
            <path d="M10 10 H 90 V 90 H 10 Z" />
            <path d="M20 10 V 30 H 40 V 50 H 60 V 70 H 80" />
            <path d="M10 20 H 30 V 40 H 50 V 60 H 70" />
            <circle cx="20" cy="30" r="0.5" fill="url(#glow)">
              <animate attributeName="r" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="40" cy="50" r="0.5" fill="url(#glow)">
              <animate attributeName="r" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="60" cy="70" r="0.5" fill="url(#glow)">
              <animate attributeName="r" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      </div>
    );
  };
  
  export default circuitBackground;
  