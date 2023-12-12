import { Box, CircularProgress } from '@mui/material';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import { Title } from 'web-components/src/components/typography';

import { useWallet } from 'lib/wallet/wallet';

import { useRequestFunds } from './hook/useRequestFunds';

export const Faucet = () => {
  const { wallet } = useWallet();
  const address = wallet?.address;
  const { isLoading, requestFunds } = useRequestFunds();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'primary.main',
        minHeight: '800px',
        m: 14,
      }}
    >
      <Title
        variant="h1"
        sx={{ textAlign: 'center', color: 'primary.contrastText', mb: 4.25 }}
      >
        {'Redwood Testnet Faucet'}
      </Title>
      <OutlinedButton
        disabled={isLoading || !address}
        style={{ whiteSpace: 'nowrap' }}
        onClick={() => address && requestFunds(address)}
        startIcon={
          isLoading && (
            <CircularProgress color="secondary" size={25} sx={{ mr: 2 }} />
          )
        }
        sx={{ whiteSpace: 'nowrap', mt: 8 }}
      >
        Request fund
      </OutlinedButton>
    </Box>
  );
};
