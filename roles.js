const creditClassesAuthorization = {
  name: 'can_manage_credit_classes',
  metadata: 'Can manage credit classes from the organization account',
  filter: {
    $or: [
      {
        '#stargate': {
          type_url: '/regen.ecocredit.v1.MsgCreateClass',
        },
      },

      {
        '#stargate': {
          type_url: '/regen.ecocredit.v1.MsgUpdateClassIssuers',
        },
      },
      {
        '#stargate': {
          type_url: '/regen.ecocredit.v1.MsgUpdateClassAdmin',
        },
      },
      {
        '#stargate': {
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
        '#stargate': {
          type_url: '/regen.ecocredit.v1.MsgCreateProject',
        },
      },
      {
        '#stargate': {
          type_url: '/regen.ecocredit.v1.MsgCreateUnregisteredProject',
        },
      },
      {
        '#stargate': {
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
        '#stargate': {
          type_url: '/regen.ecocredit.v1.MsgCreateBatch',
        },
      },
      {
        '#stargate': {
          type_url: '/regen.ecocredit.v1.MsgRetire',
        },
      },

      {
        '#stargate': {
          type_url: '/regen.ecocredit.v1.MsgSend',
        },
      },
      {
        '#stargate': {
          type_url: '/regen.ecocredit.v1.MsgCancel',
        },
      },
      {
        '#stargate': {
          type_url: '/regen.ecocredit.v1.MsgMintBatchCredits',
        },
      },
      {
        '#stargate': {
          type_url: '/regen.ecocredit.v1.MsgSealBatch',
        },
      },
      {
        '#stargate': {
          type_url: '/regen.ecocredit.v1.MsgUpdateBatchMetadata',
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
        '#stargate': {
          type_url: '/regen.ecocredit.marketplace.v1.MsgSell',
        },
      },
      {
        '#stargate': {
          type_url: '/regen.ecocredit.marketplace.v1.MsgUpdateSellOrders',
        },
      },
      {
        '#stargate': {
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

const ownerMembersAuthorizations = [
  {
    name: 'can_manage_members',
    metadata: 'Can manage members of the organization',
    filter: {
      $or: [
        {
          wasm: {
            execute: {
              contract_addr:
                'replace with cw4_group membership contract address',
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
              contract_addr: 'replace with rbam contract address',
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
              contract_addr: 'replace with rbam contract address',
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
              contract_addr: 'replace with rbam contract address',
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
              contract_addr: 'replace with rbam contract address',
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
              contract_addr: 'replace with rbam contract address',
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

const adminMembersAuthorizations = [
  {
    name: 'can_manage_members_except_owner',
    metadata: 'Can manage members of the organization except the owner',
    filter: {
      $or: [
        {
          wasm: {
            execute: {
              contract_addr:
                'replace with cw4_group membership contract address',
              msg: {
                '#base64': {
                  update_members: {
                    remove: {
                      $not: { $contains: 'initialOwnerAddress' },
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
              contract_addr: 'replace with rbam contract address',
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
              contract_addr: 'replace with rbam contract address',
              msg: {
                '#base64': {
                  revoke: {
                    $all: {
                      addr: { $ne: 'initialOwnerAddress' },
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

const organizationRoles = [
  {
    name: 'Owner',
    metadata: 'Owner of the organization',
    authorizations: [...ownerMembersAuthorizations, ...orgAdminAuthorizations],
    assignments: ['initialOwnerAddress'],
  },
  {
    name: 'Admin',
    metadata:
      'Manages user access and has full control of projects, credits, and credit classes.',
    authorizations: [...adminMembersAuthorizations, ...orgAdminAuthorizations],
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
        '#stargate': {
          type_url: '/regen.ecocredit.v1.MsgUpdateProjectMetadata',
        },
      },
      {
        '#stargate': {
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

const projectRoles = [
  {
    name: 'Owner',
    metadata: 'Owner of the project',
    authorizations: [
      ...ownerMembersAuthorizations,
      ...projectAdminAuthorizations,
    ],
    assignments: ['initialOwnerAddress'],
  },
  {
    name: 'Admin',
    metadata:
      'Manages user access and can edit all project info and project credits.',
    authorizations: [
      ...adminMembersAuthorizations,
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
