'use client';

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type Description = {
  id: string;
  title: string;
  content: string;
  image: string;
};

type CardProps = {
  desc: Description;
  activeIds: string[];
  toggleCollapse: (id: string) => void;
};

const Card: React.FC<CardProps> = ({ desc, activeIds, toggleCollapse }) => (
  <div className="border border-neutral-700 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 flex flex-col">
    {/* Image */}
    <img
      src={desc.image}
      alt={desc.title}
      className="w-full h-40 object-cover"
    />

    {/* Title and toggle */}
    <div
      className="flex justify-between items-center px-4 py-3 bg-neutral-800 text-neutral-200 font-medium cursor-pointer hover:bg-neutral-700 transition-colors duration-300"
      onClick={() => toggleCollapse(desc.id)}
    >
      <h3 className="text-base">{desc.title}</h3>
      <span>
        {activeIds.includes(desc.id) ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </span>
    </div>

    {/* Description with smooth transition */}
    <div
      className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
      style={{
        maxHeight: activeIds.includes(desc.id) ? "500px" : "0",
      }}
    >
      <div className="px-4 py-3 bg-neutral-900 text-neutral-400">
        <p>{desc.content}</p>
      </div>
    </div>
  </div>
);

const descriptions: Description[] = [
  {
    id: "collapseOne",
    title: "AI-Powered Automated Credit Decision Making",
    content: `An intelligent credit decisioning engine that uses machine learning to automatically evaluate loan applications in real time. It incorporates credit bureau data, financials, and behavioral indicators to generate fast, consistent, and explainable credit decisions.`,
    image: "./img/product/aipowered.jpg",
  },
  {
    id: "collapseTwo",
    title: "CRIB Agent Service",
    content: `An intelligent integration solution designed to automate communication with the Credit Information Bureau (CRIB). It facilitates seamless retrieval of credit reports, incorporates a scoring mechanism to forecast repayment behavior and default probability, and significantly improves turnaround times in the credit evaluation process.`,
    image: "./img/product/960x0.webp",
  },
  {
    id: "collapseThree",
    title: "AI-Powered Collections Strategy Engine",
    content: `A machine learning solution that predicts repayment behavior and recommends optimal, customer-specific collection strategies. It helps lenders increase recovery rates while reducing operational costs and customer friction.`,
    image: "./img/product/23.jpg",
  },
  {
    id: "collapseFour",
    title: "Early Warning System for Delinquencies",
    content: `A predictive monitoring system that identifies high-risk accounts before they turn delinquent. It uses transaction patterns, repayment behavior, and external signals to alert credit teams early and enable preventive action.`,
    image: "./img/product/warning-leadership-1410062638-02-01.jpg",
  },
  {
    id: "collapseFive",
    title: "Automated Annual Credit Review",
    content: `A digital solution that automates the periodic review of borrower creditworthiness. It consolidates updated financials, portfolio performance, and credit metrics into a streamlined, AI-assisted review process—reducing manual effort and oversight risk.`,
    image: "./img/product/AI_ML-Driven-Collection-Strategy-Engine.jpg",
  },
  {
    id: "collapseSix",
    title: "Strategic AI Advisory for Credit Risk Transformation",
    content: `Expert consulting services to help financial institutions plan, design, and implement AI across their credit risk lifecycle. From data strategy and model governance to compliance alignment and change management, we support a smooth and sustainable transformation.`,
    image: "./img/product/1702054995781.jfif",
  },
];

const DemoContent: React.FC = () => {
  const [activeIds, setActiveIds] = useState<string[]>([]);

  const toggleCollapse = (id: string) => {
    setActiveIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Column 1 */}
      <div className="flex flex-col gap-4 flex-1">
        {descriptions.filter((_, i) => i % 2 === 0).map((desc) => (
          <Card
            key={desc.id}
            desc={desc}
            activeIds={activeIds}
            toggleCollapse={toggleCollapse}
          />
        ))}
      </div>

      {/* Column 2 */}
      <div className="flex flex-col gap-4 flex-1">
        {descriptions.filter((_, i) => i % 2 !== 0).map((desc) => (
          <Card
            key={desc.id}
            desc={desc}
            activeIds={activeIds}
            toggleCollapse={toggleCollapse}
          />
        ))}
      </div>
    </div>
  );
};

export default DemoContent;




// "use client";

// import Image from "next/image"; // Better practice in Next.js for optimization

// const DemoContent = () => {
//   const descriptions = [
//     {
//       id: "collapseOne",
//       title: "AI-Powered Automated Credit Decision Making",
//       content: `An intelligent credit decisioning engine that uses machine learning to automatically evaluate loan applications in real time. It incorporates credit bureau data, financials, and behavioral indicators to generate fast, consistent, and explainable credit decisions.`,
//       image: "./img/product/aipowered.jpg",
//     },
//     {
//       id: "collapseTwo",
//       title: "CRIB Agent Service",
//       content: `An intelligent integration solution designed to automate communication with the Credit Information Bureau (CRIB). It facilitates seamless retrieval of credit reports, incorporates a scoring mechanism to forecast repayment behavior and default probability, and significantly improves turnaround times in the credit evaluation process.`,
//       image: "./img/product/960x0.webp",
//     },
//     {
//       id: "collapseThree",
//       title: "AI-Powered Collections Strategy Engine",
//       content: `A machine learning solution that predicts repayment behavior and recommends optimal, customer-specific collection strategies. It helps lenders increase recovery rates while reducing operational costs and customer friction.`,
//       image: "/images/collections-strategy.jpg",
//     },
//     {
//       id: "collapseFour",
//       title: "Early Warning System for Delinquencies",
//       content: `A predictive monitoring system that identifies high-risk accounts before they turn delinquent. It uses transaction patterns, repayment behavior, and external signals to alert credit teams early and enable preventive action.`,
//       image: "/images/early-warning.jpg",
//     },
//     {
//       id: "collapseFive",
//       title: "Automated Annual Credit Review",
//       content: `A digital solution that automates the periodic review of borrower creditworthiness. It consolidates updated financials, portfolio performance, and credit metrics into a streamlined, AI-assisted review process—reducing manual effort and oversight risk.`,
//       image: "/images/credit-review.jpg",
//     },
//     {
//       id: "collapseSix",
//       title: "Strategic AI Advisory for Credit Risk Transformation",
//       content: `Expert consulting services to help financial institutions plan, design, and implement AI across their credit risk lifecycle. From data strategy and model governance to compliance alignment and change management, we support a smooth and sustainable transformation.`,
//       image: "/images/ai-advisory.jpg",
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {descriptions.map((desc) => (
//         <div
//           key={desc.id}
//           className="border border-neutral-700 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
//         >
//           {/* Image */}
//           <img
//             src={desc.image}
//             alt={desc.title}
//             className="w-full h-40 object-cover"
//           />

//           {/* Title */}
//           <div className="px-4 py-3 bg-neutral-800 text-neutral-200 font-medium">
//             <h3 className="text-base">{desc.title}</h3>
//           </div>

//           {/* Description */}
//           <div className="px-4 py-3 bg-neutral-900 text-neutral-400">
//             <p>{desc.content}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DemoContent;
