import type { Metadata } from "next";
import "./globals.css";

const title = "OpAIx - AI-Powered Healthcare Solutions";
const description =
  "AI-powered healthcare solutions that help physicians identify risks earlier and deliver more personalized, proactive patient care.";

export const metadata: Metadata = {
  metadataBase: new URL("https://opaixllc.vercel.app"),
  title,
  description,
  applicationName: "OpAIx",
  keywords: [
    "OpAIx",
    "AI-powered healthcare solutions",
    "predictive healthcare",
    "medical AI",
  ],
  openGraph: {
    title,
    description,
    url: "https://opaixllc.vercel.app",
    siteName: "OpAIx",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
