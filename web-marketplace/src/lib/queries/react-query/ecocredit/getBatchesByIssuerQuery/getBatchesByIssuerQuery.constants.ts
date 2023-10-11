type GetBatchesByProjectKey = {
  issuer: string;
  offset: string;
  limit: string;
};

export const getBatchesByIssuerKey = ({
  issuer,
  offset,
  limit,
}: GetBatchesByProjectKey): string[] => [
  'batchesByIssuer',
  issuer,
  offset,
  limit,
];
