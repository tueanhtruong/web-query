import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import appConfig from 'src/appConfig';
import en from './translation/en.json';
import vi from './translation/vi.json';

import LanguageService from 'src/services/language';

// const localLocale = LanguageService.getLocale();

// const translation = localLocale.code === 'vi' ? vi : en;

// const translation = LanguageService.getTranslation();

i18n.use(initReactI18next).init(({
  // lng: 'en',
  // ns: 'translation',
  resources: {
    // all: {
    //   translation: { ...translation },
    // },
    en: {
      translation: en,
    },
    vi: {
      translation: vi,
    },
  },
  fallbackLng: 'en',
  /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */
  nsSeparator: false,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  returnEmptyString: false,
  parseMissingKeyHandler: (key) => {
    const localLocale = LanguageService.getLocale();
    if (appConfig.APP_ENV === 'dev' && localLocale.code !== 'en') return `[${key}]`;
    return key;
  },
  react: {
    wait: true,
  },
} as unknown) as InitOptions);

export default i18n;
