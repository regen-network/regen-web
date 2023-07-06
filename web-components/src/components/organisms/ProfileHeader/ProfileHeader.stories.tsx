import { Link } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import TwitterIcon2 from '../../../components/icons/social/TwitterIcon2';
import WebsiteLinkIcon from '../../../components/icons/social/WebsiteLinkIcon';
import { ProfileHeader } from './ProfileHeader';
import { ProfileVariant } from './ProfileHeader.types';

export default {
  title: 'organisms/ProfileHeader',
  component: ProfileHeader,
} as ComponentMeta<typeof ProfileHeader>;

const Template: ComponentStory<typeof ProfileHeader> = args => (
  <ProfileHeader {...args} />
);

export const Default = Template.bind({});
export const WhiteBG = Template.bind({});

const defaultArgs = {
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
  editLink: '#',
};

const defaultArgTypes = {
  variant: {
    control: 'radio',
    options: ['individual', 'organization'] as ProfileVariant[],
    defaultValue: 'individual' as ProfileVariant,
  },
};

Default.args = defaultArgs;

Default.argTypes = defaultArgTypes;

WhiteBG.args = {
  ...defaultArgs,
  backgroundImage: '/common/white-bg.png',
};

WhiteBG.argTypes = defaultArgTypes;
