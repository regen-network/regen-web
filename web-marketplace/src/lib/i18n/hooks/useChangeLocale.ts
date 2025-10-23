'use client';

import { useSetAtom } from 'jotai';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { selectedLanguageAtom } from '../../atoms/languageSwitcher.atoms';
import type { SupportedLocales } from '../locales';
import { setNextLocaleCookie } from '../utils/setNextLocaleCookie';
import { updateLocaleInPath } from '../utils/updateLocaleInPath';

export function useChangeLocale() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const setSelectedLanguage = useSetAtom(selectedLanguageAtom);

  return (nextLang: SupportedLocales) => {
    setSelectedLanguage(nextLang);
    setNextLocaleCookie(nextLang);
    const qs = searchParams.toString();
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const nextPath =
      updateLocaleInPath(pathname, nextLang) + (qs ? `?${qs}` : '') + hash;
    router.replace(nextPath);
  };
}
