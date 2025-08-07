import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { OrganizationMembers } from './OrganizationMembers';
import { mockMembers } from './OrganizationMembers.mock';
import { Member } from './OrganizationMembers.types';

const meta: Meta<typeof OrganizationMembers> = {
  title: 'Marketplace/Organisms/OrganizationMembers',
  component: OrganizationMembers,
  argTypes: {
    initialMembers: {
      control: 'object',
      description: 'Initial list of organization members',
    },
    onInvite: {
      action: 'invite-clicked',
      description: 'Called when invite button is clicked',
    },
  },
};

export default meta;

export const Default = (args: {
  initialMembers: Member[];
  onInvite?: () => void;
}) => {
  const key = JSON.stringify(args.initialMembers);

  return <OrganizationMembers key={key} {...args} />;
};

Default.args = {
  initialMembers: mockMembers,
  onInvite: action('invite-clicked'),
};
