import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex } from 'web-components/lib/components/box';
import ConnectWallet from 'web-components/lib/components/organisms/ConnectWallet';

import { useWallet } from 'lib/wallet/wallet';

import { WalletButton } from 'components/organisms/WalletButton/WalletButton';

import { CONNECT_WALLET_PAGE_TITLE } from './ConnectWalletPage.contants';

export const ConnectWalletPage = () => {
  const { loaded, wallet } = useWallet();
  const navigate = useNavigate();
  const connected = wallet?.address;

  useEffect(() => {
    if (loaded && connected) navigate(-1);
  }, [connected, navigate, loaded]);

  return (
    <Flex justifyContent="center" pt={17} pb={27.5}>
      <ConnectWallet
        title={CONNECT_WALLET_PAGE_TITLE}
        button={<WalletButton size="large" />}
        variant="page"
      />
    </Flex>
  );
};
