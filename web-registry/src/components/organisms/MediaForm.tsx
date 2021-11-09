import React from 'react';
import {
  makeStyles,
  Theme,
  useMediaQuery,
  useTheme,
  Grid,
  FormHelperText,
} from '@material-ui/core';
import { Formik, Form, Field, getIn } from 'formik';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';
import { ImageDrop } from 'web-components/lib/components/inputs/ImageDrop';
// import { VideoInput } from 'web-components/lib/components/inputs/VideoInput'; //TODO: make this component easier to use with share links from youtube, vimeo, etc
import FormLabel from 'web-components/lib/components/inputs/FormLabel';
import { requiredMessage } from 'web-components/lib/components/inputs/validation';

import { validate, getProjectPageBaseData } from '../../lib/rdf';
import { useShaclGraphByUriQuery } from '../../generated/graphql';

interface MediaFormProps {
  submit: (values: MediaValues) => Promise<void>;
  initialValues?: MediaValues;
}

export interface urlType {
  '@type': 'http://schema.org/URL';
  '@value'?: string;
}

interface urlList {
  '@list': Array<urlType>;
}

export interface MediaValues {
  'http://regen.network/previewPhoto'?: urlType;
  'http://regen.network/galleryPhotos'?: urlList;
  'http://regen.network/landStewardPhoto'?: urlType;
  'http://regen.network/videoURL'?: urlType;
}

type valueObject = { '@value'?: string };
export interface MediaValuesErrors {
  'http://regen.network/previewPhoto'?: valueObject;
  'http://regen.network/galleryPhotos'?: string;
  'http://regen.network/landStewardPhoto'?: valueObject;
  'http://regen.network/videoURL'?: valueObject;
}

function getURLInitialValue(value?: urlType): urlType {
  return (
    value || {
      '@type': 'http://schema.org/URL',
    }
  );
}

function getURLListInitialValue(value?: urlList): urlList {
  return (
    value || {
      '@list': Array(4).fill(getURLInitialValue(undefined)),
    }
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  storyCard: {
    paddingBottom: 0,
  },
  description: {
    marginBottom: 0,
    fontSize: theme.typography.pxToRem(16),
  },
  field: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(12),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(10),
    },
  },
  error: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    marginTop: theme.spacing(1),
    marginBottom: 0,
    fontFamily: '"Lato",-apple-system,sans-serif',
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
    },
  },
  fullSizeMedia: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      height: theme.typography.pxToRem(290),
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.typography.pxToRem(210),
    },
  },
  galleryImage: {
    [theme.breakpoints.up('sm')]: {
      height: theme.typography.pxToRem(169),
      flex: 1,
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.typography.pxToRem(139),
    },
  },
  centerImages: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  centerSmall: {
    maxHeight: theme.typography.pxToRem(72),
  },
  smallButton: {
    fontSize: theme.typography.pxToRem(14),
    padding: theme.spacing(2, 3),
  },
}));

