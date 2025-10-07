import React, { useCallback, useRef } from 'react';
import { useLingui } from '@lingui/react';

import { useOnUploadCallback } from 'pages/Dashboard/hooks/useOnUploadCallback';
import { EditProfileForm } from 'components/organisms/EditProfileForm/EditProfileForm';
import { EditProfileFormSchemaType } from 'components/organisms/EditProfileForm/EditProfileForm.schema';

import { CREATE_ORG_ORGANIZATION_NAME_LABEL } from '../CreateOrganization.constants';

type Props = {
  formId: string;
  initialValues: Partial<EditProfileFormSchemaType>;
  onSaved: (values: EditProfileFormSchemaType) => Promise<void>;
};

export const OrganizationProfileStep: React.FC<Props> = ({
  formId,
  initialValues,
  onSaved,
}) => {
  const { _ } = useLingui();
  const fileNamesToDeleteRef = useRef<string[]>([]);
  const onUpload = useOnUploadCallback({
    fileNamesToDeleteRef,
  });

  const handleSubmit = useCallback(
    async (values: EditProfileFormSchemaType) => {
      await onSaved(values);
    },
    [onSaved],
  );

  return (
    <EditProfileForm
      formId={formId}
      onSubmit={handleSubmit}
      initialValues={initialValues as EditProfileFormSchemaType}
      hideProfileType
      nameLabel={_(CREATE_ORG_ORGANIZATION_NAME_LABEL)}
      onUpload={onUpload}
    />
  );
};
