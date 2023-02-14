import React from 'react';
import { Box } from '@mui/material';
import { Field, Form, Formik, FormikErrors } from 'formik';
import { makeStyles } from 'tss-react/mui';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import InputLabel from 'web-components/lib/components/inputs/InputLabel';
import SelectTextField from 'web-components/lib/components/inputs/SelectTextField';
import TextField from 'web-components/lib/components/inputs/TextField';
import { Theme } from 'web-components/lib/theme/muiTheme';

import { getCompactedPath, getProjectBaseData, validate } from 'lib/rdf';

import { useProjectEditContext } from 'pages';

import { ShaclGraphByUriQuery } from '../../generated/graphql';
import { ProjectPageFooter } from '../molecules';

export interface BasicInfoFormValues {
  'schema:name'?: string;
  'regen:projectSize'?: {
    'qudt:numericValue'?: number;
    'qudt:unit': string;
  };
}

const useStyles = makeStyles()((theme: Theme) => ({
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
}));

const BasicInfoForm: React.FC<
  React.PropsWithChildren<{
    submit: ({ values }: { values: BasicInfoFormValues }) => Promise<void>;
    initialValues?: BasicInfoFormValues;
    onNext?: () => void;
    graphData?: ShaclGraphByUriQuery;
    creditClassId?: string;
  }>
> = ({ submit, initialValues, onNext, graphData, creditClassId }) => {
  const { classes, cx } = useStyles();
  const { confirmSave, isEdit } = useProjectEditContext();

  return (
    <Formik
      enableReinitialize
      validateOnMount
      initialValues={{
        'schema:name': initialValues?.['schema:name'] || '',
        'regen:projectSize': initialValues?.['regen:projectSize'] || {
          'qudt:numericValue': undefined,
          'qudt:unit': 'unit:HA',
        },
      }}
      validate={async (values: BasicInfoFormValues) => {
        const errors: FormikErrors<BasicInfoFormValues> = {};
        if (graphData?.shaclGraphByUri?.graph) {
          const projectPageData = {
            ...getProjectBaseData(creditClassId),
            ...values,
          };
          const report = await validate(
            graphData.shaclGraphByUri.graph,
            projectPageData,
            'http://regen.network/ProjectPageBasicInfoGroup',
          );
          for (const result of report.results) {
            const path: string = result.path.value;
            const compactedPath = getCompactedPath(path) as
              | keyof BasicInfoFormValues
              | keyof BasicInfoFormValues['regen:projectSize']
              | undefined;
            const message = result.message?.[0]?.value;
            if (compactedPath && message) {
              // handle nested errors
              if (
                compactedPath === 'qudt:numericValue' ||
                compactedPath === 'qudt:unit'
              ) {
                errors['regen:projectSize'] = {
                  [compactedPath]: message,
                };
              } else {
                errors[compactedPath] = message;
              }
            }
          }
        }
        return errors;
      }}
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
                component={ControlledTextField}
                label="Project name"
                description="This is the name of the farm, ranch, property, or conservation project."
                placeholder="i.e. Sunnybrook Farms"
                name="schema:name"
              />
              <Box
                sx={{ display: 'flex', flexDirection: 'column', pt: [3, 12] }}
              >
                <InputLabel>Size in hectares or acres</InputLabel>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}
                >
                  <Field
                    className={cx(classes.parcelField, classes.parcelSize)}
                    component={TextField}
                    type="number"
                    name="regen:projectSize.qudt:numericValue"
                    defaultStyle={false}
                  />
                  <Field
                    className={cx(classes.parcelField, classes.parcelUnit)}
                    component={SelectTextField}
                    name="regen:projectSize.qudt:unit"
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
                </Box>
              </Box>
            </OnBoardingCard>
            <ProjectPageFooter
              onSave={submitForm}
              onNext={onNext}
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

export { BasicInfoForm };
