import { Link } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ProfileHeader } from './ProfileHeader';
import { ProfileVariant } from './ProfileHeader.types';

export default {
  title: 'atoms/ProfileHeader',
  component: ProfileHeader,
} as ComponentMeta<typeof ProfileHeader>;

const Template: ComponentStory<typeof ProfileHeader> = args => (
  <ProfileHeader {...args} />
);

export const Default = Template.bind({});

Default.args = {
  name: 'Mary Smith',
  backgroundImage: '/illustrations/profile-bg.jpg',
  avatar: '/illustrations/frog.jpg',
  infos: {
    addressLink: { text: 'regen91kd01...c8120d', href: '#' },
    description:
      'Impact Ag Partners is a specialist agricultural asset management firm and advisory service.',
  },
  LinkComponent: Link,
  editLink: '',
};

Default.argTypes = {
  variant: {
    control: 'radio',
    options: ['individual', 'organization'] as ProfileVariant[],
    defaultValue: 'individual' as ProfileVariant,
  },
};
