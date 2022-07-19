import { useEffect, useState } from 'react';
import type { ClassID } from '../../../../types/ledger/ecocredit';

export default function useUpdateProjectClass(projectId: string) {
  const [classId, setClassId] = useState<ClassID>();
  const [isVCS, setIsVCS] = useState<boolean>();

  useEffect(() => {
    if (!projectId) return;
    const _classId = projectId.split('-')[0] as ClassID;
    setClassId(_classId);
    setIsVCS(_classId === 'C01' || _classId === 'C02');
  }, [projectId]);

  return { classId, isVCS };
}
