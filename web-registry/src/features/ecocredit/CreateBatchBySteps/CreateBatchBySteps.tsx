import React from 'react';
import { MultiStepSection } from '../../../components/templates/MultiStep';

import formModel from './form-model';
import CreateBatchMultiStepForm from './CreateBatchMultiStepForm';

/**
 * Container integrating with:
 *   - config data (form model)
 *   - context (steps form) + layout (generic stepper section)
 *   - form container (formik)
 */

function CreateBatchBySteps(): React.ReactElement {
  return (
    <MultiStepSection
      formId={formModel.formId}
      steps={formModel.steps}
      initialValues={formModel.initialValues}
    >
      <CreateBatchMultiStepForm />
    </MultiStepSection>
  );
}

export default CreateBatchBySteps;
