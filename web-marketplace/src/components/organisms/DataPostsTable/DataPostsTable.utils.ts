import { AccountByIdQuery } from 'generated/graphql';
import { Post } from 'lib/queries/react-query/registry-server/getPostQuery/getPostQuery.types';

import { DataPost } from './DataPostsTable.types';

/**
 * Map a canonical `Post` (from the registry API) plus optional resolved
 * account data into the flattened `DataPost` view-model used by the table.
 */
export const mapPostToDataPost = (
  post: Post,
  account?: AccountByIdQuery['accountById'] | null,
): DataPost => {
  const organization =
    account?.daosByAssignmentAccountIdAndDaoAddress?.nodes?.[0]
      ?.organizationByDaoAddress;

  return {
    iri: post.iri,
    title: post.contents?.title ?? '',
    createdAt: post.createdAt,
    author: account?.name ?? post.creatorAccountId,
    authorAvatarUrl: account?.image ?? undefined,
    authorProfileLink: account?.addr ? `/profiles/${account.addr}` : undefined,
    authorCompany: organization?.name ?? undefined,
    privacy: post.privacy,
    filesCount: post.contents?.files?.length ?? 0,
    published: post.published ?? true,
    projectId: post.projectId,
  };
};
