import * as React from 'react';
import UserProfileForm from 'web-components/lib/components/form/UserProfileForm';
// import OrganizationProfileForm from 'web-components/lib/components/form/OrganizationProfileForm';
import LoginForm from 'web-components/lib/components/form/LoginForm';
import { CreditSendForm } from 'web-components/lib/components/form/CreditSendForm';
import { CreditRetireForm } from 'web-components/lib/components/form/CreditRetireForm';

export default {
  title: 'Forms',
  component: LoginForm,
};

const submit = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  });
};

export const userProfile = (): JSX.Element => (
  <UserProfileForm
    submit={() => null}
    initialValues={{ name: 'Name', roleTitle: 'Role title' }}
  />
);

// export const organizationProfile = (): JSX.Element => (
//   <OnBoardingSection title="Organization Profile">
//     <OrganizationProfileForm
//       apiUrl=""
//       mapToken={process.env.STORYBOOK_MAPBOX_TOKEN || process.env.REACT_APP_MAPBOX_TOKEN}
//       submit={() => null}
//       goBack={() => null}
//       skip={() => null}
//     />
//   </OnBoardingSection>
// );

export const signUpForm = (): JSX.Element => (
  <LoginForm
    submit={submit}
    termsLink="https://www.regen.network/terms-service/"
    loginFromSignup={() => null}
    privacyLink="https://www.regen.network/privacy-policy/"
  />
);

export const loginForm = (): JSX.Element => (
  <LoginForm
    submit={submit}
    termsLink="https://www.regen.network/terms-service/"
    signupFromLogin="/"
    privacyLink="https://www.regen.network/privacy-policy/"
  />
);

export const creditSendForm = (): JSX.Element => (
  <CreditSendForm
    sender={'regen18hj7m3skrsrr8lfvwqh66r7zruzdvp6ylwxrx4'} // test account
    availableTradableAmount={1000}
    batchDenom={'C01-20190101-20201010-02'}
    onClose={() => null}
  />
);

export const creditRetireForm = (): JSX.Element => (
  <CreditRetireForm
    holder={'regen18hj7m3skrsrr8lfvwqh66r7zruzdvp6ylwxrx4'} // test account
    availableTradableAmount={1000}
    batchDenom={'C01-20190101-20201010-02'}
    onClose={() => null}
  />
);
