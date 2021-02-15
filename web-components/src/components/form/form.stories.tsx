import * as React from 'react';
import MoreInfoForm from 'web-components/lib/components/form/MoreInfoForm';
import UserProfileForm from 'web-components/lib/components/form/UserProfileForm';
import OrganizationProfileForm from 'web-components/lib/components/form/OrganizationProfileForm';
// import Modal from 'web-components/lib/components/modal';

export default {
  title: 'Components|Forms',
  component: MoreInfoForm,
};
// TODO: The following crashes the tests. I'm pretty sure we need to stub a method, but i'm not sure what

const wrapStyles = { backgroundColor: '#FAFAFA', width: '100%', height: '100%' };
export const userProfile = (): JSX.Element => (
  <div style={wrapStyles}>
    <UserProfileForm onClose={() => null} apiUrl="" />
  </div>
);

export const organizationProfile = (): JSX.Element => (
  <div style={wrapStyles}>
    <OrganizationProfileForm onClose={() => null} apiUrl="" />
  </div>
);
