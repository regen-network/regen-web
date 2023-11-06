import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Flex } from 'web-components/lib/components/box';
import ConnectWallet from 'web-components/lib/components/organisms/ConnectWallet';

import { useAuth } from 'lib/auth/auth';

import { LoginButton } from 'components/organisms/LoginButton/LoginButton';

import { LOGIN_PAGE_TITLE } from './Login.constants';
import { useWallet } from 'lib/wallet/wallet';

export const Login = () => {
  const { loaded: walletLoaded, isConnected } = useWallet();
  const { loading: authLoading, activeAccountId } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const strict = searchParams.get('strict');

  useEffect(() => {
    if (!strict) {
      if (!authLoading && activeAccountId || walletLoaded && isConnected) 
        navigate(-1);
    } else if (!authLoading && activeAccountId) navigate(-1);
  }, [navigate, authLoading, activeAccountId]);

  return (
    <Flex justifyContent="center" pt={17} pb={27.5}>
      <ConnectWallet
        title={LOGIN_PAGE_TITLE}
        button={<LoginButton size="large" />}
        variant="page"
      />
    </Flex>
  );
};
