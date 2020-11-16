import React from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import NavBar from './NavBar';
import isAdmin from '../lib/admin';

const ALL_PROJECTS = loader('../graphql/AllProjects.graphql');

export default function Admin(): JSX.Element {
  const { user } = useAuth0();
  const { data } = useQuery(ALL_PROJECTS, {
    errorPolicy: 'ignore',
  });

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ textAlign: 'center' }}>
        <NavBar />
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
          {data && data.allProjects && data.allProjects.nodes && data.allProjects.nodes.length && (
            <p>
              <b>Wilmot Project id:</b> {data.allProjects.nodes[0].id.substring(0, 8)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
