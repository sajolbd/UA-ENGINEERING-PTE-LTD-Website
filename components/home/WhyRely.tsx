"use client";

import Image from "next/image";
import Link from "next/link";
import { DollarSign, ShieldCheck, Clock3, ArrowRight } from "lucide-react";
import Container from "components/shared/Container";
import cmsData from "../../data/cmsData.json";
import { getImageUrl } from "../../lib/api";

const features = [
  {
    num: "01.",
    title: "Honest & Transparent Pricing",
    description:
      "Receive clear, detailed quotations with fair pricing and no hidden costs, so you know exactly what to expect before work begins.",
    icon: DollarSign,
  },
  {
    num: "02.",
    title: "Quality Work That Lasts",
    description:
      "We focus on quality materials, skilled workmanship, and proper installation to deliver durable solutions you can depend on for years.",
    icon: ShieldCheck,
  },
  {
    num: "03.",
    title: "Reliable Service, Every Step",
    description:
      "From the first site visit to project handover, we keep you informed, stay on schedule, and ensure a smooth experience.",
    icon: Clock3,
  },
];

export default function WhyRely() {
  const homeContent = (cmsData as any)?.home?.content || {};
  const relyBadge = homeContent.relyBadge || "RELIABILITY & TRUST";
  const relyHeading = homeContent.relyHeading || "Why Do You Rely On Us?";
  const relyImage = homeContent.relyImage || "/images/home/rely/rely-main.png";
  const relyButtonText = homeContent.relyButtonText || "Talk to an Expert";

  return (
    <section className="bg-white py-8 lg:py-12">
      <Container>
        {/* Mobile Header (Visible only on mobile/tablet) */}
        <div className="mb-10 block lg:hidden">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {relyBadge}
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-secondary sm:text-5xl">
            {relyHeading}
          </h2>
          <div className="mt-4 h-1 w-20 rounded bg-primary" />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">

          {/* Left Column - Content */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            {/* Desktop Header (Visible only on desktop) */}
            <div className="mb-10 hidden lg:block">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                {relyBadge}
              </p>
              <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-secondary sm:text-5xl">
                {relyHeading}
              </h2>
              <div className="mt-4 h-1 w-20 rounded bg-primary" />
            </div>

            {/* Features List */}
            <div className="space-y-8 mb-10">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="group flex gap-5 p-4 rounded-xl border border-transparent transition-all duration-300 hover:border-slate-100 hover:shadow-md"
                  >
                    {/* Icon Box */}
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                      <Icon size={26} className="transition-transform duration-300 group-hover:rotate-12" />
                    </div>

                    {/* Text Details */}
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-secondary group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
                        <span className="text-primary font-black text-lg">{feature.num}</span>
                        <span>{feature.title}</span>
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <Link
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden bg-secondary px-8 py-3.5 font-bold uppercase tracking-wider text-white shadow-md text-xs rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <span className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
              <span className="relative z-10 flex items-center gap-1.5">
                {relyButtonText}
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>

          {/* Right Column - Image */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-[420px] aspect-[519/768] overflow-hidden shadow-2xl rounded-tr-[3.5rem] rounded-bl-[3.5rem] rounded-tl-xl rounded-br-xl border border-slate-100 bg-slate-50">
              <img
                src={getImageUrl(relyImage)}
                alt="UA Engineering"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
