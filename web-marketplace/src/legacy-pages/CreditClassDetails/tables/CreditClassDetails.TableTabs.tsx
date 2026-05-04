import { TableTabs } from 'components/organisms/TableTabs';

import { getCreditClassDetailsTabs } from './CreditClassDetails.TableTabs.config';
import { CreditClassDetailsTableTabsProps } from './CreditClassDetails.TableTabs.types';
import { useLingui } from '@lingui/react';
import { msg } from '@lingui/core/macro';

export const CreditClassDetailsTableTabs = (
  props: CreditClassDetailsTableTabsProps,
) => {
  const tabs = getCreditClassDetailsTabs(props);
  const { _ } = useLingui();
  return <TableTabs tabs={tabs} title={_(msg`Credits`)} />;
};
