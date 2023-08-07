import { TableTabs } from 'components/organisms/TableTabs';

import { getCreditClassDetailsTabs } from './CreditClassDetails.TableTabs.config';
import { CreditClassDetailsTableTabsProps } from './CreditClassDetails.TableTabs.types';

export const CreditClassDetailsTableTabs = (
  props: CreditClassDetailsTableTabsProps,
) => {
  const tabs = getCreditClassDetailsTabs(props);
  return <TableTabs tabs={tabs} />;
};
