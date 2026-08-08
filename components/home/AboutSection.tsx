"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ShieldCheck,
    HardHat,
    MessagesSquare,
    Wrench,
} from "lucide-react";

import Container from "components/shared/Container";
import cmsData from "../../data/cmsData.json";

export default function AboutSection() {
    const homeContent = cmsData?.home?.content || {};
    const aboutHeading = homeContent.aboutHeading || "Your Trusted Partner for All Building Needs";
    const aboutSubheading = homeContent.aboutSubheading || "We provide home renovation, painting, waterproofing, main gate & grill works, balcony shelter installation, roof extensions, aluminium & glass installation, electrical, plumbing, aircon, and solar panel installation for homes and commercial properties across Singapore.";
    const aboutImage = homeContent.aboutImage || "/images/home/about/about-main.jpg";
    const aboutImageAlt = homeContent.aboutImageAlt || "UA Engineering Upgrading Worksite";
    const experienceYears = parseInt(homeContent.aboutExperience) || 15;

    return (
        <section className="overflow-hidden bg-white py-8 lg:py-12">
            <Container>
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    {/* Left Side */}
                    <div className="relative">
                        {/* Main Image */}
                        <div className="relative overflow-hidden">
                            <Image
                                src={aboutImage}
                                alt={aboutImageAlt}
                                width={700}
                                height={750}
                                className="h-auto w-full object-cover"
                            />
                        </div>

                        {/* Experience Box */}
                        <div className="absolute right-0 top-8 bg-white px-5 py-4 shadow-2xl lg:right-[-30px]">
                            <div className="flex items-center gap-3">
                                <span className="text-5xl font-bold text-primary">
                                    {experienceYears}
                                </span>

                                <span className="text-lg font-semibold text-secondary">
                                    Years
                                    <br />
                                    Experience
                                </span>
                            </div>
                        </div>


                        {/* Decoration */}
                        <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full border-[12px] border-primary/10" />
                    </div>

                    {/* Right Side */}
                    <div className="flex flex-col items-start">
                        {/* Small Title */}
                        <div className="mb-4 flex items-center gap-2">
                            <Wrench className="h-5 w-5 text-primary" />

                            <span className="text-lg font-semibold text-primary">
                                About UA Engineering services
                            </span>
                        </div>

                        {/* Main Title */}
                        <h2 className="mb-6 text-3xl font-bold leading-tight text-secondary ">
                            {aboutHeading}
                        </h2>

                        {/* Description */}
                        <p className="mb-10 text-base sm:text-lg leading-6 text-slate-950">
                            {aboutSubheading}
                        </p>

                        {/* Features */}
                        <div className="mb-10 grid gap-4 md:grid-cols-3">
                            {/* Card 1 */}
                            <div className="group border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-2 hover:bg-primary hover:border-primary hover:shadow-xl">
                                <ShieldCheck className="mb-3 h-10 w-10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:text-white" />

                                <h3 className="mb-2 text-lg font-semibold text-secondary transition-colors duration-300 group-hover:text-white">
                                    BCA Certified Company
                                </h3>

                                <p className="text-sm leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-white/80">
                                    Meeting standards with quality workmanship, compliance, and professional practices.
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="group border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-2 hover:bg-primary hover:border-primary hover:shadow-xl">
                                <HardHat className="mb-3 h-10 w-10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:text-white" />

                                <h3 className="mb-2 text-lg font-semibold text-secondary transition-colors duration-300 group-hover:text-white">
                                    Skilled & Certified Workforce
                                </h3>

                                <p className="text-sm leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-white/80">
                                    Experienced professionals delivering quality work with precision, reliability, and attention.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="group border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-2 hover:bg-primary hover:border-primary hover:shadow-xl">
                                <MessagesSquare className="mb-3 h-10 w-10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:text-white" />

                                <h3 className="mb-2 text-lg font-semibold text-secondary transition-colors duration-300 group-hover:text-white">
                                    Competitive & Transparent Pricing
                                </h3>

                                <p className="text-sm leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-white/80">
                                    Fair, upfront pricing with detailed quotations and no hidden costs or unexpected charges.
                                </p>
                            </div>
                        </div>

                        {/* Button */}
                        <Link
                            href="/about"
                            className="group relative inline-flex items-center overflow-hidden bg-secondary px-8 py-3 font-semibold text-white"
                        >
                            <span className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-500 ease-in-out group-hover:translate-x-0" />

                            <span className="relative z-10">
                                About More
                            </span>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}