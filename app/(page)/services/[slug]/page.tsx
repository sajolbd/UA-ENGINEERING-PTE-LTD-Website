import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, Phone, Calendar, ArrowRight, MessageCircle } from "lucide-react";
import Container from "../../../../components/shared/Container";
import Breadcrumb from "../../../../components/layout/Breadcrumb";
import { servicesData } from "../../../../data/servicesData";
import WhyChoose from "components/home/WhyChoose";
import CallBackSection from "components/home/CallBackSection";
import PaintingFocus from "components/services/PaintingFocus";
import ServicePlan from "components/services/ServicePlan";
import ServiceAreas from "components/services/ServiceAreas";

interface PageProps {
  params: {
    slug: string;
  };
}

const categorySpecifications: Record<string, string[]> = {
  "renovation-upgrading": [
    "BCA Certified Workmanship",
    "Skilled & Experienced Team",
    "Transparent Project Pricing",
    "Quality Material Commitment",
    "On-Time Project Delivery",
    "Reliable Service Support"
  ],
  "structural-exterior-works": [
    "BCA-Compliant Workmanship",
    "Custom Design & Fabrication",
    "Premium Quality Materials",
    "Skilled Installation Team",
    "Weather-Resistant Solutions",
    "Singapore Quality Standards"
  ],
  "painting-waterproofing": [
    "15+ Years Skilled Professionals",
    "Premium Quality Materials",
    "Expert Surface Preparation",
    "Moisture & Leak Protection",
    "Weather-Resistant Coatings",
    "Free Site Inspection & Quotation"
  ],
  "aluminium-glazing-works": [
    "Premium Grade Materials",
    "Custom Aluminium Fabrication",
    "Precision Glass Installation",
    "Weather Resistant Solutions",
    "Professional Installation Team",
    "Long Lasting Performance"
  ],
  "electrical-plumbing-aircon": [
    "Professional Technicians",
    "Energy Efficient Solutions",
    "Fast Response Service",
    "Long-Term Performance",
    "End-to-End Solutions",
    "Customised Solutions"
  ],
  "solar-panel-installation": [
    "Rooftop Solar Assessment",
    "Custom Panel Layout Design",
    "Solar Panel Installation",
    "Inverter System Installation",
    "Mounting Structure Assembly",
    "Electrical System Integration",
    "Safety & Performance Testing",
    "Final System Commissioning"
  ]
};

import ServiceCategoryClient from "../../../../components/services/ServiceCategoryClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateStaticParams() {
  return servicesData.map((category) => ({
    slug: category.slug,
  }));
}

export default function ServiceCategoryPage({ params }: PageProps) {
  const category = servicesData.find((cat) => cat.slug === params.slug);

  return (
    <ServiceCategoryClient
      slug={params.slug}
      fallbackCategory={category || {
        slug: params.slug,
        title: params.slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        shortDescription: "",
        description: "",
        featuredImage: "/images/layout/breadcrumb-bg.png",
        bgImage: "/images/layout/breadcrumb-bg.png",
        services: []
      }}
    />
  );
}
