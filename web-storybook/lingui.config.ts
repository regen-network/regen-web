import type { LinguiConfig } from '@lingui/conf';

const config: LinguiConfig = {
  locales: ['en', 'es'],
  catalogs: [
    {
      path: '../web-marketplace/src/lib/i18n/locales/{locale}',
      include: [],
    },
  ],
};

export default config;
