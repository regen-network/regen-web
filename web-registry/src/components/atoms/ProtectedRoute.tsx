import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

interface Props extends RouteProps {
  component: React.ComponentType;
}
const ProtectedRoute: React.FC<Props> = ({ component, ...args }) => (
  <Route element={<>{withAuthenticationRequired(component)}</>} {...args} />
);

export { ProtectedRoute };
