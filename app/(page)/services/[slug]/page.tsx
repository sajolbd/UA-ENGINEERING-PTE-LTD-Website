import React from "react";
import { Metadata } from "next";
import { servicesData as fallbackServicesData } from "../../../../data/servicesData";
import { getLiveServices } from "../../../../lib/servicesUtils";
import ServiceCategoryClient from "../../../../components/services/ServiceCategoryClient";

interface PageProps {
  params: {
    slug: string;
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.uaengineering.com.sg";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

export async function generateStaticParams() {
  const liveServices = await getLiveServices();
  return liveServices.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const liveServices = await getLiveServices();
  const category = liveServices.find((cat) => cat.slug === params.slug);

  if (!category) {
    return {
      title: "Service Not Found | UA Engineering PTE LTD",
      description: "The requested service category could not be found.",
    };
  }

  const title = category.seo?.metaTitle || `${category.title} | UA Engineering PTE LTD`;
  const description =
    category.seo?.metaDescription ||
    category.shortDescription ||
    category.description ||
    `Professional ${category.title} services by UA Engineering PTE LTD in Singapore.`;
  const keywords =
    category.seo?.metaKeywords ||
    `${category.title}, Singapore engineering, construction services, renovation, UA Engineering`;
  const pageUrl = `${SITE_URL}/services/${category.slug}`;
  const imageUrl = category.featuredImage?.startsWith("http") || category.featuredImage?.startsWith("/")
    ? (category.featuredImage.startsWith("/") ? `${SITE_URL}${category.featuredImage}` : category.featuredImage)
    : `${SITE_URL}/images/layout/breadcrumb-bg.png`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "UA Engineering PTE LTD",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: category.title,
        },
      ],
      locale: "en_SG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ServiceCategoryPage({ params }: PageProps) {
  const liveServices = await getLiveServices();
  const category = liveServices.find((cat) => cat.slug === params.slug);

  const categoryTitle = category?.title || params.slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const pageUrl = `${SITE_URL}/services/${params.slug}`;

  // Structured Data Schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": `${SITE_URL}/services`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": categoryTitle,
        "item": pageUrl,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": categoryTitle,
    "description": category?.shortDescription || category?.description || `${categoryTitle} services in Singapore`,
    "url": pageUrl,
    "provider": {
      "@type": "LocalBusiness",
      "name": "UA Engineering PTE LTD",
      "url": SITE_URL,
      "telephone": "+65 6123 4567",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "SG",
        "addressLocality": "Singapore",
      },
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Singapore",
    },
    ...(category?.services && category.services.length > 0 ? {
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `${categoryTitle} Sub-Services`,
        "itemListElement": category.services.map((sub) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": sub.title,
            "description": sub.description,
            "url": `${pageUrl}/${sub.slug}`,
          },
        })),
      },
    } : {}),
  };

  const faqSchema = category?.faqs && category.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": category.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  } : null;

  let customSchemaObj = null;
  if (category?.seo?.schemaJson) {
    try {
      customSchemaObj = JSON.parse(category.seo.schemaJson);
    } catch (err) {
      console.error("Invalid custom schemaJson in category:", err);
    }
  }

  const schemasToInject: any[] = [breadcrumbSchema, serviceSchema];
  if (faqSchema) schemasToInject.push(faqSchema);
  if (customSchemaObj) schemasToInject.push(customSchemaObj);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemasToInject) }}
      />
      <ServiceCategoryClient
        slug={params.slug}
        fallbackCategory={category || {
          slug: params.slug,
          title: categoryTitle,
          shortDescription: "",
          description: "",
          icon: "",
          featuredImage: "/images/layout/breadcrumb-bg.png",
          bgImage: "/images/layout/breadcrumb-bg.png",
          services: [],
        }}
      />
    </>
  );
}

