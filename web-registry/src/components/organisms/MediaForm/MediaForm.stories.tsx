import { MediaForm, MediaValues } from './MediaForm';

export default {
  title: 'Registry/Organisms/MediaForm',
  component: MediaForm,
};

const initialValues: MediaValues = {
  'regen:creditText': '',
  'regen:galleryPhotos': { '@list': [] },
  'regen:landStewardPhoto': { '@type': 'schema:URL', '@value': '' },
};

export const mediaFormLegacy = () => (
  <MediaForm initialValues={initialValues} submit={async () => void null} />
);

export const mediaForm = () => (
  <MediaForm
    creditClassId="1235"
    initialValues={initialValues}
    submit={async () => void null}
  />
);
