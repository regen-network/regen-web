import { MutableRefObject } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import CropImageModal from 'web-components/src/components/modal/CropImageModal';
import {
  FileDrop,
  ImageDropProps,
} from 'web-components/src/components/inputs/new/FileDrop/FileDrop';
import { Radio } from 'web-components/src/components/inputs/new/Radio/Radio';
import { RADIO_PREFERABLE } from 'web-components/src/components/inputs/new/Radio/Radio.constants';
import { RadioGroup } from 'web-components/src/components/inputs/new/RadioGroup/RadioGroup';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import { VideoInput } from 'web-components/src/components/inputs/new/VideoInput/VideoInput';
import { UseStateSetter } from 'web-components/src/types/react/useState';

import { apiUri } from 'lib/apiUri';
import { IMAGE_STORAGE_BASE_URL } from 'lib/env';

import { useProjectEditContext } from 'pages';

import { useHandleUpload } from './hooks/useHandleUpload';
import {
  cropAspectMediaForm,
  IMAGE_UPLOAD_BUTTON_LABEL,
  STORY_LABEL,
} from './MediaForm.constants';
import { MediaFormSchemaType } from './MediaForm.schema';
import { getHandleDelete } from './MediaForm.utils';
import { useMediaFormStyles } from './useMediaFormStyles';

type Props = {
  offChainProjectId?: string;
  fileNamesToDeleteRef: MutableRefObject<string[]>;
  setOffChainProjectId: UseStateSetter<string | undefined>;
};

export const MediaFormStory = ({
  fileNamesToDeleteRef,
  offChainProjectId,
  setOffChainProjectId,
}: Props) => {
  const { classes } = useMediaFormStyles();
  const ctx = useFormContext<MediaFormSchemaType>();
  const { isDirtyRef } = useProjectEditContext();
  const { register, control, setValue, formState } = ctx;
  const { errors } = formState;
  const imageDropCommonProps: Partial<ImageDropProps> = {
    classes: { main: classes.fullSizeMedia },
    buttonText: IMAGE_UPLOAD_BUTTON_LABEL,
    fixedCrop: cropAspectMediaForm,
  };

  /* Watcher */

  const storyMedia = useWatch({ control, name: 'regen:storyMedia' });
  const isVideo = storyMedia?.['@type'] === 'schema:VideoObject';
  const isImage = storyMedia?.['@type'] === 'schema:ImageObject';
  const url = storyMedia?.['schema:url'];
  const isImageUrl = url?.includes(IMAGE_STORAGE_BASE_URL);

  /* Setter */

  const setStoryMediaUrl = (value: string): void => {
    setValue('regen:storyMedia.schema:url', encodeURI(value), {
      shouldDirty: true,
    });
    isDirtyRef.current = true;
  };

  /* Callbacks  */

  const { handleUpload } = useHandleUpload({
    offChainProjectId,
    apiServerUrl: apiUri,
    setOffChainProjectId,
  });
  const handleDelete = getHandleDelete({
    fileNamesToDeleteRef,
    callback: () => {
      setValue('regen:storyMedia', {
        '@type': '',
        'schema:url': '',
        'schema:creditText': '',
      });
      isDirtyRef.current = true;
    },
  });

  return (
    <RadioGroup label={STORY_LABEL} optional>
      <>
        <Radio
          label={'Add a video'}
          optional={RADIO_PREFERABLE}
          value={'schema:VideoObject'}
          helperText={'Copy and paste an embeddable video url.'}
          selectedValue={storyMedia?.['@type']}
          sx={{ mt: 5.25 }}
          {...register(`regen:storyMedia.@type`)}
        >
          {isVideo && (
            <VideoInput
              value={url && !isImageUrl ? url : ''}
              setValue={setStoryMediaUrl}
              {...register(`regen:storyMedia.schema:url`)}
            />
          )}
        </Radio>
        <Radio
          label={'Add a photo'}
          value={'schema:ImageObject'}
          selectedValue={storyMedia?.['@type']}
          helperText={
            'If you don’t have a video for this project, you can add a photo to enhance the story section of your project page.'
          }
          sx={{ mt: 2.5 }}
          {...register(`regen:storyMedia.@type`)}
        >
          {isImage && (
            <FileDrop
              value={url && isImageUrl ? url : ''}
              credit={storyMedia?.['schema:creditText']}
              setValue={setStoryMediaUrl}
              onUpload={handleUpload}
              onDelete={handleDelete}
              dropZoneOption={{ maxFiles: 1 }}
              error={!!errors['regen:storyMedia']}
              helperText={errors['regen:storyMedia']?.message}
              accept="image/*"
              renderModal={({
                initialImage,
                open,
                value,
                children,
                onClose,
                onSubmit,
              }) => (
                <CropImageModal
                  open={open}
                  onClose={onClose}
                  onSubmit={onSubmit}
                  initialImage={initialImage}
                  fixedCrop={cropAspectMediaForm}
                  isIgnoreCrop={!!value}
                >
                  {children}
                </CropImageModal>
              )}
              optional
              {...imageDropCommonProps}
              {...register('regen:storyMedia.schema:url')}
            >
              <TextField
                type="text"
                label="Photo credit"
                {...register('regen:storyMedia.schema:creditText')}
                helperText={
                  errors['regen:storyMedia']?.['schema:creditText']?.message
                }
                error={!!errors['regen:storyMedia']?.['schema:creditText']}
                optional
              />
            </FileDrop>
          )}
        </Radio>
      </>
    </RadioGroup>
  );
};
