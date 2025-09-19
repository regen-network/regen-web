import type { LinguiConfig } from '@lingui/conf';
import type { SupportedLocales } from './web-marketplace/src/lib/i18n/locales';

const supportedLocales = process.env.NEXT_PUBLIC_SUPPORTED_LOCALES?.split(',') || ['en'];

export const locales = supportedLocales as SupportedLocales[];

export type Locale = (typeof locales)[number];

const config: LinguiConfig = {
  locales: [...locales],
};

export default config;
