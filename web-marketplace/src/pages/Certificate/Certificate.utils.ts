import { msg } from '@lingui/macro';

import { CertificateType } from 'web-components/src/components/certificate/certificate.types';
import { truncate } from 'web-components/src/utils/truncate';

import { getHashUrl } from 'lib/block-explorer';
import { TranslatorType } from 'lib/i18n/i18n.types';
import { NormalizedRetirement } from 'lib/normalizers/retirements/normalizeRetirement';

import { CERTIFICATE_TITLE } from './Certificate.constants';

/* getCertificateData */

export type GetCertificateDataParams = {
  retirement: NormalizedRetirement;
  _: TranslatorType;
};

export const getCertificateData = ({
  retirement,
  _,
}: GetCertificateDataParams): CertificateType => {
  return {
    certificateTitle: `${retirement.retirementLabel} ${_(
      CERTIFICATE_TITLE,
    )}`.trim(),
    certificateIcon: retirement.retirementIcon,
    creditsUnits: Number(retirement.amountRetired),
    creditUnitName: retirement.creditClassName,
    equivalentTonsCO2:
      retirement.creditClassType === 'C'
        ? Number(retirement.amountRetired)
        : undefined,
    itemLinks: [
      {
        name: _(msg`Project`),
        link: {
          text: retirement.projectName,
          href: `/project/${retirement?.projectId}`,
        },
      },
      {
        name: _(msg`Credit class`),
        link: {
          text: retirement.creditClassName ?? '',
          href: `/credit-classes/${retirement.creditClassId}`,
        },
      },
      {
        name: _(msg`Retired by`),
        link: {
          text: retirement.owner?.name ?? '',
          href: retirement.owner?.link ?? '',
        },
      },
    ],
    retirementLocation: retirement.retirementLocation,
    retirementReason: retirement.retirementReason,
    txHash: {
      text: truncate(retirement.txHash),
      href: getHashUrl(retirement.txHash),
    },
    date: retirement.retirementDate,
  };
};
