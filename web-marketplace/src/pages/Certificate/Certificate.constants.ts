import { msg } from '@lingui/macro';

import { TranslatorType } from 'lib/i18n/i18n.types';

export const CERTIFICATE_TITLE = msg`Retirement Certificate`;
export const getCertificateLabels = (
  _: TranslatorType,
): Record<string, string> => ({
  TX_HASH: _(msg`Blockchain record`),
  EQUIVALENT_TO: _(msg`Equivalent to`),
  CREDIT_UNIT: _(msg`ton`),
  CREDIT_UNIT_SUFFIX: _(msg`of CO2e`),
  NUMBER_OF_CREDITS: _(msg`Number of credits`),
  PROJECT: _(msg`Project`),
  CREDIT_CLASS: _(msg`Credit class`),
  RETIRED_BY: _(msg`Retired by`),
  RETIREMENT_REASON: _(msg`Retirement reason`),
  RETIREMENT_LOCATION: _(msg`Retirement location`),
});
