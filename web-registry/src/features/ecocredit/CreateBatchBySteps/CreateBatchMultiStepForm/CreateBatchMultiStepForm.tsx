/* eslint-disable no-console */
import React from 'react';
import { Formik, Form } from 'formik';

import formModel from '../form-model';
import { useMultiStep } from '../../../../components/templates/MultiStep';

import CreditBasics, { CreditBasicsFormValues } from './CreditBasics';
import Recipients, { RecipientsFormValues } from './Recipients';
import Review from './Review';
import Result from './Result';

import SaveFooter from 'web-components/lib/components/fixed-footer/SaveFooter';

/**
 *
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

type CreateBatchFormValues = CreditBasicsFormValues & RecipientsFormValues;

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
  // TODO - Move saveData to multi-step provider
  const {
    steps,
    data,
    // saveData,
    activeStep,
    isLastStep,
    isReviewStep,
    handleNext,
    handleSaveNext,
    handleBack,
  } = useMultiStep<CreateBatchFormValues>();

  const currentValidationSchema = formModel.validationSchema[activeStep];

  // TODO: Formik Actions type
  async function submitForm(
    values: CreateBatchFormValues,
    actions: any,
  ): Promise<void> {
    try {
      // TODO: useMsgClient
      await handleTx(values);
      actions.setSubmitting(false);
      handleNext();
    } catch (err) {
      console.error(err);
    }
  }

  function handleSubmit(values: CreateBatchFormValues, actions: any): void {
    if (isReviewStep) {
      console.log('SUBMIT: Step 1 - Open Keplr Wallet');
      submitForm(values, actions);
    } else {
      console.log(`SAVE STEP: ${activeStep} - Save in <Session|Local>Storage`);
      handleSaveNext(values);
      actions.setTouched({});
      actions.setSubmitting(false);
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
      validateOnMount
      initialValues={data}
      validationSchema={currentValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ submitForm, isValid, isSubmitting, touched, values, errors }) => (
        <Form id={formModel.formId}>
          {JSON.stringify(data, null, 4)}

          {renderStep(activeStep)}

          {/* TODO - Move to: MultiStepSection >>> StepperSection >>> StepperControls  */}
          {!isLastStep && (
            <SaveFooter
              onPrev={activeStep > 0 ? handleBack : undefined}
              onNext={handleNext} // TODO - remove/disable
              onSave={submitForm}
              saveDisabled={!isValid || isSubmitting} // || !Object.keys(touched).length
              percentComplete={steps?.[activeStep].percentage || 0}
            />
          )}
        </Form>
      )}
    </Formik>
  );
}
