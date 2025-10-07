import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { useSetAtom } from 'jotai';

import SaveFooter from 'web-components/src/components/fixed-footer/SaveFooter';
import { SadBeeModal } from 'web-components/src/components/modal/SadBeeModal/SadBeeModal';
import { CancelButtonFooter } from 'web-components/src/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Title as H } from 'web-components/src/components/typography';

import type { AccountByIdQuery } from 'generated/graphql';
import { AccountType } from 'generated/graphql';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { useAuth } from 'lib/auth/auth';
import { SAVE_TEXT } from 'lib/constants/shared.constants';
import {
  getAllOrganizationProgress,
  OrgProgressMap,
  removeOrganizationProgress,
  setOrganizationProgressStep,
  useOrganizationProgress,
} from 'lib/storage/organizationProgress.storage';

import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_BG,
  DEFAULT_PROFILE_COMPANY_AVATAR,
  DEFAULT_PROFILE_USER_AVATAR,
} from 'pages/Dashboard/Dashboard.constants';
import { EditProfileFormSchemaType } from 'components/organisms/EditProfileForm/EditProfileForm.schema';

import {
  MultiStepTemplate,
  useMultiStep,
} from '../../components/templates/MultiStepTemplate';
import TransferProfileModal from './components/TransferProfileModal';
import {
  CREATE_ORG_ALREADY_IN_ORG_MESSAGE,
  CREATE_ORG_CANCEL_LABEL,
  CREATE_ORG_CLOSE_ARIA_LABEL,
  CREATE_ORG_CONFIRM_DISCARD_LABEL,
  // CREATE_ORG_DEFAULT_USER removed
  CREATE_ORG_DISCARD_DESCRIPTION,
  CREATE_ORG_DISCARD_TITLE,
  CREATE_ORG_FINISH_LABEL,
  CREATE_ORG_FORM_ID,
  CREATE_ORG_INITIAL_VALUES,
  CREATE_ORG_STEPS,
} from './CreateOrganization.constants';
import { useCreateDao } from './hooks/useCreateDao/useCreateDao';
import { InviteMembersStep } from './steps/InviteMembersStep';
import { MigrateProjectsStep } from './steps/MigrateProjectsStep';
import { OrganizationProfileStep } from './steps/OrganizationProfileStep';
import { PersonalInfoStep } from './steps/PersonalInfoStep';

type AccountAssignmentNode = {
  roleName?: string | null;
  visible?: boolean | null;
  daoByDaoAddress?: {
    address?: string | null;
    organizationByDaoAddress?: {
      name?: string | null;
    } | null;
  } | null;
};

const getVisibleOrganizationAssignments = (
  account?: AccountByIdQuery['accountById'],
): AccountAssignmentNode[] => {
  if (!account || !('assignmentsByAccountId' in account)) return [];
  const nodes = (
    (
      account as {
        assignmentsByAccountId?: {
          nodes?: Array<AccountAssignmentNode | null>;
        };
      }
    ).assignmentsByAccountId?.nodes ?? []
  ).filter(Boolean) as AccountAssignmentNode[];

  return nodes.filter(
    assignment =>
      assignment.visible &&
      assignment.daoByDaoAddress?.organizationByDaoAddress?.name,
  );
};

type CreateOrganizationContentProps = {
  organizationProgress: OrgProgressMap; // map daoAddress -> step
};

