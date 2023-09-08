import React, { useEffect } from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import LocationField from 'web-components/lib/components/inputs/new/LocationField/LocationField';
import { isGeocodingFeature } from 'web-components/lib/components/inputs/new/LocationField/LocationField.types';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';

import { useProjectEditContext } from 'pages';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import { ProjectPageFooter } from '../../molecules';
import {
  LOCATION_DESCRIPTION,
  LOCATION_LABEL,
  LOCATION_PLACEHOLDER,
} from './LocationForm.constants';
import {
  locationFormSchema,
  LocationFormSchemaType,
  SimplifiedLocationFormSchemaType,
} from './LocationForm.schema';

interface LocationFormProps {
  mapToken: string;
  onSubmit: ({
    values,
  }: {
    values: SimplifiedLocationFormSchemaType;
  }) => Promise<void>;
  onNext?: () => void;
  onPrev?: () => void;
  initialValues?: LocationFormSchemaType;
  jurisdiction?: string;
}

const LocationForm: React.FC<LocationFormProps> = ({
  mapToken,
  initialValues,
  onSubmit,
  onNext,
  onPrev,
  jurisdiction,
}) => {
  const form = useZodForm({
    schema: locationFormSchema,
    defaultValues: {
      ...initialValues,
    },
    mode: 'onBlur',
  });
  const { isValid, isSubmitting, isDirty, errors } = useFormState({
    control: form.control,
  });
  const { setValue, setError } = form;

  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);
  const { confirmSave, isEdit, isDirtyRef } = useProjectEditContext();

  const location = useWatch({
    control: form.control,
    name: 'schema:location',
  });

  useEffect(() => {
    isDirtyRef.current = isDirty;
  }, [isDirtyRef, isDirty]);

  return (
    <Form
      form={form}
      onSubmit={async values => {
        try {
          const location = values['schema:location'];
          if (isGeocodingFeature(location)) {
            await onSubmit({ values: { 'schema:location': location } });
          }
          if (isEdit && confirmSave) confirmSave();
        } catch (e) {
          setErrorBannerTextAtom(errorsMapping[ERRORS.DEFAULT].title);
        }
      }}
    >
      <OnBoardingCard>
        <LocationField
          label={LOCATION_LABEL}
          description={LOCATION_DESCRIPTION}
          placeholder={LOCATION_PLACEHOLDER}
          token={mapToken}
          error={!!errors['schema:location']}
          helperText={errors['schema:location']?.message}
          value={location}
          handleChange={value => {
            setValue('schema:location', value, {
              shouldDirty: true,
              shouldTouch: true,
            });
            // If a jurisdiction is provided (i.e. the project exists on chain),
            // we require the location input to match the jurisdiction.
            if (jurisdiction) {
              let valid: boolean;
              if (isGeocodingFeature(location)) {
                valid = location.properties.short_code === jurisdiction;
              } else {
                valid = location === jurisdiction;
              }
              if (!valid) {
                setError('schema:location', {
                  message: `This location must match the on chain jurisdiction (${jurisdiction})`,
                });
              }
            }
          }}
          {...form.register('schema:location')}
        />
      </OnBoardingCard>
      <ProjectPageFooter
        onNext={onNext}
        onPrev={onPrev}
        isValid={isValid}
        isSubmitting={isSubmitting}
        dirty={isDirty}
      />
    </Form>
  );
};

export { LocationForm };
