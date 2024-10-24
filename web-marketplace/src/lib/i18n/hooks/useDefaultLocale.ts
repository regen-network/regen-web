import { useEffect } from 'react';
import { useAtom } from 'jotai';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';

import { dynamicActivate } from '../utils/dynamicActivate';

export const useDefaultLocale = () => {
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  useEffect(() => {
    // With this method we dynamically load the catalogs
    dynamicActivate(selectedLanguage);
  }, [selectedLanguage]);
};
