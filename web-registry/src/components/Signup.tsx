import React from 'react';
import { Link } from 'react-router-dom';

import LoginForm from 'web-components/lib/components/form/LoginForm';
import getRegistryUrl from '../lib/registryUrl';

export default function Signup(): JSX.Element {
  return (
    <LoginForm
      signup
      submit={submit}
      termsLink="/terms-service/"
      link={getRegistryUrl('/login')}
      privacyLink="/privacy-policy/"
    />
  );
}
