import { useEffect } from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import { ERRORS, errorsMapping } from 'config/errors';
import { useSetAtom } from 'jotai';

import { Flex } from 'web-components/lib/components/box';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import TextField from 'web-components/lib/components/inputs/new/TextField/TextField';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';

import { useCreateProjectContext } from 'pages/ProjectCreate';
import { SettingsSubmitProps } from 'pages/Settings/hooks/useSettingsSubmit';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import { useProjectEditContext } from '../../../pages/ProjectEdit';
import { ProjectPageFooter } from '../../molecules';
import {
  settingsFormSchema,
  SettingsFormSchemaType,
} from './SettingsForm.schema';

interface SettingsFormProps {
  submit: (props: SettingsSubmitProps) => Promise<void>;
  onNext?: () => void;
  onPrev?: () => void;
  initialValues?: SettingsFormSchemaType;
}

export const SettingsForm: React.FC<
  React.PropsWithChildren<SettingsFormProps>
> = ({ initialValues, submit, onNext, onPrev }) => {
  const form = useZodForm({
    schema: settingsFormSchema,
    defaultValues: {
      ...initialValues,
    },
    mode: 'onBlur',
  });
  const { isSubmitting, isDirty, isValid } = useFormState({
    control: form.control,
  });
  const { isDirtyRef } = useProjectEditContext();
  const { confirmSave, isEdit } = useProjectEditContext();
  const { formRef, shouldNavigateRef } = useCreateProjectContext();
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
        <Flex alignItems="flex-end" sx={{ mt: { xs: 8.25, sm: 10 } }}>
          <TextField
            type="text"
            label="Custom url"
            {...form.register('slug')}
          />
        </Flex>
      </OnBoardingCard>
      <ProjectPageFooter
        onPrev={onPrev}
        onNext={onNext}
        isValid={isValid}
        isSubmitting={isSubmitting}
        dirty={isDirty}
      />
    </Form>
  );
};
