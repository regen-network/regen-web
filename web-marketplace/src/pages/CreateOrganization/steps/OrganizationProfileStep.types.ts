import type { AccountByIdQuery } from 'generated/graphql';

import type { EditProfileFormSchemaType } from 'components/organisms/EditProfileForm/EditProfileForm.schema';

import type { OrganizationMultiStepData } from '../hooks/useOrganizationFlow';

export type OrganizationProfileStepProps = {
  formId: string;
  initialValues: Partial<EditProfileFormSchemaType>;
  activeAccountId?: string;
  activeAccount?: AccountByIdQuery['accountById'];
  hasUnfinishedOrganization: boolean;
  daoAddress?: string;
  setDaoAddress: (value: string | undefined) => void;
  organizationId?: string;
  setOrganizationId: (value: string | undefined) => void;
  onTransferProfile: (payload: {
    nextValues: Partial<EditProfileFormSchemaType>;
  }) => void;
  data: OrganizationMultiStepData | undefined;
  handleSaveNext: (payload: OrganizationMultiStepData) => void;
};
