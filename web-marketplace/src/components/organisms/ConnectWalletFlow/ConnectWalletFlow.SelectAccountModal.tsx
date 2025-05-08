import { useState } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { TextButton } from 'web-components/src/components/buttons/TextButton';
import Modal from 'web-components/src/components/modal';
import { CancelButtonFooter } from 'web-components/src/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Body, Title } from 'web-components/src/components/typography';
import UserAvatar from 'web-components/src/components/user/UserAvatar';
import { RegenModalPropsWithOnClose } from 'web-components/src/types/shared/modalPropsWithOnClose';
import { truncate } from 'web-components/src/utils/truncate';

import { Account } from 'generated/graphql';

import { DEFAULT_NAME } from 'legacy-pages/ProfileEdit/ProfileEdit.constants';
import { getDefaultAvatar } from 'legacy-pages/ProfileEdit/ProfileEdit.utils';

import {
  CURRENT_ACCOUNT,
  SELECT_ACCOUNT_CANCEL,
  SELECT_ACCOUNT_DESCRIPTION,
  SELECT_ACCOUNT_MERGE,
  SELECT_ACCOUNT_TITLE,
} from './ConnectWalletFlow.constants';
import { MergeAccountsParams } from './hooks/useMergeAccounts';

type MergeAccount = Array<
  Pick<Account, 'id' | 'name' | 'addr' | 'image' | 'type'> & {
    current: boolean;
    email?: string | null;
  }
>;
interface Props extends RegenModalPropsWithOnClose {
  merge: (params: MergeAccountsParams) => Promise<void>;
  accounts: MergeAccount;
}

export const SelectAccountModal = ({
  open,
  onClose,
  merge,
  accounts,
}: Props) => {
  const { _ } = useLingui();
  const [selectedAccountId, setSelectedAccountId] = useState<
    MergeAccount | undefined
  >();
  return (
    <Modal open={open} onClose={onClose}>
      <Title variant="h4" align="center" sx={{ my: 5 }}>
        {_(SELECT_ACCOUNT_TITLE)}
      </Title>
      <Body size="lg" align="center" sx={{ mb: 12.5 }}>
        {_(SELECT_ACCOUNT_DESCRIPTION)}
      </Body>
      <div className="pb-40">
        {accounts.map(account => (
          <div
            key={account.addr}
            className={`flex border-solid border border-grey-300 p-20 mb-10 rounded-[10px] cursor-pointer ${
              account.id === selectedAccountId ? 'bg-grey-200' : 'bg-grey-0'
            }`}
            onClick={() => setSelectedAccountId(account.id)}
          >
            <UserAvatar
              size="small"
              alt={_(msg`default avatar`)}
              src={account.image || getDefaultAvatar(account)}
            />
            <div className="ml-15">
              <Body size="lg" className="font-bold text-grey-600">
                {account.name || _(DEFAULT_NAME)}
              </Body>
              <Body size="sm" className="text-grey-400">
                {account.email || truncate(account.addr)}
              </Body>
              {account.current && (
                <TextButton className="pt-10 text-[11px] text-grey-600 hover:text-grey-600">
                  {_(CURRENT_ACCOUNT)}
                </TextButton>
              )}
            </div>
          </div>
        ))}
      </div>
      <CancelButtonFooter
        onCancel={onClose}
        disabled={!selectedAccountId}
        cancelLabel={_(SELECT_ACCOUNT_CANCEL)}
        label={_(SELECT_ACCOUNT_MERGE)}
        onClick={() => {
          const selectedAccount = accounts.find(
            account => account.id === selectedAccountId,
          );
          if (selectedAccount) {
            merge({ keepCurrentAccount: selectedAccount.current });
          }
        }}
      />
    </Modal>
  );
};
