import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { nanoid } from 'nanoid';
import { instantiate2Address } from '@cosmjs/cosmwasm-stargate';
import { chainInfo } from 'lib/wallet/chainInfo/chainInfo';
import { toBase64, toUtf8, fromHex } from '@cosmjs/encoding';

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

const creditsAuthorization = {
  name: 'can_manage_credits',
  metadata: 'Can manage credits',
  filter: {
    $or: [
      {
        stargate: {
          type_url: '/regen.ecocredit.v1.MsgCreateBatch',
        },
      },
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
          type_url: '/regen.ecocredit.basket.v1.MsgPut',
        },
      },
      {
        stargate: {
          type_url: '/regen.ecocredit.basket.v1.MsgTake',
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

const orgAdminAuthorizations = [
  createProjectAuthorization,
  creditsAuthorization,
  sellOrdersAuthorization,
  creditClassesAuthorization,
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

export const organizationRoles = (
  initialOwnerAddress: string,
  cw4GroupAddress: string,
  rbamAddress: string,
) => [
  {
    name: 'Owner',
    metadata: 'Owner of the organization',
    authorizations: [
      ...ownerMembersAuthorizations(cw4GroupAddress, rbamAddress),
      ...orgAdminAuthorizations,
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
      ...orgAdminAuthorizations,
    ],
  },
  {
    name: 'Editor',
    metadata:
      'Has full control of projects and credit classes, but cannot manage users or credits.',
    authorizations: [creditClassesAuthorization, createProjectAuthorization],
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
  creditsAuthorization,
  sellOrdersAuthorization,
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
    authorizations: [projectsAuthorization],
  },
  {
    name: 'Author',
    metadata:
      'Can create, edit, and delete their own data posts. Cannot see private post data.',
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
   * An instance of SigningCosmWasmClient used to interact with the blockchain.
   */
  client: SigningCosmWasmClient;
  /**
   * The code ID of the contract to be instantiated.
   */
  codeId: number;
  /**
   * The address of the CwAdminFactory contract used for instantiation.
   */
  cwAdminFactoryAddr: string;
};

export const predictAddress = async ({
  client,
  codeId,
  cwAdminFactoryAddr,
}: PredictAddressParams) => {
  const salt = nanoid();
  const codeDetails = await client.getCodeDetails(codeId);
  const predictedAddress = instantiate2Address(
    fromHex(codeDetails?.checksum),
    cwAdminFactoryAddr,
    toUtf8(salt),
    chainInfo.bech32Config.bech32PrefixAccAddr,
  );
  console.log('predictedAddress', predictedAddress);
  return { salt, predictedAddress };
};

// from dao-dao-ui

export const encodeJsonToBase64 = (object: any) =>
  toBase64(toUtf8(JSON.stringify(object)));
