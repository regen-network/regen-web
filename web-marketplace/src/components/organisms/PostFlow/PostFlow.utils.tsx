import { Trans } from '@lingui/macro';

import { TextButton } from 'web-components/src/components/buttons/TextButton';
import { Item } from 'web-components/src/components/modal/TxModal';
import { CardItemValue } from 'web-components/src/components/modal/TxModal.CardItemValue';
import { truncate } from 'web-components/src/utils/truncate';

import { getHashUrl } from 'lib/block-explorer';
import {
  Post,
  PostFile,
} from 'lib/queries/react-query/registry-server/getPostQuery/getPostQuery.types';

import { Link } from 'components/atoms';

import { PostFormSchemaType } from '../PostForm/PostForm.schema';
import { FILE_NAMES, HASH, PROJECT } from './PostFlow.constants';

export const getFiles = (files?: PostFormSchemaType['files']) => {
  return files?.map(file => {
    return {
      iri: file.iri,
      name: file.name,
      description: file.description,
      location: { wkt: file.location }, // TODO migrate from geojson to wkt
      locationType: file.locationType,
      credit: file.credit,
    };
  });
};

type GetSuccessModalContentParams = {
  createdPostData?: Post | null;
  projectSlug?: string | null;
  projectId?: string;
  offChainProjectId?: string;
  projectName?: string;
  anchorTxHash?: string;
  attestTxHash?: string;
};
export const getSuccessModalContent = ({
  createdPostData,
  projectSlug,
  projectId,
  offChainProjectId,
  projectName,
  anchorTxHash,
  attestTxHash,
}: GetSuccessModalContentParams) => {
  const iri = createdPostData?.iri;
  const files = createdPostData?.contents?.files as PostFile[] | undefined;
  const filesUrls = createdPostData?.filesUrls;

  const projectUrl = `/project/${
    projectSlug ?? projectId ?? offChainProjectId
  }`;
  const cardItems: Item[] = [
    {
      label: PROJECT,
      value: {
        name: projectName ?? projectId ?? offChainProjectId,
        url: projectUrl,
      },
    },
  ];
  if (files && files.length && filesUrls && filesUrls.length) {
    cardItems.unshift({
      label: FILE_NAMES,
      value:
        files.map(file => ({
          name: file.name as string,
          url: filesUrls[file.iri],
        })) || [],
    });
  }

  const hashValue = [];
  if (anchorTxHash) {
    hashValue.push({
      component: (
        <div className="flex">
          <TextButton
            textSize="sm"
            className="font-extrabold text-grey-400 hover:text-grey-400 pr-3"
          >
            <Trans>anchor</Trans>:
          </TextButton>
          <CardItemValue
            size="sm"
            mobileSize="sm"
            value={{
              name: truncate(anchorTxHash),
              url: getHashUrl(anchorTxHash),
            }}
            linkComponent={Link}
          />
        </div>
      ),
    });
  }
  if (attestTxHash) {
    hashValue.push({
      component: (
        <div className="flex">
          <TextButton
            textSize="sm"
            className="font-extrabold text-grey-400 hover:text-grey-400 pr-3"
          >
            <Trans>attest</Trans>:{' '}
          </TextButton>
          <CardItemValue
            size="sm"
            mobileSize="sm"
            value={{
              name: truncate(attestTxHash),
              url: getHashUrl(attestTxHash),
            }}
            linkComponent={Link}
          />
        </div>
      ),
    });
  }

  if (hashValue.length > 0)
    cardItems.push({
      label: HASH,
      value: hashValue,
    });

  return { cardItems, buttonLink: `/post/${iri}` };
};
