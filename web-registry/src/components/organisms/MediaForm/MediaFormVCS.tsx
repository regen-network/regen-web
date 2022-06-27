import React from 'react';
import { useParams } from 'react-router-dom';
import { Form, Field, useFormikContext } from 'formik';

import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';
import { ImageUpload } from 'web-components/lib/components/inputs/ImageUpload';
import { VideoInput } from 'web-components/lib/components/inputs/VideoInput';

import getApiUri from '../../../lib/apiUri';
import { useMediaFormStyles } from './useMediaFormStyles';

import type { MediaBaseValues, MediaBaseErrors } from './MediaForm';

export interface MediaValuesVCS extends MediaBaseValues {
  'regen:creditText'?: string;
}

export interface MediaErrorsVCS extends MediaBaseErrors {
  'regen:creditText'?: string;
  'regen:galleryPhotos'?: {
    '@list'?: Array<{ '@value'?: string }>;
  };
}

/** Simplified media form for VCS projects */
const MediaFormVCS = (): JSX.Element => {
  const styles = useMediaFormStyles();
  const apiUri = getApiUri();
  const { projectId } = useParams();
  const cropAspect = { aspect: 322 / 211 }; // px values pulled from mockups (width / height)

  const ImageField = (props: {
    name: string;
    description?: string;
    label?: string;
  }): JSX.Element => (
    <Field
      classes={{ main: styles.fullSizeMedia }}
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

  const { values } = useFormikContext<MediaValuesVCS>();

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
      <ImageField
        name="regen:previewPhoto.@value"
        description="Choose the photos that will show up on the project page. The first photo will be your preview photo."
        label="Photos"
      />
      {(values['regen:galleryPhotos']?.['@list'] || []).map((_photo, i) =>
        shouldRenderGalleryPhoto(i) ? (
          <ImageField key={i} name={`regen:galleryPhotos.@list[${i}].@value`} />
        ) : (
          <React.Fragment key={i} /> // Formik expects a react element - this avoids console bug
        ),
      )}
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
    </Form>
  );
};

export { MediaFormVCS };