function CreateOrganizationContent({
  organizationProgress,
}: CreateOrganizationContentProps): JSX.Element {
  const { _ } = useLingui();
  const {
    handleBack,
    handleActiveStep,
    activeStep,
    percentComplete,
    handleSaveNext,
    isLastStep,
    // handleSave removed (unused after refactor)
    maxAllowedStep,
    data,
  } = useMultiStep<Record<string, unknown>>();
  const { activeAccount } = useAuth();
  const { isCreating } = useCreateDao();
  const daoAddressRef = useRef<string | undefined>(undefined);
  const organizationIdRef = useRef<string | undefined>(undefined);
  const organizationNameRef = useRef<string | undefined>(undefined);
  const [hasUnfinishedOrganization, setHasUnfinishedOrganization] =
    useState(false);

  // Step 0 form validity tracking
  const [isOrgProfileValid, setIsOrgProfileValid] = useState(false);
  const [orgProfileInitialValues, setOrgProfileInitialValues] = useState<
    Partial<EditProfileFormSchemaType>
  >({
    profileImage: DEFAULT_PROFILE_COMPANY_AVATAR,
    backgroundImage: DEFAULT_PROFILE_BG,
    profileType: AccountType.Organization,
  });
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferHandled, setTransferHandled] = useState(false);

  // Removed displayName and avatarUrl (not needed until future prefill reintroduction)

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
    const storedName = (data as Record<string, any>)?.name as
      | string
      | undefined;

    if (storedDaoAddress) {
      daoAddressRef.current = storedDaoAddress;
      organizationIdRef.current =
        storedOrganizationId ?? organizationIdRef.current;
      organizationNameRef.current = storedName ?? organizationNameRef.current;
      const existingStep = organizationProgress[storedDaoAddress] ?? 0;
      const nextStep = Math.max(maxAllowedStep, 1);
      if (existingStep !== nextStep) {
        setOrganizationProgressStep(storedDaoAddress, nextStep);
      }
      setHasUnfinishedOrganization(true);
      setTransferHandled(true);
    }
  }, [data, organizationProgress, maxAllowedStep]);

  useEffect(() => {
    const entries = Object.keys(organizationProgress);
    if (entries.length > 0) {
      const daoAddress = entries[0];
      daoAddressRef.current = daoAddress;
      setHasUnfinishedOrganization(true);
    } else {
      daoAddressRef.current = undefined;
      setHasUnfinishedOrganization(false);
    }
  }, [organizationProgress]);

  useEffect(() => {
    if (!formData) return;
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
    if (Object.keys(nextValues).length > 0) {
      setOrgProfileInitialValues(prev => ({ ...prev, ...nextValues }));
      if (typeof formData.name === 'string' && formData.name.trim().length) {
        organizationNameRef.current = formData.name.trim();
      }
      setShowTransferModal(false);
      setTransferHandled(true);
    }
  }, [formData]);

  const currentProgress = useMemo<number | undefined>(
    () => Object.values(organizationProgress)[0],
    [organizationProgress],
  );
  const canOfferTransfer = useMemo(() => {
    if (!activeAccount) return false;
    if (activeAccount.type !== 'ORGANIZATION') return false;
    return Boolean(
      activeAccount.name?.trim() ||
        activeAccount.description?.trim() ||
        activeAccount.image?.trim() ||
        activeAccount.bgImage?.trim() ||
        activeAccount.websiteLink?.trim() ||
        activeAccount.twitterLink?.trim(),
    );
  }, [activeAccount]);
  const resumeStep = useMemo(() => {
    if (typeof currentProgress !== 'number') return 0;
    return Math.min(currentProgress, CREATE_ORG_STEPS.length - 1);
  }, [currentProgress]);

  useEffect(() => {
    if (activeStep !== 0) {
      if (showTransferModal) setShowTransferModal(false);
      return;
    }

    if (!transferHandled && !hasUnfinishedOrganization && canOfferTransfer) {
      setShowTransferModal(true);
    }
  }, [
    activeStep,
    transferHandled,
    hasUnfinishedOrganization,
    showTransferModal,
    canOfferTransfer,
  ]);

  useEffect(() => {
    if (resumeStep > 0 && activeStep === 0) {
      handleActiveStep(resumeStep);
    }
  }, [resumeStep, activeStep, handleActiveStep]);

  const handleSkipTransfer = useCallback(() => {
    setShowTransferModal(false);
    setTransferHandled(true);
  }, []);

  const handleTransferProfile = useCallback(() => {
    if (!activeAccount) {
      setShowTransferModal(false);
      setTransferHandled(true);
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
      profileType: AccountType.Organization,
    };
    organizationNameRef.current = fallbackName;
    setOrgProfileInitialValues(prev => ({ ...prev, ...nextValues }));
    setShowTransferModal(false);
    setTransferHandled(true);
  }, [activeAccount, _, organizationNameRef]);

  const handlePrevClick = useCallback(() => {
    if (activeStep === 0) return;
    if (hasUnfinishedOrganization && daoAddressRef.current) {
      const previousStep = Math.max(activeStep - 1, 1);
      setOrganizationProgressStep(daoAddressRef.current, previousStep);
    }
    handleBack();
  }, [activeStep, handleBack, hasUnfinishedOrganization]);

  const handleNextClick = useCallback(() => {
    if (isCreating) return;
    if (activeStep === 0 && !isOrgProfileValid) return; // guard if somehow triggered

    if (activeStep === 0) {
      const form = document.getElementById(CREATE_ORG_FORM_ID) as
        | HTMLFormElement
        | undefined;

      if (!form) return;

      if (typeof form.requestSubmit === 'function') {
        form.requestSubmit();
      } else {
        form.dispatchEvent(
          new Event('submit', { bubbles: true, cancelable: true }),
        );
      }
      return;
    }

    if (hasUnfinishedOrganization && daoAddressRef.current) {
      if (isLastStep) {
        removeOrganizationProgress(daoAddressRef.current);
        daoAddressRef.current = undefined;
        organizationNameRef.current = undefined;
        setHasUnfinishedOrganization(false);
      } else {
        const nextStep = Math.max(activeStep + 1, 1);
        setOrganizationProgressStep(daoAddressRef.current, nextStep);
      }
    }

    handleSaveNext({});
  }, [
    activeStep,
    handleSaveNext,
    hasUnfinishedOrganization,
    isCreating,
    isLastStep,
    isOrgProfileValid,
  ]);

  useEffect(() => {
    if (activeStep !== 0) return;
    const form = document.getElementById(
      CREATE_ORG_FORM_ID,
    ) as HTMLFormElement | null;
    if (!form) return;
    const check = () => setIsOrgProfileValid(form.checkValidity());
    check();
    form.addEventListener('input', check);
    form.addEventListener('change', check);
    return () => {
      form.removeEventListener('input', check);
      form.removeEventListener('change', check);
    };
  }, [activeStep]);

  return (
    <>
      <TransferProfileModal
        open={showTransferModal && !!activeAccount}
        onSkip={handleSkipTransfer}
        onTransfer={handleTransferProfile}
        name={activeAccount?.name?.trim() || _(DEFAULT_NAME)}
        avatar={activeAccount?.image || DEFAULT_PROFILE_USER_AVATAR}
      />
      {activeStep === 0 && (
        <OrganizationProfileStep
          formId={CREATE_ORG_FORM_ID}
          key={JSON.stringify(orgProfileInitialValues)}
          initialValues={orgProfileInitialValues}
          activeAccountId={activeAccount?.id}
          hasUnfinishedOrganization={hasUnfinishedOrganization}
          daoAddressRef={daoAddressRef}
          organizationIdRef={organizationIdRef}
          organizationNameRef={organizationNameRef}
          data={data as Record<string, unknown>}
          handleSaveNext={handleSaveNext as any}
          _t={_}
        />
      )}
      {activeStep === 1 && <MigrateProjectsStep />}
      {activeStep === 2 && <PersonalInfoStep />}
      {activeStep === 3 && <InviteMembersStep />}
      <SaveFooter
        onPrev={activeStep > 0 ? handlePrevClick : undefined}
        onSave={handleNextClick}
        saveText={isLastStep ? _(CREATE_ORG_FINISH_LABEL) : _(SAVE_TEXT)}
        saveDisabled={isCreating || (activeStep === 0 && !isOrgProfileValid)}
        percentComplete={percentComplete}
      />
    </>
  );
}

