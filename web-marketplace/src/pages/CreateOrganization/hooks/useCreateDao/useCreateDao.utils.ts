import { instantiate2Address } from '@cosmjs/cosmwasm-stargate';
import { fromBase64, fromHex, toBase64, toHex, toUtf8 } from '@cosmjs/encoding';
import {
  QueryCodeRequest,
  QueryCodeResponse,
} from 'cosmjs-types/cosmwasm/wasm/v1/query';
import Long from 'long';
import { nanoid } from 'nanoid';

import {
  hashContractChecksum,
  lookupContractChecksum,
} from './useCreateDao.constants';

import { chainInfo } from 'lib/wallet/chainInfo/chainInfo';

// Roles and authorizations definitions
const creditClassesAuthorization = {
  name: 'can_manage_credit_classes',
  metadata: 'Can manage credit classes from the organization account',
  filter: {
    $or: [
      {
        stargate: {
          type_url: '/regen.ecocredit.v1.MsgCreateClass',
        },
      },

      {
        stargate: {
          type_url: '/regen.ecocredit.v1.MsgUpdateClassIssuers',
        },
      },
      {
        stargate: {
          type_url: '/regen.ecocredit.v1.MsgUpdateClassAdmin',
        },
      },
      {
        stargate: {
          type_url: '/regen.ecocredit.v1.MsgUpdateClassMetadata',
        },
      },
    ],
  },
};

const createProjectAuthorization = {
  name: 'can_create_projects',
  metadata:
    'Can create projects from the organization account, projects are then managed by a dedicated DAO',
  filter: {
    $or: [
      {
        stargate: {
          type_url: '/regen.ecocredit.v1.MsgCreateProject',
        },
      },
      {
        stargate: {
          type_url: '/regen.ecocredit.v1.MsgCreateUnregisteredProject',
        },
      },
      {
        stargate: {
          type_url: '/regen.ecocredit.v1.MsgUpdateProjectEnrollment',
        },
      },
    ],
  },
};

const creditIssuanceAuthorization = {
  name: 'can_manage_credit_issuance',
  metadata: 'Can manage credit issuance',
  filter: {
    $or: [
      {
        stargate: {
          type_url: '/regen.ecocredit.v1.MsgCreateBatch',
        },
      },
      {
        stargate: {
          type_url: '/regen.ecocredit.v1.MsgCancel',
        },
      },
      {
        stargate: {
          type_url: '/regen.ecocredit.v1.MsgMintBatchCredits',
        },
      },
      {
        stargate: {
          type_url: '/regen.ecocredit.v1.MsgSealBatch',
        },
      },
      {
        stargate: {
          type_url: '/regen.ecocredit.v1.MsgUpdateBatchMetadata',
        },
      },
      {
        stargate: {
          type_url: '/regen.ecocredit.basket.v1.MsgCreate',
        },
      },
    ],
  },
};

const creditManagementAuthorization = {
  name: 'can_manage_credits',
  metadata: 'Can manage credits',
  filter: {
    $or: [
      {
        stargate: {
          type_url: '/regen.ecocredit.v1.MsgRetire',
        },
      },

      {
        stargate: {
          type_url: '/regen.ecocredit.v1.MsgSend',
        },
      },
      {
        stargate: {
          type_url: '/regen.ecocredit.basket.v1.MsgPut',
        },
      },
      {
        stargate: {
          type_url: '/regen.ecocredit.basket.v1.MsgTake',
        },
      },
    ],
  },
};

const sellOrdersAuthorization = {
  name: 'can_manage_sell_orders',
  metadata: 'Can manage sell orders',
  filter: {
    $or: [
      {
        stargate: {
          type_url: '/regen.ecocredit.marketplace.v1.MsgSell',
        },
      },
      {
        stargate: {
          type_url: '/regen.ecocredit.marketplace.v1.MsgUpdateSellOrders',
        },
      },
      {
        stargate: {
          type_url: '/regen.ecocredit.marketplace.v1.MsgCancelSellOrder',
        },
      },
    ],
  },
};

const orgEditAuthorization = (daoAddress: string) => ({
  name: 'can_edit_organization',
  metadata: 'Can edit the organization profile',
  filter: {
    $or: [
      {
        wasm: {
          execute: {
            contract_addr: daoAddress,
            msg: {
              '#base64': {
                update_config: {}, // update name, description or image_url
              },
            },
            funds: [],
          },
        },
      },
      {
        wasm: {
          execute: {
            contract_addr: daoAddress,
            msg: {
              '#base64': {
                set_item: {
                  key: {
                    $not: { $eq: 'type' },
                  },
                },
              },
            },
            funds: [],
          },
        },
      },
      {
        wasm: {
          execute: {
            contract_addr: daoAddress,
            msg: {
              '#base64': {
                remove_item: {
                  key: {
                    $not: { $eq: 'type' },
                  },
                },
              },
            },
            funds: [],
          },
        },
      },
    ],
  },
});

