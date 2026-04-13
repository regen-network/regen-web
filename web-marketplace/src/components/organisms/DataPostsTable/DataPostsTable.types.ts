import { PostPrivacyType } from 'web-components/src/components/organisms/PostFiles/PostFiles.types';

export type DataPost = {
  /** The IRI of the post */
  iri: string;
  /** Post title */
  title: string;
  /** ISO date string when the post was created */
  createdAt: string;
  /** Author display name or address */
  author: string;
  /** Author avatar image URL */
  authorAvatarUrl?: string;
  /** Author profile link (e.g. /profiles/:id) */
  authorProfileLink?: string;
  /** Privacy setting of the post */
  privacy: PostPrivacyType;
  /** Number of files attached to the post */
  filesCount: number;
  /** Whether the post has been published */
  published: boolean;
  /** The project ID associated with the post */
  projectId: string;
};