export default function CreateOrganizationPage(): JSX.Element {
  const navigate = useNavigate();
  const { _ } = useLingui();
  const { activeAccount } = useAuth();
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);
  const organizationProgress = useOrganizationProgress();
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const currentProgress = useMemo<number | undefined>(
    () => Object.values(organizationProgress)[0],
    [organizationProgress],
  );
  const resumeStep = useMemo(
    () => Math.min(currentProgress ?? 0, CREATE_ORG_STEPS.length - 1),
    [currentProgress],
  );

  const visibleOrganizationAssignments = useMemo(
    () => getVisibleOrganizationAssignments(activeAccount),
    [activeAccount],
  );
  const hasOrganizationAssignment = visibleOrganizationAssignments.length > 0;

  useEffect(() => {
    if (hasOrganizationAssignment) {
      setErrorBannerText(_(CREATE_ORG_ALREADY_IN_ORG_MESSAGE));
      navigate('/dashboard', { replace: true });
    }
  }, [hasOrganizationAssignment, navigate, setErrorBannerText, _]);

  if (hasOrganizationAssignment) {
    return <></>;
  }

  const handleRequestClose = () => setShowDiscardModal(true);
  const handleCancelDiscard = () => setShowDiscardModal(false);
  const handleConfirmDiscard = () => {
    setShowDiscardModal(false);
    const progress = getAllOrganizationProgress();
    Object.keys(progress).forEach(addr => removeOrganizationProgress(addr));
    navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <SadBeeModal open={showDiscardModal} onClose={handleCancelDiscard}>
        <H variant="h4" className="mt-20 mb-10 text-center">
          {_(CREATE_ORG_DISCARD_TITLE)}
        </H>
        <p className="text-[18px] font-normal text-bc-neutral-500 text-center mb-30 px-10">
          {_(CREATE_ORG_DISCARD_DESCRIPTION)}
        </p>
        <div className="flex justify-center pb-10">
          <CancelButtonFooter
            onCancel={handleCancelDiscard}
            cancelLabel={_(CREATE_ORG_CANCEL_LABEL)}
            label={_(CREATE_ORG_CONFIRM_DISCARD_LABEL)}
            disabled={false}
            type="button"
            onClick={handleConfirmDiscard}
            className="h-[53px] w-full md:w-[260px] text-[16px]"
          />
        </div>
      </SadBeeModal>
      <MultiStepTemplate
        formId={CREATE_ORG_FORM_ID}
        initialValues={CREATE_ORG_INITIAL_VALUES}
        steps={CREATE_ORG_STEPS.map(step => ({ ...step }))}
        withLocalStorage
        forceStep={resumeStep}
        closable
        onRequestClose={handleRequestClose}
        closeAriaLabel={_(CREATE_ORG_CLOSE_ARIA_LABEL)}
        classes={{ titleWrap: 'pb-40' }}
      >
        <CreateOrganizationContent
          organizationProgress={organizationProgress}
        />
      </MultiStepTemplate>
    </>
  );
}
