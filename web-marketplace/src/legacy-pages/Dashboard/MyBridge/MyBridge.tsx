import { useCallback, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { IconTabProps } from 'web-components/src/components/tabs/IconTab';

import { useWallet } from 'lib/wallet/wallet';

import { Bridge } from 'components/organisms';

import { useDashboardContext } from '../Dashboard.context';

export const MyBridge = (): JSX.Element => {
  const { _ } = useLingui();
  const { wallet } = useWallet();
  const { selectedAccountAddress } = useDashboardContext();
  const accountAddress = selectedAccountAddress ?? wallet?.address;

  const MyBridgeOutlet = useCallback(
    (): JSX.Element => (
      <Outlet context={{ accountAddress, privateAccess: true }} />
    ),
    [accountAddress],
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
