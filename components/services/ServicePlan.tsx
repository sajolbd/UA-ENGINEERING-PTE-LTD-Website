"use client";

import React from "react";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import Container from "../shared/Container";

const categoryPlans = {
  "renovation-upgrading": [
    {
      number: 1,
      title: "One-Site Meeting & Site Visit",
      description: "We assess your space, understand your needs, and identify the best renovation approach."
    },
    {
      number: 2,
      title: "Planning & Proposal Making",
      description: "We create a clear renovation plan with scope, timeline, materials, and pricing."
    },
    {
      number: 3,
      title: "Start Working & Quality Control",
      description: "Our team executes the project with strict supervision and consistent quality checks."
    },
    {
      number: 4,
      title: "Functional Audit & Handover",
      description: "We inspect every detail, complete final checks, and hand over a ready-to-use space."
    }
  ],
  "structural-exterior-works": [
    {
      number: 1,
      title: "Site Assessment & Planning",
      description: "We inspect your property, understand project requirements, take accurate measurements, and recommend the most suitable structural or exterior solution."
    },
    {
      number: 2,
      title: "Custom Fabrication",
      description: "Steel components, gates, grills, roof structures, and awnings are precisely fabricated using premium materials for strength and lasting performance."
    },
    {
      number: 3,
      title: "Professional Installation",
      description: "Our experienced team installs every structure with precision, ensuring secure fittings, quality workmanship, and minimal disruption to your property."
    },
    {
      number: 4,
      title: "Final Inspection & Handover",
      description: "We perform comprehensive quality checks, verify structural integrity, and ensure every detail meets our standards before project completion."
    }
  ],
  "painting-waterproofing": [
    {
      number: 1,
      title: "Site Inspection & Assessment",
      description: "Inspect surfaces, identify leaks, cracks, and moisture-related issues."
    },
    {
      number: 2,
      title: "Surface Preparation",
      description: "Clean, repair, patch, and prepare surfaces for lasting adhesion."
    },
    {
      number: 3,
      title: "Painting & Waterproofing",
      description: "Apply premium paints, coatings, membranes, or waterproofing systems professionally."
    },
    {
      number: 4,
      title: "Quality Inspection & Handover",
      description: "Conduct final checks, site cleaning, and project handover with care."
    }
  ],
  "aluminium-glazing-works": [
    {
      number: 1,
      title: "Site Assessment",
      description: "We inspect the installation area, take accurate measurements, and recommend the most suitable aluminium and glazing solution."
    },
    {
      number: 2,
      title: "Custom Fabrication",
      description: "Aluminium frames, glass panels, and accessories are fabricated to precise specifications for a seamless fit."
    },
    {
      number: 3,
      title: "Professional Installation",
      description: "Our experienced technicians install every component with precision, ensuring strength, safety, and a clean finish."
    },
    {
      number: 4,
      title: "Final Inspection",
      description: "Every installation undergoes quality checks, operational testing, and a thorough site cleanup before project handover."
    }
  ],
  "electrical-plumbing-aircon": [
    {
      number: 1,
      title: "Site Assessment",
      description: "Inspect existing electrical, plumbing, and aircon systems, identify issues, and confirm the required work scope."
    },
    {
      number: 2,
      title: "System Preparation",
      description: "Prepare wiring routes, pipe connections, and installation areas before commencing repair or installation works."
    },
    {
      number: 3,
      title: "Installation & Repairs",
      description: "Carry out electrical, plumbing, and aircon installations or repairs using quality materials and proven workmanship."
    },
    {
      number: 4,
      title: "Testing & Handover",
      description: "Perform functional testing, safety inspections, and system checks before completing the project and client handover."
    }
  ],
  "solar-panel-installation": [
    {
      number: 1,
      title: "Site Assessment",
      description: "Evaluate roof condition, available installation space, sunlight exposure, and structural suitability for solar panel installation."
    },
    {
      number: 2,
      title: "System Planning",
      description: "Design an efficient panel layout and determine equipment placement based on your property's energy requirements."
    },
    {
      number: 3,
      title: "Panel Installation",
      description: "Install mounting structures, solar panels, and electrical components using safe and professional installation practices."
    },
    {
      number: 4,
      title: "Testing & Handover",
      description: "Conduct system inspections, verify electrical connections, and complete final testing before project handover."
    }
  ]
};

const sidebarData: Record<string, { heading: string; text: string }> = {
  "renovation-upgrading": {
    heading: "Your Vision, Your Space, Our Renovation",
    text: "Our structured renovation process transforms your Singapore property on time and budget. We manage design, structural permits, and premium built-in cabinetry."
  },
  "structural-exterior-works": {
    heading: "Smart Design, Quality Steel, Trusted Installation",
    text: "Our structural and exterior work process prioritises safety, precision, and long-term durability. From customised steel fabrication to professional installation, every project is completed with quality workmanship and strict attention to detail."
  },
  "painting-waterproofing": {
    heading: "Smooth Finish, Weather Shield, Long-Term Care",
    text: "Our proven painting and waterproofing process ensures durable finishes, reliable leak protection, and quality workmanship from inspection to completion."
  },
  "aluminium-glazing-works": {
    heading: "Precision Installation, Premium Aluminium, Lasting Performance",
    text: "Our aluminium and glazing solutions combine expert craftsmanship with premium materials to deliver durable, functional, and visually appealing installations for residential, commercial, and industrial properties."
  },
  "electrical-plumbing-aircon": {
    heading: "Safe Installations, Reliable Systems, Quality Assured",
    text: "Our integrated M&E solutions ensure your electrical, plumbing, and air conditioning systems operate safely, efficiently, and reliably. Every project is carefully planned, professionally executed, and thoroughly inspected for lasting performance."
  },
  "solar-panel-installation": {
    heading: "Clean Energy, Professional Installation, Reliable Performance",
    text: "Our solar installation process includes site assessment, system planning, secure rooftop mounting, and professional electrical integration to deliver reliable renewable energy performance."
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
