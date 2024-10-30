import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useLingui } from '@lingui/react';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { useQuery } from '@tanstack/react-query';
import { Feature, Point } from 'geojson';
import { useAtom, useSetAtom } from 'jotai';
import { parse } from 'wellknown';

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
import { Subtitle } from 'web-components/src/components/typography';
import { UseStateSetter } from 'web-components/src/types/react/useState';
import copyTextToClipboard from 'web-components/src/utils/copy';

import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { COPY_SUCCESS } from 'lib/constants/shared.constants';
import { Post } from 'lib/queries/react-query/registry-server/getPostQuery/getPostQuery.types';
import { getAccountByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery';

import { useAttestEvents } from 'pages/Post/hooks/useAttestEvents';
import { useDelete } from 'pages/Post/hooks/useDelete';
import { useSharePrivateLink } from 'pages/Post/hooks/useSharePrivateLink';
import {
  ADMIN,
  DRAFT,
  POST_IS_PRIVATE,
  UNTITLED,
} from 'pages/Post/Post.constants';
import { DEFAULT_NAME } from 'pages/ProfileEdit/ProfileEdit.constants';
import { getDefaultAvatar } from 'pages/ProfileEdit/ProfileEdit.utils';
import { DeletePostWarningModal } from 'components/organisms/DeletePostWarningModal/DeletePostWarningModal';
import { PostFormSchemaType } from 'components/organisms/PostForm/PostForm.schema';

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
  adminAddr?: string | null;
  setDraftPost: UseStateSetter<Partial<PostFormSchemaType> | undefined>;
  projectLocation: GeocodeFeature;
  openCreatePostModal: () => void;
};
export const DataStreamPost = ({
  offChainProjectId,
  post,
  index,
  postsLength,
  isAdmin,
  adminAccountId,
  adminAddr,
  setDraftPost,
  projectLocation,
  openCreatePostModal,
}: Props) => {
  const { _ } = useLingui();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
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
      languageCode: selectedLanguage,
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
    adminAddr,
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
          <div
            className="text-grey-0 rounded-[50%] h-[28px] w-[28px] flex items-center justify-center color"
            style={{
              background:
                'linear-gradient(197deg, rgba(var(--ac-gradients-primary-gradient-600)) 8.02%, rgba(var(--ac-gradients-primary-gradient-500)) 43.42%, rgba(var(--ac-gradients-primary-gradient-400)) 78.83%)',
            }}
          >
            <BubbleIcon />
          </div>
          <TimelineConnector className="bg-grey-300 w-1" />
        </TimelineSeparator>
        <TimelineContent className="mt-[-30px] mb-30 pr-0">
          {post.contents && (post.privacy !== 'private' || isAdmin) && (
            <PostCard
              draftLabel={!post.published ? _(DRAFT) : undefined}
              onClick={() => post.published && navigate(`/post/${post.iri}`)}
              title={post.contents.title || _(UNTITLED)}
              comment={post.contents.comment}
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
              sharePublicLink={() => {
                copyTextToClipboard(
                  `${window.location.origin}/post/${post.iri}`,
                );
                setBannerText(_(COPY_SUCCESS));
              }}
              onDelete={onOpen}
              numberOfFiles={post.contents.files?.length}
              signers={events.map(event => event.user)}
              sharePrivateLink={sharePrivateLink}
              file={file}
              preview={preview}
              onEditDraft={() => {
                setDraftPost({
                  iri: post.iri,
                  title: post.contents?.title,
                  comment: post.contents?.comment,
                  published: post.published,
                  privacyType: post.privacy,
                  files: post.contents?.files?.map(file => ({
                    ...file,
                    location:
                      file.locationType === 'none'
                        ? projectLocation
                        : ({
                            type: 'Feature',
                            geometry: parse(file.location.wkt) as Point,
                            properties: {},
                          } as Feature<Point>),
                    url: post.filesUrls?.[file.iri] as string,
                    mimeType: post.filesMimeTypes?.[file.iri] as string,
                  })),
                });
                openCreatePostModal();
              }}
            />
          )}
          {post.privacy === 'private' && !isAdmin && (
            <div className="flex items-center px-[16px] py-30 sm:p-30">
              <LockIcon className="w-[18px] h-[18px]" />
              <Subtitle size="lg">{_(PRIVATE_POST)}</Subtitle>
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