const MediaForm: React.FC<MediaFormProps> = ({ submit, initialValues }) => {
  const styles = useStyles();
  const theme = useTheme();
  const isTabletOrLarger = useMediaQuery(theme.breakpoints.up('sm'));
  const cropAspect = { aspect: 322 / 211 }; // px values pulled from mockups (width / height)
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
        initialValues={{
          'http://regen.network/previewPhoto': getURLInitialValue(
            initialValues?.['http://regen.network/previewPhoto'],
          ),
          'http://regen.network/galleryPhotos': getURLListInitialValue(
            initialValues?.['http://regen.network/galleryPhotos'],
          ),
          'http://regen.network/landStewardPhoto': getURLInitialValue(
            initialValues?.['http://regen.network/landStewardPhoto'],
          ),
          'http://regen.network/videoURL': getURLInitialValue(
            initialValues?.['http://regen.network/videoURL'],
          ),
        }}
        validate={async (values): Promise<MediaValuesErrors> => {
          const errors: MediaValuesErrors = {};
          if (graphData?.shaclGraphByUri?.graph) {
            const projectPageData = { ...getProjectPageBaseData(), ...values };
            const report = await validate(
              graphData.shaclGraphByUri.graph,
              projectPageData,
              'http://regen.network/ProjectPageMediaGroup',
            );
            for (const result of report.results) {
              const path: string | undefined = result.path?.value;
              if (path) {
                if (path === 'http://regen.network/previewPhoto') {
                  errors[path] = { '@value': requiredMessage };
                } else {
                  // for gallery photos, display general error message below "Gallery Photos" section
                  errors['http://regen.network/galleryPhotos'] =
                    'You must add 4 photos';
                }
              } else {
                // or constraint not satisfied on regen:landStewardPhoto/regen:videoURL
                errors['http://regen.network/landStewardPhoto'] = {
                  '@value': requiredMessage,
                };
              }
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
        {({ submitForm, isValid, isSubmitting, errors, touched }) => {
          return (
            <Form translate="yes">
              <OnBoardingCard className={styles.storyCard}>
                <Field
                  classes={{ root: styles.field, main: styles.fullSizeMedia }}
                  component={ImageDrop}
                  label="Preview photo"
                  description="Choose the summary photo that will show up in project previews."
                  buttonText="+ Add preview Photo"
                  fixedCrop={cropAspect}
                  name="['http://regen.network/previewPhoto'].@value"
                />
                <div className={styles.field}>
                  <FormLabel
                    label="Gallery Photos"
                    labelSubText="(min 4 photos)"
                    description="People love pictures of people! Upload images of the land stewards, in addition to the land and animals."
                  />
                  <Grid container spacing={3} direction="row">
                    <Grid item xs={6} sm="auto" className={styles.galleryImage}>
                      <Field
                        classes={{ button: styles.smallButton }}
                        component={ImageDrop}
                        buttonText="+ Add Photo"
                        fixedCrop={cropAspect}
                        name="['http://regen.network/galleryPhotos'].@list[0].@value" // left
                      />
                    </Grid>
                    {isTabletOrLarger ? (
                      <Grid
                        item
                        sm={3}
                        className={styles.centerImages}
                        direction="column"
                      >
                        <Grid item sm={12} className={styles.centerSmall}>
                          <Field
                            classes={{ button: styles.smallButton }}
                            component={ImageDrop}
                            fixedCrop={cropAspect}
                            name="['http://regen.network/galleryPhotos'].@list[1].@value" // top
                            hideDragText
                          />
                        </Grid>
                        <Grid item sm={12} className={styles.centerSmall}>
                          <Field
                            classes={{ button: styles.smallButton }}
                            component={ImageDrop}
                            fixedCrop={cropAspect}
                            name="['http://regen.network/galleryPhotos'].@list[2].@value" // bottom
                            hideDragText
                          />
                        </Grid>
                      </Grid>
                    ) : (
                      <>
                        <Grid
                          item
                          xs={6}
                          sm={12}
                          className={styles.galleryImage}
                        >
                          <Field
                            classes={{ button: styles.smallButton }}
                            component={ImageDrop}
                            fixedCrop={cropAspect}
                            name="['http://regen.network/galleryTop']"
                            buttonText="+ Add Photo"
                          />
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          sm={12}
                          className={styles.galleryImage}
                        >
                          <Field
                            classes={{ button: styles.smallButton }}
                            component={ImageDrop}
                            fixedCrop={cropAspect}
                            name="['http://regen.network/galleryBottom']"
                            buttonText="+ Add Photo"
                          />
                        </Grid>
                      </>
                    )}

                    <Grid item xs={6} sm="auto" className={styles.galleryImage}>
                      <Field
                        classes={{ button: styles.smallButton }}
                        component={ImageDrop}
                        buttonText="+ Add Photo"
                        fixedCrop={cropAspect}
                        name="['http://regen.network/galleryPhotos'].@list[3].@value" // right
                      />
                    </Grid>
                  </Grid>
                  {errors?.['http://regen.network/galleryPhotos'] &&
                    (getIn(
                      touched,
                      `['http://regen.network/galleryPhotos'].@list[0].@value`,
                    ) ||
                      getIn(
                        touched,
                        `['http://regen.network/galleryPhotos'].@list[1].@value`,
                      ) ||
                      getIn(
                        touched,
                        `['http://regen.network/galleryPhotos'].@list[2].@value`,
                      ) ||
                      getIn(
                        touched,
                        `['http://regen.network/galleryPhotos'].@list[3].@value`,
                      )) && (
                      <FormHelperText className={styles.error}>
                        {errors?.['http://regen.network/galleryPhotos']}
                      </FormHelperText>
                    )}
                </div>
                {/* <Field
                  classes={{ root: styles.field }}
                  component={VideoInput}
                  label="Video url"
                  optional
                  description="Copy and paste a video url from YouTube, Vimeo, or Facebook."
                  name="['http://regen.network/videoURL'].@value"
                /> */}
                <Field
                  classes={{ root: styles.field, main: styles.fullSizeMedia }}
                  component={ImageDrop}
                  label="Land Steward photo"
                  // labelSubText="(required if you don’t add a video)" TODO: uncomment when video input is ready
                  description="Upload a nice portrait of the land stewards and their families. This should be different from the other photos of land stewards you uploaded in the gallery above."
                  buttonText="+ Add Photo"
                  fixedCrop={cropAspect}
                  name="['http://regen.network/landStewardPhoto'].@value"
                />
              </OnBoardingCard>

              <OnboardingFooter
                onSave={submitForm}
                saveText={'Save and Next'}
                onPrev={() => null} // TODO
                onNext={() => null} // TODO
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
