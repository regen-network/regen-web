import React from 'react';
import { makeStyles, Theme, useMediaQuery, useTheme, Grid } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';
import { ImageDrop } from 'web-components/lib/components/inputs/ImageDrop';
// import { VideoInput } from 'web-components/lib/components/inputs/VideoInput'; //TODO: make this component easier to use with share links from youtube, vimeo, etc
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
  'http://regen.network/videoUrl': string;
}

export interface MediaValuesErrors {
  'http://regen.network/previewPhoto'?: string;
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
    marginBottom: theme.spacing(12),
  },
  error: {
    marginTop: 0,
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
            'http://regen.network/videoUrl': initialValues?.['http://regen.network/videoUrl'] || '',
          }
        }
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
        {({ submitForm, isValid, isSubmitting }) => {
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
                  name="['http://regen.network/previewPhoto']"
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
                        name="['http://regen.network/galleryLeft']"
                      />
                    </Grid>
                    {isTabletOrLarger ? (
                      <Grid item sm={3} className={styles.centerImages} direction="column">
                        <Grid item sm={12} className={styles.centerSmall}>
                          <Field
                            classes={{ button: styles.smallButton }}
                            component={ImageDrop}
                            fixedCrop={cropAspect}
                            name="['http://regen.network/galleryTop']"
                            hideDragText
                          />
                        </Grid>
                        <Grid item sm={12} className={styles.centerSmall}>
                          <Field
                            classes={{ button: styles.smallButton }}
                            component={ImageDrop}
                            fixedCrop={cropAspect}
                            name="['http://regen.network/galleryBottom']"
                            hideDragText
                          />
                        </Grid>
                      </Grid>
                    ) : (
                      <>
                        <Grid item xs={6} sm={12} className={styles.galleryImage}>
                          <Field
                            classes={{ button: styles.smallButton }}
                            component={ImageDrop}
                            fixedCrop={cropAspect}
                            name="['http://regen.network/galleryTop']"
                            buttonText="+ Add Photo"
                          />
                        </Grid>
                        <Grid item xs={6} sm={12} className={styles.galleryImage}>
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
                        name="['http://regen.network/galleryRight']"
                      />
                    </Grid>
                  </Grid>
                </div>
                {/* <Field
                  classes={{ root: styles.field }}
                  component={VideoInput}
                  label="Video url"
                  optional
                  description="Copy and paste a video url from YouTube, Vimeo, or Facebook."
                  name="['http://regen.network/videoUrl']"
                /> */}
                <Field
                  classes={{ root: styles.field, main: styles.fullSizeMedia }}
                  component={ImageDrop}
                  label="Land Steward photo"
                  // labelSubText="(required if you don’t add a video)" TODO: uncomment when video input is ready
                  description="Upload a nice portrait of the land stewards and their families. This should be different from the other photos of land stewards you uploaded in the gallery above."
                  buttonText="+ Add Photo"
                  fixedCrop={cropAspect}
                  name="['http://regen.network/landStewardPhoto']"
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
