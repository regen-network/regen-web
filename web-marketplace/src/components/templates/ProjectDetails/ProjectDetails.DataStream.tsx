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

import PostCard from 'web-components/src/components/cards/PostCard/PostCard';
import Navigation from 'web-components/src/components/faq/Navigation';
import Section from 'web-components/src/components/section';

import { useAuth } from 'lib/auth/auth';
import { getPostsQuery } from 'lib/queries/react-query/registry-server/getPostsQuery/getPostsQuery';
import { Post } from 'lib/queries/react-query/registry-server/getPostsQuery/getPostsQuery.types';
import { getAccountByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery';

import { DEFAULT_NAME } from 'pages/ProfileEdit/ProfileEdit.constants';

import { DATA_STREAM, DATA_STREAM_LIMIT } from './ProjectDetails.constant';

type Props = {
  adminAccountId?: string | null;
  offChainProjectId?: string;
};
export const DataStream = ({ adminAccountId, offChainProjectId }: Props) => {
  const { activeAccountId } = useAuth();
  const [offset, setOffset] = useState<number>(0);
  const [year, setYear] = useState<number | undefined>(undefined);
  const [years, setYears] = useState<Array<number>>([]);
  const [posts, setPosts] = useState<Array<Post>>([]);
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

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
    <Section title={DATA_STREAM} titleAlign="left">
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
            return (
              <TimelineItem key={post.iri}>
                <TimelineSeparator>
                  <div className="rounded-[50%] h-[28px] w-[28px] bg-grey-200 flex items-center justify-center"></div>
                  <TimelineConnector className="bg-grey-300 w-1" />
                </TimelineSeparator>
                <TimelineContent>
                  {post.contents && (post.privacy !== 'private' || isAdmin) && (
                    <PostCard
                      title={post.contents.title}
                      description={post.contents.comment}
                      timestamp={post.createdAt}
                      isPrivate={post.privacy === 'private'}
                      author={{
                        name: creatorAccount?.name || DEFAULT_NAME,
                        type: creatorAccount?.type ?? 'USER',
                        image: creatorAccount?.image,
                        link: `/profiles/${creatorAccount?.id}`,
                        // TODO add tag once #2384 merge
                      }}
                      isAdmin={isAdmin}
                    />
                  )}
                  {post.privacy === 'private' && !isAdmin && <></>}
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </div>
    </Section>
  );
};
