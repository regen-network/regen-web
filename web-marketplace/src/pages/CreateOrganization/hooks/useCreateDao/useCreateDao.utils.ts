/* eslint-disable lingui/no-unlocalized-strings */
import type { CodeDetails, CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { instantiate2Address } from '@cosmjs/cosmwasm-stargate';
import { fromHex, toBase64, toUtf8 } from '@cosmjs/encoding';
import type { QueryClient } from '@tanstack/react-query';
import { nanoid } from 'nanoid';

import { getFromCacheOrFetch } from 'lib/queries/react-query/utils/getFromCacheOrFetch';
import { getCodeDetailsQuery } from 'lib/queries/react-query/wasm/getCodeDetailsQuery/getCodeDetailsQuery';
import { chainInfo } from 'lib/wallet/chainInfo/chainInfo';

import { lookupContractChecksum } from './useCreateDao.constants';

export const parseCodeId = (
  envVarName: string,
  rawValue: string | undefined,
): number => {
  const parsed = Number(rawValue?.toString().trim());

  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new Error(`Invalid ${envVarName} configuration`);
  }

  return parsed;
};

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
                update_config: {},
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

const feegrantFilter = {
  stargate: {
    type_url: '/cosmos.feegrant.v1beta1.MsgGrantAllowance',
  },
};
const feegrantRevokeFilter = {
  stargate: {
    type_url: '/cosmos.feegrant.v1beta1.MsgRevokeAllowance',
  },
};

