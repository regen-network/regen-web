import React, { useCallback } from 'react';
import { WebAuth } from 'auth0-js';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import LoginForm, { Values } from 'web-components/lib/components/form/LoginForm';

const searchParams = new URLSearchParams(window.location.search);
const state = searchParams.get('state') || undefined;
const clientID = searchParams.get('client') || undefined;
const redirectUri = searchParams.get('redirect_uri') || undefined;
const audience = searchParams.get('audience') || undefined;
const nonce = searchParams.get('nonce') || undefined;
const scope = searchParams.get('nonce') || undefined;
const responseType = searchParams.get('response_type') || undefined;
const responseMode = searchParams.get('response_mode') || undefined;

const auth0 = new WebAuth({
  domain: process.env.REACT_APP_AUTH0_DOMAIN || 'regen-network-registry.auth0.com',
  clientID: clientID || 'rEuc1WLPAQVXZ7gJrWg4AL9EhWMHmLu8',
  audience: audience || 'https://regen-registry-server.herokuapp.com/',
  redirectUri,
});

function App() {

  const submit = useCallback(
    ({ email, password }: Values): Promise<void> => {
      return new Promise((resolve, reject) => {
        // console.log('Email', email)
        // resolve();
        auth0.login(
          {
            realm: 'Username-Password-Authentication',
            email,
            password,
            nonce,
            scope,
            responseType,
            responseMode,
            state,
          },
          function(err) {
            console.log('err', err)
            if (err) {
              reject(err);
            } else {
              resolve()
            }
          },
        );
      });
    },
    [],
  );

  return (
    <OnBoardingSection title="Log in">
      <LoginForm link="https://www.regen.network/"
        submit={submit}
      />
    </OnBoardingSection>
  );
}

export default App;
