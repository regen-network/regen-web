import React, { useEffect, useMemo, useState } from 'react';
import { useLingui } from '@lingui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import SaveFooter from 'web-components/src/components/fixed-footer/SaveFooter';
import { Option } from 'web-components/src/components/inputs/SelectTextField';
import { ProcessingModal } from 'web-components/src/components/modal/ProcessingModal';
import NotFound from 'web-components/src/components/views/NotFoundView';

import {
  getBottomFieldsTextMapping,
  INVALID_AMOUNT,
  INVALID_DATE,
  INVALID_JSON,
  INVALID_PAST_DATE,
  INVALID_REGEN_ADDRESS,
  INVALID_VCS_RETIREMENT,
  REQUIRED_MESSAGE,
  RETIREMENT_INFO_TEXT,
  SAVE_EXIT_TEXT,
  SUBMIT_TEXT,
} from 'lib/constants/shared.constants';

import { useMultiStep } from 'components/templates/MultiStepTemplate';

import getFormModel from '../form-model';
import useCreateBatchSubmit from '../hooks/useCreateBatchSubmit';
import {
  CREATE_BATCH_FORM_ADD_BUTTON_TEXT,
  CREATE_BATCH_FORM_AMOUNT_RETIRED_LABEL,
  CREATE_BATCH_FORM_AMOUNT_TRADABLE_LABEL,
  CREATE_BATCH_FORM_DELETE_BUTTON_TEXT,
  CREATE_BATCH_FORM_RECIPIENT_LABEL,
  CREATE_BATCH_FORM_WITH_RETIRE_LABEL,
} from './CreateBatchMultiStepForm.constants';
import CreditBasics, {
  CreditBasicsFormValues,
  getIsPastDateTest,
  getJSONSchema,
  getVcsMetadataSchema,
} from './CreditBasics';
import Recipients, { RecipientsFormValues } from './Recipients';
import Result from './Result';
import Review from './Review';

import RotationalGrazing from 'assets/rotational-grazing.png';

/**
 *
 * Create Batch Multi-Step Form
 *
 * The form component, responsabilities:
 *     - Formik instance (context)
 *     - Render the corresponding step (view with fields)
 *     - Handle partial submits
 *     - Apply the corresponding validation schema
 */

export type CreateBatchFormValues = CreditBasicsFormValues &
  RecipientsFormValues;

export default function CreateBatchMultiStepForm(): React.ReactElement {
  const { _ } = useLingui();
  const isPastDateTest = useMemo(
    () =>
      getIsPastDateTest({
        invalidPastDate: _(INVALID_PAST_DATE),
      }),
    [_],
  );
  const vcsMetadataSchema = useMemo(
    () =>
      getVcsMetadataSchema({
        requiredMessage: _(REQUIRED_MESSAGE),
        invalidVCSRetirement: _(INVALID_VCS_RETIREMENT),
      }),
    [_],
  );
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
        invalidVCSRetirement: _(INVALID_VCS_RETIREMENT),
        invalidJSON: _(INVALID_JSON),
        isPastDateTest,
        vcsMetadataSchema,
        JSONSchema,
        _,
      }),
    [isPastDateTest, vcsMetadataSchema, JSONSchema, _],
  );

  // state for fill-the-form flow
  const {
    data,
    activeStep,
    isLastStep,
    isReviewStep,
    percentComplete,
    handleSaveNext,
    handleBack,
    handleSuccess,
    handleError,
    resultStatus,
  } = useMultiStep<CreateBatchFormValues>();

  // state for submit flow
  const {
    status: submitStatus,
    deliverTxResponse,
    isSubmitModalOpen,
    error: submitError,
    createBatch,
    closeSubmitModal,
  } = useCreateBatchSubmit();

  const currentValidationSchema = isReviewStep
    ? Yup.object(formModel.validationSchemaFields) // all fields
    : formModel.validationSchema[activeStep];

  const [projectOptionSelected, setProjectOptionSelected] = useState<Option>();

  const bottomFieldsTextMapping = useMemo(
    () => getBottomFieldsTextMapping(_),
    [_],
  );

  useEffect(() => {
    if (submitStatus === 'success') handleSuccess();
    if (submitStatus === 'error') handleError();
  }, [submitStatus, handleSuccess, handleError]);

  function handleSubmit(
    values: CreateBatchFormValues,
    formikHelpers: FormikHelpers<CreateBatchFormValues>,
  ): void {
    if (isReviewStep) {
      createBatch(values);
    } else {
      let dataDisplay;
      if (projectOptionSelected) {
        dataDisplay = {
          project: projectOptionSelected,
        };
      }
      handleSaveNext(values, dataDisplay);
      formikHelpers.setTouched({});
      formikHelpers.setSubmitting(false);
    }
  }

  function renderStep(activeStep: number): React.ReactElement {
    switch (activeStep) {
      case 0:
        return (
          <CreditBasics saveProjectOptionSelected={setProjectOptionSelected} />
        );
      case 1:
        return (
          <Recipients
            addButtonText={_(CREATE_BATCH_FORM_ADD_BUTTON_TEXT)}
            deleteButtonText={_(CREATE_BATCH_FORM_DELETE_BUTTON_TEXT)}
            recipientLabel={_(CREATE_BATCH_FORM_RECIPIENT_LABEL)}
            amountTradableLabel={_(CREATE_BATCH_FORM_AMOUNT_TRADABLE_LABEL)}
            amountRetiredLabel={_(CREATE_BATCH_FORM_AMOUNT_RETIRED_LABEL)}
            withRetireLabel={_(CREATE_BATCH_FORM_WITH_RETIRE_LABEL)}
            retirementInfoText={_(RETIREMENT_INFO_TEXT)}
            bottomTextMapping={bottomFieldsTextMapping}
            mapboxToken={import.meta.env.VITE_MAPBOX_TOKEN || ''}
          />
        );
      case 2:
        return <Review />;
      default:
        return <NotFound img={<img alt="home" src={RotationalGrazing} />} />;
    }
  }

  if (isLastStep && resultStatus)
    return <Result response={deliverTxResponse} error={submitError} />;

  return (
    <>
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={data}
        validationSchema={currentValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm, isValid, isSubmitting }) => (
          <Form id={formModel.formId}>
            {renderStep(activeStep)}
            {/* TODO ? - Move to: MultiStepTemplate > StepperSection > StepperControls */}
            {!isLastStep && (
              <SaveFooter
                onPrev={activeStep > 0 ? handleBack : undefined}
                onSave={submitForm}
                saveText={activeStep === 2 ? _(SUBMIT_TEXT) : ''}
                saveExitText={activeStep === 2 ? _(SAVE_EXIT_TEXT) : ''}
                saveDisabled={!isValid || isSubmitting}
                percentComplete={percentComplete}
              />
            )}
          </Form>
        )}
      </Formik>
      <ProcessingModal open={isSubmitModalOpen} onClose={closeSubmitModal} />
    </>
  );
}
