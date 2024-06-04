import { useCallback, useRef } from 'react';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { postData } from 'utils/fetch/postData';

import Modal from 'web-components/src/components/modal';
import { Item } from 'web-components/src/components/modal/TxModal';
import { deleteImage } from 'web-components/src/utils/s3';

import { txSuccessfulModalAtom } from 'lib/atoms/modals.atoms';
import { apiServerUrl } from 'lib/env';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';

import { DEFAULT, PROJECTS_S3_PATH } from '../MediaForm/MediaForm.constants';
import PostForm from '../PostForm';
import { PostFormSchemaType } from '../PostForm/PostForm.schema';
import {
  basePostContent,
  FILE_NAMES,
  POST_CREATED,
  PROJECT,
  VIEW_ALL_POSTS,
} from './PostFlow.constants';

type Props = {
  onModalClose: () => void;
  initialValues: PostFormSchemaType;
  projectLocation: GeocodeFeature;
  projectId: string;
  projectName?: string;
  offChainProjectId?: string;
};

export const PostFlow = ({
  onModalClose,
  initialValues,
  projectLocation,
  projectId,
  projectName,
  offChainProjectId,
}: Props) => {
  const fileNamesToDeleteRef = useRef<string[]>([]);
  const retryCsrfRequest = useRetryCsrfRequest();
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const setTxSuccessfulModalAtom = useSetAtom(txSuccessfulModalAtom);

  const onSubmit = useCallback(
    async (data: PostFormSchemaType) => {
      if (token) {
        const files = data.files?.filter(file => file.url !== DEFAULT);
        await postData({
          url: `${apiServerUrl}/marketplace/v1/posts`,
          data: {
            projectId: offChainProjectId,
            privacy: data.privacyType,
            contents: {
              ...basePostContent,
              title: data.title,
              comment: data.comment,
              files: files?.map(file => ({
                iri: file.iri,
                name: file.name,
                description: file.description,
                credit: file.credit,
                locationType: file.locationType,
                location: { wkt: file.location }, // TODO convert from geojson to wkt
              })),
            },
          },
          token,
          retryCsrfRequest,
          onSuccess: async res => {
            // Delete any files that were removed on S3
            await Promise.all(
              fileNamesToDeleteRef?.current.map(async fileName => {
                await deleteImage(
                  `${PROJECTS_S3_PATH}/posts`,
                  offChainProjectId ?? '',
                  fileName,
                  apiServerUrl,
                );
              }),
            );
            fileNamesToDeleteRef.current = [];

            onModalClose();

            // TODO once data anchored, if activeAccount has an address
            // 1. query AnchorByIri based on res.iri
            // 2. sign MsgAttest with returned content hash from 1.
            // (pending https://github.com/regen-network/regen-server/pull/454)
            // else go directly to the confirmation popup

            const projectUrl = `/project/${projectId ?? offChainProjectId}`;
            const cardItems: Item[] = [
              {
                label: PROJECT,
                value: {
                  name: projectName ?? projectId ?? offChainProjectId,
                  url: projectUrl,
                },
              },
            ];
            if (files && files.length) {
              cardItems.unshift({
                label: FILE_NAMES,
                value:
                  files.map(file => ({
                    name: file.name,
                    url: file.url,
                  })) || [],
              });
            }
            // TODO add hash(es) cardItem
            // cardItems.push({label: HASH, value: []})

            setTxSuccessfulModalAtom(atom => {
              atom.open = true;
              atom.cardItems = cardItems;
              atom.title = POST_CREATED;
              // atom.cardTitle = ''; // TODO use 'Attest' if signed
              atom.buttonTitle = VIEW_ALL_POSTS;
              atom.buttonLink = projectUrl; // TODO scroll to "Data stream" section once implemented
            });
          },
        });
      }
    },
    [
      offChainProjectId,
      onModalClose,
      projectId,
      projectName,
      retryCsrfRequest,
      setTxSuccessfulModalAtom,
      token,
    ],
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
            fileNamesToDeleteRef={fileNamesToDeleteRef}
          />
        )}
      </Modal>
    </>
  );
};
