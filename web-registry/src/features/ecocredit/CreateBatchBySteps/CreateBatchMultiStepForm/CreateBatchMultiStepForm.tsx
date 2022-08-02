import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { ProcessingModal } from 'web-components/lib/components/modal/ProcessingModal';
import SaveFooter from 'web-components/lib/components/fixed-footer/SaveFooter';
import { Option } from 'web-components/lib/components/inputs/SelectTextField';

import { useMultiStep } from 'components/templates/MultiStepTemplate';

import formModel from '../form-model';
import useCreateBatch from '../useCreateBatch';

import CreditBasics, { CreditBasicsFormValues } from './CreditBasics';
import Recipients, { RecipientsFormValues } from './Recipients';
import Review from './Review';
import Result from './Result';
import NotFound from 'web-components/lib/components/not-found';
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
  } = useCreateBatch();

  const currentValidationSchema = isReviewStep
    ? Yup.object(formModel.validationSchemaFields) // all fields
    : formModel.validationSchema[activeStep];

  const [creditClassSelected, setCreditClassSelected] =
    React.useState<Option>();
  const [projectSelected, setProjectSelected] = React.useState<Option>();

  React.useEffect(() => {
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
      if (creditClassSelected && projectSelected) {
        dataDisplay = {
          creditClass: creditClassSelected,
          project: projectSelected,
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
          <CreditBasics
            saveCreditClassSelected={setCreditClassSelected}
            saveProjectSelected={setProjectSelected}
          />
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
