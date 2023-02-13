import getApiUri from './apiUri';

export const chainId = process.env.REACT_APP_LEDGER_CHAIN_ID;
export const nctBasket = process.env.REACT_APP_NCT_BASKET === 'true';
export const isBridgeEnabled = process.env.REACT_APP_BRIDGE === 'true';

// v4Ledger is a feature flag indicating the app is connected to a testnet with Regen Ledger v4.0.
// It can be removed once redwood/mainnet upgrades to v4.0.
export const v4Ledger = process.env.REACT_APP_V4_LEDGER;

const v4UriBase = 'v4-';
const uriBase = `${getApiUri()}/${v4Ledger ? v4UriBase : ''}`;

// Simple proxy endpoint for REST requests.
export const ledgerRESTUri = `${uriBase}ledger-rest`;

export const ledgerRPCUri = `${uriBase}ledger`;
export const onChainClassRegExp = /[A-Z]{1,3}[0-9]{2,}/;
