import React from 'react';
import { Form, Formik, Field } from 'formik';

import ControlledTextField from '../inputs/ControlledTextField';
import ImageField from '../inputs/ImageField';
import { requiredMessage } from '../inputs/validation';
import OnBoardingCard from '../cards/OnBoardingCard';
import LocationField from '../inputs/LocationField';
import OnboardingFooter from '../fixed-footer/OnboardingFooter';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';

interface FormProps {
  submit: (values: OrgProfileFormValues) => Promise<void>;
  goBack: () => void;
  skip: () => void;
  initialValues?: OrgProfileFormValues;
  mapToken: string;
}

export interface OrgProfileFormValues {
  description?: string;
  displayName: string;
  legalName: string;
  location: GeocodeFeature;
  logo: string;
}

const OrganizationProfileForm: React.FC<FormProps> = props => {
  return (
    <Formik
      enableReinitialize
      initialValues={
        props.initialValues || {
          description: '',
          displayName: '',
          legalName: '',
          location: {
            place_name: '',
          } as GeocodeFeature,
          logo: '',
        }
      }
      validate={(values: OrgProfileFormValues) => {
        const errors: { [key: string]: any } = {};
        const errorFields: Array<keyof OrgProfileFormValues> = [
          'displayName',
          'legalName',
          'location',
          'logo',
        ];
        errorFields.forEach(value => {
          if (!values[value]) {
            errors[value] = requiredMessage;
          }
        });
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          await props.submit(values);
          setSubmitting(false);
        } catch (e) {
          setSubmitting(false);
        }
      }}
    >
      {({ submitForm, isSubmitting, isValid, submitCount }) => {
        return (
          <Form>
            <OnBoardingCard>
              <Field
                component={ControlledTextField}
                description="This is the name of your farm, ranch, cooperative, non-profit, or other organization."
                label="Organization legal name"
                name="legalName"
                placeholder="i.e. Cherrybrook Farms LLC"
              />
              <Field
                component={ControlledTextField}
                description="This is the display name on your project page, if you choose to make this entity publically viewable."
                label="Display name for organization"
                name="displayName"
                placeholder="i.e. Cherrybrook Farms"
              />
              <Field
                component={LocationField}
                description="This address is used for issuing credits.  If you choose to show this entity on the project page, only city, state/province, and country will be displayed. "
                label="Organization location"
                name="location"
                placeholder="Start typing the location"
                token={props.mapToken}
              />
              <Field
                component={ImageField}
                label="Organization logo"
                name="logo"
              />
              <Field
                charLimit={160}
                component={ControlledTextField}
                label="Short organization description"
                name="description"
                rows={3}
                minRows={3}
                multiline
                optional
              />
            </OnBoardingCard>

            <OnboardingFooter
              onSave={submitForm}
              saveText={'Save and Next'}
              onPrev={props.goBack} // TODO
              onNext={props.skip} // TODO
              hideProgress={false} // TODO
              saveDisabled={(submitCount > 0 && !isValid) || isSubmitting} // TODO
              percentComplete={0} // TODO
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default OrganizationProfileForm;
