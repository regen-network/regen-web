import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import {
  defaultLocale,
  // locales
} from 'lib/i18n/i18n';

export const bannerTextAtom = atom('');

const getInitialLanguage = () => {
  // Commenting out temporarily to always default to english until content translations completed
  // if (typeof navigator !== 'undefined') {
  //   const browserLang = navigator.language.split('-')[0];
  //   const supportedLocales = Object.keys(locales);
  //   return supportedLocales.includes(browserLang) ? browserLang : defaultLocale;
  // }
  return defaultLocale;
};

export const selectedLanguageAtom = atomWithStorage(
  'selectedLanguage',
  getInitialLanguage(),
);
