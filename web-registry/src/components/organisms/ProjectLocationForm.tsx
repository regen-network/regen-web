import React from 'react';
import { Formik, Form, Field, FormikErrors } from 'formik';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import { requiredMessage } from 'web-components/lib/components/inputs/validation';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';
import LocationField from 'web-components/lib/components/inputs/LocationField';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';

import { useShaclGraphByUriQuery } from '../../generated/graphql';
import { validate, getProjectPageBaseData } from '../../lib/rdf';

export interface ProjectLocationFormValues {
  'http://schema.org/location': Partial<GeocodeFeature> | string; // the string union is just for formik errors - there is possibly a betteer solution, but this seems easiest for now
}

const ProjectLocationForm: React.FC<{
  mapToken: string;
  submit: (values: ProjectLocationFormValues) => Promise<void>;
  saveAndExit: (values: ProjectLocationFormValues) => Promise<void>;
  initialValues?: ProjectLocationFormValues;
}> = ({ submit, initialValues, mapToken }) => {
  const { data: graphData } = useShaclGraphByUriQuery({
    variables: {
      uri: 'http://regen.network/ProjectPageShape',
    },
  });

  return (
    <Formik
      enableReinitialize
      validateOnMount
      validateOnBlur
      initialValues={{
        'http://schema.org/location': initialValues?.['http://schema.org/location'] || {},
      }}
      validate={async (values: ProjectLocationFormValues) => {
        const errors: FormikErrors<ProjectLocationFormValues> = {};
        if (graphData?.shaclGraphByUri?.graph) {
          const vocabContext = {
            '@context': {
              '@vocab': 'https://purl.org/geojson/vocab#',
              type: '@type',
              coordinates: { '@container': '@list' },
            },
          };

          const projectPageData = { ...getProjectPageBaseData(), ...vocabContext, ...values };

          const report = await validate(
            graphData.shaclGraphByUri.graph,
            projectPageData,
            'http://regen.network/ProjectPageLocationGroup',
          );

          for (const result of report.results) {
            const path: keyof ProjectLocationFormValues = result.path.value;
            errors[path] = requiredMessage;
          }
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          await submit(values);
          setSubmitting(false);
        } catch (e) {
          setSubmitting(false);
        }
      }}
    >
      {({ submitForm, isValid, isSubmitting }) => {
        return (
          <Form>
            <OnBoardingCard>
              <Field
                component={LocationField}
                label="Location"
                description="Type an address or latitude/longitude coordinates. This is the location that will appear in the project contracts, and on your project page."
                placeholder="Start typing the location"
                name="['http://schema.org/location']"
                token={mapToken}
              />
            </OnBoardingCard>
            <OnboardingFooter
              saveText={'Save and Next'}
              onSave={submitForm}
              onPrev={() => null} // TODO https://github.com/regen-network/regen-web/issues/655
              onNext={() => null} // TODO https://github.com/regen-network/regen-web/issues/655
              hideProgress={false} // TODO
              saveDisabled={!isValid || isSubmitting}
              percentComplete={0} // TODO
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export { ProjectLocationForm };
