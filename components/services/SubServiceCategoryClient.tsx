"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import Container from "../shared/Container";
import Breadcrumb from "../layout/Breadcrumb";
import { useCmsData } from "../../context/CmsContext";
import { ServiceCategory, SubService } from "../../data/servicesData";

const AssessmentIcon = () => (
  <svg className="h-9 w-9 transition-all duration-300 group-hover:scale-110" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="assessGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#641215" />
        <stop offset="100%" stopColor="#b91c1c" />
      </linearGradient>
      <linearGradient id="assessGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#102039" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
    </defs>
    <rect x="16" y="14" width="32" height="40" rx="3" stroke="url(#assessGrad2)" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M26 14V10C26 8.9 26.9 8 28 8H36C37.1 8 38 8.9 38 10V14H26Z" fill="url(#assessGrad1)" />
    <path d="M24 26H34" stroke="url(#assessGrad2)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M24 34H40" stroke="url(#assessGrad2)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M24 42H38" stroke="url(#assessGrad2)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M38 24L40 26L45 21" stroke="url(#assessGrad1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DesignIcon = () => (
  <svg className="h-9 w-9 transition-all duration-300 group-hover:scale-110" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="designGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#102039" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <linearGradient id="designGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#641215" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="20" stroke="url(#designGrad1)" strokeWidth="2.5" strokeDasharray="3 3" />
    <path d="M32 10L22 48" stroke="url(#designGrad1)" strokeWidth="3" strokeLinecap="round" />
    <path d="M32 10L42 48" stroke="url(#designGrad1)" strokeWidth="3" strokeLinecap="round" />
    <path d="M25 40H39" stroke="url(#designGrad2)" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="32" cy="10" r="4" fill="url(#designGrad2)" />
  </svg>
);

const ApprovalIcon = () => (
  <svg className="h-9 w-9 transition-all duration-300 group-hover:scale-110" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="appGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ca8a04" />
        <stop offset="100%" stopColor="#eab308" />
      </linearGradient>
      <linearGradient id="appGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#102039" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
    </defs>
    <path d="M16 10V54C16 55.7 17.3 57 19 57H47C48.7 57 50 55.7 50 54V22L38 10H19C17.3 10 16 11.3 16 13Z" stroke="url(#appGrad2)" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M38 10V22H50" stroke="url(#appGrad2)" strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="30" cy="40" r="9" fill="url(#appGrad1)" fillOpacity="0.15" stroke="url(#appGrad1)" strokeWidth="2.5" />
    <path d="M25 40L28 43L35 36" stroke="url(#appGrad1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HackingIcon = () => (
  <svg className="h-9 w-9 transition-all duration-300 group-hover:scale-110" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hackGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#641215" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
      <linearGradient id="hackGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#102039" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
    </defs>
    <path d="M10 44H24V52H10V44Z" fill="url(#hackGrad2)" fillOpacity="0.1" stroke="url(#hackGrad2)" strokeWidth="2" />
    <path d="M34 44H48V52H34V44Z" fill="url(#hackGrad2)" fillOpacity="0.1" stroke="url(#hackGrad2)" strokeWidth="2" />
    <path d="M18 32H38V40H18V32Z" fill="url(#hackGrad2)" fillOpacity="0.1" stroke="url(#hackGrad2)" strokeWidth="2" />
    <path d="M42 16L24 34" stroke="url(#hackGrad2)" strokeWidth="3" strokeLinecap="round" />
    <rect x="38" y="10" width="10" height="12" rx="2" transform="rotate(45 43 16)" fill="url(#hackGrad1)" stroke="url(#hackGrad1)" strokeWidth="1.5" />
    <path d="M22 26L18 24M28 20L30 16" stroke="url(#hackGrad1)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const InstallationIcon = () => (
  <svg className="h-9 w-9 transition-all duration-300 group-hover:scale-110" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="instGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0d9488" />
        <stop offset="100%" stopColor="#14b8a6" />
      </linearGradient>
      <linearGradient id="instGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#102039" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
    </defs>
    <path d="M44 20L22 42" stroke="url(#instGrad2)" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M44 20L48 16C49.8 14.2 52.8 14.2 54.6 16C56.4 17.8 56.4 20.8 54.6 22.6L50.6 26.6" stroke="url(#instGrad2)" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="22" cy="42" r="9" stroke="url(#instGrad1)" strokeWidth="3.5" />
    <path d="M22 28V32M22 56V52M8 42H12M36 42H32" stroke="url(#instGrad1)" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const VerificationIcon = () => (
  <svg className="h-9 w-9 transition-all duration-300 group-hover:scale-110" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="verGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e3a8a" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <linearGradient id="verGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0d9488" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
    </defs>
    <path d="M32 10C42 10 50 14 50 14V34C50 44 42 50 32 54C22 50 14 44 14 34V14C14 14 22 10 32 10Z" fill="url(#verGrad1)" fillOpacity="0.08" stroke="url(#verGrad1)" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M22 32L28 38L42 24" stroke="url(#verGrad2)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

import { getImageUrl } from "../../lib/api";

interface Props {
  slug: string;
  subSlug: string;
  fallbackCategory: ServiceCategory;
  fallbackService: SubService;
}

export default function SubServiceCategoryClient({ slug, subSlug, fallbackCategory, fallbackService }: Props) {
  const { servicesData } = useCmsData();
  const category = servicesData.find((cat) => cat.slug === slug) || fallbackCategory;
  const service = category?.services.find((s) => s.slug === subSlug) || fallbackService;

  if (!category || !service) return null;

  return (
    <div className="bg-slate-50/30 min-h-screen">
      {/* Dynamic Breadcrumb with subService or category background image */}
      <Breadcrumb
        title={service.breadcrumbTitle || service.title}
        description={service.description}
        bgImage={service.breadcrumbBg || category.bgImage}
      />

      <section className="py-2 lg:py-4">
        <Container>
          {/* Back button and parent link */}
          <div className="mb-4 flex flex-wrap gap-2 items-center text-xs text-slate-500 font-bold">
            <Link
              href="/services"
              className="hover:text-primary transition-colors duration-300"
            >
              Services
            </Link>
            <span>/</span>
            <Link
              href={`/services/${category.slug}`}
              className="hover:text-primary transition-colors duration-300"
            >
              {category.title}
            </Link>
            <span>/</span>
            <span className="text-secondary">{service.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
            {/* Sidebar Column */}
            <aside className="lg:col-span-3 order-2 lg:order-1 lg:sticky lg:top-36 lg:self-start flex flex-col gap-4">
              {/* Other services under the same category */}
              <div className="bg-white border border-slate-100/80 rounded-2xl p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
                <h3 className="text-lg font-extrabold text-secondary border-b border-slate-100 pb-4 mb-5">
                  More in {category.title}
                </h3>
                <nav className="flex flex-col gap-2.5">
                  {category.services.map((s) => {
                    const isActive = s.slug === subSlug;
                    return (
                      <Link
                        key={s.slug}
                        href={`/services/${category.slug}/${s.slug}`}
                        className={`group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 border ${isActive
                          ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                          : "bg-white border-slate-100 shadow-sm text-slate-600 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30 hover:text-primary"
                          }`}
                      >
                        <span>{s.title}</span>
                        <ArrowRight size={14} className={`transition-all duration-300 ${isActive ? "text-white" : "text-slate-400 group-hover:text-primary group-hover:translate-x-0.5"}`} />
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Main Content Column */}
            <main className="lg:col-span-9 order-1 lg:order-2">
              {/* Service Cover Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-100/50 mb-4">
                <Image
                  src={getImageUrl(service.image)}
                  alt={service.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Service Title & Long Description */}
              <div className="bg-white border border-slate-100/80 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] mb-4">
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Contracting & Engineering
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-secondary tracking-tight">
                  {service.title} Overview
                </h2>
                <div className="mt-3 h-1 w-20 bg-primary rounded" />
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
                  {service.longDescription}
                </p>
              </div>

              {/* Key Features / Work Scope */}
              {service.features && service.features.length > 0 && (
                <div className="bg-white border border-slate-100/80 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] mb-4">
                  <h3 className="text-lg font-extrabold text-secondary mb-5 flex items-center gap-2.5">
                    <Cpu size={18} className="text-primary" />
                    <span>Work Scope & Inclusions</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-3 p-2.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                        <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                        <span className="text-sm font-semibold text-slate-700 leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Why Choose Us / Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="bg-white border border-slate-100/80 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] mb-4">
                  <h3 className="text-lg font-extrabold text-secondary mb-5 flex items-center gap-2.5">
                    <ShieldCheck size={18} className="text-primary" />
                    <span>Why Choose UA Engineering?</span>
                  </h3>
                  <div className="flex flex-col gap-3">
                    {service.benefits.map((benefit, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary font-bold text-xs">
                          {i + 1}
                        </div>
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                          {benefit}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Execution Process Timeline / Flow Chart */}
              {((service.processSteps && service.processSteps.length > 0) || (service.process && service.process.length > 0)) && (
                <div className="bg-white border border-slate-100/80 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
                  <h3 className="text-lg font-extrabold text-secondary mb-6">
                    Our Work Process Flow
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 relative">
                    {(() => {
                      const stepsToRender = (service.processSteps && service.processSteps.length > 0)
                        ? service.processSteps
                        : service.process.map((step, i) => {
                            const defaultSteps = ["Assessment", "Design", "Approval", "Hacking", "Installation", "Verification"];
                            let stepTitle = defaultSteps[i] || `Phase ${i + 1}`;
                            let stepDesc = step;

                            if (typeof step === "string" && (step.includes(":") || step.includes("–") || step.includes(" - "))) {
                              const parts = step.split(/[:–]|\s-\s/);
                              if (parts.length > 1) {
                                stepTitle = parts[0].trim();
                                stepDesc = parts.slice(1).join(":").trim();
                              }
                            }
                            return { title: stepTitle, description: stepDesc };
                          });

                      return stepsToRender.map((stepObj, i) => {
                        const icons = [
                          <AssessmentIcon key="assess" />,
                          <DesignIcon key="design" />,
                          <ApprovalIcon key="app" />,
                          <HackingIcon key="hack" />,
                          <InstallationIcon key="inst" />,
                          <VerificationIcon key="ver" />
                        ];
                        const icon = icons[i] || <CheckCircle2 size={22} className="text-primary" />;

                        return (
                          <div
                            key={i}
                            className="group relative flex flex-col justify-between bg-slate-50/50 border border-slate-100/80 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/20 min-h-[160px]"
                          >
                            {i < stepsToRender.length - 1 && (
                              <div className="hidden md:block absolute top-1/2 -right-2.5 -translate-y-1/2 z-10 opacity-60">
                                <ArrowRight size={14} className="text-slate-300 group-hover:text-primary transition-all duration-300" />
                              </div>
                            )}

                            <div className="flex items-center justify-between mb-3">
                              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100/50 border border-slate-150 shadow-sm group-hover:bg-white group-hover:border-primary/20 transition-all duration-300">
                                {icon}
                              </div>
                              <span className="text-[10px] font-extrabold text-slate-400 group-hover:text-primary transition-colors duration-300 uppercase tracking-widest">
                                Step 0{i + 1}
                              </span>
                            </div>

                            <div>
                              <h4 className="text-sm sm:text-base font-extrabold text-secondary mb-1">
                                {stepObj.title}
                              </h4>
                              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                                {stepObj.description}
                              </p>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              )}
            </main>
          </div>
        </Container>
      </section>
    </div>
  );
}
