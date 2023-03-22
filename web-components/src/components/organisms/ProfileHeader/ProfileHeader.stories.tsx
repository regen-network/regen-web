import { Link } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import TwitterIcon2 from 'src/components/icons/social/TwitterIcon2';
import WebsiteLinkIcon from 'src/components/icons/social/WebsiteLinkIcon';

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
    socialsLinks: [
      {
        href: '#twitter',
        icon: <TwitterIcon2 />,
      },
      {
        href: '#externalLink',
        icon: <WebsiteLinkIcon />,
      },
    ],
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
