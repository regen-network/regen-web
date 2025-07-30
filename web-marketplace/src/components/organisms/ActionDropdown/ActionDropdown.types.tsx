export type ActionItem = {
  label: string;
  onClick?: () => void;
  danger?: boolean;
  disabled?: boolean;
};

export interface GetActionItemsParams {
  context: 'project' | 'members';
  role: string;
  currentUserRole: string;
  orgRole?: string;
  isCurrentUser?: boolean;
  isExternalAdmin: boolean;
  isOnlyAdmin: boolean;
  onRemove: () => void;
  onEditOrgRole?: () => void;
  onEditTitle?: () => void;
  navigate: (path: string) => void;
  _: (message: any) => string;
}
