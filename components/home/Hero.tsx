import Image from "next/image";
import Link from "next/link";
import {
  Award,
  BadgeCheck,
  Clock3,
  DollarSign,
  MessageCircle,
  MoveRight,
} from "lucide-react";
import Container from "components/shared/Container";
import cmsData from "../../data/cmsData.json";

const highlights = [
  { label: "Certified Workmanship", icon: Award },
  { label: "Guaranteed Quality", icon: BadgeCheck },
  { label: "Transparent Pricing", icon: DollarSign },
  { label: "On-Time Delivery", icon: Clock3 },
];

export default function Hero() {
  const heroContent = cmsData?.home?.content || {};
  const heading = heroContent.heroHeading || " From Renovation to Painting, Roofing, Electrical, Plumbing and Steel Works.";
  const subheading = heroContent.heroSubheading || "We handle it all with expertise, reliability, and guaranteed quality.";
  const heroImage = heroContent.heroImage || "/images/home/hero/hero-bg.png";
  const heroImageAlt = heroContent.heroImageAlt || "Hero Background Banner";

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-white lg:min-h-[calc(100vh-132px)] flex items-center py-10 sm:py-16 lg:py-24">
        <Image
          src={heroImage}
          alt={heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#f4f8ff]/72" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-[#eef5ff]/45 to-white/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-white/35" />

        <Container className="relative flex flex-col justify-center gap-6 lg:gap-8 w-full h-full">
          <div className="mx-auto w-full max-w-[1320px] pt-4 text-center sm:pt-6 lg:pt-12 xl:pt-16">
            <h1 className="mx-auto max-w-[1240px] text-3xl font-bold leading-[1.02] text-secondary sm:text-5xl">
              {heading}
            </h1>

            <p className="mx-auto mt-4 max-w-[680px] text-center text-base font-medium leading-6 text-slate-950 sm:mt-6 sm:text-lg sm:leading-7">
              {subheading}
            </p>
          </div>

          <div className="mx-auto mt-6 flex flex-wrap w-full max-w-[1160px] justify-between items-center gap-4 sm:mt-8 lg:mt-10 px-4 sm:px-0">
            <a
              href="https://wa.me/6598411786?text=Hello%20UA%20Engineering%2C%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="group/whatsapp relative inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 overflow-hidden rounded-full bg-primary px-3 py-2 text-sm font-bold text-white shadow-sm transition-colors duration-300 sm:min-h-11 sm:min-w-[190px] sm:flex-none sm:gap-2 sm:px-6 sm:py-3 sm:text-base"
            >
              <span className="absolute inset-0 translate-x-[-101%] rounded-full bg-secondary transition-transform duration-500 ease-in-out group-hover/whatsapp:translate-x-0" />
              <span className="relative z-10 flex items-center gap-2 transition-colors duration-300">
                <MessageCircle size={20} />
                WhatsApp Us
              </span>
            </a>
            <Link
              href="/#services"
              className="group/learn relative inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 overflow-hidden rounded-full bg-secondary px-3 py-2 text-sm font-bold text-white shadow-sm transition-colors duration-300 sm:min-h-11 sm:min-w-[190px] sm:flex-none sm:gap-2 sm:px-6 sm:py-3 sm:text-base"
            >
              <span className="absolute inset-0 translate-x-[-101%] rounded-full bg-primary transition-transform duration-500 ease-in-out group-hover/learn:translate-x-0" />
              <span className="relative z-10 flex items-center gap-2 transition-colors duration-300">
                Learn More
                <MoveRight size={18} />
              </span>
            </Link>
          </div>

          <div className="relative mx-auto mt-8 sm:mt-12 lg:mt-16 grid w-full max-w-[1160px] grid-cols-2 gap-2 rounded-[22px] bg-white/88 p-2 shadow-[0_18px_55px_rgba(15,23,42,0.18)] backdrop-blur sm:gap-3 sm:rounded-[34px] sm:p-3 lg:grid-cols-4">
            {highlights.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="group flex min-h-14 items-center gap-2 rounded-full bg-white px-3 py-2 text-left text-xs font-bold text-slate-950 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-white hover:shadow-xl sm:min-h-16 sm:gap-4 sm:px-5 sm:py-3 sm:text-sm"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-primary text-primary transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-primary sm:h-11 sm:w-11">
                  <Icon className="h-5 w-5 sm:h-[23px] sm:w-[23px]" strokeWidth={2.6} />
                </span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
