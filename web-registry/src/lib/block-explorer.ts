export const explorer = process.env.REACT_APP_BLOCK_EXPLORER;

const isMintscan = explorer?.includes('mintscan');
const isAneka = explorer?.includes('aneka');

export const getAccountUrl = (address: string | undefined): string => {
  if (!address) return '';
  if (isAneka) {
    return `${explorer}/accounts/${address}`;
  } else if (isMintscan) {
    return `${explorer}/regen/account/${address}`;
  }
  return '';
};

export const getHashUrl = (txHash: string | undefined): string => {
  if (!txHash) return '';
  if (isAneka) {
    return `${explorer}/txs/${txHash}`;
  } else if (isMintscan) {
    return `${explorer}/regen/txs/${txHash}`;
  }
  return '';
};
