import { useEffect, useState } from 'react';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { useWallet } from 'lib/wallet/wallet';

import useQueryListProjects from './useQueryListProjects';

export function useQueryListAdminProjects(): ProjectInfo[] | undefined {
  const { wallet } = useWallet();
  const projectList = useQueryListProjects();
  const [adminProjectList, setAdminProjectList] = useState<
    ProjectInfo[] | undefined
  >(undefined);
  useEffect(() => {
    if (!wallet?.address) {
      setAdminProjectList(undefined);
    } else {
      const adminClasses = projectList?.projects?.filter(
        x => x.admin === wallet.address,
      );
      setAdminProjectList(adminClasses);
    }
  }, [projectList, wallet?.address]);
  return adminProjectList;
}
