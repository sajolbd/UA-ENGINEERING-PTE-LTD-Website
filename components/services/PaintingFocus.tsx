import React from "react";
import Image from "next/image";
import Container from "../shared/Container";
import { CheckCircle2, XCircle, Home, Building2, Store, Landmark, ShieldCheck } from "lucide-react";

const targetSpaces = [
  { title: "HDB Flats", icon: Home },
  { title: "Condominiums", icon: Building2 },
  { title: "Landed Houses", icon: Landmark },
  { title: "Office Buildings", icon: Building2 },
  { title: "Retail Shops", icon: Store },
];

const uaAdvantages = [
  {
    title: "Thorough Site Assessment",
    desc: "We inspect surface conditions, moisture issues, and coating failures before recommending the most suitable painting or waterproofing solution.",
  },
  {
    title: "Quality Materials & Proven Systems",
    desc: "We use trusted paints, waterproof coatings, and proven application methods designed for Singapore's humid and rainy climate.",
  },
  {
    title: "Skilled & Neat Workmanship",
    desc: "Every project is completed with careful surface preparation, precise application, and a clean worksite from start to finish.",
  },
  {
    title: "Reliable Project Delivery",
    desc: "Clear communication, transparent quotations, timely completion, and final quality inspections ensure a smooth customer experience.",
  },
];

const typicalShortcomings = [
  {
    title: "Limited Surface Preparation",
    desc: "Skipping proper cleaning or repairs may reduce paint adhesion and shorten the lifespan of waterproofing systems.",
  },
  {
    title: "Generic Material Selection",
    desc: "Using unsuitable materials or application methods may lead to fading, peeling, or recurring water seepage.",
  },
  {
    title: "Inconsistent Workmanship",
    desc: "Uneven finishes, poor detailing, or inadequate waterproofing can affect both appearance and long-term performance.",
  },
  {
    title: "Higher Long-Term Maintenance",
    desc: "Poor preparation and application may require frequent repairs, repainting, or additional waterproofing work over time.",
  },
];

interface PaintingFocusProps {
  slug?: string;
}

const aluminiumSpaces = [
  { title: "Residential Properties", icon: Home },
  { title: "Commercial Buildings", icon: Building2 },
  { title: "Retail & Offices", icon: Store },
  { title: "Industrial Facilities", icon: Landmark },
];

const mepSpaces = [
  { title: "HDB Flats", icon: Home },
  { title: "Condominiums", icon: Building2 },
  { title: "Commercial Offices", icon: Building2 },
  { title: "Retail Shops", icon: Store },
];

const solarSpaces = [
  { title: "Landed Homes", icon: Home },
  { title: "Condominiums", icon: Building2 },
  { title: "Commercial Buildings", icon: Building2 },
  { title: "Retail Properties", icon: Store },
];

const solarAdvantages = [
  {
    title: "Professional Site Assessment",
    desc: "Every installation begins with a detailed roof assessment to determine structural suitability, panel placement, and sunlight exposure for optimal system performance.",
  },
  {
    title: "Quality Installation Standards",
    desc: "Our team installs solar panels using reliable mounting systems, quality components, and proven installation practices for long-term durability.",
  },
  {
    title: "Tailored System Planning",
    desc: "Each solar installation is planned according to your property's roof layout, available space, and energy requirements for efficient performance.",
  },
  {
    title: "Thorough System Verification",
    desc: "We inspect all installed components, electrical connections, and mounting structures to ensure the system is ready for safe operation.",
  },
];

const solarShortcomings = [
  {
    title: "Unsuitable Roof Planning",
    desc: "Poor panel placement or inadequate roof assessment can reduce solar energy generation and long-term system efficiency.",
  },
  {
    title: "Substandard Installation",
    desc: "Improper mounting or electrical connections may affect system reliability, safety, and overall installation quality.",
  },
  {
    title: "Inferior Components",
    desc: "Low-quality materials and mounting hardware can reduce durability and increase maintenance requirements over time.",
  },
  {
    title: "Limited Project Support",
    desc: "Poor communication and insufficient project coordination can result in delays and an unsatisfactory installation experience.",
  },
];

const mepAdvantages = [
  {
    title: "Integrated Building Solutions",
    desc: "We coordinate electrical, plumbing, and air conditioning works under one team, improving project efficiency and reducing unnecessary scheduling delays.",
  },
  {
    title: "Qualified Technical Team",
    desc: "Our experienced technicians perform installations, repairs, and maintenance with careful workmanship, practical solutions, and attention to safety.",
  },
  {
    title: "Quality Materials & Components",
    desc: "We use reliable electrical accessories, plumbing fittings, and air conditioning components selected for durability and dependable long-term performance.",
  },
  {
    title: "Thorough System Testing",
    desc: "Every completed installation and repair is checked to verify proper operation, safety, and overall system performance before handover.",
  },
];