const orgAdminAuthorizations = (daoAddress: string) => [
  createProjectAuthorization,
  creditIssuanceAuthorization,
  creditManagementAuthorization,
  sellOrdersAuthorization,
  creditClassesAuthorization,
  orgEditAuthorization(daoAddress),
];

// Cannot be added on instantiation because it requires the cw4_group and rbam contract addresses
// which are not predictable
const ownerMembersAuthorizations = (
  cw4GroupAddress: string,
  rbamAddress: string,
) => [
  {
    name: 'can_manage_members',
    metadata: 'Can manage members of the organization',
    filter: {
      $or: [
        {
          wasm: {
            execute: {
              contract_addr: cw4GroupAddress,
              msg: {
                '#base64': {
                  update_members: {
                    // no particular filters on who can be added or removed
                  },
                },
              },
              funds: [],
            },
          },
        },
        // Only the owner can create roles and authorizations
        // so that admins cannot create roles that would allow them to remove the owner
        {
          wasm: {
            execute: {
              contract_addr: rbamAddress,
              msg: {
                '#base64': {
                  create_role: {},
                },
              },
              funds: [],
            },
          },
        },
        {
          wasm: {
            execute: {
              contract_addr: rbamAddress,
              msg: {
                '#base64': {
                  create_authorization: {},
                },
              },
              funds: [],
            },
          },
        },
        {
          wasm: {
            execute: {
              contract_addr: rbamAddress,
              msg: {
                '#base64': {
                  // in particular, useful to update can_manage_members_except_owner authorization
                  // to replace initialOwnerAddress with the new owner address in filter
                  update_authorization: {},
                },
              },
              funds: [],
            },
          },
        },
        {
          wasm: {
            execute: {
              contract_addr: rbamAddress,
              msg: {
                '#base64': {
                  assign: {},
                },
              },
              funds: [],
            },
          },
        },
        {
          wasm: {
            execute: {
              contract_addr: rbamAddress,
              msg: {
                '#base64': {
                  revoke: {},
                },
              },
              funds: [],
            },
          },
        },
      ],
    },
  },
];

const adminMembersAuthorizations = (
  initialOwnerAddress: string,
  cw4GroupAddress: string,
  rbamAddress: string,
) => [
  {
    name: 'can_manage_members_except_owner',
    metadata: 'Can manage members of the organization except the owner',
    filter: {
      $or: [
        {
          wasm: {
            execute: {
              contract_addr: cw4GroupAddress,
              msg: {
                '#base64': {
                  update_members: {
                    remove: {
                      $not: { $contains: initialOwnerAddress },
                    },
                  },
                },
              },
              funds: [],
            },
          },
        },
        {
          wasm: {
            execute: {
              contract_addr: rbamAddress,
              msg: {
                '#base64': {
                  assign: {},
                },
              },
              funds: [],
            },
          },
        },
        {
          wasm: {
            execute: {
              contract_addr: rbamAddress,
              msg: {
                '#base64': {
                  revoke: {
                    $all: {
                      addr: { $ne: initialOwnerAddress },
                    },
                  },
                },
              },
              funds: [],
            },
          },
        },
      ],
    },
  },
];

const dataAuthorization = {
  name: 'can_anchor_attest_data',
  metadata: 'Can anchor and attest data',
  filter: {
    $or: [
      {
        stargate: {
          type_url: '/regen.data.v1.MsgAnchor',
        },
      },
      {
        stargate: {
          type_url: '/regen.data.v1.MsgAttest',
        },
      },
    ],
  },
};

export const organizationRoles = (
  initialOwnerAddress: string,
  daoAddress: string,
  cw4GroupAddress: string,
  rbamAddress: string,
) => [
  {
    name: 'Owner',
    metadata: 'Owner of the organization',
    authorizations: [
      ...ownerMembersAuthorizations(cw4GroupAddress, rbamAddress),
      ...orgAdminAuthorizations(daoAddress),
    ],
    assignments: [initialOwnerAddress],
  },
  {
    name: 'Admin',
    metadata:
      'Manages user access and has full control of projects, credits, and credit classes.',
    authorizations: [
      ...adminMembersAuthorizations(
        initialOwnerAddress,
        cw4GroupAddress,
        rbamAddress,
      ),
      ...orgAdminAuthorizations(daoAddress),
    ],
  },
  {
    name: 'Editor',
    metadata:
      'Has full control of projects and credit classes, but cannot manage users or credits.',
    authorizations: [
      {
        name: 'can_update_credit_classes_metadata',
        metadata:
          'Can update credit classes metadata from the organization account',
        filter: {
          stargate: {
            type_url: '/regen.ecocredit.v1.MsgUpdateClassMetadata',
          },
        },
      },
      orgEditAuthorization(daoAddress),
    ],
  },
  {
    name: 'Viewer',
    metadata:
      'Viewer of the organization, can view all data across all projects, even when private.',
  },
];

