export const truncate = (walletAddress?: string | null): string => {
  if (!walletAddress) return '-';
  const stringLength = walletAddress.length;
  return `${walletAddress.substring(0, 8)}...${walletAddress.substring(
    stringLength - 6,
    stringLength,
  )}`.toLowerCase();
};

export const truncateHash = (txhash: string | undefined): string => {
  if (!txhash) return '-';
  return `${txhash.substring(0, 8)}...`.toLowerCase();
};
