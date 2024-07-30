import { MetadataForm } from './MetadataForm';

export default {
  title: 'Marketplace/Organisms/Metadata Form',
  component: MetadataForm,
};

export const projectMetadataForm = (): JSX.Element => (
  <MetadataForm onSubmit={() => Promise.resolve()} />
);
