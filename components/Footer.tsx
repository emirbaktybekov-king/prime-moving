"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "@/components/TranslationProvider";

export default function Footer() {
  const { t, locale } = useTranslation();

  useEffect(() => {
    console.log(`[Footer] Rendered with locale: ${locale}`);
  }, [locale]);

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Image
                src="/primeMovingFooterLogo.svg"
                alt="Prime Move Logo"
                width={130}
                height={100}
                className="rounded"
              />
            </div>
            <p className="text-gray-400">{t("footer.tagline")}</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t("footer.services")}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>{t("footer.residential")}</li>
              <li>{t("footer.commercial")}</li>
              <li>{t("footer.packing")}</li>
              <li>{t("footer.storage")}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📞 (929) 720-4502</li>
              <li>✉️ primemove77@gmail.com</li>
              <li>📍 3595 Deep Cove Dr, Cumming, GA 30041</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t("footer.hours")}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>{t("footer.hoursMonFri")}</li>
              <li>{t("footer.hoursSat")}</li>
              <li>{t("footer.hoursSun")}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
