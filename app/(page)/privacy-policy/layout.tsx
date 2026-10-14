import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://uaengineering.com.sg";

export const metadata: Metadata = {
  title: "Privacy Policy | UA Engineering PTE. LTD.",
  description:
    "Read the Privacy Policy of UA Engineering PTE. LTD. Learn how we collect, use, and protect your personal data in Singapore.",
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
