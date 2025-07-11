"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface HeaderProps {
  smoothScrollTo: (elementId: string) => void;
}

export default function Header({ smoothScrollTo }: HeaderProps) {
  const { t, language, changeLanguage } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0];

  return (
    <>
      <header className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg fixed w-full top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/primeMovingHeaderLogo.svg"
                alt="Prime Move Logo"
                width={120}
                height={40}
                className="h-10 w-auto cursor-pointer"
                onClick={() => smoothScrollTo("hero")}
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => smoothScrollTo("about")}
                className="hover:text-orange-100 transition-colors font-medium"
              >
                {t("nav.about")}
              </button>
              <button
                onClick={() => smoothScrollTo("why-us")}
                className="hover:text-orange-100 transition-colors font-medium"
              >
                {t("nav.whyUs")}
              </button>
              <button
                onClick={() => smoothScrollTo("services")}
                className="hover:text-orange-100 transition-colors font-medium"
              >
                {t("nav.services")}
              </button>
            </nav>

            {/* Desktop Language Selector & CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Select language"
                >
                  <span>{currentLanguage.flag}</span>
                  <span className="text-sm font-medium">{currentLanguage.code.toUpperCase()}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isLanguageDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code);
                          setIsLanguageDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-gray-800 hover:bg-orange-50 transition-colors flex items-center space-x-3 ${
                          language === lang.code ? "bg-orange-100 font-medium" : ""
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => smoothScrollTo("quote")}
                className="bg-white text-orange-600 px-6 py-2 rounded-lg hover:bg-orange-50 transition-colors font-semibold shadow-md"
              >
                {t("nav.contactNow")}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:text-orange-100 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50" 
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Drawer */}
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Close button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-600 hover:text-gray-800 p-2"
                  aria-label="Close mobile menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 space-y-4">
                <button
                  onClick={() => {
                    smoothScrollTo("about");
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-gray-800 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors font-medium"
                >
                  {t("nav.about")}
                </button>
                <button
                  onClick={() => {
                    smoothScrollTo("why-us");
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-gray-800 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors font-medium"
                >
                  {t("nav.whyUs")}
                </button>
                <button
                  onClick={() => {
                    smoothScrollTo("services");
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-gray-800 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors font-medium"
                >
                  {t("nav.services")}
                </button>

                {/* Language Selector */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600 mb-3 px-4">{t("nav.language")}:</div>
                  <div className="space-y-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center space-x-3 ${
                          language === lang.code 
                            ? "bg-orange-100 text-orange-600 font-medium" 
                            : "text-gray-800 hover:bg-orange-50"
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Button */}
                <div className="pt-4">
                  <button
                    onClick={() => {
                      smoothScrollTo("quote");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all font-semibold shadow-lg"
                  >
                    {t("nav.contactNow")}
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}