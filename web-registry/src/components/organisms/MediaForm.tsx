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
import ControlledFormLabel from 'web-components/lib/components/form/ControlledFormLabel';
import FormLabel from 'web-components/lib/components/inputs/FormLabel';

interface MediaFormProps {
  submit: (values: MediaValues) => Promise<void>;
  initialValues?: MediaValues;
}

export interface MediaValues {
  'http://regen.network/previewPhoto': string;
  'http://regen.network/galleryLeft': string;
  'http://regen.network/galleryTop': string;
  'http://regen.network/galleryBottom': string;
  'http://regen.network/galleryRight': string;
  'http://regen.network/landStewardPhoto': string;
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
  galleryPhotos: {
    margin: theme.spacing(8, 0, 12),
  },
  gallery: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  square: {
    height: 169,
    width: 169,
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
  },
  smallButton: {
    fontSize: theme.typography.pxToRem(14),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
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

  return (
    <>
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={
          initialValues || {
            'http://regen.network/previewPhoto': initialValues?.['http://regen.network/previewPhoto'] || '',
            'http://regen.network/galleryLeft': initialValues?.['http://regen.network/galleryLeft'] || '',
            'http://regen.network/galleryTop': initialValues?.['http://regen.network/galleryTop'] || '',
            'http://regen.network/galleryBottom': initialValues?.['http://regen.network/galleryBottom'] || '',
            'http://regen.network/galleryRight': initialValues?.['http://regen.network/galleryRight'] || '',

            'http://regen.network/landStewardPhoto':
              initialValues?.['http://regen.network/landStewardPhoto'] || '',
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
                  fixedCrop={{ aspect: 16 / 9 }}
                  name="['http://regen.network/previewPhoto']"
                />
                <div className={styles.galleryPhotos}>
                  <FormLabel
                    label="Gallery Photos"
                    labelSubText="(min 4 photos)"
                    description="People love pictures of people! Upload images of the land stewards, in addition to the land and animals."
                  >
                    <div className={styles.gallery}>
                      <div className={styles.square}>
                        <Field
                          classes={{ button: styles.smallButton }}
                          component={FileDrop}
                          buttonText="+ Add Photo"
                          fixedCrop={{ aspect: 16 / 9 }}
                          name="['http://regen.network/galleryLeft']"
                        />
                      </div>
                      <div className={styles.center}>
                        <Field
                          classes={{ button: styles.smallButton }}
                          component={FileDrop}
                          fixedCrop={{ aspect: 16 / 9 }}
                          name="['http://regen.network/galleryTop']"
                          hideDragText
                        />
                        <Field
                          classes={{ button: styles.smallButton }}
                          component={FileDrop}
                          fixedCrop={{ aspect: 16 / 9 }}
                          name="['http://regen.network/galleryBottom']"
                          hideDragText
                        />
                      </div>
                      <div className={styles.square}>
                        <Field
                          classes={{ button: styles.smallButton }}
                          component={FileDrop}
                          buttonText="+ Add Photo"
                          fixedCrop={{ aspect: 16 / 9 }}
                          name="['http://regen.network/galleryRight']"
                        />
                      </div>
                    </div>
                  </FormLabel>
                </div>

                <Field
                  classes={{ root: styles.field, main: styles.fullImage }}
                  component={FileDrop}
                  label="Land Steward photo"
                  labelSubText="(required if you don’t add a video)"
                  description="Upload a nice portrait of the land stewards and their families. This should be different from the other photos of land stewards you uploaded in the gallery above."
                  buttonText="+ Add Photo"
                  fixedCrop={{ aspect: 16 / 9 }}
                  name="['http://regen.network/landStewardPhoto']"
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
