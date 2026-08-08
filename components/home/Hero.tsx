"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Award,
  BadgeCheck,
  Clock3,
  DollarSign,
  MessageCircle,
  MoveRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Container from "components/shared/Container";
import cmsData from "../../data/cmsData.json";

const highlights = [
  { label: "Certified Workmanship", icon: Award },
  { label: "Guaranteed Quality", icon: BadgeCheck },
  { label: "Transparent Pricing", icon: DollarSign },
  { label: "On-Time Delivery", icon: Clock3 },
];

const slides = [
  {
    heading: "From Renovation to Painting, Roofing, Electrical, Plumbing and Steel Works.",
    subheading: "We handle it all with expertise, reliability, and guaranteed quality.",
  },
  {
    heading: "Everything Your Property Needs. One Trusted Engineering Team.",
    subheading: "From renovations and reinstatement to electrical, plumbing, painting, roofing, steel fabrication, waterproofing, and maintenance - we handle every project with precision and professionalism.",
  },
  {
    heading: "Fresh Paint. Lasting Protection. Stunning Results.",
    subheading: "Interior and exterior painting services that enhance appearance, protect surfaces, and increase the value of your property.",
  },
  {
    heading: "Roof Problems? We Fix Them Before They Cost You More.",
    subheading: "Professional roof repairs, waterproofing, leak prevention, and complete roofing solutions to keep your property safe in every season.",
  },
  {
    heading: "Safe, Reliable Electrical Solutions for Every Building",
    subheading: "From new installations and rewiring to troubleshooting and upgrades, we deliver electrical work that keeps your property running safely.",
  },
  {
    heading: "Professional Plumbing Services Without the Hassle",
    subheading: "Leak repairs, pipe replacement, drainage solutions, sanitary installations, and preventive maintenance-all completed with quality workmanship.",
  },
  {
    heading: "Custom Steel Fabrication Built for Strength & Precision",
    subheading: "We design, fabricate, and install steel structures, staircases, platforms, railings, and custom metal works for commercial and industrial projects.",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const heroContent = cmsData?.home?.content || {};
  const heroImage = heroContent.heroImage || "/images/home/hero/hero-bg.png";
  const heroImageAlt = heroContent.heroImageAlt || "Hero Background Banner";

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-white lg:min-h-[calc(100vh-132px)] flex items-center py-10 sm:py-16 lg:py-24">
        <Image
          src={heroImage}
          alt={heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#f4f8ff]/72" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-[#eef5ff]/45 to-white/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-white/35" />

        <Container className="relative flex flex-col justify-center gap-6 lg:gap-8 w-full h-full">
          {/* Slider Outer Wrapper */}
          <div className="relative mx-auto w-full max-w-[1320px] pt-4 text-center sm:pt-6 lg:pt-12 xl:pt-16">
            {/* Prev Arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-secondary shadow-lg border border-slate-100 hover:bg-primary hover:text-white transition-all duration-300 z-30 hover:scale-105"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Next Arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-secondary shadow-lg border border-slate-100 hover:bg-primary hover:text-white transition-all duration-300 z-30 hover:scale-105"
              aria-label="Next Slide"
            >
              <ChevronRight size={22} />
            </button>

            {/* Strict Overflow Hidden Track Window - 0 peeking */}
            <div className="w-full overflow-hidden">
              {/* Horizontal Track moving left/right */}
              <div
                className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, idx) => (
                  <div
                    key={idx}
                    className="min-w-full w-full shrink-0 flex flex-col items-center justify-center text-center px-4 sm:px-12 min-h-[170px] sm:min-h-[210px]"
                  >
                    <h1 className="mx-auto max-w-[1240px] text-3xl font-bold leading-[1.05] text-secondary sm:text-5xl">
                      {slide.heading}
                    </h1>

                    <p className="mx-auto mt-4 max-w-[780px] text-center text-base font-medium leading-6 text-slate-950 sm:mt-6 sm:text-lg sm:leading-7">
                      {slide.subheading}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Indicator Dots */}
            <div className="mt-6 flex items-center justify-center gap-2.5 z-20">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx
                      ? "w-8 bg-primary shadow-sm"
                      : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons pinned at fixed, clean positions */}
          <div className="mx-auto mt-6 flex flex-wrap w-full max-w-[1160px] justify-between items-center gap-4 sm:mt-8 lg:mt-10 px-4 sm:px-0">
            <a
              href="https://wa.me/6598411786?text=Hello%20UA%20Engineering%2C%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="group/whatsapp relative inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 overflow-hidden rounded-full bg-primary px-3 py-2 text-sm font-bold text-white shadow-sm transition-colors duration-300 sm:min-h-11 sm:min-w-[190px] sm:flex-none sm:gap-2 sm:px-6 sm:py-3 sm:text-base"
            >
              <span className="absolute inset-0 translate-x-[-101%] rounded-full bg-secondary transition-transform duration-500 ease-in-out group-hover/whatsapp:translate-x-0" />
              <span className="relative z-10 flex items-center gap-2 transition-colors duration-300">
                <MessageCircle size={20} />
                WhatsApp Us
              </span>
            </a>
            <Link
              href="/#services"
              className="group/learn relative inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 overflow-hidden rounded-full bg-secondary px-3 py-2 text-sm font-bold text-white shadow-sm transition-colors duration-300 sm:min-h-11 sm:min-w-[190px] sm:flex-none sm:gap-2 sm:px-6 sm:py-3 sm:text-base"
            >
              <span className="absolute inset-0 translate-x-[-101%] rounded-full bg-primary transition-transform duration-500 ease-in-out group-hover/learn:translate-x-0" />
              <span className="relative z-10 flex items-center gap-2 transition-colors duration-300">
                Learn More
                <MoveRight size={18} />
              </span>
            </Link>
          </div>

          <div className="relative mx-auto mt-8 sm:mt-12 lg:mt-16 grid w-full max-w-[1160px] grid-cols-2 gap-2 rounded-[22px] bg-white/88 p-2 shadow-[0_18px_55px_rgba(15,23,42,0.18)] backdrop-blur sm:gap-3 sm:rounded-[34px] sm:p-3 lg:grid-cols-4">
            {highlights.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="group flex min-h-14 items-center gap-2 rounded-full bg-white px-3 py-2 text-left text-xs font-bold text-slate-950 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-white hover:shadow-xl sm:min-h-16 sm:gap-4 sm:px-5 sm:py-3 sm:text-sm"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-primary text-primary transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-primary sm:h-11 sm:w-11">
                  <Icon className="h-5 w-5 sm:h-[23px] sm:w-[23px]" strokeWidth={2.6} />
                </span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
