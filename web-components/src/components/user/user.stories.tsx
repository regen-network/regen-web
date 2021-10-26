import * as React from 'react';
import UserAvatar from 'web-components/lib/components/user/UserAvatar';
import UserInfo, { User } from 'web-components/lib/components/user/UserInfo';
import UserInfoWithTitle from 'web-components/lib/components/user/UserInfoWithTitle';
import { withKnobs, text, object } from '@storybook/addon-knobs';

export default {
  title: 'Components|User',
  component: UserInfo,
  decorators: [withKnobs],
};

const user: User = {
  name: 'Odonata',
  location: 'South Melbourne, Victoria, Australia',
  type: 'ORGANIZATION',
  image: 'http://www.odonata.org.au/wp-content/uploads/2018/01/odinata-logo-only.png',
  description: 'Odonata is a not-for-profit entity supporting biodiversity impact solutions.',
};

const { name, image } = user;

export const mediumUserAvatar = (): JSX.Element => <UserAvatar alt={name} src={text('image', image)} />;

export const bigUserAvatar = (): JSX.Element => (
  <UserAvatar alt={name} src={text('image', image)} size="big" />
);

export const userAvatarWithLink = (): JSX.Element => (
  <UserAvatar
    alt={name}
    src={text('image', image)}
    size="big"
    href={text('href', 'http://www.odonata.org.au')}
  />
);

export const fallbackUserAvatar = (): JSX.Element => <UserAvatar />;

export const mediumUserInfo = (): JSX.Element => <UserInfo user={object('User', user)} />;

export const bigUserInfo = (): JSX.Element => <UserInfo user={object('User', user)} size="big" />;

export const columnUserInfo = (): JSX.Element => <UserInfo user={object('User', user)} direction="column" />;

export const withTitle = (): JSX.Element => (
  <UserInfoWithTitle user={object('User', user)} title={text('Title', 'project developer')} />
);
