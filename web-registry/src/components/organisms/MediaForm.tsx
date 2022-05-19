import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { useMediaQuery, Grid, FormHelperText } from '@mui/material';
import { Formik, Form, Field, getIn } from 'formik';
import { useParams } from 'react-router-dom';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import { ImageUpload } from 'web-components/lib/components/inputs/ImageUpload';
// import { VideoInput } from 'web-components/lib/components/inputs/VideoInput'; //TODO: make this component easier to use with share links from youtube, vimeo, etc
import FormLabel from 'web-components/lib/components/inputs/FormLabel';
import { requiredMessage } from 'web-components/lib/components/inputs/validation';

import { validate, getProjectPageBaseData } from '../../lib/rdf';
import { useShaclGraphByUriQuery } from '../../generated/graphql';
import getApiUri from '../../lib/apiUri';
import { ProjectPageFooter } from '../molecules';
import { useProjectEditContext } from '../../pages/ProjectEdit';

interface MediaFormProps {
  submit: (values: MediaValues) => Promise<void>;
  initialValues?: MediaValues;
}

export interface urlType {
  '@type': 'schema:URL';
  '@value'?: string;
}

interface urlList {
  '@list': Array<urlType>;
}

export interface MediaValues {
  'regen:previewPhoto'?: urlType;
  'regen:galleryPhotos'?: urlList;
  'regen:landStewardPhoto'?: urlType;
  'regen:videoURL'?: urlType;
}

type valueObject = { '@value'?: string };
export interface MediaValuesErrors {
  'regen:previewPhoto'?: valueObject;
  'regen:galleryPhotos'?: string;
  'regen:landStewardPhoto'?: valueObject;
  'regen:videoURL'?: valueObject;
}

