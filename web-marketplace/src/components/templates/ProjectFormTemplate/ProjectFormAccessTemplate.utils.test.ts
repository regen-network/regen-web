import { describe, expect, it } from 'vitest';

import {
  ROLE_ADMIN,
  ROLE_AUTHOR,
  ROLE_EDITOR,
  ROLE_OWNER,
  ROLE_VIEWER,
} from 'components/organisms/ActionDropdown/ActionDropdown.constants';

import { getCanCreatePost } from './ProjectFormAccessTemplate.utils';

describe('ProjectFormAccessTemplate.utils', () => {
  describe('getCanCreatePostWithRole', () => {
    it('should allow creating posts for owner role', () => {
      const result = getCanCreatePost({ role: ROLE_OWNER });

      expect(result.canCreatePost).toBe(true);
      expect(result.role).toBe(ROLE_OWNER);
    });

    it('should allow creating posts for admin role', () => {
      const result = getCanCreatePost({ role: ROLE_ADMIN });

      expect(result.canCreatePost).toBe(true);
      expect(result.role).toBe(ROLE_ADMIN);
    });

    it('should allow creating posts for editor role', () => {
      const result = getCanCreatePost({ role: ROLE_EDITOR });

      expect(result.canCreatePost).toBe(true);
      expect(result.role).toBe(ROLE_EDITOR);
    });

    it('should allow creating posts for author role', () => {
      const result = getCanCreatePost({ role: ROLE_AUTHOR });

      expect(result.canCreatePost).toBe(true);
      expect(result.role).toBe(ROLE_AUTHOR);
    });

    it('should not allow creating posts for viewer role', () => {
      const result = getCanCreatePost({ role: ROLE_VIEWER });

      expect(result.canCreatePost).toBe(false);
      expect(result.role).toBe(ROLE_VIEWER);
    });

    it('should not allow creating posts when role is undefined', () => {
      const result = getCanCreatePost({ role: undefined });

      expect(result.canCreatePost).toBe(false);
      expect(result.role).toBe(undefined);
    });
  });
});
