export const daoDaoCoreCodeId = import.meta.env.VITE_DAODAO_CORE_CODE_ID;
export const filterCodeId = import.meta.env.VITE_FILTER_CODE_ID;
export const protobufRegistryCodeId = import.meta.env
  .VITE_PROTOCOLBUF_REGISTRY_CODE_ID;
export const rbamCodeId = import.meta.env.VITE_RBAM_CODE_ID;
export const proposalSingleCodeId = import.meta.env
  .VITE_PROPOSAL_SINGLE_CODE_ID;
export const preProposeSingleCodeId = import.meta.env
  .VITE_PRE_PROPOSE_SINGLE_CODE_ID;
export const cw4GroupCodeId = import.meta.env.VITE_CW4_GROUP_CODE_ID;
export const daoVotingCw4CodeId = import.meta.env.VITE_DAO_VOTING_CW4_CODE_ID;
export const cwAdminFactoryAddr = import.meta.env.VITE_CW_ADMIN_FACTORY_ADDR;

const STATIC_CHECKSUMS: Record<number, string> = {};

export function lookupContractChecksum(codeId: number): string | undefined {
  return STATIC_CHECKSUMS[codeId];
}

export const gasMultiplier = 2;
