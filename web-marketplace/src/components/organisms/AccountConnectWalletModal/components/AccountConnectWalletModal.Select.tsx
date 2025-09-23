import { Trans } from '@lingui/macro';
import { Box } from '@mui/system';

import { Body, Title } from 'web-components/src/components/typography';

import { Link } from 'components/atoms/Link';

import { LoginProvider } from '../AccountConnectWalletModal.types';
import { LoginModalProviders } from './AccountConnectWalletModal.Providers';

export interface Props {
  wallets: LoginProvider[];
  title?: string;
  description?: string;
}

const LoginModalSelect = ({ wallets, title, description }: Props): JSX.Element => {
  return (
    <Box textAlign="center">
      <Title variant="h4" mb={5}>
        {title || <Trans>Select a wallet</Trans>}
      </Title>
      <Body pb={7.5}>
        {description || (
          <Trans>
            Learn more about wallets in our{' '}
            <Link href="https://guides.regen.network/guides/wallets">
              user guide.
            </Link>
          </Trans>
        )}
      </Body>
      <LoginModalProviders providers={wallets} />
    </Box>
  );
};

export { LoginModalSelect };
