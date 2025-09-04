import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { DEFAULT_LOCALE } from 'lib/i18n/locales';

export const bannerTextAtom = atom('');

export const selectedLanguageAtom = atomWithStorage(
  'selectedLanguage',
  DEFAULT_LOCALE,
);
