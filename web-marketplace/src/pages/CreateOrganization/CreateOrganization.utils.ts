import type { AccountByIdQuery } from 'generated/graphql';
import { AccountType } from 'generated/graphql';

export const hasTransferableProfile = (
  account?: AccountByIdQuery['accountById'],
): boolean => {
  if (!account) return false;
  if (account.type !== AccountType.Organization) return false;

  return Boolean(
    account.name?.trim() ||
      account.description?.trim() ||
      account.image?.trim() ||
      account.bgImage?.trim() ||
      account.websiteLink?.trim() ||
      account.twitterLink?.trim(),
  );
};
