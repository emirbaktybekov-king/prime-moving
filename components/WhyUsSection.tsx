'use client';

import { useEffect } from 'react';
import { useTranslation } from '@/components/TranslationProvider';

interface WhyUsSectionProps {
  smoothScrollTo: (elementId: string) => void;
}

export default function WhyUsSection({ smoothScrollTo }: WhyUsSectionProps) {
  const { t, locale } = useTranslation();

  useEffect(() => {
    console.log(`[WhyUsSection] Rendered with locale: ${locale}`);
  }, [locale]);

  return (
    <section id="why-us" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl font-bold text-center text-gray-800 mb-12">
          {t('whyUs.title')}
        </h3>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6">
            <div className="text-5xl mb-4 text-orange-500">🛡️</div>
            <h4 className="text-xl font-bold text-gray-800 mb-4">
              {t('whyUs.licensed')}
            </h4>
            <p className="text-gray-600">{t('whyUs.licensedDesc')}</p>
          </div>
          <div className="text-center p-6">
            <div className="text-5xl mb-4 text-orange-500">👥</div>
            <h4 className="text-xl font-bold text-gray-800 mb-4">
              {t('whyUs.experienced')}
            </h4>
            <p className="text-gray-600">{t('whyUs.experiencedDesc')}</p>
          </div>
          <div className="text-center p-6">
            <div className="text-5xl mb-4 text-orange-500">💰</div>
            <h4 className="text-xl font-bold text-gray-800 mb-4">
              {t('whyUs.transparent')}
            </h4>
            <p className="text-gray-600">{t('whyUs.transparentDesc')}</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8 rounded-lg text-center">
          <h4 className="text-3xl font-bold mb-4">{t('whyUs.ctaTitle')}</h4>
          <p className="text-xl mb-6 text-orange-100">{t('whyUs.ctaDesc')}</p>
          <button
            onClick={() => smoothScrollTo('quote')}
            className="bg-white text-orange-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-50 transition-colors shadow-lg"
          >
            {t('whyUs.requestQuote')}
          </button>
        </div>
      </div>
    </section>
  );
}