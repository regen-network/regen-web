// TODO: replace with env variables
// these are the code IDs on regen-upgrade testnet
// https://github.com/DA0-DA0/dao-dao-ui/blob/development/packages/utils/constants/codeIds.json#L1777
export const daoDaoCoreCodeId = 6;
export const filterCodeId = 14;
export const protobufRegistryCodeId = 15;
export const rbamCodeId = 16;
export const proposalSingleCodeId = 13;
export const preProposeSingleCodeId = 11;
export const cw4GroupCodeId = 2;
export const daoVotingCw4CodeId = 19;

const checksumCache = new Map<number, string>();

const STATIC_CHECKSUMS: Record<number, string> = {};

export function lookupContractChecksum(codeId: number): string | undefined {
  return checksumCache.get(codeId) ?? STATIC_CHECKSUMS[codeId];
}

export function hashContractChecksum(codeId: number, checksum: string): void {
  if (!checksumCache.has(codeId)) {
    checksumCache.set(codeId, checksum);
  }
}
