import React from 'react';
import { useParams } from 'react-router-dom';
import { Field, Form, useFormikContext } from 'formik';

import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import {
  ImageUpload,
  ImageUploadProps,
} from 'web-components/lib/components/inputs/ImageUpload';
import { VideoInput } from 'web-components/lib/components/inputs/VideoInput';

import getApiUri from '../../../lib/apiUri';
import { cropAspect, MediaBaseErrors, MediaBaseValues } from './MediaForm';
import { useMediaFormStyles } from './useMediaFormStyles';

export interface MediaValuesSimple extends MediaBaseValues {
  'schema:creditText'?: string;
}

export interface MediaErrorsSimple extends MediaBaseErrors {
  'schema:creditText'?: string;
  'regen:galleryPhotos'?: {
    '@list'?: Array<{ '@value'?: string }>;
  };
}

/** Simplified media form content for new project-page flow */
const MediaFormSimple = (): JSX.Element => {
  const { classes } = useMediaFormStyles();
  const apiServerUrl = getApiUri();
  const { projectId } = useParams();
  const { values } = useFormikContext<MediaValuesSimple>();

  const imgDefaultProps: Partial<ImageUploadProps> = {
    apiServerUrl,
    projectId,
    optional: true,
    isDrop: true,
    classes: { main: classes.fullSizeMedia },
    buttonText: '+ Add Photo',
    fixedCrop: cropAspect,
  };

  const shouldRenderGalleryPhoto = (i: number): boolean => {
    // don't show option for gallery if there is no preview photo
    if (!values['regen:previewPhoto']?.['@value']) return false;
    // if there is a preview photo, render the first gallary photo
    if (values['regen:previewPhoto']['@value'] && i === 0) return true;
    // otherwise, render based on the presence of last index
    return Boolean(values['regen:galleryPhotos']?.['@list'][i - 1]?.['@value']);
  };

  return (
    <Form translate="yes">
      <Field
        {...imgDefaultProps}
        name="regen:previewPhoto.@value"
        description="Choose the photos that will show up on the project page. The first photo will be your preview photo."
        label="Photos"
        component={ImageUpload}
      />
      {(values['regen:galleryPhotos']?.['@list'] || []).map((_photo, i) =>
        shouldRenderGalleryPhoto(i) ? (
          <Field
            {...imgDefaultProps}
            key={i}
            name={`regen:galleryPhotos.@list[${i}].@value`}
            component={ImageUpload}
          />
        ) : (
          <React.Fragment key={i} /> // Formik expects a react element - this avoids console bug
        ),
      )}
      <Field
        optional
        component={ControlledTextField}
        label="Photo Credit"
        name="schema:creditText"
      />
      <Field
        optional
        component={VideoInput}
        description="Copy and paste a video url from YouTube, Vimeo, or Facebook."
        label="Video Url"
        name="regen:videoURL.@value"
      />
    </Form>
  );
};

export { MediaFormSimple };
