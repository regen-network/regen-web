import { TranslatorType } from '../../../lib/i18n/i18n.types';
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
  isCurrentUser?: boolean;
  onRemove: () => void;
  onEditOrgRole?: () => void;
  navigate: (path: string) => void;
  _: TranslatorType;
}
