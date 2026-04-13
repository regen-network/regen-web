import { DEFAULT_PROFILE_USER_AVATAR } from 'legacy-pages/Dashboard/Dashboard.constants';

import { AccountByIdQuery } from 'generated/graphql';
import { TranslatorType } from 'lib/i18n/i18n.types';
import { Post } from 'lib/queries/react-query/registry-server/getPostQuery/getPostQuery.types';

import { UNNAMED } from '../DashboardNavigation/DashboardNavigation.constants';
import { DataPost } from './DataPostsTable.types';

/**
 * Map a canonical `Post` (from the regen server API) plus optional resolved
 * account data into the flattened `DataPost` view-model used by the table.
 */
export const mapPostToDataPost = (
  post: Post,
  _: TranslatorType,
  account?: AccountByIdQuery['accountById'] | null,
): DataPost => {
  return {
    iri: post.iri,
    title: post.contents?.title ?? '',
    createdAt: post.createdAt,
    author: account?.name || _(UNNAMED),
    authorAvatarUrl: account?.image || DEFAULT_PROFILE_USER_AVATAR,
    authorProfileLink: account?.addr
      ? `/profiles/${account.addr}`
      : account?.id
      ? `/profiles/${account.id}`
      : undefined,
    privacy: post.privacy,
    filesCount: post.contents?.files?.length ?? 0,
    published: post.published ?? true,
    projectId: post.projectId,
  };
};
