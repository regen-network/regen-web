import { useEffect, useState } from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';

import OnBoardingCard from 'web-components/src/components/cards/OnBoardingCard';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { getProjectBySlugQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectBySlugQuery/getProjectBySlugQuery';

import { useCreateProjectContext } from 'pages/ProjectCreate';
import { SettingsSubmitProps } from 'pages/Settings/hooks/useSettingsSubmit';
import { DebouncedField } from 'components/molecules/Form/fields/DebouncedField';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import { useProjectEditContext } from '../../../pages/ProjectEdit';
import { ProjectPageFooter } from '../../molecules';
import { SLUG_DESCRIPTION, SLUG_TAKEN_ERROR } from './SettingsForm.constants';
import {
  settingsFormSchema,
  SettingsFormSchemaType,
} from './SettingsForm.schema';

interface SettingsFormProps {
  submit: (props: SettingsSubmitProps) => Promise<void>;
  onPrev?: () => void;
  initialValues?: SettingsFormSchemaType;
}

export const SettingsForm: React.FC<
  React.PropsWithChildren<SettingsFormProps>
> = ({ initialValues, submit, onPrev }) => {
  const form = useZodForm({
    schema: settingsFormSchema,
    defaultValues: {
      ...initialValues,
    },
    mode: 'onBlur',
  });
  const { isSubmitting, isDirty, isValid, errors } = useFormState({
    control: form.control,
  });
  const { isDirtyRef } = useProjectEditContext();
  const { confirmSave, isEdit } = useProjectEditContext();
  const { formRef } = useCreateProjectContext();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);

  useEffect(() => {
    isDirtyRef.current = isDirty;
  }, [isDirtyRef, isDirty]);

  /* Fields watch */

  const slug = useWatch({
    control: form.control,
    name: 'slug',
  });

  /* Setter */

  const setSlug = (value: string): void => {
    form.setValue('slug', value, { shouldDirty: true });
  };

  const [slugValue, setSlugValue] = useState('');
  const { data: projectBySlugData } = useQuery(
    getProjectBySlugQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!slugValue,
      slug: slugValue,
    }),
  );
  const isNewSlug = initialValues?.slug !== slugValue;
  const projectBySlug = projectBySlugData?.data.projectBySlug;
  const slugTakenError = projectBySlug && isNewSlug ? SLUG_TAKEN_ERROR : '';

  return (
    <Form
      form={form}
      formRef={formRef}
      onSubmit={async values => {
        try {
          await submit({ values });
          if (isEdit && confirmSave) {
            confirmSave();
            form.reset({}, { keepValues: true });
          }
        } catch (e) {
          setErrorBannerTextAtom(errorsMapping[ERRORS.DEFAULT].title);
        }
      }}
    >
      <OnBoardingCard>
        <DebouncedField
          type="text"
          label="Custom url"
          description={SLUG_DESCRIPTION}
          value={slug}
          setValue={setSlug}
          setDebouncedValue={setSlugValue}
          error={!!errors['slug'] || !!slugTakenError}
          helperText={errors['slug']?.message?.toString() ?? slugTakenError}
          startAdornment={`${window.location.origin}/project/`}
          {...form.register('slug')}
        />
      </OnBoardingCard>
      <ProjectPageFooter
        onPrev={onPrev}
        isValid={isValid && !slugTakenError}
        isSubmitting={isSubmitting}
        dirty={isDirty}
      />
    </Form>
  );
};
