export const explorer = process.env.REACT_APP_BLOCK_EXPLORER;

const isMintscan = explorer?.includes('mintscan');

const isAneka = explorer?.includes('aneka');

export const getAccountUrl = (address: string): string => {
  if (isAneka) {
    return `${explorer}/accounts/${address}`;
  } else if (isMintscan) {
    return `${explorer}/regen/account/${address}`;
  }
  return '';
};

export const getHashUrl = (txHash: string): string => {
  if (isAneka) {
    return `${explorer}/txs/${txHash}`;
  } else if (isMintscan) {
    return `${explorer}/regen/txs/${txHash}`;
  }
  return '';
};
