import { GetAccountsByNameOrAddrQuery } from 'generated/graphql';

import { BaseMemberRole } from '../BaseMembersTable/BaseMembersTable.types';

export type Member = {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  role: BaseMemberRole;
  avatar?: string;
  visible: boolean;
  isCurrentUser?: boolean;
  hasWalletAddress: boolean;
  invited?: boolean;
};

export interface InviteMemberModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    role: BaseMemberRole | undefined;
    addressOrEmail: string;
    visible: boolean;
  }) => void;
  accounts?: GetAccountsByNameOrAddrQuery | null;
  setDebouncedValue?: (value: string) => void;
}
