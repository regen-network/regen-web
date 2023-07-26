import { Box } from '@mui/material';

import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';

import { CreditBatches } from 'components/organisms';

import { AdditionalInfo } from '../CreditClassDetails.AdditionalInfo';
import { CreditClassDetailsTableTabsProps } from './CreditClassDetails.TableTabs.types';

export const getCreditClassDetailsTabs = ({
  onChainCreditClassId,
  creditClassMetadata,
}: CreditClassDetailsTableTabsProps): IconTabProps[] =>
  [
    {
      label: 'Credit Issuance',
      content: (
        <CreditBatches creditClassId={onChainCreditClassId} titleAlign="left" />
      ),
      hidden: !onChainCreditClassId,
    },
    {
      label: 'Additional Info',
      content: (
        <Box
          sx={{
            p: 8,
            backgroundColor: 'primary.main',
            border: '1px solid',
            borderColor: 'info.light',
            borderRadius: '0 0 8px 8px',
          }}
        >
          <AdditionalInfo metadata={creditClassMetadata} />
        </Box>
      ),
      hidden: !creditClassMetadata,
    },
  ].filter(tab => tab.hidden !== true);
