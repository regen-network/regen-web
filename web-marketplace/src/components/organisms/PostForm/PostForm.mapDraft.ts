import type { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { Feature, Point } from 'geojson';
import { parse } from 'wellknown';

import { Post } from 'lib/queries/react-query/registry-server/getPostQuery/getPostQuery.types';

import { PostFormSchemaType } from './PostForm.schema';

/**
 * Convert a raw `Post` into a partial `PostFormSchemaType` suitable for
 * hydrating the post form when editing a draft.
 *
 * Shared between DataStreamPost and ManageProject.DataPosts so the mapping
 * stays consistent in both places.
 */
export const mapPostToDraft = (
  post: Post,
  projectLocation: GeocodeFeature,
): Partial<PostFormSchemaType> => ({
  id: post.id,
  updatedAt: new Date(post.updatedAt),
  iri: post.iri,
  title: post.contents?.title,
  comment: post.contents?.comment,
  published: post.published,
  privacyType: post.privacy,
  disallowFileDownloads: !post.canDownloadFiles,
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
