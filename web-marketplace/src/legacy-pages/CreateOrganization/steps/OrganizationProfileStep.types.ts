import { FormRef } from 'components/molecules/Form/Form';
import type { EditProfileFormSchemaType } from 'components/organisms/EditProfileForm/EditProfileForm.schema';

import { FormStateSetter } from '../CreateOrganization.types';

export type OrganizationProfileStepProps = {
  initialValues: Partial<EditProfileFormSchemaType>;
  hasUnfinishedOrganization: boolean;
  onTransferProfile: (payload: {
    nextValues: Partial<EditProfileFormSchemaType>;
  }) => void;
} & FormStateSetter;
