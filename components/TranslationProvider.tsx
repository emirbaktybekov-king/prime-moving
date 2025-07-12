"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { translations, Language } from "@/lib/translations";

// Define the shape of translation files
interface TranslationData {
  [key: string]: string | string[] | TranslationData;
}

// Define keys that return string[]
type ArrayKeys = "calendar.months" | "calendar.daysShort";

// Define the type for the t function
type TranslationFunction = <K extends string>(
  key: K
) => K extends ArrayKeys ? string[] : string;

interface TranslationContextType {
  t: TranslationFunction;
  locale: Language;
  setLocale: (locale: Language) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

export const TranslationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [locale, setLocaleState] = useState<Language>("en");

  // Initialize locale from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLocaleState(savedLanguage);
      console.log(
        `[TranslationProvider] Initialized locale from localStorage: ${savedLanguage}`
      );
    } else {
      console.log(`[TranslationProvider] Using default locale: en`);
    }
  }, []);

  // Log locale changes for debugging
  useEffect(() => {
    console.log(`[TranslationProvider] Locale changed to: ${locale}`);
  }, [locale]);

  const t: TranslationFunction = useCallback(
    <K extends string>(key: K): K extends ArrayKeys ? string[] : string => {
      const keys = key.split(".");
      let value: any = translations[locale];

      for (const k of keys) {
        value = value?.[k];
        if (value === undefined || value === null) {
          console.warn(
            `[TranslationProvider] Translation missing for key "${key}" in language "${locale}"`
          );
          return key as any;
        }
      }

      // Type assertion to match return type
      return (
        typeof value === "string" || Array.isArray(value) ? value : key
      ) as any;
    },
    [locale]
  );

  const setLocale = useCallback((lang: Language) => {
    if (Object.keys(translations).includes(lang)) {
      setLocaleState(lang);
      localStorage.setItem("language", lang);
      console.log(`[TranslationProvider] Set locale to: ${lang}`);
    } else {
      console.error(`[TranslationProvider] Invalid locale: ${lang}`);
    }
  }, []);

  return (
    <TranslationContext.Provider value={{ t, locale, setLocale }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error(
      "[useTranslation] useTranslation must be used within a TranslationProvider"
    );
  }
  return context;
};
