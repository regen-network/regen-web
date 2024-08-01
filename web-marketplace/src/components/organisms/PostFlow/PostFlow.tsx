import { useCallback, useEffect, useRef, useState } from 'react';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { TxResponse } from '@regen-network/api/lib/generated/cosmos/base/abci/v1beta1/abci';
import { OrderBy } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import {
  MsgAnchor,
  MsgAttest,
} from '@regen-network/api/lib/generated/regen/data/v1/tx';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { postData } from 'utils/fetch/postData';

import { TextButton } from 'web-components/src/components/buttons/TextButton';
import Modal from 'web-components/src/components/modal';
import { SaveChangesWarningModal } from 'web-components/src/components/modal/SaveChangesWarningModal/SaveChangesWarningModal';
import { Item } from 'web-components/src/components/modal/TxModal';
import { CardItemValue } from 'web-components/src/components/modal/TxModal.CardItemValue';
import { deleteImage } from 'web-components/src/utils/s3';
import { truncate } from 'web-components/src/utils/truncate';

import { useLedger } from 'ledger';
import { apiUri } from 'lib/apiUri';
import {
  processingModalAtom,
  txSuccessfulModalAtom,
} from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import { getHashUrl } from 'lib/block-explorer';
import { messageActionEquals } from 'lib/ecocredit/constants';
import { apiServerUrl } from 'lib/env';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { getGetTxsEventQuery } from 'lib/queries/react-query/cosmos/bank/getTxsEventQuery/getTxsEventQuery';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getPostQuery } from 'lib/queries/react-query/registry-server/getPostQuery/getPostQuery';
import { PostFile } from 'lib/queries/react-query/registry-server/getPostQuery/getPostQuery.types';
import { getPostsQueryKey } from 'lib/queries/react-query/registry-server/getPostsQuery/getPostsQuery.utils';
import { useWallet } from 'lib/wallet/wallet';

import { Link } from 'components/atoms';
import { useMsgClient } from 'hooks';

import { useHandleUpload } from '../MediaForm/hooks/useHandleUpload';
import { DEFAULT, PROJECTS_S3_PATH } from '../MediaForm/MediaForm.constants';
import PostForm from '../PostForm';
import { PostFormSchemaType } from '../PostForm/PostForm.schema';
import {
  basePostContent,
  FILE_NAMES,
  HASH,
  POST_CREATED,
  PROJECT,
  VIEW_POST,
} from './PostFlow.constants';
import { SignModal } from './PostFlow.SignModal';
import { getSuccessModalContent } from './PostFlow.utils';

type Props = {
  onModalClose: () => void;
  initialValues?: PostFormSchemaType;
  projectLocation: GeocodeFeature;
  projectId: string;
  projectName?: string;
  projectSlug?: string | null;
  offChainProjectId?: string;
};

