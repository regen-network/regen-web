import React from 'react';
import { Formik, Form, Field } from 'formik';
import { RadioGroup } from 'formik-material-ui';
import { makeStyles, Theme } from '@material-ui/core/styles';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';
import Toggle from 'web-components/lib/components/inputs/Toggle';
import ControlledFormLabel from 'web-components/lib/components/form/ControlledFormLabel';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import { requiredMessage } from 'web-components/lib/components/inputs/validation';

interface AdditionalityFormProps {
  submit: (values: AdditionalityValues) => Promise<void>;
}

export interface AdditionalityValues {
  rotationalGrazing: string;
  highDensityGrazing: string;
  residueGrazing: string;
  otherGrazing: string;
  traditionalGrazing: string;
  cropland: string;
  naturalEcosystem: string;
  environmentalConditions: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),

    '&:first-of-type': {
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(9),
      },
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(6.5),
      },
    },
  },
}));

export const AdditionalityForm: React.FC<AdditionalityFormProps> = ({ submit }) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        rotationalGrazing: '',
        highDensityGrazing: '',
        residueGrazing: '',
        otherGrazing: '',
        traditionalGrazing: '',
        cropland: '',
        naturalEcosystem: '',
        environmentalConditions: '',
      }}
      validate={(values: AdditionalityValues) => {
        const errors: Partial<AdditionalityValues> = {};
        const errorFields: Array<keyof AdditionalityValues> = [];
        errorFields.forEach(value => {
          if (!values[value]) {
            errors[value] = requiredMessage;
          }
        });
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        // const valuesCleaned = { includesGrasslands: values['includesGrasslands'] === 'true' };
        setSubmitting(true);
        try {
          await submit(values);
          setSubmitting(false);
        } catch (e) {
          setSubmitting(false);
        }
      }}
    >
      {({ submitForm, values, handleChange }) => {
        return (
          <Form>
            <OnBoardingCard className={classes.card}>
              <ControlledFormLabel>
                Which regenerative practices have you been applying and for how long?
              </ControlledFormLabel>
              <Field component={RadioGroup} name="includesGrasslands">
                <Field
                  label="Rotational grazing"
                  type="checkbox"
                  component={Toggle}
                  onChange={handleChange}
                  name="rotationalGrazing"
                  checked={values.rotationalGrazing === 'true'}
                  tooltip="TODO: Info about rotational grazing"
                />
                <Field
                  label="High density grazing"
                  type="checkbox"
                  component={Toggle}
                  onChange={handleChange}
                  name="highDensityGrazing"
                  checked={values.highDensityGrazing === 'true'}
                  tooltip="TODO: Info about high density grazing"
                />
                <Field
                  label="Residue grazing"
                  type="checkbox"
                  component={Toggle}
                  onChange={handleChange}
                  name="residueGrazing"
                  checked={values.residueGrazing === 'true'}
                  tooltip="TODO: Info about residue grazing"
                />
                <Field
                  label="Other regenerative grazing practice"
                  type="checkbox"
                  component={Toggle}
                  onChange={handleChange}
                  name="otherGrazing"
                  checked={values.otherGrazing === 'true'}
                />
              </Field>
            </OnBoardingCard>

            <OnBoardingCard className={classes.card}>
              <ControlledFormLabel>
                Prior to adopting these regenerative practices (going back 5 years prior) how were you using
                the land?
              </ControlledFormLabel>
              <Field component={RadioGroup} name="includesGrasslands">
                <Field
                  label="Cropland"
                  type="checkbox"
                  component={Toggle}
                  onChange={handleChange}
                  name="cropland"
                  checked={values.cropland === 'true'}
                />
                <Field
                  label="Traditional grazing"
                  type="checkbox"
                  component={Toggle}
                  onChange={handleChange}
                  name="traditionalGrazing"
                  checked={values.traditionalGrazing === 'true'}
                />
                <Field
                  label="Natural ecosystem, unmanaged"
                  type="checkbox"
                  component={Toggle}
                  onChange={handleChange}
                  name="naturalEcosystem"
                  checked={values.naturalEcosystem === 'true'}
                />
              </Field>
            </OnBoardingCard>

            <OnBoardingCard className={classes.card}>
              <ControlledFormLabel>Prior environmental conditions</ControlledFormLabel>
              <Field
                component={ControlledTextField}
                description="Relevant environmental changes within the project area. These include changes in vegetation such as clearing or planting, hydrology, soil conditions, or other."
                name="environmentalConditions"
                rows={6}
                multiline
                optional
              />
            </OnBoardingCard>

            <OnboardingFooter
              onSave={submitForm}
              saveText={'Save and Next'}
              onPrev={() => null} // TODO
              onNext={() => null} // TODO
              hideProgress={false} // TODO
              saveDisabled={false}
              percentComplete={0} // TODO
            />
          </Form>
        );
      }}
    </Formik>
  );
};
