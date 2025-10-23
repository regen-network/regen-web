import { useCallback, useEffect, useMemo, useState } from 'react';

import { AccountType } from 'generated/graphql';

import {
  DEFAULT_PROFILE_BG,
  DEFAULT_PROFILE_COMPANY_AVATAR,
} from 'pages/Dashboard/Dashboard.constants';
import type { EditProfileFormSchemaType } from 'components/organisms/EditProfileForm/EditProfileForm.schema';

import { getCreateOrgSteps } from '../CreateOrganization.utils';
import { MultiStepFormApi } from '../CreateOrganization.types';

export type OrganizationMultiStepData = Partial<EditProfileFormSchemaType> & {
  dao?: {
    daoAddress?: string;
    organizationId?: string;
    walletAddress?: string;
  };
};

type UseOrganizationFlowParams = {
  activeStep: number;
  isLastStep: boolean;
  data: OrganizationMultiStepData | undefined;
  handleActiveStep: (step: number) => void;
  handleBack: () => void;
  handleSaveNext: (payload: OrganizationMultiStepData) => void;
  handleResetData: () => void;
  resumeStep: number;
  walletAddress?: string;
  activeRef: React.RefObject<MultiStepFormApi>;
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
  isLastStep,
  data,
  handleActiveStep,
  handleBack,
  handleSaveNext,
  handleResetData,
  resumeStep,
  walletAddress,
  activeRef,
}: UseOrganizationFlowParams) => {
  const [daoAddress, setDaoAddress] = useState<string | undefined>(undefined);
  const [organizationId, setOrganizationId] = useState<string | undefined>(
    undefined,
  );
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
      setDaoAddress(undefined);
      setOrganizationId(undefined);
      return;
    }

    const storedDaoAddress = (data as Record<string, any>)?.dao?.daoAddress as
      | string
      | undefined;
    const storedOrganizationId = (data as Record<string, any>)?.dao
      ?.organizationId as string | undefined;

    if (storedDaoAddress) {
      setDaoAddress(storedDaoAddress);
      if (storedOrganizationId) {
        setOrganizationId(storedOrganizationId);
      }
      setHasUnfinishedOrganization(true);
      return;
    }

    setHasUnfinishedOrganization(false);
    setDaoAddress(undefined);
    setOrganizationId(undefined);
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

  const handlePrevClick = useCallback(() => {
    if (activeStep === 0) return;
    handleBack();
  }, [activeStep, handleBack]);

  const handleNextClick = useCallback(async () => {
    const step = activeRef.current;
    if (!step) return;

    if (!step.isValid || step.isSubmitting) return;

    const ok = await step.trigger();
    if (!ok) return;

    // run submit logic for that step
    await step.submit();

    if (hasUnfinishedOrganization && daoAddress && isLastStep) {
      handleResetData();
      setDaoAddress(undefined);
      setOrganizationId(undefined);
      setHasUnfinishedOrganization(false);
    }
  }, [daoAddress, handleResetData, hasUnfinishedOrganization, isLastStep]);

  const handleApplyTransferProfile = useCallback(
    ({ nextValues }: ApplyTransferPayload) => {
      setOrgProfileInitialValues(prev => ({ ...prev, ...nextValues }));
      setOrgProfileInitialValuesVersion(version => version + 1);
    },
    [],
  );

  return {
    daoAddress,
    setDaoAddress,
    organizationId,
    setOrganizationId,
    hasUnfinishedOrganization,
    orgProfileInitialValues,
    orgProfileInitialValuesVersion,
    resumeStep,
    handlePrevClick,
    handleNextClick,
    handleApplyTransferProfile,
  };
};
