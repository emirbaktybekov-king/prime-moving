
'use client';
import { useTranslation } from "@/hooks/useTranslation";

interface HeroSectionProps {
  smoothScrollTo: (elementId: string) => void;
}

export default function HeroSection({ smoothScrollTo }: HeroSectionProps) {
  const { t } = useTranslation();

  return (
    <section id="hero" className="bg-gradient-to-br from-orange-50 to-orange-100 py-20 mt-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
          {t('hero.title')}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => smoothScrollTo('quote')}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg"
          >
            {t('hero.getFreeQuote')}
          </button>
          <button 
            onClick={() => smoothScrollTo('services')}
            className="border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-500 hover:text-white transition-all"
          >
            {t('hero.viewServices')}
          </button>
        </div>
      </div>
    </section>
  );
}
