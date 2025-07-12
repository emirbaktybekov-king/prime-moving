"use client";

import { useEffect } from "react";
import { useTranslation } from "@/components/TranslationProvider";

export default function ServicesSection() {
  const { t, locale } = useTranslation();

  useEffect(() => {
    console.log(`[ServicesSection] Rendered with locale: ${locale}`);
  }, [locale]);

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl font-bold text-center text-gray-800 mb-12">
          {t("services.title")}
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-orange-100 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🏠</div>
            <h4 className="text-2xl font-bold text-gray-800 mb-4 text-orange-600">
              {t("services.residential")}
            </h4>
            <p className="text-gray-600">{t("services.residentialDesc")}</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg border border-orange-100 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🏢</div>
            <h4 className="text-2xl font-bold text-gray-800 mb-4 text-orange-600">
              {t("services.commercial")}
            </h4>
            <p className="text-gray-600">{t("services.commercialDesc")}</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg border border-orange-100 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📦</div>
            <h4 className="text-2xl font-bold text-gray-800 mb-4 text-orange-600">
              {t("services.packing")}
            </h4>
            ly <p className="text-gray-600">{t("services.packingDesc")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
