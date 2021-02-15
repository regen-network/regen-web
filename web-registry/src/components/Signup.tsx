import React, { useCallback } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useHistory } from 'react-router-dom';

import LoginForm, { Values } from 'web-components/lib/components/form/LoginForm';
import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import getRegistryUrl from '../lib/registryUrl';
import auth0 from '../auth0';
import getApiUri from '../lib/apiUri';

const CREATE_USER = loader('../graphql/ReallyCreateUser.graphql');

export default function Signup(): JSX.Element {
  const [createUser] = useMutation(CREATE_USER);
  const history = useHistory();

  const submit = useCallback(
    ({ email, password, updates }: Values): Promise<void> => {
      return new Promise((resolve, reject) => {
        // signup user in auth0
        auth0.signup(
          {
            connection: 'Username-Password-Authentication',
            email,
            password,
            // user_metadata: { plan: 'silver', team_id: 'a111' },
          },
          function(err) {
            if (err) {
              reject(err);
            }
            // create user in our db
            createUser({
              variables: {
                input: {
                  email,
                  name: email.split('@')[0],
                  updates,
                },
              },
            })
              .then(resp => {
                // Subscribe to mailing list
                if (updates === true) {
                  axios
                    .post(`${getApiUri()}/mailerlite`, {
                      email,
                    })
                    .then(resp => {
                      resolve();
                      history.push(`/verify-email?email=${email}`);
                    })
                    .catch(err => {
                      reject(err);
                    });
                } else {
                  resolve();
                  history.push(`/verify-email?email=${email}`);
                }
              })
              .catch(err => {
                reject(err);
              });
          },
        );
      });
    },
    [createUser, history],
  );

  return (
    <OnBoardingSection title="Sign up">
      <LoginForm
        signup
        submit={submit}
        termsLink="/terms-service/"
        link={getRegistryUrl('/login')}
        privacyLink="/privacy-policy/"
      />
    </OnBoardingSection>
  );
}
