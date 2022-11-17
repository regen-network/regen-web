import { useEffect, useState } from 'react';

import { useWallet } from '../lib/wallet/wallet';
import { useQueryListAdminProjects } from './useQueryListAdminProjects';

export function useQueryIfProjectAdmin(): boolean {
  const [isAdmin, setAdmin] = useState(false);
  const { wallet } = useWallet();
  const adminProjects = useQueryListAdminProjects();

  useEffect(() => {
    const queryIfAdmin = async (): Promise<void> => {
      if (!wallet?.address) {
        setAdmin(false);
      } else {
        let isCreditClassAdmin: boolean;
        if (adminProjects) {
          isCreditClassAdmin = adminProjects.length > 0;
        } else {
          isCreditClassAdmin = false;
        }
        setAdmin(isCreditClassAdmin);
      }
    };

    queryIfAdmin();
  }, [wallet?.address, adminProjects]);
  return isAdmin;
}
