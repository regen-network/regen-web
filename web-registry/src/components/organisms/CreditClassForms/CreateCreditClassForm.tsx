import { Formik } from 'formik';

import SaveFooter from 'web-components/lib/components/fixed-footer/SaveFooter';

import { useMultiStep } from 'components/templates/MultiStepTemplate';
import { CreditClassForm } from './CreditClassForm';
import type { CreditClassValues } from './CreditClassForm';

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
  const { data, percentComplete, activeStep, handleBack, isLastStep } =
    useMultiStep<CreditClassValues>();

  const disabledFields: string[] = [];
  if (!!data.admin.length) disabledFields.push('admin');
  if (!!data.fee.length) disabledFields.push('fee');

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
          <CreditClassForm
            id="create-credit-class"
            disabledFields={disabledFields}
          />
          {!isLastStep && (
            <SaveFooter
              onPrev={activeStep > 0 ? handleBack : undefined}
              onSave={submitForm}
              saveDisabled={!isValid || isSubmitting}
              percentComplete={percentComplete}
            />
          )}
        </>
      )}
    </Formik>
  );
};
