import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import React from 'react';
import { useLingui } from '@lingui/react';
import { Field, Form, Formik } from 'formik';
import { RadioGroup } from 'formik-mui';

import OnBoardingCard from 'web-components/src/components/cards/OnBoardingCard';
import ControlledFormLabel from 'web-components/src/components/form/ControlledFormLabel';
import Toggle from 'web-components/src/components/inputs/Toggle';

import { REQUIRED_MESSAGE } from 'lib/constants/shared.constants';

interface IncludesGrasslandsFormProps {
  submit: (values: IncludesGrasslandsValues) => Promise<void>;
}

export interface IncludesGrasslandsValues {
  includesGrasslands?: boolean;
}

interface IncludesGrasslandsFormValues {
  includesGrasslands?: string; // Radio always produces a string. We convert back to a Boolean on submit
}

export const IncludesGrasslandsForm: React.FC<
  React.PropsWithChildren<IncludesGrasslandsFormProps>
> = ({ submit }) => {
  const { _ } = useLingui();

  return (
    <Formik
      initialValues={{
        includesGrasslands: '',
      }}
      validate={(values: IncludesGrasslandsFormValues) => {
        const errors: Partial<IncludesGrasslandsFormValues> = {};
        const errorFields: Array<keyof IncludesGrasslandsFormValues> = [
          'includesGrasslands',
        ];
        errorFields.forEach(value => {
          if (!values[value]) {
            errors[value] = _(REQUIRED_MESSAGE);
          }
        });
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const valuesCleaned = {
          includesGrasslands: values['includesGrasslands'] === 'true',
        };
        setSubmitting(true);
        try {
          await submit(valuesCleaned);
          setSubmitting(false);
        } catch (e) {
          setSubmitting(false);
        }
      }}
    >
      {({ values }) => {
        return (
          <Form>
            <OnBoardingCard>
              <ControlledFormLabel>
                <Trans>Does your project include grasslands?</Trans>
              </ControlledFormLabel>
              <Field component={RadioGroup} name="includesGrasslands">
                <Field
                  component={Toggle}
                  type="radio"
                  label={_(msg`Yes, my project includes grasslands`)}
                  description={_(
                    msg`Grassland is defined as land made up of large open areas of grasses and herbaceous vegetation which account for greater than 80% of the total vegetation. Grassland projects are not subjective to intensive management such as tilling, but may include pasturelands where grasses and/or legumes are planted for livestock grazing, and land managed with agroforestry practices.`,
                  )}
                  value={true}
                  checked={values['includesGrasslands'] === 'true'}
                />
                <Field
                  component={Toggle}
                  type="radio"
                  label={_(msg`No, my project does not include grasslands`)}
                  value={false}
                  checked={values['includesGrasslands'] === 'false'}
                />
              </Field>
            </OnBoardingCard>
          </Form>
        );
      }}
    </Formik>
  );
};
