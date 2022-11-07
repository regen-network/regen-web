import { Link, Outlet } from 'react-router-dom';
import { OAuthError, useAuth0 } from '@auth0/auth0-react';
import { Box } from '@mui/material';
import { history } from 'App';

import { AdminNav } from '../../components/organisms';
import isAdmin from '../../lib/admin';

function Admin(): JSX.Element {
  const { user, error } = useAuth0();
  const isUserAdmin = isAdmin(user);

  const authError = error as OAuthError;
  if (
    authError &&
    authError.error_description &&
    authError.error_description.indexOf('email_not_verified:') > -1
  ) {
    const email: string = authError.error_description.split(':')[1];
    history.push(`/verify-email?email=${email}`);
  }

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ textAlign: 'center' }}>
        <AdminNav redirectUri={`${window.location.origin}/admin`} />
      </div>
      {isUserAdmin && (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <p>
              <Link to="/admin/credits/create-and-transfer">
                Create and Transfer
              </Link>
            </p>
            <p>
              <Link to="/admin/credits/issue">Issue credits</Link>
            </p>
            <p>
              <Link to="/admin/credits/transfer">Transfer credits</Link>
            </p>
            <p>
              <Link to="/admin/credits/retire">Retire credits</Link>
            </p>
            <p>
              <Link to="/admin/buyer/create">Create Buyer</Link>
            </p>
          </div>
          <Outlet />
        </Box>
      )}
    </div>
  );
}

export { Admin };
