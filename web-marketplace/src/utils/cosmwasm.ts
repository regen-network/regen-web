import { toBase64, toUtf8 } from '@cosmjs/encoding';
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx';

type StargateAction = {
  authorizationId: number;
  roleId: number;
  typeUrl: string;
  value: Uint8Array;
};
export const getStargateAction = (action: StargateAction) => ({
  authorization_id: action.authorizationId,
  role_id: action.roleId,
  msg: {
    stargate: {
      type_url: action.typeUrl,
      value: toBase64(action.value),
    },
  },
});
export const getExecuteActionsStargate = (actions: StargateAction[]) => ({
  execute_actions: {
    actions: actions.map(action => getStargateAction(action)),
  },
});

type GetMsgExecuteContractParams = {
  walletAddress: string;
  contract: string;
  executeActionsMsg: Record<string, unknown>;
};

export const getMsgExecuteContract = ({
  walletAddress,
  contract,
  executeActionsMsg,
}: GetMsgExecuteContractParams) => ({
  typeUrl: MsgExecuteContract.typeUrl,
  value: MsgExecuteContract.fromPartial({
    sender: walletAddress,
    contract: contract,
    msg: toUtf8(JSON.stringify(executeActionsMsg)),
    funds: [],
  }),
});
