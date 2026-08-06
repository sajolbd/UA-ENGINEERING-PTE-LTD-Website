"use client";

import React from "react";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import Container from "../shared/Container";

const categoryPlans = {
  "renovation-upgrading": [
    {
      number: 1,
      title: "Design & Planning",
      description: "Site measurement, layout drawings, 3D renders, and obtaining HDB/BCA renovation permits."
    },
    {
      number: 2,
      title: "Hacking & Masonry",
      description: "Safe hacking of partition walls, structural leveling, and laying premium floor tiles."
    },
    {
      number: 3,
      title: "M&E and Carpentry",
      description: "Electrical rewiring, sanitary pipe routing, false ceiling, and custom cabinets installation."
    },
    {
      number: 4,
      title: "QC & Handover",
      description: "Thorough quality checks, fine cleaning, painting touch-ups, and key handover."
    }
  ],
  "structural-exterior-works": [
    {
      number: 1,
      title: "Engineering & Calc",
      description: "Site load calculation, structural drafting, and BCA guidelines analysis."
    },
    {
      number: 2,
      title: "Steel Fabrication",
      description: "Precision cutting, welding, galvanizing, and anti-rust coating at the workshop."
    },
    {
      number: 3,
      title: "On-Site Installation",
      description: "Structural hoisting, framework anchoring, metal framing, and panel mounting."
    },
    {
      number: 4,
      title: "PE Certification",
      description: "BCA safety compliance check and Professional Engineer (PE) endorsement."
    }
  ],
  "painting-waterproofing": [
    {
      number: 1,
      title: "Site Assessment",
      description: "Moisture level analysis, leak detection, and structural crack tracing."
    },
    {
      number: 2,
      title: "Surface Preparation",
      description: "Wall scraping, skim coating, wall patching, and sealer priming."
    },
    {
      number: 3,
      title: "Application & Grouting",
      description: "Applying premium paints, flat roof membrane torching, or PU grout injection."
    },
    {
      number: 4,
      title: "Ponding & Warranty",
      description: "Water testing, final QC inspection, and leakage warranty handover."
    }
  ],
  "aluminium-glazing-works": [
    {
      number: 1,
      title: "Laser Measurement",
      description: "High-precision laser measurement of windows, doors, or blind systems."
    },
    {
      number: 2,
      title: "Workshop Assembly",
      description: "Cutting high-grade aluminium profiles and glass assembly under controlled setups."
    },
    {
      number: 3,
      title: "Installation & Sealing",
      description: "Frame anchoring, soundproof glass glazing, and structural silicone weatherproofing."
    },
    {
      number: 4,
      title: "Calibration & Handover",
      description: "Friction checks, remote control sync (for zip blinds), and safety inspections."
    }
  ],
  "electrical-plumbing-aircon": [
    {
      number: 1,
      title: "Diagnostics & Audit",
      description: "Evaluating circuit loads, checking leaks, and aircon compressor health check."
    },
    {
      number: 2,
      title: "First-Fix Routing",
      description: "Concealed cable pull, copper/PVC pipe routing, and bracket setup."
    },
    {
      number: 3,
      title: "Fittings Installation",
      description: "Mounting switches, sockets, DB boards, light fixtures, faucets, and aircon units."
    },
    {
      number: 4,
      title: "EMA & Pressure Test",
      description: "PUB/EMA safety audits, pressure leakage check, and aircon cooling tests."
    }
  ],
  "solar-panel-installation": [
    {
      number: 1,
      title: "Shadow Survey",
      description: "Rooftop shadow path evaluation and structural weight-bearing checks."
    },
    {
      number: 2,
      title: "Permit Applications",
      description: "System engineering layout designs and SP Group grid connection submissions."
    },
    {
      number: 3,
      title: "Mounting & Wiring",
      description: "Installing structural mounting rails, Tier-1 solar panels, and inverters."
    },
    {
      number: 4,
      title: "Grid Activation",
      description: "SP Group meter integration, system safety test, and app tracking setup."
    }
  ]
};

const sidebarData: Record<string, { heading: string; text: string }> = {
  "renovation-upgrading": {
    heading: "Your Vision, Your Space, Our Renovation",
    text: "Our renovation and space-planning process is tailored to bring your vision to life. From layouts and hacking to custom carpentry, we handle all details to keep your project on schedule."
  },
  "structural-exterior-works": {
    heading: "Safe Design, Solid Steel, PE Approved",
    text: "Our structural engineering process is focused on load integrity, durability, and building code safety. Our certified engineers manage fabrication and PE endorsements."
  },
  "painting-waterproofing": {
    heading: "Leak Proof, Perfect Coat, Lasting Care",
    text: "Our painting and waterproofing process protects your property from tropical weather and water leaks. We ensure detailed surface preparation and leak-proof tests."
  },
  "aluminium-glazing-works": {
    heading: "Precise Fit, Tempered Glass, Sleek Design",
    text: "Our aluminium fabrication and glazing works deliver precise custom fits for windows, glass doors, and motorized blinds, ensuring smooth and weather-resistant operations."
  },
  "electrical-plumbing-aircon": {
    heading: "Certified M&E, EMA Rewire, PUB Plumbing",
    text: "Our M&E service process ensures your electrical, plumbing, and cooling systems are safe and highly efficient. We coordinate with EMA and PUB licensed experts."
  },
  "solar-panel-installation": {
    heading: "Green Energy, SP Grid Tie, High Savings",
    text: "Our solar engineering process covers full rooftop feasibility, design approvals, mounting installation, and grid net-metering setup to minimize your electricity bills."
  }
};

