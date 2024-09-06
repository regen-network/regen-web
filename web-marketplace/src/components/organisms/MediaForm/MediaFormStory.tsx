import { MutableRefObject } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useSetAtom } from 'jotai';

import {
  FileDrop,
  FileDropProps,
} from 'web-components/src/components/inputs/new/FileDrop/FileDrop';
import { Radio } from 'web-components/src/components/inputs/new/Radio/Radio';
import { RADIO_PREFERABLE } from 'web-components/src/components/inputs/new/Radio/Radio.constants';
import { RadioGroup } from 'web-components/src/components/inputs/new/RadioGroup/RadioGroup';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import { VideoInput } from 'web-components/src/components/inputs/new/VideoInput/VideoInput';
import CropImageModal from 'web-components/src/components/modal/CropImageModal';
import { UseStateSetter } from 'web-components/src/types/react/useState';

import { apiUri } from 'lib/apiUri';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { IMAGE_STORAGE_BASE_URL } from 'lib/env';

import { useProjectEditContext } from 'pages';

import { useHandleUpload } from './hooks/useHandleUpload';
import {
  cropAspectMediaForm,
  IMAGE_UPLOAD_BUTTON_LABEL,
  STORY_LABEL,
  VIDEO_INPUT_HELPER_LINK_TEXT,
  VIDEO_INPUT_HELPER_TEXT,
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
  const { _ } = useLingui();
  const { classes } = useMediaFormStyles();
  const ctx = useFormContext<MediaFormSchemaType>();
  const { isDirtyRef } = useProjectEditContext();
  const { register, control, setValue, formState, setError, clearErrors } = ctx;
  const { errors } = formState;
  const imageDropCommonProps: Partial<FileDropProps> = {
    classes: { main: classes.fullSizeMedia },
    buttonText: _(IMAGE_UPLOAD_BUTTON_LABEL),
    fixedCrop: cropAspectMediaForm,
  };
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);

  /* Watcher */

  const storyMedia = useWatch({ control, name: 'regen:storyMedia' });
  const isVideo = storyMedia?.['@type'] === 'schema:VideoObject';
  const isImage = storyMedia?.['@type'] === 'schema:ImageObject';
  const url = storyMedia?.['schema:url'];
  const isImageUrl = url?.includes(IMAGE_STORAGE_BASE_URL);

  /* Setter */

  const setStoryMediaUrl = ({ value }: { value?: string }): void => {
    if (value)
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
    callback: (doSetValue: boolean = true) => {
      if (doSetValue)
        setValue('regen:storyMedia', {
          '@type': '',
          'schema:url': '',
          'schema:creditText': '',
        });
      isDirtyRef.current = true;
    },
  });

  return (
    <RadioGroup label={_(STORY_LABEL)} optional>
      <>
        <Radio
          label={_(msg`Add a video`)}
          optional={RADIO_PREFERABLE}
          value={'schema:VideoObject'}
          helperText={
            <span>
              {_(VIDEO_INPUT_HELPER_TEXT)}{' '}
              <a
                className="font-bold"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/cookpete/react-player?tab=readme-ov-file#supported-media"
              >
                {_(VIDEO_INPUT_HELPER_LINK_TEXT)}
              </a>
            </span>
          }
          selectedValue={storyMedia?.['@type']}
          sx={{ mt: 5.25 }}
          {...register(`regen:storyMedia.@type`)}
        >
          {isVideo && (
            <VideoInput
              value={url && !isImageUrl ? url : ''}
              setValue={setStoryMediaUrl}
              setErrorBanner={setErrorBannerTextAtom}
              setError={(err: string | undefined) => {
                if (err)
                  setError('regen:storyMedia.schema:url', { message: err });
                else clearErrors('regen:storyMedia.schema:url');
              }}
              error={!!errors['regen:storyMedia']?.['schema:url']}
              helperText={errors['regen:storyMedia']?.['schema:url']?.message}
              {...register(`regen:storyMedia.schema:url`)}
            />
          )}
        </Radio>
        <Radio
          label={_(msg`Add a photo`)}
          value={'schema:ImageObject'}
          selectedValue={storyMedia?.['@type']}
          helperText={_(
            msg`If you don’t have a video for this project, you can add a photo to enhance the story section of your project page.`,
          )}
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
              dropZoneOption={{ multiple: false }}
              error={!!errors['regen:storyMedia']}
              helperText={errors['regen:storyMedia']?.message}
              accept="image/*"
              renderModal={({
                initialFile,
                open,
                value,
                onClose,
                onSubmit,
              }) => (
                <CropImageModal
                  open={open}
                  onClose={onClose}
                  onSubmit={onSubmit}
                  initialImage={initialFile}
                  fixedCrop={cropAspectMediaForm}
                  isIgnoreCrop={!!value}
                >
                  <TextField
                    type="text"
                    label={_(msg`Photo credit`)}
                    {...register('regen:storyMedia.schema:creditText')}
                    helperText={
                      errors['regen:storyMedia']?.['schema:creditText']?.message
                    }
                    error={!!errors['regen:storyMedia']?.['schema:creditText']}
                    optional
                  />
                </CropImageModal>
              )}
              optional
              {...imageDropCommonProps}
              {...register('regen:storyMedia.schema:url')}
            />
          )}
        </Radio>
      </>
    </RadioGroup>
  );
};
