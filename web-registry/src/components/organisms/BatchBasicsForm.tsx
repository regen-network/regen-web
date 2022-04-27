import React from 'react';
import { Formik, Form, Field, FormikErrors } from 'formik';

import { Theme } from 'web-components/lib/theme/muiTheme';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import InputLabel from 'web-components/lib/components/inputs/InputLabel';
import TextField from 'web-components/lib/components/inputs/TextField';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import SelectTextField from 'web-components/lib/components/inputs/SelectTextField';
import { requiredMessage } from 'web-components/lib/components/inputs/validation';
import { validate } from '../../lib/rdf';
import { ProjectPageFooter } from '../molecules';

export interface BatchBasicsFormValues {
  creditClass?: string;
  retirementSerialNumber?: string;
}

const BatchBasicsForm: React.FC<{
  submit: (values: BatchBasicsFormValues) => Promise<void>;
  initialValues?: BatchBasicsFormValues;
}> = ({ submit, initialValues }) => {
  return (
    <Formik
      enableReinitialize
      validateOnMount
      initialValues={{ creditClass: '', retirementSerialNumber: '' }}
      // validate={}
      onSubmit={async (values, { setSubmitting, setTouched }) => {
        setSubmitting(true);
        try {
          await submit(values);
          setSubmitting(false);
          // setTouched({}); // reset to untouched
          // if (isEdit && confirmSave) confirmSave();
        } catch (e) {
          setSubmitting(false);
        }
      }}
    >
      {({
        submitForm,
        submitCount,
        isValid,
        isSubmitting,
        touched,
        values,
      }) => {
        console.log('values', values);
        return (
          <Form>
            <OnBoardingCard>
              <Field
                name="creditClass"
                label="Credit Class"
                component={SelectTextField}
                default={''}
                options={[
                  { value: '', label: 'Select Credit Class' }, //TODO: should be a better way
                  { value: 'C01', label: 'Verified Carbon Standard (C01)' },
                ]}
              />
              {values?.creditClass === 'C01' && (
                <Field
                  name="retirementSerialNumber"
                  label="VCS retirement serial number"
                  component={TextField}
                />
              )}
            </OnBoardingCard>
            <ProjectPageFooter
              onSave={submitForm}
              saveDisabled={
                !isValid || isSubmitting || !Object.keys(touched).length
              }
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export { BatchBasicsForm };
