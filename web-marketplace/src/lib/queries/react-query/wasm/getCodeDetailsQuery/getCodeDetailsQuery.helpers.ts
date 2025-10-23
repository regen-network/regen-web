import type { CodeDetails, CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

export async function getCodeDetails(context: {
  client: CosmWasmClient;
  codeId: number;
}): Promise<CodeDetails> {
  return context.client.getCodeDetails(context.codeId);
}
