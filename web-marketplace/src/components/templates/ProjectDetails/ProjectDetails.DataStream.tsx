import { useEffect, useMemo, useState } from 'react';
import { useLingui } from '@lingui/react';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import Timeline from '@mui/lab/Timeline';
import { timelineContentClasses } from '@mui/lab/TimelineContent';
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useAtom } from 'jotai';

import {
  BlockContent,
  SanityBlockContent,
} from 'web-components/src/components/block-content';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import Navigation from 'web-components/src/components/faq/Navigation';
import ArrowDownIcon from 'web-components/src/components/icons/ArrowDownIcon';
import Section from 'web-components/src/components/section';
import { Body } from 'web-components/src/components/typography';
import { UseStateSetter } from 'web-components/src/types/react/useState';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { useAuth } from 'lib/auth/auth';
import { Post } from 'lib/queries/react-query/registry-server/getPostQuery/getPostQuery.types';
import { getPostsQuery } from 'lib/queries/react-query/registry-server/getPostsQuery/getPostsQuery';
import { DATA_STREAM_LIMIT } from 'lib/queries/react-query/registry-server/getPostsQuery/getPostsQuery.constants';
import { PostsQueryResponse } from 'lib/queries/react-query/registry-server/getPostsQuery/getPostsQuery.types';
import { getPostsQueryKey } from 'lib/queries/react-query/registry-server/getPostsQuery/getPostsQuery.utils';

import { PostFormSchemaType } from 'components/organisms/PostForm/PostForm.schema';

import {
  CREATE_POST,
  DATA_STREAM,
  SEE_LESS,
  SEE_MORE,
} from './ProjectDetails.constant';
import { DataStreamPost } from './ProjectDetails.DataStream.Post';

type Props = {
  adminAddr?: string | null;
  adminAccountId?: string | null;
  offChainProjectId?: string;
  adminDescription?: SanityBlockContent;
  projectLocation?: GeocodeFeature;
  openCreatePostModal: () => void;
  setDraftPost: UseStateSetter<Partial<PostFormSchemaType> | undefined>;
};

export const DataStream = ({
  adminAddr,
  adminAccountId,
  offChainProjectId,
  adminDescription,
  projectLocation,
  openCreatePostModal,
  setDraftPost,
}: Props) => {
  const { _ } = useLingui();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { activeAccountId } = useAuth();
  const [year, setYear] = useState<number | null>(null);
  const [years, setYears] = useState<Array<number>>([]);

  const isAdmin =
    !!adminAccountId && !!activeAccountId && adminAccountId === activeAccountId;

  const queryClient = useQueryClient();
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    getPostsQuery({
      projectId: offChainProjectId,
      year: year && year !== years[0] ? year : undefined,
      languageCode: selectedLanguage,
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
            title={_(DATA_STREAM)}
            titleAlign="left"
            className="mb-50 sm:mb-[100px] pt-0"
          >
            {isAdmin && adminDescription && projectLocation && (
              <div className="mt-15">
                <Body className="mb-15 max-w-[683px]" size="lg" component="div">
                  <BlockContent content={adminDescription} />
                </Body>
                <ContainedButton onClick={openCreatePostModal}>
                  {_(CREATE_POST)}
                </ContainedButton>
              </div>
            )}
            <div className="flex mt-50">
              <Navigation
                className="hidden sm:block md:w-[150px] xl:w-[250px]"
                classes={{
                  listItem:
                    '!border-0 font-sans text-lg font-normal !rounded-[5px] p-10',
                }}
                categories={years.map(year => ({
                  label: String(year),
                  value: String(year),
                }))}
                category={String(year)}
                onClick={(yearClicked: string) => {
                  setYear(Number(yearClicked));
                }}
              />
              {!isLoading && projectLocation && posts && posts.length > 0 && (
                <div className="flex-1 min-w-0">
                  <Timeline
                    sx={{
                      padding: 0,
                      [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                      },
                      // force TimelineContent to be shrinkable, otherwise it overflows in some screen sizes
                      [`& .${timelineContentClasses.root}`]: {
                        minWidth: 0,
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
                        adminAddr={adminAddr}
                        setDraftPost={setDraftPost}
                        projectLocation={projectLocation}
                        openCreatePostModal={openCreatePostModal}
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
                      {_(SEE_MORE)}
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
                            languageCode: selectedLanguage,
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
                      {_(SEE_LESS)}
                    </ContainedButton>
                  )}
                </div>
              )}
            </div>
          </Section>
        </>
      )}
    </>
  );
};
