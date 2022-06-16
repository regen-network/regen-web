import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { ProcessingModal } from 'web-components/lib/components/modal/ProcessingModal';
import SaveFooter from 'web-components/lib/components/fixed-footer/SaveFooter';

import { useMultiStep } from '../../../../components/templates/MultiStep';

import formModel from '../form-model';
import useCreateBatch from '../useCreateBatch';

import CreditBasics, { CreditBasicsFormValues } from './CreditBasics';
import Recipients, { RecipientsFormValues } from './Recipients';
import Review from './Review';
import Result from './Result';

/**
 *
 * Create Batch Multi-Step Form
 *
 * The form component, responsabilities:
 *     - Formik instance (context)
 *     - Render the corresponding step (view with fields)
 *     - Handle partial submits
 *     - Apply the corresponding validation schema (TODO ? - move to context provider ?)
 */

export type CreateBatchFormValues = CreditBasicsFormValues &
  RecipientsFormValues;

export default function CreateBatchMultiStepForm(): React.ReactElement {
  const {
    data,
    activeStep,
    isLastStep,
    isReviewStep,
    percentComplete,
    handleNext,
    handleSaveNext,
    handleBack,
  } = useMultiStep<CreateBatchFormValues>();

  const {
    status: submitStatus,
    // createBatchResponse,
    deliverTxResponse,
    isSubmitModalOpen,
    error: submitError,
    createBatch,
    closeSubmitModal,
  } = useCreateBatch();

  const currentValidationSchema = isReviewStep
    ? Yup.object(formModel.validationSchemaFields) // all fields
    : formModel.validationSchema[activeStep];

  React.useEffect(() => {
    if (submitStatus === 'finished') {
      handleNext();
      // TODO - if 'success' => clear storage
    }
  }, [submitStatus, handleNext]);

  function handleSubmit(
    values: CreateBatchFormValues,
    formikHelpers: FormikHelpers<CreateBatchFormValues>,
  ): void {
    if (isReviewStep) {
      createBatch(values);
    } else {
      handleSaveNext(values);
      formikHelpers.setTouched({});
      formikHelpers.setSubmitting(false);
    }
  }

  function renderStep(activeStep: number): React.ReactElement {
    switch (activeStep) {
      case 0:
        return <CreditBasics />;
      case 1:
        return <Recipients />;
      case 2:
        return <Review />;
      default:
        return <div>Not Found</div>;
    }
  }

  if (isLastStep && submitStatus === 'finished')
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
            {/* TODO ? - Move to: MultiStepSection >>> >>> StepperSection >>> StepperControls ?? */}
            {!isLastStep && (
              <SaveFooter
                onPrev={activeStep > 0 ? handleBack : undefined}
                onSave={submitForm}
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
