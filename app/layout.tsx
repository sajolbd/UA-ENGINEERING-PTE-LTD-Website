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
import { getApiBaseUrl } from "../lib/api";
import initialCmsData from "../data/cmsData.json";
import { servicesData as initialServicesData, ServiceCategory } from "../data/servicesData";
import { projectsData as initialProjectsData, ProjectItem } from "../data/projectsData";
import { blogPosts as initialBlogPosts, BlogPost } from "../data/blogData";

async function getLiveCmsData() {
  const apiBase = getApiBaseUrl();

  // 1. Fetch CMS data
  const cmsPromise = fetch(`${apiBase}/api/cms`, { cache: "no-store" })
    .then((res) => res.json())
    .catch(() => null);

  // 2. Fetch services
  const servicesPromise = fetch(`${apiBase}/api/services`, { cache: "no-store" })
    .then((res) => res.json())
    .catch(() => null);

  // 3. Fetch projects
  const projectsPromise = fetch(`${apiBase}/api/projects`, { cache: "no-store" })
    .then((res) => res.json())
    .catch(() => null);

  // 4. Fetch blogs
  const blogsPromise = fetch(`${apiBase}/api/blogs`, { cache: "no-store" })
    .then((res) => res.json())
    .catch(() => null);

  const [cmsRes, servicesRes, projectsRes, blogsRes] = await Promise.all([
    cmsPromise,
    servicesPromise,
    projectsPromise,
    blogsPromise,
  ]);

  // Merge CMS content
  const mergedCms = { ...initialCmsData };
  if (cmsRes?.success && cmsRes?.data) {
    Object.keys(cmsRes.data).forEach((pageKey) => {
      if (cmsRes.data[pageKey]) {
        const currentPage = mergedCms[pageKey as keyof typeof mergedCms] || {};
        mergedCms[pageKey as keyof typeof mergedCms] = {
          ...currentPage,
          content: {
            ...(currentPage as any).content,
            ...(cmsRes.data[pageKey].content || {}),
          },
          seo: {
            ...(currentPage as any).seo,
            ...(cmsRes.data[pageKey].seo || {}),
          },
        } as any;
      }
    });
  }

  return {
    cmsData: mergedCms,
    servicesData: (servicesRes?.success && Array.isArray(servicesRes?.data) && servicesRes.data.length > 0) ? servicesRes.data : initialServicesData,
    projectsData: (projectsRes?.success && Array.isArray(projectsRes?.data) && projectsRes.data.length > 0) ? projectsRes.data : initialProjectsData,
    blogPosts: (blogsRes?.success && Array.isArray(blogsRes?.data)) ? blogsRes.data : initialBlogPosts,
  };
}

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const liveData = await getLiveCmsData();

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

        <CmsProvider initialData={liveData}>
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
