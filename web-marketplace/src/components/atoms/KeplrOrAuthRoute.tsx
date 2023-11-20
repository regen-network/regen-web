import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loaderStyles } from 'styles/loader';

import { useAuthData } from 'hooks/useAuthData';

import WithLoader from './WithLoader';

interface Props {
  component: React.ComponentType<React.PropsWithChildren<unknown>>;
}

const KeplrOrAuthRoute = ({ component: Component }: Props): JSX.Element => {
  const { loading, noAccountAndNoWallet, accountOrWallet } = useAuthData();
  const navigate = useNavigate();

  useEffect(() => {
    if (noAccountAndNoWallet) {
      navigate('/login');
    }
  }, [navigate, noAccountAndNoWallet]);

  return (
    <WithLoader isLoading={loading} sx={loaderStyles.withLoaderBlock}>
      <div className="min-h-[600px]">{accountOrWallet && <Component />}</div>
    </WithLoader>
  );
};

export { KeplrOrAuthRoute };
