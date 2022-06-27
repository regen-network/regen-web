import React from 'react';
import { useTheme } from '@mui/styles';
import {
  useMediaQuery,
  Grid,
  FormHelperText,
  styled,
  Box,
} from '@mui/material';
import { Form, Field, getIn, useFormikContext } from 'formik';
import { useParams } from 'react-router-dom';

import { ImageUpload } from 'web-components/lib/components/inputs/ImageUpload';
import { VideoInput } from 'web-components/lib/components/inputs/VideoInput';
import FormLabel from 'web-components/lib/components/inputs/FormLabel';
import { UrlType } from 'web-components/lib/utils/schemaURL';

import getApiUri from '../../../lib/apiUri';
import { useMediaFormStyles } from './useMediaFormStyles';

import { cropAspect } from './MediaForm';
import type { MediaBaseValues, MediaBaseErrors } from './MediaForm';

export interface MediaValuesNonVCS extends MediaBaseValues {
  'regen:landStewardPhoto'?: UrlType;
}

type valueObject = { '@value': string };
export interface MediaErrorsNonVCS extends MediaBaseErrors {
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

/** Media form for non-VCS projects */
const MediaFormNonVCS = (): JSX.Element => {
  const styles = useMediaFormStyles();
  const theme = useTheme();
  const apiUri = getApiUri();
  const { projectId } = useParams();
  const isTabletOrLarger = useMediaQuery(theme.breakpoints.up('sm'));

  const ImageFieldFull = ({
    buttonText = '+ Add Photo',
    ...props
  }: {
    buttonText?: string;
    description?: string;
    label?: string;
    labelSubText?: string;
    name: string;
  }): JSX.Element => (
    <Field
      apiServerUrl={apiUri}
      buttonText={buttonText}
      classes={{ main: styles.fullSizeMedia }}
      component={ImageUpload}
      description={props.description}
      fixedCrop={cropAspect}
      label={props.label}
      labelSubText={props.labelSubText}
      name={props.name}
      projectId={projectId}
      optional
      isDrop
    />
  );

  const ImageFieldSmall = (props: {
    buttonText?: string;
    hideDragText?: boolean;
    name: string;
  }): JSX.Element => (
    <Field
      apiServerUrl={apiUri}
      buttonText={props.buttonText}
      classes={{ button: styles.smallButton }}
      component={ImageUpload}
      fixedCrop={cropAspect}
      hideDragText={props.hideDragText}
      name={props.name}
      projectId={projectId}
      isDrop
    />
  );

  const { errors, touched } = useFormikContext<MediaValuesNonVCS>();

  return (
    <Form translate="yes">
      <ImageFieldFull
        buttonText="+ Add preview Photo"
        description="Choose the summary photo that will show up in project previews."
        label="Preview photo"
        name="regen:previewPhoto.@value"
      />
      <Box sx={{ mt: [8, 10] }}>
        <FormLabel
          label="Gallery Photos"
          labelSubText="(min 4 photos)"
          description="People love pictures of people! Upload images of the land stewards, in addition to the land and animals."
        />
        <Grid container spacing={3} direction="row" sx={{ mt: 1 }}>
          <GalleryImgGrid item xs={6} sm="auto">
            {/* left */}
            <ImageFieldSmall
              name="regen:galleryPhotos.@list[0].@value"
              buttonText="+ Add Photo"
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
                <ImageFieldSmall
                  hideDragText
                  name="regen:galleryPhotos.@list[1].@value"
                />
              </Grid>
              <Grid item sm={12} sx={{ maxHeight: 72 }}>
                {/* bottom */}
                <ImageFieldSmall
                  hideDragText
                  name="regen:galleryPhotos.@list[2].@value"
                />
              </Grid>
            </Grid>
          ) : (
            <>
              <GalleryImgGrid item xs={6} sm={12}>
                {/* top */}
                <ImageFieldSmall
                  buttonText="+ Add Photo"
                  name="regen:galleryPhotos.@list[1].@value"
                />
              </GalleryImgGrid>
              <GalleryImgGrid item xs={6} sm={12}>
                {/* bottom */}
                <ImageFieldSmall
                  buttonText="+ Add Photo"
                  name="regen:galleryPhotos.@list[2].@value"
                />
              </GalleryImgGrid>
            </>
          )}

          <GalleryImgGrid item xs={6} sm="auto">
            {/* right */}
            <ImageFieldSmall
              buttonText="+ Add Photo"
              name="regen:galleryPhotos.@list[3].@value"
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
        component={VideoInput}
        label="Video url"
        optional
        description="Copy and paste a video url from YouTube, Vimeo, or Facebook."
        name="regen:videoURL.@value"
      />
      <ImageFieldFull
        label="Land Steward photo"
        labelSubText="(required if you don’t add a video)"
        description="Upload a nice portrait of the land stewards and their families. This should be different from the other photos of land stewards you uploaded in the gallery above."
        name="regen:landStewardPhoto.@value"
      />
    </Form>
  );
};

export { MediaFormNonVCS };
