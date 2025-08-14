import { Project } from 'web-marketplace/src/components/organisms/MigrateProjects/MigrateProjects.types';

/**
 * Props for the SelectProjectCard component.
 */
export interface SelectProjectCardProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'onClick'> {
  /** Project data to display */
  project: Project;
  /** Whether the card is selected */
  selected?: boolean;
  /** Callback fired when the card is clicked. */
  onClick?: (projectId: string) => void;
}
