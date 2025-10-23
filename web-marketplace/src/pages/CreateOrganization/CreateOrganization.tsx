import { useCallback, useEffect, useMemo, useState } from 'react';
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
  CREATE_ORG_FORM_ID,
  CREATE_ORG_INITIAL_VALUES,
  CREATE_ORG_STEPS,
} from './CreateOrganization.constants';
import { useCreateDao } from './hooks/useCreateDao/useCreateDao';
import {
  OrganizationMultiStepData,
  useOrganizationFlow,
} from './hooks/useOrganizationFlow';
import { useOrganizationProgress } from './hooks/useOrganizationProgress';
import { InviteMembersStep } from './steps/InviteMembersStep';
import { MigrateProjectsStep } from './steps/MigrateProjectsStep';
import { OrganizationProfileStep } from './steps/OrganizationProfileStep';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { useOrganizationMenuProfile } from 'components/organisms/RegistryLayout/hooks/useOrganizationMenuProfile';

type CreateOrganizationContentProps = {
  resumeStep: number;
  walletAddress?: string;
};

function CreateOrganizationContent({
  resumeStep,
  walletAddress,
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
    handleResetData,
  } = useMultiStep<OrganizationMultiStepData>();
  const { activeAccount } = useAuth();
  const { isCreating } = useCreateDao();

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
    isCreating,
    data,
    handleActiveStep,
    handleBack,
    handleSaveNext,
    handleResetData,
    resumeStep,
    walletAddress,
  });
  const [isStepValid, setIsStepValid] = useState(activeStep !== 0);

  useEffect(() => {
    if (activeStep === 0) {
      setIsStepValid(false);
    } else {
      setIsStepValid(true);
    }
  }, [activeStep]);

  return (
    <>
      {activeStep === 0 && (
        <OrganizationProfileStep
          formId={CREATE_ORG_FORM_ID}
          key={`org-profile-${orgProfileInitialValuesVersion}`}
          initialValues={orgProfileInitialValues}
          activeAccountId={activeAccount?.id}
          activeAccount={activeAccount}
          hasUnfinishedOrganization={hasUnfinishedOrganization}
          daoAddress={daoAddress}
          setDaoAddress={setDaoAddress}
          organizationId={organizationId}
          setOrganizationId={setOrganizationId}
          onTransferProfile={handleApplyTransferProfile}
          data={data}
          handleSaveNext={handleSaveNext}
          onValidityChange={setIsStepValid}
        />
      )}
      {activeStep === 1 && <MigrateProjectsStep />}
      {activeStep === 2 && <PersonalInfoStep />}
      {activeStep === 3 && <InviteMembersStep />}
      <SaveFooter
        onPrev={activeStep > 0 ? handlePrevClick : undefined}
        onSave={handleNextClick}
        saveText={isLastStep ? _(CREATE_ORG_FINISH_LABEL) : _(SAVE_TEXT)}
        saveDisabled={isCreating || !isStepValid}
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

  const resumeStep = useMemo(() => {
    if (!matchedProgress) return 0;
    return Math.min(matchedProgress.step, CREATE_ORG_STEPS.length - 1);
  }, [matchedProgress]);

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
        formId={CREATE_ORG_FORM_ID}
        initialValues={CREATE_ORG_INITIAL_VALUES}
        steps={CREATE_ORG_STEPS.map(step => ({ ...step }))}
        withLocalStorage
        forceStep={resumeStep}
        onClose={handleRequestClose}
        closeAriaLabel={_(CREATE_ORG_CLOSE_ARIA_LABEL)}
        classes={{ titleWrap: 'pb-40' }}
      >
        <CreateOrganizationContent
          resumeStep={resumeStep}
          walletAddress={walletAddress}
        />
      </MultiStepTemplate>
    </>
  );
}
