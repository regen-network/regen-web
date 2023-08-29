import { MetadataForm } from './MetadataForm';

export default {
  title: 'Registry/Organisms/Metadata Form',
  component: MetadataForm,
};

export const projectMetadataForm = (): JSX.Element => (
  <MetadataForm onSubmit={() => Promise.resolve()} />
);
