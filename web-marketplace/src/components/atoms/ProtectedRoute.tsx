import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';

interface Props {
  component: React.ComponentType<React.PropsWithChildren<unknown>>;
}

const ProtectedRoute: React.FC<React.PropsWithChildren<Props>> = ({
  component,
}) => {
  const ProtectedComponent = withAuthenticationRequired(component);
  return <ProtectedComponent />;
};

export { ProtectedRoute };
