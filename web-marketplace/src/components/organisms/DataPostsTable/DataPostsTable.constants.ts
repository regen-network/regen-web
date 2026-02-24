import { msg } from '@lingui/core/macro';

export const DATA_POSTS_TABLE_LABEL = msg`data posts table`;

export const DATA_POSTS_TITLE = msg`Data Posts`;
export const DATA_POSTS_DESCRIPTION = msg`Upload data, provide updates, and anchor your information to the blockchain for full transparency and accountability.`;

export const EDIT_DRAFT_ACTION = msg`Edit Draft`;
export const DELETE_POST_ACTION = msg`Delete Post`;

export const PUBLIC_LABEL = msg`Public`;

/* eslint-disable lingui/no-unlocalized-strings */
/** Column configuration for building sortCallbacks.
 * Order must match the headerRows array in DataPostsTable. */
export enum DATA_POSTS_HEADERS {
  TITLE = 'title',
  DATE_CREATED = 'dateCreated',
  AUTHOR = 'author',
  PRIVACY = 'privacy',
  FILES = 'files',
}

export const DATA_POSTS_COLUMN_MAPPING: Record<
  DATA_POSTS_HEADERS,
  { sortKey: string; sortEnabled?: boolean }
> = {
  [DATA_POSTS_HEADERS.TITLE]: { sortKey: 'title', sortEnabled: true },
  [DATA_POSTS_HEADERS.DATE_CREATED]: {
    sortKey: 'createdAt',
    sortEnabled: true,
  },
  [DATA_POSTS_HEADERS.AUTHOR]: { sortKey: 'author', sortEnabled: true },
  [DATA_POSTS_HEADERS.PRIVACY]: { sortKey: 'privacy' },
  [DATA_POSTS_HEADERS.FILES]: { sortKey: 'filesCount' },
};
/* eslint-enable lingui/no-unlocalized-strings */
