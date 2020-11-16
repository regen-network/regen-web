import React, { useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import NavBar from './NavBar';
import getOrigin from '../lib/origin';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import Title from 'web-components/lib/components/title';

const origin: string = getOrigin();

const Seller = (): JSX.Element => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

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

  const search = new URLSearchParams(window.location.search);

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ textAlign: 'center', paddingBottom: '1rem' }}>
        {isAuthenticated &&
          (search.get('setup') === 'true' ? (
            <Title variant="h3" align="center">
              Thank you!
            </Title>
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
