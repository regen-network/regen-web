import { useEffect, useState } from 'react';

import { AnchoredProjectMetadataIntersectionLD } from 'lib/db/types/json-ld';
import { getAreaUnit, qudtUnit } from 'lib/rdf';

type UseAnchoredMetadataResponse = {
  projectName?: string;
  area?: string;
  areaUnit?: string;
};

const defaultValues = {
  projectName: undefined,
  area: undefined,
  areaUnit: undefined,
};

export const useAnchoredMetadata = (
  anchoredMetadata?: Partial<AnchoredProjectMetadataIntersectionLD>,
): UseAnchoredMetadataResponse => {
  const [values, setValues] =
    useState<UseAnchoredMetadataResponse>(defaultValues);

  useEffect(() => {
    const projectName = anchoredMetadata?.['schema:name'];
    const projectSize = anchoredMetadata?.['regen:projectSize'];
    const area = projectSize?.['qudt:numericValue']?.['@value'];
    const unit = projectSize?.['qudt:unit']?.['@value'];
    const areaUnit = getAreaUnit(unit as qudtUnit);

    setValues({ projectName, area, areaUnit });
  }, [anchoredMetadata]);

  return values;
};
