/* eslint-disable lingui/no-unlocalized-strings */
import { useState } from 'react';
import { Box, Link } from '@mui/material';

import ContainedButton from '../buttons/ContainedButton';
import { NavLink } from './components/NavLink';
import { UserMenuItems } from './components/UserMenuItems';
import {
  ExtendedUserMenuProfile,
  getUserMenuItems,
} from './components/UserMenuItems.utils';
import { REGEN_TEST_ADDRESS } from './Header.mock';

type Props = {
  loginText: string;
  logoutText: string;
  avatarAlt: string;
  profile?: ExtendedUserMenuProfile;
  organizationProfile?: ExtendedUserMenuProfile;
  createOrganization?: () => void;
  unfinalizedOrgCreation?: boolean;
  finishOrgCreation?: () => void;
};

export const ExtraComponent = ({
  loginText,
  avatarAlt,
  logoutText,
  profile,
  organizationProfile,
  createOrganization,
  unfinalizedOrgCreation,
  finishOrgCreation,
}: Props): JSX.Element => {
  const [address, setAddress] = useState('');
  const userMenuItems = getUserMenuItems({
    linkComponent: Link,
    navLinkComponent: NavLink,
    pathname: '/',
    profile,
    organizationProfile,
    createOrganization,
    unfinalizedOrgCreation,
    finishOrgCreation,
    textContent: {
      signedInAs: 'signed in as',
      copyText: { tooltipText: 'Copy address', toastText: 'Address copied' },
      publicProfile: 'Public profile',
      personalDashboard: 'Personal dashboard',
      organizationDashboard: 'Organization dashboard',
      organization: 'organization',
      createOrganization: 'create organization',
      finishOrgCreation: 'finish creating organization',
    },
  });
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {address && (
        <UserMenuItems
          nameOrAddress={address}
          avatarAlt={avatarAlt}
          logoutText={logoutText}
          avatar={profile?.profileImage || ''}
          disconnect={() => setAddress('')}
          pathname="/"
          linkComponent={NavLink}
          userMenuItems={userMenuItems}
        />
      )}
      {!address && (
        <ContainedButton
          size="small"
          onClick={() => setAddress(REGEN_TEST_ADDRESS)}
        >
          {loginText}
        </ContainedButton>
      )}
    </Box>
  );
};
