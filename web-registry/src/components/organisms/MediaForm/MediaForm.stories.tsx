import { MediaForm, MediaValues } from './MediaForm';

export default {
  title: 'Registry/Organisms/MediaForm',
  component: MediaForm,
};

const initialValues: MediaValues = {
  'schema:creditText': '',
  'regen:galleryPhotos': [],
};

export const mediaForm = () => (
  <MediaForm initialValues={initialValues} submit={async () => void null} />
);
