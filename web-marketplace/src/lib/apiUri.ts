export const apiUri =
  process.env.NEXT_PUBLIC_API_URI || 'http://localhost:5000';
export const indexerApiUri =
  `${process.env.NEXT_PUBLIC_API_URI}/indexer/v1` ||
  'http://localhost:5000/indexer/v1';
