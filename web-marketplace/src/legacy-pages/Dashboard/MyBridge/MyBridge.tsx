import { useCallback, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { IconTabProps } from 'web-components/src/components/tabs/IconTab';

import { Bridge } from 'components/organisms';

import { useDashboardContext } from '../Dashboard.context';

export const MyBridge = (): JSX.Element => {
  const { _ } = useLingui();
  const { selectedAccountAddress } = useDashboardContext();

  const MyBridgeOutlet = useCallback(
    (): JSX.Element => (
      <Outlet
        context={{
          accountAddress: selectedAccountAddress,
          privateAccess: true,
        }}
      />
    ),
    [selectedAccountAddress],
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
