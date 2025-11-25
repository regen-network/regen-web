import { UseStateSetter } from 'web-components/src/types/react/useState';

import {
  DaoByAddressQuery,
  GetAccountsByNameOrAddrQuery,
} from 'generated/graphql';

import { BaseMemberRole } from '../BaseMembersTable/BaseMembersTable.types';

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
  daoWithAddress?: DaoByAddressQuery['daoByAddress'];
}

export type VisibilitySwitchProps = {
  checked: boolean;
  disabled?: boolean;
  isCurrentUser?: boolean;
  onChange: (val: boolean) => void;
};
