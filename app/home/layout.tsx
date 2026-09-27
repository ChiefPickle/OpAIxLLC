import type { Metadata } from "next";
import { SITE } from "@/components/v2/constants";

const title = "OpAIx - AI-Powered Healthcare Solutions";
const description =
  "AI-powered healthcare solutions that help physicians identify risks earlier and deliver more personalized, proactive patient care.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "OpAIx",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  alternates: {
    canonical: `${SITE.url}/home`,
    types: {
      "text/markdown": `${SITE.url}/home/index.md`,
    },
  },
  openGraph: {
    title,
    description,
    url: `${SITE.url}/home`,
    siteName: "OpAIx",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-icon.png",
  },
};

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
