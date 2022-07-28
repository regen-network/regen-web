import { ProjectMetadataForm } from './ProjectMetadataForm';

export default {
  title: 'Registry/Organisms/Project Metadata Form',
  component: ProjectMetadataForm,
};

export const projectMetadataForm = (): JSX.Element => (
  <ProjectMetadataForm submit={() => Promise.resolve()} />
);
