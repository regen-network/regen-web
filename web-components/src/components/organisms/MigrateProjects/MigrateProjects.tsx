import { Controller, useForm } from 'react-hook-form';

import { SelectProjectCard } from '../../cards/SelectProjectCard/SelectProjectCard';
import { MigrateProjectsProps, Project } from './MigrateProjects.types';

type FormValues = {
  selectedProjectIds: string[];
};

export const MigrateProjects = ({
  projects,
  onSubmit,
  // eslint-disable-next-line lingui/no-unlocalized-strings
  formAriaLabel = 'migrate projects form',
}: MigrateProjectsProps) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { selectedProjectIds: [] },
  });

  return (
    <section className="border border-solid border-grey-300 rounded-md py-40 px-10 sm:py-50 sm:px-40 max-w-4xl">
      <form onSubmit={handleSubmit(onSubmit)} aria-label={formAriaLabel}>
        <Controller
          control={control}
          name="selectedProjectIds"
          render={({ field: { value: selectedIds, onChange } }) => (
            <div className="grid sm:grid-cols-2 gap-30">
              {projects.map((project: Project) => {
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
      </form>
    </section>
  );
};
