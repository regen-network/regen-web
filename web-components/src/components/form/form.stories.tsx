import * as React from 'react';
import Long from 'long';

import UserProfileForm from 'web-components/lib/components/form/UserProfileForm';
// import OrganizationProfileForm from 'web-components/lib/components/form/OrganizationProfileForm';
import LoginForm from 'web-components/lib/components/form/LoginForm';
import { CreditSendForm } from 'web-components/lib/components/form/CreditSendForm';
import { CreditRetireForm } from 'web-components/lib/components/form/CreditRetireForm';
import { BasketPutForm } from 'web-components/lib/components/form/BasketPutForm';
import { BasketTakeForm } from 'web-components/lib/components/form/BasketTakeForm';
import { RecipientsForm } from 'web-components/lib/components/form/RecipientsForm';

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
    mapboxToken={process.env.STORYBOOK_MAPBOX_TOKEN}
    onClose={() => null}
    onSubmit={async () => alert('submit')}
  />
);

export const creditRetireForm = (): JSX.Element => (
  <CreditRetireForm
    holder={'regen18hj7m3skrsrr8lfvwqh66r7zruzdvp6ylwxrx4'} // test account
    availableTradableAmount={1000}
    batchDenom={'C01-20190101-20201010-02'}
    mapboxToken={process.env.STORYBOOK_MAPBOX_TOKEN}
    onClose={() => null}
    onSubmit={async () => alert('submit')}
  />
);

export const basketPutForm = (): JSX.Element => (
  <BasketPutForm
    basketOptions={[{ label: 'NCT', value: 'eco.uC.NCT' }]}
    availableTradableAmount={1000}
    batchDenom={'C01-20190101-20201010-02'}
    onClose={() => null}
    onSubmit={async () => alert('submit')}
  />
);

export const basketTakeForm = (): JSX.Element => (
  <BasketTakeForm
    accountAddress="123xyz"
    basketDisplayDenom="eco.C.rNCT"
    basket={{
      id: new Long(1),
      $type: 'regen.ecocredit.basket.v1.Basket',
      name: 'rNCT',
      basketDenom: 'eco.uC.rNCT',
      creditTypeAbbrev: 'C',
      disableAutoRetire: false,
      exponent: 6,
    }}
    balance={9999}
    mapboxToken={process.env.STORYBOOK_MAPBOX_TOKEN}
    onClose={() => null}
    onSubmit={async () => alert('submit')}
  />
);

export const creditRecipientForm = (): JSX.Element => (
  <RecipientsForm
    sender={'regen18hj7m3skrsrr8lfvwqh66r7zruzdvp6ylwxrx4'} // test account
    availableTradableAmount={1000}
    batchDenom={'C01-20190101-20201010-02'}
    mapboxToken={process.env.STORYBOOK_MAPBOX_TOKEN}
    onSubmit={async () => alert('submit')}
  />
);
