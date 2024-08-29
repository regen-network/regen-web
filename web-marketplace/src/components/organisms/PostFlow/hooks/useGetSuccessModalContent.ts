import { useCallback } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { Item, ItemValue } from 'web-components/src/components/modal/TxModal';
import { truncate } from 'web-components/src/utils/truncate';

import { getHashUrl } from 'lib/block-explorer';
import {
  Post,
  PostFile,
} from 'lib/queries/react-query/registry-server/getPostQuery/getPostQuery.types';

import { BLOCKCHAIN_RECORD, FILE_NAMES, PROJECT } from '../PostFlow.constants';

type GetSuccessModalContentParams = {
  createdPostData?: Post | null;
  projectSlug?: string | null;
  projectId?: string;
  offChainProjectId?: string;
  projectName?: string;
  anchorTxHash?: string;
  attestTxHash?: string;
  signingError?: string;
};

export const useGetSuccessModalContent = () => {
  const { _ } = useLingui();

  const getSuccessModalContent = useCallback(
    ({
      createdPostData,
      projectSlug,
      projectId,
      offChainProjectId,
      projectName,
      anchorTxHash,
      attestTxHash,
      signingError,
    }: GetSuccessModalContentParams) => {
      const iri = createdPostData?.iri;
      const files = createdPostData?.contents?.files as PostFile[] | undefined;
      const filesUrls = createdPostData?.filesUrls;

      const projectUrl = `/project/${
        projectSlug ?? projectId ?? offChainProjectId
      }`;
      const cardItems: Item[] = [
        {
          label: _(PROJECT),
          value: {
            name: projectName ?? projectId ?? offChainProjectId,
            url: projectUrl,
          },
        },
      ];
      if (files && files.length && filesUrls && filesUrls.length) {
        cardItems.unshift({
          label: _(FILE_NAMES),
          value:
            files.map(file => ({
              name: file.name as string,
              url: filesUrls[file.iri],
            })) || [],
        });
      }

      const hashValue: ItemValue[] = [];
      if (anchorTxHash) {
        hashValue.push({
          name: truncate(anchorTxHash),
          url: getHashUrl(anchorTxHash),
          label: _(msg`create post`),
        });
      } else {
        hashValue.push({
          name: _(msg`Anchoring in progress`),
          className: 'font-normal text-grey-400 italic',
        });
      }

      if (attestTxHash) {
        hashValue.push({
          name: truncate(attestTxHash),
          url: getHashUrl(attestTxHash),
          label: _(msg`signature`),
        });
      } else if (signingError) {
        hashValue.push({
          name: `${_(msg`Signing failed`)}: ${signingError}}`,
          className: 'text-error-400',
        });
      }

      if (hashValue.length > 0)
        cardItems.push({
          label: _(BLOCKCHAIN_RECORD),
          value: hashValue,
        });

      return { cardItems, buttonLink: `/post/${iri}` };
    },
    [_],
  );
  return getSuccessModalContent;
};
