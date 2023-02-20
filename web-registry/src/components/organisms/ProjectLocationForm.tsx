import React from 'react';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { Field, Form, Formik, FormikErrors } from 'formik';
import * as Yup from 'yup';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import LocationField from 'web-components/lib/components/inputs/LocationField';
import { requiredMessage } from 'web-components/lib/components/inputs/validation';

import { getCompactedPath, getProjectBaseData, validate } from 'lib/rdf';

import { useProjectEditContext } from 'pages';

import { ProjectPageFooter } from '../molecules';

export interface ProjectLocationFormValues {
  'schema:location': Partial<GeocodeFeature>;
}

const ProjectLocationFormSchema = Yup.object().shape({
  'schema:location': Yup.object().required(requiredMessage),
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
  const { confirmSave, isEdit } = useProjectEditContext();

  return (
    <Formik
      enableReinitialize
      initialValues={{
        'schema:location': initialValues?.['schema:location'] || {},
      }}
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
