/* eslint-disable lingui/no-unlocalized-strings */
import { COOKIE_LOCALE, COOKIE_OPTS } from 'middleware';

export const setNextLocaleCookie = (locale: string) => {
  if (typeof document === 'undefined') return;
  // Ensure cookie persists across reloads and is sent site-wide
  const maxAge = 60 * 60 * 24 * 365; // 1 year
  document.cookie = `${COOKIE_LOCALE}=${locale}; Path=/; Max-Age=${maxAge}`;
};
