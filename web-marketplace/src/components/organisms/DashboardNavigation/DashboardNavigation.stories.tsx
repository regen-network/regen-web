import { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import DashboardNavigation from './DashboardNavigation';
import { AccountOption } from './DashboardNavigation.types';
import { getDashboardNavigationSections } from './DashboardNavigation.utils';

const meta: Meta<typeof DashboardNavigation> = {
  title: 'Marketplace/Organisms/DashboardNavigation',
  component: DashboardNavigation,
};
export default meta;

export const Default: StoryFn = () => {
  const accounts: AccountOption[] = [
    {
      id: 'user‑1',
      name: 'Test User',
      address: 'regen1q88fghjklqwertyuiopasdfghjklqwerty',
      avatarSrc: 'https://i.pravatar.cc/',
      type: 'user',
    },
    {
      id: 'org‑1',
      name: 'CarbonCorp',
      address: 'regen1abcd1234carboncorp9876',
      avatarSrc: 'https://i.pravatar.cc/1',
      type: 'org',
    },
  ];

  const [activeAccountId, setActiveAccountId] = useState(accounts[0].id);
  const activeAccount = accounts.find(a => a.id === activeAccountId)!;

  const [path, setPath] = useState('/portfolio');

  return (
    <DashboardNavigation
      currentPath={path}
      onNavItemClick={setPath}
      sections={getDashboardNavigationSections({ showOrders: true })}
      header={{
        activeAccount,
        accounts,
        onAccountSelect: setActiveAccountId,
      }}
    />
  );
};