const projectsAuthorization = {
  name: 'can_manage_projects',
  metadata: 'Can manage projects',
  filter: {
    $or: [
      {
        stargate: {
          type_url: '/regen.ecocredit.v1.MsgUpdateProjectMetadata',
        },
      },
      {
        stargate: {
          type_url: '/regen.ecocredit.v1.MsgUpdateProjectAdmin',
        },
      },
    ],
  },
};

const projectAdminAuthorizations = [
  projectsAuthorization,
  creditIssuanceAuthorization,
  creditManagementAuthorization,
  sellOrdersAuthorization,
  dataAuthorization,
];

export const projectRoles = (
  initialOwnerAddress: string,
  cw4GroupAddress: string,
  rbamAddress: string,
) => [
  {
    name: 'Owner',
    metadata: 'Owner of the project',
    authorizations: [
      ...ownerMembersAuthorizations(cw4GroupAddress, rbamAddress),
      ...projectAdminAuthorizations,
    ],
    assignments: [initialOwnerAddress],
  },
  {
    name: 'Admin',
    metadata:
      'Manages user access and can edit all project info and project credits.',
    authorizations: [
      ...adminMembersAuthorizations(
        initialOwnerAddress,
        cw4GroupAddress,
        rbamAddress,
      ),
      ...projectAdminAuthorizations,
    ],
  },
  {
    name: 'Editor',
    metadata:
      'Can edit all project page info and posts. Cannot manage users or credits.',
    authorizations: [projectsAuthorization, dataAuthorization],
  },
  {
    name: 'Author',
    metadata:
      'Can create, edit, and delete their own data posts. Cannot see private post data.',
    authorizations: [dataAuthorization],
  },
  {
    name: 'Viewer',
    metadata:
      'Viewer of the organization, can view all data across all projects, even when private.',
  },
];

/**
 * Parameters required to predict the address of a contract instantiation.
 */
type PredictAddressParams = {
  /**
   * A client capable of retrieving code details for a code ID.
   */
  client: WasmCodeClient;
  /**
   * The code ID of the contract to be instantiated.
   */
  codeId: number;
  /**
   * The address of the contract creator.
   */
  creator: string;
};

export const predictAddress = async ({
  client,
  codeId,
  creator,
}: PredictAddressParams) => {
  const salt = toUtf8(nanoid());
  const checksum = await resolveCodeChecksum(client, codeId);
  const predictedAddress = instantiate2Address(
    fromHex(checksum),
    creator,
    salt,
    chainInfo.bech32Config.bech32PrefixAccAddr,
  );

  return { salt: toBase64(salt), predictedAddress };
};

// from dao-dao-ui

export const encodeJsonToBase64 = (object: any) =>
  toBase64(toUtf8(JSON.stringify(object)));

const UNKNOWN_QUERY_PATH_REGEX = /unknown query path/i;

async function resolveCodeChecksum(
  client: WasmCodeClient,
  codeId: number,
): Promise<string> {
  const staticChecksum = lookupContractChecksum(codeId);
  if (staticChecksum) {
    return staticChecksum;
  }

  const codeDetails = await getCodeDetailsWithFallback(client, codeId);
  const checksum = codeDetails?.checksum;

  if (checksum) {
    hashContractChecksum(codeId, checksum);
    return checksum;
  }

  throw new Error(`Unable to resolve checksum for codeId ${codeId}`);
}

type CodeDetailsLike = {
  id: number;
  checksum: string;
  creator: string;
  data?: Uint8Array;
};

type WasmCodeClient = {
  getCodeDetails: (codeId: number) => Promise<CodeDetailsLike>;
  getQueryClient?: () => any;
  queryClient?: any;
};

async function getCodeDetailsWithFallback(
  client: WasmCodeClient,
  codeId: number,
): Promise<CodeDetailsLike> {
  try {
    const details = await client.getCodeDetails(codeId);
    return normalizeCodeDetails(details, codeId);
  } catch (error) {
    if (!isUnknownQueryPathError(error)) {
      throw error;
    }

    const legacyDetails = await getLegacyCodeDetails(client, codeId);
    if (!legacyDetails) {
      throw error;
    }
    return legacyDetails;
  }
}

