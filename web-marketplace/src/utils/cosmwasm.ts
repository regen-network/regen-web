import { toBase64, toUtf8 } from '@cosmjs/encoding';
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx';

type StargateAction = {
  authorizationId: number;
  roleId: number;
  typeUrl: string;
  value: Uint8Array;
};
export const getExecuteActionsStargate = (actions: StargateAction[]) => ({
  execute_actions: {
    actions: actions.map(action => ({
      authorization_id: action.authorizationId,
      role_id: action.roleId,
      msg: {
        stargate: {
          type_url: action.typeUrl,
          value: toBase64(action.value),
        },
      },
    })),
  },
});

export type WasmExecuteAction =
  | {
      authorizationId: number;
      roleId: number;
      contract: string;
      msg: {
        update_config: {
          config: {
            name: string;
            description: string | null;
            image_url: string | null;
            automatically_add_cw20s: boolean;
            automatically_add_cw721s: boolean;
            dao_uri: string | null;
          };
        };
      };
      funds?: { denom: string; amount: string }[];
    }
  | {
      authorizationId: number;
      roleId: number;
      contract: string;
      msg: {
        set_item: {
          key: string;
          value: string;
        };
      };
      funds?: { denom: string; amount: string }[];
    }
  | {
      authorizationId: number;
      roleId: number;
      contract: string;
      msg: {
        remove_item: {
          key: string;
        };
      };
      funds?: { denom: string; amount: string }[];
    };

export const getExecuteActionsWasm = (actions: WasmExecuteAction[]) => ({
  execute_actions: {
    actions: actions.map(action => ({
      authorization_id: action.authorizationId,
      role_id: action.roleId,
      msg: {
        wasm: {
          execute: {
            contract_addr: action.contract,
            msg: toBase64(toUtf8(JSON.stringify(action.msg))),
            funds: action.funds ?? [],
          },
        },
      },
    })),
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
