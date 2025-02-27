import { truncate } from 'web-components/src/utils/truncate';

import { Account, Maybe } from 'generated/graphql';
import { TranslatorType } from 'lib/i18n/i18n.types';
import { PrivateAccount } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery.types';

import { DEFAULT_NAME } from 'pages/ProfileEdit/ProfileEdit.constants';
import { getDefaultAvatar } from 'pages/ProfileEdit/ProfileEdit.utils';

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
};
export const getProfile = ({
  account,
  privActiveAccount,
  _,
}: GetProfileParams) =>
  account
    ? {
        id: account.id,
        name: account.name ? account.name : _(DEFAULT_NAME),
        profileImage: account.image ? account.image : getDefaultAvatar(account),
        address: getAddress({
          walletAddress: account.addr,
          email: privActiveAccount?.email,
        }),
        selected: true,
      }
    : undefined;
