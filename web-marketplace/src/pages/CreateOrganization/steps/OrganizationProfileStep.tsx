import React, { useCallback } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { EditProfileForm } from 'components/organisms/EditProfileForm/EditProfileForm';
import { EditProfileFormSchemaType } from 'components/organisms/EditProfileForm/EditProfileForm.schema';

type Props = {
  formId: string;
  initialValues: Partial<EditProfileFormSchemaType>;
  onSaved: (values: EditProfileFormSchemaType) => void;
};

export const OrganizationProfileStep: React.FC<Props> = ({
  formId,
  initialValues,
  onSaved,
}) => {
  const { _ } = useLingui();

  const handleSubmit = useCallback(
    async (values: EditProfileFormSchemaType) => {
      onSaved(values);
    },
    [onSaved],
  );

  return (
    <EditProfileForm
      formId={formId}
      onSubmit={handleSubmit}
      initialValues={initialValues as EditProfileFormSchemaType}
      hideProfileType
      nameLabel={_(msg`Organization Name`)}
    />
  );
};
