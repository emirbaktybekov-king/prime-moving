export type Language = 'en' | 'es' | 'ru';

// Import the JSON files
import enTranslations from '../locales/en.json';
import esTranslations from '../locales/es.json';
import ruTranslations from '../locales/ru.json';

export const translations = {
  en: enTranslations,
  es: esTranslations,
  ru: ruTranslations
};