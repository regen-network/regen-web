import React, { useCallback } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import LoginForm, {
  Values,
} from 'web-components/lib/components/form/LoginForm';
import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import auth0 from '../../auth0';
import getApiUri from '../../lib/apiUri';

const CREATE_USER = loader('../../graphql/ReallyCreateUser.graphql');

function Signup(): JSX.Element {
  const [createUser] = useMutation(CREATE_USER);
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  const submit = useCallback(
    ({ email, password, updates }: Values): Promise<void> => {
      return new Promise((resolve, reject) => {
        // signup user in auth0
        auth0.signup(
          {
            connection: 'Username-Password-Authentication',
            email,
            password,
          },
          function (err) {
            if (err) {
              reject(err);
            } else {
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
                        navigate(`/verify-email?email=${email}`);
                      })
                      .catch(err => {
                        reject(err);
                      });
                  } else {
                    resolve();
                    navigate(`/verify-email?email=${email}`);
                  }
                })
                .catch(err => {
                  reject(err);
                });
            }
          },
        );
      });
    },
    [createUser, navigate],
  );

  return (
    <OnBoardingSection formContainer title="Sign up">
      <LoginForm
        submit={submit}
        termsLink="/terms-service/"
        loginFromSignup={() =>
          loginWithRedirect({
            redirectUri: `${window.location.origin}/user-profile`,
          })
        }
        privacyLink="/privacy-policy/"
      />
    </OnBoardingSection>
  );
}

export { Signup };
