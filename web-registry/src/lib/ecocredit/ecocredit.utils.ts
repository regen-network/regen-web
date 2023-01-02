const v1AlphaBatchDenomRegex = /(C\d{2})-\d{3}/;

export const getV1AlphaBatchDenom = (batchDenom: string): string => {
  const batchDenomOldPrefix = batchDenom.match(v1AlphaBatchDenomRegex)?.[0];
  const batchDenomNewPrefix = batchDenom.match(v1AlphaBatchDenomRegex)?.[1];
  return batchDenomOldPrefix && batchDenomNewPrefix
    ? batchDenom.replace(batchDenomOldPrefix, batchDenomNewPrefix)
    : batchDenom;
};