const ownerMembersAuthorizations = (
  cw4GroupAddress: string,
  rbamAddress: string,
) => [
  {
    name: 'can_manage_members',
    metadata: 'Can manage members of the organization',
    filter: {
      $or: [
        feegrantFilter,
        feegrantRevokeFilter,
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
        feegrantFilter,
        feegrantRevokeFilter,
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
                    revoke: {
                      $all: {
                        addr: { $ne: initialOwnerAddress },
                      },
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
    name: 'owner',
    metadata: 'Owner of the organization',
    authorizations: [
      ...ownerMembersAuthorizations(cw4GroupAddress, rbamAddress),
      ...orgAdminAuthorizations(daoAddress),
    ],
    assignments: [initialOwnerAddress],
  },
  {
    name: 'admin',
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
    name: 'editor',
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
    name: 'viewer',
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
    name: 'owner',
    metadata: 'Owner of the project',
    authorizations: [
      ...ownerMembersAuthorizations(cw4GroupAddress, rbamAddress),
      ...projectAdminAuthorizations,
    ],
    assignments: [initialOwnerAddress],
  },
  {
    name: 'admin',
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
    name: 'editor',
    metadata:
      'Can edit all project page info and posts. Cannot manage users or credits.',
    authorizations: [projectsAuthorization, dataAuthorization],
  },
  {
    name: 'author',
    metadata:
      'Can create, edit, and delete their own data posts. Cannot see private post data.',
    authorizations: [dataAuthorization],
  },
  {
    name: 'viewer',
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
  client: CosmWasmClient;
  /**
   * The code ID of the contract to be instantiated.
   */
  codeId: number;
  /**
   * The address of the contract creator.
   */
  creator: string;
  /**
   * React Query client used to cache checksum lookups.
   */
  queryClient: QueryClient;
  /**
   * Optional RPC endpoint identifier to scope the cache key.
   */
  rpcEndpoint?: string | null;
};

export const predictAddress = async ({
  client,
  codeId,
  creator,
  queryClient,
  rpcEndpoint,
}: PredictAddressParams) => {
  const salt = toUtf8(nanoid());
  const checksum = await resolveCodeChecksum(
    client,
    codeId,
    queryClient,
    rpcEndpoint,
  );
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

export type SanitizeDaoParamsInput = {
  name: string;
  description?: string;
  profileImage?: string;
  backgroundImage?: string;
  websiteLink?: string;
  twitterLink?: string;
  organizationId: string;
  currentAccountId: string;
  profileBasePath: string;
};

export type SanitizeDaoParamsResult = {
  sanitizedName: string;
  sanitizedDescription: string | null;
  sanitizedProfileImage: string | null;
  sanitizedBackgroundImage: string | null;
  sanitizedWebsite: string | null;
  sanitizedTwitter: string | null;
};

export const sanitizeDaoParams = ({
  name,
  description,
  profileImage,
  backgroundImage,
  websiteLink,
  twitterLink,
  organizationId,
  currentAccountId,
  profileBasePath,
}: SanitizeDaoParamsInput): SanitizeDaoParamsResult => {
  const sanitizedName = name.trim();
  const sanitizedDescription = description?.trim() || null;

  const rewriteParams = { currentAccountId, organizationId };

  const sanitizedProfileImage = rewriteMediaUrl(
    profileImage,
    rewriteParams,
    profileBasePath,
  );
  const sanitizedBackgroundImage = rewriteMediaUrl(
    backgroundImage,
    rewriteParams,
    profileBasePath,
  );

  const sanitizedWebsite = websiteLink?.trim() || null;
  const sanitizedTwitter = twitterLink?.trim() || null;

  return {
    sanitizedName,
    sanitizedDescription,
    sanitizedProfileImage,
    sanitizedBackgroundImage,
    sanitizedWebsite,
    sanitizedTwitter,
  };
};

export type PredictAllAddressesParams = {
  client: CosmWasmClient;
  queryClient: QueryClient;
  rpcEndpoint?: string | null;
  adminFactoryAddress: string;
  daoCoreCodeId: number;
  daoVotingCw4CodeId: number;
  cw4GroupCodeId: number;
  rbamCodeId: number;
};

export type PredictAllAddressesResult = {
  dao: { address: string; salt: string };
  daoVotingCw4: { address: string; salt: string };
  cw4Group: { address: string; salt: string };
  rbam: { address: string; salt: string };
};

export const predictAllAddresses = async ({
  client,
  queryClient,
  rpcEndpoint,
  adminFactoryAddress,
  daoCoreCodeId,
  daoVotingCw4CodeId,
  cw4GroupCodeId,
  rbamCodeId,
}: PredictAllAddressesParams): Promise<PredictAllAddressesResult> => {
  const dao = await predictAddress({
    client,
    codeId: daoCoreCodeId,
    creator: adminFactoryAddress,
    queryClient,
    rpcEndpoint,
  });

  const daoVotingCw4 = await predictAddress({
    client,
    codeId: daoVotingCw4CodeId,
    creator: dao.predictedAddress,
    queryClient,
    rpcEndpoint,
  });

  const cw4Group = await predictAddress({
    client,
    codeId: cw4GroupCodeId,
    creator: daoVotingCw4.predictedAddress,
    queryClient,
    rpcEndpoint,
  });

  const rbam = await predictAddress({
    client,
    codeId: rbamCodeId,
    creator: dao.predictedAddress,
    queryClient,
    rpcEndpoint,
  });

  return {
    dao: { address: dao.predictedAddress, salt: dao.salt },
    daoVotingCw4: {
      address: daoVotingCw4.predictedAddress,
      salt: daoVotingCw4.salt,
    },
    cw4Group: { address: cw4Group.predictedAddress, salt: cw4Group.salt },
    rbam: { address: rbam.predictedAddress, salt: rbam.salt },
  };
};

async function resolveCodeChecksum(
  client: CosmWasmClient,
  codeId: number,
  queryClient: QueryClient,
  rpcEndpoint?: string | null,
): Promise<string> {
  const staticChecksum = lookupContractChecksum(codeId);
  if (staticChecksum) {
    return staticChecksum;
  }

  const queryOptions = getCodeDetailsQuery({ client, codeId, rpcEndpoint });

  const codeDetails = (await getFromCacheOrFetch<CodeDetails>({
    reactQueryClient: queryClient,
    query: queryOptions,
  })) as CodeDetails | undefined;
  const checksum = codeDetails?.checksum;

  if (checksum) {
    return checksum;
  }

  throw new Error(`Unable to resolve checksum for codeId ${codeId}`);
}

export const rewriteMediaUrl = (
  value: string | undefined,
  params: { currentAccountId: string; organizationId: string },
  basePath: string,
): string | null => {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  const accountSegment = `${basePath}/${params.currentAccountId}/`;
  if (!trimmed.includes(accountSegment)) return trimmed;
  const organizationSegment = `${basePath}/${params.organizationId}/`;
  return trimmed.replace(accountSegment, organizationSegment);
};
