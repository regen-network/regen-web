import React, { useCallback } from 'react';
import { WebAuth } from 'auth0-js';
import axios from 'axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import LoginForm, { Values } from 'web-components/lib/components/form/LoginForm';

const searchParams = new URLSearchParams(window.location.search);
const state = searchParams.get('state') || undefined;
const clientID = searchParams.get('client') || undefined;
const redirectUri = searchParams.get('redirect_uri') || undefined;
const audience = searchParams.get('audience') || undefined;
const nonce = searchParams.get('nonce') || undefined;
const scope = searchParams.get('nonce') || undefined;
const responseType = searchParams.get('response_type') || 'code';
const responseMode = searchParams.get('response_mode') || undefined;

const auth0 = new WebAuth({
  domain: process.env.REACT_APP_AUTH0_DOMAIN || window.location.host,
  clientID: clientID || 'rEuc1WLPAQVXZ7gJrWg4AL9EhWMHmLu8',
  audience: audience,
  redirectUri,
});

function App() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const submit = useCallback(
     ({ email, password }: Values): Promise<void> => {
      return new Promise(async(resolve, reject) => {
        try {
          const token = await executeRecaptcha('login_page');
          const apiUri: string = process.env.REACT_APP_API_URI || 'http://localhost:5000';
          const res = await axios({
            method: 'POST',
            url: `${apiUri}/recaptcha/v3/verify`,
            data: {
              userResponse: token,
            },
          });
          if (res && res.data && res.data.success && res.data.score >= 0.5) {
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
              if (err) {
                reject(err);
              } else {
                resolve()
              }
            },
          );
          } else {
            reject();
          }
          
        } catch (err) {
          reject(err);
        }
        
      });
    },
    [executeRecaptcha],
  );

  return (
    <OnBoardingSection title="Log in">
      <LoginForm
        link={process.env.REACT_APP_SIGNUP_LINK || 'https://www.regen.network/registry/signup'}
        submit={submit}
      />
    </OnBoardingSection>
  );
}

export default App;
