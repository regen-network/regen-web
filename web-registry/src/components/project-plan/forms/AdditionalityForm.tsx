import React from 'react';
import { Formik, Form, Field } from 'formik';
import { RadioGroup } from 'formik-material-ui';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';
import Toggle from 'web-components/lib/components/inputs/Toggle';
import DatePickField from 'web-components/lib/components/inputs/DatePickField';
import ControlledFormLabel from 'web-components/lib/components/form/ControlledFormLabel';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import { requiredMessage } from 'web-components/lib/components/inputs/validation';

interface AdditionalityFormProps {
  submit: (values: AdditionalityValues) => Promise<void>;
  goBack: () => void;
}

export interface AdditionalityValues {
  rotationalGrazing: string;
  rotationalGrazingStartDate: string | null;
  highDensityGrazing: string;
  highDensityGrazingStartDate: string | null;
  residueGrazing: string;
  residueGrazingStartDate: string | null;
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
  contentLabel: {
    fontWeight: 700,
    fontSize: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

export const AdditionalityForm: React.FC<AdditionalityFormProps> = p => {
  const classes = useStyles();

  const Label: React.FC = () => (
    <Typography variant="h3" className={classes.contentLabel}>
      Choose a practice start date
    </Typography>
  );

  return (
    <Formik
      initialValues={{
        rotationalGrazing: '',
        rotationalGrazingStartDate: null,
        highDensityGrazing: '',
        highDensityGrazingStartDate: null,
        residueGrazing: '',
        residueGrazingStartDate: null,
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
        setSubmitting(true);
        try {
          await p.submit(values);
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
                  checked={!!values.rotationalGrazing}
                  tooltip="TODO: Info about rotational grazing"
                  activeContent={
                    <>
                      <Label />
                      <Field
                        component={DatePickField}
                        name="rotationalGrazingStartDate"
                        value={values.rotationalGrazingStartDate}
                        type="input"
                      />
                    </>
                  }
                />
                <Field
                  label="High density grazing"
                  type="checkbox"
                  component={Toggle}
                  onChange={handleChange}
                  name="highDensityGrazing"
                  checked={!!values.highDensityGrazing}
                  tooltip="TODO: Info about high density grazing"
                  activeContent={
                    <>
                      <Label />
                      <Field
                        component={DatePickField}
                        name="highDensityGrazingStartDate"
                        value={values.highDensityGrazingStartDate}
                        type="input"
                      />
                    </>
                  }
                />
                <Field
                  label="Residue grazing"
                  type="checkbox"
                  component={Toggle}
                  onChange={handleChange}
                  name="residueGrazing"
                  checked={!!values.residueGrazing}
                  tooltip="TODO: Info about residue grazing"
                  activeContent={
                    <>
                      <Label />
                      <Field
                        component={DatePickField}
                        name="residueGrazingStartDate"
                        value={values.residueGrazingStartDate}
                        type="input"
                      />
                    </>
                  }
                />
                <Field
                  label="Other regenerative grazing practice"
                  type="checkbox"
                  component={Toggle}
                  onChange={handleChange}
                  name="otherGrazing"
                  checked={!!values.otherGrazing}
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
                  checked={!!values.cropland}
                />
                <Field
                  label="Traditional grazing"
                  type="checkbox"
                  component={Toggle}
                  onChange={handleChange}
                  name="traditionalGrazing"
                  checked={!!values.traditionalGrazing}
                />
                <Field
                  label="Natural ecosystem, unmanaged"
                  type="checkbox"
                  component={Toggle}
                  onChange={handleChange}
                  name="naturalEcosystem"
                  checked={!!values.naturalEcosystem}
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
              onPrev={p.goBack} // TODO
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