export const PostFlow = ({
  onModalClose,
  initialValues,
  projectLocation,
  projectId,
  projectName,
  projectSlug,
  offChainProjectId: _offChainProjectId,
}: Props) => {
  const fileNamesToDeleteRef = useRef<string[]>([]);
  const retryCsrfRequest = useRetryCsrfRequest();
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const setTxSuccessfulModalAtom = useSetAtom(txSuccessfulModalAtom);
  const setProcessingModalAtom = useSetAtom(processingModalAtom);
  const reactQueryClient = useQueryClient();
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [showOnCloseWarning, setShowOnCloseWarning] = useState(false);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const { wallet } = useWallet();
  const { activeAccount } = useAuth();
  const [isFormModalOpen, setIsFormModalOpen] = useState(true);
  const [iri, setIri] = useState<string | undefined>();
  const { data: createdPostData } = useQuery(
    getPostQuery({
      iri,
      enabled: !!iri,
    }),
  );
  const { _ } = useLingui();

  const [offChainProjectId, setOffChainProjectId] =
    useState(_offChainProjectId);
  const { handleUpload } = useHandleUpload({
    offChainProjectId,
    apiServerUrl: apiUri,
    setOffChainProjectId,
    subFolder: '/posts',
  });

  const { txClient } = useLedger();

  const { refetch } = useQuery(
    getGetTxsEventQuery({
      client: txClient,
      enabled: false,
      request: {
        events: [`${messageActionEquals}'/${MsgAnchor.$type}'`],
        orderBy: OrderBy.ORDER_BY_DESC,
        pagination: { limit: 1 },
      },
    }),
  );

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
              files: files?.map(file => {
                const geocodePoint = file.location.geometry.coordinates;
                return {
                  iri: file.iri,
                  name: file.name,
                  description: file.description,
                  credit: file.credit,
                  locationType: file.locationType,
                  location: {
                    wkt: `POINT(${geocodePoint[0]} ${geocodePoint[1]})`,
                  },
                };
              }),
            },
          },
          token,
          retryCsrfRequest,
          onSuccess: async res => {
            setIri(res.iri);
            await reactQueryClient.invalidateQueries({
              queryKey: getPostsQueryKey({
                projectId: offChainProjectId,
              }),
              refetchType: 'all',
            });
          },
        });
      }
    },
    [token, offChainProjectId, retryCsrfRequest, reactQueryClient],
  );

  const fetchMsgAnchor = useCallback(
    async (iri: string) => {
      setProcessingModalAtom(atom => void (atom.open = true));

      const timer = (ms: number) => new Promise(res => setTimeout(res, ms));

      let txResponses: TxResponse[] | undefined = [];
      let i = 1;
      let anchorTxHash: string | undefined;

      while (i < 10 && txResponses && txResponses.length === 0) {
        const { data } = await refetch();
        txResponses = data?.txResponses?.filter(txRes =>
          txRes.rawLog.includes(iri),
        );
        i++;
        if (txResponses && txResponses.length === 1) {
          break;
        }
        await timer(1000);
      }
      if (txResponses && txResponses.length === 1) {
        anchorTxHash = txResponses[0].txhash;
      }
      setProcessingModalAtom(atom => void (atom.open = false));
      const { cardItems, buttonLink } = getSuccessModalContent({
        createdPostData,
        projectSlug,
        projectId,
        offChainProjectId,
        projectName,
        anchorTxHash,
      });
      setTxSuccessfulModalAtom(atom => {
        atom.open = true;
        atom.cardItems = cardItems;
        atom.title = POST_CREATED;
        // atom.cardTitle = ''; // TODO use 'Attest' if signed
        atom.buttonTitle = VIEW_POST;
        atom.buttonLink = buttonLink;
      });
    },
    [
      createdPostData,
      offChainProjectId,
      projectId,
      projectName,
      projectSlug,
      refetch,
      setProcessingModalAtom,
      setTxSuccessfulModalAtom,
    ],
  );

  useEffect(() => {
    if (iri && createdPostData) {
      setIsFormModalOpen(false);

      if (wallet?.address && activeAccount?.addr === wallet.address) {
        setIsSignModalOpen(true);
      } else {
        fetchMsgAnchor(iri);
        onModalClose();
      }
    }
  }, [
    activeAccount?.addr,
    createdPostData,
    fetchMsgAnchor,
    iri,
    onModalClose,
    setProcessingModalAtom,
    wallet?.address,
  ]);

  const onClose = useCallback(
    async (isFormDirty: boolean) => {
      if (isFormDirty) {
        setShowOnCloseWarning(true);
        return;
      }
      // Delete any files that were removed on S3
      await Promise.all(
        fileNamesToDeleteRef?.current.map(async (fileName): Promise<void> => {
          await deleteImage(
            PROJECTS_S3_PATH,
            offChainProjectId ?? '',
            fileName,
            apiServerUrl,
          );
        }),
      );
      fileNamesToDeleteRef.current = [];

      onModalClose();
    },
    [offChainProjectId, onModalClose],
  );
  const { signAndBroadcast } = useMsgClient();

  return (
    <>
      <Modal
        open={!!projectId && isFormModalOpen}
        onClose={() => onClose(isFormDirty)}
      >
        {projectId && (
          <PostForm
            offChainProjectId={offChainProjectId}
            initialValues={initialValues}
            projectLocation={projectLocation}
            onClose={() => onClose(isFormDirty)}
            onSubmit={onSubmit}
            fileNamesToDeleteRef={fileNamesToDeleteRef}
            handleUpload={handleUpload}
            onUpdateDirtyState={setIsFormDirty}
          />
        )}
      </Modal>
      <SignModal
        iri={iri}
        open={isSignModalOpen}
        onClose={() => {
          setIsSignModalOpen(false);
          if (iri) fetchMsgAnchor(iri);
        }}
        handleSign={async (contentHash: any) => {
          await signAndBroadcast(
            {
              msgs: [
                MsgAttest.fromPartial({
                  attestor: wallet?.address,
                  contentHashes: [contentHash],
                }),
              ],
            },
            (): void => {
              setProcessingModalAtom(atom => void (atom.open = true));
            },
            {
              onError: (err?: Error) => {
                setProcessingModalAtom(atom => void (atom.open = false));
                console.log(err); // TODO
              },
              onSuccess: async (deliverTxResponse?: DeliverTxResponse) => {
                const { data: anchorTxsData } = await refetch();
                const txResponses = anchorTxsData?.txResponses?.filter(
                  txRes => iri && txRes.rawLog.includes(iri),
                );
                const anchorTxHash = txResponses?.[0]?.txhash;
                setProcessingModalAtom(atom => void (atom.open = false));

                const { cardItems, buttonLink } = getSuccessModalContent({
                  createdPostData,
                  projectSlug,
                  projectId,
                  offChainProjectId,
                  projectName,
                  anchorTxHash:
                    anchorTxHash ?? deliverTxResponse?.transactionHash,
                  attestTxHash: deliverTxResponse?.transactionHash,
                });
                setTxSuccessfulModalAtom(atom => {
                  atom.open = true;
                  atom.cardItems = cardItems;
                  atom.title = POST_CREATED;
                  atom.cardTitle = _(msg`Attest`);
                  atom.buttonTitle = VIEW_POST;
                  atom.buttonLink = buttonLink;
                });
              },
            },
          );
        }}
      />
      <SaveChangesWarningModal
        open={showOnCloseWarning}
        onClose={() => setShowOnCloseWarning(false)}
        navigate={() => onClose(false)}
      />
    </>
  );
};
