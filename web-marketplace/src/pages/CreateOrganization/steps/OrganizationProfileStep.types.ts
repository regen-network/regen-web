import type { EditProfileFormSchemaType } from 'components/organisms/EditProfileForm/EditProfileForm.schema';

export type OrganizationProfileStepProps = {
  initialValues: Partial<EditProfileFormSchemaType>;
  hasUnfinishedOrganization: boolean;
  daoAddress?: string;
  setDaoAddress: (value: string | undefined) => void;
  organizationId?: string;
  setOrganizationId: (value: string | undefined) => void;
  onTransferProfile: (payload: {
    nextValues: Partial<EditProfileFormSchemaType>;
  }) => void;
};
