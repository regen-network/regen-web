import { useWatch } from 'react-hook-form';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { Feature, Point } from 'geojson';

import { Radio } from 'web-components/lib/components/inputs/new/Radio/Radio';
import { RadioGroup } from 'web-components/lib/components/inputs/new/RadioGroup/RadioGroup';
import { TextAreaField } from 'web-components/lib/components/inputs/new/TextAreaField/TextAreaField';
import { TextAreaFieldChartCounter } from 'web-components/lib/components/inputs/new/TextAreaField/TextAreaField.ChartCounter';
import TextField from 'web-components/lib/components/inputs/new/TextField/TextField';
import { CancelButtonFooter } from 'web-components/lib/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Title } from 'web-components/lib/components/typography';
import { UseStateSetter } from 'web-components/lib/types/react/useState';
import { cn } from 'web-components/lib/utils/styles/cn';

import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import {
  FILE_LOCATION_DESCRIPTION,
  FILE_MAX_DESCRIPTION_LENGTH,
} from './EditFileForm.constants';
import { LocationPicker } from './EditFileForm.LocationPicker';
import {
  editFileFormSchema,
  EditFileFormSchemaType,
} from './EditFileForm.schema';
import { RestrictedViewState } from './EditFileForm.types';

export interface Props {
  initialValues: EditFileFormSchemaType;
  projectLocation: GeocodeFeature;
  fileLocation?: Feature;
  className?: string;
  onClose: () => void;
  mapboxToken?: string;
  geocodingPlaceName?: string;
  setDebouncedViewState: UseStateSetter<RestrictedViewState>;
  imgSrc?: string;
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
  imgSrc,
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

  const description = useWatch({ control: form.control, name: 'description' });
  const location = useWatch({ control: form.control, name: 'location' });
  const locationType = useWatch({
    control: form.control,
    name: 'locationType',
  });

  return (
    <Form className={cn('max-w-[560px]', className)} form={form}>
      <Title
        variant="h4"
        sx={{ textAlign: 'center' }}
        className="mb-40 sm:mb-50"
      >
        Edit your file
      </Title>
      {imgSrc && (
        <img
          className="m-auto pb-40 sm:pb-50"
          width="180px"
          height="100%"
          src={imgSrc}
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
              setDebouncedViewState={setDebouncedViewState}
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
              // description="file will be associated with the project location by default"
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
