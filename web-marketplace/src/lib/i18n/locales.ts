import linguiConfig from '../../../lingui.config';

export type SupportedLocales = typeof linguiConfig.locales[number];

export const SUPPORTED_LOCALES = linguiConfig.locales as SupportedLocales[];

export const DEFAULT_LOCALE: SupportedLocales = SUPPORTED_LOCALES[0] || 'en';

export function isSupportedLocale(
  locale: string | undefined | null,
): locale is SupportedLocales {
  return !!locale && (SUPPORTED_LOCALES as readonly string[]).includes(locale);
}

export const LOCALE_PREFIX_REGEX = new RegExp(
  `^/(?:${SUPPORTED_LOCALES.join('|')})(?:/|$)`,
);
