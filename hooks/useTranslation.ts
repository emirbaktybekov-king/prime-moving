// hooks/useTranslation.ts
'use client';

import { useTranslation as useContextTranslation } from '@/components/TranslationProvider';

export const useTranslation = () => {
  const context = useContextTranslation();
  if (!context) {
    throw new Error('[useTranslation] useTranslation must be used within a TranslationProvider');
  }
  return context;
};