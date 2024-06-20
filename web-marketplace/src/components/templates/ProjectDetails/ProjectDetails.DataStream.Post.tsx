import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import PostCard from 'web-components/src/components/cards/PostCard/PostCard';
import { BubbleIcon } from 'web-components/src/components/icons/BubbleIcon';
import { LockIcon } from 'web-components/src/components/icons/LockIcon';
import { isImage } from 'web-components/src/components/inputs/new/FileDrop/FileDrop.utils';
import { COPY_SUCCESS } from 'web-components/src/components/organisms/ProfileHeader/ProfileHeader.constants';
import { Subtitle } from 'web-components/src/components/typography';
import copyTextToClipboard from 'web-components/src/utils/copy';

import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { Post } from 'lib/queries/react-query/registry-server/getPostsQuery/getPostsQuery.types';
import { getAccountByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery';

import { useAttestEvents } from 'pages/Post/hooks/useAttestEvents';
import { ADMIN, POST_IS_PRIVATE } from 'pages/Post/Post.constants';
import { DEFAULT_NAME } from 'pages/ProfileEdit/ProfileEdit.constants';
import { getDefaultAvatar } from 'pages/ProfileEdit/ProfileEdit.utils';

import { API_URI, IMAGE_STORAGE_BASE_URL } from './ProjectDetails.config';
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
};
export const DataStreamPost = ({
  post,
  index,
  postsLength,
  isAdmin,
  adminAccountId,
}: Props) => {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const setBannerText = useSetAtom(bannerTextAtom);

  const { iri, createdAt } = post;

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
  });

  const mimeTypes = post.filesMimeTypes;
  let firstImageIri: string | undefined;
  let firstImageUrl: string | undefined;
  if (mimeTypes && post.filesUrls) {
    firstImageIri = Object.keys(mimeTypes).find(key => isImage(mimeTypes[key]));
    if (firstImageIri) {
      firstImageUrl = post.filesUrls[firstImageIri];
    }
  }

  return (
    <TimelineItem key={post.iri}>
      <TimelineSeparator
        className={`pr-10 sm:pr-40 ${index === postsLength - 1 ? 'pb-35' : ''}`}
      >
        <div className="text-grey-0 rounded-[50%] h-[28px] w-[28px] bg-blue-green-gradient flex items-center justify-center">
          <BubbleIcon />
        </div>
        <TimelineConnector className="bg-grey-300 w-1" />
      </TimelineSeparator>
      <TimelineContent className="mt-[-30px] mb-30">
        {post.contents && (post.privacy !== 'private' || isAdmin) && (
          <PostCard
            title={post.contents.title}
            description={post.contents.comment}
            privacyLabel={
              post.privacy === 'private'
                ? POST_IS_PRIVATE
                : post.privacy === 'private_files'
                ? FILES_ARE_PRIVATE
                : post.privacy === 'private_locations'
                ? LOCATIONS_ARE_PRIVATE
                : undefined
            }
            author={{
              name: creatorAccount?.name || DEFAULT_NAME,
              type: creatorAccount?.type ?? 'USER',
              image: creatorAccount?.image || getDefaultAvatar(creatorAccount),
              link: `/profiles/${creatorAccount?.id}`,
              timestamp: post.createdAt,
              tag: creatorIsAdmin ? ADMIN : undefined,
            }}
            isAdmin={isAdmin}
            handleClickShare={() => {
              copyTextToClipboard(`${window.location.origin}/post/${post.iri}`);
              setBannerText(COPY_SUCCESS);
            }}
            imageStorageBaseUrl={IMAGE_STORAGE_BASE_URL}
            apiServerUrl={API_URI}
            imgSrc={firstImageUrl}
            numberOfFiles={post.contents.files?.length}
            signers={events.map(event => event.user)}
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
  );
};
