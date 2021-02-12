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

// export const moreInfo = (): JSX.Element => (
//   <Modal open onClose={() => null}>
//     <MoreInfoForm onClose={() => null} apiUrl="" />
//   </Modal>
// );

export const userProfile = (): JSX.Element => (
  <div style={{ backgroundColor: '#FAFAFA' }}>
    <UserProfileForm onClose={() => null} apiUrl="" />
  </div>
);

export const organizationProfile = (): JSX.Element => (
  <div style={{ backgroundColor: '#FAFAFA' }}>
    <OrganizationProfileForm onClose={() => null} apiUrl="" />
  </div>
);
