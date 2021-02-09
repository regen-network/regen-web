import * as React from 'react';
import LoginForm from 'web-components/lib/components/form/LoginForm';

export default {
  title: 'Components|Form',
  component: LoginForm,
};

export const signUpForm = (): JSX.Element => (
  <LoginForm
    signup
    termsLink="https://www.regen.network/terms-service/"
    link="/"
    privacyLink="https://www.regen.network/privacy-policy/"
  />
);

export const loginForm = (): JSX.Element => (
  <LoginForm
    termsLink="https://www.regen.network/terms-service/"
    link="/"
    privacyLink="https://www.regen.network/privacy-policy/"
  />
);
