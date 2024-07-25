import { useEffect } from 'react';

import { defaultLocale } from 'lib/i18n/i18n';

import { dynamicActivate } from '../utils/dynamicActivate';

export const useDefaultLocale = () => {
  useEffect(() => {
    // With this method we dynamically load the catalogs
    dynamicActivate(defaultLocale);
  }, []);
};
