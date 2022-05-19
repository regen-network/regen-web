import React from 'react';
import { makeStyles } from '@mui/styles';
import { Formik, Form, Field, FormikErrors } from 'formik';
import clsx from 'clsx';

import { Theme } from 'web-components/lib/theme/muiTheme';
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
  'schema:name': string;
  'regen:size': {
    'qudt:numericValue': {
      '@type': 'xsd:double';
      '@value'?: number | string;
    };
    'qudt:unit': {
      '@type': 'qudt:Unit';
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
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
      width: '57%',
      marginRight: theme.spacing(1.25),
    },
  },
  parcelUnit: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2.5),
    },
    [theme.breakpoints.down('sm')]: {
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
        'schema:name': initialValues?.['schema:name'] || '',
        'regen:size': initialValues?.['regen:size'] || {
          'qudt:numericValue': {
            '@type': 'xsd:double',
            '@value': undefined,
          },
          'qudt:unit': {
            '@type': 'qudt:Unit',
            '@value': 'unit:HA',
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
            'regen:ProjectPageBasicInfoGroup',
          );
          for (const result of report.results) {
            const path: keyof BasicInfoFormValues = result.path.value;
            if (path === 'regen:size') {
              errors[path] = {
                'qudt:numericValue': {
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
                name="schema:name"
              />
              <div className={classes.parcelSizeContainer}>
                <InputLabel>Size in hectares or acres</InputLabel>
                <div className={classes.row}>
                  <Field
                    className={clsx(classes.parcelField, classes.parcelSize)}
                    component={TextField}
                    type="number"
                    name="regen:size.qudt:numericValue.@value"
                    defaultStyle={false}
                  />
                  <Field
                    className={clsx(classes.parcelField, classes.parcelUnit)}
                    component={SelectTextField}
                    name="regen:size.qudt:unit.@value"
                    options={[
                      {
                        value: 'unit:HA',
                        label: 'Hectares',
                      },
                      {
                        value: 'unit:AC',
                        label: 'Acres',
                      },
                    ]}
                    defaultStyle={false}
                  />
                </div>
              </div>
            </OnBoardingCard>
            <ProjectPageFooter
              onSave={submitForm}
              saveDisabled={
                !isValid || isSubmitting || !Object.keys(touched).length
              }
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export { BasicInfoForm };
