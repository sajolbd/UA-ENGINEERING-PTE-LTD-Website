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

const highlights = [
  { label: "Certified Workmanship", icon: Award },
  { label: "Guaranteed Quality", icon: BadgeCheck },
  { label: "Transparent Pricing", icon: DollarSign },
  { label: "On-Time Delivery", icon: Clock3 },
];

export default function Hero() {
  return (
    <div className="bg-white">
      <section className="relative h-[calc(100svh-132px)] overflow-hidden bg-white lg:h-[calc(100vh-132px)]">
        <Image
          src="/images/home/hero/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#f4f8ff]/72" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-[#eef5ff]/45 to-white/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-white/35" />

        <Container className="relative flex h-[calc(100svh-132px)] flex-col gap-4 py-4 sm:gap-6 sm:py-6 lg:h-[calc(100vh-132px)] lg:gap-0 lg:py-0">
          <div className="mx-auto w-full max-w-[1320px] pt-7 text-center sm:pt-12 md:pt-14 lg:pt-20 xl:pt-24">
            <h1 className="mx-auto max-w-[1240px] text-3xl font-bold leading-[1.02] text-secondary sm:text-5xl">
              From Renovation to Painting, Roofing, Electrical, Plumbing and
              Steel Works.
            </h1>

            <p className="mx-auto mt-4 max-w-[680px] text-center text-base font-medium leading-6 text-slate-950 sm:mt-6 sm:text-lg sm:leading-7">
              We handle it all with expertise, reliability, and guaranteed
              quality.
            </p>
          </div>

          <div className="mx-auto mt-6 flex w-full max-w-[1200px] justify-center sm:mt-9 lg:mt-14 lg:pb-36 xl:mt-16 xl:pb-40">
            <div className="flex w-full max-w-[360px] flex-row gap-2 sm:max-w-none sm:gap-4">
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
          </div>

          <div className="relative mx-auto mt-auto grid w-full max-w-[1160px] grid-cols-2 gap-2 rounded-[22px] bg-white/88 p-2 shadow-[0_18px_55px_rgba(15,23,42,0.18)] backdrop-blur sm:gap-3 sm:rounded-[34px] sm:p-3 lg:absolute lg:inset-x-4 lg:bottom-6 lg:grid-cols-4">
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
