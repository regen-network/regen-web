import * as React from 'react';
import UserAvatar from 'web-components/lib/components/user/UserAvatar';
import UserInfo from 'web-components/lib/components/user/UserInfo';

export default {
  title: 'Components|User',
  component: UserInfo,
}

const name: string = "Odonata";
const src: string = "http://www.odonata.org.au/wp-content/uploads/2018/01/odinata-logo-only.png";
const place: string = "South Melbourne, Victoria, Australia";

export const mediumUserAvatar = (): JSX.Element => (
  <UserAvatar alt={name} src={src} />
);

export const bigUserAvatar = (): JSX.Element => (
  <UserAvatar
    alt={name}
    src={src}
    size="big"
  />
);

export const smallUserAvatar = (): JSX.Element => (
  <UserAvatar
    alt={name}
    src={src}
    size="small"
  />
);

export const fallbackUserAvatar = (): JSX.Element => (
  <UserAvatar />
);

export const mediumUserInfo = (): JSX.Element => (
  <UserInfo
    name={name}
    place={place}
    imgSrc={src}
  />
);

export const basicUserInfo = (): JSX.Element => (
  <UserInfo
    name={name}
    imgSrc={src}
  />
);

export const smallUserInfo = (): JSX.Element => (
  <UserInfo
    name={name}
    place={place}
    imgSrc={src}
    size="small"
  />
);

export const bigUserInfo = (): JSX.Element => (
  <UserInfo
    name={name}
    place={place}
    imgSrc={src}
    size="big"
  />
);

export const columnUserInfo = (): JSX.Element => (
  <UserInfo
    name={name}
    place={place}
    imgSrc={src}
    direction="column"
  />
);

export const extendedUserInfo = (): JSX.Element => (
  <UserInfo
    name="Joseph McFann, Ph.D"
    title="Professor of Atmospheric Studies"
    place="Oxford University"
    imgSrc={src}
    size="big"
  />
);
