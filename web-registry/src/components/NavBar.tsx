import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';

const NavBar = ({ redirectUri = window.location.origin }: { redirectUri?: string }): JSX.Element => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <ContainedButton onClick={() => loginWithRedirect({ redirectUri })}>Log in / Sign up</ContainedButton>
      )}

      {isAuthenticated && (
        <OutlinedButton onClick={() => logout({ returnTo: window.location.origin })}>Log out</OutlinedButton>
      )}
    </div>
  );
};

export default NavBar;
