import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@mui/styles';
import { FormHelperText } from '@mui/material';
import { useParams } from 'react-router-dom';
import {
  Formik,
  Form,
  Field,
  FieldArray,
  FormikErrors,
  FormikHelpers,
  getIn,
} from 'formik';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import { ImageUpload } from 'web-components/lib/components/inputs/ImageUpload';
import { VideoInput } from 'web-components/lib/components/inputs/VideoInput';
import { requiredMessage } from 'web-components/lib/components/inputs/validation';
import {
  urlType,
  getURLInitialValue,
} from 'web-components/lib/utils/schemaURL';
import {
  validate,
  getProjectPageBaseData,
  getCompactedPath,
  getProjectShapeIri,
} from '../../lib/rdf';
import { useShaclGraphByUriQuery } from '../../generated/graphql';
import getApiUri from '../../lib/apiUri';
import { ProjectPageFooter } from '../molecules';
import { useProjectEditContext } from '../../pages/ProjectEdit';

interface MediaFormProps {
  submit: (values: MediaValues) => Promise<void>;
  initialValues?: MediaValues;
}

interface urlList {
  '@list': Array<urlType>;
}

export interface MediaValues {
  'regen:previewPhoto'?: urlType;
  'regen:creditText'?: string;
  'regen:galleryPhotos'?: urlList;
  'regen:videoURL'?: urlType;
}

function getURLListInitialValue(value?: urlList): urlList {
  return (
    value || {
      '@list': Array(4).fill(getURLInitialValue(undefined)),
    }
  );
}

const useStyles = makeStyles(theme => ({
  fullSizeMedia: {
    width: '100%',
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      height: theme.typography.pxToRem(290),
    },
    [theme.breakpoints.down('sm')]: {
      height: theme.typography.pxToRem(210),
    },
  },
  customMarginTop: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(8),
    },
  },
}));

const projectShapeIri = getProjectShapeIri('C01');

const MediaForm = ({ submit, initialValues }: MediaFormProps): JSX.Element => {
  const styles = useStyles();
  const apiUri = getApiUri();
  const { projectId } = useParams();
  const { confirmSave, isEdit } = useProjectEditContext();
  const cropAspect = { aspect: 322 / 211 }; // px values pulled from mockups (width / height)
  const { data: graphData } = useShaclGraphByUriQuery({
    variables: {
      uri: projectShapeIri,
    },
  });

  const handleValidate = async (
    values: MediaValues,
  ): Promise<FormikErrors<MediaValues>> => {
    const errors: FormikErrors<MediaValues> = {};
    if (graphData?.shaclGraphByUri?.graph) {
      const projectPageData = { ...getProjectPageBaseData(), ...values };
      const report = await validate(
        graphData.shaclGraphByUri.graph,
        projectPageData,
        projectShapeIri,
      );
      for (const result of report.results) {
        const path: string = result.path.value;
        const compactedPath = getCompactedPath(path) as
          | keyof MediaValues
          | undefined;
        if (compactedPath) {
          errors[compactedPath] = requiredMessage;
        }
      }
    }
    return errors;
  };

  const handleSubmit = async (
    values: MediaValues,
    { setSubmitting, setTouched }: FormikHelpers<MediaValues>,
  ): Promise<void> => {
    setSubmitting(true);
    try {
      await submit(values);
      setSubmitting(false);
      setTouched({}); // reset to untouched
      if (isEdit && confirmSave) confirmSave();
    } catch (e) {
      setSubmitting(false);
    }
  };

  const ImageField = (props: {
    name: string;
    description?: string;
    label?: string;
    customMarginTop?: boolean;
  }): JSX.Element => (
    <Field
      classes={{
        main: cx(
          styles.fullSizeMedia,
          props.customMarginTop && styles.customMarginTop,
        ),
      }}
      component={ImageUpload}
      label={props.label}
      description={props.description}
      buttonText="+ Add Photo"
      fixedCrop={cropAspect}
      name={props.name}
      apiServerUrl={apiUri}
      projectId={projectId}
      optional
      isDrop
    />
  );

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
          'regen:creditText': initialValues?.['regen:creditText'] || '',
          'regen:videoURL': getURLInitialValue(
            initialValues?.['regen:videoURL'],
          ),
        }}
        validate={handleValidate}
        onSubmit={handleSubmit}
      >
        {({ submitForm, isValid, isSubmitting, errors, values, touched }) => {
          const shouldRenderPhoto = (i: number): boolean => {
            if (!values['regen:previewPhoto']?.['@value']) return false;
            if (values['regen:previewPhoto']['@value'] && i === 0) return true;
            return Boolean(
              values['regen:galleryPhotos']?.['@list'][i - 1]?.['@value'],
            );
          };
          return (
            <Form translate="yes">
              <OnBoardingCard>
                <ImageField
                  name="regen:previewPhoto.@value"
                  description="Choose the photos that will show up on the project page. The first photo will be your preview photo."
                  label="Photos"
                />
                <FieldArray name="photos">
                  {() => (
                    <div>
                      {(values['regen:galleryPhotos']?.['@list'] || []).map(
                        (_photo, i) =>
                          shouldRenderPhoto(i) ? (
                            <ImageField
                              key={i}
                              name={`regen:galleryPhotos.@list[${i}].@value`}
                              customMarginTop={i === 0} // FieldArray has custom margin which interferes with how the first photo renders. This is a hacky workaround
                            />
                          ) : (
                            <React.Fragment key={i} /> // Formik expects a react element - this avoids console bug
                          ),
                      )}
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
                          <FormHelperText
                            sx={{
                              color: 'error.main',
                              borderColor: 'error.main',
                              mt: 1,
                              mb: 0,
                              fontWeight: 'bold',
                              typography: ['textXSmall', 'textSmall'],
                            }}
                          >
                            {errors?.['regen:galleryPhotos']}
                          </FormHelperText>
                        )}
                    </div>
                  )}
                </FieldArray>
                <Field
                  optional
                  component={ControlledTextField}
                  label="Photo Credit"
                  name="regen:creditText"
                />
                <Field
                  optional
                  component={VideoInput}
                  description="Copy and paste a video url from YouTube, Vimeo, or Facebook."
                  label="Video url"
                  name="regen:videoURL.@value"
                />
              </OnBoardingCard>
              <ProjectPageFooter
                onSave={submitForm}
                saveDisabled={!isValid || isSubmitting}
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { MediaForm };
