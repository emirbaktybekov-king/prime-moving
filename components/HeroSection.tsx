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
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-90">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='3'/%3E%3Ccircle cx='53' cy='7' r='3'/%3E%3Ccircle cx='7' cy='53' r='3'/%3E%3Ccircle cx='53' cy='53' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div
        className="absolute top-20 left-10 w-20 h-20 bg-white bg-opacity-20 rounded-full animate-bounce"
        style={{ animationDelay: "0s", animationDuration: "3s" }}
      />
      <div
        className="absolute top-40 right-20 w-16 h-16 bg-white bg-opacity-15 rounded-full animate-bounce"
        style={{ animationDelay: "1s", animationDuration: "4s" }}
      />
      <div
        className="absolute bottom-40 left-20 w-12 h-12 bg-white bg-opacity-25 rounded-full animate-bounce"
        style={{ animationDelay: "2s", animationDuration: "5s" }}
      />
      <div
        className="absolute bottom-20 right-40 w-14 h-14 bg-white bg-opacity-20 rounded-full animate-bounce"
        style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}
      />

      <div className="container mx-auto px-4 text-center text-white relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white font-medium mb-6 animate-fade-in">
            <span className="mr-2">⭐</span>
            {t("hero.badge")}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-slide-up">
            <span className="block text-white drop-shadow-xl">
              {heroTitle.split(" ").slice(0, -3).join(" ")}
            </span>
            <span className="block text-yellow-200 drop-shadow-xl">
              {heroTitle.split(" ").slice(-3).join(" ")}
            </span>
          </h1>

          <p
            className="text-lg md:text-xl text-orange-50 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            {t("hero.description")}
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <button
              onClick={scrollToQuote}
              className="bg-white text-orange-600 font-bold py-3 px-8 rounded-lg text-lg hover:bg-orange-50 transition-all shadow-lg transform hover:scale-105"
            >
              {t("hero.getFreeQuote")}
            </button>
            <button
              onClick={() => smoothScrollTo("services")}
              className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-white hover:text-orange-600 transition-all transform hover:scale-105"
            >
              {t("hero.viewServices")}
            </button>
          </div>

          <div
            className="mt-12 flex flex-wrap justify-center items-center gap-6 text-orange-50 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="flex items-center">
              <span className="text-xl mr-2">🛡️</span>
              <span className="font-medium">
                {t("hero.trust.fullyInsured")}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-xl mr-2">⚡</span>
              <span className="font-medium">
                {t("hero.trust.sameDayService")}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-xl mr-2">💯</span>
              <span className="font-medium">
                {t("hero.trust.satisfaction")}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-xl mr-2">📞</span>
              <span className="font-medium">{t("hero.trust.support")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
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
