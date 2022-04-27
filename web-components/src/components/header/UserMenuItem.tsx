import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useTheme, styled } from '@mui/material';

import { HeaderMenuHover, HeaderMenuHoverBase } from './HeaderMenuHover';
import CreditsIcon from '../icons/CreditsIcon';

interface UserMenuItemProps extends HeaderMenuHoverBase {
  address: string;
  avatar: string;
  disconnect: () => void;
}

const Separator = styled('hr')(({ theme }) => ({
  borderTop: 0,
  borderColor: theme.palette.grey[100],
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(6),
}));

const UserMenuItem: React.FC<UserMenuItemProps> = ({
  address,
  avatar,
  disconnect,
  pathname,
  color,
  linkComponent,
}) => {
  const theme = useTheme();
  return (
    <HeaderMenuHover
      pathname={pathname}
      color={color}
      linkComponent={linkComponent}
      item={{
        renderTitle: () => (
          <Box
            display="flex"
            alignItems="center"
            sx={{ fontSize: 14, mt: { md: 0.5 } }}
          >
            <Avatar
              sx={{
                height: 24,
                width: 24,
                mr: 2.75,
                border: theme => `1px solid ${theme.palette.grey[100]}`,
              }}
              alt="default avatar"
              src={avatar}
            />
            {/* TODO hide address on mobile https://github.com/regen-network/regen-web/issues/786 */}
            {address}
          </Box>
        ),
        dropdownItems: [
          {
            pathname,
            linkComponent,
            title: 'My Portfolio',
            href: '/ecocredits/dashboard',
            icon: (
              <CreditsIcon
                sx={{ height: 18, width: 20 }}
                color={theme.palette.secondary.main}
              />
            ),
          },
        ],
        extras: (
          <Box sx={{ mx: -3.5 }}>
            <Separator />
            {/* TODO replace with Label component from David's PR #906 */}
            <Typography
              sx={{
                cursor: 'pointer',
                fontSize: theme => `${theme.spacing(3)} !important`,
                color: '#201F22',
                fontFamily: theme => theme.typography.h1.fontFamily,
                letterSpacing: '1px',
                fontWeight: 800,
                textTransform: 'uppercase',
              }}
              onClick={disconnect}
            >
              disconnect »
            </Typography>
          </Box>
        ),
      }}
    />
  );
};

export { UserMenuItem };
