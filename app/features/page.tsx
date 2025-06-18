"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowRight, Cpu, Cloud, Shield, BarChart, Database } from 'lucide-react';

const features = [
  {
    title: "AI-Driven Analytics",
    description: "Harness the power of artificial intelligence for deep insights",
    icon: Cpu
  },
  {
    title: "Cloud Integration",
    description: "Seamlessly connect with your existing cloud infrastructure",
    icon: Cloud
  },
  {
    title: "Security First",
    description: "Enterprise-level security protecting your sensitive data",
    icon: Shield
  },
  {
    title: "Real-time Analytics",
    description: "Process and visualize data in real-time",
    icon: BarChart
  },
  {
    title: "Scalable Architecture",
    description: "Built to grow with your business needs",
    icon: Database
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold mb-12">Our Features</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="hover-glow relative p-6 rounded-lg border border-white/10 bg-black/50 backdrop-blur-lg">
                <Icon className="h-8 w-8 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 mb-4">{feature.description}</p>
                <ArrowRight className="h-5 w-5" />
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}