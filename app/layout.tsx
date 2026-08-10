// app/layout.tsx

import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";

import "./globals.css";

import ClientLayout from "./client-layout";

import RootLayoutComponent from "components/layout/RootLayout";
import Navbar from "components/layout/Navbar";
import Footer from "components/layout/Footer";
import WhatsAppFloat from "components/shared/WhatsAppFloat";
import { CmsProvider } from "../context/CmsContext";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-josefin-sans",
});

const siteUrl = "https://ua-engineering-pte.vercel.app";

/* -------------------------------------------------------------------------- */
/*                                   METADATA                                 */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "UA Engineering PTE. LTD.",
    template: "%s | UA Engineering",
  },

  description:
    "UA Engineering PTE. LTD. provides renovation, waterproofing, steel works, roofing, electrical, plumbing, aircon, aluminium glazing and maintenance services across Singapore.",

  keywords: [
    "UA Engineering",
    "Singapore Renovation",
    "Waterproofing Singapore",
    "Roof Extension",
    "Steel Works",
    "Electrical Services",
    "Plumbing Services",
    "Aircon Repair",
    "Aluminium Works",
    "Engineering Company Singapore",
  ],

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
        sizes: "32x32",
      },
      {
        url: "/favicon.png",
        type: "image/png",
        sizes: "96x96",
      },
    ],

    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  openGraph: {
    title: "UA Engineering PTE. LTD.",
    description:
      "Professional Renovation & Engineering Services Across Singapore.",

    url: siteUrl,
    siteName: "UA Engineering PTE. LTD.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "UA Engineering PTE. LTD.",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "UA Engineering PTE. LTD.",
    description:
      "Professional Renovation & Engineering Services Across Singapore.",
    images: ["/og-image.jpg"],
  },
};

/* -------------------------------------------------------------------------- */
/*                                ROOT LAYOUT                                 */
/* -------------------------------------------------------------------------- */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={josefinSans.variable}>
      <body className="bg-white text-black antialiased">
        <noscript>
          <style>
            {`
              *{
                opacity:1 !important;
                transform:none !important;
                animation:none !important;
              }
            `}
          </style>
        </noscript>

        <CmsProvider>
          <RootLayoutComponent>
            <Navbar />
            <main className="">
              <ClientLayout>{children}</ClientLayout>
            </main>
            <Footer />
            <WhatsAppFloat />
          </RootLayoutComponent>
        </CmsProvider>
      </body>
    </html>
  );
}
