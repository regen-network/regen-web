import { Box } from '@mui/material';

import { pxToRem } from 'web-components/src/theme/muiTheme';

import {
  ComplianceInfoQuery,
  TerrasosBookCall,
} from 'generated/sanity-graphql';
import { ProjectMetadataLD, ProjectPageMetadataLD } from 'lib/db/types/json-ld';
import { TranslatorType } from 'lib/i18n/i18n.types';

import { TableTabs } from 'components/organisms/TableTabs';

import { getTerrasosCreditsTabs } from './TerrasosCredits.utils';

type Props = {
  _: TranslatorType;
  projectBatchTotals?: JSX.Element;
  projectPageMetadata: ProjectPageMetadataLD;
  projectMetadata?: ProjectMetadataLD;
  isOnChain?: boolean;
  complianceInfo?: ComplianceInfoQuery;
  complianceCredits?: JSX.Element;
  isComplianceProject: boolean;
  className?: string;
  bookCall?: TerrasosBookCall;
};

export default function TerrasosCreditsInfo({
  _,
  projectBatchTotals,
  projectPageMetadata,
  projectMetadata,
  isOnChain,
  complianceInfo,
  complianceCredits,
  isComplianceProject,
  className,
  bookCall,
}: Props) {
  const tabs = getTerrasosCreditsTabs({
    _,
    projectBatchTotals,
    projectPageMetadata,
    projectMetadata,
    isOnChain,
    complianceInfo,
    complianceCredits,
    isComplianceProject,
    bookCall,
  });
  return tabs.length > 0 ? (
    <Box sx={{ mt: 0 }} className={className}>
      <TableTabs
        sx={{
          px: { xs: 0, sm: 0 },
          pt: { xs: pxToRem(85), sm: pxToRem(76) },
          pb: { xs: 0, sm: 0 },
        }}
        tabs={tabs}
        // eslint-disable-next-line lingui/no-unlocalized-strings
        tabOuterClassName="border-sc-card-standard-stroke rounded-b-t-10"
      />
    </Box>
  ) : null;
}
