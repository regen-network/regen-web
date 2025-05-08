import { msg } from '@lingui/macro';
import { VOLUNTARY_MARKET } from 'legacy-pages/Projects/AllProjects/AllProjects.constants';

import { IconTabProps } from 'web-components/src/components/tabs/IconTab';
import { LinkType } from 'web-components/src/types/shared/linkType';

import {
  ComplianceInfoQuery,
  TerrasosBookCall,
} from 'generated/sanity-graphql';
import { getLinkHref } from 'lib/button';
import { ProjectMetadataLD, ProjectPageMetadataLD } from 'lib/db/types/json-ld';
import { TranslatorType } from 'lib/i18n/i18n.types';

import ComplianceInfo from './TerrasosCreditsInfo.ComplianceInfo';
import TebuInfo from './TerrasosCreditsInfo.TebuInfo';

type GetTerrasosCreditsTabsProps = {
  _: TranslatorType;
  projectBatchTotals?: JSX.Element;
  projectPageMetadata?: ProjectPageMetadataLD;
  projectMetadata?: ProjectMetadataLD;
  isOnChain?: boolean;
  complianceInfo?: ComplianceInfoQuery;
  complianceCredits?: JSX.Element;
  isComplianceProject: boolean;
  bookCall?: TerrasosBookCall;
};

export function getTerrasosCreditsTabs({
  _,
  projectBatchTotals,
  projectPageMetadata,
  projectMetadata,
  complianceInfo,
  complianceCredits,
  isComplianceProject,
  bookCall,
}: GetTerrasosCreditsTabsProps): IconTabProps[] {
  const complianceInfoItem = complianceInfo?.allComplianceInfo[0];
  const learnMoreLink: LinkType = {
    href: getLinkHref(bookCall?.button?.buttonLink),
    text: bookCall?.button?.buttonText ?? '',
  };
  const description = complianceInfoItem?.descriptionRaw;
  const metadata = projectPageMetadata || projectMetadata;

  return [
    {
      label: _(msg`Tebu Credits`),
      content: metadata && (
        <TebuInfo
          projectBatchTotals={projectBatchTotals}
          projectMetadata={metadata}
          _={_}
        />
      ),
      hidden:
        !metadata ||
        !metadata?.['regen:marketType']?.includes(VOLUNTARY_MARKET),
    },
    {
      label: _(msg`Compliance Credits`),
      content: (
        <ComplianceInfo
          learnMoreLink={learnMoreLink}
          description={description}
          complianceCredits={complianceCredits}
          projectMetadata={projectMetadata}
        />
      ),
      hidden: !isComplianceProject,
    },
  ].filter(tab => !tab.hidden);
}
