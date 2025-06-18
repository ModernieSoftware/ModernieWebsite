"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/acernityui/apple-cards-carousel";

type SaaSContentProps = {
  title: string;
  description: string;
};

const SaaSContent = ({ title, description }: SaaSContentProps) => {
  return (
    <div className="bg-[#141414] p-8 md:p-14 rounded-3xl mb-4 overflow-x-hidden overflow-y-hidden">
      <p className="text-neutral-200 text-base md:text-2xl font-sans max-w-3xl mx-auto overflow-x-hidden ">
        <span className="font-bold text-neutral-100">{title}</span> {description}
      </p>
      <Image
        src="https://assets.aceternity.com/macbook.png"
        alt="SaaS Illustration"
        height={500}
        width={500}
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
      />
    </div>
  );
};

export function Industry() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  return (
    <div className="w-full py-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-start justify-between">
        {/* Left Column (Title) */}
        <div className="w-full lg:w-1/2 ml-8 mt-24">
          <h2 className="text-2xl mb-4 md:text-2xl font-bold text-neutral-200 font-sans">
            Industries We Specialize In
          </h2>
          <h2 className=" text-3xl md:text-6xl font-bold text-neutral-200 font-sans">
      What We Offer
          </h2>
        </div>

        {/* Right Column (Carousel) */}
        <div className="w-full lg:w-3/5">
          <Carousel items={cards} />
        </div>
      </div>
    </div>
  );
}

const data = [
{
  category: "Digital Banking",
  title: "Build Next-Gen Banking Platforms",
  src: "./img/industry/0x0.webp",
  content: (
    <SaaSContent
      title="Online & Mobile Banking Solutions"
      description="Develop digital banking platforms with features like KYC onboarding, transaction history, instant transfers, and account analytics."
    />
  ),
},
{
  category: "Payments",
  title: "Digital Wallets & Payment Systems",
  src: "./img/industry/eCommerce-TIZER.jpg",
  content: (
    <SaaSContent
      title="Wallet & Payment Gateways"
      description="Enable secure transactions with custom-built wallets, card processing, QR-based payments, and multi-currency support."
    />
  ),
}
,
  {
    category: "Productivity Tools",
    title: "Boost Productivity with SaaS",
    src: "./img/industry/0x0.webp",
    content: (
      <SaaSContent
        title="Productivity Solutions"
        description="Streamline operations, automate tasks, and empower teams with SaaS productivity tools designed for efficiency."
      />
    ),
  },
  {
  category: "RegTech",
  title: "Ensure Compliance & Security",
  src: "./img/industry/eCommerce-TIZER.jpg",
  content: (
    <SaaSContent
      title="Regulatory Tech & Security"
      description="Build FinTech apps with built-in KYC/AML processes, encryption protocols, audit trails, and GDPR-compliant data flows."
    />
  ),
}
,
  {
    category: "Banking & Fintech",
    title: "Next-Gen Banking SaaS",
    src: "./img/industry/fintech-applications.jpg",
    content: (
      <SaaSContent
        title="Fintech & Banking Solutions"
        description="Build secure, scalable banking and fintech SaaS apps for payments, lending, digital wallets, and real-time financial analytics."
      />
    ),
  },
  {
    category: "E-Commerce",
    title: "SaaS for E-Commerce Growth",
    src: "./img/industry/eCommerce-TIZER.jpg",
    content: (
      <SaaSContent
        title="E-Commerce SaaS Platforms"
        description="Create scalable e-commerce SaaS platforms with inventory management, sales automation, payment gateways, and data insights."
      />
    ),
  },
  {
    category: "Data Analytics",
    title: "Data-Driven SaaS Solutions",
    src: "./img/industry/0x0.webp",
    content: (
      <SaaSContent
        title="Analytics & Insights"
        description="Leverage real-time dashboards and analytics to gain insights, improve decision-making, and drive your SaaS growth."
      />
    ),
  }
];
