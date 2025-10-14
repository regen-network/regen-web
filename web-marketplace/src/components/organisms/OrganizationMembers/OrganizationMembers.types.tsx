import { GetAccountsByNameOrAddrQuery } from 'generated/graphql';

import { BaseMemberRole } from '../BaseMembersTable/BaseMembersTable.types';
import { UseStateSetter } from 'web-components/src/types/react/useState';

export type Member = {
  id: string;
  name: string;
  email?: string | null;
  address?: string | null;
  title?: string | null;
  organization: string;
  role: BaseMemberRole;
  onChainRoleId: number;
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
  setDebouncedValue: UseStateSetter<string>;
}

export type VisibilitySwitchProps = {
  checked: boolean;
  disabled?: boolean;
  isCurrentUser?: boolean;
  onChange: (val: boolean) => void;
};
