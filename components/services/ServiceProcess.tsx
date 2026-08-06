import React from "react";
import Container from "../shared/Container";
import { Check, ChevronRight } from "lucide-react";

export interface ProcessStepItem {
  number: number;
  title: string;
  description?: string;
  color?: string;
  bgColor?: string;
  hoverColor?: string;
  isLast?: boolean;
}

interface ServiceProcessProps {
  introText?: string;
  heading?: React.ReactNode;
  steps?: ProcessStepItem[];
}

const defaultSteps: ProcessStepItem[] = [
  {
    number: 1,
    title: "Site Assessment & Planning",
    description: "We inspect your property, understand project requirements, take accurate measurements, and recommend the most suitable structural or exterior solution.",
    color: "text-sky-500",
    bgColor: "bg-sky-500",
    hoverColor: "group-hover:text-sky-600",
  },
  {
    number: 2,
    title: "Custom Fabrication",
    description: "Steel components, gates, grills, roof structures, and awnings are precisely fabricated using premium materials for strength and lasting performance.",
    color: "text-amber-500",
    bgColor: "bg-amber-500",
    hoverColor: "group-hover:text-amber-600",
  },
  {
    number: 3,
    title: "Professional Installation",
    description: "Our experienced team installs every structure with precision, ensuring secure fittings, quality workmanship, and minimal disruption to your property.",
    color: "text-purple-600",
    bgColor: "bg-purple-600",
    hoverColor: "group-hover:text-purple-700",
  },
  {
    number: 4,
    title: "Final Inspection & Handover",
    description: "We perform comprehensive quality checks, verify structural integrity, and ensure every detail meets our standards before project completion.",
    color: "text-green-600",
    bgColor: "bg-green-600",
    hoverColor: "group-hover:text-green-700",
    isLast: true,
  },
];

export default function ServiceProcess({
  introText,
  heading,
  steps = defaultSteps,
}: ServiceProcessProps) {
  return (
    <section className="bg-white py-12 lg:py-20 border-t border-slate-50">
      <Container className="max-w-5xl lg:max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left Column: Descriptive Text & Bold Header */}
          <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left max-w-xl mx-auto lg:mx-0 lg:pr-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-md inline-block w-fit mb-4 mx-auto lg:mx-0">
              Our Working Process
            </span>
            <p className="text-base sm:text-lg leading-relaxed text-slate-600 font-medium">
              {introText || (
                <>
                  Our structural and exterior work process prioritises safety, precision, and long-term durability. From customised steel fabrication to professional installation, every project is completed with quality workmanship and strict attention to detail.
                </>
              )}
            </p>
            <h2 className="mt-8 text-4xl sm:text-5xl font-black text-secondary leading-[1.15] tracking-tight">
              {heading || (
                <>
                  Smart Design,<br />
                  Quality Steel,<br />
                  Trusted Installation
                </>
              )}
            </h2>
          </div>

          {/* Right Column: Timeline & Step Content */}
          <div className="lg:col-span-7 flex justify-center lg:justify-start w-full">
            <div className="relative w-full max-w-md sm:max-w-xl lg:max-w-none">

              {/* The Vertical Track Line */}
              <div className="absolute left-6 sm:left-8 -translate-x-1/2 top-6 bottom-16 w-8 bg-slate-100 rounded-full z-0" />

              {/* Steps Container */}
              <div className="space-y-10 sm:space-y-12 w-full relative z-10">
                {steps.map((step) => {
                  const isLastStep = step.isLast || step.number === steps.length;
                  const textColor = step.color || "text-primary";
                  const bgColor = step.bgColor || "bg-primary";
                  const hoverColor = step.hoverColor || "group-hover:text-primary";

                  return (
                    <div key={step.number} className="group flex items-center gap-6 sm:gap-8 lg:gap-12 w-full">

                      {/* Circle Icon container aligned over the vertical track */}
                      <div className="flex items-center justify-center w-12 sm:w-16 shrink-0">
                        {isLastStep ? (
                          /* Last Step: Larger Glowing Green Circle */
                          <div className="relative flex h-14 w-14 items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-ping" />
                            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 border-4 border-green-150 transition-all duration-300 group-hover:scale-110">
                              <Check size={28} strokeWidth={3} />
                            </div>
                          </div>
                        ) : (
                          /* Standard colored check circle */
                          <div className="relative flex h-7 w-7 items-center justify-center">
                            <div className={`absolute inset-0 rounded-full ${bgColor} opacity-40 animate-ping`} />
                            <div className={`relative flex h-7 w-7 items-center justify-center rounded-full ${bgColor} text-white shadow-sm transition-all duration-300 group-hover:scale-110`}>
                              <Check size={14} strokeWidth={3.5} />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Step Text Details */}
                      <div className="flex flex-col text-left">
                        <span className={`text-[11px] sm:text-xs font-extrabold uppercase tracking-wider ${textColor} opacity-90 mb-1`}>
                          Step 0{step.number}
                        </span>
                        <a
                          href="#contact"
                          className={`flex items-center gap-1.5 text-xl sm:text-2xl font-black tracking-tight ${textColor} ${hoverColor} transition-colors duration-300`}
                        >
                          <span>{step.title}</span>
                          <ChevronRight size={18} className="translate-y-[1px] transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                        {step.description && (
                          <p className="mt-1 text-sm text-slate-500 leading-relaxed font-medium max-w-lg">
                            {step.description}
                          </p>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