function normalizeCodeDetails(
  details: any,
  fallbackId: number,
): CodeDetailsLike {
  if (!details) {
    return {
      id: fallbackId,
      checksum: '',
      creator: '',
    };
  }

  if ('checksum' in details || 'id' in details) {
    return {
      id: details.id ?? details.codeId ?? fallbackId,
      checksum: details.checksum ?? toHex(details.dataHash ?? new Uint8Array()),
      creator: details.creator ?? '',
      data: details.data,
    };
  }

  if ('codeInfo' in details) {
    const info = details.codeInfo;
    return {
      id: info?.codeId ?? fallbackId,
      checksum: info?.checksum ?? toHex(info?.dataHash ?? new Uint8Array()),
      creator: info?.creator ?? '',
      data: details.data,
    };
  }

  return {
    id: fallbackId,
    checksum: '',
    creator: '',
  };
}

function isUnknownQueryPathError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return UNKNOWN_QUERY_PATH_REGEX.test(error.message);
}

async function getLegacyCodeDetails(
  client: WasmCodeClient,
  codeId: number,
): Promise<CodeDetailsLike | undefined> {
  const queryClient = client.getQueryClient?.() ?? client.queryClient;

  if (!queryClient || typeof queryClient.queryAbci !== 'function') {
    return undefined;
  }

  const requestMessage = QueryCodeRequest.fromPartial({
    codeId: Long.fromNumber(codeId),
  });
  const requestBytes = QueryCodeRequest.encode(requestMessage).finish();
  const emptyRequest = new Uint8Array();
  const encoderFallbacks: Uint8Array[] = [requestBytes, emptyRequest];

  const legacyPaths = [
    (id: number) => `/cosmwasm.wasm.v1.Query/Code`,
    (id: number) => `/custom/wasm/code`,
    (id: number) => `/custom/wasm/code/${id}`,
    (id: number) => `/wasm/code`,
    (id: number) => `/wasm/code/${id}`,
    (id: number) => `/wasm/code?id=${id}`,
  ];

  for (const buildPath of legacyPaths) {
    try {
      for (const request of encoderFallbacks) {
        const response = await queryClient.queryAbci(
          buildPath(codeId),
          request,
        );

        if (!response?.value || response.value.length === 0) continue;

        const decodedProto = decodeCodeResponse(response.value, codeId);
        if (decodedProto) {
          return decodedProto;
        }

        const decodedJson = decodeJsonCodeResponse(response.value, codeId);
        if (decodedJson) {
          return decodedJson;
        }
      }
    } catch (legacyError) {
      console.warn('Legacy wasm code query failed', legacyError);
      continue;
    }
  }

  return undefined;
}

function decodeCodeResponse(
  value: Uint8Array,
  codeId: number,
): CodeDetailsLike | undefined {
  try {
    const decoded = QueryCodeResponse.decode(value);
    const info = decoded.codeInfo;
    const data = decoded.data?.length ? decoded.data : undefined;

    if (!info?.dataHash?.length) return undefined;

    return {
      id: info.codeId?.toNumber?.() ?? Number(codeId),
      checksum: toHex(info.dataHash),
      creator: info.creator || '',
      data,
    };
  } catch (err) {
    return undefined;
  }
}

function decodeJsonCodeResponse(
  value: Uint8Array,
  codeId: number,
): CodeDetailsLike | undefined {
  try {
    const decodedString = new TextDecoder().decode(value);
    if (!decodedString) return undefined;

    const parsed = JSON.parse(decodedString);
    const codeInfo =
      parsed?.code_info ||
      parsed?.CodeInfoResponse ||
      parsed?.codeInfo ||
      parsed?.code;

    if (!codeInfo) return undefined;

    const checksumBase64 =
      codeInfo.data_hash ||
      codeInfo.dataHash ||
      codeInfo.code_hash ||
      codeInfo.codeHash ||
      parsed?.data_hash ||
      parsed?.dataHash;

    if (!checksumBase64) return undefined;

    const checksumHex = toHex(fromBase64(checksumBase64));
    const dataBase64 = parsed?.data || parsed?.Data || parsed?.data_base64;
    const data = dataBase64 ? fromBase64(dataBase64) : undefined;

    return {
      id: Number(codeInfo.code_id || codeInfo.codeId || codeId),
      checksum: checksumHex,
      creator: codeInfo.creator || '',
      data,
    };
  } catch (err) {
    return undefined;
  }
}
