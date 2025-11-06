import { SubmitHandler } from 'react-hook-form';
import { FormStateSetter } from 'legacy-pages/CreateOrganization/CreateOrganization.types';

import { Project } from 'web-components/src/components/cards/SelectProjectCard/SelectProjectCard.types';

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
} & Partial<FormStateSetter>;
