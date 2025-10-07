import React, { useCallback, useRef } from 'react';
import { useLingui } from '@lingui/react';
import { v4 as uuidv4 } from 'uuid';

import { setOrganizationProgressStep } from 'lib/storage/organizationProgress.storage';

import { useOnUploadCallback } from 'pages/Dashboard/hooks/useOnUploadCallback';
import { EditProfileForm } from 'components/organisms/EditProfileForm/EditProfileForm';
import { EditProfileFormSchemaType } from 'components/organisms/EditProfileForm/EditProfileForm.schema';

import {
  CREATE_ORG_ACTIVE_ACCOUNT_REQUIRED_ERROR,
  CREATE_ORG_ORGANIZATION_NAME_LABEL,
} from '../CreateOrganization.constants';
import { useCreateDao } from '../hooks/useCreateDao/useCreateDao';

type Props = {
  formId: string;
  initialValues: Partial<EditProfileFormSchemaType>;
  activeAccountId?: string;
  hasUnfinishedOrganization: boolean;
  daoAddressRef: React.MutableRefObject<string | undefined>;
  organizationIdRef: React.MutableRefObject<string | undefined>;
  organizationNameRef: React.MutableRefObject<string | undefined>;
  data: Record<string, unknown>;
  handleSaveNext: (payload: Record<string, unknown>) => void;
  _t: (id: any) => string; // lingui _ passthrough for error messages
};

export const OrganizationProfileStep: React.FC<Props> = ({
  formId,
  initialValues,
  activeAccountId,
  hasUnfinishedOrganization,
  daoAddressRef,
  organizationIdRef,
  organizationNameRef,
  data,
  handleSaveNext,
  _t,
}) => {
  const { _ } = useLingui();
  const { createDao } = useCreateDao();
  const fileNamesToDeleteRef = useRef<string[]>([]);
  const onUpload = useOnUploadCallback({
    fileNamesToDeleteRef,
  });

  const handleSubmit = useCallback(
    async (values: EditProfileFormSchemaType) => {
      if (hasUnfinishedOrganization && daoAddressRef.current) {
        organizationNameRef.current = values.name;
        setOrganizationProgressStep(daoAddressRef.current, 1);
        const payload: Record<string, unknown> = {
          ...values,
          dao: (data as Record<string, unknown>)?.dao ?? {
            daoAddress: daoAddressRef.current,
            organizationId: organizationIdRef.current,
          },
        };
        handleSaveNext(payload);
        return;
      }

      if (!activeAccountId) {
        throw new Error(_(CREATE_ORG_ACTIVE_ACCOUNT_REQUIRED_ERROR));
      }
      const organizationId = organizationIdRef.current ?? uuidv4();
      organizationIdRef.current = organizationId;

      const daoResult = await createDao({
        name: values.name,
        description: values.description,
        profileImage: values.profileImage,
        backgroundImage: values.backgroundImage,
        websiteLink: values.websiteLink,
        twitterLink: values.twitterLink,
        organizationId,
        currentAccountId: activeAccountId,
      });

      daoAddressRef.current = daoResult.daoAddress;
      organizationIdRef.current = daoResult.organizationId;
      organizationNameRef.current = values.name;
      setOrganizationProgressStep(daoResult.daoAddress, 1);

      const payload: Record<string, unknown> = { ...values, dao: daoResult };
      handleSaveNext(payload);
    },
    [
      hasUnfinishedOrganization,
      daoAddressRef,
      organizationIdRef,
      data,
      handleSaveNext,
      activeAccountId,
      createDao,
      organizationNameRef,
      _,
    ],
  );

  return (
    <EditProfileForm
      formId={formId}
      onSubmit={handleSubmit}
      initialValues={initialValues as EditProfileFormSchemaType}
      hideProfileType
      nameLabel={_(CREATE_ORG_ORGANIZATION_NAME_LABEL)}
      onUpload={onUpload}
      prefillValues={initialValues as EditProfileFormSchemaType}
    />
  );
};
