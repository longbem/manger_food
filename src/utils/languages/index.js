import I18n from 'i18n-js';
import en from './en.json';
import vn from './vn.json';

I18n.locale = 'en';
I18n.fallbacks = false;
I18n.missingTranslation = (scope, options) => {
  return scope;
};

export const changeLanguage = languagesKey => {
  I18n.locale = languagesKey;
};

I18n.translations = {
  en,
  vn,
};

export { I18n };
