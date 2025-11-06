import {
  DEFAULT_LOCALE,
  LOCALE_PREFIX_REGEX,
  SUPPORTED_LOCALES,
} from '../locales';

const DEFAULT_PREFIX_RE = new RegExp(`^/${DEFAULT_LOCALE}(?:/|$)`);

export function ensureLocalePrefix(href: string, locale: string): string {
  if (!href) return href;

  // External / protocol relative URLs
  if (
    href.startsWith('//') ||
    /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(href) // scheme detection
  ) {
    return href;
  }

  // Only prefix site internal paths
  if (!href.startsWith('/')) return href;

  // Strip default locale prefix
  if (DEFAULT_PREFIX_RE.test(href)) {
    href = href.replace(DEFAULT_PREFIX_RE, '/');
  }

  // Already locale prefixed
  if (LOCALE_PREFIX_REGEX.test(href)) return href;

  // Skip if locale is default or unsupported
  if (locale === DEFAULT_LOCALE || !SUPPORTED_LOCALES.includes(locale as any)) {
    return href;
  }

  return `/${locale}${href}`;
}
