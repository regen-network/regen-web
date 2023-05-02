import { MutableRefObject } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import {
  ImageDrop,
  ImageDropProps,
} from 'web-components/lib/components/inputs/new/ImageDrop/ImageDrop';
import { Radio } from 'web-components/lib/components/inputs/new/Radio/Radio';
import { RADIO_PREFERABLE } from 'web-components/lib/components/inputs/new/Radio/Radio.constants';
import { RadioGroup } from 'web-components/lib/components/inputs/new/RadioGroup/RadioGroup';
import TextField from 'web-components/lib/components/inputs/new/TextField/TextField';
import { VideoInput } from 'web-components/lib/components/inputs/new/VideoInput/VideoInput';

import { apiUri } from 'lib/apiUri';

import { useProjectEditContext } from 'pages';

import { cropAspectMediaForm } from './MediaForm.constants';
import { MediaFormSchemaType } from './MediaForm.schema';
import { gethandleDelete, getHandleUpload } from './MediaForm.utils';
import { useMediaFormStyles } from './useMediaFormStyles';

type Props = {
  projectId?: string;
  fileNamesToDeleteRef: MutableRefObject<string[]>;
};

export const MediaFormStory = ({ fileNamesToDeleteRef, projectId }: Props) => {
  const { classes } = useMediaFormStyles();
  const ctx = useFormContext<MediaFormSchemaType>();
  const { isDirtyRef } = useProjectEditContext();
  const { register, control, setValue, formState } = ctx;
  const { errors } = formState;
  const imageDropCommonProps: Partial<ImageDropProps> = {
    classes: { main: classes.fullSizeMedia },
    buttonText: '+ Add Photo',
    fixedCrop: cropAspectMediaForm,
  };

  /* Watcher */

  const storyMedia = useWatch({ control, name: 'regen:storyMedia' });

  /* Setter */

  const setStoryMediaUrl = (value: string): void => {
    setValue('regen:storyMedia.schema:url', value);
    isDirtyRef.current = true;
  };

  /* Callbacks  */

  const projectPath = `projects/${projectId}`;
  const handleUpload = getHandleUpload({
    apiServerUrl: apiUri,
    projectPath,
  });
  const handleDelete = gethandleDelete({
    fileNamesToDeleteRef,
    callback: () => {
      setValue('regen:previewPhoto', {
        'schema:url': '',
        'schema:creditText': '',
      });
      isDirtyRef.current = true;
    },
  });

  return (
    <RadioGroup>
      <>
        <Radio
          label={'Add a video'}
          labelOptionalText={RADIO_PREFERABLE}
          value={'schema:VideoObject'}
          helperText={'Copy and paste an embeddable video url.'}
          selectedValue={storyMedia?.['@type']}
          sx={{ mt: 5.25 }}
          {...register(`regen:storyMedia.@type`)}
        >
          <VideoInput
            value={storyMedia?.['schema:url']}
            setValue={setStoryMediaUrl}
            {...register(`regen:storyMedia.schema:url`)}
          />
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
          <ImageDrop
            value={storyMedia?.['schema:url']}
            credit={storyMedia?.['schema:creditText']}
            setValue={setStoryMediaUrl}
            onUpload={handleUpload}
            onDelete={handleDelete}
            dropZoneOption={{ maxFiles: 1 }}
            error={!!errors['regen:storyMedia']}
            helperText={errors['regen:storyMedia']?.message}
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
          </ImageDrop>
        </Radio>
      </>
    </RadioGroup>
  );
};
