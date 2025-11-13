import { SubmitHandler } from 'react-hook-form';
import { FormStateSetter } from 'legacy-pages/CreateOrganization/CreateOrganization.types';

import { Project } from 'web-components/src/components/cards/SelectProjectCard/SelectProjectCard.types';

import { FormRef } from 'components/molecules/Form/Form';

export type FormValues = {
  selectedProjectIds: string[];
};
export type MigrateProjectsProps = {
  /** Array of projects to display. */
  projects: Project[];
  /** Callback when the form is submitted. */
  onSubmit: SubmitHandler<FormValues>;
  /** Form aria label. */
  formAriaLabel?: string;
  /** Ref to access form methods. */
  formRef?: FormRef;
} & Partial<FormStateSetter>;
