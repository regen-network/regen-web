'use client';

import { useParams } from 'next/navigation';

import type { SupportedLocales } from '../locales';
import { DEFAULT_LOCALE, isSupportedLocale } from '../locales';

export function useCurrentLocale(): SupportedLocales {
  const params = useParams<{ lang?: string }>();
  const lang = (params?.lang as SupportedLocales) || '';
  return isSupportedLocale(lang) ? (lang as SupportedLocales) : DEFAULT_LOCALE;
}
