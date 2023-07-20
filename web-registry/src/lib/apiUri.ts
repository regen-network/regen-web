export const apiUri = import.meta.env.VITE_API_URI || 'http://localhost:5000';
export const indexerApiUri =
  `${import.meta.env.VITE_API_URI}/indexer` || 'http://localhost:5000/indexer';
