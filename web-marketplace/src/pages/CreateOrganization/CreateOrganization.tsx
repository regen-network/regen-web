import React from 'react';
import { useLingui } from '@lingui/react';
import { msg } from '@lingui/macro';

import SaveFooter from 'web-components/src/components/fixed-footer/SaveFooter';

import { SAVE_TEXT } from 'lib/constants/shared.constants';

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

function CreateOrganizationContent(): JSX.Element {
  const { _ } = useLingui();
  const { handleBack, activeStep, percentComplete, handleSaveNext, isLastStep } =
    useMultiStep<Record<string, unknown>>();

  return (
    <>
      {activeStep === 0 && (
        <OrganizationProfileStep
          formId={CREATE_ORG_FORM_ID}
          initialValues={{}}
          onSaved={(values: Record<string, unknown>) => handleSaveNext(values)}
        />
      )}
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
      classes={{ titleWrap: 'pb-40' }}
    >
      <CreateOrganizationContent />
    </MultiStepTemplate>
  );
}
