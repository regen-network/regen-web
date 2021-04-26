import React from 'react';
import { Formik, Form, Field } from 'formik';
import { RadioGroup } from 'formik-material-ui';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';
import Toggle from 'web-components/lib/components/inputs/Toggle';
import ControlledFormLabel from 'web-components/lib/components/form/ControlledFormLabel';
import { requiredMessage } from 'web-components/lib/components/inputs/validation';

interface EligibilityFormProps {
  submit: (values: EligibilityValues) => Promise<void>;
}

export interface EligibilityValues {
  includesGrasslands?: boolean;
}

interface EligibilityFormValues {
  includesGrasslands?: string; // Radio always produces a string. We convert back to a Boolean on submit
}

const EligibilityForm: React.FC<EligibilityFormProps> = ({ submit }) => {
  return (
    <Formik
      initialValues={{
        includesGrasslands: '',
      }}
      validate={(values: EligibilityFormValues) => {
        const errors: Partial<EligibilityFormValues> = {};
        const errorFields: Array<keyof EligibilityFormValues> = ['includesGrasslands'];
        errorFields.forEach(value => {
          if (!values[value]) {
            errors[value] = requiredMessage;
          }
        });
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const valuesCleaned = { includesGrasslands: values['includesGrasslands'] === 'true' };
        setSubmitting(true);
        try {
          await submit(valuesCleaned);
          setSubmitting(false);
        } catch (e) {
          setSubmitting(false);
        }
      }}
    >
      {({ submitForm, values }) => {
        return (
          <Form>
            <OnBoardingCard>
              <ControlledFormLabel>Does your project include grasslands?</ControlledFormLabel>
              <Field component={RadioGroup} name="includesGrasslands">
                <Field
                  component={Toggle}
                  type="radio"
                  label="Yes, my project includes grasslands"
                  description="Grassland is defined as land made up of large open areas of grasses and herbaceous vegetation which account for greater than 80% of the total vegetation. Grassland projects are not subjective to intensive management such as tilling, but may include pasturelands where grasses and/or legumes are planted for livestock grazing, and land managed with agroforestry practices."
                  value={true}
                  checked={values['includesGrasslands'] === 'true'}
                />
                <Field
                  component={Toggle}
                  type="radio"
                  label="No, my project does not include grasslands"
                  value={false}
                  checked={values['includesGrasslands'] === 'false'}
                />
              </Field>
            </OnBoardingCard>

            <OnboardingFooter
              onSave={submitForm}
              saveText={'Save and Next'}
              onPrev={() => null} // TODO
              onNext={() => null} // TODO
              hideProgress={false} // TODO
              saveDisabled={false} // TODO
              percentComplete={0} // TODO
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default EligibilityForm;
