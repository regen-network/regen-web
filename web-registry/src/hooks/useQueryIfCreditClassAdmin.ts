import { useEffect, useState } from 'react';

import { useWallet } from '../lib/wallet/wallet';
import { useQueryListAdminClasses } from './useQueryListAdminClasses';

export function useQueryIfCreditClassAdmin(): boolean {
  const [isAdmin, setAdmin] = useState(false);
  const { wallet } = useWallet();
  const adminClasses = useQueryListAdminClasses();

  useEffect(() => {
    const queryIfAdmin = async (): Promise<void> => {
      if (!wallet?.address) {
        setAdmin(false);
      } else {
        let isCreditClassAdmin: boolean;
        if (adminClasses) {
          isCreditClassAdmin = adminClasses.length > 0;
        } else {
          isCreditClassAdmin = false;
        }
        setAdmin(isCreditClassAdmin);
      }
    };

    queryIfAdmin();
  }, [wallet?.address, adminClasses]);
  return isAdmin;
}
