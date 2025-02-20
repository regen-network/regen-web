import { MutableRefObject, useEffect, useMemo } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { msg, plural, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { getRemainingCharacters } from 'utils/string/getRemainingCharacters';

import {
  FileDrop,
  FileDropProps,
} from 'web-components/src/components/inputs/new/FileDrop/FileDrop';
import { ReorderFields } from 'web-components/src/components/inputs/new/ReorderFields/ReorderFields';
import { TextAreaField } from 'web-components/src/components/inputs/new/TextAreaField/TextAreaField';
import { TextAreaFieldChartCounter } from 'web-components/src/components/inputs/new/TextAreaField/TextAreaField.ChartCounter';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import CropImageModal from 'web-components/src/components/modal/CropImageModal';
import { UseStateSetter } from 'web-components/src/types/react/useState';

import {
  APPLY,
  FILE_DROP_BUTTON_TEXT,
  FILE_DROP_LOCATION_TEXT,
  FILE_DROP_MOVE_DOWN_TEXT,
  FILE_DROP_MOVE_UP_TEXT,
  FILE_UPLOADING_DESCRIPTION,
  FILE_UPLOADING_TITLE,
  TITLE_CROP,
  TITLE_IGNORE_CROP,
  UPDATE,
} from 'lib/constants/shared.constants';

import { useProjectEditContext } from 'pages';
import { DragAndDropLabel } from 'components/atoms/DragAndDropLabel';

import { apiUri } from '../../../lib/apiUri';
import { UPLOAD_IMAGE } from '../EditProfileForm/EditProfileForm.constants';
import { useHandleUpload } from './hooks/useHandleUpload';
import {
  CAPTION_CHART_LIMIT,
  cropAspectMediaForm,
  DEFAULT,
  GALLERY_PHOTOS,
  GALLERY_PHOTOS_DESCRIPTION,
  IMAGE_UPLOAD_BUTTON_LABEL,
  MAIN_PHOTO,
  MAIN_PHOTO_DESCRIPTION,
} from './MediaForm.constants';
import { MediaFormSchemaType } from './MediaForm.schema';
import { MediaBaseErrors, MediaBaseValues } from './MediaForm.types';
import { getHandleDelete } from './MediaForm.utils';
import { useMediaFormStyles } from './useMediaFormStyles';

export interface MediaValuesSimple extends MediaBaseValues {
  'schema:creditText'?: string;
}

export interface MediaErrorsSimple extends MediaBaseErrors {
  'schema:creditText'?: string;
  'regen:galleryPhotos'?: Array<string>;
}

type Props = {
  offChainProjectId?: string;
  fileNamesToDeleteRef: MutableRefObject<string[]>;
  setOffChainProjectId: UseStateSetter<string | undefined>;
};

/** Simplified media form content for new project-page flow */

export const MediaFormPhotos = ({
  offChainProjectId,
  fileNamesToDeleteRef,
  setOffChainProjectId,
}: Props): JSX.Element => {
  const { _ } = useLingui();
  const { classes } = useMediaFormStyles();
  const ctx = useFormContext<MediaFormSchemaType>();
  const { register, control, setValue, formState } = ctx;
  const { errors } = formState;
  // Since the form is getting modified by default, to add an empty input field for the gallery,
  // we need to manually keep track of the dirty state.
  // Update this ref whenever an action is performed in the form
  const { isDirtyRef } = useProjectEditContext();
  const imageDropCommonProps: Partial<FileDropProps> = {
    classes: { main: classes.fullSizeMedia },
    buttonText: _(IMAGE_UPLOAD_BUTTON_LABEL),
    fixedCrop: cropAspectMediaForm,
  };

  const { fields, append, remove, move } = useFieldArray({
    name: 'regen:galleryPhotos',
    control: control,
  });

  const cropImageModalText = useMemo(
    () => ({
      uploadText: _(UPLOAD_IMAGE),
      updateText: _(UPDATE),
      applyText: _(APPLY),
      title: _(TITLE_CROP),
      titleIgnoreCrop: _(TITLE_IGNORE_CROP),
    }),
    [_],
  );
  /* Watcher */

  const previewPhoto = useWatch({ control, name: 'regen:previewPhoto' });
  const galleryPhotos = useWatch({ control, name: 'regen:galleryPhotos' });

  /* Setter */

  const setPreviewPhoto = ({ value }: { value?: string }): void => {
    if (value)
      setValue('regen:previewPhoto.schema:url', encodeURI(value), {
        shouldDirty: true,
      });
    isDirtyRef.current = true;
  };
  const setGalleryPhotos = ({
    value,
    fieldIndex,
    lastInMultiUpload,
  }: {
    value?: string;
    fieldIndex: number;
    lastInMultiUpload: boolean;
  }): void => {
    if (lastInMultiUpload) {
      append({
        'schema:url': DEFAULT,
        'schema:caption': '',
        'schema:creditText': '',
      });
    }
    if (value)
      setValue(
        `regen:galleryPhotos.${fieldIndex}.schema:url`,
        encodeURI(value),
      );
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
        setValue('regen:previewPhoto', {
          'schema:url': '',
          'schema:creditText': '',
        });
      isDirtyRef.current = true;
    },
  });
  const getHandleDeleteWithIndex = (fieldIndex: number) =>
    getHandleDelete({
      fileNamesToDeleteRef,
      callback: (doSetValue: boolean = true) => {
        if (doSetValue) remove(fieldIndex);
        isDirtyRef.current = true;
      },
    });

  /* Effect */

  useEffect(() => {
    if (
      fields?.length === 0 ||
      fields?.every(field => field['schema:url'] !== DEFAULT)
    ) {
      append({
        'schema:url': DEFAULT,
        'schema:caption': '',
        'schema:creditText': '',
      });
    }
  }, [append, fields]);

  return (
    <>
      <FileDrop
        fileUploadingTitle={_(FILE_UPLOADING_TITLE)}
        fileUploadingDescription={_(FILE_UPLOADING_DESCRIPTION)}
        locationText={_(FILE_DROP_LOCATION_TEXT)}
        moveUpText={_(FILE_DROP_MOVE_UP_TEXT)}
        moveDownText={_(FILE_DROP_MOVE_DOWN_TEXT)}
        buttonText={_(FILE_DROP_BUTTON_TEXT)}
        dragAndDropLabel={<DragAndDropLabel />}
        label={_(MAIN_PHOTO)}
        description={_(MAIN_PHOTO_DESCRIPTION)}
        value={previewPhoto?.['schema:url']}
        credit={previewPhoto?.['schema:creditText']}
        setValue={setPreviewPhoto}
        onUpload={handleUpload}
        onDelete={handleDelete}
        dropZoneOption={{ multiple: false }}
        error={!!errors['regen:previewPhoto']}
        helperText={errors['regen:previewPhoto']?.message}
        accept="image/*"
        renderModal={({ initialFile, open, value, onClose, onSubmit }) => (
          <CropImageModal
            open={open}
            onClose={onClose}
            onSubmit={onSubmit}
            initialImage={initialFile}
            fixedCrop={cropAspectMediaForm}
            isIgnoreCrop={!!value}
            uploadText={_(UPLOAD_IMAGE)}
            updateText={_(UPDATE)}
            applyText={_(APPLY)}
            title={_(TITLE_CROP)}
            titleIgnoreCrop={_(TITLE_IGNORE_CROP)}
          >
            <TextField
              type="text"
              label={_(msg`Photo credit`)}
              {...register('regen:previewPhoto.schema:creditText')}
              helperText={
                errors['regen:previewPhoto']?.['schema:creditText']?.message
              }
              error={!!errors['regen:previewPhoto']?.['schema:creditText']}
              optional
            />
          </CropImageModal>
        )}
        optional
        {...imageDropCommonProps}
        {...register('regen:previewPhoto.schema:url')}
      />

      <ReorderFields
        label={_(GALLERY_PHOTOS)}
        description={_(GALLERY_PHOTOS_DESCRIPTION)}
        fields={fields}
        move={move}
        getFieldElement={(field: Record<'id', string>, index: number) => {
          const url = galleryPhotos?.[index]?.['schema:url'];
          const isFirst = index === 0;
          const isLast = index === fields.length - 1;
          const hasFieldError = !!errors['regen:galleryPhotos']?.[index];
          const fieldErrorMessage =
            errors['regen:galleryPhotos']?.[index]?.['schema:caption']?.message;

          const remainingCaptionCharacters = getRemainingCharacters({
            value: galleryPhotos?.[index]?.['schema:caption'],
            charLimit: CAPTION_CHART_LIMIT,
          });

          return (
            <FileDrop
              fileUploadingTitle={_(FILE_UPLOADING_TITLE)}
              fileUploadingDescription={_(FILE_UPLOADING_DESCRIPTION)}
              locationText={_(FILE_DROP_LOCATION_TEXT)}
              moveUpText={_(FILE_DROP_MOVE_UP_TEXT)}
              moveDownText={_(FILE_DROP_MOVE_DOWN_TEXT)}
              buttonText={_(FILE_DROP_BUTTON_TEXT)}
              dragAndDropLabel={<DragAndDropLabel />}
              moveUp={isFirst ? undefined : () => move(index, index - 1)}
              moveDown={
                index === fields.length - 2
                  ? undefined
                  : () => move(index, index + 1)
              }
              onDelete={getHandleDeleteWithIndex(index)}
              onUpload={handleUpload}
              setValue={setGalleryPhotos}
              value={url === DEFAULT ? '' : url}
              caption={galleryPhotos?.[index]?.['schema:caption']}
              credit={galleryPhotos?.[index]?.['schema:creditText']}
              error={
                (!!errors['regen:galleryPhotos'] && isLast) || hasFieldError
              }
              helperText={
                fieldErrorMessage ?? errors['regen:galleryPhotos']?.message
              }
              fieldIndex={index}
              dropZoneOption={{ multiple: true }}
              className={classes.galleryItem}
              defaultStyle={isFirst ? true : false}
              accept="image/*"
              multi
              renderModal={({
                initialFile,
                open,
                value,
                currentIndex,
                onClose,
                onSubmit,
              }) => (
                <CropImageModal
                  open={open}
                  onClose={onClose}
                  onSubmit={onSubmit}
                  initialImage={initialFile}
                  fixedCrop={cropAspectMediaForm}
                  isCropSubmitDisabled={hasFieldError}
                  isIgnoreCrop={!!value}
                  {...cropImageModalText}
                >
                  <TextAreaField
                    type="text"
                    label={<Trans>Caption</Trans>}
                    rows={3}
                    minRows={3}
                    multiline
                    optional
                    helperText={
                      errors['regen:galleryPhotos']?.[currentIndex]?.[
                        'schema:caption'
                      ]?.message
                    }
                    error={
                      !!errors['regen:galleryPhotos']?.[currentIndex]?.[
                        'schema:caption'
                      ]
                    }
                    {...register(
                      `regen:galleryPhotos.${currentIndex}.schema:caption`,
                    )}
                  >
                    <TextAreaFieldChartCounter
                      value={galleryPhotos?.[currentIndex]?.['schema:caption']}
                      charsLeft={remainingCaptionCharacters}
                      remainingCharactersText={plural(
                        remainingCaptionCharacters,
                        {
                          one: `${remainingCaptionCharacters} character remaining`,
                          other: `${remainingCaptionCharacters} characters remaining`,
                        },
                      )}
                    />
                  </TextAreaField>
                  <TextField
                    type="text"
                    label={<Trans>Photo credit</Trans>}
                    helperText={
                      errors['regen:galleryPhotos']?.[currentIndex]?.[
                        'schema:creditText'
                      ]?.message
                    }
                    error={
                      !!errors['regen:galleryPhotos']?.[currentIndex]?.[
                        'schema:creditText'
                      ]
                    }
                    optional
                    {...register(
                      `regen:galleryPhotos.${currentIndex}.schema:creditText`,
                    )}
                  />
                </CropImageModal>
              )}
              optional
              {...register(`regen:galleryPhotos.${index}.schema:url`)}
              {...imageDropCommonProps}
            />
          );
        }}
      />
    </>
  );
};
