import { isEmpty } from 'lodash';

import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';

import { CreditBatches } from 'components/organisms';

import { AdditionalInfo } from '../CreditClassDetails.AdditionalInfo';
import { CreditClassDetailsTableTabsProps } from './CreditClassDetails.TableTabs.types';

export const getCreditClassDetailsTabs = ({
  creditClassMetadata,
  onChainCreditClassId,
  creditBatches,
  initialPaginationParams,
  onTableChange,
}: CreditClassDetailsTableTabsProps): IconTabProps[] =>
  [
    {
      label: 'Credit Issuance',
      content: (
        <CreditBatches
          creditClassId={onChainCreditClassId}
          creditBatches={creditBatches}
          initialPaginationParams={initialPaginationParams}
          onTableChange={onTableChange}
          isIgnoreOffset
        />
      ),
      hidden: !onChainCreditClassId,
    },
    {
      label: 'Additional Info',
      content: (
        <AdditionalInfo
          classId={onChainCreditClassId}
          metadata={creditClassMetadata}
        />
      ),
      hidden: !onChainCreditClassId,
    },
  ].filter(tab => tab.hidden !== true);
