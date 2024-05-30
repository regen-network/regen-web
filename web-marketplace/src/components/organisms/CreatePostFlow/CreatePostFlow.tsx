import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';

import Modal from 'web-components/src/components/modal';

import PostForm from '../PostForm';
import { PostFormSchemaType } from '../PostForm/PostForm.schema';

type Props = {
  onModalClose: () => void;
  initialValues: PostFormSchemaType;
  projectLocation: GeocodeFeature;
  projectId?: string;
};

export const CreatePostFlow = ({
  onModalClose,
  initialValues,
  projectLocation,
  projectId,
}: Props) => {
  return (
    <>
      <Modal open={!!projectId} onClose={onModalClose}>
        <PostForm
          initialValues={initialValues}
          projectLocation={projectLocation}
          onClose={onModalClose}
        />
      </Modal>
    </>
  );
};
