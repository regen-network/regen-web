import { useCallback, useMemo } from 'react';
import { Outlet } from 'react-router-dom';

import { IconTabProps } from 'web-components/lib/components/tabs/IconTab';

import { useLedger } from 'ledger';

import { Bridge } from 'components/organisms';

export const MyBridge = (): JSX.Element => {
  const { wallet } = useLedger();

  const MyBridgeOutlet = useCallback(
    (): JSX.Element => (
      <Outlet
        context={{ accountAddress: wallet?.address, privateAccess: true }}
      />
    ),
    [wallet?.address],
  );

  const tabs: IconTabProps[] = useMemo(
    () => [
      {
        label: 'Bridgable ecocredits',
        href: '/ecocredits/bridge/bridgable',
        content: <MyBridgeOutlet />,
      },
      {
        label: 'Bridged ecocredits',
        href: '/ecocredits/bridge/bridged',
        content: <MyBridgeOutlet />,
      },
    ],
    [MyBridgeOutlet],
  );

  return <Bridge tabs={tabs} />;
};
