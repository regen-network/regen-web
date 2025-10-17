import { useCallback, useEffect, useMemo, useState } from 'react';

import { CREATE_ORG_FORM_ID } from '../CreateOrganization.constants';
import type { OrgProgressMap } from 'lib/storage/organizationProgress.storage';
import {
  removeOrganizationProgress,
  setOrganizationProgressStep,
} from 'lib/storage/organizationProgress.storage';
import {
  DEFAULT_PROFILE_BG,
  DEFAULT_PROFILE_COMPANY_AVATAR,
} from 'pages/Dashboard/Dashboard.constants';
import { AccountType } from 'generated/graphql';
import type { EditProfileFormSchemaType } from 'components/organisms/EditProfileForm/EditProfileForm.schema';

export type OrganizationMultiStepData = Partial<EditProfileFormSchemaType> & {
  dao?: {
    daoAddress?: string;
    organizationId?: string;
  };
};

type UseOrganizationFlowParams = {
  activeStep: number;
  isLastStep: boolean;
  isCreating: boolean;
  organizationProgress: OrgProgressMap;
  maxAllowedStep: number;
  data: OrganizationMultiStepData | undefined;
  handleActiveStep: (step: number) => void;
  handleBack: () => void;
  handleSaveNext: (payload: OrganizationMultiStepData) => void;
  resumeStep: number;
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
  isCreating,
  organizationProgress,
  maxAllowedStep,
  data,
  handleActiveStep,
  handleBack,
  handleSaveNext,
  resumeStep,
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

  const formData = useMemo(
    () => data as Partial<EditProfileFormSchemaType> | undefined,
    [data],
  );

  useEffect(() => {
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
      const existingStep = organizationProgress[storedDaoAddress] ?? 0;
      const nextStep = Math.max(maxAllowedStep, 1);
      if (existingStep !== nextStep) {
        setOrganizationProgressStep(storedDaoAddress, nextStep);
      }
      setHasUnfinishedOrganization(true);
    }
  }, [data, organizationProgress, maxAllowedStep]);

  useEffect(() => {
    const entries = Object.keys(organizationProgress);
    if (entries.length > 0) {
      setDaoAddress(entries[0]);
      setHasUnfinishedOrganization(true);
    } else {
      setDaoAddress(undefined);
      setHasUnfinishedOrganization(false);
    }
  }, [organizationProgress]);

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
    if (hasUnfinishedOrganization && daoAddress) {
      const previousStep = Math.max(activeStep - 1, 1);
      setOrganizationProgressStep(daoAddress, previousStep);
    }
    handleBack();
  }, [activeStep, daoAddress, handleBack, hasUnfinishedOrganization]);

  const handleNextClick = useCallback(() => {
    if (isCreating) return;

    if (activeStep === 0) {
      const form = document.getElementById(CREATE_ORG_FORM_ID) as
        | HTMLFormElement
        | undefined;

      if (!form) return;

      const isValid = form.checkValidity();
      if (!isValid) {
        form.reportValidity?.();
        return;
      }

      form.requestSubmit?.() ??
        form.dispatchEvent(
          new Event('submit', { bubbles: true, cancelable: true }),
        );
      return;
    }

    if (hasUnfinishedOrganization && daoAddress) {
      if (isLastStep) {
        removeOrganizationProgress(daoAddress);
        setDaoAddress(undefined);
        setOrganizationId(undefined);
        setHasUnfinishedOrganization(false);
      } else {
        const nextStep = Math.max(activeStep + 1, 1);
        setOrganizationProgressStep(daoAddress, nextStep);
      }
    }

    handleSaveNext({});
  }, [
    activeStep,
    daoAddress,
    handleSaveNext,
    hasUnfinishedOrganization,
    isCreating,
    isLastStep,
  ]);

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
