import React from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';

import { FormRef } from 'pages/ProjectEdit/ProjectEdit.types';

import { useProjectEditContext } from '../../../pages/ProjectEdit';
import { ProjectPageFooter } from '../../molecules';
import { DESCRIPTION_MAX_LENGTH } from './DescriptionForm.constants';

interface DescriptionFormProps {
  submit: ({ values }: { values: DescriptionFormValues }) => Promise<void>;
  onNext?: () => void;
  onPrev?: () => void;
  initialValues?: DescriptionFormValues;
}

export interface DescriptionFormValues {
  'schema:description'?: string;
}

const DescriptionFormSchema = Yup.object().shape({
  'schema:description': Yup.string().max(DESCRIPTION_MAX_LENGTH),
});

const DescriptionForm = ({
  submit,
  initialValues,
  ...props
}: DescriptionFormProps): JSX.Element => {
  const { confirmSave, isEdit, formRef } = useProjectEditContext();

  const onSubmit = async (
    values: DescriptionFormValues,
    { setSubmitting, setTouched }: FormikHelpers<DescriptionFormValues>,
  ): Promise<void> => {
    try {
      await submit({ values });
      setTouched({}); // reset to untouched
      if (isEdit && confirmSave) confirmSave();
    } catch (e) {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      innerRef={formRef as FormRef<DescriptionFormValues>}
      enableReinitialize
      validateOnMount
      initialValues={
        initialValues || {
          'schema:description':
            initialValues?.['schema:description'] || undefined,
        }
      }
      validationSchema={DescriptionFormSchema}
      onSubmit={onSubmit}
    >
      {({ submitForm, isValid, isSubmitting, dirty }) => {
        return (
          <Form translate="yes">
            <OnBoardingCard>
              <Field
                charLimit={DESCRIPTION_MAX_LENGTH}
                component={ControlledTextField}
                label="Project description"
                description="Describe the story of this property."
                name="schema:description"
                rows={5}
                multiline
                optional
              />
            </OnBoardingCard>
            <ProjectPageFooter
              onSave={submitForm}
              onNext={props.onNext}
              onPrev={props.onPrev}
              isValid={isValid}
              isSubmitting={isSubmitting}
              dirty={dirty}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export { DescriptionForm };
