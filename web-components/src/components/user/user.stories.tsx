import * as React from 'react';
import UserAvatar from 'web-components/lib/components/user/UserAvatar';
import UserInfo, { User } from 'web-components/lib/components/user/UserInfo';
import UserInfoWithTitle from 'web-components/lib/components/user/UserInfoWithTitle';

export default {
  title: 'Components|User',
  component: UserInfo,
};

const user: User = {
  name: 'Odonata',
  place: 'South Melbourne, Victoria, Australia',
  imgSrc: 'http://www.odonata.org.au/wp-content/uploads/2018/01/odinata-logo-only.png',
  description: 'Odonata is a not-for-profit entity supporting biodiversity impact solutions.',
};

const { name, imgSrc } = user;

export const mediumUserAvatar = (): JSX.Element => <UserAvatar alt={name} src={imgSrc} />;

export const bigUserAvatar = (): JSX.Element => <UserAvatar alt={name} src={imgSrc} size="big" />;

export const smallUserAvatar = (): JSX.Element => <UserAvatar alt={name} src={imgSrc} size="small" />;

export const fallbackUserAvatar = (): JSX.Element => <UserAvatar />;

export const mediumUserInfo = (): JSX.Element => <UserInfo user={user} />;

export const smallUserInfo = (): JSX.Element => <UserInfo user={user} size="small" />;

export const bigUserInfo = (): JSX.Element => <UserInfo user={user} size="big" />;

export const columnUserInfo = (): JSX.Element => <UserInfo user={user} direction="column" />;

export const withTitle = (): JSX.Element => <UserInfoWithTitle user={user} title="project developer" />;
