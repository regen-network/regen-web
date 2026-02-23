import { useMemo, useState } from 'react';

import { SortCallbacksType } from 'web-components/src/components/table/ActionsTable';
import { Order } from 'web-components/src/components/table/Table.utils';

import { DATA_POSTS_COLUMN_MAPPING } from './DataPostsTable.constants';
import { DataPostsSortType, sortDataPosts } from './DataPostsTable.sort';
import { DataPost } from './DataPostsTable.types';

type Params = {
  posts?: DataPost[];
};

export type SortedDataPostsResponse = {
  sortedPosts: DataPost[];
  sortCallbacks: SortCallbacksType;
};

export const useSortedDataPosts = ({
  posts = [],
}: Params): SortedDataPostsResponse => {
  const [sort, setSort] = useState<DataPostsSortType>('createdAt-desc');

  const sortCallbacks = useMemo(
    () =>
      Object.values(DATA_POSTS_COLUMN_MAPPING).map(header =>
        header.sortEnabled
          ? (order: Order) =>
              setSort(`${header.sortKey}-${order}` as DataPostsSortType)
          : undefined,
      ),
    [],
  );

  const sortedPosts = useMemo(
    () => sortDataPosts([...posts], sort),
    [posts, sort],
  );

  return {
    sortedPosts,
    sortCallbacks,
  };
};
