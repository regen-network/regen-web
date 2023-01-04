import { BasketPutForm } from './BasketPutForm/BasketPutForm';
import { BasketTakeForm } from './BasketTakeForm';
import { CreditRetireForm } from './CreditRetireForm';
// import OrganizationProfileForm from './OrganizationProfileForm';
import LoginForm from './LoginForm';
import { FormValues, RecipientsForm } from './RecipientsForm';
import UserProfileForm from './UserProfileForm';

export default {
  title: 'Forms',
  component: LoginForm,
};

const MAPBOX_TOKEN = process.env.STORYBOOK_MAPBOX_TOKEN || '';

const submit = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  });
};

export const userProfile = (): JSX.Element => (
  <UserProfileForm
    submit={submit}
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
    termsLink={'https://www.regen.network/terms-service/'}
    loginFromSignup={submit}
    privacyLink={'https://www.regen.network/privacy-policy/'}
  />
);

export const loginForm = (): JSX.Element => (
  <LoginForm
    submit={submit}
    termsLink={'https://www.regen.network/terms-service/'}
    signupFromLogin="/"
    privacyLink={'https://www.regen.network/privacy-policy/'}
  />
);

export const creditRetireForm = (): JSX.Element => (
  <CreditRetireForm
    availableTradableAmount={1000}
    batchDenom={'C01-20190101-20201010-02'}
    mapboxToken={MAPBOX_TOKEN}
    onClose={() => null}
    onSubmit={async () => alert('submit')}
  />
);

export const basketPutForm = (): JSX.Element => (
  <BasketPutForm
    basketOptions={[{ label: 'NCT', value: 'eco.uC.NCT' }]}
    availableTradableAmount={1000}
    batchDenoms={['C01-20190101-20201010-02', 'C01-20190101-20201010-03']}
    onClose={() => null}
    onSubmit={async () => alert('submit')}
    onBatchDenomChange={batchDenom => console.log(batchDenom)}
  />
);

export const basketTakeForm = (): JSX.Element => (
  <BasketTakeForm
    accountAddress="123xyz"
    basketDisplayDenom="eco.C.rNCT"
    basket={{
      curator: 'regen18hj7m3skrsrr8lfvwqh66r7zruzdvp6ylwxrx4',
      $type: 'regen.ecocredit.basket.v1.BasketInfo',
      name: 'rNCT',
      basketDenom: 'eco.uC.rNCT',
      creditTypeAbbrev: 'C',
      disableAutoRetire: false,
      exponent: 6,
    }}
    balance={9999}
    mapboxToken={MAPBOX_TOKEN}
    onClose={() => null}
    onSubmit={async () => alert('submit')}
  />
);

export const creditBatchRecipientsForm = (): JSX.Element => (
  <RecipientsForm
    addressPrefix={'regen'}
    mapboxToken={MAPBOX_TOKEN}
    onSubmit={async (values: FormValues) =>
      alert('submit' + JSON.stringify(values, null, 2))
    }
  />
);
