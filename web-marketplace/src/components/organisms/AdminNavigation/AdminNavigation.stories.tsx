import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { AdminNavigation, AdminNavigationProps } from './AdminNavigation';
import { adminNavigationSections } from './AdminNavigation.constants';

export default {
  title: 'Marketplace/Organisms/AdminNavigation',
  component: AdminNavigation,
} as Meta<typeof AdminNavigation>;

type Story = StoryObj<typeof AdminNavigation>;

export const Default: Story = (args: AdminNavigationProps) => {
  const [currentPath, setCurrentPath] = useState('/orders');

  const handleNavItemClick = (path: string) => {
    setCurrentPath(path);
    action('onNavItemClick')(path);
  };

  return (
    <div className="max-w-[240px]">
      <AdminNavigation
        {...args}
        sections={adminNavigationSections}
        currentPath={currentPath}
        onNavItemClick={handleNavItemClick}
      />
    </div>
  );
};

Default.args = {};
