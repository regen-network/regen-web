import { useCallback, useMemo } from 'react';
import { Outlet } from 'react-router-dom';

import { IconTabProps } from 'web-components/src/components/tabs/IconTab';

import { useWallet } from 'lib/wallet/wallet';

import { Bridge } from 'components/organisms';

export const MyBridge = (): JSX.Element => {
  const { wallet } = useWallet();

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
        href: '/profile/bridge/bridgable',
        content: <MyBridgeOutlet />,
      },
      {
        label: 'Bridged ecocredits',
        href: '/profile/bridge/bridged',
        content: <MyBridgeOutlet />,
      },
    ],
    [MyBridgeOutlet],
  );

  return <Bridge tabs={tabs} />;
};
