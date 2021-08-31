import React from 'react';
import { Formik, Form, Field, FormikErrors } from 'formik';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import { requiredMessage } from 'web-components/lib/components/inputs/validation';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';
import LocationField from 'web-components/lib/components/inputs/LocationField';

import { useShaclGraphByUriQuery } from '../../generated/graphql';
import { validate, getProjectPageBaseData } from '../../lib/rdf';

export interface ProjectLocationFormValues {
  'http://regen.network/location': string;
}

const ProjectLocationForm: React.FC<{
  mapToken: string;
  submit: (values: ProjectLocationFormValues) => Promise<void>;
  initialValues?: ProjectLocationFormValues;
}> = ({ submit, initialValues, mapToken }) => {
  const { data: graphData } = useShaclGraphByUriQuery({
    variables: {
      uri: 'http://regen.network/location',
    },
  });

  return (
    <Formik
      enableReinitialize
      validateOnMount
      initialValues={{
        'http://regen.network/location': initialValues?.['http://regen.network/location'] || '',
      }}
      validate={async (values: ProjectLocationFormValues) => {
        const errors: FormikErrors<ProjectLocationFormValues> = {};
        if (graphData?.shaclGraphByUri?.graph) {
          const projectPageData = { ...getProjectPageBaseData(), ...values };
          const report = await validate(
            graphData.shaclGraphByUri.graph,
            projectPageData,
            'http://regen.network/location',
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
                name="['http://regen.network/location']"
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
