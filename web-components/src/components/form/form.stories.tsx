import * as React from 'react';
import MoreInfoForm from 'web-components/lib/components/form/MoreInfoForm';
import UserProfileForm from 'web-components/lib/components/form/UserProfileForm';
// import Modal from 'web-components/lib/components/modal';

export default {
  title: 'Components|Forms',
  component: MoreInfoForm,
};
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
