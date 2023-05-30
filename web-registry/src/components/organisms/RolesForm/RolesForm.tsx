import { useFormState, useWatch } from 'react-hook-form';
import { useSetAtom } from 'jotai';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import TextField from 'web-components/lib/components/inputs/new/TextField/TextField';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';

import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import { useProjectEditContext } from '../../../pages/ProjectEdit';
import { ProjectPageFooter } from '../../molecules';
import { ProfileModalSchemaType } from './components/ProfileModal/ProfileModal.schema';
import { RoleField } from './components/RoleField/RoleField';
import { rolesFormSchema, RolesFormSchemaType } from './RolesForm.schema';

interface RolesFormProps {
  submit: ({ values }: { values: RolesFormSchemaType }) => Promise<void>;
  onNext?: () => void;
  onPrev?: () => void;
  initialValues?: RolesFormSchemaType;
  projectId?: string;
}

const RolesForm: React.FC<React.PropsWithChildren<RolesFormProps>> = ({
  initialValues,
  projectId,
  ...props
}) => {
  const form = useZodForm({
    schema: rolesFormSchema,
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
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);

  /* Fields watch */

  const projectDeveloper = useWatch({
    control: form.control,
    name: 'projectDeveloper',
  });

  /* Setter */

  const setProjectDeveloper = (value: ProfileModalSchemaType): void => {
    form.setValue('projectDeveloper', value);
  };

  const saveProfile = async (
    updatedEntity: ProfileModalSchemaType,
  ): Promise<void> => {
    // TODO
  };

  return (
    <Form form={form} onSubmit={async data => {}}>
      <OnBoardingCard>
        <RoleField
          label="Project Developer"
          optional
          description="The individual or organization that is in charge of managing the project and will appear on the project page"
          // onSaveProfile={saveProfile}
          setValue={setProjectDeveloper}
          value={projectDeveloper}
          {...form.register('projectDeveloper')}
        />
        <TextField
          type="text"
          label="Admin"
          disabled
          {...form.register('admin')}
        />
      </OnBoardingCard>
      <ProjectPageFooter
        onPrev={props.onPrev}
        onNext={props.onNext}
        isValid={isValid}
        isSubmitting={isSubmitting}
        dirty={isDirty}
      />
    </Form>
  );
};

export { RolesForm };
