
'use client';
import { useState, useEffect } from 'react';
import { useTranslation } from "@/hooks/useTranslation";

export default function Header() {
  const { t, locale, setLocale } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
          ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <span className={`text-2xl font-bold transition-colors ${
                isScrolled ? 'text-orange-600' : 'text-white'
              }`}>
                🚚 Prime Moving
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className={`font-medium transition-colors hover:text-orange-400 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {t('nav.home') || 'Home'}
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className={`font-medium transition-colors hover:text-orange-400 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {t('nav.services') || 'Services'}
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className={`font-medium transition-colors hover:text-orange-400 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {t('nav.about') || 'About'}
              </button>
              <button 
                onClick={() => scrollToSection('quote')}
                className="bg-orange-500 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-600 transition-colors shadow-lg"
              >
                {t('nav.quote') || 'Get Quote'}
              </button>
              
              {/* Language Selector */}
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                className={`px-3 py-1 rounded border transition-colors ${
                  isScrolled 
                    ? 'bg-white border-gray-300 text-gray-700' 
                    : 'bg-white/20 border-white/30 text-white backdrop-blur-sm'
                }`}
              >
                <option value="en">🇺🇸 EN</option>
                <option value="es">🇪🇸 ES</option>
                <option value="ru">🇷🇺 RU</option>
              </select>
            </nav>

            {/* Mobile Hamburger */}
            <button 
              onClick={toggleMenu}
              className={`md:hidden p-2 transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
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
        <div className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <span className="text-2xl font-bold text-orange-600">
                🚚 Prime Moving
              </span>
              <button 
                onClick={closeMenu}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-6 py-8">
              <ul className="space-y-6">
                <li>
                  <button 
                    onClick={() => scrollToSection('home')}
                    className="w-full text-left text-lg font-medium text-gray-700 hover:text-orange-600 transition-colors py-3 border-b border-transparent hover:border-orange-200"
                  >
                    🏠 {t('nav.home') || 'Home'}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="w-full text-left text-lg font-medium text-gray-700 hover:text-orange-600 transition-colors py-3 border-b border-transparent hover:border-orange-200"
                  >
                    🔧 {t('nav.services') || 'Services'}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="w-full text-left text-lg font-medium text-gray-700 hover:text-orange-600 transition-colors py-3 border-b border-transparent hover:border-orange-200"
                  >
                    ℹ️ {t('nav.about') || 'About'}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('quote')}
                    className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold py-4 px-6 rounded-xl text-lg hover:from-orange-500 hover:to-orange-600 transition-all shadow-lg transform hover:scale-105"
                  >
                    📋 {t('nav.quote') || 'Get Free Quote'}
                  </button>
                </li>
              </ul>
            </nav>

            {/* Language Selector */}
            <div className="px-6 py-6 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              >
                <option value="en">🇺🇸 English</option>
                <option value="es">🇪🇸 Español</option>
                <option value="ru">🇷🇺 Русский</option>
              </select>
            </div>

            {/* Contact Info */}
            <div className="px-6 py-6 bg-gray-50">
              <h3 className="font-bold text-gray-800 mb-2">Contact Us</h3>
              <p className="text-sm text-gray-600 mb-1">📞 (555) 123-4567</p>
              <p className="text-sm text-gray-600">📧 info@primemoving.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
