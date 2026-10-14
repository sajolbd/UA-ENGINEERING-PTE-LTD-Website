import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://uaengineering.com.sg";

export const metadata: Metadata = {
  title: "Terms & Conditions | UA Engineering PTE. LTD.",
  description:
    "Read the Terms and Conditions of UA Engineering PTE. LTD. Singapore for website use and engineering services.",
  alternates: {
    canonical: `${SITE_URL}/terms-conditions`,
  },
};

export default function TermsConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
