import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';

interface Props {
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<Props> = ({ component }) => {
  const ProtectedComponent = withAuthenticationRequired(component);
  return <ProtectedComponent />;
};

export { ProtectedRoute };
