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

const STATIC_CHECKSUMS: Record<number, string> = {
  [daoDaoCoreCodeId]:
    '3a1ef0d6927f6b2e9428078b80f37753d0dbeed52b21965b1b845a70d820a01f',
  [filterCodeId]:
    '92cfe9dfb0836375b43cfa379b44ad43a008ebeb47a0f60d4326d75f434fb7f7',
  [protobufRegistryCodeId]:
    '00f326b1cd888e918b063a84319251c9e81941ea3254b41e48c9a503d17b4773',
  [rbamCodeId]:
    'd9f267c1ea144b85422676f6f7e9863b4fe26c7eaaf86774eba6d14a5a699180',
  [proposalSingleCodeId]:
    '2733f79fcde3c9ed8a5447e8a0c20ae5593447592f442273be05c44cabc44fdc',
  [preProposeSingleCodeId]:
    '1d5d0e0dffb85f4cf89a2c32040152cdbcdb0057441db97c3f2aaf116d92b889',
  [cw4GroupCodeId]:
    '7f8d1a8ace04ca7560f62d3db7b1d250774d87f90af91a02e7ba544f5f3b9232',
  [daoVotingCw4CodeId]:
    'fa7ed1c9b6de0df009fa9700eaec8c9003172dd057521aa5f1be213e4b176d0f',
};

export function lookupContractChecksum(codeId: number): string | undefined {
  return checksumCache.get(codeId) ?? STATIC_CHECKSUMS[codeId];
}

export function hashContractChecksum(codeId: number, checksum: string): void {
  if (!checksumCache.has(codeId)) {
    checksumCache.set(codeId, checksum);
  }
}
