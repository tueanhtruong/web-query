export type Locale = {
  md5sum?: string;
  file?: string;
  name?: string;
  code?: LanguageCode;
};
export type LanguageCode = 'en' | 'sm' | 'vi' | 'zh' | 'zh-cn' | 'ja' | 'ko' | 'tl';

const LOCAL_STORAGE_LANGUAGE = 'language';
const LOCAL_STORAGE_LOCALE = 'locale';
const LOCAL_STORAGE_TRANSLATION = 'translation';
const DEFAULT_LANGUAGE = 'en';

const setTranslation = (translation) => {
  localStorage.setItem(LOCAL_STORAGE_TRANSLATION, JSON.stringify(translation));
};

const getTranslation = () => {
  const result = localStorage.getItem(LOCAL_STORAGE_TRANSLATION);
  if (result) return JSON.parse(result);
  return {};
};

const setLocale = (language: Locale) => {
  localStorage.setItem(LOCAL_STORAGE_LOCALE, JSON.stringify(language));
};

const getLocale = (): Locale => {
  const result = localStorage.getItem(LOCAL_STORAGE_LOCALE);
  if (result) return JSON.parse(result);
  return { code: DEFAULT_LANGUAGE };
};

const getLanguage = () => {
  const locale = getLocale();
  return locale.code;
};

const setLanguage = (language) => {
  localStorage.setItem(LOCAL_STORAGE_LANGUAGE, JSON.stringify(language));
};

export default {
  setLocale,
  getLocale,
  setTranslation,
  getTranslation,
  getLanguage,
  setLanguage,
};
