import { Box } from '@mui/system';

import { Title } from 'web-components/src/components/typography';

import { LoginProvider } from '../AccountConnectWalletModal.types';

export interface Props {
  provider: LoginProvider;
}

const LoginModalButton = ({ provider: { name, onClick, imageUrl } }: Props) => (
  <Box
    component="button"
    sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      border: theme => `1px solid ${theme.palette.grey['100']}`,
      backgroundColor: 'primary.main',
      borderRadius: '2px',
      cursor: 'pointer',
      py: 4.25,
      boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.15)',
    }}
    onClick={onClick}
    key={name}
  >
    <Box component="img" src={imageUrl} alt={name} sx={{ height: 40, pb: 1 }} />
    <Title variant="h6">{name}</Title>
  </Box>
);

export { LoginModalButton };
