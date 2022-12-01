import { useEffect, useState } from 'react';

import { CreditClassMetadataLD } from 'lib/db/types/json-ld';

export function useCreditClassDisplayName(
  creditClassId: string,
  metadata?: Partial<CreditClassMetadataLD>,
): string {
  const [creditClassName, setCreditClassName] = useState<string>('');

  useEffect(() => {
    let name = metadata?.['schema:name'];
    const displayName = name ? `${name} (${creditClassId})` : creditClassId;
    setCreditClassName(displayName);
  }, [creditClassId, metadata]);

  return creditClassName;
}
