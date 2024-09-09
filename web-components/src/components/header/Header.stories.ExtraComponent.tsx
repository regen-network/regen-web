import { useState } from 'react';
import { Box } from '@mui/material';

import ContainedButton from '../buttons/ContainedButton';
import { NavLink } from './components/NavLink';
import { UserMenuItems } from './components/UserMenuItems';
import { getUserMenuItemsMock } from './components/UserMenuItems.mock';

const REGEN_TEST_ADDRESS = 'regen1df675r9vnf7pdedn4sf26svdsem3ugavgxmy46';

type Props = {
  loginText: string;
  logoutText: string;
  avatarAlt: string;
};

export const ExtraComponent = ({
  loginText,
  avatarAlt,
  logoutText,
}: Props): JSX.Element => {
  const [address, setAddress] = useState('');
  const userMenuItems = getUserMenuItemsMock({
    linkComponent: NavLink,
    pathname: '',
  });
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {address && (
        <UserMenuItems
          nameOrAddress={address}
          avatarAlt={avatarAlt}
          logoutText={logoutText}
          avatar={''}
          disconnect={() => setAddress('')}
          pathname={''}
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
