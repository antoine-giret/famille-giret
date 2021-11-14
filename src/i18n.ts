import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { defaultLanguage } from './environment';
import enTranslation from './translations/en.json';
import frTranslation from './translations/fr.json';

i18n.use(initReactI18next).init({
  resources: { en: { translation: enTranslation }, fr: { translation: frTranslation } },
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  interpolation: { escapeValue: false },
});
