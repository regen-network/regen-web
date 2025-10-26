import { Controller, useForm, useFormState } from 'react-hook-form';
import Form from 'web-marketplace/src/components/molecules/Form/Form';

import { SelectProjectCard } from 'web-components/src/components/cards/SelectProjectCard/SelectProjectCard';

import { FormValues, MigrateProjectsProps } from './MigrateProjects.types';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { MultiStepFormApi } from 'pages/CreateOrganization/CreateOrganization.types';

export const MigrateProjects = forwardRef<
  MultiStepFormApi,
  MigrateProjectsProps
>(
  (
    {
      projects,
      onSubmit,
      // eslint-disable-next-line lingui/no-unlocalized-strings
      formAriaLabel = 'migrate projects form',
    },
    ref,
  ) => {
    const form = useForm<FormValues>({
      defaultValues: { selectedProjectIds: [] },
    });
    const { isSubmitting, isValid } = useFormState({ control: form.control });

    const onSubmitRef = useRef(onSubmit);
    const isSubmittingRef = useRef(isSubmitting);
    const isValidRef = useRef(isValid);

    useEffect(() => {
      onSubmitRef.current = onSubmit;
    }, [onSubmit]);
    useEffect(() => {
      isSubmittingRef.current = isSubmitting;
    }, [isSubmitting]);
    useEffect(() => {
      isValidRef.current = isValid;
    }, [isValid]);

    useImperativeHandle(
      ref,
      () => ({
        trigger: (names?: string | string[]) =>
          form.trigger(names ?? [], { shouldFocus: true }),
        submit: () => form.handleSubmit(vals => onSubmitRef.current?.(vals))(),
        isSubmitting: () => isSubmittingRef.current,
        isValid: () => isValidRef.current,
      }),
      [],
    ); // <- stable, never torn down
    // useImperativeHandle(
    //   ref,
    //   () => ({
    //     trigger: () => form.trigger([], { shouldFocus: true }),
    //     submit: () => form.handleSubmit(onSubmit)(),
    //     isSubmitting: () => isSubmitting,
    //     isValid: () => isValid,
    //   }),
    //   [form, onSubmit, isSubmitting, isValid],
    // );

    return (
      <section className="border border-solid border-grey-300 rounded-md py-40 px-10 sm:py-50 sm:px-40 max-w-4xl">
        <Form form={form} onSubmit={onSubmit} aria-label={formAriaLabel}>
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
  },
);
