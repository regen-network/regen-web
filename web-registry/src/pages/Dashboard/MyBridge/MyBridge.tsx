import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
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

export const MyBridge = (): JSX.Element => {
  const { wallet } = useLedger();
  const { state } = useLocation();
  const [activeTab, setActiveTab] = useState(0);

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

  useEffect(() => {
    const _activeTab = state?.tab
      ? Math.max(
          tabs.findIndex(tab => tab.label.toLowerCase().includes(state?.tab)),
          0,
        )
      : 0;
    setActiveTab(_activeTab);

    // cleanup: reset location.state.tab
    return () => {
      window.history.replaceState(null, '');
    };
  }, [state, tabs]);

  return (
    <Flex flexDirection="column" sx={{ width: '100%' }}>
      <Card sx={{ mb: 5 }}>
        <IconTabs
          tabs={tabs}
          size={'xl'}
          sxs={tabsStyles.tabsInsideCard}
          activeTab={activeTab}
        />
      </Card>
      <BridgeInfo />
    </Flex>
  );
};
