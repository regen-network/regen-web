import { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';

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

// Define reusable action creators
const createNavigationActions = () => ({
  onCloseMobile: action('mobile-menu-closed'),
  onViewPublicProfile: action('view-public-profile-clicked'),
  onGoToHomePage: action('navigate-to-home-clicked')
});

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
  const activeAccount = MOCK_ACCOUNTS.find(a => a.id === activeAccountId) || MOCK_ACCOUNTS[0];
  
  // Create action handlers
  const navigationActions = createNavigationActions();

  // Handle navigation item clicks
  const handleNavItemClick = (path: string) => {
    action('nav-item-click')(path);
    setCurrentPath(path);
    
    // Special case for home navigation
    if (path === 'home') {
      navigationActions.onGoToHomePage();
    }
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
      onLogout={action('logout-clicked')}
      onCloseMobile={navigationActions.onCloseMobile}
      onExitClick={() => navigationActions.onGoToHomePage('/')}
      header={{
        activeAccount,
        accounts: MOCK_ACCOUNTS,
        onAccountSelect: handleAccountSelect,
        onViewProfileClick: navigationActions.onViewPublicProfile
      }}
    />
  );
};
