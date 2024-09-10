import { useState } from 'react';
import { Box } from '@mui/material';

import ContainedButton from '../buttons/ContainedButton';
import { NavLink } from './components/NavLink';
import { UserMenuItems } from './components/UserMenuItems';
import { getUserMenuItemsMock } from './components/UserMenuItems.mock';

const REGEN_TEST_ADDRESS = 'regen1df675r9vnf7pdedn4sf26svdsem3ugavgxmy46';

export const ExtraComponent = (): JSX.Element => {
  const [address, setAddress] = useState('');
  const userMenuItems = getUserMenuItemsMock({
    linkComponent: NavLink,
    pathname: '',
  });
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {address && (
        <UserMenuItems
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
          {'login'}
        </ContainedButton>
      )}
    </Box>
  );
};
