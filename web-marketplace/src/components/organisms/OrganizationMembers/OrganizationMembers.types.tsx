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
};

export type VisibilitySwitchProps = {
  checked: boolean;
  disabled?: boolean;
  isCurrentUser?: boolean;
  onChange: (val: boolean) => void;
};
