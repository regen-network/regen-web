import * as React from 'react';
import UserAvatar from 'web-components/lib/components/user/UserAvatar';
import UserInfo, { User } from 'web-components/lib/components/user/UserInfo';
import UserInfoWithTitle from 'web-components/lib/components/user/UserInfoWithTitle';

export default {
  title: 'User',
  component: UserInfo,
};

const user: User = {
  name: 'Odonata',
  location: 'South Melbourne, Victoria, Australia',
  type: 'ORGANIZATION',
  image: 'http://www.odonata.org.au/wp-content/uploads/2018/01/odinata-logo-only.png',
  description: 'Odonata is a not-for-profit entity supporting biodiversity impact solutions.',
};

const { name, image } = user;

export const mediumUserAvatar = (): JSX.Element => <UserAvatar alt={name} src={image} />;

export const bigUserAvatar = (): JSX.Element => <UserAvatar alt={name} src={image} size="big" />;

export const userAvatarWithLink = (): JSX.Element => (
  <UserAvatar alt={name} src={image} size="big" href={'http://www.odonata.org.au'} />
);

export const fallbackUserAvatar = (): JSX.Element => <UserAvatar />;

export const userInfo = (): JSX.Element => <UserInfo user={user} />;

export const columnUserInfo = (): JSX.Element => <UserInfo user={user} direction="column" />;

export const withTitle = (): JSX.Element => <UserInfoWithTitle user={user} title={'project developer'} />;
