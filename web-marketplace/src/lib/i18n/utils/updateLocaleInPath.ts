import { DEFAULT_LOCALE, LOCALE_PREFIX_REGEX } from '../locales';

export function updateLocaleInPath(pathname: string, locale: string): string {
  const stripped = pathname.replace(LOCALE_PREFIX_REGEX, '');
  const suffix = stripped
    ? stripped.startsWith('/')
      ? stripped
      : `/${stripped}`
    : '/';
  if (locale === DEFAULT_LOCALE) return suffix;
  return `/${locale}${suffix}`;
}
