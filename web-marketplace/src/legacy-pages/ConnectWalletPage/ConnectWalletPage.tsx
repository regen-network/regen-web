import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';

import { Flex } from 'web-components/src/components/box';
import ConnectWallet from 'web-components/src/components/organisms/ConnectWallet';

import { useWallet } from 'lib/wallet/wallet';

import { LoginButton } from 'components/organisms/LoginButton/LoginButton';

import { CONNECT_WALLET_PAGE_TITLE } from './ConnectWalletPage.constants';

export const ConnectWalletPage = () => {
  const { _ } = useLingui();
  const { loaded, isConnected } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (loaded && isConnected) navigate(-1);
  }, [isConnected, navigate, loaded]);

  return (
    <Flex justifyContent="center" pt={17} pb={27.5}>
      <ConnectWallet
        title={_(CONNECT_WALLET_PAGE_TITLE)}
        button={<LoginButton size="large" />}
        variant="page"
      />
    </Flex>
  );
};
