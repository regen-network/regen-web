import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { NavBar } from '../organisms';
import isAdmin from '../../lib/admin';
import getRegistryUrl from '../../lib/registryUrl';

function Admin(): JSX.Element {
  const { user } = useAuth0();

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ textAlign: 'center' }}>
        <NavBar redirectUri={`${getRegistryUrl('/admin')}`} />
      </div>
      {isAdmin(user) && (
        <div>
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
      )}
    </div>
  );
}

export { Admin };
