"use client";

import { useState, useEffect, useCallback } from "react";
import { translations, Language } from "@/lib/translations";

export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage);
      console.log(`Loaded language from localStorage: ${savedLanguage}`);
    } else {
      console.log(`No valid saved language, defaulting to: ${language}`);
    }
  }, []); // Empty dependencies: run once on mount

  const t = useCallback(
    (key: string): string => {
      const keys = key.split(".");
      let value: any = translations[language];

      for (const k of keys) {
        value = value?.[k];
        if (value === undefined || value === null) {
          console.warn(
            `Translation missing for key "${key}" in language "${language}"`
          );
          return key;
        }
      }

      return typeof value === "string" ? value : key;
    },
    [language]
  );

  const setLocale = useCallback((lang: Language) => {
    if (Object.keys(translations).includes(lang)) {
      setLanguage(lang);
      localStorage.setItem("language", lang);
      console.log(`Set locale to: ${lang}`);
    } else {
      console.error(`Invalid locale: ${lang}`);
    }
  }, []);

  return { t, locale: language, setLocale };
};
