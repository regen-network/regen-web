import { useCallback } from 'react';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';

import Modal from 'web-components/src/components/modal';

import { apiServerUrl } from 'lib/env';

import PostForm from '../PostForm';
import { PostFormSchemaType } from '../PostForm/PostForm.schema';
import { basePostContent } from './PostFlow.constants';

type Props = {
  onModalClose: () => void;
  initialValues: PostFormSchemaType;
  projectLocation: GeocodeFeature;
  projectId: string;
  offChainProjectId?: string;
};

export const CreatePostFlow = ({
  onModalClose,
  initialValues,
  projectLocation,
  projectId,
  offChainProjectId,
}: Props) => {
  const onSubmit = useCallback(
    async (data: PostFormSchemaType) => {
      await fetch(`${apiServerUrl}/marketplace/v1/posts`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          projectId: offChainProjectId,
          privacy: data.privacyType,
          contents: {
            ...basePostContent,
            title: data.title,
            comment: data.comment,
            files,
          },
        }),
      });
    },
    [offChainProjectId],
  );
  return (
    <>
      <Modal open={!!projectId} onClose={onModalClose}>
        {projectId && (
          <PostForm
            offChainProjectId={offChainProjectId}
            initialValues={initialValues}
            projectLocation={projectLocation}
            onClose={onModalClose}
            onSubmit={onSubmit}
          />
        )}
      </Modal>
    </>
  );
};
