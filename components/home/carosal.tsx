import { Carousel } from "../acernityui/carousel";


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
      {/* Carousel is now directly available */}
      <Carousel slides={slideData} />
    </div>
  );
}
