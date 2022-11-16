import { useMemo } from 'react';
import { tabsStyles } from 'styles/tabs';

import { Flex } from 'web-components/lib/components/box';
import Card from 'web-components/lib/components/cards/Card';
import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';
import { IconTabs } from 'web-components/lib/components/tabs/IconTabs';

import { useLedger } from 'ledger';

import { BridgeInfo } from 'components/molecules';
import { BridgedEcocreditsTable } from 'components/organisms';

export const BridgeTab = (): JSX.Element => {
  const { wallet } = useLedger();

  const tabs: IconTabProps[] = useMemo(
    () => [
      {
        label: 'Bridged ecocredits',
        content: <BridgedEcocreditsTable accountAddress={wallet?.address} />,
      },
    ],
    [wallet?.address],
  );

  return (
    <Flex flexDirection="column" sx={{ width: '100%' }}>
      <Card sx={{ mb: 5 }}>
        <IconTabs
          tabs={tabs}
          size={'xl'}
          hideIndicator
          sxs={tabsStyles.tabsInsideCard}
        />
      </Card>
      <BridgeInfo />
    </Flex>
  );
};
