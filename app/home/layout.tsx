import type { Metadata, Viewport } from "next";
import "@/src/styles/redesign.css";
import { Footer } from "@/components/v2/Footer";
import { FontPreload } from "@/components/v2/fonts";
import { JsonLd } from "@/components/v2/JsonLd";
import { Nav } from "@/components/v2/Nav";
import { SmoothScroll } from "@/components/v2/SmoothScroll";
import { SITE } from "@/components/v2/constants";

const title = "OpAIx: Individualized opioid prescribing";
const description =
  "OpAIx supports surgeons in reducing excess opioid prescribing at hospital discharge through models that estimate each patient’s individual needs. Pittsburgh, founded 2025.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f8f8f5",
};

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | OpAIx",
  },
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
    icon: [
      { url: "/home/icons/icon.svg", type: "image/svg+xml" },
      { url: "/home/icons/favicon.ico" },
    ],
    apple: "/home/icons/apple-touch-icon.png",
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="opaix-v2">
      <FontPreload />
      <SmoothScroll>
        <a className="v2-skip" href="#content">
          Skip to content
        </a>
        <Nav />
        {children}
        <Footer />
      </SmoothScroll>
      <JsonLd />
    </div>
  );
}
