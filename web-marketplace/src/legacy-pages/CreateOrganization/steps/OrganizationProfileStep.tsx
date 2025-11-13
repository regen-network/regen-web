import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useQueryClient } from '@tanstack/react-query';
import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_BG,
  DEFAULT_PROFILE_COMPANY_AVATAR,
  DEFAULT_PROFILE_USER_AVATAR,
} from 'legacy-pages/Dashboard/Dashboard.constants';
import { useOnUploadCallback } from 'legacy-pages/Dashboard/hooks/useOnUploadCallback';
import { v4 as uuidv4 } from 'uuid';

import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';

import { EditProfileForm } from 'components/organisms/EditProfileForm/EditProfileForm';
import { EditProfileFormSchemaType } from 'components/organisms/EditProfileForm/EditProfileForm.schema';
import { useMultiStep } from 'components/templates/MultiStepTemplate';

import TransferProfileModal from '../components/TransferProfileModal';
import {
  CREATE_ORG_ORGANIZATION_NAME_LABEL,
  ORGANIZATION_PROFILE_FORM_ID,
} from '../CreateOrganization.constants';
import { hasTransferableProfile } from '../CreateOrganization.utils';
import { useCreateDao } from '../hooks/useCreateDao/useCreateDao';
import type { OrganizationMultiStepData } from '../hooks/useOrganizationFlow';
import type { OrganizationProfileStepProps } from './OrganizationProfileStep.types';

export const OrganizationProfileStep = ({
  initialValues,
  hasUnfinishedOrganization,
  onTransferProfile,
  setIsSubmitting,
  setIsValid,
  formRef,
  hasProjects,
}: OrganizationProfileStepProps) => {
  const { _ } = useLingui();
  const { createDao } = useCreateDao();
  const { wallet } = useWallet();
  const { activeAccount } = useAuth();
  const walletAddress = wallet?.address;
  const fileNamesToDeleteRef = useRef<string[]>([]);
  const onUpload = useOnUploadCallback({
    fileNamesToDeleteRef,
  });
  const { handleSaveNext, data } = useMultiStep<OrganizationMultiStepData>();

  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferHandled, setTransferHandled] = useState(
    hasUnfinishedOrganization || Boolean(initialValues?.name?.trim()),
  );

  const canOfferTransfer = useMemo(
    () => hasTransferableProfile(hasProjects, activeAccount),
    [activeAccount, hasProjects],
  );

  useEffect(() => {
    if (hasUnfinishedOrganization) {
      setTransferHandled(true);
      setShowTransferModal(false);
      return;
    }

    if (!canOfferTransfer) {
      setShowTransferModal(false);
      return;
    }

    if (!transferHandled) {
      setShowTransferModal(true);
    }
  }, [canOfferTransfer, hasUnfinishedOrganization, transferHandled]);

  useEffect(() => {
    if (initialValues?.name && initialValues.name.trim().length > 0) {
      setTransferHandled(true);
      setShowTransferModal(false);
    }
  }, [initialValues?.name]);

  const handleCloseTransferModal = useCallback(() => {
    setShowTransferModal(false);
  }, []);

  const handleTransferProfile = useCallback(() => {
    if (!activeAccount) {
      handleCloseTransferModal();
      return;
    }

    const fallbackName = activeAccount.name?.trim() || _(DEFAULT_NAME);
    const nextValues: Partial<EditProfileFormSchemaType> = {
      name: fallbackName,
      description: activeAccount.description?.trim() ?? '',
      profileImage: activeAccount.image || DEFAULT_PROFILE_COMPANY_AVATAR,
      backgroundImage: activeAccount.bgImage || DEFAULT_PROFILE_BG,
      websiteLink: activeAccount.websiteLink?.trim() ?? '',
      twitterLink: activeAccount.twitterLink?.trim() ?? '',
    };

    onTransferProfile({ nextValues });
    setTransferHandled(true);
    setShowTransferModal(false);
  }, [activeAccount, handleCloseTransferModal, onTransferProfile, _]);

  const handleSubmit = useCallback(
    async (values: EditProfileFormSchemaType) => {
      try {
        const organizationIdValue = uuidv4();

        // Check if images are still default values, and if so, use empty strings
        const profileImageToSave =
          values.profileImage === DEFAULT_PROFILE_COMPANY_AVATAR
            ? null
            : values.profileImage;

        const backgroundImageToSave =
          values.backgroundImage === DEFAULT_PROFILE_BG
            ? null
            : values.backgroundImage;

        const daoResult = await createDao({
          name: values.name,
          description: values.description,
          profileImage: profileImageToSave,
          backgroundImage: backgroundImageToSave,
          websiteLink: values.websiteLink,
          twitterLink: values.twitterLink,
          organizationId: organizationIdValue,
          type: 'organization',
          transferHandled,
        });
        if (daoResult) {
          setShowTransferModal(false);

          const payload: OrganizationMultiStepData = {
            ...(data ?? {}),
            ...values,
            dao: {
              ...daoResult,
              walletAddress,
            },
          };
          handleSaveNext(payload);
        }
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error(
          _(msg`Something went wrong while creating the organization.`),
        );
      }
    },
    [data, handleSaveNext, createDao, walletAddress, _, transferHandled],
  );

  return (
    <>
      <TransferProfileModal
        open={showTransferModal}
        onSkip={handleCloseTransferModal}
        onTransfer={handleTransferProfile}
        name={activeAccount?.name?.trim() || _(DEFAULT_NAME)}
        avatar={activeAccount?.image || DEFAULT_PROFILE_USER_AVATAR}
      />
      <EditProfileForm
        formId={ORGANIZATION_PROFILE_FORM_ID}
        formRef={formRef}
        onSubmit={handleSubmit}
        initialValues={initialValues as EditProfileFormSchemaType}
        nameLabel={_(CREATE_ORG_ORGANIZATION_NAME_LABEL)}
        onUpload={onUpload}
        prefillValues={initialValues as EditProfileFormSchemaType}
        validationMode="onChange"
        setIsSubmitting={setIsSubmitting}
        setIsValid={setIsValid}
      />
    </>
  );
};
