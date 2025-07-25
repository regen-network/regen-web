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
  PAGE_NOT_FOUND_BODY,
  PAGE_NOT_FOUND_BUTTON,
  PAGE_NOT_FOUND_TITLE,
  PROCESSING_MODAL_BODY,
  PROCESSING_MODAL_TITLE,
  REQUIRED_MESSAGE,
  RETIREMENT_INFO_TEXT,
  SAVE_EXIT_TEXT,
  SAVE_TEXT,
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

export type CreateBatchFormValues = CreditBasicsFormValues &
  RecipientsFormValues;

/**
 *
 * Core form component for the create credit batches flow.
 * Handles the multi-step flow: credit basics, recipients,
 * and final review/submission.
 *
 * The form component, responsabilities:
 * - Formik instance (context)
 * - Render the corresponding step (view with fields)
 * - Handle partial submits
 * - Apply the corresponding validation schema
 */

export default function CreateBatchMultiStepForm(): React.ReactElement {
  const { _ } = useLingui();

  /**
   * TODO: We should consider refactoring this to get isPastDateTest, vcsMetadataSchema,
   * JSONSchema and potentially formModel as props from the parent component (CreateBatchBySteps).
   * This will reduce redundancy and ensure a single source of truth for these values.
   */
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

  const {
    status: submitStatus,
    deliverTxResponse,
    isSubmitModalOpen,
    error: submitError,
    createBatch,
    closeSubmitModal,
  } = useCreateBatchSubmit();

  const currentValidationSchema = isReviewStep
    ? Yup.object(formModel.validationSchemaFields)
    : formModel.validationSchema[activeStep];

  const [projectOptionSelected, setProjectOptionSelected] = useState<Option>();

  // Provides localized form text
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
      // We need to update the multi-step context with
      // additional data for the review step.
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
        return (
          <NotFound
            title={_(PAGE_NOT_FOUND_TITLE)}
            bodyText={_(PAGE_NOT_FOUND_BODY)}
            buttonChildren={PAGE_NOT_FOUND_BUTTON}
          />
        );
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
                saveText={activeStep === 2 ? _(SUBMIT_TEXT) : _(SAVE_TEXT)}
                saveExitText={activeStep === 2 ? _(SAVE_EXIT_TEXT) : ''}
                saveDisabled={!isValid || isSubmitting}
                percentComplete={percentComplete}
              />
            )}
          </Form>
        )}
      </Formik>
      <ProcessingModal
        open={isSubmitModalOpen}
        onClose={closeSubmitModal}
        title={_(PROCESSING_MODAL_TITLE)}
        bodyText={_(PROCESSING_MODAL_BODY)}
      />
    </>
  );
}
