import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loaderStyles } from 'styles/loader';

import { useAuth } from 'lib/auth/auth';

import WithLoader from './WithLoader';

interface Props {
  component: React.ComponentType<React.PropsWithChildren<unknown>>;
}

/**
 * Renders a page component only if user is authenticated.
 * Redirects to login if not authenticated.
 */
const AuthRoute = ({ component: Component }: Props): JSX.Element => {
  const { loading, activeAccountId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page when loading done and user is unauthenticated
    // 'strict' is set to true so that only if the user logs in,
    // it will go back to the protected page.
    if (!loading && !activeAccountId) {
      navigate('/login?strict=true');
    }
  }, [navigate, loading, activeAccountId]);

  return (
    // Show loader while auth is loading
    <WithLoader isLoading={loading} sx={loaderStyles.withLoaderBlock}>
      <div className="min-h-[500px]">{activeAccountId && <Component />}</div>
    </WithLoader>
  );
};

export { AuthRoute };
