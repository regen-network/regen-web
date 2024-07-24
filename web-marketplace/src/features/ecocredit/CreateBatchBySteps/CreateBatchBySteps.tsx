import React from 'react';
import { useLingui } from '@lingui/react';

import { MultiStepTemplate } from 'components/templates/MultiStepTemplate';

import CreateBatchMultiStepForm from './CreateBatchMultiStepForm/CreateBatchMultiStepForm';
import getFormModel from './form-model';

/**
 * Container integrating with:
 *   - config data (form model)
 *   - context (steps form) + layout (generic stepper section)
 *   - form container (formik)
 */

function CreateBatchBySteps(): React.ReactElement {
  const { _ } = useLingui();
  const formModel = getFormModel(_);

  return (
    <MultiStepTemplate
      formId={formModel.formId}
      steps={formModel.steps}
      initialValues={formModel.initialValues}
    >
      <CreateBatchMultiStepForm />
    </MultiStepTemplate>
  );
}

export default CreateBatchBySteps;
