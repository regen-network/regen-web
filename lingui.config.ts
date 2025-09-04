import type { LinguiConfig } from '@lingui/conf';

export const localesConst = ['en', 'es'] as const;

export type Locale = (typeof localesConst)[number];

const config: LinguiConfig = {
  locales: [...localesConst],
};

export default config;
