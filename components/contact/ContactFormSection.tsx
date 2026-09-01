"use client";

import React, { useState, useRef } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import Container from "../shared/Container";
import { useCmsData } from "../../context/CmsContext";

const servicesList = [
  "Full Renovation & Upgrading",
  "Partition, Ceiling & Tiling",
  "Painting & Waterproofing",
  "Electrical, Plumbing & Aircon",
  "Flooring & Handyman Tasks",
  "Aluminium, Glazing & Solar",
  "Other Engineering Works",
];

export default function ContactFormSection() {
  const { cmsData } = useCmsData();
  const contact = (cmsData as any)?.contact?.content || {};
  const site = (cmsData as any)?.site?.content || {};
  const address = contact.contactAddress || site.address || "38C Sea Avenue Marine Mansion Singapore 424256";
  const phone = contact.contactPhone || site.phone || "+65 8459 3003";
  const email = contact.contactEmail || site.email || "Info@uaengineering.com.sg";
  const hours = contact.contactHours || site.workingHours || "Mon - Sat: 9:00 AM - 6:00 PM (Emergency 24/7 Support)";

  const formRef = useRef<HTMLFormElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    service: "",
    message: "",
  });

  // UI Status State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    // Simple Client-Side Validations
    if (!formData.name.trim() || !formData.mobile.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

      if (serviceId && templateId && publicKey && formRef.current) {
        await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      } else {
        // Fallback simulation delay if env variables not set yet
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      // Successfully Submitted
      setSubmitStatus("success");
      setFormData({
        name: "",
        mobile: "",
        email: "",
        service: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
      setErrorMessage("Failed to send message. Please try again or contact us directly via phone.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white py-8 lg:py-12 border-t border-slate-100">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-primary">
                REACH US HERE
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-secondary sm:text-4xl leading-tight">
                Have questions or need a quotation?
              </h2>
              <div className="mt-4 h-1 w-20 rounded bg-primary" />
              <p className="mt-6 text-base text-slate-600 leading-relaxed font-medium">
                Our customer support and engineering teams are standing by to assist with your residential, commercial, or industrial project in Singapore.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">

              {/* Address Card */}
              <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-slate-50/80">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 className="font-extrabold text-secondary text-base">Office Address</h3>
                  <p className="mt-1.5 text-sm font-semibold text-slate-600 leading-relaxed whitespace-pre-line">
                    {address}
                  </p>
                </div>
              </div>

              {/* Phone Card */}
              <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-slate-50/80">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Phone size={22} />
                </div>
                <div>
                  <h3 className="font-extrabold text-secondary text-base">Phone & WhatsApp</h3>
                  <div className="mt-1.5 space-y-1 font-semibold text-sm text-slate-600">
                    <p>
                      Office Phone:{" "}
                      <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-primary hover:underline font-bold">
                        {phone}
                      </a>
                    </p>
                    <p>
                      WhatsApp Support:{" "}
                      <a
                        href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-bold"
                      >
                        {phone} (Chat Live)
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-slate-50/80">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail size={22} />
                </div>
                <div>
                  <h3 className="font-extrabold text-secondary text-base">Email Address</h3>
                  <p className="mt-1.5 text-sm font-semibold">
                    <a
                      href={`mailto:${email}`}
                      className="text-slate-600 hover:text-primary transition-colors font-bold break-all"
                    >
                      {email}
                    </a>
                  </p>
                </div>
              </div>

              {/* Business Hours Card */}
              <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-slate-50/80">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock size={22} />
                </div>
                <div>
                  <h3 className="font-extrabold text-secondary text-base">Working Hours</h3>
                  <p className="mt-1.5 text-sm font-semibold text-slate-600 leading-relaxed">
                    {hours}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.02)]">

              {submitStatus === "success" ? (
                /* Success Screen */
                <div className="py-8 text-center space-y-6">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm">
                    <CheckCircle size={48} className="animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-secondary">Thank You!</h3>
                    <p className="text-slate-600 font-semibold max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                      Your quotation request has been sent successfully. One of our engineers will review your requirements and reach out to you shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitStatus("idle")}
                    className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                /* Form Interface */
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-black text-secondary">
                      Request For Form
                    </h3>
                    <p className="text-slate-500 font-bold text-sm mt-1">
                      Fill out the form below and receive a swift response within 24 hours.
                    </p>
                  </div>

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">

                    {/* Error Alerts */}
                    {errorMessage && (
                      <div className="flex items-center gap-2.5 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm font-bold animate-pulse">
                        <AlertCircle size={18} className="shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Row 1: Name & Mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="text-xs font-black uppercase tracking-wider text-secondary">
                          Your Name <span className="text-primary">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. John Tan"
                          className="w-full h-12 px-4 rounded-xl bg-white border border-slate-200/80 text-secondary placeholder:text-slate-400 font-semibold text-sm outline-none transition duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="mobile" className="text-xs font-black uppercase tracking-wider text-secondary">
                          Mobile Number <span className="text-primary">*</span>
                        </label>
                        <input
                          id="mobile"
                          type="tel"
                          name="mobile"
                          required
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="e.g. +65 9123 4567"
                          className="w-full h-12 px-4 rounded-xl bg-white border border-slate-200/80 text-secondary placeholder:text-slate-400 font-semibold text-sm outline-none transition duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-black uppercase tracking-wider text-secondary">
                        Email Address <span className="text-primary">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. john.tan@gmail.com"
                        className="w-full h-12 px-4 rounded-xl bg-white border border-slate-200/80 text-secondary placeholder:text-slate-400 font-semibold text-sm outline-none transition duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10"
                      />
                    </div>

                    {/* Row 3: Select Service Category */}
                    <div className="space-y-1.5">
                      <label htmlFor="service" className="text-xs font-black uppercase tracking-wider text-secondary">
                        Service Required <span className="text-slate-400 font-medium">(Optional)</span>
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-xl bg-white border border-slate-200/80 text-secondary font-semibold text-sm outline-none transition duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10 appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                          backgroundPosition: "right 1rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.25rem",
                        }}
                      >
                        <option value="" disabled className="font-semibold text-slate-400">
                          Select a Service Category...
                        </option>
                        {servicesList.map((service, idx) => (
                          <option key={idx} value={service} className="font-semibold text-secondary">
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Row 4: Message */}
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-xs font-black uppercase tracking-wider text-secondary">
                        Describe Your Project <span className="text-primary">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Hi, can I get a quote / site survey for.."
                        className="w-full p-4 rounded-xl bg-white border border-slate-200/80 text-secondary placeholder:text-slate-400 font-semibold text-sm outline-none transition duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none"
                      />
                    </div>

                    {/* Row 5: Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold h-12 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:bg-primary/95 disabled:bg-primary/70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>Sending Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>

                  </form>
                </div>
              )}

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
