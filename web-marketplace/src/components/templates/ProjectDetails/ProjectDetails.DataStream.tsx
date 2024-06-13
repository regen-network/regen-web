import { useEffect, useState } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import {
  BlockContent,
  SanityBlockContent,
} from 'web-components/src/components/block-content';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import PostCard from 'web-components/src/components/cards/PostCard/PostCard';
import Navigation from 'web-components/src/components/faq/Navigation';
import { LockIcon } from 'web-components/src/components/icons/LockIcon';
import { COPY_SUCCESS } from 'web-components/src/components/organisms/ProfileHeader/ProfileHeader.constants';
import Section from 'web-components/src/components/section';
import { Body, Subtitle } from 'web-components/src/components/typography';
import copyTextToClipboard from 'web-components/src/utils/copy';

import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { useAuth } from 'lib/auth/auth';
import { getPostsQuery } from 'lib/queries/react-query/registry-server/getPostsQuery/getPostsQuery';
import { Post } from 'lib/queries/react-query/registry-server/getPostsQuery/getPostsQuery.types';
import { getAccountByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery';

import { DEFAULT_NAME } from 'pages/ProfileEdit/ProfileEdit.constants';

import {
  ADMIN,
  CREATE_POST,
  DATA_STREAM,
  DATA_STREAM_LIMIT,
  PRIVATE_POST,
  SEE_MORE,
} from './ProjectDetails.constant';

type Props = {
  adminAccountId?: string | null;
  offChainProjectId?: string;
  adminDescription?: SanityBlockContent;
};

export const DataStream = ({
  adminAccountId,
  offChainProjectId,
  adminDescription,
}: Props) => {
  const { activeAccountId } = useAuth();
  const [offset, setOffset] = useState<number>(0);
  const [year, setYear] = useState<number | undefined>(undefined);
  const [years, setYears] = useState<Array<number>>([]);
  const [posts, setPosts] = useState<Array<Post>>([]);
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const setBannerText = useSetAtom(bannerTextAtom);

  const isAdmin =
    !!adminAccountId && !!activeAccountId && adminAccountId === activeAccountId;

  const { data, isFetching } = useQuery(
    getPostsQuery({
      projectId: offChainProjectId,
      limit: DATA_STREAM_LIMIT,
      offset,
      year: year && year !== years[0] ? year : undefined,
      enabled: !!offChainProjectId,
    }),
  );

  const creatorAccountsRes = useQueries({
    queries: posts.map(post =>
      getAccountByIdQuery({
        client: graphqlClient,
        id: post.creatorAccountId,
        enabled: !!graphqlClient,
      }),
    ),
  });
  const creatorAccounts = creatorAccountsRes?.map(res => res.data?.accountById);

  useEffect(() => {
    if (data?.years) {
      setYears(data?.years);
      setYear(data?.years[0]);
    }
  }, [data?.years]);

  useEffect(() => {
    if (data?.posts) {
      if (offset === 0) {
        setPosts(data.posts);
      } else {
        setPosts(prev => [...prev, ...data.posts]);
      }
    }
  }, [data?.posts, offset]);

  return (
    <Section
      title={DATA_STREAM}
      titleAlign="left"
      className="mb-50 sm:mb-[100px]"
    >
      {isAdmin && adminDescription && (
        <div className="mt-15">
          <Body className="mb-15 max-w-[683px]" size="lg">
            <BlockContent content={adminDescription} />
          </Body>
          {/* TODO wire up create post button once #2381 merged */}
          <ContainedButton>{CREATE_POST}</ContainedButton>
        </div>
      )}
      <div className="flex mt-50">
        <Navigation
          className="hidden sm:block w-[250px] mr-50"
          classes={{
            listItem:
              '!border-0 font-sans text-lg font-normal !rounded-[5px] p-10',
          }}
          categories={years.map(year => String(year))}
          category={String(year)}
          onClick={(yearClicked: string) => {
            setYear(Number(yearClicked));
            setOffset(0);
          }}
        />
        <div className="w-[100%]">
          <Timeline
            sx={{
              padding: 0,
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            {posts.map((post, i) => {
              const creatorAccount = creatorAccounts[i];
              const creatorIsAdmin = creatorAccount?.id === adminAccountId;
              return (
                <TimelineItem key={post.iri}>
                  <TimelineSeparator
                    className={`pr-10 sm:pr-40 ${
                      i === posts.length - 1 ? 'pb-35' : ''
                    }`}
                  >
                    <div className="rounded-[50%] h-[28px] w-[28px] bg-grey-200 flex items-center justify-center"></div>
                    <TimelineConnector className="bg-grey-300 w-1" />
                  </TimelineSeparator>
                  <TimelineContent className="mt-[-30px] mb-30">
                    {post.contents && (post.privacy !== 'private' || isAdmin) && (
                      <PostCard
                        title={post.contents.title}
                        description={post.contents.comment}
                        isPrivate={post.privacy === 'private'}
                        author={{
                          name: creatorAccount?.name || DEFAULT_NAME,
                          type: creatorAccount?.type ?? 'USER',
                          image: creatorAccount?.image,
                          link: `/profiles/${creatorAccount?.id}`,
                          timestamp: post.createdAt,
                          tag: creatorIsAdmin ? ADMIN : undefined,
                        }}
                        isAdmin={isAdmin}
                        handleClickShare={() => {
                          copyTextToClipboard(
                            `${window.location.origin}/post/${post.iri}`,
                          );
                          setBannerText(COPY_SUCCESS);
                        }}
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
            })}
          </Timeline>
          {data?.total && posts.length < data?.total && (
            <ContainedButton
              onClick={() => setOffset(prev => prev + DATA_STREAM_LIMIT)}
            >
              {SEE_MORE}
            </ContainedButton>
          )}
        </div>
      </div>
    </Section>
  );
};
