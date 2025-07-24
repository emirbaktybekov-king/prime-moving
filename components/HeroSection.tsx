"use client";

import { useEffect } from "react";
import { useTranslation } from "@/components/TranslationProvider";

interface HeroSectionProps {
  smoothScrollTo: (elementId: string) => void;
}

export default function HeroSection({ smoothScrollTo }: HeroSectionProps) {
  const { t, locale } = useTranslation();

  useEffect(() => {
    console.log(`[HeroSection] Rendered with locale: ${locale}`);
  }, [locale]);

  const scrollToQuote = () => {
    smoothScrollTo("quote");
  };

  const heroTitle = t("hero.title") as string; // Type assertion since hero.title is always a string

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-aura-blue-50 via-white to-aura-blue-100 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e40af' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='3'/%3E%3Ccircle cx='53' cy='7' r='3'/%3E%3Ccircle cx='7' cy='53' r='3'/%3E%3Ccircle cx='53' cy='53' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-aura-blue-100 rounded-full text-aura-blue-800 font-medium mb-6 animate-fade-in">
            <span className="mr-2">🏠</span>
            COMMERCIAL & RESIDENTIAL MOVING COMPANY
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-slide-up text-gray-900">
            <span className="block">Prime Moving: Comprehensive Moving</span>
            <span className="block text-aura-blue-600">
              Solutions for Bay Area
            </span>
          </h1>

          <p
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Welcome to Prime Moving, Bay Area's #1 choice for comprehensive
            moving services. With a steadfast commitment to excellence, our
            expert team offers top-notch residential and commercial moving
            solutions tailored to your unique needs.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <button
              onClick={scrollToQuote}
              className="bg-aura-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-aura-blue-700 transition-all shadow-lg transform hover:scale-105"
            >
              Contact Us
            </button>
            <button
              onClick={() => smoothScrollTo("services")}
              className="border-2 border-aura-blue-600 text-aura-blue-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-aura-blue-600 hover:text-white transition-all transform hover:scale-105"
            >
              Find us on Yelp
            </button>
          </div>

          {/* Quote Form Section */}
          <div
            className="mt-16 bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Get a free quote
            </h3>
            <p className="text-gray-600 mb-6">
              Leave your contact info and we will contact you ASAP!
            </p>

            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aura-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aura-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aura-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aura-blue-500 focus:border-transparent">
                  <option>Local Moving</option>
                  <option>Long Distance Moving</option>
                  <option>Commercial Moving</option>
                  <option>Packing Services</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-aura-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-aura-blue-700 transition-colors"
              >
                Get Free Quote
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-aura-blue-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-aura-blue-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }
      `}</style>
    </section>
  );
}
