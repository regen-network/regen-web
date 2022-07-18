import { Formik } from 'formik';

import SaveFooter from 'web-components/lib/components/fixed-footer/SaveFooter';
import NotFound from 'web-components/lib/components/not-found';
import RotationalGrazing from 'assets/rotational-grazing.png';

import { useMultiStep } from 'components/templates/MultiStepTemplate';
import { CreditClassForm } from './CreditClassForm';
import type { CreditClassValues } from './CreditClassForm';
import { ReviewCreditClass } from './ReviewCreditClass';

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

  const disabledFields: string[] = [];
  if (!!data.admin.length) disabledFields.push('admin');
  if (!!data.fee.length) disabledFields.push('fee');

  const CurrentStep = (): React.ReactElement => {
    switch (activeStep) {
      case 0:
        return (
          <CreditClassForm
            id="create-credit-class"
            disabledFields={disabledFields}
          />
        );
      case 1:
        return <ReviewCreditClass />;
      case 2:
        return <ReviewCreditClass />;
      default:
        return <NotFound img={<img alt="home" src={RotationalGrazing} />} />;
    }
  };

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
          <CurrentStep />
          {!isLastStep && (
            <SaveFooter
              onPrev={activeStep > 0 ? handleBack : undefined}
              onSave={activeStep === 1 ? submitForm : handleNext}
              saveDisabled={!isValid || isSubmitting}
              percentComplete={percentComplete}
            />
          )}
        </>
      )}
    </Formik>
  );
};
