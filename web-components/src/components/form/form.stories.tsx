import * as React from 'react';
import MoreInfoForm from 'web-components/lib/components/form/MoreInfoForm';
import UserProfileForm from 'web-components/lib/components/form/UserProfileForm';
import OrganizationProfileForm from 'web-components/lib/components/form/OrganizationProfileForm';
import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';

export default {
  title: 'Components|Forms',
  component: MoreInfoForm,
};

export const userProfile = (): JSX.Element => (
  <OnBoardingSection title="User Profile">
    <UserProfileForm apiUrl="" submit={() => null} />
  </OnBoardingSection>
);

export const organizationProfile = (): JSX.Element => (
  <OnBoardingSection title="Organization Profile">
    <OrganizationProfileForm apiUrl="" submit={() => null} goBack={() => null} skip={() => null} />
  </OnBoardingSection>
);
