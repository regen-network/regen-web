'use client';

import { useEffect, useState } from 'react';
import { i18n, Messages } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { useAtom, useSetAtom } from 'jotai';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { dynamicActivate } from 'lib/i18n/utils/dynamicActivate';

export function LinguiClientProvider({
  children,
  initialLocale,
  initialMessages,
}: {
  children: React.ReactNode;
  initialLocale: string;
  initialMessages: Messages;
}) {
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const setSelectedLanguage = useSetAtom(selectedLanguageAtom);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize i18n
    i18n.load(initialLocale, initialMessages);
    i18n.activate(initialLocale);
    setSelectedLanguage(initialLocale);
    setIsLoaded(true);
  }, [initialLocale, initialMessages, setSelectedLanguage]);

  useEffect(() => {
    // Dynamically load translations
    if (isLoaded) {
      dynamicActivate(selectedLanguage);
    }
  }, [selectedLanguage, isLoaded]);

  // Don't render until i18n is loaded to avoid hydration mismatch
  if (!isLoaded) {
    return null;
  }

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
