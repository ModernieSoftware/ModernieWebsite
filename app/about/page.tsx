"use client";

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold mb-8">About NEXUS</h1>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xl text-gray-400 mb-6">
              At NEXUS, were pioneering the future of enterprise technology. Our mission is to empower businesses with cutting-edge AI and cloud solutions that drive innovation and growth.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="h-6 w-6 text-white" />
                <span>Industry-leading AI technology</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="h-6 w-6 text-white" />
                <span>Enterprise-grade security</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="h-6 w-6 text-white" />
                <span>24/7 Expert support</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000"
              alt="Tech visualization"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}