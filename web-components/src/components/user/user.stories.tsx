import * as React from 'react';
import UserAvatar from 'web-components/lib/components/user/UserAvatar';

export default {
  title: 'Components|User',
  component: UserAvatar,
}

export const mediumUserAvatar = (): JSX.Element => (
  <UserAvatar alt="Odonota" src="http://www.odonata.org.au/wp-content/uploads/2018/01/odinata-logo-only.png" />
);

export const bigUserAvatar = (): JSX.Element => (
  <UserAvatar
    alt="Odonota"
    src="http://www.odonata.org.au/wp-content/uploads/2018/01/odinata-logo-only.png"
    size="big"
  />
);

export const smallUserAvatar = (): JSX.Element => (
  <UserAvatar
    alt="Odonota"
    src="http://www.odonata.org.au/wp-content/uploads/2018/01/odinata-logo-only.png"
    size="small"
  />
);

export const fallbackUserAvatar = (): JSX.Element => (
  <UserAvatar />
);
// export const projectPlaceInfo = (): JSX.Element => (
//   <ProjectPlaceInfo place="Melbourne, Victoria, Australia" area={440}/>
// );
//
// export const creditPlaceInfo = (): JSX.Element => (
//   <CreditPlaceInfo place="Brazil" outcome="carbon" />
// );
