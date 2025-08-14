import { Account } from 'web-components/src/components/user/UserInfo';

export interface Project {
  /** Unique identifier for the project */
  id: string;
  /** Name of the project */
  title: string;
  /** Location of the project */
  location: string;
  /** Area of the project */
  area: string;
  /** Thumbnail image URL */
  imageSrc: string;
  /** Program of the project */
  program?: Account;
}

export interface MigrateProjectsProps {
  /** Array of projects to display. */
  projects: Project[];
  /** Callback when the form is submitted. */
  onSubmit: (data: any) => void;
  /** Form aria label. */
  formAriaLabel?: string;
}
