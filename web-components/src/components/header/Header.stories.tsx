import { ComponentMeta, ComponentStory } from '@storybook/react';

import Header from '.';
import { headerMenuItemsMock } from './Header.mock';
import { ExtraComponent } from './Header.stories.ExtraComponent';

export default {
  title: 'Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = args => {
  return <Header {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  isRegistry: true,
  menuItems: headerMenuItemsMock,
  transparent: true,
  absolute: true,
  color: 'black',
  borderBottom: false,
  extras: (
    <ExtraComponent
      avatarAlt="default avatar"
      logoutText="Log out"
      loginText="Login"
    />
  ),
};

Default.argTypes = {};
