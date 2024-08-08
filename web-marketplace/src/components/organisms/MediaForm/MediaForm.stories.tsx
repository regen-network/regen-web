import { MediaForm } from './MediaForm';
import { MediaFormSchemaType } from './MediaForm.schema';

export default {
  title: 'Marketplace/Organisms/MediaForm',
  component: MediaForm,
};

const initialValues: MediaFormSchemaType = {
  'regen:previewPhoto': undefined,
  'regen:galleryPhotos': [],
};

export const mediaForm = () => (
  <MediaForm
    initialValues={initialValues}
    submit={async () => void null}
    navigateNext={() => void null}
  />
);
