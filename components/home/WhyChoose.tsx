"use client";

import { ThumbsUp, ThumbsDown } from "lucide-react";
import Container from "components/shared/Container";
import { useCmsData } from "../../context/CmsContext";

export default function WhyChoose() {
  const { cmsData } = useCmsData();
  const homeContent = (cmsData as any)?.home?.content || {};
  const whyChooseBadge = homeContent.whyChooseBadge || "UA ADVANTAGE";
  const whyChooseHeading = homeContent.whyChooseHeading || "Why Choose UA Engineering?";

  const uaBenefits = [
    {
      title: homeContent.whyCard1Title || "Complete Building Solutions",
      description: homeContent.whyCard1Desc || "From renovation and structural works to M&E, glazing, waterproofing, and solar, one trusted team handles every project.",
    },
    {
      title: homeContent.whyCard2Title || "Quality Workmanship",
      description: homeContent.whyCard2Desc || "Every project is completed with skilled workmanship, quality materials, and attention to detail for lasting performance.",
    },
    {
      title: homeContent.whyCard3Title || "Honest & Transparent Pricing",
      description: homeContent.whyCard3Desc || "Clear quotations, fair pricing, and no hidden costs, so you can plan your project with confidence.",
    },
    {
      title: homeContent.whyCard4Title || "Reliable Project Management",
      description: homeContent.whyCard4Desc || "We coordinate every stage efficiently, keeping projects organized, on schedule, and completed to high standards.",
    },
  ];

  const traditionalIssues = [
    {
      title: homeContent.issue1Title || "Multiple Contractors to Manage",
      description: homeContent.issue1Desc || "Hiring separate contractors often leads to delays, communication gaps, and inconsistent workmanship across different stages of the project.",
    },
    {
      title: homeContent.issue2Title || "Poor Workmanship",
      description: homeContent.issue2Desc || "Low-quality materials and rushed installation can result in recurring repairs, higher maintenance costs, and reduced durability.",
    },
    {
      title: homeContent.issue3Title || "Unclear Pricing",
      description: homeContent.issue3Desc || "Unexpected charges and incomplete quotations can increase project costs and create unnecessary stress during construction.",
    },
    {
      title: homeContent.issue4Title || "Delays & Poor Communication",
      description: homeContent.issue4Desc || "Lack of planning and communication often causes missed deadlines, project disruptions, and uncertainty throughout the construction process.",
    },
  ];

  return (
    <section className="bg-slate-50 py-8 lg:py-12">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {whyChooseBadge}
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-secondary sm:text-5xl">
            {whyChooseHeading}
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded bg-primary" />
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* Left Card - UA Engineering */}
          <div className="rounded-3xl border-2 border-secondary/10 bg-white p-6 shadow-sm transition-all duration-300 hover:border-secondary hover:shadow-xl sm:p-8">
            <h3 className="mb-10 text-center text-2xl font-black text-secondary leading-snug">
              UA ENGINEERING PTE. LTD.
            </h3>

            <div className="space-y-8">
              {uaBenefits.map((benefit) => (
                <div key={benefit.title} className="group flex gap-4 items-start">
                  {/* Circle Icon Badge */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-secondary/30 bg-secondary/5 text-secondary transition-all duration-300 group-hover:bg-secondary group-hover:text-white group-hover:scale-110">
                    <ThumbsUp size={20} className="transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:-translate-y-0.5 group-hover:rotate-[15deg]" />
                  </div>

                  {/* Text Description */}
                  <div>
                    <h4 className="text-lg font-bold text-secondary transition-colors duration-300">
                      {benefit.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card - Common Contractor Challenges */}
          <div className="rounded-3xl border-2 border-primary/10 bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-xl sm:p-8">
            <h3 className="mb-10 text-center text-2xl font-black text-secondary leading-snug">
              Common Contractor Challenges
            </h3>

            <div className="space-y-8">
              {traditionalIssues.map((issue) => (
                <div key={issue.title} className="group flex gap-4 items-start">
                  {/* Circle Icon Badge */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/5 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                    <ThumbsDown size={20} className="transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:translate-y-0.5 group-hover:-rotate-[15deg]" />
                  </div>

                  {/* Text Description */}
                  <div>
                    <h4 className="text-lg font-bold text-primary transition-colors duration-300">
                      {issue.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {issue.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
