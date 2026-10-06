import { en, type TranslationKeys } from './en';
import { bn } from './bn';

export type Language = 'en' | 'bn';

export const translations = {
  en,
  bn,
};

export function translate(
  key: TranslationKeys,
  lang: Language,
  params?: Record<string, string | number>
): string {
  let text: string = translations[lang][key];
  
  if (params) {
    Object.keys(params).forEach((paramKey) => {
      text = text.replace(`{${paramKey}}`, String(params[paramKey]));
    });
  }
  
  return text;
}

export { en, bn };
export type { TranslationKeys };
