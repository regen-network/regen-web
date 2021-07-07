import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { AdminNav } from '../components/organisms';
import isAdmin from '../lib/admin';

function Admin(): JSX.Element {
  const { user } = useAuth0();

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ textAlign: 'center' }}>
        <AdminNav redirectUri={`${window.location.origin}/admin`} />
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
