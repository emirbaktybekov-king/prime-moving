
"use client";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhyUsSection from "@/components/WhyUsSection";
import ServicesSection from "@/components/ServicesSection";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";

export default function Home() {
  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header smoothScrollTo={smoothScrollTo} />
      <HeroSection smoothScrollTo={smoothScrollTo} />
      <AboutSection />
      <WhyUsSection smoothScrollTo={smoothScrollTo} />
      <ServicesSection />
      <QuoteSection />
      <Footer />
    </main>
  );
}
