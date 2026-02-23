import { useCallback, useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useLingui } from '@lingui/react';
import type { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { Box } from '@mui/material';
import { useInfiniteQuery, useQueries } from '@tanstack/react-query';
import { Feature, Point } from 'geojson';
import { useAtom } from 'jotai';
import { useDelete } from 'legacy-pages/Post/hooks/useDelete';
import uniq from 'lodash/uniq';
import { parse } from 'wellknown';

import { TablePaginationParams } from 'web-components/src/components/table/ActionsTable';
import { UseStateSetter } from 'web-components/src/types/react/useState';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { Post } from 'lib/queries/react-query/registry-server/getPostQuery/getPostQuery.types';
import { getPostsQuery } from 'lib/queries/react-query/registry-server/getPostsQuery/getPostsQuery';
import { getAccountByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery';

import { DataPostsTable } from 'components/organisms/DataPostsTable';
import { DataPost } from 'components/organisms/DataPostsTable/DataPostsTable.types';
import { mapPostToDataPost } from 'components/organisms/DataPostsTable/DataPostsTable.utils';
import { useSortedDataPosts } from 'components/organisms/DataPostsTable/useSortedDataPosts';
import { DeletePostWarningModal } from 'components/organisms/DeletePostWarningModal/DeletePostWarningModal';
import { PostFormSchemaType } from 'components/organisms/PostForm/PostForm.schema';

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
  const { project, isLoading, openCreatePostModal, setDraftPost } =
    useOutletContext<
      ReturnType<typeof useFetchProject> & {
        openCreatePostModal: () => void;
        setDraftPost: UseStateSetter<Partial<PostFormSchemaType> | undefined>;
      }
    >();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  // ----- Pagination state -----
  const [paginationParams, setPaginationParams] =
    useState<TablePaginationParams>({
      page: 0,
      rowsPerPage: 10,
      offset: 0,
    });

  // ----- Fetch posts (same pattern as DataStream) -----
  const {
    data: postsData,
    isLoading: isPostsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    getPostsQuery({
      projectId: project.offChainId,
      languageCode: selectedLanguage,
    }),
  );

  // Fetch all pages so the table has the complete dataset for
  // client-side pagination.
  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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

  // Build a lookup: iri → raw Post (needed for edit draft to reconstruct file data)
  const postsByIri = useMemo(() => {
    const map = new Map<string, Post>();
    posts.forEach(p => map.set(p.iri, p));
    return map;
  }, [posts]);

  // ----- Delete post -----
  const [deleteIri, setDeleteIri] = useState<string | undefined>();
  const {
    deletePost,
    open: deleteOpen,
    onClose: deleteOnClose,
    onOpen: deleteOnOpen,
  } = useDelete({
    iri: deleteIri,
    offChainProjectId: project.offChainId,
  });

  // ----- Sorting -----
  const { sortedPosts, sortCallbacks } = useSortedDataPosts({
    posts: dataPosts,
  });

  // ----- Action handlers -----
  const handleEditDraft = useCallback(
    (dataPost: DataPost) => {
      const post = postsByIri.get(dataPost.iri);
      if (!post) return;

      const projectLocation = project?.location as GeocodeFeature;
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
    },
    [postsByIri, project?.location, setDraftPost, openCreatePostModal],
  );

  const handleDeletePost = useCallback(
    (post: DataPost) => {
      setDeleteIri(post.iri);
      deleteOnOpen();
    },
    [deleteOnOpen],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <DataPostsTable
        posts={sortedPosts}
        noPosts={noPosts}
        isLoading={isLoading || isPostsLoading || isFetchingNextPage}
        onTableChange={setPaginationParams}
        initialPaginationParams={paginationParams}
        onEditDraft={handleEditDraft}
        onDeletePost={handleDeletePost}
        sortCallbacks={sortCallbacks}
      />
      <DeletePostWarningModal
        onDelete={deletePost}
        open={deleteOpen}
        onClose={deleteOnClose}
      />
    </Box>
  );
};

export default DataPosts;
