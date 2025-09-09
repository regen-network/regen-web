import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { DEFAULT_LOCALE } from 'lib/i18n/locales';

import linguiConfig from '../lingui.config';

const locales = linguiConfig.locales as string[];
export const COOKIE_LOCALE = 'NEXT_LOCALE';
export const COOKIE_OPTS = { path: '/', maxAge: 60 * 60 * 24 * 365 };

const setLocaleCookie = (res: NextResponse, locale: string) => {
  if (res.cookies.get(COOKIE_LOCALE)?.value !== locale) {
    res.cookies.set(COOKIE_LOCALE, locale, COOKIE_OPTS);
  }
};

export const middleware = (request: NextRequest) => {
  const { nextUrl } = request;
  const { pathname } = nextUrl;

  // Skip Next internals and static assets
  if (pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next();
  }

  // If path already includes a supported locale, pass through and persist cookie
  const matchedLocale = locales.find(
    l => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (matchedLocale) {
    // If the matched locale is the default, redirect to path without the locale prefix
    if (matchedLocale === DEFAULT_LOCALE) {
      // Remove the leading default locale from the path
      const escaped = DEFAULT_LOCALE.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const re = new RegExp(`^/${escaped}(?:/|$)`);
      const strippedPath = pathname.replace(re, '/');
      nextUrl.pathname = strippedPath === '' ? '/' : strippedPath;
      const response = NextResponse.redirect(nextUrl.href);
      setLocaleCookie(response, matchedLocale);
      return response;
    }

    const response = NextResponse.next();
    setLocaleCookie(response, matchedLocale);
    return response;
  }

  // No locale in URL (first time visitor or explicit default choice)
  const cookieLocale = request.cookies.get(COOKIE_LOCALE)?.value;

  // If no cookie exists, detect browser locale
  if (!cookieLocale) {
    const acceptLanguage = request.headers.get('accept-language') || '';
    const parsed = acceptLanguage
      .split(',')
      .map(token => {
        const [tagPart, qPart] = token.trim().split(';q=');
        const baseTag = tagPart.split('-')[0];
        const quality = qPart ? parseFloat(qPart) : 1;
        return { tag: baseTag, q: Number.isFinite(quality) ? quality : 0 };
      })
      .sort((a, b) => b.q - a.q)
      .map(x => x.tag);

    for (const lang of parsed) {
      if (locales.includes(lang) && lang !== DEFAULT_LOCALE) {
        // Redirect to prefixed URL
        nextUrl.pathname = `/${lang}${pathname}`;
        const response = NextResponse.redirect(nextUrl.href);
        setLocaleCookie(response, lang);
        return response;
      }
    }
  }

  // No locale in URL means default locale (either explicit choice or browser default)
  // For default locale, internally rewrite to the default locale prefixed route
  // so the app's [lang] routes are matched, but keep the URL path without prefix.
  nextUrl.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  const response = NextResponse.rewrite(nextUrl);
  setLocaleCookie(response, DEFAULT_LOCALE);
  return response;
};
