import { useState } from 'react';
import { Box, useTheme } from '@mui/material';

import ContainedButton from '../buttons/ContainedButton';
import { NavLink } from './components/NavLink';
import { UserMenuItem } from './components/UserMenuItem';
import { getUserMenuItemsMock } from './components/UserMenuItem.mock';

const REGEN_TEST_ADDRESS = 'regen1df675r9vnf7pdedn4sf26svdsem3ugavgxmy46';

export const ExtraComponent = (): JSX.Element => {
  const [address, setAddress] = useState('');
  const theme = useTheme();
  const userMenuItems = getUserMenuItemsMock({
    linkComponent: NavLink,
    pathname: '',
    theme,
  });
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {address && (
        <UserMenuItem
          address={address}
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
          {'Connect'}
        </ContainedButton>
      )}
    </Box>
  );
};
