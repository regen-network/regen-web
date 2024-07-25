import { i18n } from '@lingui/core';

export async function dynamicActivate(locale: string) {
  const { messages } = await import(`lib/i18n/locales/${locale}.po`);

  i18n.load(locale, messages);
  i18n.activate(locale);
}
