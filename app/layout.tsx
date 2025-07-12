// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TranslationProvider } from "@/components/TranslationProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prime Move - Professional Moving Services",
  description:
    "Your trusted partner for local and long-distance moves. Professional moving services with care and precision.",
  keywords:
    "moving services, professional movers, local moving, long distance moving, packing services",
  authors: [{ name: "Prime Move" }],
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
