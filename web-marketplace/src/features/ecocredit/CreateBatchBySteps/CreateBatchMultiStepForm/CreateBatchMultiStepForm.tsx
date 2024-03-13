import React, { useEffect, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import SaveFooter from 'web-components/src/components/fixed-footer/SaveFooter';
import { Option } from 'web-components/src/components/inputs/SelectTextField';
import { ProcessingModal } from 'web-components/src/components/modal/ProcessingModal';
import NotFound from 'web-components/src/components/views/NotFoundView';

import { useMultiStep } from 'components/templates/MultiStepTemplate';

import formModel from '../form-model';
import useCreateBatchSubmit from '../hooks/useCreateBatchSubmit';
import CreditBasics, { CreditBasicsFormValues } from './CreditBasics';
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
        return <Recipients />;
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
                saveText={activeStep === 2 ? 'submit' : undefined}
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
