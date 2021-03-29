import * as React from 'react';
import UserProfileForm from 'web-components/lib/components/form/UserProfileForm';
// import OrganizationProfileForm from 'web-components/lib/components/form/OrganizationProfileForm';
import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import FixedFooter from 'web-components/lib/components/fixed-footer';
import BuyFooter from 'web-components/lib/components/fixed-footer/BuyFooter';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';

export default {
  title: 'Components|Footers',
  component: FixedFooter,
};

const submit = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  });
};

export const fixedFooter = (): JSX.Element => (
  <FixedFooter>
    <div>Fixed footer content</div>
  </FixedFooter>
);

export const onboardingFooter = (): JSX.Element => <OnboardingFooter onSave={submit} percentComplete={30} />;
