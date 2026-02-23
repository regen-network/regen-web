import { useCallback, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useLingui } from '@lingui/react';
import { Box } from '@mui/material';
import { useInfiniteQuery, useQueries } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import uniq from 'lodash/uniq';

import { TablePaginationParams } from 'web-components/src/components/table/ActionsTable';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { Post } from 'lib/queries/react-query/registry-server/getPostQuery/getPostQuery.types';
import { getPostsQuery } from 'lib/queries/react-query/registry-server/getPostsQuery/getPostsQuery';
import { getAccountByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery';

import { DataPostsTable } from 'components/organisms/DataPostsTable';
import { DataPost } from 'components/organisms/DataPostsTable/DataPostsTable.types';
import { mapPostToDataPost } from 'components/organisms/DataPostsTable/DataPostsTable.utils';
import { useSortedDataPosts } from 'components/organisms/DataPostsTable/useSortedDataPosts';

import { useFetchProject } from './hooks/useFetchProject';

/**
 * ManageProject.DataPosts — route child for the "Data Posts" tab
 * on the project manage dashboard.
 *
 * Fetches posts via the same `getPostsQuery` infinite-query used by
 * the DataStream section, resolves each unique `creatorAccountId`
 * via `getAccountByIdQuery`, then maps to the `DataPost` view-model.
 */
const DataPosts = (): JSX.Element => {
  const { _ } = useLingui();
  const { project, isLoading } =
    useOutletContext<ReturnType<typeof useFetchProject>>();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  // ----- Pagination state -----
  const [paginationParams, setPaginationParams] =
    useState<TablePaginationParams>({
      page: 0,
      rowsPerPage: 5,
      offset: 0,
    });

  // ----- Fetch posts (same pattern as DataStream) -----
  const { data: postsData, isLoading: isPostsLoading } = useInfiniteQuery(
    getPostsQuery({
      projectId: project.offChainId,
      languageCode: selectedLanguage,
    }),
  );

  // Flatten all pages into a single Post[] array
  const posts: Post[] = useMemo(
    () =>
      postsData?.pages.reduce<Post[]>(
        (acc, page) => (page?.posts ? [...acc, ...page.posts] : acc),
        [],
      ) ?? [],
    [postsData],
  );

  // ----- Resolve unique creator accounts -----
  const uniqueCreatorIds = useMemo(
    () => uniq(posts.map(p => p.creatorAccountId)),
    [posts],
  );

  const accountResults = useQueries({
    queries: uniqueCreatorIds.map(id =>
      getAccountByIdQuery({
        client: graphqlClient,
        id,
        enabled: !!graphqlClient && !!id,
        languageCode: selectedLanguage,
      }),
    ),
  });

  // Build a lookup: creatorAccountId → resolved account
  const accountMap = useMemo(() => {
    const map = new Map<
      string,
      NonNullable<typeof accountResults[number]['data']>['accountById']
    >();
    uniqueCreatorIds.forEach((id, i) => {
      const account = accountResults[i]?.data?.accountById;
      if (account) {
        map.set(id, account);
      }
    });
    return map;
  }, [uniqueCreatorIds, accountResults]);

  // ----- Map Post → DataPost -----
  const dataPosts: DataPost[] = useMemo(
    () =>
      posts.map(post =>
        mapPostToDataPost(post, accountMap.get(post.creatorAccountId)),
      ),
    [posts, accountMap],
  );

  const noPosts = !isPostsLoading && dataPosts.length === 0;

  // ----- Sorting -----
  const { sortedPosts, sortCallbacks } = useSortedDataPosts({
    posts: dataPosts,
  });

  // ----- Action handlers -----
  const handleEditDraft = useCallback((post: DataPost) => {
    // TODO: Navigate to the post editing flow (PostFlow) with the draft data
    void post;
  }, []);

  const handleDeletePost = useCallback((post: DataPost) => {
    // TODO: Open confirmation modal and call delete mutation
    void post;
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <DataPostsTable
        posts={sortedPosts}
        noPosts={noPosts}
        isLoading={isLoading || isPostsLoading}
        onTableChange={setPaginationParams}
        initialPaginationParams={paginationParams}
        onEditDraft={handleEditDraft}
        onDeletePost={handleDeletePost}
        sortCallbacks={sortCallbacks}
      />
    </Box>
  );
};

export default DataPosts;
