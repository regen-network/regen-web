import { useParams } from 'react-router-dom';
import {
  Box,
  FormHelperText,
  Grid,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Field, Form, getIn, useFormikContext } from 'formik';

import FormLabel from 'web-components/src/components/inputs/FormLabel';
import {
  ImageUpload,
  ImageUploadProps,
} from 'web-components/src/components/inputs/ImageUpload';
import { VideoInput } from 'web-components/src/components/inputs/VideoInput';

import { UrlType } from 'lib/rdf/types';

import { apiUri } from '../../../lib/apiUri';
import { cropAspectMediaForm } from './MediaForm.constants';
import { MediaBaseErrors, MediaBaseValues } from './MediaForm.types';
import { useMediaFormStyles } from './useMediaFormStyles';

export interface MediaValuesLegacy extends MediaBaseValues {
  'regen:landStewardPhoto'?: UrlType;
}

type valueObject = { '@value': string };
export interface MediaErrorsLegacy extends MediaBaseErrors {
  'regen:galleryPhotos'?: string;
  'regen:landStewardPhoto'?: valueObject;
}

const GalleryImgGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    height: theme.typography.pxToRem(169),
    flex: 1,
  },
  [theme.breakpoints.down('sm')]: {
    height: theme.typography.pxToRem(139),
  },
}));

/** Form content for legacy projects - must be used within a <Formik> context */
const MediaFormLegacy = (): JSX.Element => {
  const { classes } = useMediaFormStyles();
  const theme = useTheme();
  const { projectId } = useParams();
  const { errors, touched } = useFormikContext<MediaValuesLegacy>();
  const isTabletOrLarger = useMediaQuery(theme.breakpoints.up('sm'));

  /** defaults for image fields */
  const imgFieldProps: Partial<ImageUploadProps> = {
    isDrop: true,
    apiServerUrl: apiUri,
    fixedCrop: cropAspectMediaForm,
    projectId: projectId,
  };

  const smallImgFieldProps: Partial<ImageUploadProps> = {
    ...imgFieldProps,
    classes: { button: classes.smallButton },
  };

  const largeImgFieldProps: Partial<ImageUploadProps> = {
    ...imgFieldProps,
    classes: { main: classes.fullSizeMedia },
  };

  return (
    <Form
      translate="yes"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <Field
        {...largeImgFieldProps}
        buttonText="+ Add preview Photo"
        component={ImageUpload}
        description="Choose the summary photo that will show up in project previews."
        label="Preview photo"
        name="regen:previewPhoto.@value"
      />
      <Box sx={{ mt: [8, 10] }}>
        <FormLabel
          description="People love pictures of people! Upload images of the land stewards, in addition to the land and animals."
          label="Gallery Photos"
          optional="(min 4 photos)"
        />
        <Grid container spacing={3} direction="row" sx={{ mt: 1 }}>
          <GalleryImgGrid item xs={6} sm="auto">
            {/* left */}
            <Field
              {...smallImgFieldProps}
              buttonText="+ Add Photo"
              component={ImageUpload}
              name="regen:galleryPhotos.@list[0].@value"
            />
          </GalleryImgGrid>
          {isTabletOrLarger ? (
            <Grid
              item
              sm={3}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Grid item sm={12} sx={{ maxHeight: 72 }}>
                {/* top */}
                <Field
                  {...smallImgFieldProps}
                  hideDragText
                  component={ImageUpload}
                  name="regen:galleryPhotos.@list[1].@value"
                />
              </Grid>
              <Grid item sm={12} sx={{ maxHeight: 72 }}>
                {/* bottom */}
                <Field
                  {...smallImgFieldProps}
                  hideDragText
                  component={ImageUpload}
                  name="regen:galleryPhotos.@list[2].@value"
                />
              </Grid>
            </Grid>
          ) : (
            <>
              <GalleryImgGrid item xs={6} sm={12}>
                {/* top */}
                <Field
                  {...smallImgFieldProps}
                  buttonText="+ Add Photo"
                  component={ImageUpload}
                  name="regen:galleryPhotos.@list[1].@value"
                />
              </GalleryImgGrid>
              <GalleryImgGrid item xs={6} sm={12}>
                {/* bottom */}
                <Field
                  {...smallImgFieldProps}
                  buttonText="+ Add Photo"
                  component={ImageUpload}
                  name="regen:galleryPhotos.@list[2].@value"
                />
              </GalleryImgGrid>
            </>
          )}

          <GalleryImgGrid item xs={6} sm="auto">
            {/* right */}
            <Field
              {...smallImgFieldProps}
              name="regen:galleryPhotos.@list[3].@value"
              buttonText="+ Add Photo"
              component={ImageUpload}
            />
          </GalleryImgGrid>
        </Grid>
        {errors?.['regen:galleryPhotos'] &&
          (getIn(touched, `['regen:galleryPhotos'].@list[0].@value`) ||
            getIn(touched, `['regen:galleryPhotos'].@list[1].@value`) ||
            getIn(touched, `['regen:galleryPhotos'].@list[2].@value`) ||
            getIn(touched, `['regen:galleryPhotos'].@list[3].@value`)) && (
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
      </Box>
      <Field
        optional
        component={VideoInput}
        label="Video Url"
        description="Copy and paste a video url from YouTube, Vimeo, or Facebook."
        name="regen:videoURL.@value"
      />
      <Field
        {...largeImgFieldProps}
        buttonText="+ Add Photo"
        component={ImageUpload}
        description="Upload a nice portrait of the land stewards and their families. This should be different from the other photos of land stewards you uploaded in the gallery above."
        label="Land Steward Photo"
        optional="(required if you don’t add a video)"
        name="regen:landStewardPhoto.@value"
      />
    </Form>
  );
};

export { MediaFormLegacy };
