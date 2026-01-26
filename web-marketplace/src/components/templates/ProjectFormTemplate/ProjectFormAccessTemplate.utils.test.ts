import { describe, expect, it } from 'vitest';

import {
  ROLE_ADMIN,
  ROLE_AUTHOR,
  ROLE_EDITOR,
  ROLE_OWNER,
  ROLE_VIEWER,
} from 'components/organisms/ActionDropdown/ActionDropdown.constants';

import { getCanManagePost } from './ProjectFormAccessTemplate.utils';

describe('ProjectFormAccessTemplate.utils', () => {
  describe('getCanManagePostWithRole', () => {
    it('should allow creating posts for owner role', () => {
      const result = getCanManagePost({ role: ROLE_OWNER });

      expect(result).toBe(true);
    });

    it('should allow creating posts for admin role', () => {
      const result = getCanManagePost({ role: ROLE_ADMIN });

      expect(result).toBe(true);
    });

    it('should allow creating posts for editor role', () => {
      const result = getCanManagePost({ role: ROLE_EDITOR });

      expect(result).toBe(true);
    });

    it('should allow creating posts for author role', () => {
      const result = getCanManagePost({ role: ROLE_AUTHOR });

      expect(result).toBe(true);
    });

    it('should not allow creating posts for viewer role', () => {
      const result = getCanManagePost({ role: ROLE_VIEWER });

      expect(result).toBe(false);
    });

    it('should not allow creating posts when role is undefined', () => {
      const result = getCanManagePost({ role: undefined });

      expect(result).toBe(false);
    });
  });
});
