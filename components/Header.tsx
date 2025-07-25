// components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/components/TranslationProvider";
import Image from "next/image";

interface HeaderProps {
  smoothScrollTo: (elementId: string) => void;
}

const flagMap: Record<string, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
  ru: "🇷🇺",
};

const languageNames: Record<string, string> = {
  en: "English",
  es: "Español",
  ru: "Русский",
};

export default function Header({ smoothScrollTo }: HeaderProps) {
  const { t, locale, setLocale } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Log locale for debugging
  useEffect(() => {
    console.log(`[Header] Rendered with locale: ${locale}`);
  }, [locale]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    smoothScrollTo(sectionId);
    closeMenu();
  };

  const handleLocaleChange = (newLocale: string) => {
    console.log(`[Header] Switching to locale: ${newLocale}`);
    setLocale(newLocale as "en" | "es" | "ru");
    setIsLanguageOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center">
              <Image
                src="/primeMovingHeaderLogo.svg"
                alt="Prime Moving Logo"
                width={120}
                height={80}
                className="h-10 w-auto"
              />
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="font-medium text-gray-700 hover:text-aura-blue-600 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="font-medium text-gray-700 hover:text-aura-blue-600 transition-colors"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="font-medium text-gray-700 hover:text-aura-blue-600 transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className="font-medium text-gray-700 hover:text-aura-blue-600 transition-colors"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection("blog")}
                className="font-medium text-gray-700 hover:text-aura-blue-600 transition-colors"
              >
                Blog
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="font-medium text-gray-700 hover:text-aura-blue-600 transition-colors"
              >
                Contact Us
              </button>
              <button
                onClick={() => scrollToSection("quote")}
                className="bg-aura-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-aura-blue-700 transition-colors shadow-md"
              >
                Get Instant Quote
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors bg-white text-gray-700"
                  aria-label="Toggle language selector"
                >
                  <span>{flagMap[locale] || "🌐"}</span>
                  <span>{languageNames[locale] || "Language"}</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform ${
                      isLanguageOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isLanguageOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                    {Object.entries(languageNames).map(([code, name]) => (
                      <button
                        key={code}
                        onClick={() => handleLocaleChange(code)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-left text-sm transition-colors ${
                          locale === code
                            ? "bg-aura-blue-50 text-aura-blue-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-lg">{flagMap[code]}</span>
                        <span className="font-medium">{name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-700 hover:text-aura-blue-600 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 relative">
                <span
                  className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                    isMenuOpen ? "rotate-45 translate-y-2.5" : "-translate-y-1"
                  }`}
                />
                <span
                  className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                    isMenuOpen ? "opacity-0" : "translate-y-1"
                  }`}
                />
                <span
                  className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                    isMenuOpen ? "-rotate-45 translate-y-2.5" : "translate-y-3"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeMenu}
        />

        <div
          className={`absolute top-16 right-0 h-[calc(100vh-4rem)] w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <nav className="flex-1 px-6 py-8">
              <ul className="space-y-4">
                <li>
                  <button
                    onClick={() => scrollToSection("home")}
                    className="w-full text-left text-lg font-medium text-gray-700 hover:text-aura-blue-600 transition-colors py-3"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="w-full text-left text-lg font-medium text-gray-700 hover:text-aura-blue-600 transition-colors py-3"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="w-full text-left text-lg font-medium text-gray-700 hover:text-aura-blue-600 transition-colors py-3"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("reviews")}
                    className="w-full text-left text-lg font-medium text-gray-700 hover:text-aura-blue-600 transition-colors py-3"
                  >
                    Reviews
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("blog")}
                    className="w-full text-left text-lg font-medium text-gray-700 hover:text-aura-blue-600 transition-colors py-3"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="w-full text-left text-lg font-medium text-gray-700 hover:text-aura-blue-600 transition-colors py-3"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("quote")}
                    className="w-full bg-gradient-to-r from-aura-blue-600 to-aura-blue-700 text-white font-bold py-4 px-6 rounded-lg text-lg hover:from-aura-blue-700 hover:to-aura-blue-800 transition-all shadow-lg"
                  >
                    Get Instant Quote
                  </button>
                </li>
              </ul>
            </nav>

            <div className="px-6 py-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Language
              </h3>
              <div className="space-y-2">
                {Object.entries(languageNames).map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => handleLocaleChange(code)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      locale === code
                        ? "bg-aura-blue-50 text-aura-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-lg">{flagMap[code]}</span>
                    <span className="font-medium">{name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
