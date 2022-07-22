import { Formik } from 'formik';

import SaveFooter from 'web-components/lib/components/fixed-footer/SaveFooter';
import NotFound from 'web-components/lib/components/not-found';

import { useMultiStep } from 'components/templates/MultiStepTemplate';

import { mockClassId, mockTxHash } from './CreditClass.mocks';
import { CreditClassFinished } from './CreditClassFinished';
import type { CreditClassValues } from './CreditClassForm';
import { CreditClassForm } from './CreditClassForm';
import { CreditClassReview } from './CreditClassReview';
import RotationalGrazing from 'assets/rotational-grazing.png';

export const createCreditClassSteps = [
  {
    id: 'create-credit-class',
    name: 'Create Credit Class',
    title: 'Create Credit Class',
  },
  {
    // TODO: ID probably isn't needed on the next two, as they aren't stored in
    // localstorage?
    id: '',
    name: 'Review',
    title: 'Review',
  },
  {
    id: '',
    name: 'Finished',
    title: 'Finished',
  },
];

const CurrentStep = (props: {
  activeStep: number;
  disabledFields: string[];
}): JSX.Element => {
  switch (props.activeStep) {
    case 0:
      return (
        <CreditClassForm
          id="create-credit-class"
          disabledFields={props.disabledFields}
        />
      );
    case 1:
      return <CreditClassReview />;
    case 2:
      return <CreditClassFinished hash={mockTxHash} classId={mockClassId} />;
    default:
      return <NotFound img={<img alt="home" src={RotationalGrazing} />} />;
  }
};

/** must be used within a `MultiStep` context  */
export const CreateCreditClassForm = (props: {
  onSubmit: (values: CreditClassValues) => void;
}): JSX.Element => {
  const {
    data,
    percentComplete,
    activeStep,
    handleBack,
    handleNext,
    isLastStep,
  } = useMultiStep<CreditClassValues>();

  // TODO we probably want to compute these dynamically once we hook up data
  const disabledFields = ['admin', 'fee'];

  return (
    <Formik
      enableReinitialize
      validateOnMount
      initialValues={data}
      // validationSchema={validationSchema} // TODO
      onSubmit={props.onSubmit}
    >
      {({ submitForm, isValid, isSubmitting }) => (
        <>
          <CurrentStep
            activeStep={activeStep}
            disabledFields={disabledFields}
          />
          {!isLastStep && (
            <SaveFooter
              onPrev={activeStep > 0 ? handleBack : undefined}
              onSave={handleNext} // TODO this should handle submission
              saveDisabled={!isValid || isSubmitting}
              percentComplete={percentComplete}
            />
          )}
        </>
      )}
    </Formik>
  );
};
