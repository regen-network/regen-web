import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import getRegistryUrl from '../../lib/registryUrl';

const NavBar = ({ redirectUri = window.location.origin }: { redirectUri?: string }): JSX.Element => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <>
          <p>
            <ContainedButton href={getRegistryUrl('/signup')}>Sign up</ContainedButton>
          </p>
          <p>
            <ContainedButton onClick={() => loginWithRedirect({ redirectUri })}>Log in</ContainedButton>
          </p>
        </>
      )}

      {isAuthenticated && (
        <OutlinedButton onClick={() => logout({ returnTo: window.location.origin })}>Log out</OutlinedButton>
      )}
    </div>
  );
};

export { NavBar };
