"use client";

import Image from "next/image";
import { MessagesSquare, ClipboardList, HardHat, FileCheck } from "lucide-react";
import Container from "components/shared/Container";
import { useCmsData } from "../../context/CmsContext";
import { getImageUrl } from "../../lib/api";

export default function WorkingProcess() {
  const { cmsData } = useCmsData();
  const homeContent = (cmsData as any)?.home?.content || {};
  const aboutContent = (cmsData as any)?.about?.content || {};
  const processBadge = homeContent.processBadge || aboutContent.processBadge || "HOW IT WORKS";
  const processHeading = homeContent.processHeading || aboutContent.processHeading || "Our Simple & Transparent Work Process";
  const processSubheading = homeContent.processSubheading || aboutContent.processSubheading || "From site inspection and quotation to professional installation and project handover, we ensure quality, transparency, and customer satisfaction at every stage.";

  const DEFAULT_PROCESS_IMAGES: Record<number, string> = {
    1: "/images/home/process/assessment.webp",
    2: "/images/home/process/planning.webp",
    3: "/images/home/process/execution.webp",
    4: "/images/home/process/handover.webp",
  };

  const getStepImage = (num: number) => {
    const raw = homeContent[`processStep${num}Image`] || aboutContent[`processStep${num}Image`];
    if (typeof raw === "string" && raw.trim().length > 0) {
      return getImageUrl(raw.trim());
    }
    return DEFAULT_PROCESS_IMAGES[num] || "";
  };

  const steps = [
    {
      step: "01",
      title: homeContent.processStep1Title || "Free Consultation & Site Visit",
      description: homeContent.processStep1Desc || "We assess your requirements, inspect the site, discuss solutions, and understand your project goals.",
      icon: MessagesSquare,
      image: getStepImage(1),
    },
    {
      step: "02",
      title: homeContent.processStep2Title || "Quotation & Project Planning",
      description: homeContent.processStep2Desc || "Provide a detailed quotation, project scope, material recommendations, timeline, and execution plan with transparent pricing.",
      icon: ClipboardList,
      image: getStepImage(2),
    },
    {
      step: "03",
      title: homeContent.processStep3Title || "Professional Execution",
      description: homeContent.processStep3Desc || "Our skilled team completes every project using quality materials, safe practices, and strict workmanship standards.",
      icon: HardHat,
      image: getStepImage(3),
    },
    {
      step: "04",
      title: homeContent.processStep4Title || "Final Inspection & Handover",
      description: homeContent.processStep4Desc || "We conduct final quality checks, ensure everything meets expectations, and hand over your completed project with confidence.",
      icon: FileCheck,
      image: getStepImage(4),
    },
  ];

  return (
    <section id="process" className="bg-[#f8fafc] py-8 lg:py-12 overflow-hidden">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {processBadge}
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-secondary sm:text-5xl">
            {processHeading}
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded bg-primary" />
          <p className="mt-6 text-base text-slate-600 lg:text-lg">
            {processSubheading}
          </p>
        </div>

        {/* Process Line Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <div
                key={step.step}
                className="group relative flex flex-col items-center text-center"
              >
                {/* Image Ring Circle */}
                <div className="relative mb-8 flex h-[210px] w-[210px] items-center justify-center">

                  {/* Outer Spinning Ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/60 animate-[spin_30s_linear_infinite]" />

                  {/* Static Inner Image Box */}
                  <div className="relative h-[180px] w-[180px] rounded-full overflow-hidden border-4 border-white bg-slate-50 shadow-md z-10 flex items-center justify-center">
                    {step.image ? (
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        sizes="180px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-white to-primary/10 flex items-center justify-center">
                        <Icon size={56} className="text-primary transition-transform duration-500 group-hover:scale-110" />
                      </div>
                    )}
                  </div>

                  {/* Floating Badge (Icon) - only when image exists */}
                  {step.image && (
                    <div className="absolute top-2 left-2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white border border-slate-100 shadow-lg text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                      <Icon size={22} className="transition-transform duration-500 group-hover:animate-bounce" />
                    </div>
                  )}
                </div>

                {/* Horizontal Connector Arrow (Only lg screens, hide on last) */}
                {!isLast && (
                  <div className="hidden lg:block absolute top-[105px] left-[calc(100%-35px)] w-[70px] z-10 translate-y-[-50%] text-primary/60 transition-transform duration-300 group-hover:translate-x-1">
                    <svg className="w-full h-6" fill="none" viewBox="0 0 100 24" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3">
                      <path d="M0,12 L92,12" />
                      <path d="M82,4 L92,12 L82,20" fill="none" strokeWidth="2.5" />
                    </svg>
                  </div>
                )}

                {/* Step Metadata & Content */}
                <div className="px-4">
                  <span className="text-xs font-black tracking-widest text-primary bg-primary/5 px-3 py-1.5 rounded-full uppercase">
                    Step {step.step}
                  </span>
                  <h3 className="mt-4 text-xl font-bold tracking-tight text-secondary group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
