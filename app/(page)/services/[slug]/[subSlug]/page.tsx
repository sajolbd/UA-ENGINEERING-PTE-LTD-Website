import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, Cpu, ClipboardCheck, Compass, FileCheck, Hammer, Wrench } from "lucide-react";
import Container from "../../../../../components/shared/Container";
import Breadcrumb from "../../../../../components/layout/Breadcrumb";
import { servicesData } from "../../../../../data/servicesData";

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

import SubServiceCategoryClient from "../../../../../components/services/SubServiceCategoryClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateStaticParams() {
  const params: { slug: string; subSlug: string }[] = [];

  servicesData.forEach((category) => {
    category.services.forEach((subService) => {
      params.push({
        slug: category.slug,
        subSlug: subService.slug,
      });
    });
  });

  return params;
}

interface PageProps {
  params: {
    slug: string;
    subSlug: string;
  };
}

export default function SubServicePage({ params }: PageProps) {
  const category = servicesData.find((cat) => cat.slug === params.slug);
  const service = category?.services.find((s) => s.slug === params.subSlug);

  return (
    <SubServiceCategoryClient
      slug={params.slug}
      subSlug={params.subSlug}
      fallbackCategory={category || {
        slug: params.slug,
        title: params.slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        shortDescription: "",
        description: "",
        featuredImage: "/images/layout/breadcrumb-bg.png",
        bgImage: "/images/layout/breadcrumb-bg.png",
        services: []
      }}
      fallbackService={service || {
        slug: params.subSlug,
        title: params.subSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        image: "/images/layout/breadcrumb-bg.png",
        description: "",
        longDescription: "",
        features: [],
        benefits: [],
        process: []
      }}
    />
  );
}
