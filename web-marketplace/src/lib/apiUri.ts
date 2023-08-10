export const apiUri = import.meta.env.VITE_API_URI || 'http://localhost:5000';
export const indexerApiUri =
  `${import.meta.env.VITE_API_URI}/indexer/v1` ||
  'http://localhost:5000/indexer/v1';
