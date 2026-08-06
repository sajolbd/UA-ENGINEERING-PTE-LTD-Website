import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, Phone, Calendar, ArrowRight, MessageCircle } from "lucide-react";
import Container from "../../../../components/shared/Container";
import Breadcrumb from "../../../../components/layout/Breadcrumb";
import { servicesData } from "../../../../data/servicesData";
import WhyChoose from "components/home/WhyChoose";
import PaintingFocus from "components/services/PaintingFocus";
import ServicePlan from "components/services/ServicePlan";
import ServiceProcess from "components/services/ServiceProcess";
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
    "Solar PV Installation",
    "Rooftop Solar Systems",
    "Secure Roof Mounting",
    "Weather-Resistant Installation",
    "Precision Workmanship",
    "Clean Energy Solutions"
  ]
};

// Generate static params for Next.js build optimization
export async function generateStaticParams() {
  return servicesData.map((category) => ({
    slug: category.slug,
  }));
}

export default function ServiceCategoryPage({ params }: PageProps) {
  const category = servicesData.find((cat) => cat.slug === params.slug);
  const specs = category ? (categorySpecifications[category.slug] || []) : [];

  if (!category) {
    notFound();
  }

  return (
    <div className="bg-slate-50/30 min-h-screen">
      {/* Dynamic Breadcrumb with category background image */}
      <Breadcrumb
        title={category.title}
        description={category.shortDescription}
        bgImage={category.bgImage}
      />

      <section className="py-2 lg:py-4">
        <Container>
          {/* Back button */}
          <div className="mb-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-primary transition-colors duration-300"
            >
              <ArrowLeft size={14} />
              <span>Back to all categories</span>
            </Link>
          </div>

          {/* Intro Section with Category Featured Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center mb-6">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-md">
                UA Engineering Pte Ltd
              </span>
              <h2 className="mt-4 text-3xl font-extrabold text-secondary tracking-tight sm:text-4xl lg:text-5xl leading-tight">
                {category.title.toLowerCase().startsWith("professional")
                  ? category.title
                  : `Professional ${category.title}`}
              </h2>
              <div className="mt-4 h-1 w-20 bg-primary rounded" />
              <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
                {category.description}
              </p>

              {/* Key Specifications Grid */}
              <div className="mt-6 border-t border-slate-100 pt-6">
                <h4 className="text-base font-extrabold text-secondary tracking-tight mb-4">
                  Key Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-slate-600 leading-relaxed">
                        {spec}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://calendly.com/uaengineering"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:shadow-xl hover:shadow-secondary/20"
                >
                  <Calendar size={16} />
                  <span>Get Free Quote</span>
                </a>
                <a
                  href={`https://wa.me/6598411786?text=Hello%20UA%20Engineering%2C%20I%20would%20like%20to%20discuss%20about%20${encodeURIComponent(category.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-slate-200/50">
                <Image
                  src={category.featuredImage}
                  alt={category.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary-200 mb-1">
                    Featured Project Area
                  </div>
                  <h4 className="text-lg font-bold leading-snug">
                    {category.title} Solutions
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-services Grid List */}
          <div id="services-list" className="scroll-mt-24">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <h3 className="text-2xl font-extrabold text-secondary sm:text-3xl">
                {category.slug === "painting-waterproofing"
                  ? "Our Painting & Waterproofing Services"
                  : category.slug === "structural-exterior-works"
                    ? "What We Offer Under Structural & Exterior Works"
                    : category.slug === "electrical-plumbing-aircon"
                      ? "What We Offer Under Electrical, Plumbing & Aircon"
                      : `What We Offer Under ${category.title}`}
              </h3>
              <p className="mt-3 text-slate-500 text-sm sm:text-base">
                {category.slug === "painting-waterproofing"
                  ? "Discover our comprehensive painting and waterproofing solutions designed to protect, enhance, and extend the lifespan of residential and commercial properties in Singapore."
                  : category.slug === "structural-exterior-works"
                    ? "Explore our expert structural and exterior work services, delivering durable, customised solutions for residential and commercial properties across Singapore."
                    : category.slug === "electrical-plumbing-aircon"
                      ? "Discover our comprehensive electrical, plumbing, and aircon solutions, professionally delivered for safe, reliable, and efficient property performance."
                      : "Discover our specific range of professional contracting services designed to meet Singapore regulatory standards."}
              </p>
            </div>

            <div
              className={`grid grid-cols-1 ${category.services.length === 1
                  ? "max-w-md mx-auto"
                  : category.services.length === 2
                    ? "md:grid-cols-2 max-w-4xl mx-auto"
                    : "md:grid-cols-2 lg:grid-cols-3"
                } gap-6 lg:gap-8 justify-center`}
            >
              {category.services.map((service, index) => (
                <Link
                  key={service.title}
                  href={`/services/${category.slug}/${service.slug}`}
                  className="group relative flex flex-col transition-all duration-500 ease-in-out hover:-translate-y-2 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)] hover:drop-shadow-[0_25px_50px_rgba(100,18,21,0.24)]"
                >
                  <div className="w-full h-full flex flex-col rounded-2xl overflow-hidden">
                    <div
                      className="w-full h-full flex flex-col bg-[#FDFDFD] group-hover:bg-primary transition-all duration-500 ease-in-out"
                      style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%)" }}
                    >
                      {/* Card Image */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50 border-b border-slate-100/50">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-350" />
                        <div className="absolute top-4 left-4">
                          <span className="inline-block rounded-md bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary shadow-sm">
                            Service {index + 1}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 flex flex-col flex-grow">
                        <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-secondary transition-colors duration-500 group-hover:text-white mb-3">
                          {service.title}
                        </h4>

                        <p className="text-sm leading-relaxed text-slate-500 transition-colors duration-500 group-hover:text-white/80 mb-4 flex-grow">
                          {service.description}
                        </p>

                        {service.features && service.features.length > 0 && (
                          <div className="mb-4">
                            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 transition-colors duration-500 group-hover:text-white/60">
                              Key Specifications:
                            </h5>
                            <ul className="grid grid-cols-1 gap-1.5">
                              {service.features.slice(0, 3).map((feat) => (
                                <li key={feat} className="flex items-start gap-2 text-xs text-slate-600 font-semibold transition-colors duration-500 group-hover:text-white/90">
                                  <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5 transition-colors duration-500 group-hover:text-white" />
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-bold text-primary transition-colors duration-500 group-hover:text-white">
                          <span>Learn More & Specifications</span>
                          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quote Banner */}
          <div className="mt-8 sm:mt-12 rounded-3xl bg-secondary p-5 sm:p-6 lg:p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-secondary to-secondary opacity-70" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                  Need a Professional Assessment?
                </h3>
                <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                  Contact UA Engineering today. Our qualified construction engineers and specialists will assess your site requirements and provide an accurate, obligation-free quotation.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:bg-white hover:text-secondary hover:translate-y-[-2px] text-center"
                >
                  <Calendar size={16} />
                  <span>Request Site Visit</span>
                </Link>
                <a
                  href="tel:+6588888888" // Replace with real company number or fallback
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-white/20 hover:translate-y-[-2px] text-center"
                >
                  <Phone size={16} />
                  <span>Call Us Now</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <ServicePlan slug={category.slug} categoryTitle={category.title} />
      {category.slug === "solar-panel-installation" ? (
        <ServiceProcess
          introText="Our solar installation process includes site assessment, system planning, secure rooftop mounting, and professional electrical integration to deliver reliable renewable energy performance."
          heading={
            <>
              Clean Energy,<br />
              Professional Installation,<br />
              Reliable Performance
            </>
          }
          steps={[
            {
              number: 1,
              title: "Site Assessment",
              description: "Evaluate roof condition, available installation space, sunlight exposure, and structural suitability for solar panel installation.",
              color: "text-sky-500",
              bgColor: "bg-sky-500",
            },
            {
              number: 2,
              title: "System Planning",
              description: "Design an efficient panel layout and determine equipment placement based on your property's energy requirements.",
              color: "text-amber-500",
              bgColor: "bg-amber-500",
            },
            {
              number: 3,
              title: "Panel Installation",
              description: "Install mounting structures, solar panels, and electrical components using safe and professional installation practices.",
              color: "text-purple-600",
              bgColor: "bg-purple-600",
            },
            {
              number: 4,
              title: "Testing & Handover",
              description: "Conduct system inspections, verify electrical connections, and complete final testing before project handover.",
              color: "text-green-600",
              bgColor: "bg-green-600",
              isLast: true,
            },
          ]}
        />
      ) : category.slug === "electrical-plumbing-aircon" ? (
        <ServiceProcess
          introText="Our integrated M&E solutions ensure your electrical, plumbing, and air conditioning systems operate safely, efficiently, and reliably. Every project is carefully planned, professionally executed, and thoroughly inspected for lasting performance."
          heading={
            <>
              Safe Installations,<br />
              Reliable Systems,<br />
              Quality Assured
            </>
          }
          steps={[
            {
              number: 1,
              title: "Site Assessment",
              description: "Inspect existing electrical, plumbing, and aircon systems, identify issues, and confirm the required work scope.",
              color: "text-sky-500",
              bgColor: "bg-sky-500",
            },
            {
              number: 2,
              title: "System Preparation",
              description: "Prepare wiring routes, pipe connections, and installation areas before commencing repair or installation works.",
              color: "text-amber-500",
              bgColor: "bg-amber-500",
            },
            {
              number: 3,
              title: "Installation & Repairs",
              description: "Carry out electrical, plumbing, and aircon installations or repairs using quality materials and proven workmanship.",
              color: "text-purple-600",
              bgColor: "bg-purple-600",
            },
            {
              number: 4,
              title: "Testing & Handover",
              description: "Perform functional testing, safety inspections, and system checks before completing the project and client handover.",
              color: "text-green-600",
              bgColor: "bg-green-600",
              isLast: true,
            },
          ]}
        />
      ) : category.slug === "aluminium-glazing-works" ? (
        <ServiceProcess
          introText="Our aluminium and glazing solutions combine expert craftsmanship with premium materials to deliver durable, functional, and visually appealing installations for residential, commercial, and industrial properties."
          heading={
            <>
              Precision Installation,<br />
              Premium Aluminium,<br />
              Lasting Performance
            </>
          }
          steps={[
            {
              number: 1,
              title: "Site Assessment",
              description: "We inspect the installation area, take accurate measurements, and recommend the most suitable aluminium and glazing solution.",
              color: "text-sky-500",
              bgColor: "bg-sky-500",
            },
            {
              number: 2,
              title: "Custom Fabrication",
              description: "Aluminium frames, glass panels, and accessories are fabricated to precise specifications for a seamless fit.",
              color: "text-amber-500",
              bgColor: "bg-amber-500",
            },
            {
              number: 3,
              title: "Professional Installation",
              description: "Our experienced technicians install every component with precision, ensuring strength, safety, and a clean finish.",
              color: "text-purple-600",
              bgColor: "bg-purple-600",
            },
            {
              number: 4,
              title: "Final Inspection",
              description: "Every installation undergoes quality checks, operational testing, and a thorough site cleanup before project handover.",
              color: "text-green-600",
              bgColor: "bg-green-600",
              isLast: true,
            },
          ]}
        />
      ) : category.slug === "painting-waterproofing" ? (
        <ServiceProcess
          introText="Our proven painting and waterproofing process ensures durable finishes, reliable leak protection, and quality workmanship from inspection to completion."
          heading={
            <>
              Smooth Finish,<br />
              Weather Shield,<br />
              Long-Term Care
            </>
          }
          steps={[
            {
              number: 1,
              title: "Site Inspection & Assessment",
              description: "Inspect surfaces, identify leaks, cracks, and moisture-related issues.",
              color: "text-sky-500",
              bgColor: "bg-sky-500",
            },
            {
              number: 2,
              title: "Surface Preparation",
              description: "Clean, repair, patch, and prepare surfaces for lasting adhesion.",
              color: "text-amber-500",
              bgColor: "bg-amber-500",
            },
            {
              number: 3,
              title: "Painting & Waterproofing",
              description: "Apply premium paints, coatings, membranes, or waterproofing systems professionally.",
              color: "text-purple-600",
              bgColor: "bg-purple-600",
            },
            {
              number: 4,
              title: "Quality Inspection & Handover",
              description: "Conduct final checks, site cleaning, and project handover with care.",
              color: "text-green-600",
              bgColor: "bg-green-600",
              isLast: true,
            },
          ]}
        />
      ) : (
        <ServiceProcess />
      )}
      <PaintingFocus slug={category.slug} />
      <WhyChoose />
      <ServiceAreas />
    </div>
  );
}
