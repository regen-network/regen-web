import { useEffect, useState } from 'react';

import type { ClassID } from 'types/ledger/ecocredit';

export default function useUpdateProjectClass(projectId: string): {
  classId: ClassID | undefined;
  isVCS: boolean | undefined;
} {
  const [classId, setClassId] = useState<ClassID>();
  const [isVCS, setIsVCS] = useState<boolean>();

  useEffect(() => {
    if (!projectId) return;
    const _classId = projectId.split('-')[0] as ClassID;
    setClassId(_classId);
    setIsVCS(_classId === 'C01' || _classId === 'C02'); // TODO: just 'C01' when v4 is in mainnet
  }, [projectId]);

  return { classId, isVCS };
}
