"use client";
import { useState } from "react";

const AccordionContent = () => {
  const descriptions = [
    {
      id: "collapseOne",
      title: "AI-Powered Automated Credit Decision Making",
      content: `An intelligent credit decisioning engine that uses machine learning to automatically evaluate loan applications in real time. It incorporates credit bureau data, financials, and behavioral indicators to generate fast, consistent, and explainable credit decisions.`,
    },
    {
      id: "collapseTwo",
      title: "CRIB Agent Service",
      content: `An intelligent integration solution designed to automate communication with the Credit Information Bureau (CRIB). It facilitates seamless retrieval of credit reports, incorporates a scoring mechanism to forecast repayment behavior and default probability, and significantly improves turnaround times in the credit evaluation process.`,
    },
    {
      id: "collapseThree",
      title: "AI-Powered Collections Strategy Engine",
      content: `A machine learning solution that predicts repayment behavior and recommends optimal, customer-specific collection strategies. It helps lenders increase recovery rates while reducing operational costs and customer friction.`,
    },
    {
      id: "collapseFour",
      title: "Early Warning System for Delinquencies",
      content: `A predictive monitoring system that identifies high-risk accounts before they turn delinquent. It uses transaction patterns, repayment behavior, and external signals to alert credit teams early and enable preventive action.`,
    },
    {
      id: "collapseFive",
      title: "Automated Annual Credit Review",
      content: `A digital solution that automates the periodic review of borrower creditworthiness. It consolidates updated financials, portfolio performance, and credit metrics into a streamlined, AI-assisted review process—reducing manual effort and oversight risk.`,
    },
    {
      id: "collapseSix",
      title: "Strategic AI Advisory for Credit Risk Transformation",
      content: `Expert consulting services to help financial institutions plan, design, and implement AI across their credit risk lifecycle. From data strategy and model governance to compliance alignment and change management, we support a smooth and sustainable transformation.`,
    },
  ];

  const [activeId, setActiveId] = useState<string | null>(descriptions[0].id);

  const toggleCollapse = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div id="accordion" className="space-y-2">
      {descriptions.map((desc, index) => (
        <div key={desc.id} className="border border-neutral-700 rounded">
          <div className="p-4 bg-neutral-800">
            <h5 className="mb-0">
              <button
                className="flex justify-between items-center w-full text-left font-semibold text-neutral-200"
                onClick={() => toggleCollapse(desc.id)}
                aria-expanded={activeId === desc.id}
                aria-controls={desc.id}
              >
                {desc.title}
                <span>
                  {activeId === desc.id ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  )}
                </span>
              </button>
            </h5>
          </div>

          {activeId === desc.id && (
            <div
              id={desc.id}
              className="p-4 bg-neutral-900 text-neutral-400"
            >
              <p>{desc.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AccordionContent;
