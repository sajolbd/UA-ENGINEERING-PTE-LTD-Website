"use client";

import React from "react";
import {
  PhoneCall,
  FileText,
  Wrench,
  Sparkles,
  Check,
} from "lucide-react";
import Container from "components/shared/Container";
import { useCmsData } from "../../context/CmsContext";

const STEP_ICONS = [PhoneCall, FileText, Wrench, Sparkles];

const DEFAULT_STEPS = [
  {
    id: 1,
    tag: "STEP 01",
    title: "Consultation & Site Assessment",
    description:
      "We discuss your renovation goals, inspect the property, take accurate measurements, assess technical requirements, and recommend practical solutions to develop a clear and efficient project plan.",
    milestones: [
      "Free consultation and site inspection",
      "Detailed technical assessment",
      "Structural and feasibility evaluation",
      "Accurate measurements",
    ],
  },
  {
    id: 2,
    tag: "STEP 02",
    title: "Proposal & Project Planning",
    description:
      "We prepare a transparent quotation covering scope, materials, pricing, and timeline. After approval, we organise resources, scheduling, and project planning for smooth execution.",
    milestones: [
      "Detailed itemised quotation",
      "Transparent pricing",
      "Material recommendations",
      "Project scheduling",
    ],
  },
  {
    id: 3,
    tag: "STEP 03",
    title: "Professional Execution & Quality Control",
    description:
      "Our skilled team completes every project safely under experienced supervision, following BCA and HDB standards while maintaining strict quality control throughout every stage.",
    milestones: [
      "Experienced project supervisors",
      "Certified skilled workers",
      "Premium construction materials",
      "Continuous quality inspections",
    ],
  },
  {
    id: 4,
    tag: "STEP 04",
    title: "Completion, Handover & After-Sales Support",
    description:
      "After final inspections and site cleaning, we hand over the completed project with warranty information, maintenance guidance, and responsive after-sales support for your peace of mind.",
    milestones: [
      "Final quality inspection",
      "Complete project walkthrough",
      "Site cleaning and finishing",
      "Warranty documentation",
    ],
  },
];

export default function OurProcess() {
  const { cmsData } = useCmsData();
  const aboutContent = (cmsData as any)?.about?.content || {};

  const processBadge = aboutContent.processBadge || "HOW WE WORK";
  const processHeading = aboutContent.processHeading || "Our Process";
  const processSubheading = aboutContent.processSubheading || "Every successful renovation begins with proper planning and professional execution. At UA Engineering, we follow a proven project management process that ensures efficiency, quality, and complete customer confidence from the initial consultation through project completion.";

  let stepsList = DEFAULT_STEPS;
  if (aboutContent.processStepsJson) {
    try {
      const parsed = JSON.parse(aboutContent.processStepsJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        stepsList = parsed;
      }
    } catch (e) {
      console.error("Failed to parse dynamic about processStepsJson:", e);
    }
  }

  return (
    <section className="bg-slate-50 py-8 lg:py-12 border-t border-slate-100 overflow-hidden">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-20">
          <span className="text-sm font-bold uppercase tracking-widest text-primary">
            {processBadge}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
            {processHeading}
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded bg-primary" />
          <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
            {processSubheading}
          </p>
        </div>

        {/* Process Cards 2-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 w-full">
          {stepsList.map((item, index) => {
            const Icon = STEP_ICONS[index % STEP_ICONS.length] || Wrench;
            const milestones = Array.isArray(item.milestones) ? item.milestones : [];

            return (
              <div
                key={item.id || index}
                className="group flex flex-col justify-between p-8 rounded-2xl border border-slate-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(100,18,21,0.08)] hover:border-primary/10"
              >
                <div>
                  {/* Card Header (Icon & Tag) */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary border border-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                      <Icon className="h-5.5 w-5.5 transition-transform duration-300 group-hover:rotate-12" strokeWidth={2.5} />
                    </div>
                    <span className="text-xs font-black tracking-widest text-primary uppercase bg-primary/5 px-3.5 py-1.5 rounded-full">
                      {item.tag || `STEP 0${index + 1}`}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-secondary tracking-tight leading-snug mb-3 transition-colors duration-200 group-hover:text-primary">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-slate-500 font-medium mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Milestones list */}
                {milestones.length > 0 && (
                  <ul className="space-y-3 border-t border-slate-150 pt-5 mt-auto">
                    {milestones.map((milestone: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5 group/item">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-sm transition-transform duration-200 group-hover/item:scale-115 mt-0.5">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700 transition-colors duration-250 group-hover/item:text-primary">
                          {milestone}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
