import React, { useState } from 'react';
import { makeStyles, Theme, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import cx from 'clsx';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';
import { FileDrop } from './FileDrop';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import Description from 'web-components/lib/components/description';
import Title from 'web-components/lib/components/title';
import Card from 'web-components/lib/components/cards/Card';
import { useShaclGraphByUriQuery } from '../../generated/graphql';
import { validate, getProjectPageBaseData } from '../../lib/rdf';

interface MediaFormProps {
  submit: (values: MediaValues) => Promise<void>;
  initialValues?: MediaValues;
}

export interface MediaValues {
  'http://regen.network/previewPhoto': string;
}

export interface MediaValuesErrors {
  'http://regen.network/previewPhoto'?: string;
}

interface Errors {
  'http://regen.network/previewPhoto': string;
}

const useStyles = makeStyles((theme: Theme) => ({
  storyCard: {
    paddingBottom: 0,
  },
  title: {
    fontWeight: 800,
    color: theme.palette.info.dark,
  },
  description: {
    marginBottom: 0,
    fontSize: theme.typography.pxToRem(16),
  },
  field: {
    marginBottom: theme.spacing(4),
  },
  error: {
    marginTop: 0,
  },
  fullImage: {
    height: 290,
    width: '100%',
  },
}));

// const errorMsgs: Errors = {
//   'http://regen.network/landMedia': 'Please fill in the story of the land',
//   'http://regen.network/landStewardMedia': 'Please fill in the story of the land stewards',
//   'http://regen.network/landStewardMediaTitle': 'Please fill in a title for the land steward story',
//   'http://regen.network/projectQuote': quoteError,
// };

const MediaForm: React.FC<MediaFormProps> = ({ submit, initialValues }) => {
  const styles = useStyles();
  const { data: graphData } = useShaclGraphByUriQuery({
    variables: {
      uri: 'http://regen.network/ProjectPageShape',
    },
  });

  // const onFileChange = (image: string): void => {
  //   setUploadedImage(image);
  // };

  return (
    <>
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={
          initialValues || {
            'http://regen.network/previewPhoto': initialValues?.['http://regen.network/previewPhoto'] || '',

            // 'http://regen.network/landStewardPhoto':
            //   initialValues?.['http://regen.network/landStewardPhoto'] || '',
          }
        }
        validate={async (values: MediaValues) => {
          // const errors: MediaValuesErrors = {};
          // if (graphData?.shaclGraphByUri?.graph) {
          //   const projectPageData = { ...getProjectPageBaseData(), ...values };
          //   const report = await validate(
          //     graphData.shaclGraphByUri.graph,
          //     projectPageData,
          //     'http://regen.network/ProjectPageMediaGroup',
          //   );
          //   for (const result of report.results) {
          //     const path: keyof MediaValues = result.path.value;
          //     if (path === 'http://regen.network/projectQuote') {
          //       errors['http://regen.network/projectQuote'] = {
          //         'http://regen.network/quote': getProjectQuoteError(values, 'http://regen.network/quote'),
          //         'http://schema.org/name': getProjectQuoteError(values, 'http://schema.org/name'),
          //         'http://schema.org/jobTitle': getProjectQuoteError(values, 'http://schema.org/jobTitle'),
          //       };
          //     } else {
          //       errors[path] = errorMsgs[path];
          //     }
          //   }
          // }
          // return errors;
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
        {({ submitForm, submitCount, isValid, isSubmitting }) => {
          return (
            <Form translate="yes">
              <OnBoardingCard className={styles.storyCard}>
                <Field
                  classes={{ root: styles.field, main: styles.fullImage }}
                  component={FileDrop}
                  label="Preview photo"
                  description="Choose the summary photo that will show up in project previews."
                  buttonText="+ Add preview Photo"
                  fixedCrop={{
                    aspect: 481 / 290,
                    // height: 290,
                    // width: 481,
                  }}
                  name="['http://regen.network/previewPhoto']"
                />
              </OnBoardingCard>

              <OnboardingFooter
                onSave={submitForm}
                saveText={'Save and Next'}
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
    </>
  );
};

export { MediaForm };
