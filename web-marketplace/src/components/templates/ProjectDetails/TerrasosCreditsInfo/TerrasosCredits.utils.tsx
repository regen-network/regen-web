import { msg } from '@lingui/macro';

import { IconTabProps } from 'web-components/src/components/tabs/IconTab';
import { LinkType } from 'web-components/src/types/shared/linkType';

import { ComplianceInfoQuery } from 'generated/sanity-graphql';
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
};

export function getTerrasosCreditsTabs({
  _,
  projectBatchTotals,
  projectPageMetadata,
  projectMetadata,
  isOnChain,
  complianceInfo,
  complianceCredits,
  isComplianceProject,
}: GetTerrasosCreditsTabsProps): IconTabProps[] {
  const complianceInfoItem = complianceInfo?.allComplianceInfo[0];
  const learnMoreLink: LinkType = {
    href: complianceInfoItem?.bookCallLink?.href ?? '',
    text: complianceInfoItem?.bookCallLink?.text ?? '',
  };
  const description = complianceInfoItem?.descriptionRaw;

  return [
    {
      label: _(msg`Tebu Credits`),
      content: projectPageMetadata && (
        <TebuInfo
          projectBatchTotals={projectBatchTotals}
          projectPageMetadata={projectPageMetadata}
          _={_}
        />
      ),
      hidden: !(projectPageMetadata && isOnChain),
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