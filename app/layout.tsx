import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpAIx — Predicting Health, Saving Lives",
  description:
    "We harness the power of artificial intelligence to transform healthcare outcomes. Our predictive models help physicians identify risks earlier and deliver more personalized care.",
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
