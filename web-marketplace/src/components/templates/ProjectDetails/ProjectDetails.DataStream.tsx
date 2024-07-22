import { useEffect, useMemo, useState } from 'react';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import Timeline from '@mui/lab/Timeline';
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import {
  BlockContent,
  SanityBlockContent,
} from 'web-components/src/components/block-content';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import Navigation from 'web-components/src/components/faq/Navigation';
import ArrowDownIcon from 'web-components/src/components/icons/ArrowDownIcon';
import Section from 'web-components/src/components/section';
import { Body } from 'web-components/src/components/typography';

import { useAuth } from 'lib/auth/auth';
import { getPostsQuery } from 'lib/queries/react-query/registry-server/getPostsQuery/getPostsQuery';
import { DATA_STREAM_LIMIT } from 'lib/queries/react-query/registry-server/getPostsQuery/getPostsQuery.constants';
import { Post } from 'lib/queries/react-query/registry-server/getPostsQuery/getPostsQuery.types';

import { PostFlow } from 'components/organisms/PostFlow/PostFlow';

import {
  CREATE_POST,
  DATA_STREAM,
  SEE_LESS,
  SEE_MORE,
} from './ProjectDetails.constant';
import { DataStreamPost } from './ProjectDetails.DataStream.Post';
import { containsArray } from './ProjectDetails.utils';

type Props = {
  adminAccountId?: string | null;
  offChainProjectId?: string;
  adminDescription?: SanityBlockContent;
  onChainProjectId?: string;
  projectName?: string;
  projectSlug?: string | null;
  projectLocation?: GeocodeFeature;
};

export const DataStream = ({
  adminAccountId,
  offChainProjectId,
  adminDescription,
  onChainProjectId,
  projectName,
  projectSlug,
  projectLocation,
}: Props) => {
  const { activeAccountId } = useAuth();
  const [offset, setOffset] = useState<string | undefined>();
  const [year, setYear] = useState<number | undefined>(undefined);
  const [years, setYears] = useState<Array<number>>([]);
  // const [posts, setPosts] = useState<Array<Post>>([]);
  const [postProjectId, setPostProjectId] = useState<string | undefined>();

  const isAdmin =
    !!adminAccountId && !!activeAccountId && adminAccountId === activeAccountId;

  // const { data } = useQuery(
  //   getPostsQuery({
  //     projectId: offChainProjectId,
  //     limit: DATA_STREAM_LIMIT,
  //     // next: offset,
  //     offset,
  //     year: year && year !== years[0] ? year : undefined,
  //     enabled: !!offChainProjectId,
  //   }),
  // );

  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery(
      getPostsQuery({
        projectId: offChainProjectId,
        // next: offset,
        // offset,
        getNextPageParam: (lastPage, allPages) => {
          const posts = lastPage?.posts;
          return posts ? posts[posts.length - 1].createdAt : undefined;
        },
      }),
    );
  console.log(hasNextPage);
  // useEffect(() => {
  //   if (data?.years) {
  //     setYears(data?.years);
  //     setYear(data?.years[0]);
  //   }
  // }, [data?.years]);

  // useEffect(() => {
  //   console.log('data?.posts', data?.posts);
  //   console.log('offset', offset);
  //   if (data?.posts) {
  //     if (offset === undefined) {
  //       setPosts(data.posts);
  //       document.getElementById('data-stream')?.scrollIntoView();
  //     } else {
  //       setPosts(prev => {
  //         return [...prev, ...data.posts];
  //         if (containsArray(prev, data.posts)) {
  //           const i = prev.findIndex(post => post.iri === data.posts[0].iri);
  //           return;
  //         } else return [...prev, ...data.posts];
  //       });
  //     }
  //   }
  // }, [data?.posts, offset]);

  const posts = useMemo(() => {
    return data?.pages.reduce((acc: Post[], page) => {
      return page?.posts ? [...acc, ...page?.posts] : acc;
    }, []);
  }, [data]);
  const total = data?.pages?.[0]?.total;

  return (
    <>
      {posts && posts.length > 0 && (
        <>
          <Section
            id="data-stream"
            title={DATA_STREAM}
            titleAlign="left"
            className="mb-50 sm:mb-[100px]"
          >
            {isAdmin && adminDescription && projectLocation && (
              <div className="mt-15">
                <Body className="mb-15 max-w-[683px]" size="lg">
                  <BlockContent content={adminDescription} />
                </Body>
                <ContainedButton
                  onClick={() =>
                    setPostProjectId(onChainProjectId || offChainProjectId)
                  }
                >
                  {CREATE_POST}
                </ContainedButton>
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
                  setOffset(undefined);
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
                  {posts.map((post, i) => (
                    <DataStreamPost
                      key={post.iri}
                      post={post}
                      index={i}
                      postsLength={posts.length}
                      isAdmin={isAdmin}
                      adminAccountId={adminAccountId}
                      offChainProjectId={offChainProjectId}
                    />
                  ))}
                </Timeline>
                {total && posts.length < total && (
                  <ContainedButton
                    className="ml-[55px] sm:ml-[85px]"
                    onClick={() => {
                      fetchNextPage();
                    }}
                  >
                    <ArrowDownIcon className="mr-10 h-[24px] w-[24px]" />
                    {SEE_MORE}
                  </ContainedButton>
                )}
                {total && posts.length >= total && total > DATA_STREAM_LIMIT && (
                  <ContainedButton
                    className="ml-[55px] sm:ml-[85px]"
                    onClick={() => setOffset(undefined)}
                  >
                    <ArrowDownIcon
                      direction="up"
                      className="mr-10 h-[24px] w-[24px]"
                    />
                    {SEE_LESS}
                  </ContainedButton>
                )}
              </div>
            </div>
          </Section>
          {postProjectId && projectLocation && (
            <PostFlow
              onModalClose={() => {
                setPostProjectId(undefined);
              }}
              projectLocation={projectLocation}
              projectId={onChainProjectId || postProjectId}
              offChainProjectId={postProjectId}
              projectName={projectName}
              projectSlug={projectSlug}
            />
          )}
        </>
      )}
    </>
  );
};
