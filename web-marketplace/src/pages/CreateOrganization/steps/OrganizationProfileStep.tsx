import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FieldErrors } from 'react-hook-form';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { v4 as uuidv4 } from 'uuid';

import { AccountType } from 'generated/graphql';
import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';

import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_BG,
  DEFAULT_PROFILE_COMPANY_AVATAR,
  DEFAULT_PROFILE_USER_AVATAR,
} from 'pages/Dashboard/Dashboard.constants';
import { useOnUploadCallback } from 'pages/Dashboard/hooks/useOnUploadCallback';
import { EditProfileForm } from 'components/organisms/EditProfileForm/EditProfileForm';
import { EditProfileFormSchemaType } from 'components/organisms/EditProfileForm/EditProfileForm.schema';
import { useMultiStep } from 'components/templates/MultiStepTemplate';

import TransferProfileModal from '../components/TransferProfileModal';
import {
  CREATE_ORG_ORGANIZATION_NAME_LABEL,
  ORGANIZATION_PROFILE_FORM_ID,
} from '../CreateOrganization.constants';
import { hasTransferableProfile } from '../CreateOrganization.utils';
import { useCreateDaos } from '../hooks/useCreateDaos/useCreateDaos';
import type { OrganizationMultiStepData } from '../hooks/useOrganizationFlow';
import type { OrganizationProfileStepProps } from './OrganizationProfileStep.types';

export const OrganizationProfileStep = ({
  initialValues,
  hasUnfinishedOrganization,
  daoAddress,
  setDaoAddress,
  organizationId,
  setOrganizationId,
  onTransferProfile,
  setIsSubmitting,
  setIsValid,
}: OrganizationProfileStepProps) => {
  const { _ } = useLingui();
  const { createDaos } = useCreateDaos();
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
    () => hasTransferableProfile(activeAccount),
    [activeAccount],
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
    setTransferHandled(true);
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
      profileType:
        activeAccount.type === AccountType.Organization
          ? AccountType.Organization
          : undefined,
    };

    onTransferProfile({ nextValues });
    setTransferHandled(true);
    setShowTransferModal(false);
  }, [activeAccount, handleCloseTransferModal, onTransferProfile, _]);

  const handleSubmit = useCallback(
    async (values: EditProfileFormSchemaType) => {
      if (hasUnfinishedOrganization && daoAddress) {
        setTransferHandled(true);
        setShowTransferModal(false);
        const payload: OrganizationMultiStepData = {
          ...values,
          dao: {
            ...(data?.dao ?? {
              daoAddress,
              organizationId,
            }),
            walletAddress,
          },
        };
        handleSaveNext(payload);
        return;
      }

      try {
        const organizationIdValue = organizationId ?? uuidv4();
        setOrganizationId(organizationIdValue);

        const daoResult = await createDaos([
          {
            name: values.name,
            description: values.description,
            profileImage: values.profileImage,
            backgroundImage: values.backgroundImage,
            websiteLink: values.websiteLink,
            twitterLink: values.twitterLink,
            organizationId: organizationIdValue,
            type: 'organization',
          },
        ]);

        setDaoAddress(daoResult[0].daoAddress);
        setOrganizationId(daoResult[0].organizationId);
        setTransferHandled(true);
        setShowTransferModal(false);

        const payload: OrganizationMultiStepData = {
          ...values,
          dao: {
            ...daoResult,
            walletAddress,
          },
        };
        handleSaveNext(payload);
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error(
          _(msg`Something went wrong while creating the organization.`),
        );
      }
    },
    [
      hasUnfinishedOrganization,
      daoAddress,
      organizationId,
      setDaoAddress,
      setOrganizationId,
      data,
      handleSaveNext,
      createDaos,
      walletAddress,
      _,
    ],
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
        onSubmit={handleSubmit}
        initialValues={initialValues as EditProfileFormSchemaType}
        hideProfileType
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
