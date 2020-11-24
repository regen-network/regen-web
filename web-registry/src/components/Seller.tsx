import React, { useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import NavBar from './NavBar';
import getOrigin from '../lib/origin';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import Title from 'web-components/lib/components/title';

const origin: string = getOrigin();

const GET_USER = gql`
  query UserByEmail($email: String!) {
    userByEmail(email: $email) {
      stripeAccountId
    }
  }
`;

const Seller = (): JSX.Element => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  const { data, loading } = useQuery(GET_USER, {
    errorPolicy: 'ignore',
    variables: { email: user?.email },
  });

  const accountSetup = useCallback(() => {
    const getAccountLink = async (): Promise<void> => {
      try {
        const accessToken = await getAccessTokenSilently();
        const apiUri = process.env.REACT_APP_API_URI || 'http://localhost:5000';
        const res = await axios({
          method: 'POST',
          url: `${apiUri}/create-account-link`,
          data: {
            email: user?.email,
            refreshUrl: `${origin}/projects/impactag/admin`,
            returnUrl: `${origin}/projects/impactag/admin?setup=true`,
          },
          headers: { authorization: `Bearer ${accessToken}` },
        });
        window.location.assign(res.data.url);
      } catch (e) {
        // console.log(e.message);
      }
    };

    getAccountLink();
  }, [getAccessTokenSilently, user]);

  const viewDashboard = useCallback(
    (account?: boolean) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const getLoginLink = async (): Promise<void> => {
        try {
          const accessToken = await getAccessTokenSilently();
          const apiUri = process.env.REACT_APP_API_URI || 'http://localhost:5000';
          const res = await axios({
            method: 'POST',
            url: `${apiUri}/create-login-link`,
            data: {
              accountId: data?.userByEmail?.stripeAccountId,
            },
            headers: { authorization: `Bearer ${accessToken}` },
          });
          let url = res.data.url;
          if (account) {
            // Directly link to the account tab
            url = url + '#/account';
          }
          window.location.assign(url);
        } catch (e) {
          // console.log(e.message);
        }
      };

      getLoginLink();
    },
    [data, getAccessTokenSilently],
  );

  const search = new URLSearchParams(window.location.search);

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ textAlign: 'center', paddingBottom: '1rem' }}>
        {isAuthenticated &&
          !loading &&
          (data && data.userByEmail && data.userByEmail.stripeAccountId ? (
            <div>
              {search.get('setup') === 'true' && (
                <Title variant="h3" align="center">
                  Thank you!
                </Title>
              )}
              <div>
                <ContainedButton
                  style={{ fontSize: '1.25rem', marginTop: '1rem', padding: '1rem' }}
                  onClick={viewDashboard(true)}
                >
                  View stripe account
                </ContainedButton>
              </div>
              <div>
                <OutlinedButton
                  style={{ fontSize: '1.25rem', marginTop: '1rem', padding: '1rem' }}
                  onClick={viewDashboard()}
                >
                  View payouts on stripe
                </OutlinedButton>
              </div>
            </div>
          ) : (
            <ContainedButton onClick={accountSetup}>Account Setup</ContainedButton>
          ))}
      </div>
      <div style={{ textAlign: 'center' }}>
        <NavBar redirectUri={`${origin}/projects/impactag/admin`} />
      </div>
    </div>
  );
};

export default Seller;
