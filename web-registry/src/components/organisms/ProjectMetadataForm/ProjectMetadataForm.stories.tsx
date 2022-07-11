import { Center } from 'web-components/lib/components/box';
import { ProjectMetadataForm } from './ProjectMetadataForm';

export default {
  title: 'Registry/Organisms/Project Metadata Form',
  component: ProjectMetadataForm,
};

export const projectMetadataForm = (): JSX.Element => (
  <Center sx={{ m: '0 auto', maxWidth: 740 }}>
    <ProjectMetadataForm submit={() => Promise.resolve()} />
  </Center>
);
