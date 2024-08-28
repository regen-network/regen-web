import { msg } from '@lingui/macro';

import { formatDate } from 'web-components/src/utils/format';

import { TranslatorType } from 'lib/i18n/i18n.types';

export const getDateCriteria = (
  _: TranslatorType,
  minStartDate?: string,
  startDateWindow?: string,
): string => {
  if (minStartDate) return formatDate(minStartDate);
  if (startDateWindow)
    return `${startDateWindow} ${_(msg`rolling acceptance window`)}`;
  return '-';
};
