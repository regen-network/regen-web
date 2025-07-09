import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/react';

import { DashboardNavigation } from './DashboardNavigation';
import { AccountOption } from './DashboardNavigation.types';

const MOCK_ACCOUNTS: AccountOption[] = [
  {
    id: 'user-1',
    name: 'Test User',
    address: 'regen1q88…qwerty',
    image: 'https://i.pravatar.cc/300',
    type: 'user',
  },
  {
    id: 'org-1',
    name: 'CarbonCorp',
    address: 'regen1abcd…carbon',
    image: 'https://i.pravatar.cc/2',
    type: 'org',
  },
];

const SINGLE_USER_ACCOUNT: AccountOption[] = [
  {
    id: 'user-1',
    name: 'Test User',
    address: 'regen1q88…qwerty',
    image: 'https://i.pravatar.cc/300',
    type: 'user',
  },
];

const meta: Meta<typeof DashboardNavigation> = {
  title: 'Marketplace/Organisms/DashboardNavigation',
  component: DashboardNavigation,
};

export default meta;

export const Default: StoryFn<typeof DashboardNavigation> = () => {
  const [activeAccountId, setActiveAccountId] = useState(MOCK_ACCOUNTS[0].id);
  const [currentPath, setCurrentPath] = useState('portfolio');

  const activeAccount =
    MOCK_ACCOUNTS.find(a => a.id === activeAccountId) || MOCK_ACCOUNTS[0];

  const handleNavItemClick = (path: string) => {
    action('navigation')(path);
    setCurrentPath(path);
  };

  const handleAccountSelect = (id: string) => {
    action('account-select')(id);
    setActiveAccountId(id);
  };

  return (
    <DashboardNavigation
      currentPath={currentPath}
      onNavItemClick={handleNavItemClick}
      onLogout={() => action('navigation')('logout')}
      onCloseMobile={() => action('navigation')('close-mobile')}
      onExitClick={() => action('navigation')('homepage')}
      header={{
        activeAccount,
        accounts: MOCK_ACCOUNTS,
        onAccountSelect: handleAccountSelect,
        onViewProfileClick: path =>
          action('navigation')(`view-profile: ${path}`),
      }}
      collapsed={false}
      onToggleCollapse={function (collapsed: boolean): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
};

// New story for navigation without organization
export const NoOrganization: StoryFn<typeof DashboardNavigation> = () => {
  const [currentPath, setCurrentPath] = useState('portfolio');
  const activeAccount = SINGLE_USER_ACCOUNT[0];

  const handleNavItemClick = (path: string) => {
    action('navigation')(path);
    setCurrentPath(path);
  };

  return (
    <DashboardNavigation
      currentPath={currentPath}
      onNavItemClick={handleNavItemClick}
      onLogout={() => action('navigation')('logout')}
      onCloseMobile={() => action('navigation')('close-mobile')}
      onExitClick={() => action('navigation')('homepage')}
      header={{
        activeAccount,
        accounts: SINGLE_USER_ACCOUNT,
        onAccountSelect: () => {},
        onViewProfileClick: path =>
          action('navigation')(`view-profile: ${path}`),
      }}
      collapsed={false}
      onToggleCollapse={function (collapsed: boolean): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
};