const mepShortcomings = [
  {
    title: "Multiple Contractor Coordination",
    desc: "Managing separate contractors for electrical, plumbing, and aircon works can create scheduling conflicts and communication gaps.",
  },
  {
    title: "Unclear Work Scope",
    desc: "Poor planning or incomplete quotations may lead to unexpected variations, additional costs, or project delays during execution.",
  },
  {
    title: "Inconsistent Workmanship",
    desc: "Improper installations or overlooked details can affect system reliability, operational efficiency, and future maintenance requirements.",
  },
  {
    title: "Limited Post-Service Support",
    desc: "Without dependable after-service assistance, resolving defects or operational issues may become slower and more inconvenient.",
  },
];

const aluminiumAdvantages = [
  {
    title: "Customised Solutions",
    desc: "Every project is designed and fabricated to suit your property's exact dimensions and functional requirements.",
  },
  {
    title: "Quality Materials",
    desc: "We use premium aluminium profiles and quality glazing materials for reliable performance and lasting durability.",
  },
  {
    title: "Precision Workmanship",
    desc: "Our experienced team ensures accurate measurements, professional installation, and attention to every detail.",
  },
  {
    title: "Timely Project Delivery",
    desc: "Projects are completed efficiently with careful planning to minimise disruption to your home or business.",
  },
  {
    title: "Transparent Communication",
    desc: "Clear quotations, project updates, and responsive support from consultation through project completion.",
  },
  {
    title: "Neat & Safe Workmanship",
    desc: "We maintain an organised worksite and follow safe installation practices throughout every stage of the project.",
  },
  {
    title: "Reliable Project Support",
    desc: "From consultation to final inspection, we focus on delivering dependable service and customer satisfaction.",
  },
  {
    title: "Versatile Applications",
    desc: "Providing aluminium and glazing solutions for residential, commercial, and industrial properties across Singapore.",
  },
];

interface PaintingFocusProps {
  slug?: string;
  category?: any;
}

function getIconForSpaceTitle(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("flat") || lower.includes("home") || lower.includes("house") || lower.includes("resident")) return Home;
  if (lower.includes("shop") || lower.includes("retail") || lower.includes("store")) return Store;
  if (lower.includes("land") || lower.includes("facility") || lower.includes("industrial")) return Landmark;
  return Building2;
}

export default function PaintingFocus({ slug, category }: PaintingFocusProps) {
  const isAluminium = slug === "aluminium-glazing-works";
  const isMEP = slug === "electrical-plumbing-aircon";
  const isSolar = slug === "solar-panel-installation";

  const currentSpaces = isAluminium
    ? aluminiumSpaces
    : isMEP
    ? mepSpaces
    : isSolar
    ? solarSpaces
    : targetSpaces;

  const badgeText = category?.targetBadge || (
    isAluminium
      ? "Specialised Applications"
      : isMEP
      ? "Served Properties"
      : isSolar
      ? "Property Coverage"
      : "Target Properties"
  );

  const headingText = category?.targetHeading || (
    isAluminium
      ? "Applications We Specialise In"
      : isMEP
      ? "Properties We Proudly Serve"
      : isSolar
      ? "Solar Solutions for Every Property"
      : "Professional Solutions for Every Space"
  );

  const subheadingText = category?.targetSubheading || (
    isAluminium
      ? "Tailored aluminium and glazing solutions for a wide range of residential, commercial, and industrial environments."
      : isMEP
      ? "Delivering dependable electrical, plumbing, and air conditioning solutions for every type of property across Singapore."
      : isSolar
      ? "Professional rooftop solar panel installations tailored for residential and commercial properties seeking clean, efficient renewable energy across Singapore."
      : "Enhancing and protecting homes, offices, retail spaces, and industrial facilities with expert workmanship."
  );

  const displaySpaces = (category?.targetSpaces && category.targetSpaces.length > 0)
    ? category.targetSpaces.map((title: string) => ({
        title,
        icon: getIconForSpaceTitle(title)
      }))
    : currentSpaces;

  return (
    <div className="flex flex-col gap-12 lg:gap-16 py-12 lg:py-16 bg-slate-50/50 border-t border-slate-100">
      {/* Section 6: Applications / Target Properties */}
      <section className="bg-secondary text-white py-12 lg:py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-300 bg-white/10 px-3 py-1.5 rounded-full">
              {badgeText}
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {headingText}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              {subheadingText}
            </p>
          </div>

          <div
            className={`grid grid-cols-2 ${
              displaySpaces.length <= 4
                ? "sm:grid-cols-4 lg:grid-cols-4"
                : "sm:grid-cols-3 lg:grid-cols-5"
            } gap-4 sm:gap-6 max-w-5xl mx-auto`}
          >
            {displaySpaces.map((space: { title: string; icon: any }) => {
              const Icon = space.icon;
              return (
                <div
                  key={space.title}
                  className="group flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl text-center transition-all duration-300 hover:bg-primary hover:border-primary hover:-translate-y-1 shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white mb-4 group-hover:bg-white/20 transition-colors duration-300">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {space.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
