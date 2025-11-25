import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { useSetAtom } from 'jotai';
import { useFetchProjectByAdmin } from 'legacy-pages/Dashboard/MyProjects/hooks/useFetchProjectsByAdmin';

import SaveFooter from 'web-components/src/components/fixed-footer/SaveFooter';
import { Loading } from 'web-components/src/components/loading';
import { SadBeeModal } from 'web-components/src/components/modal/SadBeeModal/SadBeeModal';
import { CancelButtonFooter } from 'web-components/src/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Title } from 'web-components/src/components/typography';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { useAuth } from 'lib/auth/auth';
import { SAVE_TEXT } from 'lib/constants/shared.constants';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { useWallet } from 'lib/wallet/wallet';

import { FormRef } from 'components/molecules/Form/Form';
import { useOrganizationMenuProfile } from 'components/organisms/RegistryLayout/hooks/useOrganizationMenuProfile';

import {
  MultiStepTemplate,
  useMultiStep,
} from '../../components/templates/MultiStepTemplate';
import {
  CREATE_ORG_ALREADY_IN_ORG_MESSAGE,
  CREATE_ORG_CANCEL_LABEL,
  CREATE_ORG_CLOSE_ARIA_LABEL,
  CREATE_ORG_CONFIRM_DISCARD_LABEL,
  CREATE_ORG_DISCARD_DESCRIPTION,
  CREATE_ORG_DISCARD_TITLE,
  CREATE_ORG_FINISH_LABEL,
  CREATE_ORG_INITIAL_VALUES,
  CREATE_ORGANIZATION_FORM_ID,
  INVITE_MEMBERS_FORM_ID,
  MIGRATE_PROJECTS_FORM_ID,
  ORGANIZATION_PROFILE_FORM_ID,
  PERSONAL_INFO_FORM_ID,
} from './CreateOrganization.constants';
import { SendRegenModal } from './CreateOrganization.SendRegenModal';
import { getCreateOrgSteps } from './CreateOrganization.utils';
import {
  OrganizationMultiStepData,
  useOrganizationFlow,
} from './hooks/useOrganizationFlow';
import { useOrganizationProgress } from './hooks/useOrganizationProgress';
import { InviteMembersStep } from './steps/InviteMembersStep';
import { MigrateProjectsStep } from './steps/MigrateProjectsStep';
import { OrganizationProfileStep } from './steps/OrganizationProfileStep';
import { PersonalInfoStep } from './steps/PersonalInfoStep';

type CreateOrganizationContentProps = {
  resumeStep: number;
  walletAddress?: string;
  steps: ReturnType<typeof getCreateOrgSteps>;
  projects: NormalizeProject[];
};

