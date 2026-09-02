"use client";

import React from "react";
import Link from "next/link";
import Breadcrumb from "components/layout/Breadcrumb";
import Container from "components/shared/Container";
import { FaShieldAlt, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50/50 min-h-screen pb-16 lg:pb-24">
      {/* Breadcrumb Header */}
      <Breadcrumb
        title="Privacy Policy"
        description="Last Updated: 03 September 2026"
        bgImage="/images/layout/about-bg.png"
      />

      <Container className="pt-10 lg:pt-16">
        <div className="max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-10 lg:p-12 text-slate-700 leading-relaxed space-y-8">
            
            {/* Header / Intro */}
            <div className="border-b border-slate-100 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                <FaShieldAlt size={14} /> Legal & Privacy
              </div>
              <p className="text-sm font-medium text-slate-500 mb-4">
                Last Updated: 03 September 2026
              </p>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                UA Engineering Pte. Ltd. (“UA Engineering”, “we”, “us”, or “our”) respects your privacy and is committed to protecting your personal data.
              </p>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal mt-3">
                This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you visit our website or contact us.
              </p>
            </div>

            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">1</span>
                Personal Data We Collect
              </h2>
              <p className="text-slate-600">We may collect information such as:</p>
              <ul className="grid gap-2 pt-1 pl-2">
                {[
                  "Name",
                  "Phone number",
                  "Email address",
                  "Property or project details",
                  "Information provided through enquiry or contact forms",
                  "Information you provide when communicating with us",
                  "Website usage and technical information, such as IP address, browser type, and device information",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 pt-2 font-medium">
                We do not process payments or collect payment card or banking information through our website.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">2</span>
                How We Collect Your Information
              </h2>
              <p className="text-slate-600">We may collect personal data when you:</p>
              <ul className="grid gap-2 pt-1 pl-2">
                {[
                  "Submit an enquiry or contact form",
                  "Request a quotation or consultation",
                  "Contact us by email, phone, WhatsApp, or other communication channels",
                  "Visit or interact with our website",
                  "Provide information to us for a project or service",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">3</span>
                How We Use Your Information
              </h2>
              <p className="text-slate-600">We may use your information to:</p>
              <ul className="grid gap-2 pt-1 pl-2">
                {[
                  "Respond to enquiries and requests",
                  "Provide quotations and consultations",
                  "Understand your project requirements",
                  "Provide and manage our services",
                  "Communicate with you about your project",
                  "Improve our website and services",
                  "Send relevant updates or marketing communications where permitted",
                  "Meet legal and regulatory requirements",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">4</span>
                Disclosure of Personal Data
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We may share personal data with trusted service providers, contractors, suppliers, or professional advisers where reasonably necessary to provide our services or operate our business.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We may also disclose information where required or permitted by Singapore law.
              </p>
              <p className="text-slate-700 font-semibold pt-1">
                We do not sell your personal data.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">5</span>
                Cookies and Website Technologies
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Our website may use cookies and similar technologies to improve website functionality, understand website traffic, and improve user experience.
              </p>
              <p className="text-slate-600 leading-relaxed">
                You can manage or disable cookies through your browser settings. Some website features may not function properly if cookies are disabled.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">6</span>
                Third-Party Services
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Our website may use third-party services such as analytics, advertising, communication, or website security tools.
              </p>
              <p className="text-slate-600 leading-relaxed">
                These services may collect information according to their own privacy policies. Where applicable, we will take reasonable steps to ensure that personal data is handled appropriately.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">7</span>
                Protection of Personal Data
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We take reasonable security measures to protect personal data against unauthorised access, collection, use, disclosure, copying, modification, or loss.
              </p>
              <p className="text-slate-600 leading-relaxed">
                However, no method of transmission or storage is completely secure.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">8</span>
                Retention of Personal Data
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We retain personal data only for as long as reasonably necessary to fulfil the purposes for which it was collected or to meet legal and business requirements.
              </p>
              <p className="text-slate-600 leading-relaxed">
                When personal data is no longer required, we will take reasonable steps to dispose of or anonymise it.
              </p>
            </section>

            {/* Section 9 */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">9</span>
                Your Rights
              </h2>
              <p className="text-slate-600">Subject to applicable laws, you may request to:</p>
              <ul className="grid gap-2 pt-1 pl-2">
                {[
                  "Access your personal data held by us",
                  "Request correction of inaccurate or incomplete information",
                  "Withdraw consent for certain uses of your personal data",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed pt-1">
                Withdrawal of consent may affect our ability to provide certain services or respond to your requests.
              </p>
            </section>

            {/* Section 10 */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">10</span>
                Marketing Communications
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Where permitted by law, we may contact you about our services, promotions, or updates.
              </p>
              <p className="text-slate-600 leading-relaxed">
                You may request to stop receiving marketing communications at any time.
              </p>
            </section>

            {/* Section 11 */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">11</span>
                Data Breaches
              </h2>
              <p className="text-slate-600 leading-relaxed">
                If we become aware of a personal data breach, we will assess the breach and take appropriate action in accordance with applicable Singapore laws and regulations.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Where notification is required, we will notify the relevant authorities and affected individuals as required by law.
              </p>
            </section>

            {/* Section 12 */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">12</span>
                Changes to This Privacy Policy
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our business, website, or applicable laws.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The updated version will be published on this page with the revised Last Updated date.
              </p>
            </section>

            {/* Section 13 */}
            <section className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">13</span>
                Contact Us
              </h2>
              <p className="text-slate-600 leading-relaxed">
                If you have any questions, requests, or concerns regarding this Privacy Policy or your personal data, please contact us:
              </p>

              {/* Contact Card */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200/80 space-y-3">
                <h3 className="font-bold text-secondary text-lg">UA Engineering Pte. Ltd.</h3>
                <div className="flex items-center gap-3 text-slate-700">
                  <FaEnvelope className="text-primary shrink-0" />
                  <span>Email: <a href="mailto:info@uaengineering.com.sg" className="text-primary hover:underline font-medium">info@uaengineering.com.sg</a></span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <FaPhoneAlt className="text-primary shrink-0" />
                  <span>Phone: <a href="tel:+6584593003" className="text-primary hover:underline font-medium">+6584593003</a></span>
                </div>
                <div className="flex items-start gap-3 text-slate-700">
                  <FaMapMarkerAlt className="text-primary shrink-0 mt-1" />
                  <span>Address: 38C Sea Avenue Marine Mansion Singapore 424256</span>
                </div>
              </div>

              {/* Complaints */}
              <div className="pt-2">
                <h3 className="font-bold text-secondary text-base mb-1">Complaints</h3>
                <p className="text-slate-600 leading-relaxed">
                  If you have concerns about how we handle your personal data, please contact us first so we can review and address your concern.
                </p>
              </div>
            </section>

          </div>
        </div>
      </Container>
    </div>
  );
}
