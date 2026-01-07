import {
  ROLE_ADMIN,
  ROLE_EDITOR,
  ROLE_OWNER,
} from '../ActionDropdown/ActionDropdown.constants';

export const isWalletRequiredForRole = (role: string) => {
  return role === ROLE_ADMIN || role === ROLE_OWNER || role === ROLE_EDITOR;
};
