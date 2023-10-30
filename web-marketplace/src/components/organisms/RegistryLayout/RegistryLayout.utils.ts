import { truncate } from 'web-components/lib/utils/truncate';

type GetAddressParams = {
  walletAddress?: string | null;
  email?: string | null;
};

export const getAddress = ({ walletAddress, email }: GetAddressParams) =>
  walletAddress ? truncate(walletAddress) : email;
