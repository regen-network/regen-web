import type { LinguiConfig } from '@lingui/conf';

import rootConfig from '../lingui.config';

const config: LinguiConfig = {
  ...rootConfig,
  catalogs: [
    {
      path: '<rootDir>/src/lib/i18n/locales/{locale}',
      include: ['src'],
    },
  ],
};

export default config;
