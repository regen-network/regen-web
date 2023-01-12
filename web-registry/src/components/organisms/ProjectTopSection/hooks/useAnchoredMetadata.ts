import { AnchoredProjectMetadataIntersectionLD } from 'lib/db/types/json-ld';
import { getAreaUnit, qudtUnit } from 'lib/rdf';

type UseAnchoredMetadataResponse = {
  projectName?: string;
  area?: string;
  areaUnit?: string;
  placeName?: string;
};

export const useAnchoredMetadata = (
  anchoredMetadata?: Partial<AnchoredProjectMetadataIntersectionLD>,
): UseAnchoredMetadataResponse => {
  const projectName = anchoredMetadata?.['schema:name'];
  const projectSize = anchoredMetadata?.['regen:projectSize'];
  const area = projectSize?.['qudt:numericValue']?.['@value'];
  const unit = projectSize?.['qudt:unit']?.['@value'];
  const areaUnit = getAreaUnit(unit as qudtUnit);
  const placeName =
    anchoredMetadata?.['schema:location']?.['place_name'] ??
    anchoredMetadata?.['schema:location']?.['geojson:place_name'];

  return { projectName, area, areaUnit, placeName };
};
