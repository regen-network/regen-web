import React from 'react';
import { useAuth0 } from '../react-auth0-spa';
import Button from '@material-ui/core/Button';

const NavBar = (): JSX.Element => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <Button variant="outlined" onClick={() => loginWithRedirect({})}>
          Log in
        </Button>
      )}

      {isAuthenticated && (
        <Button variant="outlined" onClick={() => logout()}>
          Log out
        </Button>
      )}
    </div>
  );
};

export default NavBar;
