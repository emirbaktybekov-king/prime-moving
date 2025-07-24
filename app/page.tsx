"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

interface SmoothScrollProps {
  smoothScrollTo: (elementId: string) => void;
}

export default function Home() {
  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header smoothScrollTo={smoothScrollTo} />
      <HeroSection smoothScrollTo={smoothScrollTo} />
      <AboutSection />
      <ServicesSection />
      <ReviewsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
