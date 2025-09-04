import { LOCALE_PREFIX_REGEX } from '../locales';

export function updateLocaleInPath(pathname: string, locale: string): string {
  const stripped = pathname.replace(LOCALE_PREFIX_REGEX, '');
  return `/${locale}${stripped || '/'}`;
}
