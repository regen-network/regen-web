import { InfiniteQueryObserverOptions } from '@tanstack/react-query';
import { JsonLdDocument } from 'jsonld';

import { PostPrivacyType } from 'web-components/src/components/organisms/PostFiles/PostFiles.types';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

// Reuse types from #2384 once merged
export type PostFile = {
  iri: string;
  name?: string;
  description?: string;
  location?: { wkt: string };
  credit?: string;
};

export type PostContents = JsonLdDocument & {
  title: string;
  comment: string;
  files?: Array<PostFile>;
};

export type Post = {
  iri: string;
  createdAt: string;
  creatorAccountId: string;
  projectId: string;
  privacy: PostPrivacyType;
  contents?: PostContents;
  filesUrls:
    | {
        [iri: string]: string;
      }
    | undefined;
  filesMimeTypes:
    | {
        [iri: string]: string;
      }
    | undefined;
  error?: string;
};

export type PostsQueryResponse = {
  posts: Post[];
  years?: Array<number>;
  next?: string;
} | null;
export type ReactQueryGetPostsQueryResponse =
  InfiniteQueryObserverOptions<PostsQueryResponse>;

export type GetPostsQueryParams = {
  projectId?: string;
  next?: string;
  year?: number | null;
};
export type ReactQueryGetPostsQueryParams = GetPostsQueryParams &
  ReactQueryBuilderResponse<ReactQueryGetPostsQueryResponse>;
