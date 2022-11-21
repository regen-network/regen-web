import { useMemo } from 'react';
import { tabsStyles } from 'styles/tabs';

import { Flex } from 'web-components/lib/components/box';
import Card from 'web-components/lib/components/cards/Card';
import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';
import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';

import { useLedger } from 'ledger';

import { BridgeInfo } from 'components/molecules';
import {
  BridgableEcocreditsTable,
  BridgedEcocreditsTable,
} from 'components/organisms';

import { useActiveTab } from './hooks/useActiveTab';

export const MyBridge = (): JSX.Element => {
  const { wallet } = useLedger();

  const tabs: IconTabProps[] = useMemo(
    () => [
      {
        label: 'Bridgable ecocredits',
        content: <BridgableEcocreditsTable accountAddress={wallet?.address} />,
      },
      {
        label: 'Bridged ecocredits',
        content: (
          <BridgedEcocreditsTable
            privateAccess
            accountAddress={wallet?.address}
          />
        ),
      },
    ],
    [wallet?.address],
  );

  const activeTab = useActiveTab(tabs);

  return (
    <Flex flexDirection="column" sx={{ width: '100%' }}>
      <Card sx={{ mb: 5 }}>
        <IconTabs
          tabs={tabs}
          size="xl"
          sxs={tabsStyles.tabsInsideCard}
          activeTab={activeTab}
        />
      </Card>
      <BridgeInfo />
    </Flex>
  );
};
