// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TranslationProvider } from "@/components/TranslationProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prime Moving - Professional Moving Services | Bay Area Movers",
  description:
    "Bay Area's #1 choice for comprehensive moving services. Professional residential and commercial moving solutions with upfront pricing and exceptional customer care.",
  keywords:
    "moving services, professional movers, Bay Area moving, residential moving, commercial moving, packing services, local movers, long distance moving",
  authors: [{ name: "Prime Moving" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TranslationProvider>{children}</TranslationProvider>
      </body>
    </html>
  );
}
