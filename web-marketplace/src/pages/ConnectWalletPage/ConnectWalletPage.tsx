import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex } from 'web-components/lib/components/box';
import ConnectWallet from 'web-components/lib/components/organisms/ConnectWallet';

import { useWallet } from 'lib/wallet/wallet';

import { LoginButton } from 'components/organisms/LoginButton/LoginButton';

import { CONNECT_WALLET_PAGE_TITLE } from './ConnectWalletPage.constants';

export const ConnectWalletPage = () => {
  const { loaded, isConnected } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (loaded && isConnected) navigate(-1);
  }, [isConnected, navigate, loaded]);

  return (
    <Flex justifyContent="center" pt={17} pb={27.5}>
      <ConnectWallet
        title={CONNECT_WALLET_PAGE_TITLE}
        button={<LoginButton size="large" />}
        variant="page"
      />
    </Flex>
  );
};
