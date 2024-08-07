import { useEffect, useMemo, useState } from 'react';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import Timeline from '@mui/lab/Timeline';
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';

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
import {
  Post,
  PostsQueryResponse,
} from 'lib/queries/react-query/registry-server/getPostsQuery/getPostsQuery.types';
import { getPostsQueryKey } from 'lib/queries/react-query/registry-server/getPostsQuery/getPostsQuery.utils';

import { PostFlow } from 'components/organisms/PostFlow/PostFlow';

import {
  CREATE_POST,
  DATA_STREAM,
  SEE_LESS,
  SEE_MORE,
} from './ProjectDetails.constant';
import { DataStreamPost } from './ProjectDetails.DataStream.Post';

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
  const [year, setYear] = useState<number | null>(null);
  const [years, setYears] = useState<Array<number>>([]);
  const [postProjectId, setPostProjectId] = useState<string | undefined>();

  const isAdmin =
    !!adminAccountId && !!activeAccountId && adminAccountId === activeAccountId;

  const queryClient = useQueryClient();
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    getPostsQuery({
      projectId: offChainProjectId,
      year: year && year !== years[0] ? year : undefined,
      getNextPageParam: lastPage => lastPage?.next,
    }),
  );

  useEffect(() => {
    if (data?.pages?.[0]?.years) {
      setYears(data.pages[0].years);
      setYear(data.pages[0].years[0]);
    }
  }, [data?.pages]);

  const posts = useMemo(() => {
    return data?.pages.reduce((acc: Post[], page) => {
      return page?.posts ? [...acc, ...page?.posts] : acc;
    }, []);
  }, [data]);

  return (
    <>
      {((!isLoading && posts && posts.length > 0) || !!year) && (
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
                }}
              />
              {!isLoading && posts && posts.length > 0 && (
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
                  {hasNextPage && (
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
                  {!hasNextPage && posts.length > DATA_STREAM_LIMIT && (
                    <ContainedButton
                      className="ml-[55px] sm:ml-[85px]"
                      onClick={() => {
                        queryClient.setQueryData<
                          InfiniteData<PostsQueryResponse>
                        >(
                          getPostsQueryKey({
                            projectId: offChainProjectId,
                            year: year && year !== years[0] ? year : undefined,
                          }),
                          data => ({
                            pages: data?.pages?.slice(
                              0,
                              1,
                            ) as PostsQueryResponse[],
                            pageParams: data?.pageParams?.slice(
                              0,
                              1,
                            ) as unknown[],
                          }),
                        );
                      }}
                    >
                      <ArrowDownIcon
                        direction="up"
                        className="mr-10 h-[24px] w-[24px]"
                      />
                      {SEE_LESS}
                    </ContainedButton>
                  )}
                </div>
              )}
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
