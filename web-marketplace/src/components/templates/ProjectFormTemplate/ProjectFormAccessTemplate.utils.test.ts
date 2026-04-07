import { v4 as uuidv4 } from 'uuid';
import { describe, expect, it } from 'vitest';

import {
  ROLE_ADMIN,
  ROLE_AUTHOR,
  ROLE_EDITOR,
  ROLE_OWNER,
  ROLE_VIEWER,
} from 'components/organisms/ActionDropdown/ActionDropdown.constants';

import { getCanSeeOrManagePost } from './ProjectFormAccessTemplate.utils';

const creatorAccountId = uuidv4();
const otherAccountId = uuidv4();

describe('ProjectFormAccessTemplate.utils', () => {
  describe('getCanSeeOrManagePost', () => {
    it('should allow managing post for owner role', () => {
      const result = getCanSeeOrManagePost({
        role: ROLE_OWNER,
        creatorAccountId,
        currentAccountId: creatorAccountId,
      });

      expect(result).toBe(true);
    });

    it('should allow managing post for admin role', () => {
      const result = getCanSeeOrManagePost({
        role: ROLE_ADMIN,
        creatorAccountId,
        currentAccountId: creatorAccountId,
      });

      expect(result).toBe(true);
    });

    it('should allow managing post for editor role', () => {
      const result = getCanSeeOrManagePost({
        role: ROLE_EDITOR,
        creatorAccountId,
        currentAccountId: creatorAccountId,
      });

      expect(result).toBe(true);
    });

    it('should allow managing post for author role that is the creator', () => {
      const result = getCanSeeOrManagePost({
        role: ROLE_AUTHOR,
        creatorAccountId,
        currentAccountId: creatorAccountId,
      });

      expect(result).toBe(true);
    });

    it('should not allow managing post for author role that is not the creator', () => {
      const result = getCanSeeOrManagePost({
        role: ROLE_AUTHOR,
        creatorAccountId,
        currentAccountId: otherAccountId,
      });

      expect(result).toBe(false);
    });

    it('should not allow managing post for viewer role', () => {
      const result = getCanSeeOrManagePost({
        role: ROLE_VIEWER,
        creatorAccountId,
        currentAccountId: otherAccountId,
      });

      expect(result).toBe(false);
    });

    it('should not allow managing post when role is undefined', () => {
      const result = getCanSeeOrManagePost({
        role: undefined,
        creatorAccountId,
        currentAccountId: otherAccountId,
      });

      expect(result).toBe(false);
    });
  });
});
