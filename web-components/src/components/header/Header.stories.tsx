import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import Header, { HeaderProps } from '.';
import {
  headerMenuItemsMock,
  organizationProfile,
  profile,
} from './Header.mock';
import { ExtraComponent } from './Header.stories.ExtraComponent';

export default {
  title: 'Header',
  component: Header,
} as Meta<typeof Header>;
type Story = StoryObj<typeof Header>;

const Template = (args: HeaderProps) => {
  return <Header {...args} />;
};

const args = {
  isRegistry: true,
  menuItems: headerMenuItemsMock,
  transparent: true,
  absolute: true,
  color: 'black',
  borderBottom: false,
};

export const Default: Story = {
  render: args => <Template {...args} />,
};

Default.args = {
  ...args,
  extras: (
    <ExtraComponent
      avatarAlt="default avatar"
      logoutText="Log out"
      loginText="Login"
      profile={profile}
      createOrganization={action('createOrganization')}
    />
  ),
};

export const WithOrganization: Story = {
  render: args => <Template {...args} />,
};

WithOrganization.args = {
  ...args,
  extras: (
    <ExtraComponent
      avatarAlt="default avatar"
      logoutText="Log out"
      loginText="Login"
      profile={profile}
      organizationProfile={organizationProfile}
      createOrganization={action('createOrganization')}
    />
  ),
};

export const WithUnfinalizedOrganization: Story = {
  render: args => <Template {...args} />,
};

WithUnfinalizedOrganization.args = {
  ...args,
  extras: (
    <ExtraComponent
      avatarAlt="default avatar"
      logoutText="Log out"
      loginText="Login"
      profile={profile}
      organizationProfile={{
        ...organizationProfile,
        address: undefined,
        profileLink: undefined,
      }}
      createOrganization={action('createOrganization')}
      finishOrgCreation={action('finishOrgCreation')}
      unfinalizedOrgCreation
    />
  ),
};
