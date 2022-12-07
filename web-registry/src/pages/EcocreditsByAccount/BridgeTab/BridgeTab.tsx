import { useMemo } from 'react';

import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';

import { useLedger } from 'ledger';

import { Bridge, BridgedEcocreditsTable } from 'components/organisms';

export const BridgeTab = (): JSX.Element => {
  const { wallet } = useLedger();

  const tabs: IconTabProps[] = useMemo(() => {
    const tabs = [
      {
        label: 'Bridged ecocredits',
        content: <BridgedEcocreditsTable accountAddress={wallet?.address} />,
      },
    ];

    return tabs;
  }, [wallet?.address]);

  return <Bridge tabs={tabs} hideTabIndicator />;
};
