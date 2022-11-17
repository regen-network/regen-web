import { useEffect, useState } from 'react';
import { ClassInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { useWallet } from 'lib/wallet/wallet';

import useQueryListClasses from './useQueryListClasses';

export function useQueryListAdminClasses(): ClassInfo[] | undefined {
  const { wallet } = useWallet();
  const classList = useQueryListClasses();
  const [adminClassList, setAdminClassList] = useState<ClassInfo[] | undefined>(
    undefined,
  );
  useEffect(() => {
    if (!wallet?.address) {
      setAdminClassList(undefined);
    } else {
      const adminClasses = classList?.classes?.filter(
        x => x.admin === wallet.address,
      );
      setAdminClassList(adminClasses);
    }
  }, [classList, wallet?.address]);
  return adminClassList;
}
