import React, { useState } from 'react';
import { makeStyles, Theme, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';
import ImageField from 'web-components/lib/components/inputs/ImageField';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import Description from 'web-components/lib/components/description';
import Title from 'web-components/lib/components/title';
import CropImageModal from 'web-components/lib/components/modal/CropImageModal';
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
  quoteTitle: {
    marginBottom: theme.spacing(5),
    display: 'flex',
    alignItems: 'baseline',
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
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalTitle: {
    maxWidth: '70%',
    textAlign: 'center',
    paddingBottom: theme.spacing(4),
  },
  modalCard: {
    padding: theme.spacing(6, 4),
    whiteSpace: 'pre-wrap',
  },
  modalText: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
  },
  examplePageText: {
    fontSize: theme.typography.pxToRem(16),
    paddingBottom: theme.spacing(5),
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
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState('');
  const { data: graphData } = useShaclGraphByUriQuery({
    variables: {
      uri: 'http://regen.network/ProjectPageShape',
    },
  });

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event && event.target && event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      toBase64(file).then(image => {
        if (typeof image === 'string') {
          setUploadedImage(image);
          setCropModalOpen(true);
        }
      });
    }
  };

  const handleCropModalClose = (): void => {
    setUploadedImage('');
    // setImage('');
    setCropModalOpen(false);
  };

  const handleCropModalSubmit = (croppedImage: HTMLImageElement): void => {
    const imageUrl = croppedImage.src;
    // setImage(imageUrl);
    setCropModalOpen(false);
  };

  // Convert file to base64 string
  const toBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

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
                {/* <Field
                  className={styles.field}
                  component={ImageField}
                  label="Preview photo"
                  description="Choose the summary photo that will show up in project previews."
                  name="['http://regen.network/previewPhoto']"
                /> */}
                <input type="file" hidden onChange={onFileChange} accept="image/*" id="image-upload-input" />
                <label htmlFor="image-upload-input">
                  <OutlinedButton isImageBtn>Add Preview photo</OutlinedButton>
                </label>
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
      <CropImageModal
        open={cropModalOpen}
        onClose={handleCropModalClose}
        onSubmit={handleCropModalSubmit}
        initialImage={uploadedImage}
      />
    </>
  );
};

export { MediaForm };
