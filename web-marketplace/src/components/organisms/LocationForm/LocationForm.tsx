import React, { useEffect } from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import { useLingui } from '@lingui/react';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';

import OnBoardingCard from 'web-components/src/components/cards/OnBoardingCard';
import LocationField from 'web-components/src/components/inputs/new/LocationField/LocationField';
import { isGeocodingFeature } from 'web-components/src/components/inputs/new/LocationField/LocationField.types';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';

import { useProjectEditContext } from 'pages';
import { useCreateProjectContext } from 'pages/ProjectCreate';
import { useProjectSaveAndExit } from 'pages/ProjectCreate/hooks/useProjectSaveAndExit';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';
import { MetadataSubmitProps } from 'hooks/projects/useProjectWithMetadata';

import { ProjectPageFooter } from '../../molecules';
import {
  LOCATION_DESCRIPTION,
  LOCATION_LABEL,
  LOCATION_PLACEHOLDER,
} from './LocationForm.constants';
import {
  locationFormDraftSchema,
  locationFormSchema,
  LocationFormSchemaType,
} from './LocationForm.schema';

interface LocationFormProps {
  mapToken: string;
  onSubmit: (props: MetadataSubmitProps) => Promise<void>;
  onPrev?: () => void;
  initialValues?: LocationFormSchemaType;
}

const LocationForm: React.FC<LocationFormProps> = ({
  mapToken,
  initialValues,
  onSubmit,
  onPrev,
}) => {
  const { _ } = useLingui();
  const { formRef, shouldNavigateRef, isDraftRef } = useCreateProjectContext();
  const form = useZodForm({
    schema: locationFormSchema,
    draftSchema: locationFormDraftSchema,
    defaultValues: {
      ...initialValues,
    },
    isDraftRef,
    mode: 'onBlur',
  });
  const { isValid, isSubmitting, isDirty, errors } = useFormState({
    control: form.control,
  });
  const { setValue } = form;
  const saveAndExit = useProjectSaveAndExit();

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
      formRef={formRef}
      isDraftRef={isDraftRef}
      onSubmit={async values => {
        try {
          const location = values['schema:location'];
          if (isDraftRef?.current || isGeocodingFeature(location)) {
            await onSubmit({
              values: { 'schema:location': location },
              shouldNavigate: shouldNavigateRef?.current,
            });
          }
          if (isEdit && confirmSave) {
            confirmSave();
            form.reset({}, { keepValues: true });
          }
        } catch (e) {
          setErrorBannerTextAtom(_(errorsMapping[ERRORS.DEFAULT].title));
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
          helperText={errors['schema:location']?.message?.toString()}
          value={location}
          handleChange={value =>
            setValue('schema:location', value, {
              shouldDirty: true,
              shouldTouch: true,
            })
          }
          {...form.register('schema:location')}
        />
      </OnBoardingCard>
      <ProjectPageFooter
        onPrev={onPrev}
        isValid={isValid}
        isSubmitting={isSubmitting}
        dirty={isDirty}
        saveAndExit={saveAndExit}
      />
    </Form>
  );
};

export { LocationForm };
