import UserAvatar from './UserAvatar';
import UserInfo, { User } from './UserInfo';
import UserInfoWithTitle from './UserInfoWithTitle';

export default {
  title: 'User',
  component: UserInfo,
};

const user: User = {
  name: 'Odonata',
  location: 'South Melbourne, Victoria, Australia',
  type: 'ORGANIZATION',
  image:
    'https://cdn.sanity.io/images/jm12rn9t/staging/8b062589b6d8c6850a78bb13ead51d2f6f32b073-29x9.svg',
  description:
    'Odonata is a not-for-profit entity supporting biodiversity impact solutions.',
};

const { name, image } = user;

export const mediumUserAvatar = (): JSX.Element => (
  <UserAvatar alt={name} src={image} />
);

export const bigUserAvatar = (): JSX.Element => (
  <UserAvatar alt={name} src={image} size="big" />
);

export const userAvatarWithLink = (): JSX.Element => (
  <UserAvatar
    alt={name}
    src={image}
    size="big"
    href={'http://www.odonata.org.au'}
  />
);

export const fallbackUserAvatar = (): JSX.Element => <UserAvatar />;

export const userInfo = (): JSX.Element => <UserInfo user={user} />;

export const columnUserInfo = (): JSX.Element => (
  <UserInfo user={user} direction="column" />
);

export const withTitle = (): JSX.Element => (
  <UserInfoWithTitle user={user} title={'project developer'} />
);
