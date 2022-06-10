import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import formModel from '../form-model';
import { useMultiStep } from '../../../../components/templates/MultiStep';

import CreditBasics, { CreditBasicsFormValues } from './CreditBasics';
import Recipients, { RecipientsFormValues } from './Recipients';
import Review from './Review';
import Result from './Result';

import SaveFooter from 'web-components/lib/components/fixed-footer/SaveFooter';

/**
 * Mocked submit process (2 steps: Post + Msg)
 */

const handleTx = async (values: CreateBatchFormValues): Promise<void> => {
  function _sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  alert(JSON.stringify(values, null, 2));
  return await _sleep(1000);
};

/**
 *
 */

export type CreateBatchFormValues = CreditBasicsFormValues &
  RecipientsFormValues;

/**
 *
 * Create Batch Multi-Step Form
 *
 * The form component, responsabilities:
 *     - Formik instance (context)
 *     - Render the corresponding step (view with fields)
 *     - Apply the corresponding validation schema
 *     - Handle partial submits
 */

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

  const currentValidationSchema = isReviewStep
    ? Yup.object(formModel.validationSchemaFields) // all fields
    : formModel.validationSchema[activeStep];

  async function submitForm(
    values: CreateBatchFormValues,
    formikHelpers: FormikHelpers<CreateBatchFormValues>,
  ): Promise<void> {
    try {
      await handleTx(values);
      formikHelpers.setSubmitting(false);
      // TODO - clear storage
      handleNext();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  function handleSubmit(
    values: CreateBatchFormValues,
    formikHelpers: FormikHelpers<CreateBatchFormValues>,
  ): void | Promise<any> {
    if (isReviewStep) {
      submitForm(values, formikHelpers);
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

  if (isLastStep) return <Result />;

  return (
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
          {/* TODO ? - Move to: MultiStepSection >>> StepperSection >>> StepperControls ?? */}
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
  );
}
