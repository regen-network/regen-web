import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AccountType } from 'generated/graphql';

import {
  DEFAULT_PROFILE_BG,
  DEFAULT_PROFILE_COMPANY_AVATAR,
} from 'pages/Dashboard/Dashboard.constants';
import type { EditProfileFormSchemaType } from 'components/organisms/EditProfileForm/EditProfileForm.schema';

import { INVITE_MEMBERS_FORM_ID } from '../CreateOrganization.constants';
import { getCreateOrgSteps } from '../CreateOrganization.utils';

export type OrganizationMultiStepData = Partial<EditProfileFormSchemaType> & {
  dao?: {
    daoAddress?: string;
    organizationId?: string;
    walletAddress?: string;
  };
};

type UseOrganizationFlowParams = {
  activeStep: number;
  data: OrganizationMultiStepData | undefined;
  handleActiveStep: (step: number) => void;
  handleResetData: () => void;
  resumeStep: number;
  walletAddress?: string;
  steps: ReturnType<typeof getCreateOrgSteps>;
};

type ApplyTransferPayload = {
  nextValues: Partial<EditProfileFormSchemaType>;
};

const mapInitialValues = (
  formData: OrganizationMultiStepData | undefined,
): Partial<EditProfileFormSchemaType> => {
  if (!formData) return {};

  const fields: Array<keyof EditProfileFormSchemaType> = [
    'name',
    'description',
    'profileImage',
    'backgroundImage',
    'websiteLink',
    'twitterLink',
  ];

  const nextValues: Partial<EditProfileFormSchemaType> = {};

  fields.forEach(field => {
    const value = formData[field];
    if (field === 'profileType') {
      if (value === AccountType.Organization || value === AccountType.User) {
        nextValues[field] = value;
      }
    } else if (typeof value === 'string' && value.trim().length > 0) {
      nextValues[field] = value;
    }
  });

  return nextValues;
};

export const useOrganizationFlow = ({
  activeStep,
  data,
  handleActiveStep,
  handleResetData,
  resumeStep,
  walletAddress,
  steps,
}: UseOrganizationFlowParams) => {
  const [hasUnfinishedOrganization, setHasUnfinishedOrganization] =
    useState(false);
  const [orgProfileInitialValues, setOrgProfileInitialValues] = useState<
    Partial<EditProfileFormSchemaType>
  >({
    profileImage: DEFAULT_PROFILE_COMPANY_AVATAR,
    backgroundImage: DEFAULT_PROFILE_BG,
    profileType: AccountType.Organization,
  });
  const [orgProfileInitialValuesVersion, setOrgProfileInitialValuesVersion] =
    useState(0);
  const [sendRegenModalOpen, setSendRegenModalOpen] = useState(false);
  const navigate = useNavigate();

  const storedWalletAddress = (data as Record<string, any>)?.dao
    ?.walletAddress as string | undefined;
  const matchesStoredWallet =
    storedWalletAddress !== undefined && walletAddress !== undefined
      ? storedWalletAddress === walletAddress
      : false;

  const formData = useMemo(
    () =>
      matchesStoredWallet
        ? (data as Partial<EditProfileFormSchemaType> | undefined)
        : undefined,
    [data, matchesStoredWallet],
  );

  useEffect(() => {
    if (!matchesStoredWallet) {
      setHasUnfinishedOrganization(false);
      return;
    }

    const storedDaoAddress = data?.dao?.daoAddress;
    if (storedDaoAddress) {
      setHasUnfinishedOrganization(true);
    } else {
      setHasUnfinishedOrganization(false);
    }
  }, [data, matchesStoredWallet]);

  useEffect(() => {
    const mappedValues = mapInitialValues(formData);
    if (Object.keys(mappedValues).length > 0) {
      setOrgProfileInitialValues(prev => ({ ...prev, ...mappedValues }));
      setOrgProfileInitialValuesVersion(version => version + 1);
    }
  }, [formData]);

  useEffect(() => {
    if (resumeStep > 0 && activeStep === 0) {
      handleActiveStep(resumeStep);
    }
  }, [resumeStep, activeStep, handleActiveStep]);

  const handleNextClick = useCallback(async () => {
    const formId = steps[activeStep].id;

    // Nothing to submit on invite members step (last step)
    // We display a modal to send REGEN to the org DAO address
    if (formId === INVITE_MEMBERS_FORM_ID) {
      setSendRegenModalOpen(true);
      return;
    }
    const form = document.getElementById(formId) as HTMLFormElement | undefined;

    if (!form) return;

    const isValid = form.checkValidity();
    if (!isValid) {
      form.reportValidity?.();
      return;
    }

    if (typeof form.requestSubmit === 'function') {
      form.requestSubmit();
    } else {
      form.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true }),
      );
    }
  }, [activeStep, steps, setSendRegenModalOpen]);

  const completeCreation = useCallback(() => {
    handleResetData();
    setHasUnfinishedOrganization(false);
    navigate(`/profiles/${data?.dao?.daoAddress}`, {
      state: { showOrgPopup: true },
    });
  }, [handleResetData, navigate, data]);

  const handleApplyTransferProfile = useCallback(
    ({ nextValues }: ApplyTransferPayload) => {
      setOrgProfileInitialValues(prev => ({ ...prev, ...nextValues }));
      setOrgProfileInitialValuesVersion(version => version + 1);
    },
    [],
  );

  return {
    hasUnfinishedOrganization,
    orgProfileInitialValues,
    orgProfileInitialValuesVersion,
    resumeStep,
    handleNextClick,
    handleApplyTransferProfile,
    sendRegenModalOpen,
    setSendRegenModalOpen,
    completeCreation,
  };
};
