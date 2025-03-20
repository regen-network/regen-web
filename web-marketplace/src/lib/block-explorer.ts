export const explorer = import.meta.env.VITE_BLOCK_EXPLORER;

const isMintscan = explorer?.includes('mintscan');
const isAtomscan = explorer?.includes('atomscan');
const isAneka = explorer?.includes('aneka');

export const getAccountUrl = (
  address: string | undefined | null,
  useExplorer?: boolean,
): string => {
  if (!address) return '';
  if (address.startsWith('regen') && !useExplorer) {
    return `/profiles/${address}/portfolio`;
  }
  if (isAneka) {
    return `${explorer}/accounts/${address}`;
  } else if (isMintscan) {
    return `${explorer}/regen/account/${address}`;
  } else if (isAtomscan) {
    return `${explorer}/regen-network/accounts/${address}`;
  }
  return '';
};

export const getBaseTransactionUrl = (): string => {
  if (isAneka) {
    return `${explorer}/txs/`;
  } else if (isMintscan) {
    return `${explorer}/regen/txs/`;
  } else if (isAtomscan) {
    return `${explorer}/regen-network/transactions/`;
  }
  return '';
};

export const getHashUrl = (txHash: string | undefined | ''): string => {
  if (!txHash) return '';
  return `${getBaseTransactionUrl()}${txHash}`;
};
