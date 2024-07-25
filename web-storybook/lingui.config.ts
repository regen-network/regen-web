import type { LinguiConfig } from '@lingui/conf';
import rootConfig from '../lingui.config';

const config: LinguiConfig = {
  ...rootConfig,
  catalogs: [
    {
      path: '../web-marketplace/src/lib/i18n/locales/{locale}',
      include: [],
    },
  ],
};

export default config;
