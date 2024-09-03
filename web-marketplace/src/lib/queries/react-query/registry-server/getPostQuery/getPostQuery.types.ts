import { QueryObserverOptions } from '@tanstack/react-query';
import { JsonLdDocument } from 'jsonld';

import { PostPrivacyType } from 'web-components/src/components/organisms/PostFiles/PostFiles.types';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type PostFile = {
  iri: string;
  name?: string;
  description?: string;
  location?: { wkt: string };
  credit?: string;
};

export type PostContents = JsonLdDocument & {
  title?: string;
  comment?: string;
  files?: Array<PostFile>;
};

export type Post = {
  iri: string;
  createdAt: string;
  creatorAccountId: string;
  projectId: string;
  privacy: PostPrivacyType;
  contents?: PostContents;
  published?: boolean;
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
  prevIri?: string;
  nextIri?: string;
};

export type ReactQueryGetPostQueryResponse = QueryObserverOptions<Post | null>;

export type ReactQueryGetPostQueryParams = {
  iri?: string;
  token?: string | null;
} & ReactQueryBuilderResponse<ReactQueryGetPostQueryResponse>;
