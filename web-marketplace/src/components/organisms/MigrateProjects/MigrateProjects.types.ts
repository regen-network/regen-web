import { SubmitHandler } from 'react-hook-form';

import { Project } from 'web-components/src/components/cards/SelectProjectCard/SelectProjectCard.types';

import { FormStateSetter } from 'pages/CreateOrganization/CreateOrganization.types';

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
