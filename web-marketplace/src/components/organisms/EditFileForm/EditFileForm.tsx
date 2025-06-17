import { useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { msg, plural } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { Feature, Point } from 'geojson';
import { getRemainingCharacters } from 'utils/string/getRemainingCharacters';

import { isImage } from 'web-components/src/components/inputs/new/FileDrop/FileDrop.utils';
import { isGeocodingFeature } from 'web-components/src/components/inputs/new/LocationField/LocationField.types';
import { LocationPicker } from 'web-components/src/components/inputs/new/LocationPicker/LocationPicker';
import { Radio } from 'web-components/src/components/inputs/new/Radio/Radio';
import { RadioGroup } from 'web-components/src/components/inputs/new/RadioGroup/RadioGroup';
import { TextAreaField } from 'web-components/src/components/inputs/new/TextAreaField/TextAreaField';
import { TextAreaFieldChartCounter } from 'web-components/src/components/inputs/new/TextAreaField/TextAreaField.ChartCounter';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import { CancelButtonFooter } from 'web-components/src/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Title } from 'web-components/src/components/typography';
import { UseStateSetter } from 'web-components/src/types/react/useState';

import { useDebounce } from 'hooks/useDebounce';

import { PostFormSchemaType } from '../PostForm/PostForm.schema';
import {
  FILE_LOCATION_DESCRIPTION,
  FILE_MAX_DESCRIPTION_LENGTH,
} from './EditFileForm.constants';

export interface Props {
  onSubmit: () => Promise<void>;
  currentIndex: number;
  projectLocation: GeocodeFeature;
  fileLocation?: Feature;
  onClose: () => void;
  mapboxToken?: string;
  geocodingPlaceName?: string;
  setDebouncedViewState: UseStateSetter<GeocodeFeature | Feature | undefined>;
}

export const EditFileForm = ({
  onSubmit,
  currentIndex,
  projectLocation,
  fileLocation,
  onClose,
  mapboxToken,
  geocodingPlaceName,
  setDebouncedViewState,
}: Props): JSX.Element => {
  const { _ } = useLingui();
  const ctx = useFormContext<PostFormSchemaType>();
  const { register, control, setValue, formState } = ctx;
  const { errors } = formState;

  const files = useWatch({ control: control, name: 'files' });
  const file = files?.[currentIndex];
  const url = file?.url;
  const mimeType = file?.mimeType;
  const description = file?.description;
  const location = file?.location;
  const locationType = file?.locationType;
  const remainingDescriptionCharacters = useMemo(
    () =>
      getRemainingCharacters({
        value: description,
        charLimit: FILE_MAX_DESCRIPTION_LENGTH,
      }),
    [description],
  );

  const debouncedValue = useDebounce(location);
  useEffect(() => {
    if (debouncedValue && !isGeocodingFeature(debouncedValue))
      setDebouncedViewState(debouncedValue);
  }, [debouncedValue, setDebouncedViewState]);

  return (
    <>
      <Title
        variant="h4"
        sx={{ textAlign: 'center' }}
        className="mb-40 sm:mb-50"
      >
        <Trans>Edit your file</Trans>
      </Title>
      {url && isImage(mimeType) && (
        <img
          className="block m-auto pb-40 sm:pb-50"
          width="180px"
          height="100%"
          src={decodeURI(url)}
          alt="preview"
        />
      )}
      <TextField
        type="text"
        label={_(msg`File name`)}
        helperText={errors.files?.[currentIndex]?.name?.message}
        error={!!errors.files?.[currentIndex]?.name}
        {...register(`files.${currentIndex}.name`)}
      />
      <TextAreaField
        type="text"
        label={_(msg`Description`)}
        className="mt-40 sm:mt-50"
        rows={3}
        minRows={3}
        multiline
        optional
        helperText={errors.files?.[currentIndex]?.description?.message}
        error={!!errors.files?.[currentIndex]?.description}
        {...register(`files.${currentIndex}.description`)}
      >
        <TextAreaFieldChartCounter
          value={description}
          charsLeft={remainingDescriptionCharacters}
          remainingCharactersText={plural(remainingDescriptionCharacters, {
            one: `${remainingDescriptionCharacters} character remaining`,
            other: `${remainingDescriptionCharacters} characters remaining`,
          })}
          sx={{ mb: { xs: 0, sm: 0 } }}
        />
      </TextAreaField>
      {isImage(mimeType) && (
        <TextField
          type="text"
          label={_(msg`Photo credit`)}
          className="mt-40 sm:mt-50"
          optional
          {...register(`files.${currentIndex}.credit`)}
        />
      )}
      <div className="flex flex-col mb-40 mt-40 sm:mb-50 sm:mt-50">
        <RadioGroup
          label={_(msg`Location`)}
          description={_(FILE_LOCATION_DESCRIPTION)}
        >
          {(location || projectLocation) && (
            <div className="h-[309px] sm:h-[409px] pb-10">
              <LocationPicker
                value={location || projectLocation}
                handleChange={value => {
                  setValue(`files.${currentIndex}.location`, value, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setValue(`files.${currentIndex}.locationType`, 'custom');
                }}
                disabled={locationType === 'file' || locationType === 'none'}
                mapboxToken={mapboxToken}
                geocodingPlaceName={geocodingPlaceName}
                dragHint={_(msg`Drag map to choose location`)}
                {...register(`files.${currentIndex}.location`)}
              />
            </div>
          )}
          <>
            {fileLocation && (
              <Radio
                label={_(msg`Use file geolocation`)}
                value={'file'}
                selectedValue={locationType}
                sx={{ mb: 2.5 }}
                {...register(`files.${currentIndex}.locationType`)}
                onChange={e => {
                  setValue(`files.${currentIndex}.locationType`, 'file');
                  setValue(
                    `files.${currentIndex}.location`,
                    fileLocation as Feature<Point>,
                  );
                }}
              />
            )}
            <Radio
              label={_(msg`No specific location`)}
              description={_(
                msg`(file will be associated with the project location by default)`,
              )}
              value={'none'}
              selectedValue={locationType}
              sx={{ mb: 2.5 }}
              {...register(`files.${currentIndex}.locationType`)}
              onChange={e => {
                setValue(`files.${currentIndex}.locationType`, 'none');
                setValue(
                  `files.${currentIndex}.location`,
                  projectLocation as GeocodeFeature,
                );
              }}
            />
            <Radio
              label={_(msg`Choose a specific location on the map`)}
              description={_(msg`(drag map to choose location)`)}
              value={'custom'}
              selectedValue={locationType}
              {...register(`files.${currentIndex}.locationType`)}
            />
          </>
        </RadioGroup>
      </div>
      <CancelButtonFooter
        disabled={!!errors.files?.[currentIndex]}
        label="apply"
        onCancel={onClose}
        onClick={onSubmit}
      />
    </>
  );
};
