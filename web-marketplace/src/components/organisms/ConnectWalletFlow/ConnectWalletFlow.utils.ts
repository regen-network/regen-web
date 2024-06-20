import { Account, Maybe } from 'generated/graphql';

export const hasProfileData = (
  account?: Maybe<
    Pick<
      Account,
      | 'bgImage'
      | 'image'
      | 'name'
      | 'description'
      | 'twitterLink'
      | 'websiteLink'
    >
  >,
) =>
  account &&
  (account.bgImage ||
    account.image ||
    account.name ||
    account.description ||
    account.twitterLink ||
    account.websiteLink);
