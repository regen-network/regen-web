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
import { v4 as uuidv4 } from 'uuid';

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

import { getDefaultAvatar } from 'pages/Dashboard/Dashboard.utils';
import { EditProfileFormSchemaType } from 'components/organisms/EditProfileForm/EditProfileForm.schema';

import {
  MultiStepTemplate,
  useMultiStep,
} from '../../components/templates/MultiStepTemplate';
import { DEFAULT_PROFILE_BG } from '../Dashboard/Dashboard.constants';
import { TransferProfileModal } from './components/TransferProfileModal';
import {
  CREATE_ORG_ACTIVE_ACCOUNT_REQUIRED_ERROR,
  CREATE_ORG_ALREADY_IN_ORG_MESSAGE,
  CREATE_ORG_CANCEL_LABEL,
  CREATE_ORG_CLOSE_ARIA_LABEL,
  CREATE_ORG_CONFIRM_DISCARD_LABEL,
  CREATE_ORG_DEFAULT_USER,
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
  organizationProgress: OrgProgressMap;
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
    handleSave,
    maxAllowedStep,
    data,
  } = useMultiStep<Record<string, unknown>>();
  const { activeAccount } = useAuth();
  const { createDao, isCreating } = useCreateDao();
  const daoAddressRef = useRef<string | undefined>(undefined);
  const organizationNameRef = useRef<string | undefined>(undefined);
  const organizationIdRef = useRef<string | undefined>(undefined);
  const [hasUnfinishedOrganization, setHasUnfinishedOrganization] =
    useState(false);

  const [showTransferModal, setShowTransferModal] = useState(true);
  const [orgProfileInitialValues, setOrgProfileInitialValues] = useState<
    Partial<EditProfileFormSchemaType>
  >({});

  const displayName = useMemo(
    () => activeAccount?.name || _(CREATE_ORG_DEFAULT_USER),
    [activeAccount?.name, _],
  );
  const avatarUrl = useMemo(
    () => activeAccount?.image || getDefaultAvatar(activeAccount as any),
    [activeAccount],
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

      if (organizationIdRef.current) {
        console.info(
          '[CreateOrganization] restored organization id from draft',
          {
            organizationId: organizationIdRef.current,
          },
        );
      }

      const existing = organizationProgress[storedDaoAddress];
      const nextStep = Math.max(maxAllowedStep, 1);
      if (!existing || existing.step !== nextStep || !existing.name) {
        setOrganizationProgressStep(
          storedDaoAddress,
          nextStep,
          storedName ?? organizationNameRef.current,
        );
      }
      setHasUnfinishedOrganization(true);
    }
  }, [data, organizationProgress, maxAllowedStep]);

  useEffect(() => {
    const entries = Object.values(organizationProgress);
    if (entries.length > 0) {
      const entry = entries[0];
      daoAddressRef.current = entry.daoAddress;
      organizationNameRef.current = entry.name;
      setHasUnfinishedOrganization(true);
    } else {
      daoAddressRef.current = undefined;
      organizationNameRef.current = undefined;
      setHasUnfinishedOrganization(false);
    }
  }, [organizationProgress]);

  const currentProgressEntry = useMemo(
    () => Object.values(organizationProgress)[0],
    [organizationProgress],
  );
  const resumeStep = useMemo(() => {
    if (!currentProgressEntry) return 0;
    return Math.min(
      currentProgressEntry.step ?? 0,
      CREATE_ORG_STEPS.length - 1,
    );
  }, [currentProgressEntry]);

  useEffect(() => {
    if (resumeStep > 0 && activeStep === 0) {
      handleActiveStep(resumeStep);
    }
  }, [resumeStep, activeStep, handleActiveStep]);

  // No-op: modal starts open (showTransferModal=true) and will be closed via Skip/Yes handlers

  const prefillFromActiveAccount = (): Partial<EditProfileFormSchemaType> => {
    const name = activeAccount?.name || displayName;
    const profileImage = activeAccount?.image || avatarUrl;
    const backgroundImage = activeAccount?.bgImage || DEFAULT_PROFILE_BG;
    const description = activeAccount?.description?.trimEnd() || '';
    const websiteLink = activeAccount?.websiteLink || '';
    const twitterLink = activeAccount?.twitterLink || '';
    return {
      name,
      profileImage,
      backgroundImage,
      description,
      websiteLink,
      twitterLink,
      // Ensure org type even if hidden
      profileType: AccountType.Organization,
    } as Partial<EditProfileFormSchemaType>;
  };

  const handleSkipTransfer = () => {
    setShowTransferModal(false);
  };

  const handleYesTransfer = () => {
    const values = prefillFromActiveAccount();
    setOrgProfileInitialValues(values);
    // persist values for this step so user can immediately proceed if desired
    handleSave(values as Record<string, unknown>, 0);
    setShowTransferModal(false);
  };

  const handleOrganizationProfileSaved = useCallback(
    async (values: EditProfileFormSchemaType) => {
      try {
        const currentAccountId = activeAccount?.id;

        if (hasUnfinishedOrganization && daoAddressRef.current) {
          organizationNameRef.current = values.name;
          setOrganizationProgressStep(daoAddressRef.current, 1, values.name);
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

        if (!currentAccountId) {
          throw new Error(_(CREATE_ORG_ACTIVE_ACCOUNT_REQUIRED_ERROR));
        }

        const isNewOrganization = !organizationIdRef.current;
        const organizationId = organizationIdRef.current ?? uuidv4();
        organizationIdRef.current = organizationId;
        console.info(
          isNewOrganization
            ? '[CreateOrganization] generated organization id'
            : '[CreateOrganization] reusing existing organization id',
          {
            organizationId,
          },
        );

        const daoResult = await createDao({
          name: values.name,
          description: values.description,
          profileImage: values.profileImage,
          backgroundImage: values.backgroundImage,
          websiteLink: values.websiteLink,
          twitterLink: values.twitterLink,
          organizationId,
          currentAccountId,
        });

        console.info('[CreateOrganization] dao created', {
          organizationId: daoResult.organizationId,
          daoAddress: daoResult.daoAddress,
        });

        daoAddressRef.current = daoResult.daoAddress;
        organizationNameRef.current = values.name;
        organizationIdRef.current = daoResult.organizationId;
        setOrganizationProgressStep(daoResult.daoAddress, 1, values.name);

        const payload: Record<string, unknown> = {
          ...values,
          dao: daoResult,
        };

        handleSaveNext(payload);
      } catch (error) {
        // Surface to the form error boundary for user feedback
        console.error('Failed to create DAO', error);
        throw error;
      }
    },
    [
      activeAccount?.id,
      hasUnfinishedOrganization,
      createDao,
      handleSaveNext,
      data,
      _,
    ],
  );

  const handlePrevClick = useCallback(() => {
    if (activeStep === 0) return;
    if (hasUnfinishedOrganization && daoAddressRef.current) {
      const previousStep = Math.max(activeStep - 1, 1);
      setOrganizationProgressStep(
        daoAddressRef.current,
        previousStep,
        organizationNameRef.current,
      );
    }
    handleBack();
  }, [activeStep, handleBack, hasUnfinishedOrganization]);

  const handleNextClick = useCallback(() => {
    if (isCreating) return;

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
        setOrganizationProgressStep(
          daoAddressRef.current,
          nextStep,
          organizationNameRef.current,
        );
      }
    }

    handleSaveNext({});
  }, [
    activeStep,
    handleSaveNext,
    hasUnfinishedOrganization,
    isCreating,
    isLastStep,
  ]);

  return (
    <>
      {activeStep === 0 && (
        <OrganizationProfileStep
          formId={CREATE_ORG_FORM_ID}
          // Remount when we set transferred values to ensure RHF defaultValues apply
          key={JSON.stringify(orgProfileInitialValues)}
          initialValues={orgProfileInitialValues}
          onSaved={handleOrganizationProfileSaved}
        />
      )}
      <TransferProfileModal
        open={activeStep === 0 && showTransferModal}
        onSkip={handleSkipTransfer}
        onTransfer={handleYesTransfer}
        name={displayName}
        avatar={avatarUrl}
      />
      {activeStep === 1 && <MigrateProjectsStep />}
      {activeStep === 2 && <PersonalInfoStep />}
      {activeStep === 3 && <InviteMembersStep />}
      <SaveFooter
        onPrev={activeStep > 0 ? handlePrevClick : undefined}
        onSave={handleNextClick}
        saveText={isLastStep ? _(CREATE_ORG_FINISH_LABEL) : _(SAVE_TEXT)}
        saveDisabled={isCreating}
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
  const currentProgressEntry = useMemo(
    () => Object.values(organizationProgress)[0],
    [organizationProgress],
  );
  const resumeStep = useMemo(
    () =>
      Math.min(currentProgressEntry?.step ?? 0, CREATE_ORG_STEPS.length - 1),
    [currentProgressEntry],
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
    Object.values(progress).forEach(entry =>
      removeOrganizationProgress(entry.daoAddress),
    );
    navigate('/dashboard', { replace: true });
  };

  return (
    <>
      {/* Close button now rendered inside MultiStepTemplate via closable prop */}
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
