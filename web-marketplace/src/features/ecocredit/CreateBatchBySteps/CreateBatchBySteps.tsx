import React, { useMemo } from 'react';
import { useLingui } from '@lingui/react';

import {
  INVALID_AMOUNT,
  INVALID_DATE,
  INVALID_JSON,
  INVALID_REGEN_ADDRESS,
  INVALID_START_END_DATE,
  INVALID_VCS_RETIREMENT,
  REQUIRED_MESSAGE,
} from 'lib/constants/shared.constants';

import { MultiStepTemplate } from 'components/templates/MultiStepTemplate';

import CreateBatchMultiStepForm from './CreateBatchMultiStepForm/CreateBatchMultiStepForm';
import {
  getJSONSchema,
  getVcsMetadataSchema,
} from './CreateBatchMultiStepForm/CreditBasics';
import getFormModel from './form-model';

/**
 * Container integrating with:
 *   - config data (form model)
 *   - context (steps form) + layout (generic stepper section)
 *   - form container (formik)
 */

function CreateBatchBySteps(): React.ReactElement {
  const { _ } = useLingui();

  // Schema for Verified Carbon Standard projects
  const vcsMetadataSchema = useMemo(
    () =>
      getVcsMetadataSchema({
        requiredMessage: _(REQUIRED_MESSAGE),
        invalidVCSRetirement: _(INVALID_VCS_RETIREMENT),
      }),
    [_],
  );

  // Schema for all other projects
  const JSONSchema = useMemo(
    () =>
      getJSONSchema({
        invalidJSON: _(INVALID_JSON),
      }),
    [_],
  );

  const formModel = useMemo(
    () =>
      getFormModel({
        requiredMessage: _(REQUIRED_MESSAGE),
        invalidRegenAddress: _(INVALID_REGEN_ADDRESS),
        invalidAmount: _(INVALID_AMOUNT),
        invalidDate: _(INVALID_DATE),
        invalidStartEndDate: _(INVALID_START_END_DATE),
        invalidVCSRetirement: _(INVALID_VCS_RETIREMENT),
        invalidJSON: _(INVALID_JSON),
        vcsMetadataSchema,
        JSONSchema,
        _,
      }),
    [JSONSchema, _, vcsMetadataSchema],
  );

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
