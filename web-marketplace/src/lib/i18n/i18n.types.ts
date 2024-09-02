import { msg } from '@lingui/macro';
import { I18nContext } from '@lingui/react';

export type TranslatorType = I18nContext['_'];
export type MessageDescriptorType = ReturnType<typeof msg>;
