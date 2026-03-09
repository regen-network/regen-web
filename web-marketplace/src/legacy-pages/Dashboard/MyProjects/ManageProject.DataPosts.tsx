import { useCallback, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import type { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { Box } from '@mui/material';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useDelete } from 'legacy-pages/Post/hooks/useDelete';
import uniq from 'lodash/uniq';

import { TablePaginationParams } from 'web-components/src/components/table/ActionsTable';
import { UseStateSetter } from 'web-components/src/types/react/useState';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { Post } from 'lib/queries/react-query/registry-server/getPostQuery/getPostQuery.types';
import {
  getPostsPageQuery,
  PostsSortField,
  PostsSortOrder,
} from 'lib/queries/react-query/registry-server/getPostsQuery/getPostsPageQuery';
import { getAccountByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery';

import { ROLE_VIEWER } from 'components/organisms/ActionDropdown/ActionDropdown.constants';
import { ProjectRole } from 'components/organisms/BaseMembersTable/BaseMembersTable.types';
import { DataPostsTable } from 'components/organisms/DataPostsTable';
import { DATA_POSTS_COLUMN_MAPPING } from 'components/organisms/DataPostsTable/DataPostsTable.constants';
import { DataPost } from 'components/organisms/DataPostsTable/DataPostsTable.types';
import { mapPostToDataPost } from 'components/organisms/DataPostsTable/DataPostsTable.utils';
import { DeletePostWarningModal } from 'components/organisms/DeletePostWarningModal/DeletePostWarningModal';
import { mapPostToDraft } from 'components/organisms/PostForm/PostForm.mapDraft';
import { PostFormSchemaType } from 'components/organisms/PostForm/PostForm.schema';

import { useFetchProject } from './hooks/useFetchProject';

/**
 * ManageProject.DataPosts — route child for the "Data Posts" tab
 * on the project manage dashboard.
 *
 * Fetches posts via offset/limit server-side pagination
 * (`getPostsPageQuery`), resolves each unique `creatorAccountId`
 * via `getAccountByIdQuery`, then maps to the `DataPost` view-model.
 */

const DataPosts = (): JSX.Element => {
  const {
    project,
    isLoading,
    openCreatePostModal,
    setDraftPost,
    role,
    canCreatePost,
    createPostDisabled,
    createPostTooltipText,
  } = useOutletContext<
    ReturnType<typeof useFetchProject> & {
      openCreatePostModal: () => void;
      setDraftPost: UseStateSetter<Partial<PostFormSchemaType> | undefined>;
      role?: ProjectRole;
      canCreatePost?: boolean;
      createPostDisabled?: boolean;
      createPostTooltipText?: string;
    }
  >();

  const isViewer = role === ROLE_VIEWER;
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

  const { page, rowsPerPage } = paginationParams;

  // ----- Sort state (server-side) -----
  const [sortField, setSortField] = useState<PostsSortField>('created_at');
  const [sortOrder, setSortOrder] = useState<PostsSortOrder>('desc');

  const sortCallbacks = useMemo(
    () =>
      Object.values(DATA_POSTS_COLUMN_MAPPING).map(header =>
        header.sortEnabled
          ? (order: 'asc' | 'desc') => {
              setSortField(header.sortKey as PostsSortField);
              setSortOrder(order);
              // Reset to first page on sort change
              setPaginationParams(prev => ({ ...prev, page: 0, offset: 0 }));
            }
          : undefined,
      ),
    [],
  );

  // ----- Fetch posts (server-side pagination + sorting) -----
  const { data: postsData, isLoading: isPostsLoading } = useQuery(
    getPostsPageQuery({
      projectId: project.offChainId,
      offset: page * rowsPerPage,
      limit: rowsPerPage,
      languageCode: selectedLanguage,
      sort: sortField,
      sortOrder: sortOrder,
    }),
  );

  const posts: Post[] = useMemo(
    () => postsData?.posts ?? [],
    [postsData?.posts],
  );
  const totalPosts = postsData?.totalCount ?? 0;

  // Merge server-provided total into pagination params so ActionsTable
  // can display correct page controls ("X–Y of Z").
  const paginationParamsWithCount = useMemo(
    () => ({ ...paginationParams, count: totalPosts }),
    [paginationParams, totalPosts],
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

  const noPosts = !isPostsLoading && totalPosts === 0;

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

  // ----- Action handlers -----
  const handleEditDraft = useCallback(
    (dataPost: DataPost) => {
      const post = postsByIri.get(dataPost.iri);
      if (!post) return;

      const projectLocation = project?.location as GeocodeFeature;
      setDraftPost(mapPostToDraft(post, projectLocation));
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
        posts={dataPosts}
        noPosts={noPosts}
        isLoading={isLoading || isPostsLoading}
        onTableChange={setPaginationParams}
        initialPaginationParams={paginationParamsWithCount}
        isIgnoreOffset
        onEditDraft={handleEditDraft}
        onDeletePost={handleDeletePost}
        sortCallbacks={sortCallbacks}
        isViewer={isViewer}
        onCreatePost={openCreatePostModal}
        canCreatePost={canCreatePost}
        createPostDisabled={createPostDisabled}
        createPostTooltipText={createPostTooltipText}
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
