"use client";

import React from "react";
import Link from "next/link";
import Breadcrumb from "components/layout/Breadcrumb";
import Container from "components/shared/Container";
import { FaFileContract, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function TermsConditionsPage() {
  return (
    <div className="bg-slate-50/50 min-h-screen pb-16 lg:pb-24">
      {/* Breadcrumb Header */}
      <Breadcrumb
        title="Terms & Conditions"
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
                <FaFileContract size={14} /> Terms of Service
              </div>
              <p className="text-sm font-medium text-slate-500 mb-4">
                Last Updated: 03 September 2026
              </p>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                Welcome to the website of UA Engineering Pte. Ltd. (“UA Engineering”, “we”, “us”, or “our”). By accessing or using our website, you agree to the following Terms & Conditions.
              </p>
            </div>

            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">1</span>
                Use of Our Website
              </h2>
              <p className="text-slate-600">You may use this website for lawful purposes only. You must not:</p>
              <ul className="grid gap-2 pt-1 pl-2">
                {[
                  "Use the website for any unlawful or fraudulent purpose",
                  "Attempt to gain unauthorised access to the website or its systems",
                  "Copy, reproduce, or misuse our content without permission",
                  "Interfere with the operation or security of the website",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 2 */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">2</span>
                Information on Our Website
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We make reasonable efforts to keep the information on our website accurate and up to date.
              </p>
              <p className="text-slate-600 leading-relaxed">
                However, service descriptions, images, specifications, availability, pricing, and other information may change without prior notice.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Information provided on the website is for general purposes and does not constitute a binding quotation or contract.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">3</span>
                Enquiries and Quotations
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Submitting an enquiry through our website does not create a contract between you and UA Engineering.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Any quotation, scope of work, pricing, materials, timeline, and project conditions will be confirmed separately between UA Engineering and the client.
              </p>
              <p className="text-slate-600 leading-relaxed">
                A project will only proceed once the relevant terms and arrangements have been agreed upon by both parties.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">4</span>
                Services
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Our services may include renovation, upgrading, structural and exterior works, painting, waterproofing, aluminium and glazing works, electrical, plumbing, air-conditioning, solar installation, and related engineering services.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The actual scope of services will depend on the requirements of each project and the agreed quotation or contract.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">5</span>
                Intellectual Property
              </h2>
              <p className="text-slate-600 leading-relaxed">
                All content on this website, including text, images, graphics, logos, designs, and other materials, belongs to UA Engineering or its respective owners unless otherwise stated.
              </p>
              <p className="text-slate-600 leading-relaxed">
                You may not reproduce, modify, distribute, or use our content for commercial purposes without our prior written permission.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">6</span>
                Third-Party Links and Services
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Our website may contain links to third-party websites or services.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We are not responsible for the content, availability, security, or privacy practices of third-party websites. Your use of such websites is subject to their respective terms and policies.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">7</span>
                Website Availability
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We aim to keep our website available and functioning properly. However, we do not guarantee that the website will always be available, uninterrupted, or free from errors or technical issues.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We may modify, suspend, or discontinue any part of the website without prior notice.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">8</span>
                Limitation of Liability
              </h2>
              <p className="text-slate-600">To the extent permitted by Singapore law, UA Engineering will not be liable for any loss or damage arising from:</p>
              <ul className="grid gap-2 pt-1 pl-2">
                {[
                  "Your use of or inability to use the website",
                  "Reliance on information provided on the website",
                  "Website interruptions or technical issues",
                  "Third-party websites or services linked from our website",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 leading-relaxed pt-1">
                Nothing in these Terms excludes or limits liability that cannot legally be excluded under applicable law.
              </p>
            </section>

            {/* Section 9 */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">9</span>
                Privacy
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Your use of our website is also subject to our Privacy Policy, which explains how we collect and handle personal data.
              </p>
            </section>

            {/* Section 10 */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">10</span>
                Changes to These Terms
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We may update these Terms & Conditions from time to time.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Any changes will be published on this page with the revised Last Updated date. Your continued use of the website after changes are published means you accept the updated Terms.
              </p>
            </section>

            {/* Section 11 */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">11</span>
                Governing Law
              </h2>
              <p className="text-slate-600 leading-relaxed">
                These Terms & Conditions are governed by the laws of Singapore.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Any disputes relating to these Terms or your use of our website will be subject to the applicable laws and courts of Singapore.
              </p>
            </section>

            {/* Section 12 */}
            <section className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-bold text-secondary flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">12</span>
                Contact Us
              </h2>
              <p className="text-slate-600 leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us:
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
            </section>

          </div>
        </div>
      </Container>
    </div>
  );
}
