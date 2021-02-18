import * as React from 'react';
import LoginForm from 'web-components/lib/components/form/LoginForm';

export default {
  title: 'Components|Form',
  component: LoginForm,
};

const submit = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  });
};

export const signUpForm = (): JSX.Element => (
  <LoginForm
    signup
    submit={submit}
    termsLink="https://www.regen.network/terms-service/"
    link="/"
    privacyLink="https://www.regen.network/privacy-policy/"
  />
);

export const loginForm = (): JSX.Element => (
  <LoginForm
    submit={submit}
    recaptchaSiteKey={process.env.STORYBOOK_RECAPTCHA_SITE_KEY}
    termsLink="https://www.regen.network/terms-service/"
    link="/"
    privacyLink="https://www.regen.network/privacy-policy/"
  />
);