const stepColors = [
  {
    color: "text-sky-500",
    bgColor: "bg-sky-500",
    hoverColor: "group-hover:text-sky-600",
  },
  {
    color: "text-amber-500",
    bgColor: "bg-amber-500",
    hoverColor: "group-hover:text-amber-600",
  },
  {
    color: "text-purple-600",
    bgColor: "bg-purple-600",
    hoverColor: "group-hover:text-purple-700",
  },
  {
    color: "text-green-600",
    bgColor: "bg-green-600",
    hoverColor: "group-hover:text-green-700",
  }
];

interface ServicePlanProps {
  slug: string;
  categoryTitle: string;
}

export default function ServicePlan({ slug, categoryTitle }: ServicePlanProps) {
  const steps = categoryPlans[slug as keyof typeof categoryPlans] || [];
  const info = sidebarData[slug] || {
    heading: `Expert Execution for ${categoryTitle}`,
    text: `Our methodology is standard, transparent, and focused on safety and quality compliance.`
  };

  if (steps.length === 0) return null;

  // Split heading by commas to render with line breaks
  const headingParts = info.heading.split(", ");

  return (
    <section id="service-plan" className="bg-white py-8 lg:py-12 border-t border-slate-50">
      <Container className="max-w-5xl lg:max-w-6xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-10 lg:mb-14">
          <h2 className="text-3xl font-extrabold text-secondary tracking-tight sm:text-4xl">
            Our Working Process
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 bg-primary rounded" />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left Column: Descriptive Text & Bold Header */}
          <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left max-w-xl mx-auto lg:mx-0 lg:pr-4">
            <p className="text-base sm:text-lg leading-relaxed text-slate-600 font-medium">
              {info.text}
            </p>
            <h2 className="mt-8 text-4xl sm:text-5xl font-black text-secondary leading-[1.15] tracking-tight">
              {headingParts.map((part, i) => (
                <React.Fragment key={i}>
                  {part}
                  {i < headingParts.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>
          </div>

          {/* Right Column: Timeline & Step Content */}
          <div className="lg:col-span-7 flex justify-center lg:justify-start w-full">
            <div className="relative w-full max-w-md sm:max-w-xl lg:max-w-none">

              {/* The Vertical Track Line */}
              <div className="absolute left-6 sm:left-8 -translate-x-1/2 top-6 bottom-16 w-8 bg-slate-100 rounded-full z-0" />

              {/* Steps Container */}
              <div className="space-y-10 sm:space-y-12 w-full relative z-10">
                {steps.map((step, index) => {
                  const isLast = step.number === 4;
                  const theme = stepColors[index] || stepColors[0];

                  return (
                    <div key={step.number} className="group flex items-start gap-6 sm:gap-8 lg:gap-12 w-full">

                      {/* Circle Icon container aligned over the vertical track */}
                      <div className="flex items-center justify-center w-12 sm:w-16 shrink-0 mt-0.5">
                        {isLast ? (
                          /* Last Step: Larger Glowing Green Circle */
                          <div className="relative flex h-14 w-14 items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-ping" />
                            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 border-4 border-green-100 transition-all duration-300 group-hover:scale-110">
                              <Check size={28} strokeWidth={3} />
                            </div>
                          </div>
                        ) : (
                          /* Steps 1-3: Standard colored check circle */
                          <div className="relative flex h-7 w-7 items-center justify-center">
                            <div className={`absolute inset-0 rounded-full ${theme.bgColor} opacity-40 animate-ping`} />
                            <div className={`relative flex h-7 w-7 items-center justify-center rounded-full ${theme.bgColor} text-white shadow-sm transition-all duration-300 group-hover:scale-110`}>
                              <Check size={14} strokeWidth={3.5} />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Step Text Details */}
                      <div className="flex flex-col text-left">
                        <span className={`text-[11px] sm:text-xs font-extrabold uppercase tracking-wider ${theme.color} opacity-90 mb-1`}>
                          Step 0{step.number}
                        </span>
                        <Link
                          href="/contact"
                          className={`flex items-center gap-1.5 text-xl sm:text-2xl font-black tracking-tight ${theme.color} ${theme.hoverColor} transition-colors duration-300`}
                        >
                          <span>{step.title}</span>
                          <ChevronRight size={18} className="translate-y-[1px] transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-500 max-w-md font-medium">
                          {step.description}
                        </p>
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