function getURLInitialValue(value?: urlType): urlType {
  return (
    value || {
      '@type': 'schema:URL',
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

const useStyles = makeStyles(theme => ({
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
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
    },
  },
  fullSizeMedia: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      height: theme.typography.pxToRem(290),
    },
    [theme.breakpoints.down('sm')]: {
      height: theme.typography.pxToRem(210),
    },
  },
  galleryImage: {
    [theme.breakpoints.up('sm')]: {
      height: theme.typography.pxToRem(169),
      flex: 1,
    },
    [theme.breakpoints.down('sm')]: {
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
  const apiUri = getApiUri();
  const { projectId } = useParams();
  const { confirmSave, isEdit } = useProjectEditContext();
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
          'regen:previewPhoto': getURLInitialValue(
            initialValues?.['regen:previewPhoto'],
          ),
          'regen:galleryPhotos': getURLListInitialValue(
            initialValues?.['regen:galleryPhotos'],
          ),
          'regen:landStewardPhoto': getURLInitialValue(
            initialValues?.['regen:landStewardPhoto'],
          ),
          'regen:videoURL': getURLInitialValue(
            initialValues?.['regen:videoURL'],
          ),
        }}
        validate={async (values): Promise<MediaValuesErrors> => {
          const errors: MediaValuesErrors = {};
          if (graphData?.shaclGraphByUri?.graph) {
            const projectPageData = { ...getProjectPageBaseData(), ...values };
            const report = await validate(
              graphData.shaclGraphByUri.graph,
              projectPageData,
              'regen:ProjectPageMediaGroup',
            );
            for (const result of report.results) {
              const path: string | undefined = result.path?.value;
              if (path) {
                if (path === 'regen:previewPhoto') {
                  errors[path] = { '@value': requiredMessage };
                } else {
                  // for gallery photos, display general error message below "Gallery Photos" section
                  errors['regen:galleryPhotos'] = 'You must add 4 photos';
                }
              } else {
                // or constraint not satisfied on regen:landStewardPhoto/regen:videoURL
                errors['regen:landStewardPhoto'] = {
                  '@value': requiredMessage,
                };
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
        {({ submitForm, isValid, isSubmitting, errors, touched }) => {
          return (
            <Form translate="yes">
              <OnBoardingCard className={styles.storyCard}>
                <Field
                  classes={{ root: styles.field, main: styles.fullSizeMedia }}
                  component={ImageUpload}
                  label="Preview photo"
                  description="Choose the summary photo that will show up in project previews."
                  buttonText="+ Add preview Photo"
                  fixedCrop={cropAspect}
                  name="regen:previewPhoto.@value"
                  apiServerUrl={apiUri}
                  projectId={projectId}
                  isDrop
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
                        component={ImageUpload}
                        buttonText="+ Add Photo"
                        fixedCrop={cropAspect}
                        name="regen:galleryPhotos.@list[0].@value" // left
                        apiServerUrl={apiUri}
                        projectId={projectId}
                        isDrop
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
                            component={ImageUpload}
                            fixedCrop={cropAspect}
                            name="regen:galleryPhotos.@list[1].@value" // top
                            hideDragText
                            apiServerUrl={apiUri}
                            projectId={projectId}
                            isDrop
                          />
                        </Grid>
                        <Grid item sm={12} className={styles.centerSmall}>
                          <Field
                            classes={{ button: styles.smallButton }}
                            component={ImageUpload}
                            fixedCrop={cropAspect}
                            name="regen:galleryPhotos.@list[2].@value" // bottom
                            hideDragText
                            apiServerUrl={apiUri}
                            projectId={projectId}
                            isDrop
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
                            component={ImageUpload}
                            fixedCrop={cropAspect}
                            name="regen:galleryPhotos.@list[1].@value" // top
                            buttonText="+ Add Photo"
                            apiServerUrl={apiUri}
                            projectId={projectId}
                            isDrop
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
                            component={ImageUpload}
                            fixedCrop={cropAspect}
                            name="regen:galleryPhotos.@list[2].@value" // bottom
                            buttonText="+ Add Photo"
                            apiServerUrl={apiUri}
                            projectId={projectId}
                            isDrop
                          />
                        </Grid>
                      </>
                    )}

                    <Grid item xs={6} sm="auto" className={styles.galleryImage}>
                      <Field
                        classes={{ button: styles.smallButton }}
                        component={ImageUpload}
                        buttonText="+ Add Photo"
                        fixedCrop={cropAspect}
                        name="regen:galleryPhotos.@list[3].@value" // right
                        apiServerUrl={apiUri}
                        projectId={projectId}
                        isDrop
                      />
                    </Grid>
                  </Grid>
                  {errors?.['regen:galleryPhotos'] &&
                    (getIn(
                      touched,
                      `['regen:galleryPhotos'].@list[0].@value`,
                    ) ||
                      getIn(
                        touched,
                        `['regen:galleryPhotos'].@list[1].@value`,
                      ) ||
                      getIn(
                        touched,
                        `['regen:galleryPhotos'].@list[2].@value`,
                      ) ||
                      getIn(
                        touched,
                        `['regen:galleryPhotos'].@list[3].@value`,
                      )) && (
                      <FormHelperText className={styles.error}>
                        {errors?.['regen:galleryPhotos']}
                      </FormHelperText>
                    )}
                </div>
                {/* <Field
                  classes={{ root: styles.field }}
                  component={VideoInput}
                  label="Video url"
                  optional
                  description="Copy and paste a video url from YouTube, Vimeo, or Facebook."
                  name="regen:videoURL.@value"
                /> */}
                <Field
                  classes={{ root: styles.field, main: styles.fullSizeMedia }}
                  component={ImageUpload}
                  label="Land Steward photo"
                  // labelSubText="(required if you don’t add a video)" TODO: uncomment when video input is ready
                  description="Upload a nice portrait of the land stewards and their families. This should be different from the other photos of land stewards you uploaded in the gallery above."
                  buttonText="+ Add Photo"
                  fixedCrop={cropAspect}
                  name="regen:landStewardPhoto.@value"
                  apiServerUrl={apiUri}
                  projectId={projectId}
                  isDrop
                />
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
    </>
  );
};

export { MediaForm };
