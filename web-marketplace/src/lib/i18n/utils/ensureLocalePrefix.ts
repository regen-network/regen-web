import { LOCALE_PREFIX_REGEX } from '../locales';

export function ensureLocalePrefix(href: string, locale: string): string {
  // Only prefix internal links
  if (!href.startsWith('/')) return href;
  // Already prefixed
  if (LOCALE_PREFIX_REGEX.test(href)) return href;
  return `/${locale}${href}`;
}
