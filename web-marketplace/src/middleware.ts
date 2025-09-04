import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import linguiConfig from '../lingui.config';

const locales = linguiConfig.locales as string[];
export const COOKIE_LOCALE = 'NEXT_LOCALE';
export const COOKIE_OPTS = { path: '/', maxAge: 60 * 60 * 24 * 365 };

const setLocaleCookie = (res: NextResponse, locale: string) => {
  if (res.cookies.get(COOKIE_LOCALE)?.value !== locale) {
    res.cookies.set(COOKIE_LOCALE, locale, COOKIE_OPTS);
  }
};

const getPreferredLocale = (request: NextRequest): string => {
  const cookieLocale = request.cookies.get(COOKIE_LOCALE)?.value;
  if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale;

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
    if (locales.includes(lang)) return lang;
  }
  return locales[0] || 'en';
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
    const response = NextResponse.next();
    setLocaleCookie(response, matchedLocale);
    return response;
  }

  // No locale -> redirect to preferred
  const locale = getPreferredLocale(request);
  nextUrl.pathname = `/${locale}${pathname}`;
  const response = NextResponse.redirect(nextUrl.href);
  setLocaleCookie(response, locale);

  return response;
};
