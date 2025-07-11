
'use client';
import { useState, useEffect } from 'react';
import { useTranslation } from "@/hooks/useTranslation";
import Image from 'next/image';

const flagMap = {
  en: '🇺🇸',
  es: '🇪🇸', 
  ru: '🇷🇺'
};

const languageNames = {
  en: 'English',
  es: 'Español',
  ru: 'Русский'
};

export default function Header() {
  const { t, locale, setLocale } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/98 backdrop-blur-md shadow-lg border-b border-gray-700' 
          : 'bg-gray-900/95 backdrop-blur-sm shadow-md'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/primeMovingHeaderLogo.svg"
                alt="Prime Moving Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('about')}
                className="font-medium text-gray-100 hover:text-orange-400 transition-colors"
              >
                {t('nav.about')}
              </button>
              <button 
                onClick={() => scrollToSection('why-us')}
                className="font-medium text-gray-100 hover:text-orange-400 transition-colors"
              >
                {t('nav.whyUs')}
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="font-medium text-gray-100 hover:text-orange-400 transition-colors"
              >
                {t('nav.services')}
              </button>
              <button 
                onClick={() => scrollToSection('quote')}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors shadow-md"
              >
                {t('nav.quote')}
              </button>
              
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-600 hover:border-orange-400 transition-colors bg-gray-800"
                >
                  <span className="text-lg">{flagMap[locale]}</span>
                  <span className="text-sm font-medium text-gray-100">{languageNames[locale]}</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-600 z-50">
                    {Object.entries(languageNames).map(([code, name]) => (
                      <button
                        key={code}
                        onClick={() => {
                          setLocale(code);
                          setIsLanguageOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors ${
                          locale === code ? 'bg-orange-500 text-white' : 'text-gray-100'
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

            {/* Mobile Hamburger */}
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-100 hover:text-orange-400 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 relative">
                <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                  isMenuOpen ? 'rotate-45 translate-y-2.5' : '-translate-y-1'
                }`} />
                <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                  isMenuOpen ? 'opacity-0' : 'translate-y-1'
                }`} />
                <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                  isMenuOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-3'
                }`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeMenu}
        />

        {/* Drawer */}
        <div className={`absolute top-16 right-0 h-[calc(100vh-4rem)] w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Navigation Links */}
            <nav className="flex-1 px-6 py-8">
              <ul className="space-y-4">
                <li>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="w-full text-left text-lg font-medium text-gray-700 hover:text-orange-600 transition-colors py-3"
                  >
                    {t('nav.about')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('why-us')}
                    className="w-full text-left text-lg font-medium text-gray-700 hover:text-orange-600 transition-colors py-3"
                  >
                    {t('nav.whyUs')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="w-full text-left text-lg font-medium text-gray-700 hover:text-orange-600 transition-colors py-3"
                  >
                    {t('nav.services')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('quote')}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 px-6 rounded-lg text-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg"
                  >
                    {t('nav.quote')}
                  </button>
                </li>
              </ul>
            </nav>

            {/* Language Selector */}
            <div className="px-6 py-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">{t('nav.language')}</h3>
              <div className="space-y-2">
                {Object.entries(languageNames).map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => setLocale(code)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      locale === code ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-50'
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
