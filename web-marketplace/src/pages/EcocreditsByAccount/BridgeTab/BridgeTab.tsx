import { useMemo } from 'react';

import { IconTabProps } from 'web-components/src/components/tabs/IconTab';

import { Bridge, BridgedEcocreditsTable } from 'components/organisms';

import { useProfileData } from '../hooks/useProfileData';

export const BridgeTab = (): JSX.Element => {
  const { address } = useProfileData();

  const tabs: IconTabProps[] = useMemo(() => {
    const tabs = [
      {
        label: 'Bridged ecocredits',
        content: <BridgedEcocreditsTable accountAddress={address} />,
      },
    ];

    return tabs;
  }, [address]);

  return <Bridge tabs={tabs} hideTabIndicator />;
};
