import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Formik } from 'formik';

import SaveFooter from 'web-components/src/components/fixed-footer/SaveFooter';
import NotFound from 'web-components/src/components/views/NotFoundView';

import {
  PAGE_NOT_FOUND_BODY,
  PAGE_NOT_FOUND_BUTTON,
  PAGE_NOT_FOUND_TITLE,
  SAVE_EXIT_TEXT,
  SAVE_TEXT,
} from 'lib/constants/shared.constants';
import { TranslatorType } from 'lib/i18n/i18n.types';

import { useMultiStep } from 'components/templates/MultiStepTemplate';

import { mockClassId, mockTxHash } from './CreditClass.mocks';
import { CreditClassFinished } from './CreditClassFinished';
import type { CreditClassValues } from './CreditClassForm';
import { CreditClassForm } from './CreditClassForm';
import { CreditClassReview } from './CreditClassReview';

export const getCreateCreditClassSteps = (_: TranslatorType) => [
  {
    id: 'create-credit-class',
    name: _(msg`Create Credit Class`),
    title: _(msg`Create Credit Class`),
  },
  {
    // TODO: ID probably isn't needed on the next two, as they aren't stored in
    // localstorage?
    id: '',
    name: _(msg`Review`),
    title: _(msg`Review`),
  },
  {
    id: '',
    name: _(msg`Finished`),
    title: _(msg`Finished`),
  },
];

const CurrentStep = (props: {
  activeStep: number;
  disabledFields: string[];
}): JSX.Element => {
  const { _ } = useLingui();

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
      return (
        <NotFound
          title={_(PAGE_NOT_FOUND_TITLE)}
          bodyText={_(PAGE_NOT_FOUND_BODY)}
          buttonChildren={PAGE_NOT_FOUND_BUTTON}
        />
      );
  }
};

/** must be used within a `MultiStep` context  */
export const CreateCreditClassForm = (props: {
  onSubmit: (values: CreditClassValues) => void;
}): JSX.Element => {
  const { _ } = useLingui();

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
              saveExitText={_(SAVE_EXIT_TEXT)}
              saveText={_(SAVE_TEXT)}
            />
          )}
        </>
      )}
    </Formik>
  );
};
