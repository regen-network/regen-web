import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/react';

import { DashboardNavigation } from './DashboardNavigation';
import { AccountOption } from './DashboardNavigation.types';

// Define mock data
const MOCK_ACCOUNTS: AccountOption[] = [
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
    avatarSrc: 'https://i.pravatar.cc/2',
    type: 'org',
  },
];

const meta: Meta<typeof DashboardNavigation> = {
  title: 'Marketplace/Organisms/DashboardNavigation',
  component: DashboardNavigation,
};

export default meta;

export const Default: StoryFn<typeof DashboardNavigation> = () => {
  // State management
  const [activeAccountId, setActiveAccountId] = useState(MOCK_ACCOUNTS[0].id);
  const [currentPath, setCurrentPath] = useState('portfolio');

  // Find the active account
  const activeAccount =
    MOCK_ACCOUNTS.find(a => a.id === activeAccountId) || MOCK_ACCOUNTS[0];

  // Simple navigation handler that updates state and logs path
  const handleNavItemClick = (path: string) => {
    action('navigation')(path); // Log all navigation paths consistently
    setCurrentPath(path);
  };

  // Handle account selection
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
    />
  );
};
