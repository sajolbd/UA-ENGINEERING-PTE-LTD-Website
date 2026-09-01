"use client";

import React, { useState, useRef } from "react";
import { User, Phone, Briefcase, ChevronDown, Send, CheckCircle, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import Container from "components/shared/Container";
import { useCmsData } from "../../context/CmsContext";
import { getImageUrl } from "../../lib/api";

export default function CallBackSection() {
    const { cmsData } = useCmsData();
    const homeContent = (cmsData as any)?.home?.content || {};
    const callbackHeading = homeContent.callbackHeading || "Let Us Call You";
    const callbackSubheading = homeContent.callbackSubheading || "Need help now? Send a few details - we’ll call you shortly.";
    const callbackBgImage = homeContent.callbackBgImage || "/images/home/call/callback-bg.png";
    const callbackSupportImage = homeContent.callbackSupportImage || "/images/home/call/call-support.png";
    const callbackButtonText = homeContent.callbackButtonText || "Submit Now";

    const formRef = useRef<HTMLFormElement>(null);

    const [formData, setFormData] = useState({
        name: "",
        service: "",
        mobile: "",
    });

    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleBlur = (
        e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name } = e.target;
        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));
    };

    const getFieldError = (fieldName: string) => {
        if (!touched[fieldName]) return "";
        const val = (formData as any)[fieldName]?.trim() || "";

        if (fieldName === "name" && !val) return "Name is required";
        if (fieldName === "service" && !val) return "Please select a service";
        if (fieldName === "mobile" && !val) return "Phone number is required";

        return "";
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setTouched({
            name: true,
            service: true,
            mobile: true,
        });

        const nameErr = !formData.name.trim() ? "Name is required" : "";
        const serviceErr = !formData.service.trim() ? "Please select a service" : "";
        const mobileErr = !formData.mobile.trim() ? "Phone number is required" : "";

        if (nameErr || serviceErr || mobileErr) {
            setErrorMessage("Please complete all required fields.");
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus("idle");
        setErrorMessage("");

        try {
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

            if (serviceId && templateId && publicKey && formRef.current) {
                await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
            } else {
                await new Promise((resolve) => setTimeout(resolve, 1500));
            }

            setSubmitStatus("success");
            setFormData({ name: "", service: "", mobile: "" });
            setTouched({});
        } catch (error: any) {
            console.error("Callback submission error:", error);
            setSubmitStatus("error");
            setErrorMessage("Failed to send request. Please try calling us directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const nameError = getFieldError("name");
    const serviceError = getFieldError("service");
    const mobileError = getFieldError("mobile");

    return (
        <section className="relative overflow-hidden bg-[#0d121d] py-6 lg:py-0 min-h-[178px] flex items-center">
            {/* Background Image */}
            <img
                src={getImageUrl(callbackBgImage)}
                alt="UA Engineering"
                className="absolute inset-0 w-full h-full object-cover opacity-25"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            <Container className="relative z-10 w-full">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:h-full">
                    {/* Left Side */}
                    <div className="flex items-center gap-6 lg:max-w-xl">
                        <div className="relative h-[120px] w-[120px] sm:h-[160px] sm:w-[160px] shrink-0 lg:h-[162px] lg:w-[162px]">
                            <img
                                src={getImageUrl(callbackSupportImage)}
                                alt="Call Support"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div>
                            <h2 className="text-2xl font-extrabold text-white md:text-3xl lg:text-4xl tracking-tight leading-tight">
                                {callbackHeading}
                            </h2>
                            <p className="mt-2 text-sm md:text-base text-white/80 max-w-sm">
                                {callbackSubheading}
                            </p>
                        </div>
                    </div>

                    {/* Form Area */}
                    <div className="w-full lg:max-w-2xl xl:max-w-3xl">
                        {submitStatus === "success" ? (
                            <div className="flex items-center gap-3 p-4 bg-emerald-900/80 border border-emerald-500/50 rounded-xl text-emerald-200 text-sm font-bold animate-fadeIn">
                                <CheckCircle className="h-6 w-6 text-emerald-400 shrink-0" />
                                <div>
                                    <p className="text-white font-extrabold">Callback Request Received!</p>
                                    <p className="text-xs text-emerald-300 font-semibold mt-0.5">
                                        Our engineering team will call your phone number shortly.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-2">
                                {errorMessage && (
                                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-900/80 border border-red-500/50 text-red-200 text-xs font-bold">
                                        <AlertCircle size={14} className="shrink-0" />
                                        <span>{errorMessage}</span>
                                    </div>
                                )}

                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 items-start">
                                    {/* Name Input */}
                                    <div>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-primary" />
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Your Name *"
                                                value={formData.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`h-12 w-full rounded-md border bg-white pl-11 pr-4 text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300 text-sm font-semibold ${
                                                    nameError
                                                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/30 bg-red-50"
                                                        : "border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary"
                                                }`}
                                            />
                                        </div>
                                        {nameError && (
                                            <span className="text-[11px] font-extrabold text-red-400 mt-1 block pl-1">
                                                {nameError}
                                            </span>
                                        )}
                                    </div>

                                    {/* Service Need Select */}
                                    <div>
                                        <div className="relative group">
                                            <Briefcase className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-primary z-10" />
                                            <select
                                                name="service"
                                                value={formData.service}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`h-12 w-full appearance-none rounded-md border bg-white pl-11 pr-8 text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300 text-sm font-semibold cursor-pointer ${
                                                    serviceError
                                                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/30 bg-red-50"
                                                        : "border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary"
                                                }`}
                                            >
                                                <option value="" disabled className="text-slate-400 font-semibold">Service Need *</option>
                                                <option value="Renovation & Upgrading">Renovation & Upgrading</option>
                                                <option value="Structural & Exterior Works">Structural & Exterior Works</option>
                                                <option value="Painting & Waterproofing">Painting & Waterproofing</option>
                                                <option value="Aluminium & Glazing Works">Aluminium & Glazing Works</option>
                                                <option value="Electrical, Plumbing & Aircon">Electrical, Plumbing & Aircon</option>
                                                <option value="Solar Panel Installation">Solar Panel Installation</option>
                                            </select>
                                            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-primary z-10" />
                                        </div>
                                        {serviceError && (
                                            <span className="text-[11px] font-extrabold text-red-400 mt-1 block pl-1">
                                                {serviceError}
                                            </span>
                                        )}
                                    </div>

                                    {/* Phone Input */}
                                    <div>
                                        <div className="relative group">
                                            <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-primary" />
                                            <input
                                                type="tel"
                                                name="mobile"
                                                placeholder="Phone Number *"
                                                value={formData.mobile}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`h-12 w-full rounded-md border bg-white pl-11 pr-4 text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-300 text-sm font-semibold ${
                                                    mobileError
                                                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/30 bg-red-50"
                                                        : "border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary"
                                                }`}
                                            />
                                        </div>
                                        {mobileError && (
                                            <span className="text-[11px] font-extrabold text-red-400 mt-1 block pl-1">
                                                {mobileError}
                                            </span>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group/submit relative h-12 w-full overflow-hidden rounded-md bg-secondary px-6 font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:shadow-lg text-xs disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        <span className="absolute inset-0 translate-x-[-101%] rounded-md bg-primary transition-transform duration-500 ease-in-out group-hover/submit:translate-x-0" />
                                        <span className="relative z-10 flex items-center justify-center gap-1.5 transition-colors duration-300">
                                            {isSubmitting ? (
                                                "Sending..."
                                            ) : (
                                                <>
                                                    {callbackButtonText}
                                                    <Send size={12} className="transition-transform duration-300 group-hover/submit:translate-x-1" />
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
}