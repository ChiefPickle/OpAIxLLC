import type { Metadata } from "next";
import "./globals.css";

const title = "OpAIx: Individualized opioid prescribing";
const description =
  "OpAIx supports surgeons in reducing excess opioid prescribing at hospital discharge through models that estimate each patient’s individual needs. Pittsburgh, founded 2025.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.opaixllc.com"),
  title,
  description,
  applicationName: "OpAIx",
  keywords: [
    "OpAIx",
    "individualized opioid prescribing",
    "hospital discharge",
    "perioperative pain",
  ],
  openGraph: {
    title,
    description,
    url: "https://www.opaixllc.com",
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
    icon: [{ url: "/home/icons/icon.svg", type: "image/svg+xml" }],
    apple: "/home/icons/apple-touch-icon.png",
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
