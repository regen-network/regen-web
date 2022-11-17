import React from 'react';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { Field, Form, Formik, FormikErrors } from 'formik';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import LocationField from 'web-components/lib/components/inputs/LocationField';
import { requiredMessage } from 'web-components/lib/components/inputs/validation';

import { useShaclGraphByUriQuery } from '../../generated/graphql';
import {
  getCompactedPath,
  getProjectPageBaseData,
  validate,
} from '../../lib/rdf';
import { useProjectEditContext } from '../../pages/ProjectEdit';
import { ProjectPageFooter } from '../molecules';

export interface ProjectLocationFormValues {
  'schema:location': Partial<GeocodeFeature>;
}

const ProjectLocationForm: React.FC<
  React.PropsWithChildren<{
    mapToken: string;
    submit: (values: ProjectLocationFormValues) => Promise<void>;
    saveAndExit: (values: ProjectLocationFormValues) => Promise<void>;
    initialValues?: ProjectLocationFormValues;
    onNext?: () => void;
    onPrev?: () => void;
  }>
> = ({ submit, initialValues, mapToken, ...props }) => {
  const { confirmSave, isEdit } = useProjectEditContext();
  const { data: graphData } = useShaclGraphByUriQuery({
    variables: {
      uri: 'http://regen.network/ProjectPageShape',
    },
  });

  return (
    <Formik
      enableReinitialize
      initialValues={{
        'schema:location': initialValues?.['schema:location'] || {},
      }}
      validate={async (values: ProjectLocationFormValues) => {
        const errors: FormikErrors<
          ProjectLocationFormValues | { [path: string]: string }
        > = {};
        if (graphData?.shaclGraphByUri?.graph) {
          const projectPageData = { ...getProjectPageBaseData(), ...values };
          const report = await validate(
            graphData.shaclGraphByUri.graph,
            projectPageData,
            'http://regen.network/ProjectPageLocationGroup',
          );

          for (const result of report.results) {
            const path: string = result.path.value;
            const compactedPath = getCompactedPath(path) as
              | keyof ProjectLocationFormValues
              | undefined;
            if (compactedPath) errors[compactedPath] = requiredMessage;
          }
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting, setTouched }) => {
        setSubmitting(true);
        try {
          await submit(values);
          setSubmitting(false);
          setTouched({}); // reset to untouched
          if (isEdit && confirmSave) confirmSave();
        } catch (e) {
          setSubmitting(false);
        }
      }}
    >
      {({ submitForm, isValid, isSubmitting, touched, dirty }) => {
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
              saveDisabled={
                !isValid ||
                isSubmitting ||
                !dirty ||
                !Object.keys(touched).length
              }
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export { ProjectLocationForm };
