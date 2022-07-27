import React from 'react';
<<<<<<< HEAD
import { MultiStepSection } from '../../../components/templates/MultiStep';
=======

import { MultiStepTemplate } from 'components/templates/MultiStepTemplate';
>>>>>>> 92528156 (David/eslint simple import sort (#1075))

import CreateBatchMultiStepForm from './CreateBatchMultiStepForm';
import formModel from './form-model';

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
