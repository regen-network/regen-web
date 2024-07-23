import type { LinguiConfig } from '@lingui/conf';

const config: LinguiConfig = {
  locales: ['en', 'es'],
  catalogs: [
    {
      path: '<rootDir>/src/lib/i18n/locales/{locale}',
      include: ['src'],
    },
  ],
};

export default config;
