import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import { Members } from './Members';
import { mockMembers } from './Members.mock';
import { Member } from './Members.types';

const meta: Meta<typeof Members> = {
  title: 'Marketplace/Organisms/Members',
  component: Members,
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

  return <Members key={key} {...args} />;
};

Default.args = {
  initialMembers: mockMembers,
  onInvite: action('invite-clicked'),
};
