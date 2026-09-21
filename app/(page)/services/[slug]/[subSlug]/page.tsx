import React from "react";
import { Metadata } from "next";
import { servicesData as fallbackServicesData } from "../../../../../data/servicesData";
import { getLiveServices } from "../../../../../lib/servicesUtils";
import SubServiceCategoryClient from "../../../../../components/services/SubServiceCategoryClient";

interface PageProps {
  params: {
    slug: string;
    subSlug: string;
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.uaengineering.com.sg";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

export async function generateStaticParams() {
  const liveServices = await getLiveServices();
  const params: { slug: string; subSlug: string }[] = [];

  liveServices.forEach((category) => {
    category.services.forEach((subService) => {
      params.push({
        slug: category.slug,
        subSlug: subService.slug,
      });
    });
  });

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const liveServices = await getLiveServices();
  const category = liveServices.find((cat) => cat.slug === params.slug);
  const service = category?.services.find((s) => s.slug === params.subSlug);

  if (!service) {
    return {
      title: "Sub-Service Not Found | UA Engineering PTE LTD",
      description: "The requested sub-service could not be found.",
    };
  }

  const categoryTitle = category?.title || params.slug;
  const title = service.seo?.metaTitle || `${service.title} - ${categoryTitle} | UA Engineering PTE LTD`;
  const description =
    service.seo?.metaDescription ||
    service.description ||
    service.longDescription ||
    `Professional ${service.title} under ${categoryTitle} by UA Engineering PTE LTD in Singapore.`;
  const keywords =
    service.seo?.metaKeywords ||
    `${service.title}, ${categoryTitle}, Singapore engineering, UA Engineering`;
  const pageUrl = `${SITE_URL}/services/${params.slug}/${params.subSlug}`;
  const imageUrl = service.image?.startsWith("http") || service.image?.startsWith("/")
    ? (service.image.startsWith("/") ? `${SITE_URL}${service.image}` : service.image)
    : (category?.featuredImage?.startsWith("/") ? `${SITE_URL}${category.featuredImage}` : `${SITE_URL}/images/layout/breadcrumb-bg.png`);

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
          alt: service.title,
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

export default async function SubServicePage({ params }: PageProps) {
  const liveServices = await getLiveServices();
  const category = liveServices.find((cat) => cat.slug === params.slug);
  const service = category?.services.find((s) => s.slug === params.subSlug);

  const categoryTitle = category?.title || params.slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const subServiceTitle = service?.title || params.subSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const categoryUrl = `${SITE_URL}/services/${params.slug}`;
  const pageUrl = `${SITE_URL}/services/${params.slug}/${params.subSlug}`;

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
        "item": categoryUrl,
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": subServiceTitle,
        "item": pageUrl,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": subServiceTitle,
    "description": service?.description || service?.longDescription || `${subServiceTitle} services in Singapore`,
    "url": pageUrl,
    "serviceType": categoryTitle,
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
  };

  let customSchemaObj = null;
  if (service?.seo?.schemaJson) {
    try {
      customSchemaObj = JSON.parse(service.seo.schemaJson);
    } catch (err) {
      console.error("Invalid custom schemaJson in sub-service:", err);
    }
  }

  const schemasToInject: any[] = [breadcrumbSchema, serviceSchema];
  if (customSchemaObj) schemasToInject.push(customSchemaObj);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemasToInject) }}
      />
      <SubServiceCategoryClient
        slug={params.slug}
        subSlug={params.subSlug}
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
        fallbackService={service || {
          slug: params.subSlug,
          title: subServiceTitle,
          image: "/images/layout/breadcrumb-bg.png",
          description: "",
          longDescription: "",
          features: [],
          benefits: [],
          process: [],
        }}
      />
    </>
  );
}

