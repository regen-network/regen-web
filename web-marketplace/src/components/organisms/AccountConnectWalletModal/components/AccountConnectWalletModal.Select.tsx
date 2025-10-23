import type { ReactNode } from 'react';
import { Trans } from '@lingui/macro';
import { Box } from '@mui/system';

import { Body, Title } from 'web-components/src/components/typography';

import { WalletGuideLearnMore } from 'components/molecules/WalletGuideLearnMore';

import { LoginProvider } from '../AccountConnectWalletModal.types';
import { LoginModalProviders } from './AccountConnectWalletModal.Providers';

export interface Props {
  wallets: LoginProvider[];
  title?: string;
  description?: ReactNode;
}

const AccountConnectWalletModalSelect = ({
  wallets,
  title,
  description,
}: Props): JSX.Element => {
  return (
    <Box textAlign="center">
      <Title variant="h4" mb={5}>
        {title || <Trans>Select a wallet</Trans>}
      </Title>
      {description ? (
        <Body pb={7.5}>{description}</Body>
      ) : (
        <WalletGuideLearnMore
          linkProps={{
            className:
              'font-bold bg-clip-text text-transparent bg-blue-green-gradient',
          }}
        />
      )}
      <LoginModalProviders providers={wallets} />
    </Box>
  );
};

export { AccountConnectWalletModalSelect };
