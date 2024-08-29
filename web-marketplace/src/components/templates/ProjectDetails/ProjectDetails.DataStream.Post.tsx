import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useLingui } from '@lingui/react';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import PostCard from 'web-components/src/components/cards/PostCard/PostCard';
import { BubbleIcon } from 'web-components/src/components/icons/BubbleIcon';
import { LockIcon } from 'web-components/src/components/icons/LockIcon';
import {
  isCsv,
  isDocx,
  isImage,
  isJson,
  isPdf,
  isVideo,
  isXlsOrXlsx,
} from 'web-components/src/components/inputs/new/FileDrop/FileDrop.utils';
import { FileToPreview } from 'web-components/src/components/organisms/PostFiles/components/FilePreview';
import { parseFile } from 'web-components/src/components/organisms/PostFiles/PostFiles.utils';
import { COPY_SUCCESS } from 'web-components/src/components/organisms/ProfileHeader/ProfileHeader.constants';
import { Subtitle } from 'web-components/src/components/typography';
import copyTextToClipboard from 'web-components/src/utils/copy';

import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { Post } from 'lib/queries/react-query/registry-server/getPostsQuery/getPostsQuery.types';
import { getAccountByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery';

import { useAttestEvents } from 'pages/Post/hooks/useAttestEvents';
import { useDelete } from 'pages/Post/hooks/useDelete';
import { useSharePrivateLink } from 'pages/Post/hooks/useSharePrivateLink';
import { ADMIN, POST_IS_PRIVATE } from 'pages/Post/Post.constants';
import { DEFAULT_NAME } from 'pages/ProfileEdit/ProfileEdit.constants';
import { getDefaultAvatar } from 'pages/ProfileEdit/ProfileEdit.utils';
import { DeletePostWarningModal } from 'components/organisms/DeletePostWarningModal/DeletePostWarningModal';

import {
  FILES_ARE_PRIVATE,
  LOCATIONS_ARE_PRIVATE,
  PRIVATE_POST,
} from './ProjectDetails.constant';

type Props = {
  post: Post;
  index: number;
  postsLength: number;
  isAdmin: boolean;
  adminAccountId?: string | null;
  offChainProjectId?: string;
};
export const DataStreamPost = ({
  offChainProjectId,
  post,
  index,
  postsLength,
  isAdmin,
  adminAccountId,
}: Props) => {
  const { _ } = useLingui();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const setBannerText = useSetAtom(bannerTextAtom);
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | undefined>();
  const [file, setFile] = useState<FileToPreview | undefined>();
  const { iri, createdAt } = post;
  const sharePrivateLink = useSharePrivateLink({ iri });
  const { deletePost, open, onClose, onOpen } = useDelete({
    iri,
    offChainProjectId,
  });

  const { data: creatorAccountData } = useQuery(
    getAccountByIdQuery({
      client: graphqlClient,
      id: post.creatorAccountId,
      enabled: !!graphqlClient,
    }),
  );
  const creatorAccount = creatorAccountData?.accountById;
  const creatorIsAdmin = creatorAccount?.id === adminAccountId;

  const { events } = useAttestEvents({
    iri,
    createdAt,
    creatorAccount,
    creatorIsAdmin,
    onlyAttestEvents: true,
  });

  useEffect(() => {
    async function parseFileAndSetPreview() {
      const mimeTypes = post.filesMimeTypes;
      let firstFileWithPreviewIri: string | undefined;
      let _file: FileToPreview | undefined;
      const hasFiles = Object.keys(post.filesUrls || {}).length > 0;

      if (mimeTypes && post.filesUrls && hasFiles && post.contents?.files) {
        firstFileWithPreviewIri = Object.keys(mimeTypes).find(
          key =>
            // find first file with preview available
            isImage(mimeTypes[key]) ||
            isVideo(mimeTypes[key]) ||
            isPdf(mimeTypes[key]) ||
            isCsv(mimeTypes[key]) ||
            isJson(mimeTypes[key]) ||
            isDocx(mimeTypes[key]) ||
            isXlsOrXlsx(mimeTypes[key]),
        );
        // show first file with preview available
        if (firstFileWithPreviewIri) {
          const previewFile = post.contents.files.find(
            file => file.iri === firstFileWithPreviewIri,
          );
          if (previewFile) {
            _file = {
              ...previewFile,
              url: post.filesUrls[firstFileWithPreviewIri],
              mimeType: mimeTypes[firstFileWithPreviewIri],
            };
            setFile(_file);
          }
        } else {
          // or default to first file
          _file = {
            ...post.contents.files[0],
            url: Object.values(post.filesUrls)?.[0],
            mimeType: Object.values(mimeTypes)?.[0],
          };
          setFile(_file);
        }
      }
      if (firstFileWithPreviewIri && _file) {
        const _preview = await parseFile({
          fileUrl: _file.url,
          fileName: _file.name,
          fileMimeType: _file.mimeType,
        });
        if (_preview) setPreview(_preview);
      }
    }

    parseFileAndSetPreview();
  }, [post.contents?.files, post.filesMimeTypes, post.filesUrls]);

  return (
    <>
      <TimelineItem>
        <TimelineSeparator
          className={`pr-10 sm:pr-40 ${
            index === postsLength - 1 ? 'pb-35' : ''
          }`}
        >
          <div className="text-grey-0 rounded-[50%] h-[28px] w-[28px] bg-blue-green-gradient flex items-center justify-center">
            <BubbleIcon />
          </div>
          <TimelineConnector className="bg-grey-300 w-1" />
        </TimelineSeparator>
        <TimelineContent className="mt-[-30px] mb-30 pr-0">
          {post.contents && (post.privacy !== 'private' || isAdmin) && (
            <PostCard
              onClick={() => navigate(`/post/${post.iri}`)}
              title={post.contents.title}
              description={post.contents.comment}
              privacyLabel={
                post.privacy === 'private'
                  ? _(POST_IS_PRIVATE)
                  : post.privacy === 'private_files'
                  ? _(FILES_ARE_PRIVATE)
                  : post.privacy === 'private_locations'
                  ? _(LOCATIONS_ARE_PRIVATE)
                  : undefined
              }
              publicPost={post.privacy === 'public'}
              author={{
                name: creatorAccount?.name || _(DEFAULT_NAME),
                type: creatorAccount?.type ?? 'USER',
                image:
                  creatorAccount?.image || getDefaultAvatar(creatorAccount),
                link: `/profiles/${creatorAccount?.id}`,
                timestamp: post.createdAt,
                tag: creatorIsAdmin ? _(ADMIN) : undefined,
              }}
              isAdmin={isAdmin}
              handleClickShare={() => {
                copyTextToClipboard(
                  `${window.location.origin}/post/${post.iri}`,
                );
                setBannerText(COPY_SUCCESS);
              }}
              onDelete={onOpen}
              numberOfFiles={post.contents.files?.length}
              signers={events.map(event => event.user)}
              sharePrivateLink={sharePrivateLink}
              file={file}
              preview={preview}
            />
          )}
          {post.privacy === 'private' && !isAdmin && (
            <div className="flex items-center px-[16px] py-30 sm:p-30">
              <LockIcon className="w-[18px] h-[18px]" />
              <Subtitle size="lg">{PRIVATE_POST}</Subtitle>
            </div>
          )}
        </TimelineContent>
      </TimelineItem>
      {isAdmin && (
        <DeletePostWarningModal
          onDelete={deletePost}
          open={open}
          onClose={onClose}
        />
      )}
    </>
  );
};
