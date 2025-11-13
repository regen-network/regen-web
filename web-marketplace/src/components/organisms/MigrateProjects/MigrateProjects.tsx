import { Controller, useForm, useFormState } from 'react-hook-form';
import { MIGRATE_PROJECTS_FORM_ID } from 'legacy-pages/CreateOrganization/CreateOrganization.constants';
import { useSetFormState } from 'legacy-pages/CreateOrganization/hooks/useSetFormState';
import Form from 'web-marketplace/src/components/molecules/Form/Form';

import { SelectProjectCard } from 'web-components/src/components/cards/SelectProjectCard/SelectProjectCard';

import { FormValues, MigrateProjectsProps } from './MigrateProjects.types';

export const MigrateProjects = ({
  projects,
  onSubmit,
  // eslint-disable-next-line lingui/no-unlocalized-strings
  formAriaLabel = 'migrate projects form',
  setIsSubmitting,
  setIsValid,
  formRef,
}: MigrateProjectsProps) => {
  const form = useForm<FormValues>({
    defaultValues: { selectedProjectIds: [] },
  });
  const { isSubmitting, isValid } = useFormState({ control: form.control });

  useSetFormState({ isSubmitting, isValid, setIsSubmitting, setIsValid });

  return (
    <section className="border border-solid border-grey-300 rounded-md py-40 px-10 sm:py-50 sm:px-40 max-w-4xl">
      <Form
        id={MIGRATE_PROJECTS_FORM_ID}
        form={form}
        onSubmit={onSubmit}
        aria-label={formAriaLabel}
        formRef={formRef}
      >
        <Controller
          control={form.control}
          name="selectedProjectIds"
          render={({ field: { value: selectedIds, onChange } }) => (
            <div className="grid sm:grid-cols-2 gap-30">
              {projects.map(project => {
                const isSelected = selectedIds.includes(project.id);
                return (
                  <SelectProjectCard
                    key={project.id}
                    project={project}
                    selected={isSelected}
                    onClick={() => {
                      if (isSelected) {
                        onChange(selectedIds.filter(id => id !== project.id));
                      } else {
                        onChange([...selectedIds, project.id]);
                      }
                    }}
                  />
                );
              })}
            </div>
          )}
        />
      </Form>
    </section>
  );
};
