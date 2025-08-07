import { Context } from '../BaseMembersTable/BaseMembersTable.types';

export type ActionItem = {
  label: string;
  onClick?: () => void;
  danger?: boolean;
  disabled?: boolean;
};

export interface GetActionItemsParams {
  context: Context;
  role: string;
  currentUserRole: string;
  orgRole?: string;
  isCurrentUser?: boolean;
  isExternalAdmin: boolean;
  onRemove: () => void;
  onEditOrgRole?: () => void;
  onEditTitle?: () => void;
  navigate: (path: string) => void;
  _: (message: any) => string;
}
