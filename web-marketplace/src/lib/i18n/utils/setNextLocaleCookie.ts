/* eslint-disable lingui/no-unlocalized-strings */
import { COOKIE_LOCALE, COOKIE_OPTS } from 'middleware';

export const setNextLocaleCookie = (locale: string) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_LOCALE}=${locale}; ${COOKIE_OPTS}`;
};
