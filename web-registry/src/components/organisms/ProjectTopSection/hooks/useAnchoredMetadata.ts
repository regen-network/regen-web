import { useMemo } from 'react';

import { AnchoredProjectMetadataIntersectionLD } from 'lib/db/types/json-ld';
import { getAreaUnit, qudtUnit } from 'lib/rdf';

type UseAnchoredMetadataResponse = {
  projectName?: string;
  area?: string;
  areaUnit?: string;
};

export const useAnchoredMetadata = (
  anchoredMetadata?: Partial<AnchoredProjectMetadataIntersectionLD>,
): UseAnchoredMetadataResponse => {
  const values: UseAnchoredMetadataResponse = useMemo(() => {
    const projectName = anchoredMetadata?.['schema:name'];
    const projectSize = anchoredMetadata?.['regen:projectSize'];
    const area = projectSize?.['qudt:numericValue']?.['@value'];
    const unit = projectSize?.['qudt:unit']?.['@value'];
    const areaUnit = getAreaUnit(unit as qudtUnit);

    return { projectName, area, areaUnit };
  }, [anchoredMetadata]);

  return values;
};
