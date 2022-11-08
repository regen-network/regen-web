import { useState } from 'react';
import { Box } from '@mui/material';

import ContainedButton from '../buttons/ContainedButton';
import { NavLink } from './components/NavLink';
import { UserMenuItem } from './components/UserMenuItem';

const REGEN_TEST_ADDRESS = 'regen1df675r9vnf7pdedn4sf26svdsem3ugavgxmy46';

export const ExtraComponent = (): JSX.Element => {
  const [address, setAddress] = useState('');
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {address && (
        <UserMenuItem
          address={address}
          avatar={''}
          disconnect={() => setAddress('')}
          pathname={''}
          linkComponent={NavLink}
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
