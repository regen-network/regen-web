export interface TerrasosProjectMetadataLD {
  'regen:conservationStatus'?: IucnStatus;
  'regen:ecologicalConnectivityIndex'?: number;
  'regen:socialCulturalIndex'?: number;
  'regen:administrativeArea'?: {
    'schema:name': string;
    'schema:url'?: string;
  };
  'regen:managementAreas'?: {
    'regen:projectActivity': string;
    'dcterms:extent': QudtValue;
  }[];
  'regen:projectDuration'?: string;
  'regen:marketType'?: MarketType[];
  'regen:bioregion'?: string[];
  'regen:biomeType'?: string[];
  'regen:watershed'?: string;
  'regen:subWatershed'?: string;
  'regen:department'?: string;
}

export type IucnStatus =
  | 'EXTINCT'
  | 'EXTINCT_IN_WILD'
  | 'CRITICALLY_ENDANGERED'
  | 'ENDANGERED'
  | 'VULNERABLE'
  | 'NEAR_THREATENED'
  | 'LEAST_CONCERN'
  | 'DATA_DEFICIENT'
  | 'NOT_EVALUATED';

export type MarketType = 'COMPLIANCE_MARKET' | 'VOLUNTARY_MARKET';

export type QudtValue = {
  'qudt:unit': string;
  'qudt:numericValue': number;
};
