"use client";

import React from "react";
import Image from "next/image";
import {
  Wrench,
  Clock,
  Award,
  DollarSign,
  ShieldCheck,
  ThumbsUp,
  CheckCircle2,
} from "lucide-react";
import Container from "components/shared/Container";
import { useCmsData } from "../../context/CmsContext";
import { getImageUrl } from "../../lib/api";

const ICON_MAP: Record<string, any> = {
  Clock,
  Wrench,
  Award,
  DollarSign,
  ShieldCheck,
  ThumbsUp,
  CheckCircle2,
};

const DEFAULT_HIGHLIGHTS = [
  { text: "15+ Years of Industry Experience", icon: "Clock" },
  { text: "Highly Skilled & Certified Workers", icon: "Wrench" },
  { text: "BCA & HDB Compliant Workmanship", icon: "Award" },
  { text: "Transparent & Competitive Pricing", icon: "DollarSign" },
  { text: "Premium Quality Materials", icon: "ShieldCheck" },
  { text: "Safety-First Construction Practices", icon: "ShieldCheck" },
  { text: "On-Time Project Completion", icon: "Clock" },
  { text: "100% Commitment to Client Satisfaction", icon: "ThumbsUp" },
];

export default function AboutHero() {
  const { cmsData } = useCmsData();
  const aboutContent = (cmsData as any)?.about?.content || {};

  const sectionTag = aboutContent.sectionTag || "About Our Company";
  const overviewHeading = aboutContent.overviewHeading || "Why Choose UA Engineering For Renovation & Upgrading Services in Singapore";
  const overviewText = aboutContent.overviewText || "Looking for a dependable renovation and upgrading contractor in Singapore? UA ENGINEERING PTE. LTD. provides renovation, construction, and engineering services for HDB, BTO, condos, landed homes, commercial, and industrial properties.";
  const heroImage = aboutContent.aboutImage || aboutContent.heroImage || "/images/home/about/about-main.jpg";
  const heroImageAlt = aboutContent.heroImageAlt || "UA Engineering Renovation Specialist";

  const trustHeading = aboutContent.trustHeading || "Why Property Owners Trust UA Engineering";

  let highlightsList = DEFAULT_HIGHLIGHTS;
  if (aboutContent.highlightsJson) {
    try {
      const parsed = JSON.parse(aboutContent.highlightsJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        highlightsList = parsed;
      }
    } catch (e) {
      console.error("Failed to parse dynamic about highlightsJson:", e);
    }
  }

  return (
    <section className="bg-white py-8 lg:py-12 overflow-hidden">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Side - Image Container */}
          <div className="relative lg:col-span-5">
            {/* Background Decorative Accent */}
            <div className="absolute -bottom-6 -left-6 h-full w-full rounded-2xl border-2 border-primary/20 -z-10 hidden sm:block" />
            
            {/* Main Image Wrapper */}
            <div className="relative overflow-hidden rounded-2xl bg-slate-100 shadow-xl aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
              <img
                src={getImageUrl(heroImage)}
                alt={heroImageAlt}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/home/about/about-main.jpg";
                }}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Circular Decorative Element */}
            <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-primary/5 -z-10 animate-pulse" />
          </div>

          {/* Right Side - Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Section Tag */}
            <span className="text-sm font-bold uppercase tracking-wider text-primary mb-3">
              {sectionTag}
            </span>

            {/* Main Title */}
            <h2 className="text-3xl font-bold leading-tight text-secondary mb-6">
              {overviewHeading}
            </h2>

            {/* Description */}
            <div className="space-y-4 text-base sm:text-lg leading-relaxed text-slate-600 font-medium mb-8">
              <p>
                {overviewText}
              </p>
            </div>

            <h3 className="text-lg font-bold text-secondary mb-4">
              {trustHeading}
            </h3>

            {/* Grid of Trust Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-6">
              {highlightsList.map((item, index) => {
                const IconComponent = ICON_MAP[item.icon] || ShieldCheck;
                return (
                  <div key={index} className="flex items-center gap-3 group">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110 shadow-sm border border-primary/10">
                      <IconComponent className="h-4.5 w-4.5 transition-transform duration-300 group-hover:rotate-12" strokeWidth={2.5} />
                    </div>
                    <span className="text-sm font-semibold text-secondary group-hover:text-primary transition-colors duration-200">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
