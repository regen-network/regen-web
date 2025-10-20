import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { FieldErrors } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { AccountType } from 'generated/graphql';

import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_BG,
  DEFAULT_PROFILE_COMPANY_AVATAR,
  DEFAULT_PROFILE_USER_AVATAR,
} from 'pages/Dashboard/Dashboard.constants';
import { useOnUploadCallback } from 'pages/Dashboard/hooks/useOnUploadCallback';
import { EditProfileForm } from 'components/organisms/EditProfileForm/EditProfileForm';
import { EditProfileFormSchemaType } from 'components/organisms/EditProfileForm/EditProfileForm.schema';

import TransferProfileModal from '../components/TransferProfileModal';
import {
  CREATE_ORG_ACTIVE_ACCOUNT_REQUIRED_ERROR,
  CREATE_ORG_ORGANIZATION_NAME_LABEL,
} from '../CreateOrganization.constants';
import { hasTransferableProfile } from '../CreateOrganization.utils';
import { useCreateDao } from '../hooks/useCreateDao/useCreateDao';
import type { OrganizationMultiStepData } from '../hooks/useOrganizationFlow';
import type { OrganizationProfileStepProps } from './OrganizationProfileStep.types';

export const OrganizationProfileStep: React.FC<OrganizationProfileStepProps> =
  ({
    formId,
    initialValues,
    activeAccountId,
    activeAccount,
    hasUnfinishedOrganization,
    daoAddress,
    setDaoAddress,
    organizationId,
    setOrganizationId,
    onTransferProfile,
    data,
    handleSaveNext,
    onValidityChange,
  }) => {
    const { _ } = useLingui();
    const { createDao } = useCreateDao();
    const fileNamesToDeleteRef = useRef<string[]>([]);
    const onUpload = useOnUploadCallback({
      fileNamesToDeleteRef,
    });

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
            dao: data?.dao ?? {
              daoAddress,
              organizationId,
            },
          };
          handleSaveNext(payload);
          return;
        }

        try {
          if (!activeAccountId) {
            throw new Error(_(CREATE_ORG_ACTIVE_ACCOUNT_REQUIRED_ERROR));
          }

          const organizationIdValue = organizationId ?? uuidv4();
          setOrganizationId(organizationIdValue);

          const daoResult = await createDao({
            name: values.name,
            description: values.description,
            profileImage: values.profileImage,
            backgroundImage: values.backgroundImage,
            websiteLink: values.websiteLink,
            twitterLink: values.twitterLink,
            organizationId: organizationIdValue,
            currentAccountId: activeAccountId,
          });

          setDaoAddress(daoResult.daoAddress);
          setOrganizationId(daoResult.organizationId);
          setTransferHandled(true);
          setShowTransferModal(false);

          const payload: OrganizationMultiStepData = {
            ...values,
            dao: daoResult,
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
        activeAccountId,
        createDao,
        _,
      ],
    );

    const handleFormStateChange = useCallback(
      ({
        values,
        errors,
      }: {
        isValid: boolean;
        isDirty: boolean;
        isSubmitting: boolean;
        values: EditProfileFormSchemaType;
        errors: FieldErrors<EditProfileFormSchemaType>;
      }) => {
        const hasName = values.name?.trim().length > 0;
        const hasErrors = Object.keys(errors).length > 0;
        onValidityChange?.(hasName && !hasErrors);
      },
      [onValidityChange],
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
          formId={formId}
          onSubmit={handleSubmit}
          initialValues={initialValues as EditProfileFormSchemaType}
          hideProfileType
          nameLabel={_(CREATE_ORG_ORGANIZATION_NAME_LABEL)}
          onUpload={onUpload}
          prefillValues={initialValues as EditProfileFormSchemaType}
          onFormStateChange={handleFormStateChange}
          validationMode="onChange"
        />
      </>
    );
  };
