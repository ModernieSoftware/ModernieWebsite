"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { NavbarDemo } from "@/components/navbar/Navbar";
import { CarouselDemo } from "@/components/home/carosal";
import { Industry } from "@/components/home/industry";
import { BackgroundBeams } from "@/components/acernityui/background-beams";

// ✅ Product Data
const productData = [
  {
    id: 1,
    title: "Noteworthy technology acquisitions 2021",
    category: "Technology",
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    imageUrl: "./img/industry/fintech-applications.jpg",
    imageCard: true,
  },
  {
    id: 2,
    title: "Standard Product",
    category: "AI",
    description: "This is a regular product card description.",
    imageCard: false,
  },
  {
    id: 3,
    title: "Cloud Optimizer",
    category: "Cloud",
    description: "AI-powered cloud cost and performance optimizer.",
    imageUrl: "./img/industry/fintech-applications.jpg",
    imageCard: true,
  },
];

const categories = ["All", "AI", "Security", "Cloud", "SaaS", "Technology"];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("All");

  // ✅ Filter only imageCard products
  const filteredProducts =
    activeCategory === "All"
      ? productData.filter((p) => p.imageCard)
      : productData.filter(
        (p) => p.imageCard && p.category === activeCategory
      );

  return (
    <div className="min-h-screen bg-background bg-black text-white">
      <NavbarDemo />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto relative py-12 mt-20 rounded-3xl overflow-hidden shadow-lg">
        <div>
          <BackgroundBeams />
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-7xl text-black font-bold">Products</h2>
            <p className="text-lg text-gray-700 mt-4">
              Be a part of our growing community and shape the future with us.
            </p>
          </motion.div>
        </div>
      </div>

      <Industry />
      <h1 className="text-3xl font-passion font-bold text-center mt-10">
        Our Products
      </h1>
      <p className="text-gray-400 text-center text-lg">
        Together, lets build a smarter future powered by intelligent systems and creative technology.
      </p>
      {/* <CarouselDemo /> */}

      {/* Product Cards Section */}
      <div className="max-w-7xl mx-auto mt-10 px-4 py-16">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-200 border ${activeCategory === cat
                  ? "bg-blue-600 text-white border-blue-600 shadow"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100 "
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="space-y-2 mt-2">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="cursor-pointer rounded-xl border-white/10 bg-black/50 backdrop-blur-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-black"
            >
              <a
                href="#"
                className="flex flex-col md:flex-row items-center rounded-lg overflow-hidden"
              >
                <img
                  className="object-cover w-full h-60 md:h-64 md:w-48"
                  src={product.imageUrl}
                  alt={product.title || "Product image"}
                />
                <div className="p-4 flex-1">
                  <h5 className="text-xl font-bold mb-2 text-white">
                    {product.title}
                  </h5>
                  <p className="text-gray-100 text-sm">{product.description}</p>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
