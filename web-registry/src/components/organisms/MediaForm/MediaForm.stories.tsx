import { MediaForm, MediaFormValues } from './MediaForm';

export default {
  title: 'Registry/Organisms/MediaForm',
  component: MediaForm,
};

const initialValues: MediaFormValues = {
  'schema:creditText': '',
  'regen:galleryPhotos': [],
};

export const mediaForm = () => (
  <MediaForm initialValues={initialValues} submit={async () => void null} />
);
