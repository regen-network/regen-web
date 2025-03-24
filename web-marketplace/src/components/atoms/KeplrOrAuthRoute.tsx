import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loaderStyles } from 'styles/loader';

import { useAuthData } from 'hooks/useAuthData';

import WithLoader from './WithLoader';

interface Props {
  component: React.ComponentType<React.PropsWithChildren<unknown>>;
}

/**
 * Renders a page component if user is authenticated
 * or has connected a wallet (which can be through Wallet Connect if user unauthenticated)
 * Redirects to login if not authenticated/connected.
 */
const KeplrOrAuthRoute = ({ component: Component }: Props): JSX.Element => {
  const { loading, noAccountAndNoWallet, accountOrWallet } = useAuthData();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if the user is neither logged in nor has a connected wallet
    // 'strict' is not set, allowing return to the protected page after login or wallet connection
    if (noAccountAndNoWallet) {
      navigate('/login');
    }
  }, [navigate, noAccountAndNoWallet]);

  return (
    <WithLoader isLoading={loading} sx={loaderStyles.withLoaderBlock}>
      <div className="min-h-[500px]">{accountOrWallet && <Component />}</div>
    </WithLoader>
  );
};

export { KeplrOrAuthRoute };
