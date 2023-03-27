import React from 'react';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { Field, Form, Formik } from 'formik';
import isEmpty from 'lodash/isEmpty';
import * as Yup from 'yup';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import LocationField from 'web-components/lib/components/inputs/LocationField';
import { requiredMessage } from 'web-components/lib/components/inputs/validation';

import { useProjectEditContext } from 'pages';
import { FormRef } from 'pages/ProjectEdit/ProjectEdit.types';

import { ProjectPageFooter } from '../molecules';

export interface ProjectLocationFormValues {
  'schema:location': Partial<GeocodeFeature>;
}

const ProjectLocationFormSchema = Yup.object().shape({
  'schema:location': Yup.object()
    // before the user selects the location, the value is a string,
    // but we don't want to show yup default type error message
    .typeError('')
    .test('is-not-empty', requiredMessage, value => !isEmpty(value))
    .required(requiredMessage),
});

const ProjectLocationForm: React.FC<
  React.PropsWithChildren<{
    mapToken: string;
    submit: ({
      values,
    }: {
      values: ProjectLocationFormValues;
    }) => Promise<void>;
    saveAndExit: (values: ProjectLocationFormValues) => Promise<void>;
    initialValues?: ProjectLocationFormValues;
    onNext?: () => void;
    onPrev?: () => void;
  }>
> = ({ submit, initialValues, mapToken, ...props }) => {
  const { confirmSave, isEdit, formRef } = useProjectEditContext();

  return (
    <Formik
      innerRef={formRef as FormRef<ProjectLocationFormValues>}
      enableReinitialize
      initialValues={{
        'schema:location': initialValues?.['schema:location'] || {},
      }}
      validateOnMount
      validationSchema={ProjectLocationFormSchema}
      onSubmit={async (values, { setTouched }) => {
        await submit({ values });
        setTouched({}); // reset to untouched
        if (isEdit && confirmSave) confirmSave();
      }}
    >
      {({ submitForm, isValid, isSubmitting, dirty }) => {
        return (
          <Form>
            <OnBoardingCard>
              <Field
                component={LocationField}
                label="Location"
                description="Type an address or latitude/longitude coordinates. This is the location that will appear in the project contracts, and on your project page."
                placeholder="Start typing the location"
                name="schema:location"
                token={mapToken}
              />
            </OnBoardingCard>
            <ProjectPageFooter
              onSave={submitForm}
              onPrev={props.onPrev}
              onNext={props.onNext}
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

export { ProjectLocationForm };
