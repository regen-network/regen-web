import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { useSetAtom } from 'jotai';

import SaveFooter from 'web-components/src/components/fixed-footer/SaveFooter';
import { SadBeeModal } from 'web-components/src/components/modal/SadBeeModal/SadBeeModal';
import { CancelButtonFooter } from 'web-components/src/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Title } from 'web-components/src/components/typography';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { useAuth } from 'lib/auth/auth';
import { SAVE_TEXT } from 'lib/constants/shared.constants';
import { useWallet } from 'lib/wallet/wallet';

import { useFetchProjectByAdmin } from 'pages/Dashboard/MyProjects/hooks/useFetchProjectsByAdmin';
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
import { MultiStepFormApi } from './CreateOrganization.types';
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
import { Loading } from 'web-components/src/components/loading';

type CreateOrganizationContentProps = {
  resumeStep: number;
  walletAddress?: string;
  steps: ReturnType<typeof getCreateOrgSteps>;
};

function CreateOrganizationContent({
  resumeStep,
  walletAddress,
  steps,
}: CreateOrganizationContentProps): JSX.Element {
  const { _ } = useLingui();
  const {
    handleBack,
    handleActiveStep,
    activeStep,
    percentComplete,
    handleSaveNext,
    isLastStep,
    data,
    isLoadingAdminProjects,
    handleResetData,
  } = useMultiStep<OrganizationMultiStepData>();
  const activeRef = useRef<MultiStepFormApi>(null);

  const {
    daoAddress,
    setDaoAddress,
    organizationId,
    setOrganizationId,
    hasUnfinishedOrganization,
    orgProfileInitialValues,
    orgProfileInitialValuesVersion,
    handlePrevClick,
    handleNextClick,
    handleApplyTransferProfile,
  } = useOrganizationFlow({
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
  });
  console.log(
    'parent ',
    activeRef.current,
  );
  console.log(
    'parent valid',
    activeRef.current?.isValid(),
  );
  return (
    <>
      {steps[activeStep].id === ORGANIZATION_PROFILE_FORM_ID && (
        <OrganizationProfileStep
          ref={activeRef}
          key={`org-profile-${orgProfileInitialValuesVersion}`}
          initialValues={orgProfileInitialValues}
          hasUnfinishedOrganization={hasUnfinishedOrganization}
          daoAddress={daoAddress}
          setDaoAddress={setDaoAddress}
          organizationId={organizationId}
          setOrganizationId={setOrganizationId}
          onTransferProfile={handleApplyTransferProfile}
        />
      )}
      {steps[activeStep].id === MIGRATE_PROJECTS_FORM_ID && (
        <MigrateProjectsStep ref={activeRef} />
      )}
      {steps[activeStep].id === PERSONAL_INFO_FORM_ID && <PersonalInfoStep />}
      {steps[activeStep].id === INVITE_MEMBERS_FORM_ID && <InviteMembersStep />}
      <SaveFooter
        onPrev={activeStep > 0 ? handlePrevClick : undefined}
        onSave={handleNextClick}
        saveText={isLastStep ? _(CREATE_ORG_FINISH_LABEL) : _(SAVE_TEXT)}
        saveDisabled={
          activeRef.current?.isSubmitting() || !activeRef.current?.isValid()
        }
        percentComplete={percentComplete}
      />
    </>
  );
}

export default function CreateOrganizationPage(): JSX.Element {
  const navigate = useNavigate();
  const { _ } = useLingui();
  const { activeAccount } = useAuth();
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
  });

  const steps = useMemo(
    () =>
      getCreateOrgSteps(_, !isLoadingAdminProjects && adminProjects.length > 0),
    [_, isLoadingAdminProjects, adminProjects],
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
    ,
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
          isLoadingAdminProjects={isLoadingAdminProjects}
        />
      </MultiStepTemplate>
    </>
  );
}
