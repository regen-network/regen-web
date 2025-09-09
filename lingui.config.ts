import type { LinguiConfig } from '@lingui/conf';

export const locales = ['en', 'es'] as const;

export type Locale = (typeof locales)[number];

const config: LinguiConfig = {
  locales: [...locales],
};

export default config;
