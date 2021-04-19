import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import clsx from 'clsx';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';
import InputLabel from 'web-components/lib/components/inputs/InputLabel';
import TextField from 'web-components/lib/components/inputs/TextField';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import SelectTextField from 'web-components/lib/components/inputs/SelectTextField';

interface BasicInfoFormProps {
  submit: (values: Values) => Promise<void>;
}

export interface Values {
  projectName: string;
  parcelSize: number | undefined;
  parcelUnit: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  parcelSizeContainer: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(3),
    },
  },
  parcelField: {
    marginTop: theme.spacing(4),
  },
  parcelSize: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2.5),
    },
    [theme.breakpoints.down('xs')]: {
      width: '57%',
      marginRight: theme.spacing(1.25),
    },
  },
  parcelUnit: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2.5),
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(1.25),
      width: '43%',
    },
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ submit }) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        projectName: '',
        parcelSize: undefined,
        parcelUnit: 'hectares',
      }}
      validate={(values: Values) => {
        const errors: Partial<Values> = {};
        const errorFields: Array<keyof Values> = ['projectName', 'parcelSize', 'parcelUnit'];
        errorFields.forEach(value => {
          if (!values[value]) {
            // errors[value] = requiredMessage; TODO: validation
          }
        });
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
      {({ submitForm, isSubmitting, isValid, submitCount }) => {
        return (
          <Form>
            <OnBoardingCard>
              <Field
                component={ControlledTextField}
                label="Project name"
                description="This is the name of the farm, ranch, property, or conservation project."
                placeholder="i.e. Sunnybrook Farms"
                name="projectName"
              />
              <div className={classes.parcelSizeContainer}>
                <InputLabel>Size in hectares or acres</InputLabel>
                <div className={classes.row}>
                  <Field
                    className={clsx(classes.parcelField, classes.parcelSize)}
                    component={TextField}
                    name="parcelSize"
                  />
                  <Field
                    className={clsx(classes.parcelField, classes.parcelUnit)}
                    component={SelectTextField}
                    name="parcelUnit"
                    options={[
                      { value: 'hectares', label: 'Hectares' },
                      { value: 'acres', label: 'Acres' },
                    ]}
                  />
                </div>
              </div>
            </OnBoardingCard>
            <OnboardingFooter
              onSave={submitForm}
              saveText={'Save and Next'}
              onPrev={() => null} // TODO
              onNext={() => null} // TODO
              hideProgress={false} // TODO
              saveDisabled={false} // TODO
              percentComplete={0} // TODO
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default BasicInfoForm;
