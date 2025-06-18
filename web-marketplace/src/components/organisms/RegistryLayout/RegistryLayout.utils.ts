import { truncate } from 'web-components/src/utils/truncate';

import { Account, Maybe } from 'generated/graphql';
import { TranslatorType } from 'lib/i18n/i18n.types';
import { PrivateAccount } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery.types';

import { DEFAULT_NAME } from 'pages/Dashboard/Dashboard.constants';
import { getDefaultAvatar } from 'pages/Dashboard/Dashboard.utils';

type GetAddressParams = {
  walletAddress?: string | null;
  email?: string | null;
};

export const getAddress = ({ walletAddress, email }: GetAddressParams) =>
  walletAddress ? truncate(walletAddress) : email;

type GetProfileParams = {
  account?: Maybe<Pick<Account, 'id' | 'name' | 'image' | 'addr' | 'type'>>;
  privActiveAccount?: PrivateAccount;
  _: TranslatorType;
  profileLink: string;
  dashboardLink: string;
};
export const getProfile = ({
  account,
  privActiveAccount,
  profileLink,
  dashboardLink,
  _,
}: GetProfileParams) =>
  account
    ? {
        id: account.id,
        name: account.name ? account.name : _(DEFAULT_NAME),
        profileImage: account.image ? account.image : getDefaultAvatar(account),
        truncatedAddress: getAddress({
          walletAddress: account.addr,
          email: privActiveAccount?.email,
        }),
        address: account.addr ?? privActiveAccount?.email,
        profileLink,
        dashboardLink,
      }
    : undefined;
