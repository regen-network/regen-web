import { msg } from '@lingui/core/macro';

import { IconTabProps } from 'web-components/src/components/tabs/IconTab';

import { CreditBatches } from 'components/organisms';

import { AdditionalInfo } from '../CreditClassDetails.AdditionalInfo';
import { CreditClassDetailsTableTabsProps } from './CreditClassDetails.TableTabs.types';

export const getCreditClassDetailsTabs = ({
  creditClassMetadata,
  onChainCreditClassId,
  creditBatches,
  initialPaginationParams,
  onTableChange,
  _,
}: CreditClassDetailsTableTabsProps): IconTabProps[] =>
  [
    {
      label: _(msg`Credit Issuance`),
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
      label: _(msg`Additional Info`),
      content: (
        <AdditionalInfo
          classId={onChainCreditClassId}
          metadata={creditClassMetadata}
        />
      ),
      hidden: !onChainCreditClassId,
    },
  ].filter(tab => tab.hidden !== true);
