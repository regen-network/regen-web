import { parseCodeId } from './useCreateDao.utils';

export const daoDaoCoreCodeId = import.meta.env.NEXT_PUBLIC_DAODAO_CORE_CODE_ID;
export const filterCodeId = import.meta.env.NEXT_PUBLIC_FILTER_CODE_ID;
export const protobufRegistryCodeId = import.meta.env
  .NEXT_PUBLIC_PROTOCOLBUF_REGISTRY_CODE_ID;
export const rbamCodeId = import.meta.env.NEXT_PUBLIC_RBAM_CODE_ID;
export const proposalSingleCodeId = import.meta.env
  .NEXT_PUBLIC_PROPOSAL_SINGLE_CODE_ID;
export const preProposeSingleCodeId = import.meta.env
  .NEXT_PUBLIC_PRE_PROPOSE_SINGLE_CODE_ID;
export const cw4GroupCodeId = import.meta.env.NEXT_PUBLIC_CW4_GROUP_CODE_ID;
export const daoVotingCw4CodeId = import.meta.env
  .NEXT_PUBLIC_DAO_VOTING_CW4_CODE_ID;
export const cwAdminFactoryAddr = import.meta.env
  .NEXT_PUBLIC_CW_ADMIN_FACTORY_ADDR;

const STATIC_CHECKSUMS: Record<number, string> = {};

export function lookupContractChecksum(codeId: number): string | undefined {
  return STATIC_CHECKSUMS[codeId];
}

export const gasMultiplier = 2;

export const CODE_IDS = {
  daoCore: parseCodeId('NEXT_PUBLIC_DAODAO_CORE_CODE_ID', daoDaoCoreCodeId),
  votingCw4: parseCodeId(
    'NEXT_PUBLIC_DAO_VOTING_CW4_CODE_ID',
    daoVotingCw4CodeId,
  ),
  cw4Group: parseCodeId('NEXT_PUBLIC_CW4_GROUP_CODE_ID', cw4GroupCodeId),
  rbam: parseCodeId('NEXT_PUBLIC_RBAM_CODE_ID', rbamCodeId),
  proposalSingle: parseCodeId(
    'NEXT_PUBLIC_PROPOSAL_SINGLE_CODE_ID',
    proposalSingleCodeId,
  ),
  preProposeSingle: parseCodeId(
    'NEXT_PUBLIC_PRE_PROPOSE_SINGLE_CODE_ID',
    preProposeSingleCodeId,
  ),
  filter: parseCodeId('NEXT_PUBLIC_FILTER_CODE_ID', filterCodeId),
  protobufRegistry: parseCodeId(
    'NEXT_PUBLIC_PROTOCOLBUF_REGISTRY_CODE_ID',
    protobufRegistryCodeId,
  ),
} as const;
