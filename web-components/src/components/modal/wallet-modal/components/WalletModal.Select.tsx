import { Box } from '@mui/system';

import { Body, Title } from '../../../../components/typography';
import { Wallet } from '../WalletModal.types';

export interface Props {
  wallets: Wallet[];
}

const WalletModalSelect = ({ wallets }: Props): JSX.Element => {
  return (
    <Box>
      <Title variant="h5" sx={{ mb: 7.5, textAlign: 'center' }}>
        Select a wallet
      </Title>
      {wallets.map(({ name, description, imageUrl, onClick }) => (
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
            borderRadius: 2,
            cursor: 'pointer',
            py: 4.5,
            mb: 4,
          }}
          onClick={onClick}
          key={name}
        >
          <Box
            component="img"
            src={imageUrl}
            alt={name}
            sx={{ width: 64, height: 64 }}
          />
          <Title variant="h6">{name}</Title>
          <Body size="sm" sx={{ color: 'info.dark' }}>
            {description}
          </Body>
        </Box>
      ))}
    </Box>
  );
};

export { WalletModalSelect };
