import React, { useEffect, useMemo, useState } from 'react';
import { useLingui } from '@lingui/react';
import { msg } from '@lingui/macro';

import SaveFooter from 'web-components/src/components/fixed-footer/SaveFooter';

import { SAVE_TEXT } from 'lib/constants/shared.constants';
import { useAuth } from 'lib/auth/auth';
import { getDefaultAvatar } from 'pages/Dashboard/Dashboard.utils';

import { MultiStepTemplate, useMultiStep } from '../../components/templates/MultiStepTemplate';
import {
  CREATE_ORG_FORM_ID,
  CREATE_ORG_INITIAL_VALUES,
  CREATE_ORG_STEPS,
} from './CreateOrganization.constants';
import { OrganizationProfileStep } from './steps/OrganizationProfileStep';
import { MigrateProjectsStep } from './steps/MigrateProjectsStep';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { InviteMembersStep } from './steps/InviteMembersStep';
import { TransferProfileModal } from './components/TransferProfileModal';
import { EditProfileFormSchemaType } from 'components/organisms/EditProfileForm/EditProfileForm.schema';
import { DEFAULT_PROFILE_BG } from '../Dashboard/Dashboard.constants';
import { AccountType } from 'generated/graphql';

function CreateOrganizationContent(): JSX.Element {
  const { _ } = useLingui();
  const { handleBack, activeStep, percentComplete, handleSaveNext, isLastStep, handleSave } =
    useMultiStep<Record<string, unknown>>();
  const { activeAccount } = useAuth();

  const [showTransferModal, setShowTransferModal] = useState(true);
  const [orgProfileInitialValues, setOrgProfileInitialValues] = useState<Partial<EditProfileFormSchemaType>>({});

  const displayName = useMemo(() => activeAccount?.name || 'User', [activeAccount?.name]);
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
  return (
    <MultiStepTemplate
      formId={CREATE_ORG_FORM_ID}
      initialValues={CREATE_ORG_INITIAL_VALUES}
      steps={CREATE_ORG_STEPS.map(step => ({ ...step }))}
      withLocalStorage
      forceStep={0}
      classes={{ titleWrap: 'pb-40' }}
    >
      <CreateOrganizationContent />
    </MultiStepTemplate>
  );
}
