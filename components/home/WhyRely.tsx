"use client";

import Image from "next/image";
import Link from "next/link";
import { HardHat, Calculator, MessagesSquare, ArrowRight } from "lucide-react";
import Container from "components/shared/Container";

const features = [
  {
    title: "Skilled Workers",
    description:
      "Our experienced team delivers high-quality workmanship with attention to detail. We ensure every project is completed efficiently, safely, and to the highest standards.",
    icon: HardHat,
  },
  {
    title: "Transparent Cost",
    description:
      "We provide clear and upfront pricing with no hidden fees. Every cost is explained in detail, so you can plan your budget with full confidence.",
    icon: Calculator,
  },
  {
    title: "Free Consultation",
    description:
      "We offer a no-obligation consultation to understand your needs and provide expert advice. This helps you make informed decisions before starting your project.",
    icon: MessagesSquare,
  },
];

export default function WhyRely() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
          
          {/* Left Column - Content */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            {/* Header */}
            <div className="mb-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                RELIABILITY & TRUST
              </p>
              <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-secondary sm:text-5xl">
                Why Do You Rely On Us?
              </h2>
              <div className="mt-4 h-1 w-20 rounded bg-primary" />
            </div>

            {/* Features List */}
            <div className="space-y-8 mb-10">
              {features.map((feature, i) => {
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
                      <h3 className="text-xl font-bold tracking-tight text-secondary group-hover:text-primary transition-colors duration-300">
                        {feature.title}
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
                Talk to an Expert
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>

          {/* Right Column - Image */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-[420px] aspect-[519/768] overflow-hidden shadow-2xl rounded-tr-[3.5rem] rounded-bl-[3.5rem] rounded-tl-xl rounded-br-xl border border-slate-100 bg-slate-50">
              <Image
                src="/images/home/rely/rely-main.png"
                alt="UA Engineering woodshop carpentry and fabrication work"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
