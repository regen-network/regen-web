import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loaderStyles } from 'styles/loader';

import { useAuth } from 'lib/auth/auth';

import WithLoader from './WithLoader';

interface Props {
  component: React.ComponentType<React.PropsWithChildren<unknown>>;
}

const AuthRoute = ({ component: Component }: Props): JSX.Element => {
  const { loading, activeAccountId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !activeAccountId) {
      navigate('/login?strict=true');
    }
  }, [navigate, loading, activeAccountId]);

  return (
    <WithLoader isLoading={loading} sx={loaderStyles.withLoaderBlock}>
      <div className="min-h-[500px] bg-grey-100">
        {activeAccountId && <Component />}
      </div>
    </WithLoader>
  );
};

export { AuthRoute };
