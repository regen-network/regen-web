import getApiUri from './apiUri';

export const chainId = process.env.REACT_APP_LEDGER_CHAIN_ID;

// expLedger is a feature flag indicating the app is connected to a testnet with experimental features (Hambach).
export const expLedger = process.env.REACT_APP_EXP_LEDGER;

const expUriBase = 'exp-';
const uriBase = `${getApiUri()}/${expLedger ? expUriBase : ''}`;

// Simple proxy endpoint for REST requests.
export const ledgerRESTUri = `${uriBase}ledger-rest`;

export const ledgerRPCUri = `${uriBase}ledger`;

export const ledgerExpRPCUri = `${getApiUri()}/${expUriBase}ledger`;
