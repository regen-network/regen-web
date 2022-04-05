export const truncate = (walletAddress: string | undefined): string => {
  if (!walletAddress) return '-';
  const stringLength = walletAddress.length;
  return `${walletAddress.substring(0, 8)}...${walletAddress.substring(
    stringLength - 6,
    stringLength,
  )}`.toLowerCase();
};
