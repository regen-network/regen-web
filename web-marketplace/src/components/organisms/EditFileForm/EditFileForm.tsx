import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { Feature } from 'geojson';

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
import { cn } from 'web-components/src/utils/styles/cn';

import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';
import { useDebounce } from 'hooks/useDebounce';

import {
  FILE_LOCATION_DESCRIPTION,
  FILE_MAX_DESCRIPTION_LENGTH,
} from './EditFileForm.constants';
import {
  editFileFormSchema,
  EditFileFormSchemaType,
} from './EditFileForm.schema';
import {} from './EditFileForm.types';

export interface Props {
  initialValues: EditFileFormSchemaType;
  projectLocation: GeocodeFeature;
  fileLocation?: Feature;
  className?: string;
  onClose: () => void;
  mapboxToken?: string;
  geocodingPlaceName?: string;
  setDebouncedViewState: UseStateSetter<GeocodeFeature | Feature>;
}

export const EditFileForm = ({
  initialValues,
  className,
  projectLocation,
  fileLocation,
  onClose,
  mapboxToken,
  geocodingPlaceName,
  setDebouncedViewState,
}: Props): JSX.Element => {
  const form = useZodForm({
    schema: editFileFormSchema,
    defaultValues: {
      ...initialValues,
      location: initialValues.location || fileLocation || projectLocation,
    },
    mode: 'onBlur',
  });
  const { errors } = form.formState;
  const { setValue } = form;

  const url = useWatch({ control: form.control, name: 'url' });
  const mimeType = useWatch({ control: form.control, name: 'mimeType' });
  const description = useWatch({ control: form.control, name: 'description' });
  const location = useWatch({ control: form.control, name: 'location' });
  const locationType = useWatch({
    control: form.control,
    name: 'locationType',
  });

  const debouncedValue = useDebounce(location);
  useEffect(() => {
    if (!isGeocodingFeature(debouncedValue))
      setDebouncedViewState(debouncedValue);
  }, [debouncedValue, setDebouncedViewState]);
  // TODO This will need to be used at the upper level component of EditFileForm (EditFileModal)
  // in order to get the place name associated to the center of the current view state (geocodingPlaceName)
  // We use a debounced value so we don't make reverse geocoding queries for every move on the map.
  // const { data } = useQuery(
  //   getGeocodingQuery({
  //     request: {
  //       types: ['place'],
  //       query: [longitude, latitude],
  //     },
  //     mapboxToken,
  //     enabled: !!debouncedValue,
  //   }),
  // );

  return (
    <Form className={cn('max-w-[560px]', className)} form={form}>
      <Title
        variant="h4"
        sx={{ textAlign: 'center' }}
        className="mb-40 sm:mb-50"
      >
        Edit your file
      </Title>
      {url && isImage(mimeType) && (
        <img
          className="block m-auto pb-40 sm:pb-50"
          width="180px"
          height="100%"
          src={url}
          alt="preview"
        />
      )}
      <TextField type="text" label="File name" {...form.register('name')} />
      <TextAreaField
        type="text"
        label="Description"
        className="mt-40 sm:mt-50"
        rows={3}
        minRows={3}
        multiline
        optional
        helperText={errors?.description?.message}
        error={!!errors?.description}
        {...form.register('description')}
      >
        <TextAreaFieldChartCounter
          value={description}
          charLimit={FILE_MAX_DESCRIPTION_LENGTH}
          sx={{ mb: { xs: 0, sm: 0 } }}
        />
      </TextAreaField>
      <TextField
        type="text"
        label="Photo credit"
        className="mt-40 sm:mt-50"
        optional
        {...form.register('credit')}
      />
      <div className="flex flex-col mb-40 mt-40 sm:mb-50 sm:mt-50">
        <RadioGroup label="Location" description={FILE_LOCATION_DESCRIPTION}>
          <div className="h-[309px] sm:h-[409px] pb-10">
            <LocationPicker
              value={location}
              handleChange={value =>
                setValue('location', value, {
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
              disabled={locationType === 'file' || locationType === 'none'}
              mapboxToken={mapboxToken}
              geocodingPlaceName={geocodingPlaceName}
              {...form.register('location')}
            />
          </div>
          <>
            {fileLocation && (
              <Radio
                label="Use file geolocation"
                value={'file'}
                selectedValue={locationType}
                sx={{ mb: 2.5 }}
                {...form.register('locationType')}
                onChange={e => {
                  form.setValue('locationType', 'file');
                  form.setValue('location', fileLocation as Feature);
                }}
              />
            )}
            <Radio
              label="No specific location"
              description=" (file will be associated with the project location by default)"
              value={'none'}
              selectedValue={locationType}
              sx={{ mb: 2.5 }}
              {...form.register('locationType')}
              onChange={e => {
                form.setValue('locationType', 'none');
                form.setValue('location', projectLocation as Feature);
              }}
            />
            <Radio
              label="Choose a specific location on the map"
              value={'custom'}
              selectedValue={locationType}
              {...form.register('locationType')}
            />
          </>
        </RadioGroup>
      </div>
      <CancelButtonFooter label="apply" onCancel={onClose} type="submit" />
    </Form>
  );
};
