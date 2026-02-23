import {
  createAscSortHandler,
  createDescSortHandler,
} from 'lib/sort/createSortHandler';

import { DataPost } from './DataPostsTable.types';

export type DataPostsSortType =
  | 'default'
  | 'title-asc'
  | 'title-desc'
  | 'createdAt-asc'
  | 'createdAt-desc'
  | 'author-asc'
  | 'author-desc';

const asc = createAscSortHandler<DataPost>();
const desc = createDescSortHandler<DataPost>();

export const sortDataPosts = (
  posts: DataPost[],
  sort: DataPostsSortType,
): DataPost[] => {
  switch (sort) {
    case 'title-asc':
      return posts.sort(asc('title'));
    case 'title-desc':
      return posts.sort(desc('title'));
    case 'createdAt-asc':
      return posts.sort(asc('createdAt'));
    case 'createdAt-desc':
      return posts.sort(desc('createdAt'));
    case 'author-asc':
      return posts.sort(asc('author'));
    case 'author-desc':
      return posts.sort(desc('author'));
    default:
      return posts;
  }
};
