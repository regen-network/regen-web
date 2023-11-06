import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { useAuth } from 'lib/auth/auth';

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

  return <Box sx={{ minHeight: 600 }}>{activeAccountId && <Component />}</Box>;
};

export { AuthRoute };
