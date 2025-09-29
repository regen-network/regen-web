import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import SaveFooter from 'web-components/src/components/fixed-footer/SaveFooter';
import { SadBeeModal } from 'web-components/src/components/modal/SadBeeModal/SadBeeModal';
import { CancelButtonFooter } from 'web-components/src/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Title as H } from 'web-components/src/components/typography';

import { AccountType } from 'generated/graphql';
import { useAuth } from 'lib/auth/auth';
import { SAVE_TEXT } from 'lib/constants/shared.constants';

import { getDefaultAvatar } from 'pages/Dashboard/Dashboard.utils';
import { EditProfileFormSchemaType } from 'components/organisms/EditProfileForm/EditProfileForm.schema';

import {
  MultiStepTemplate,
  useMultiStep,
} from '../../components/templates/MultiStepTemplate';
import { DEFAULT_PROFILE_BG } from '../Dashboard/Dashboard.constants';
import { TransferProfileModal } from './components/TransferProfileModal';
import {
  CREATE_ORG_FORM_ID,
  CREATE_ORG_INITIAL_VALUES,
  CREATE_ORG_STEPS,
} from './CreateOrganization.constants';
import { InviteMembersStep } from './steps/InviteMembersStep';
import { MigrateProjectsStep } from './steps/MigrateProjectsStep';
import { OrganizationProfileStep } from './steps/OrganizationProfileStep';
import { PersonalInfoStep } from './steps/PersonalInfoStep';

function CreateOrganizationContent(): JSX.Element {
  const { _ } = useLingui();
  const {
    handleBack,
    activeStep,
    percentComplete,
    handleSaveNext,
    isLastStep,
    handleSave,
  } = useMultiStep<Record<string, unknown>>();
  const { activeAccount } = useAuth();

  const [showTransferModal, setShowTransferModal] = useState(true);
  const [orgProfileInitialValues, setOrgProfileInitialValues] = useState<
    Partial<EditProfileFormSchemaType>
  >({});

  const displayName = useMemo(
    () => activeAccount?.name || _(msg`User`),
    [activeAccount?.name, _],
  );
  const avatarUrl = useMemo(
    () => activeAccount?.image || getDefaultAvatar(activeAccount as any),
    [activeAccount],
  );

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

  return (
    <>
      {activeStep === 0 && (
        <OrganizationProfileStep
          formId={CREATE_ORG_FORM_ID}
          // Remount when we set transferred values to ensure RHF defaultValues apply
          key={JSON.stringify(orgProfileInitialValues)}
          initialValues={orgProfileInitialValues}
          onSaved={(values: Record<string, unknown>) => handleSaveNext(values)}
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
        onPrev={activeStep > 0 ? handleBack : undefined}
        onSave={() => handleSaveNext({})}
        saveText={isLastStep ? _(msg`Finish`) : _(SAVE_TEXT)}
        saveDisabled={false}
        percentComplete={percentComplete}
      />
    </>
  );
}

export default function CreateOrganizationPage(): JSX.Element {
  const navigate = useNavigate();
  const { _ } = useLingui();
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const handleRequestClose = () => setShowDiscardModal(true);
  const handleCancelDiscard = () => setShowDiscardModal(false);
  const handleConfirmDiscard = () => {
    setShowDiscardModal(false);
    navigate('/dashboard', { replace: true });
  };
  return (
    <>
      {/* Close button now rendered inside MultiStepTemplate via closable prop */}
      <SadBeeModal open={showDiscardModal} onClose={handleCancelDiscard}>
        <H variant="h4" className="mt-20 mb-10 text-center">
          <Trans>Are you sure you want to discard your changes?</Trans>
        </H>
        <p className="text-[18px] font-normal text-bc-neutral-500 text-center mb-30 px-10">
          <Trans>
            If you proceed, you will lose all the unsaved changes you made. This
            cannot be undone.
          </Trans>
        </p>
        <div className="flex justify-center pb-10">
          <CancelButtonFooter
            onCancel={handleCancelDiscard}
            cancelLabel={_(msg`CANCEL`)}
            label={_(msg`YES, DISCARD`)}
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
        forceStep={0}
        closable
        onRequestClose={handleRequestClose}
        closeAriaLabel={_(msg`close create organization`)}
        classes={{ titleWrap: 'pb-40' }}
      >
        <CreateOrganizationContent />
      </MultiStepTemplate>
    </>
  );
}
