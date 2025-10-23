import { Account } from '../../user/UserInfo';

export interface Project {
  /** Unique identifier for the project */
  id: string;
  /** Name of the project */
  name: string;
  /** Location of the project */
  place: string;
  /** Area of the project */
  area?: number;
  /** Area unit of the project */
  areaUnit?: string;
  /** Thumbnail image URL */
  imgSrc: string;
  /** Program of the project */
  program?: Account;
}
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
