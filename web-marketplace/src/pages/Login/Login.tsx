import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex } from 'web-components/lib/components/box';
import ConnectWallet from 'web-components/lib/components/organisms/ConnectWallet';

import { useAuth } from 'lib/auth/auth';

import { LoginButton } from 'components/organisms/LoginButton/LoginButton';

import { LOGIN_PAGE_TITLE } from './Login.constants';

export const Login = () => {
  const { loading, activeAccountId } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && activeAccountId) navigate(-1);
  }, [navigate, loading, activeAccountId]);

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
