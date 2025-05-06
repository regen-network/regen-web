// DashboardNavigation.stories.tsx
import { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import DashboardNavigation from './DashboardNavigation';
import { getDashboardNavigationSections } from './DashboardNavigation.utils';

const meta: Meta<typeof DashboardNavigation> = {
  title: 'Marketplace/Organisms/DashboardNavigation',
  component: DashboardNavigation,
};
export default meta;

export const Default: StoryFn<typeof DashboardNavigation> = () => {
  const [path, setPath] = useState('/portfolio');
  return (
    <DashboardNavigation
      sections={getDashboardNavigationSections({ showOrders: true })}
      currentPath={path}
      onNavItemClick={setPath}
      header={{
        name: 'Test User',
        address: 'regen2324fghjklqwertyuiopasdfghjklqwertyuiop',
        avatarSrc: 'https://i.pravatar.cc/300',
      }}
    />
  );
};