function CreateOrganizationContent({
  resumeStep,
  walletAddress,
  steps,
  projects,
}: CreateOrganizationContentProps): JSX.Element {
  const { _ } = useLingui();
  const {
    handleActiveStep,
    activeStep,
    percentComplete,
    data,
    handleResetData,
    isLastStep,
  } = useMultiStep<OrganizationMultiStepData>();

  // Refs for each form step
  const orgProfileFormRef: FormRef = useRef(undefined);
  const migrateProjectsFormRef: FormRef = useRef(undefined);
  const personalInfoFormRef: FormRef = useRef(undefined);
  const inviteMembersFormRef: FormRef = useRef(undefined);

  // Map form IDs to refs
  const formRefs: Record<string, FormRef> = {
    [ORGANIZATION_PROFILE_FORM_ID]: orgProfileFormRef,
    [MIGRATE_PROJECTS_FORM_ID]: migrateProjectsFormRef,
    [PERSONAL_INFO_FORM_ID]: personalInfoFormRef,
    [INVITE_MEMBERS_FORM_ID]: inviteMembersFormRef,
  };

  const {
    hasUnfinishedOrganization,
    orgProfileInitialValues,
    orgProfileInitialValuesVersion,
    handleNextClick,
    handleApplyTransferProfile,
    sendRegenModalOpen,
    setSendRegenModalOpen,
    completeCreation,
  } = useOrganizationFlow({
    activeStep,
    data,
    handleActiveStep,
    handleResetData,
    resumeStep,
    walletAddress,
    steps,
    formRefs,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  return (
    <>
      {steps[activeStep].id === ORGANIZATION_PROFILE_FORM_ID && (
        <OrganizationProfileStep
          key={`org-profile-${orgProfileInitialValuesVersion}`}
          initialValues={orgProfileInitialValues}
          hasUnfinishedOrganization={hasUnfinishedOrganization}
          onTransferProfile={handleApplyTransferProfile}
          setIsSubmitting={setIsSubmitting}
          setIsValid={setIsValid}
          formRef={orgProfileFormRef}
          hasProjects={projects.length > 0}
        />
      )}
      {steps[activeStep].id === MIGRATE_PROJECTS_FORM_ID && (
        <MigrateProjectsStep
          setIsSubmitting={setIsSubmitting}
          setIsValid={setIsValid}
          projects={projects}
          formRef={migrateProjectsFormRef}
        />
      )}
      {steps[activeStep].id === PERSONAL_INFO_FORM_ID && (
        <PersonalInfoStep
          setIsSubmitting={setIsSubmitting}
          setIsValid={setIsValid}
          formRef={personalInfoFormRef}
        />
      )}
      {steps[activeStep].id === INVITE_MEMBERS_FORM_ID && <InviteMembersStep />}
      <SaveFooter
        onSave={handleNextClick}
        saveText={isLastStep ? _(CREATE_ORG_FINISH_LABEL) : _(SAVE_TEXT)}
        saveDisabled={
          steps[activeStep].id !== INVITE_MEMBERS_FORM_ID
            ? !isValid || isSubmitting
            : false
        }
        percentComplete={percentComplete}
      />
      {steps[activeStep].id === INVITE_MEMBERS_FORM_ID && (
        <SendRegenModal
          open={sendRegenModalOpen}
          onClose={() => setSendRegenModalOpen(false)}
          completeCreation={completeCreation}
        />
      )}
    </>
  );
}

export default function CreateOrganizationPage(): JSX.Element {
  const navigate = useNavigate();
  const { _ } = useLingui();
  const { activeAccount, privActiveAccount, loading: authLoading } = useAuth();
  const { wallet } = useWallet();
  const walletAddress = wallet?.address;
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);
  const organizationProgress = useOrganizationProgress();
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const isProgressForCurrentWallet =
    !!organizationProgress &&
    !!walletAddress &&
    organizationProgress.walletAddress === walletAddress;
  const matchedProgress = isProgressForCurrentWallet
    ? organizationProgress
    : undefined;

  const { adminProjects, isLoadingAdminProjects } = useFetchProjectByAdmin({
    adminAccountId: activeAccount?.id,
    adminAddress: activeAccount?.addr,
    keepUnpublished: true,
  });

  const projects = useMemo(
    () => adminProjects.filter(p => !!p.offChainId),
    [adminProjects],
  );

  const hasProjects = !isLoadingAdminProjects && projects.length > 0;

  const shouldShowPersonalInfoStep = useMemo(() => {
    if (authLoading) return false;
    const initialHasName = Boolean(activeAccount?.name?.trim());
    const initialHasEmail = Boolean(privActiveAccount?.email?.trim());
    return !(initialHasName && initialHasEmail);
  }, [activeAccount?.name, authLoading, privActiveAccount?.email]);

  const steps = useMemo(
    () => getCreateOrgSteps(_, hasProjects, shouldShowPersonalInfoStep),
    [_, hasProjects, shouldShowPersonalInfoStep],
  );

  const resumeStep = useMemo(() => {
    if (!matchedProgress) return 0;
    return Math.min(matchedProgress.step, steps.length - 1);
  }, [matchedProgress, steps]);

  const { menuOrganizationProfile, unfinalizedOrgCreation } =
    useOrganizationMenuProfile({
      activeAccount,
      wallet,
    });

  useEffect(() => {
    if (menuOrganizationProfile && !unfinalizedOrgCreation) {
      setErrorBannerText(_(CREATE_ORG_ALREADY_IN_ORG_MESSAGE));
      navigate('/dashboard', { replace: true });
    }
  }, [
    menuOrganizationProfile,
    unfinalizedOrgCreation,
    navigate,
    setErrorBannerText,
    _,
  ]);

  const handleRequestClose = useCallback(() => setShowDiscardModal(true), []);
  const handleCancelDiscard = useCallback(() => setShowDiscardModal(false), []);
  const handleConfirmDiscard = useCallback(() => {
    setShowDiscardModal(false);
    navigate('/dashboard', { replace: true });
  }, [navigate]);

  return (
    <>
      <SadBeeModal open={showDiscardModal} onClose={handleCancelDiscard}>
        <Title variant="h4" className="mt-20 mb-10 text-center">
          {_(CREATE_ORG_DISCARD_TITLE)}
        </Title>
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
      <div className="bg-bc-neutral-100 min-h-[100vh]">
        {authLoading || isLoadingAdminProjects ? (
          <Loading className="min-h-[100vh]" />
        ) : (
          <MultiStepTemplate
            formId={CREATE_ORGANIZATION_FORM_ID}
            initialValues={CREATE_ORG_INITIAL_VALUES}
            steps={steps}
            withLocalStorage
            forceStep={resumeStep}
            onClose={handleRequestClose}
            closeAriaLabel={_(CREATE_ORG_CLOSE_ARIA_LABEL)}
            classes={{
              titleWrap: 'pb-40 max-w-[unset]',
              formWrap: 'max-w-[800px]',
            }}
          >
            <CreateOrganizationContent
              resumeStep={resumeStep}
              walletAddress={walletAddress}
              steps={steps}
              projects={projects}
            />
          </MultiStepTemplate>
        )}
      </div>
    </>
  );
}
