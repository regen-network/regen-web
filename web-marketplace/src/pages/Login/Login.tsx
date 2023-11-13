import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Flex } from 'web-components/lib/components/box';
import ConnectWallet from 'web-components/lib/components/organisms/ConnectWallet';

import { useAuth } from 'lib/auth/auth';

import { LoginButton } from 'components/organisms/LoginButton/LoginButton';
import { useAuthData } from 'hooks/useAuthData';

import { LOGIN_PAGE_TITLE } from './Login.constants';

export const Login = () => {
  const { loading: authLoading, activeAccountId } = useAuth();
  const { accountOrWallet } = useAuthData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const strict = searchParams.get('strict');

  useEffect(() => {
    if (!strict) {
      // needs a logged-in account (whether it's done through web2 or web3)
      // or a connected wallet address (through WC, which doesn't support signArbitrary yet
      // which is used for logging in via web3)
      if (accountOrWallet) navigate(-1);
      // strictly needs a logged-in account
    } else if (!authLoading && activeAccountId) navigate(-1);
  }, [navigate, accountOrWallet, strict, authLoading, activeAccountId]);

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
