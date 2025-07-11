// lib/translations.ts
export type Language = "en" | "es" | "ru";

// Define the shape of translation objects
interface Translation {
  nav: {
    about: string;
    whyUs: string;
    services: string;
    quote: string;
    language: string;
  };
  [key: string]: any; // Allow nested keys for flexibility
}

// Import the JSON files
import enTranslations from "../locales/en.json";
import esTranslations from "../locales/es.json";
import ruTranslations from "../locales/ru.json";

export const translations: Record<Language, Translation> = {
  en: enTranslations,
  es: esTranslations,
  ru: ruTranslations,
};
