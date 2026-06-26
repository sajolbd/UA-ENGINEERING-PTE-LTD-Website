"use client";

import Image from "next/image";
import { User, Phone, Briefcase, ChevronDown, Send } from "lucide-react";
import Container from "components/shared/Container";

export default function CallBackSection() {
    return (
        <section className="relative overflow-hidden bg-[#0d121d] lg:h-[178px]">
            {/* Background Image */}
            <Image
                src="/images/home/call/callback-bg.png"
                alt="UA Engineering"
                fill
                priority
                className="object-cover opacity-25"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 " />

            <Container className="relative z-10">
                <div className="flex flex-col gap-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:h-full lg:py-0">
                    {/* Left Side */}
                    <div className="flex items-center gap-6 lg:max-w-xl">
                        <div className="relative h-[160px] w-[160px] shrink-0 md:h-[190px] md:w-[190px] lg:h-[162px] lg:w-[162px]">
                            <Image
                                src="/images/home/call/call-support.png"
                                alt="Call Support"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div>
                            <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl tracking-tight leading-tight">
                                Let Us Call You
                            </h2>
                            <p className="mt-2 text-sm md:text-base text-white/80 max-w-sm">
                                Need help now? Send a few details - we’ll call you shortly.
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="w-full lg:max-w-2xl xl:max-w-3xl">
                        <form className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {/* Name Input */}
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-primary" />
                                <input
                                    type="text"
                                    placeholder="Your Name *"
                                    required
                                    className="h-12 w-full rounded-md border border-slate-200 bg-white pl-11 pr-4 text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                                />
                            </div>

                            {/* Service Need Select */}
                            <div className="relative group">
                                <Briefcase className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-primary" />
                                <select
                                    required
                                    className="h-12 w-full appearance-none rounded-md border border-slate-200 bg-white pl-11 pr-8 text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                                >
                                    <option value="" className="text-slate-400">Service Need *</option>
                                    <option>Renovation & Upgrading</option>
                                    <option>Structural & Exterior Works</option>
                                    <option>Painting & Waterproofing</option>
                                    <option>Aluminium & Glazing Works</option>
                                    <option>Electrical, Plumbing & Aircon</option>
                                    <option>Solar Panel Installation</option>
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-primary" />
                            </div>

                            {/* Phone Input */}
                            <div className="relative group">
                                <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-primary" />
                                <input
                                    type="tel"
                                    placeholder="Phone Number *"
                                    required
                                    className="h-12 w-full rounded-md border border-slate-200 bg-white pl-11 pr-4 text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="group/submit relative h-12 w-full overflow-hidden rounded-md bg-secondary px-6 font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:shadow-lg text-xs"
                            >
                                <span className="absolute inset-0 translate-x-[-101%] rounded-md bg-primary transition-transform duration-500 ease-in-out group-hover/submit:translate-x-0" />
                                <span className="relative z-10 flex items-center justify-center gap-1.5 transition-colors duration-300">
                                    Submit Now
                                    <Send size={12} className="transition-transform duration-300 group-hover/submit:translate-x-1" />
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </Container>
        </section>
    );
}