import { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DashboardNavigation from './DashboardNavigation';
import { AccountOption } from './DashboardNavigation.types';

const meta: Meta<typeof DashboardNavigation> = {
  title: 'Marketplace/Organisms/DashboardNavigation',
  component: DashboardNavigation,
};
export default meta;

export const Default: StoryFn<typeof DashboardNavigation> = () => {
  const accounts: AccountOption[] = [
    {
      id: 'user-1',
      name: 'Test User',
      address: 'regen1q88…qwerty',
      avatarSrc: 'https://i.pravatar.cc/300',
      type: 'user',
    },
    {
      id: 'org-1',
      name: 'CarbonCorp',
      address: 'regen1abcd…carbon',
      avatarSrc: 'https://placekitten.com/96/96',
      type: 'org',
    },
  ];

  const [activeAccountId, setActiveAccountId] = useState(accounts[0].id);
  const activeAccount = accounts.find(a => a.id === activeAccountId)!;
  const [path, setPath] = useState('/portfolio');

  return (
    <DashboardNavigation
      currentPath={path}
      onNavItemClick={(newPath: string) => {
        action('nav-item-click')(newPath);
        setPath(newPath);
      }}
      onLogout={action('logout-click')}
      header={{
        activeAccount,
        accounts,
        onAccountSelect: (id: string) => {
          action('account-select')(id);
          setActiveAccountId(id);
        },
      }}
    />
  );
};
