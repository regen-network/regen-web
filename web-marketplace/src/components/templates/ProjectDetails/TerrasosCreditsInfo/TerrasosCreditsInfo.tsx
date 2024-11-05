import { Box } from '@mui/material';

import { ComplianceInfoQuery } from 'generated/sanity-graphql';
import { ProjectPageMetadataLD } from 'lib/db/types/json-ld';
import { TranslatorType } from 'lib/i18n/i18n.types';
import { ReactQueryComplianceInfoQueryResponse } from 'lib/queries/react-query/sanity/getComplianceInfoQuery/getComplianceInfoQuery.types';

import { TableTabs } from 'components/organisms/TableTabs';

import { getTerrasosCreditsTabs } from './TerrasosCredits.utils';

type Props = {
  _: TranslatorType;
  projectBatchTotals?: JSX.Element;
  projectPageMetadata: ProjectPageMetadataLD;
  isOnChain?: boolean;
  complianceInfo?: ComplianceInfoQuery;
  complianceCredits?: JSX.Element;
};

export default function TerrasosCreditsInfo({
  _,
  projectBatchTotals,
  projectPageMetadata,
  isOnChain,
  complianceInfo,
  complianceCredits,
}: Props) {
  const tabs = getTerrasosCreditsTabs({
    _,
    projectBatchTotals,
    projectPageMetadata,
    isOnChain,
    complianceInfo,
    complianceCredits,
  });
  return tabs.length > 0 ? (
    <Box sx={{ mt: 0 }}>
      <TableTabs
        sx={{
          px: { xs: 0, sm: 0 },
          pt: { xs: '50px', sm: '50px' },
          pb: { xs: 0, sm: 0 },
        }}
        tabs={tabs}
      />
    </Box>
  ) : null;
}
