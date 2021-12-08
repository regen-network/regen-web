import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Formik, Form, Field, FormikErrors } from 'formik';
import clsx from 'clsx';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import InputLabel from 'web-components/lib/components/inputs/InputLabel';
import TextField from 'web-components/lib/components/inputs/TextField';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import SelectTextField from 'web-components/lib/components/inputs/SelectTextField';
import { requiredMessage } from 'web-components/lib/components/inputs/validation';
import { useShaclGraphByUriQuery } from '../../generated/graphql';
import { validate, getProjectPageBaseData } from '../../lib/rdf';
import { ProjectPageFooter } from '../molecules';
import { useProjectEditContext } from '../../pages/ProjectEdit';

export interface BasicInfoFormValues {
  'http://schema.org/name': string;
  'http://regen.network/size': {
    'http://qudt.org/1.1/schema/qudt#numericValue': {
      '@type': 'http://www.w3.org/2001/XMLSchema#double';
      '@value'?: number | string;
    };
    'http://qudt.org/1.1/schema/qudt#unit': {
      '@type': string;
      '@value': string;
    };
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  parcelSizeContainer: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(12),
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

const BasicInfoForm: React.FC<{
  submit: (values: BasicInfoFormValues) => Promise<void>;
  initialValues?: BasicInfoFormValues;
}> = ({ submit, initialValues }) => {
  const classes = useStyles();
  const { confirmSave, isEdit } = useProjectEditContext();
  const { data: graphData } = useShaclGraphByUriQuery({
    variables: {
      uri: 'http://regen.network/ProjectPageShape',
    },
  });

  return (
    <Formik
      enableReinitialize
      validateOnMount
      initialValues={{
        'http://schema.org/name': initialValues?.['http://schema.org/name'] || '',
        'http://regen.network/size': initialValues?.['http://regen.network/size'] || {
          'http://qudt.org/1.1/schema/qudt#numericValue': {
            '@type': 'http://www.w3.org/2001/XMLSchema#double',
            '@value': undefined,
          },
          'http://qudt.org/1.1/schema/qudt#unit': {
            '@type': 'http://qudt.org/1.1/schema/qudt#unit',
            '@value': 'http://qudt.org/1.1/vocab/unit#HA',
          },
        },
      }}
      validate={async (values: BasicInfoFormValues) => {
        const errors: FormikErrors<BasicInfoFormValues> = {};
        if (graphData?.shaclGraphByUri?.graph) {
          const projectPageData = { ...getProjectPageBaseData(), ...values };
          const report = await validate(
            graphData.shaclGraphByUri.graph,
            projectPageData,
            'http://regen.network/ProjectPageBasicInfoGroup',
          );
          for (const result of report.results) {
            const path: keyof BasicInfoFormValues = result.path.value;
            if (path === 'http://regen.network/size') {
              errors[path] = {
                'http://qudt.org/1.1/schema/qudt#numericValue': {
                  '@value': requiredMessage,
                },
              };
            } else {
              errors[path] = requiredMessage;
            }
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
      {({ submitForm, submitCount, isValid, isSubmitting, touched }) => {
        return (
          <Form>
            <OnBoardingCard>
              <Field
                component={ControlledTextField}
                label="Project name"
                description="This is the name of the farm, ranch, property, or conservation project."
                placeholder="i.e. Sunnybrook Farms"
                name="['http://schema.org/name']"
              />
              <div className={classes.parcelSizeContainer}>
                <InputLabel>Size in hectares or acres</InputLabel>
                <div className={classes.row}>
                  <Field
                    className={clsx(classes.parcelField, classes.parcelSize)}
                    component={TextField}
                    type="number"
                    name="['http://regen.network/size'].['http://qudt.org/1.1/schema/qudt#numericValue'].@value"
                  />
                  <Field
                    className={clsx(classes.parcelField, classes.parcelUnit)}
                    component={SelectTextField}
                    name="['http://regen.network/size'].['http://qudt.org/1.1/schema/qudt#unit'].@value"
                    options={[
                      { value: 'http://qudt.org/1.1/vocab/unit#HA', label: 'Hectares' },
                      { value: 'http://qudt.org/1.1/vocab/unit#AC', label: 'Acres' },
                    ]}
                  />
                </div>
              </div>
            </OnBoardingCard>
            <ProjectPageFooter
              onSave={submitForm}
              saveDisabled={!isValid || isSubmitting || !Object.keys(touched).length}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export { BasicInfoForm };
