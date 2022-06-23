import React from 'react';
import { Formik, FormikErrors, FormikHelpers, Form, Field } from 'formik';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import { requiredMessage } from 'web-components/lib/components/inputs/validation';

import { useProjectEditContext } from '../../pages/ProjectEdit';
import { ProjectPageFooter } from '../molecules';
import { ShaclGraphByUriQuery } from '../../generated/graphql';
import {
  validate,
  getProjectPageBaseData,
  getCompactedPath,
} from '../../lib/rdf';

interface DescriptionFormProps {
  submit: (values: DescriptionValues) => Promise<void>;
  onNext?: () => void;
  onPrev?: () => void;
  initialValues?: DescriptionValues;
  graphData?: ShaclGraphByUriQuery;
}

export interface DescriptionValues {
  'schema:description'?: string;
}

const DescriptionForm = ({
  submit,
  initialValues,
  graphData,
  ...props
}: DescriptionFormProps): JSX.Element => {
  const { confirmSave, isEdit } = useProjectEditContext();

  const validateForm = async (
    values: DescriptionValues,
  ): Promise<FormikErrors<DescriptionValues>> => {
    const errors: FormikErrors<DescriptionValues> = {};
    if (graphData?.shaclGraphByUri?.graph) {
      const projectPageData = { ...getProjectPageBaseData(), ...values };
      const report = await validate(
        graphData.shaclGraphByUri.graph,
        projectPageData,
        'http://regen.network/ProjectPageDescriptionGroup',
      );
      for (const result of report.results) {
        const path: string = result.path.value;
        const compactedPath = getCompactedPath(path) as
          | keyof DescriptionValues
          | undefined;
        if (compactedPath) {
          errors[compactedPath] = requiredMessage;
        }
      }
    }
    return errors;
  };

  const onSubmit = async (
    values: DescriptionValues,
    { setSubmitting, setTouched }: FormikHelpers<DescriptionValues>,
  ): Promise<void> => {
    setSubmitting(true);
    try {
      await submit(values);
      setSubmitting(false);
      setTouched({}); // reset to untouched
      if (isEdit && confirmSave) confirmSave();
    } catch (e) {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      enableReinitialize
      validateOnMount
      initialValues={
        initialValues || {
          'schema:description':
            initialValues?.['schema:description'] || undefined,
        }
      }
      validate={validateForm}
      onSubmit={onSubmit}
    >
      {({ submitForm, isValid, isSubmitting, touched }) => {
        return (
          <Form translate="yes">
            <OnBoardingCard>
              <Field
                charLimit={600}
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

export { DescriptionForm };
