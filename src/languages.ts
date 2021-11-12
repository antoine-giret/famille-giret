export const languages = ['fr', 'en'] as const;
export type TLanguage = typeof languages[number];

export const defaultLanguage: TLanguage = 'fr';

export const languagesMap: { [key in TLanguage]: { label: string } } = {
  fr: { label: 'Français' },
  en: { label: 'English' },
} as const;

export const prismicLanguagesMap: { [key: string]: TLanguage } = {
  'fr-fr': 'fr',
  'en-gb': 'en',
} as const;
