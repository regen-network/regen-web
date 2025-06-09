import { useCallback, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { IconTabProps } from 'web-components/src/components/tabs/IconTab';

import { useWallet } from 'lib/wallet/wallet';

import { Bridge } from 'components/organisms';

export const MyBridge = (): JSX.Element => {
  const { _ } = useLingui();
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
        label: _(msg`Bridgable ecocredits`),
        href: '/dashboard/portfolio/bridge/bridgable',
        content: <MyBridgeOutlet />,
      },
      {
        label: _(msg`Bridged ecocredits`),
        href: '/dashboard/portfolio/bridge/bridged',
        content: <MyBridgeOutlet />,
      },
    ],
    [MyBridgeOutlet, _],
  );

  return <Bridge tabs={tabs} />;
};
