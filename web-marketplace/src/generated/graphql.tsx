import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A floating point number that requires more precision than IEEE 754 binary 64 */
  BigFloat: any;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: any;
};

export type Account = Node & {
  __typename?: 'Account';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  nonce: Scalars['String'];
  /** Reads and enables pagination through a set of `Party`. */
  partiesByAccountId: PartiesConnection;
};


export type AccountPartiesByAccountIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};

/** A condition to be used against `Account` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type AccountCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `nonce` field. */
  nonce?: Maybe<Scalars['String']>;
};

/** An input for mutations affecting `Account` */
export type AccountInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  nonce?: Maybe<Scalars['String']>;
};

/** Represents an update to a `Account`. Fields that are set will be updated. */
export type AccountPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  nonce?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Account` values. */
export type AccountsConnection = {
  __typename?: 'AccountsConnection';
  /** A list of `Account` objects. */
  nodes: Array<Maybe<Account>>;
  /** A list of edges which contains the `Account` and cursor to aid in pagination. */
  edges: Array<AccountsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Account` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Account` edge in the connection. */
export type AccountsEdge = {
  __typename?: 'AccountsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Account` at the end of the edge. */
  node?: Maybe<Account>;
};

/** Methods to use when ordering `Account`. */
export enum AccountsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  NonceAsc = 'NONCE_ASC',
  NonceDesc = 'NONCE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}


/** All input for the create `Account` mutation. */
export type CreateAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Account` to be created by this mutation. */
  account: AccountInput;
};

/** The output of our create `Account` mutation. */
export type CreateAccountPayload = {
  __typename?: 'CreateAccountPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Account` that was created by this mutation. */
  account?: Maybe<Account>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Account`. May be used by Relay 1. */
  accountEdge?: Maybe<AccountsEdge>;
};


/** The output of our create `Account` mutation. */
export type CreateAccountPayloadAccountEdgeArgs = {
  orderBy?: Maybe<Array<AccountsOrderBy>>;
};

/** All input for the create `CreditBatch` mutation. */
export type CreateCreditBatchInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CreditBatch` to be created by this mutation. */
  creditBatch: CreditBatchInput;
};

/** The output of our create `CreditBatch` mutation. */
export type CreateCreditBatchPayload = {
  __typename?: 'CreateCreditBatchPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CreditBatch` that was created by this mutation. */
  creditBatch?: Maybe<CreditBatch>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Project` that is related to this `CreditBatch`. */
  projectByProjectId?: Maybe<Project>;
  /** Reads a single `CreditClassVersion` that is related to this `CreditBatch`. */
  creditClassVersionByCreditClassVersionIdAndCreditClassVersionCreatedAt?: Maybe<CreditClassVersion>;
  /** An edge for our `CreditBatch`. May be used by Relay 1. */
  creditBatchEdge?: Maybe<CreditBatchesEdge>;
};


/** The output of our create `CreditBatch` mutation. */
export type CreateCreditBatchPayloadCreditBatchEdgeArgs = {
  orderBy?: Maybe<Array<CreditBatchesOrderBy>>;
};

/** All input for the create `CreditClass` mutation. */
export type CreateCreditClassInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CreditClass` to be created by this mutation. */
  creditClass: CreditClassInput;
};

/** The output of our create `CreditClass` mutation. */
export type CreateCreditClassPayload = {
  __typename?: 'CreateCreditClassPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CreditClass` that was created by this mutation. */
  creditClass?: Maybe<CreditClass>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `CreditClass`. */
  partyByRegistryId?: Maybe<Party>;
  /** An edge for our `CreditClass`. May be used by Relay 1. */
  creditClassEdge?: Maybe<CreditClassesEdge>;
};


/** The output of our create `CreditClass` mutation. */
export type CreateCreditClassPayloadCreditClassEdgeArgs = {
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
};

/** All input for the create `CreditClassVersion` mutation. */
export type CreateCreditClassVersionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CreditClassVersion` to be created by this mutation. */
  creditClassVersion: CreditClassVersionInput;
};

/** The output of our create `CreditClassVersion` mutation. */
export type CreateCreditClassVersionPayload = {
  __typename?: 'CreateCreditClassVersionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CreditClassVersion` that was created by this mutation. */
  creditClassVersion?: Maybe<CreditClassVersion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `CreditClass` that is related to this `CreditClassVersion`. */
  creditClassById?: Maybe<CreditClass>;
  /** An edge for our `CreditClassVersion`. May be used by Relay 1. */
  creditClassVersionEdge?: Maybe<CreditClassVersionsEdge>;
};


/** The output of our create `CreditClassVersion` mutation. */
export type CreateCreditClassVersionPayloadCreditClassVersionEdgeArgs = {
  orderBy?: Maybe<Array<CreditClassVersionsOrderBy>>;
};

/** All input for the create `Document` mutation. */
export type CreateDocumentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Document` to be created by this mutation. */
  document: DocumentInput;
};

/** The output of our create `Document` mutation. */
export type CreateDocumentPayload = {
  __typename?: 'CreateDocumentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Document` that was created by this mutation. */
  document?: Maybe<Document>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Project` that is related to this `Document`. */
  projectByProjectId?: Maybe<Project>;
  /** An edge for our `Document`. May be used by Relay 1. */
  documentEdge?: Maybe<DocumentsEdge>;
};


/** The output of our create `Document` mutation. */
export type CreateDocumentPayloadDocumentEdgeArgs = {
  orderBy?: Maybe<Array<DocumentsOrderBy>>;
};

/** All input for the create `MetadataGraph` mutation. */
export type CreateMetadataGraphInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MetadataGraph` to be created by this mutation. */
  metadataGraph: MetadataGraphInput;
};

/** The output of our create `MetadataGraph` mutation. */
export type CreateMetadataGraphPayload = {
  __typename?: 'CreateMetadataGraphPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MetadataGraph` that was created by this mutation. */
  metadataGraph?: Maybe<MetadataGraph>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `MetadataGraph`. May be used by Relay 1. */
  metadataGraphEdge?: Maybe<MetadataGraphsEdge>;
};


/** The output of our create `MetadataGraph` mutation. */
export type CreateMetadataGraphPayloadMetadataGraphEdgeArgs = {
  orderBy?: Maybe<Array<MetadataGraphsOrderBy>>;
};

/** All input for the create `Organization` mutation. */
export type CreateOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Organization` to be created by this mutation. */
  organization: OrganizationInput;
};

/** The output of our create `Organization` mutation. */
export type CreateOrganizationPayload = {
  __typename?: 'CreateOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Organization` that was created by this mutation. */
  organization?: Maybe<Organization>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `Organization`. */
  partyByPartyId?: Maybe<Party>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
};


/** The output of our create `Organization` mutation. */
export type CreateOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: Maybe<Array<OrganizationsOrderBy>>;
};

/** All input for the create `Party` mutation. */
export type CreatePartyInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Party` to be created by this mutation. */
  party: PartyInput;
};

/** The output of our create `Party` mutation. */
export type CreatePartyPayload = {
  __typename?: 'CreatePartyPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Party` that was created by this mutation. */
  party?: Maybe<Party>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Wallet` that is related to this `Party`. */
  walletByWalletId?: Maybe<Wallet>;
  /** Reads a single `Account` that is related to this `Party`. */
  accountByAccountId?: Maybe<Account>;
  /** An edge for our `Party`. May be used by Relay 1. */
  partyEdge?: Maybe<PartiesEdge>;
};


/** The output of our create `Party` mutation. */
export type CreatePartyPayloadPartyEdgeArgs = {
  orderBy?: Maybe<Array<PartiesOrderBy>>;
};

/** All input for the create `Project` mutation. */
export type CreateProjectInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Project` to be created by this mutation. */
  project: ProjectInput;
};

/** The output of our create `Project` mutation. */
export type CreateProjectPayload = {
  __typename?: 'CreateProjectPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Project` that was created by this mutation. */
  project?: Maybe<Project>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByDeveloperId?: Maybe<Party>;
  /** Reads a single `CreditClass` that is related to this `Project`. */
  creditClassByCreditClassId?: Maybe<CreditClass>;
  /** Reads a single `Wallet` that is related to this `Project`. */
  walletByAdminWalletId?: Maybe<Wallet>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByVerifierId?: Maybe<Party>;
  /** An edge for our `Project`. May be used by Relay 1. */
  projectEdge?: Maybe<ProjectsEdge>;
};


/** The output of our create `Project` mutation. */
export type CreateProjectPayloadProjectEdgeArgs = {
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
};

/** All input for the create `ShaclGraph` mutation. */
export type CreateShaclGraphInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ShaclGraph` to be created by this mutation. */
  shaclGraph: ShaclGraphInput;
};

/** The output of our create `ShaclGraph` mutation. */
export type CreateShaclGraphPayload = {
  __typename?: 'CreateShaclGraphPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ShaclGraph` that was created by this mutation. */
  shaclGraph?: Maybe<ShaclGraph>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `ShaclGraph`. May be used by Relay 1. */
  shaclGraphEdge?: Maybe<ShaclGraphsEdge>;
};


/** The output of our create `ShaclGraph` mutation. */
export type CreateShaclGraphPayloadShaclGraphEdgeArgs = {
  orderBy?: Maybe<Array<ShaclGraphsOrderBy>>;
};

/** All input for the create `Wallet` mutation. */
export type CreateWalletInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Wallet` to be created by this mutation. */
  wallet: WalletInput;
};

/** The output of our create `Wallet` mutation. */
export type CreateWalletPayload = {
  __typename?: 'CreateWalletPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Wallet` that was created by this mutation. */
  wallet?: Maybe<Wallet>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Wallet`. May be used by Relay 1. */
  walletEdge?: Maybe<WalletsEdge>;
};


/** The output of our create `Wallet` mutation. */
export type CreateWalletPayloadWalletEdgeArgs = {
  orderBy?: Maybe<Array<WalletsOrderBy>>;
};

export type CreditBatch = Node & {
  __typename?: 'CreditBatch';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  projectId?: Maybe<Scalars['UUID']>;
  units?: Maybe<Scalars['BigFloat']>;
  creditClassVersionId?: Maybe<Scalars['UUID']>;
  creditClassVersionCreatedAt?: Maybe<Scalars['Datetime']>;
  metadata?: Maybe<Scalars['JSON']>;
  batchDenom?: Maybe<Scalars['String']>;
  /** Reads a single `Project` that is related to this `CreditBatch`. */
  projectByProjectId?: Maybe<Project>;
  /** Reads a single `CreditClassVersion` that is related to this `CreditBatch`. */
  creditClassVersionByCreditClassVersionIdAndCreditClassVersionCreatedAt?: Maybe<CreditClassVersion>;
};

/**
 * A condition to be used against `CreditBatch` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type CreditBatchCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `units` field. */
  units?: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `creditClassVersionId` field. */
  creditClassVersionId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `creditClassVersionCreatedAt` field. */
  creditClassVersionCreatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `metadata` field. */
  metadata?: Maybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `batchDenom` field. */
  batchDenom?: Maybe<Scalars['String']>;
};

/** A filter to be used against `CreditBatch` object types. All fields are combined with a logical ‘and.’ */
export type CreditBatchFilter = {
  /** Filter by the object’s `metadata` field. */
  metadata?: Maybe<JsonFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<CreditBatchFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<CreditBatchFilter>>;
  /** Negates the expression. */
  not?: Maybe<CreditBatchFilter>;
};

/** An input for mutations affecting `CreditBatch` */
export type CreditBatchInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  projectId?: Maybe<Scalars['UUID']>;
  units?: Maybe<Scalars['BigFloat']>;
  creditClassVersionId?: Maybe<Scalars['UUID']>;
  creditClassVersionCreatedAt?: Maybe<Scalars['Datetime']>;
  metadata?: Maybe<Scalars['JSON']>;
  batchDenom?: Maybe<Scalars['String']>;
};

/** Represents an update to a `CreditBatch`. Fields that are set will be updated. */
export type CreditBatchPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  projectId?: Maybe<Scalars['UUID']>;
  units?: Maybe<Scalars['BigFloat']>;
  creditClassVersionId?: Maybe<Scalars['UUID']>;
  creditClassVersionCreatedAt?: Maybe<Scalars['Datetime']>;
  metadata?: Maybe<Scalars['JSON']>;
  batchDenom?: Maybe<Scalars['String']>;
};

/** A connection to a list of `CreditBatch` values. */
export type CreditBatchesConnection = {
  __typename?: 'CreditBatchesConnection';
  /** A list of `CreditBatch` objects. */
  nodes: Array<Maybe<CreditBatch>>;
  /** A list of edges which contains the `CreditBatch` and cursor to aid in pagination. */
  edges: Array<CreditBatchesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditBatch` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditBatch` edge in the connection. */
export type CreditBatchesEdge = {
  __typename?: 'CreditBatchesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditBatch` at the end of the edge. */
  node?: Maybe<CreditBatch>;
};

/** Methods to use when ordering `CreditBatch`. */
export enum CreditBatchesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  UnitsAsc = 'UNITS_ASC',
  UnitsDesc = 'UNITS_DESC',
  CreditClassVersionIdAsc = 'CREDIT_CLASS_VERSION_ID_ASC',
  CreditClassVersionIdDesc = 'CREDIT_CLASS_VERSION_ID_DESC',
  CreditClassVersionCreatedAtAsc = 'CREDIT_CLASS_VERSION_CREATED_AT_ASC',
  CreditClassVersionCreatedAtDesc = 'CREDIT_CLASS_VERSION_CREATED_AT_DESC',
  MetadataAsc = 'METADATA_ASC',
  MetadataDesc = 'METADATA_DESC',
  BatchDenomAsc = 'BATCH_DENOM_ASC',
  BatchDenomDesc = 'BATCH_DENOM_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type CreditClass = Node & {
  __typename?: 'CreditClass';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  uri: Scalars['String'];
  onChainId?: Maybe<Scalars['String']>;
  registryId?: Maybe<Scalars['UUID']>;
  /** Reads a single `Party` that is related to this `CreditClass`. */
  partyByRegistryId?: Maybe<Party>;
  /** Reads and enables pagination through a set of `CreditClassVersion`. */
  creditClassVersionsById: CreditClassVersionsConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreditClassId: ProjectsConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectCreditClassIdAndDeveloperId: CreditClassPartiesByProjectCreditClassIdAndDeveloperIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByProjectCreditClassIdAndAdminWalletId: CreditClassWalletsByProjectCreditClassIdAndAdminWalletIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectCreditClassIdAndVerifierId: CreditClassPartiesByProjectCreditClassIdAndVerifierIdManyToManyConnection;
};


export type CreditClassCreditClassVersionsByIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassVersionsOrderBy>>;
  condition?: Maybe<CreditClassVersionCondition>;
  filter?: Maybe<CreditClassVersionFilter>;
};


export type CreditClassProjectsByCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};


export type CreditClassPartiesByProjectCreditClassIdAndDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type CreditClassWalletsByProjectCreditClassIdAndAdminWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type CreditClassPartiesByProjectCreditClassIdAndVerifierIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};

/**
 * A condition to be used against `CreditClass` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type CreditClassCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `uri` field. */
  uri?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `onChainId` field. */
  onChainId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `registryId` field. */
  registryId?: Maybe<Scalars['UUID']>;
};

/** An input for mutations affecting `CreditClass` */
export type CreditClassInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  uri?: Maybe<Scalars['String']>;
  onChainId?: Maybe<Scalars['String']>;
  registryId?: Maybe<Scalars['UUID']>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type CreditClassPartiesByProjectCreditClassIdAndDeveloperIdManyToManyConnection = {
  __typename?: 'CreditClassPartiesByProjectCreditClassIdAndDeveloperIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<CreditClassPartiesByProjectCreditClassIdAndDeveloperIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type CreditClassPartiesByProjectCreditClassIdAndDeveloperIdManyToManyEdge = {
  __typename?: 'CreditClassPartiesByProjectCreditClassIdAndDeveloperIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByDeveloperId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type CreditClassPartiesByProjectCreditClassIdAndDeveloperIdManyToManyEdgeProjectsByDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type CreditClassPartiesByProjectCreditClassIdAndVerifierIdManyToManyConnection = {
  __typename?: 'CreditClassPartiesByProjectCreditClassIdAndVerifierIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<CreditClassPartiesByProjectCreditClassIdAndVerifierIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type CreditClassPartiesByProjectCreditClassIdAndVerifierIdManyToManyEdge = {
  __typename?: 'CreditClassPartiesByProjectCreditClassIdAndVerifierIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByVerifierId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type CreditClassPartiesByProjectCreditClassIdAndVerifierIdManyToManyEdgeProjectsByVerifierIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};

/** Represents an update to a `CreditClass`. Fields that are set will be updated. */
export type CreditClassPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  uri?: Maybe<Scalars['String']>;
  onChainId?: Maybe<Scalars['String']>;
  registryId?: Maybe<Scalars['UUID']>;
};

export type CreditClassVersion = Node & {
  __typename?: 'CreditClassVersion';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  name: Scalars['String'];
  metadata?: Maybe<Scalars['JSON']>;
  /** Reads a single `CreditClass` that is related to this `CreditClassVersion`. */
  creditClassById?: Maybe<CreditClass>;
  /** Reads and enables pagination through a set of `CreditBatch`. */
  creditBatchesByCreditClassVersionIdAndCreditClassVersionCreatedAt: CreditBatchesConnection;
};


export type CreditClassVersionCreditBatchesByCreditClassVersionIdAndCreditClassVersionCreatedAtArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditBatchesOrderBy>>;
  condition?: Maybe<CreditBatchCondition>;
  filter?: Maybe<CreditBatchFilter>;
};

/**
 * A condition to be used against `CreditClassVersion` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type CreditClassVersionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `metadata` field. */
  metadata?: Maybe<Scalars['JSON']>;
};

/** A filter to be used against `CreditClassVersion` object types. All fields are combined with a logical ‘and.’ */
export type CreditClassVersionFilter = {
  /** Filter by the object’s `metadata` field. */
  metadata?: Maybe<JsonFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<CreditClassVersionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<CreditClassVersionFilter>>;
  /** Negates the expression. */
  not?: Maybe<CreditClassVersionFilter>;
};

/** An input for mutations affecting `CreditClassVersion` */
export type CreditClassVersionInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  name: Scalars['String'];
  metadata?: Maybe<Scalars['JSON']>;
};

/** Represents an update to a `CreditClassVersion`. Fields that are set will be updated. */
export type CreditClassVersionPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  name?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
};

/** A connection to a list of `CreditClassVersion` values. */
export type CreditClassVersionsConnection = {
  __typename?: 'CreditClassVersionsConnection';
  /** A list of `CreditClassVersion` objects. */
  nodes: Array<Maybe<CreditClassVersion>>;
  /** A list of edges which contains the `CreditClassVersion` and cursor to aid in pagination. */
  edges: Array<CreditClassVersionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditClassVersion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditClassVersion` edge in the connection. */
export type CreditClassVersionsEdge = {
  __typename?: 'CreditClassVersionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditClassVersion` at the end of the edge. */
  node?: Maybe<CreditClassVersion>;
};

/** Methods to use when ordering `CreditClassVersion`. */
export enum CreditClassVersionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  MetadataAsc = 'METADATA_ASC',
  MetadataDesc = 'METADATA_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A connection to a list of `Wallet` values, with data from `Project`. */
export type CreditClassWalletsByProjectCreditClassIdAndAdminWalletIdManyToManyConnection = {
  __typename?: 'CreditClassWalletsByProjectCreditClassIdAndAdminWalletIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<CreditClassWalletsByProjectCreditClassIdAndAdminWalletIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `Project`. */
export type CreditClassWalletsByProjectCreditClassIdAndAdminWalletIdManyToManyEdge = {
  __typename?: 'CreditClassWalletsByProjectCreditClassIdAndAdminWalletIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByAdminWalletId: ProjectsConnection;
};


/** A `Wallet` edge in the connection, with data from `Project`. */
export type CreditClassWalletsByProjectCreditClassIdAndAdminWalletIdManyToManyEdgeProjectsByAdminWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};

/** A connection to a list of `CreditClass` values. */
export type CreditClassesConnection = {
  __typename?: 'CreditClassesConnection';
  /** A list of `CreditClass` objects. */
  nodes: Array<Maybe<CreditClass>>;
  /** A list of edges which contains the `CreditClass` and cursor to aid in pagination. */
  edges: Array<CreditClassesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditClass` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditClass` edge in the connection. */
export type CreditClassesEdge = {
  __typename?: 'CreditClassesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditClass` at the end of the edge. */
  node?: Maybe<CreditClass>;
};

/** Methods to use when ordering `CreditClass`. */
export enum CreditClassesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UriAsc = 'URI_ASC',
  UriDesc = 'URI_DESC',
  OnChainIdAsc = 'ON_CHAIN_ID_ASC',
  OnChainIdDesc = 'ON_CHAIN_ID_DESC',
  RegistryIdAsc = 'REGISTRY_ID_ASC',
  RegistryIdDesc = 'REGISTRY_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}



/** All input for the `deleteAccountById` mutation. */
export type DeleteAccountByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteAccount` mutation. */
export type DeleteAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Account` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Account` mutation. */
export type DeleteAccountPayload = {
  __typename?: 'DeleteAccountPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Account` that was deleted by this mutation. */
  account?: Maybe<Account>;
  deletedAccountId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Account`. May be used by Relay 1. */
  accountEdge?: Maybe<AccountsEdge>;
};


/** The output of our delete `Account` mutation. */
export type DeleteAccountPayloadAccountEdgeArgs = {
  orderBy?: Maybe<Array<AccountsOrderBy>>;
};

/** All input for the `deleteCreditBatchByBatchDenom` mutation. */
export type DeleteCreditBatchByBatchDenomInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  batchDenom: Scalars['String'];
};

/** All input for the `deleteCreditBatchById` mutation. */
export type DeleteCreditBatchByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteCreditBatch` mutation. */
export type DeleteCreditBatchInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `CreditBatch` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `CreditBatch` mutation. */
export type DeleteCreditBatchPayload = {
  __typename?: 'DeleteCreditBatchPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CreditBatch` that was deleted by this mutation. */
  creditBatch?: Maybe<CreditBatch>;
  deletedCreditBatchId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Project` that is related to this `CreditBatch`. */
  projectByProjectId?: Maybe<Project>;
  /** Reads a single `CreditClassVersion` that is related to this `CreditBatch`. */
  creditClassVersionByCreditClassVersionIdAndCreditClassVersionCreatedAt?: Maybe<CreditClassVersion>;
  /** An edge for our `CreditBatch`. May be used by Relay 1. */
  creditBatchEdge?: Maybe<CreditBatchesEdge>;
};


/** The output of our delete `CreditBatch` mutation. */
export type DeleteCreditBatchPayloadCreditBatchEdgeArgs = {
  orderBy?: Maybe<Array<CreditBatchesOrderBy>>;
};

/** All input for the `deleteCreditClassById` mutation. */
export type DeleteCreditClassByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteCreditClassByOnChainId` mutation. */
export type DeleteCreditClassByOnChainIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  onChainId: Scalars['String'];
};

/** All input for the `deleteCreditClassByUri` mutation. */
export type DeleteCreditClassByUriInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uri: Scalars['String'];
};

/** All input for the `deleteCreditClass` mutation. */
export type DeleteCreditClassInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `CreditClass` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `CreditClass` mutation. */
export type DeleteCreditClassPayload = {
  __typename?: 'DeleteCreditClassPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CreditClass` that was deleted by this mutation. */
  creditClass?: Maybe<CreditClass>;
  deletedCreditClassId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `CreditClass`. */
  partyByRegistryId?: Maybe<Party>;
  /** An edge for our `CreditClass`. May be used by Relay 1. */
  creditClassEdge?: Maybe<CreditClassesEdge>;
};


/** The output of our delete `CreditClass` mutation. */
export type DeleteCreditClassPayloadCreditClassEdgeArgs = {
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
};

/** All input for the `deleteCreditClassVersionByIdAndCreatedAt` mutation. */
export type DeleteCreditClassVersionByIdAndCreatedAtInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
};

/** All input for the `deleteCreditClassVersion` mutation. */
export type DeleteCreditClassVersionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `CreditClassVersion` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `CreditClassVersion` mutation. */
export type DeleteCreditClassVersionPayload = {
  __typename?: 'DeleteCreditClassVersionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CreditClassVersion` that was deleted by this mutation. */
  creditClassVersion?: Maybe<CreditClassVersion>;
  deletedCreditClassVersionId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `CreditClass` that is related to this `CreditClassVersion`. */
  creditClassById?: Maybe<CreditClass>;
  /** An edge for our `CreditClassVersion`. May be used by Relay 1. */
  creditClassVersionEdge?: Maybe<CreditClassVersionsEdge>;
};


/** The output of our delete `CreditClassVersion` mutation. */
export type DeleteCreditClassVersionPayloadCreditClassVersionEdgeArgs = {
  orderBy?: Maybe<Array<CreditClassVersionsOrderBy>>;
};

/** All input for the `deleteDocumentById` mutation. */
export type DeleteDocumentByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteDocument` mutation. */
export type DeleteDocumentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Document` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Document` mutation. */
export type DeleteDocumentPayload = {
  __typename?: 'DeleteDocumentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Document` that was deleted by this mutation. */
  document?: Maybe<Document>;
  deletedDocumentId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Project` that is related to this `Document`. */
  projectByProjectId?: Maybe<Project>;
  /** An edge for our `Document`. May be used by Relay 1. */
  documentEdge?: Maybe<DocumentsEdge>;
};


/** The output of our delete `Document` mutation. */
export type DeleteDocumentPayloadDocumentEdgeArgs = {
  orderBy?: Maybe<Array<DocumentsOrderBy>>;
};

/** All input for the `deleteMetadataGraphByIri` mutation. */
export type DeleteMetadataGraphByIriInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  iri: Scalars['String'];
};

/** All input for the `deleteMetadataGraph` mutation. */
export type DeleteMetadataGraphInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MetadataGraph` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `MetadataGraph` mutation. */
export type DeleteMetadataGraphPayload = {
  __typename?: 'DeleteMetadataGraphPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MetadataGraph` that was deleted by this mutation. */
  metadataGraph?: Maybe<MetadataGraph>;
  deletedMetadataGraphId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `MetadataGraph`. May be used by Relay 1. */
  metadataGraphEdge?: Maybe<MetadataGraphsEdge>;
};


/** The output of our delete `MetadataGraph` mutation. */
export type DeleteMetadataGraphPayloadMetadataGraphEdgeArgs = {
  orderBy?: Maybe<Array<MetadataGraphsOrderBy>>;
};

/** All input for the `deleteOrganizationById` mutation. */
export type DeleteOrganizationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteOrganizationByPartyId` mutation. */
export type DeleteOrganizationByPartyIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  partyId: Scalars['UUID'];
};

/** All input for the `deleteOrganization` mutation. */
export type DeleteOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Organization` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Organization` mutation. */
export type DeleteOrganizationPayload = {
  __typename?: 'DeleteOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Organization` that was deleted by this mutation. */
  organization?: Maybe<Organization>;
  deletedOrganizationId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `Organization`. */
  partyByPartyId?: Maybe<Party>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
};


/** The output of our delete `Organization` mutation. */
export type DeleteOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: Maybe<Array<OrganizationsOrderBy>>;
};

/** All input for the `deletePartyById` mutation. */
export type DeletePartyByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deletePartyByWalletId` mutation. */
export type DeletePartyByWalletIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  walletId: Scalars['UUID'];
};

/** All input for the `deleteParty` mutation. */
export type DeletePartyInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Party` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Party` mutation. */
export type DeletePartyPayload = {
  __typename?: 'DeletePartyPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Party` that was deleted by this mutation. */
  party?: Maybe<Party>;
  deletedPartyId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Wallet` that is related to this `Party`. */
  walletByWalletId?: Maybe<Wallet>;
  /** Reads a single `Account` that is related to this `Party`. */
  accountByAccountId?: Maybe<Account>;
  /** An edge for our `Party`. May be used by Relay 1. */
  partyEdge?: Maybe<PartiesEdge>;
};


/** The output of our delete `Party` mutation. */
export type DeletePartyPayloadPartyEdgeArgs = {
  orderBy?: Maybe<Array<PartiesOrderBy>>;
};

/** All input for the `deleteProjectByHandle` mutation. */
export type DeleteProjectByHandleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  handle: Scalars['String'];
};

/** All input for the `deleteProjectById` mutation. */
export type DeleteProjectByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteProjectByOnChainId` mutation. */
export type DeleteProjectByOnChainIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  onChainId: Scalars['String'];
};

/** All input for the `deleteProject` mutation. */
export type DeleteProjectInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Project` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Project` mutation. */
export type DeleteProjectPayload = {
  __typename?: 'DeleteProjectPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Project` that was deleted by this mutation. */
  project?: Maybe<Project>;
  deletedProjectId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByDeveloperId?: Maybe<Party>;
  /** Reads a single `CreditClass` that is related to this `Project`. */
  creditClassByCreditClassId?: Maybe<CreditClass>;
  /** Reads a single `Wallet` that is related to this `Project`. */
  walletByAdminWalletId?: Maybe<Wallet>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByVerifierId?: Maybe<Party>;
  /** An edge for our `Project`. May be used by Relay 1. */
  projectEdge?: Maybe<ProjectsEdge>;
};


/** The output of our delete `Project` mutation. */
export type DeleteProjectPayloadProjectEdgeArgs = {
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
};

/** All input for the `deleteShaclGraphByUri` mutation. */
export type DeleteShaclGraphByUriInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uri: Scalars['String'];
};

/** All input for the `deleteShaclGraph` mutation. */
export type DeleteShaclGraphInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ShaclGraph` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `ShaclGraph` mutation. */
export type DeleteShaclGraphPayload = {
  __typename?: 'DeleteShaclGraphPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ShaclGraph` that was deleted by this mutation. */
  shaclGraph?: Maybe<ShaclGraph>;
  deletedShaclGraphId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `ShaclGraph`. May be used by Relay 1. */
  shaclGraphEdge?: Maybe<ShaclGraphsEdge>;
};


/** The output of our delete `ShaclGraph` mutation. */
export type DeleteShaclGraphPayloadShaclGraphEdgeArgs = {
  orderBy?: Maybe<Array<ShaclGraphsOrderBy>>;
};

/** All input for the `deleteWalletByAddr` mutation. */
export type DeleteWalletByAddrInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  addr: Scalars['String'];
};

/** All input for the `deleteWalletById` mutation. */
export type DeleteWalletByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteWallet` mutation. */
export type DeleteWalletInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Wallet` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Wallet` mutation. */
export type DeleteWalletPayload = {
  __typename?: 'DeleteWalletPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Wallet` that was deleted by this mutation. */
  wallet?: Maybe<Wallet>;
  deletedWalletId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Wallet`. May be used by Relay 1. */
  walletEdge?: Maybe<WalletsEdge>;
};


/** The output of our delete `Wallet` mutation. */
export type DeleteWalletPayloadWalletEdgeArgs = {
  orderBy?: Maybe<Array<WalletsOrderBy>>;
};

export type Document = Node & {
  __typename?: 'Document';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  name: Scalars['String'];
  type: Scalars['String'];
  date: Scalars['Datetime'];
  url: Scalars['String'];
  projectId?: Maybe<Scalars['UUID']>;
  /** Reads a single `Project` that is related to this `Document`. */
  projectByProjectId?: Maybe<Project>;
};

/**
 * A condition to be used against `Document` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type DocumentCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `type` field. */
  type?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `date` field. */
  date?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `url` field. */
  url?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: Maybe<Scalars['UUID']>;
};

/** An input for mutations affecting `Document` */
export type DocumentInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  name: Scalars['String'];
  type: Scalars['String'];
  date: Scalars['Datetime'];
  url: Scalars['String'];
  projectId?: Maybe<Scalars['UUID']>;
};

/** Represents an update to a `Document`. Fields that are set will be updated. */
export type DocumentPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Datetime']>;
  url?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['UUID']>;
};

/** A connection to a list of `Document` values. */
export type DocumentsConnection = {
  __typename?: 'DocumentsConnection';
  /** A list of `Document` objects. */
  nodes: Array<Maybe<Document>>;
  /** A list of edges which contains the `Document` and cursor to aid in pagination. */
  edges: Array<DocumentsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Document` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Document` edge in the connection. */
export type DocumentsEdge = {
  __typename?: 'DocumentsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Document` at the end of the edge. */
  node?: Maybe<Document>;
};

/** Methods to use when ordering `Document`. */
export enum DocumentsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  DateAsc = 'DATE_ASC',
  DateDesc = 'DATE_DESC',
  UrlAsc = 'URL_ASC',
  UrlDesc = 'URL_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A `GetCurrentAddrsRecord` edge in the connection. */
export type GetCurrentAddrEdge = {
  __typename?: 'GetCurrentAddrEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `GetCurrentAddrsRecord` at the end of the edge. */
  node?: Maybe<GetCurrentAddrsRecord>;
};

/** A connection to a list of `GetCurrentAddrsRecord` values. */
export type GetCurrentAddrsConnection = {
  __typename?: 'GetCurrentAddrsConnection';
  /** A list of `GetCurrentAddrsRecord` objects. */
  nodes: Array<Maybe<GetCurrentAddrsRecord>>;
  /** A list of edges which contains the `GetCurrentAddrsRecord` and cursor to aid in pagination. */
  edges: Array<GetCurrentAddrEdge>;
  /** The count of *all* `GetCurrentAddrsRecord` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** The return type of our `getCurrentAddrs` query. */
export type GetCurrentAddrsRecord = {
  __typename?: 'GetCurrentAddrsRecord';
  walletId?: Maybe<Scalars['UUID']>;
  addr?: Maybe<Scalars['String']>;
  profileType?: Maybe<PartyType>;
};


/** A filter to be used against JSON fields. All fields are combined with a logical ‘and.’ */
export type JsonFilter = {
  /** Contains the specified JSON. */
  contains?: Maybe<Scalars['JSON']>;
};

export type MetadataGraph = Node & {
  __typename?: 'MetadataGraph';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  iri: Scalars['String'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  metadata: Scalars['JSON'];
};

/**
 * A condition to be used against `MetadataGraph` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type MetadataGraphCondition = {
  /** Checks for equality with the object’s `iri` field. */
  iri?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `metadata` field. */
  metadata?: Maybe<Scalars['JSON']>;
};

/** A filter to be used against `MetadataGraph` object types. All fields are combined with a logical ‘and.’ */
export type MetadataGraphFilter = {
  /** Filter by the object’s `metadata` field. */
  metadata?: Maybe<JsonFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<MetadataGraphFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<MetadataGraphFilter>>;
  /** Negates the expression. */
  not?: Maybe<MetadataGraphFilter>;
};

/** An input for mutations affecting `MetadataGraph` */
export type MetadataGraphInput = {
  iri: Scalars['String'];
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  metadata: Scalars['JSON'];
};

/** Represents an update to a `MetadataGraph`. Fields that are set will be updated. */
export type MetadataGraphPatch = {
  iri?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  metadata?: Maybe<Scalars['JSON']>;
};

/** A connection to a list of `MetadataGraph` values. */
export type MetadataGraphsConnection = {
  __typename?: 'MetadataGraphsConnection';
  /** A list of `MetadataGraph` objects. */
  nodes: Array<Maybe<MetadataGraph>>;
  /** A list of edges which contains the `MetadataGraph` and cursor to aid in pagination. */
  edges: Array<MetadataGraphsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `MetadataGraph` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `MetadataGraph` edge in the connection. */
export type MetadataGraphsEdge = {
  __typename?: 'MetadataGraphsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `MetadataGraph` at the end of the edge. */
  node?: Maybe<MetadataGraph>;
};

/** Methods to use when ordering `MetadataGraph`. */
export enum MetadataGraphsOrderBy {
  Natural = 'NATURAL',
  IriAsc = 'IRI_ASC',
  IriDesc = 'IRI_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  MetadataAsc = 'METADATA_ASC',
  MetadataDesc = 'METADATA_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `Account`. */
  createAccount?: Maybe<CreateAccountPayload>;
  /** Creates a single `CreditBatch`. */
  createCreditBatch?: Maybe<CreateCreditBatchPayload>;
  /** Creates a single `CreditClass`. */
  createCreditClass?: Maybe<CreateCreditClassPayload>;
  /** Creates a single `CreditClassVersion`. */
  createCreditClassVersion?: Maybe<CreateCreditClassVersionPayload>;
  /** Creates a single `Document`. */
  createDocument?: Maybe<CreateDocumentPayload>;
  /** Creates a single `MetadataGraph`. */
  createMetadataGraph?: Maybe<CreateMetadataGraphPayload>;
  /** Creates a single `Organization`. */
  createOrganization?: Maybe<CreateOrganizationPayload>;
  /** Creates a single `Party`. */
  createParty?: Maybe<CreatePartyPayload>;
  /** Creates a single `Project`. */
  createProject?: Maybe<CreateProjectPayload>;
  /** Creates a single `ShaclGraph`. */
  createShaclGraph?: Maybe<CreateShaclGraphPayload>;
  /** Creates a single `Wallet`. */
  createWallet?: Maybe<CreateWalletPayload>;
  /** Updates a single `Account` using its globally unique id and a patch. */
  updateAccount?: Maybe<UpdateAccountPayload>;
  /** Updates a single `Account` using a unique key and a patch. */
  updateAccountById?: Maybe<UpdateAccountPayload>;
  /** Updates a single `CreditBatch` using its globally unique id and a patch. */
  updateCreditBatch?: Maybe<UpdateCreditBatchPayload>;
  /** Updates a single `CreditBatch` using a unique key and a patch. */
  updateCreditBatchById?: Maybe<UpdateCreditBatchPayload>;
  /** Updates a single `CreditBatch` using a unique key and a patch. */
  updateCreditBatchByBatchDenom?: Maybe<UpdateCreditBatchPayload>;
  /** Updates a single `CreditClass` using its globally unique id and a patch. */
  updateCreditClass?: Maybe<UpdateCreditClassPayload>;
  /** Updates a single `CreditClass` using a unique key and a patch. */
  updateCreditClassById?: Maybe<UpdateCreditClassPayload>;
  /** Updates a single `CreditClass` using a unique key and a patch. */
  updateCreditClassByUri?: Maybe<UpdateCreditClassPayload>;
  /** Updates a single `CreditClass` using a unique key and a patch. */
  updateCreditClassByOnChainId?: Maybe<UpdateCreditClassPayload>;
  /** Updates a single `CreditClassVersion` using its globally unique id and a patch. */
  updateCreditClassVersion?: Maybe<UpdateCreditClassVersionPayload>;
  /** Updates a single `CreditClassVersion` using a unique key and a patch. */
  updateCreditClassVersionByIdAndCreatedAt?: Maybe<UpdateCreditClassVersionPayload>;
  /** Updates a single `Document` using its globally unique id and a patch. */
  updateDocument?: Maybe<UpdateDocumentPayload>;
  /** Updates a single `Document` using a unique key and a patch. */
  updateDocumentById?: Maybe<UpdateDocumentPayload>;
  /** Updates a single `MetadataGraph` using its globally unique id and a patch. */
  updateMetadataGraph?: Maybe<UpdateMetadataGraphPayload>;
  /** Updates a single `MetadataGraph` using a unique key and a patch. */
  updateMetadataGraphByIri?: Maybe<UpdateMetadataGraphPayload>;
  /** Updates a single `Organization` using its globally unique id and a patch. */
  updateOrganization?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `Organization` using a unique key and a patch. */
  updateOrganizationById?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `Organization` using a unique key and a patch. */
  updateOrganizationByPartyId?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `Party` using its globally unique id and a patch. */
  updateParty?: Maybe<UpdatePartyPayload>;
  /** Updates a single `Party` using a unique key and a patch. */
  updatePartyById?: Maybe<UpdatePartyPayload>;
  /** Updates a single `Party` using a unique key and a patch. */
  updatePartyByWalletId?: Maybe<UpdatePartyPayload>;
  /** Updates a single `Project` using its globally unique id and a patch. */
  updateProject?: Maybe<UpdateProjectPayload>;
  /** Updates a single `Project` using a unique key and a patch. */
  updateProjectById?: Maybe<UpdateProjectPayload>;
  /** Updates a single `Project` using a unique key and a patch. */
  updateProjectByHandle?: Maybe<UpdateProjectPayload>;
  /** Updates a single `Project` using a unique key and a patch. */
  updateProjectByOnChainId?: Maybe<UpdateProjectPayload>;
  /** Updates a single `ShaclGraph` using its globally unique id and a patch. */
  updateShaclGraph?: Maybe<UpdateShaclGraphPayload>;
  /** Updates a single `ShaclGraph` using a unique key and a patch. */
  updateShaclGraphByUri?: Maybe<UpdateShaclGraphPayload>;
  /** Updates a single `Wallet` using its globally unique id and a patch. */
  updateWallet?: Maybe<UpdateWalletPayload>;
  /** Updates a single `Wallet` using a unique key and a patch. */
  updateWalletById?: Maybe<UpdateWalletPayload>;
  /** Updates a single `Wallet` using a unique key and a patch. */
  updateWalletByAddr?: Maybe<UpdateWalletPayload>;
  /** Deletes a single `Account` using its globally unique id. */
  deleteAccount?: Maybe<DeleteAccountPayload>;
  /** Deletes a single `Account` using a unique key. */
  deleteAccountById?: Maybe<DeleteAccountPayload>;
  /** Deletes a single `CreditBatch` using its globally unique id. */
  deleteCreditBatch?: Maybe<DeleteCreditBatchPayload>;
  /** Deletes a single `CreditBatch` using a unique key. */
  deleteCreditBatchById?: Maybe<DeleteCreditBatchPayload>;
  /** Deletes a single `CreditBatch` using a unique key. */
  deleteCreditBatchByBatchDenom?: Maybe<DeleteCreditBatchPayload>;
  /** Deletes a single `CreditClass` using its globally unique id. */
  deleteCreditClass?: Maybe<DeleteCreditClassPayload>;
  /** Deletes a single `CreditClass` using a unique key. */
  deleteCreditClassById?: Maybe<DeleteCreditClassPayload>;
  /** Deletes a single `CreditClass` using a unique key. */
  deleteCreditClassByUri?: Maybe<DeleteCreditClassPayload>;
  /** Deletes a single `CreditClass` using a unique key. */
  deleteCreditClassByOnChainId?: Maybe<DeleteCreditClassPayload>;
  /** Deletes a single `CreditClassVersion` using its globally unique id. */
  deleteCreditClassVersion?: Maybe<DeleteCreditClassVersionPayload>;
  /** Deletes a single `CreditClassVersion` using a unique key. */
  deleteCreditClassVersionByIdAndCreatedAt?: Maybe<DeleteCreditClassVersionPayload>;
  /** Deletes a single `Document` using its globally unique id. */
  deleteDocument?: Maybe<DeleteDocumentPayload>;
  /** Deletes a single `Document` using a unique key. */
  deleteDocumentById?: Maybe<DeleteDocumentPayload>;
  /** Deletes a single `MetadataGraph` using its globally unique id. */
  deleteMetadataGraph?: Maybe<DeleteMetadataGraphPayload>;
  /** Deletes a single `MetadataGraph` using a unique key. */
  deleteMetadataGraphByIri?: Maybe<DeleteMetadataGraphPayload>;
  /** Deletes a single `Organization` using its globally unique id. */
  deleteOrganization?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `Organization` using a unique key. */
  deleteOrganizationById?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `Organization` using a unique key. */
  deleteOrganizationByPartyId?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `Party` using its globally unique id. */
  deleteParty?: Maybe<DeletePartyPayload>;
  /** Deletes a single `Party` using a unique key. */
  deletePartyById?: Maybe<DeletePartyPayload>;
  /** Deletes a single `Party` using a unique key. */
  deletePartyByWalletId?: Maybe<DeletePartyPayload>;
  /** Deletes a single `Project` using its globally unique id. */
  deleteProject?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `Project` using a unique key. */
  deleteProjectById?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `Project` using a unique key. */
  deleteProjectByHandle?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `Project` using a unique key. */
  deleteProjectByOnChainId?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `ShaclGraph` using its globally unique id. */
  deleteShaclGraph?: Maybe<DeleteShaclGraphPayload>;
  /** Deletes a single `ShaclGraph` using a unique key. */
  deleteShaclGraphByUri?: Maybe<DeleteShaclGraphPayload>;
  /** Deletes a single `Wallet` using its globally unique id. */
  deleteWallet?: Maybe<DeleteWalletPayload>;
  /** Deletes a single `Wallet` using a unique key. */
  deleteWalletById?: Maybe<DeleteWalletPayload>;
  /** Deletes a single `Wallet` using a unique key. */
  deleteWalletByAddr?: Maybe<DeleteWalletPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCreditBatchArgs = {
  input: CreateCreditBatchInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCreditClassArgs = {
  input: CreateCreditClassInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCreditClassVersionArgs = {
  input: CreateCreditClassVersionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateDocumentArgs = {
  input: CreateDocumentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMetadataGraphArgs = {
  input: CreateMetadataGraphInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePartyArgs = {
  input: CreatePartyInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateShaclGraphArgs = {
  input: CreateShaclGraphInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateWalletArgs = {
  input: CreateWalletInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountByIdArgs = {
  input: UpdateAccountByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCreditBatchArgs = {
  input: UpdateCreditBatchInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCreditBatchByIdArgs = {
  input: UpdateCreditBatchByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCreditBatchByBatchDenomArgs = {
  input: UpdateCreditBatchByBatchDenomInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCreditClassArgs = {
  input: UpdateCreditClassInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCreditClassByIdArgs = {
  input: UpdateCreditClassByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCreditClassByUriArgs = {
  input: UpdateCreditClassByUriInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCreditClassByOnChainIdArgs = {
  input: UpdateCreditClassByOnChainIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCreditClassVersionArgs = {
  input: UpdateCreditClassVersionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCreditClassVersionByIdAndCreatedAtArgs = {
  input: UpdateCreditClassVersionByIdAndCreatedAtInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDocumentArgs = {
  input: UpdateDocumentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDocumentByIdArgs = {
  input: UpdateDocumentByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMetadataGraphArgs = {
  input: UpdateMetadataGraphInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMetadataGraphByIriArgs = {
  input: UpdateMetadataGraphByIriInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationArgs = {
  input: UpdateOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationByIdArgs = {
  input: UpdateOrganizationByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationByPartyIdArgs = {
  input: UpdateOrganizationByPartyIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePartyArgs = {
  input: UpdatePartyInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePartyByIdArgs = {
  input: UpdatePartyByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePartyByWalletIdArgs = {
  input: UpdatePartyByWalletIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectByIdArgs = {
  input: UpdateProjectByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectByHandleArgs = {
  input: UpdateProjectByHandleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectByOnChainIdArgs = {
  input: UpdateProjectByOnChainIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateShaclGraphArgs = {
  input: UpdateShaclGraphInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateShaclGraphByUriArgs = {
  input: UpdateShaclGraphByUriInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWalletArgs = {
  input: UpdateWalletInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWalletByIdArgs = {
  input: UpdateWalletByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWalletByAddrArgs = {
  input: UpdateWalletByAddrInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountArgs = {
  input: DeleteAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountByIdArgs = {
  input: DeleteAccountByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCreditBatchArgs = {
  input: DeleteCreditBatchInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCreditBatchByIdArgs = {
  input: DeleteCreditBatchByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCreditBatchByBatchDenomArgs = {
  input: DeleteCreditBatchByBatchDenomInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCreditClassArgs = {
  input: DeleteCreditClassInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCreditClassByIdArgs = {
  input: DeleteCreditClassByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCreditClassByUriArgs = {
  input: DeleteCreditClassByUriInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCreditClassByOnChainIdArgs = {
  input: DeleteCreditClassByOnChainIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCreditClassVersionArgs = {
  input: DeleteCreditClassVersionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCreditClassVersionByIdAndCreatedAtArgs = {
  input: DeleteCreditClassVersionByIdAndCreatedAtInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDocumentArgs = {
  input: DeleteDocumentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDocumentByIdArgs = {
  input: DeleteDocumentByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMetadataGraphArgs = {
  input: DeleteMetadataGraphInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMetadataGraphByIriArgs = {
  input: DeleteMetadataGraphByIriInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationArgs = {
  input: DeleteOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationByIdArgs = {
  input: DeleteOrganizationByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationByPartyIdArgs = {
  input: DeleteOrganizationByPartyIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePartyArgs = {
  input: DeletePartyInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePartyByIdArgs = {
  input: DeletePartyByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePartyByWalletIdArgs = {
  input: DeletePartyByWalletIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectArgs = {
  input: DeleteProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectByIdArgs = {
  input: DeleteProjectByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectByHandleArgs = {
  input: DeleteProjectByHandleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectByOnChainIdArgs = {
  input: DeleteProjectByOnChainIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteShaclGraphArgs = {
  input: DeleteShaclGraphInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteShaclGraphByUriArgs = {
  input: DeleteShaclGraphByUriInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWalletArgs = {
  input: DeleteWalletInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWalletByIdArgs = {
  input: DeleteWalletByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWalletByAddrArgs = {
  input: DeleteWalletByAddrInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

export type Organization = Node & {
  __typename?: 'Organization';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  partyId: Scalars['UUID'];
  legalName: Scalars['String'];
  /** Reads a single `Party` that is related to this `Organization`. */
  partyByPartyId?: Maybe<Party>;
};

/**
 * A condition to be used against `Organization` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type OrganizationCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `partyId` field. */
  partyId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `legalName` field. */
  legalName?: Maybe<Scalars['String']>;
};

/** An input for mutations affecting `Organization` */
export type OrganizationInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  partyId: Scalars['UUID'];
  legalName?: Maybe<Scalars['String']>;
};

/** Represents an update to a `Organization`. Fields that are set will be updated. */
export type OrganizationPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  partyId?: Maybe<Scalars['UUID']>;
  legalName?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Organization` values. */
export type OrganizationsConnection = {
  __typename?: 'OrganizationsConnection';
  /** A list of `Organization` objects. */
  nodes: Array<Maybe<Organization>>;
  /** A list of edges which contains the `Organization` and cursor to aid in pagination. */
  edges: Array<OrganizationsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Organization` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Organization` edge in the connection. */
export type OrganizationsEdge = {
  __typename?: 'OrganizationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Organization` at the end of the edge. */
  node?: Maybe<Organization>;
};

/** Methods to use when ordering `Organization`. */
export enum OrganizationsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  PartyIdAsc = 'PARTY_ID_ASC',
  PartyIdDesc = 'PARTY_ID_DESC',
  LegalNameAsc = 'LEGAL_NAME_ASC',
  LegalNameDesc = 'LEGAL_NAME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
};

/** A connection to a list of `Party` values. */
export type PartiesConnection = {
  __typename?: 'PartiesConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party` and cursor to aid in pagination. */
  edges: Array<PartiesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection. */
export type PartiesEdge = {
  __typename?: 'PartiesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
};

/** Methods to use when ordering `Party`. */
export enum PartiesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  WalletIdAsc = 'WALLET_ID_ASC',
  WalletIdDesc = 'WALLET_ID_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  ImageAsc = 'IMAGE_ASC',
  ImageDesc = 'IMAGE_DESC',
  AccountIdAsc = 'ACCOUNT_ID_ASC',
  AccountIdDesc = 'ACCOUNT_ID_DESC',
  BgImageAsc = 'BG_IMAGE_ASC',
  BgImageDesc = 'BG_IMAGE_DESC',
  TwitterLinkAsc = 'TWITTER_LINK_ASC',
  TwitterLinkDesc = 'TWITTER_LINK_DESC',
  WebsiteLinkAsc = 'WEBSITE_LINK_ASC',
  WebsiteLinkDesc = 'WEBSITE_LINK_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Party = Node & {
  __typename?: 'Party';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  type: PartyType;
  name: Scalars['String'];
  walletId?: Maybe<Scalars['UUID']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  accountId?: Maybe<Scalars['UUID']>;
  bgImage?: Maybe<Scalars['String']>;
  twitterLink?: Maybe<Scalars['String']>;
  websiteLink?: Maybe<Scalars['String']>;
  /** Reads a single `Wallet` that is related to this `Party`. */
  walletByWalletId?: Maybe<Wallet>;
  /** Reads a single `Account` that is related to this `Party`. */
  accountByAccountId?: Maybe<Account>;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByRegistryId: CreditClassesConnection;
  /** Reads a single `Organization` that is related to this `Party`. */
  organizationByPartyId?: Maybe<Organization>;
  /**
   * Reads and enables pagination through a set of `Organization`.
   * @deprecated Please use organizationByPartyId instead
   */
  organizationsByPartyId: OrganizationsConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByDeveloperId: ProjectsConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByVerifierId: ProjectsConnection;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByProjectDeveloperIdAndCreditClassId: PartyCreditClassesByProjectDeveloperIdAndCreditClassIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByProjectDeveloperIdAndAdminWalletId: PartyWalletsByProjectDeveloperIdAndAdminWalletIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectDeveloperIdAndVerifierId: PartyPartiesByProjectDeveloperIdAndVerifierIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectVerifierIdAndDeveloperId: PartyPartiesByProjectVerifierIdAndDeveloperIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByProjectVerifierIdAndCreditClassId: PartyCreditClassesByProjectVerifierIdAndCreditClassIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByProjectVerifierIdAndAdminWalletId: PartyWalletsByProjectVerifierIdAndAdminWalletIdManyToManyConnection;
};


export type PartyCreditClassesByRegistryIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};


export type PartyOrganizationsByPartyIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<OrganizationsOrderBy>>;
  condition?: Maybe<OrganizationCondition>;
};


export type PartyProjectsByDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};


export type PartyProjectsByVerifierIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};


export type PartyCreditClassesByProjectDeveloperIdAndCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};


export type PartyWalletsByProjectDeveloperIdAndAdminWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type PartyPartiesByProjectDeveloperIdAndVerifierIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectVerifierIdAndDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyCreditClassesByProjectVerifierIdAndCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};


export type PartyWalletsByProjectVerifierIdAndAdminWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};

/** A condition to be used against `Party` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PartyCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `type` field. */
  type?: Maybe<PartyType>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `walletId` field. */
  walletId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `image` field. */
  image?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `bgImage` field. */
  bgImage?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `twitterLink` field. */
  twitterLink?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `websiteLink` field. */
  websiteLink?: Maybe<Scalars['String']>;
};

/** A connection to a list of `CreditClass` values, with data from `Project`. */
export type PartyCreditClassesByProjectDeveloperIdAndCreditClassIdManyToManyConnection = {
  __typename?: 'PartyCreditClassesByProjectDeveloperIdAndCreditClassIdManyToManyConnection';
  /** A list of `CreditClass` objects. */
  nodes: Array<Maybe<CreditClass>>;
  /** A list of edges which contains the `CreditClass`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyCreditClassesByProjectDeveloperIdAndCreditClassIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditClass` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditClass` edge in the connection, with data from `Project`. */
export type PartyCreditClassesByProjectDeveloperIdAndCreditClassIdManyToManyEdge = {
  __typename?: 'PartyCreditClassesByProjectDeveloperIdAndCreditClassIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditClass` at the end of the edge. */
  node?: Maybe<CreditClass>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreditClassId: ProjectsConnection;
};


/** A `CreditClass` edge in the connection, with data from `Project`. */
export type PartyCreditClassesByProjectDeveloperIdAndCreditClassIdManyToManyEdgeProjectsByCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};

/** A connection to a list of `CreditClass` values, with data from `Project`. */
export type PartyCreditClassesByProjectVerifierIdAndCreditClassIdManyToManyConnection = {
  __typename?: 'PartyCreditClassesByProjectVerifierIdAndCreditClassIdManyToManyConnection';
  /** A list of `CreditClass` objects. */
  nodes: Array<Maybe<CreditClass>>;
  /** A list of edges which contains the `CreditClass`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyCreditClassesByProjectVerifierIdAndCreditClassIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditClass` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditClass` edge in the connection, with data from `Project`. */
export type PartyCreditClassesByProjectVerifierIdAndCreditClassIdManyToManyEdge = {
  __typename?: 'PartyCreditClassesByProjectVerifierIdAndCreditClassIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditClass` at the end of the edge. */
  node?: Maybe<CreditClass>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreditClassId: ProjectsConnection;
};


/** A `CreditClass` edge in the connection, with data from `Project`. */
export type PartyCreditClassesByProjectVerifierIdAndCreditClassIdManyToManyEdgeProjectsByCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};

/** An input for mutations affecting `Party` */
export type PartyInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  type: PartyType;
  name?: Maybe<Scalars['String']>;
  walletId?: Maybe<Scalars['UUID']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  accountId?: Maybe<Scalars['UUID']>;
  bgImage?: Maybe<Scalars['String']>;
  twitterLink?: Maybe<Scalars['String']>;
  websiteLink?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectDeveloperIdAndVerifierIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectDeveloperIdAndVerifierIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectDeveloperIdAndVerifierIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectDeveloperIdAndVerifierIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectDeveloperIdAndVerifierIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByVerifierId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectDeveloperIdAndVerifierIdManyToManyEdgeProjectsByVerifierIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectVerifierIdAndDeveloperIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectVerifierIdAndDeveloperIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectVerifierIdAndDeveloperIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectVerifierIdAndDeveloperIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectVerifierIdAndDeveloperIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByDeveloperId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectVerifierIdAndDeveloperIdManyToManyEdgeProjectsByDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};

/** Represents an update to a `Party`. Fields that are set will be updated. */
export type PartyPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  type?: Maybe<PartyType>;
  name?: Maybe<Scalars['String']>;
  walletId?: Maybe<Scalars['UUID']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  accountId?: Maybe<Scalars['UUID']>;
  bgImage?: Maybe<Scalars['String']>;
  twitterLink?: Maybe<Scalars['String']>;
  websiteLink?: Maybe<Scalars['String']>;
};

export enum PartyType {
  User = 'USER',
  Organization = 'ORGANIZATION'
}

/** A connection to a list of `Wallet` values, with data from `Project`. */
export type PartyWalletsByProjectDeveloperIdAndAdminWalletIdManyToManyConnection = {
  __typename?: 'PartyWalletsByProjectDeveloperIdAndAdminWalletIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyWalletsByProjectDeveloperIdAndAdminWalletIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `Project`. */
export type PartyWalletsByProjectDeveloperIdAndAdminWalletIdManyToManyEdge = {
  __typename?: 'PartyWalletsByProjectDeveloperIdAndAdminWalletIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByAdminWalletId: ProjectsConnection;
};


/** A `Wallet` edge in the connection, with data from `Project`. */
export type PartyWalletsByProjectDeveloperIdAndAdminWalletIdManyToManyEdgeProjectsByAdminWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};

/** A connection to a list of `Wallet` values, with data from `Project`. */
export type PartyWalletsByProjectVerifierIdAndAdminWalletIdManyToManyConnection = {
  __typename?: 'PartyWalletsByProjectVerifierIdAndAdminWalletIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyWalletsByProjectVerifierIdAndAdminWalletIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `Project`. */
export type PartyWalletsByProjectVerifierIdAndAdminWalletIdManyToManyEdge = {
  __typename?: 'PartyWalletsByProjectVerifierIdAndAdminWalletIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByAdminWalletId: ProjectsConnection;
};


/** A `Wallet` edge in the connection, with data from `Project`. */
export type PartyWalletsByProjectVerifierIdAndAdminWalletIdManyToManyEdgeProjectsByAdminWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};

export type Project = Node & {
  __typename?: 'Project';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  developerId?: Maybe<Scalars['UUID']>;
  creditClassId?: Maybe<Scalars['UUID']>;
  metadata?: Maybe<Scalars['JSON']>;
  handle?: Maybe<Scalars['String']>;
  onChainId?: Maybe<Scalars['String']>;
  adminWalletId?: Maybe<Scalars['UUID']>;
  verifierId?: Maybe<Scalars['UUID']>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByDeveloperId?: Maybe<Party>;
  /** Reads a single `CreditClass` that is related to this `Project`. */
  creditClassByCreditClassId?: Maybe<CreditClass>;
  /** Reads a single `Wallet` that is related to this `Project`. */
  walletByAdminWalletId?: Maybe<Wallet>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByVerifierId?: Maybe<Party>;
  /** Reads and enables pagination through a set of `CreditBatch`. */
  creditBatchesByProjectId: CreditBatchesConnection;
  /** Reads and enables pagination through a set of `Document`. */
  documentsByProjectId: DocumentsConnection;
};


export type ProjectCreditBatchesByProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditBatchesOrderBy>>;
  condition?: Maybe<CreditBatchCondition>;
  filter?: Maybe<CreditBatchFilter>;
};


export type ProjectDocumentsByProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<DocumentsOrderBy>>;
  condition?: Maybe<DocumentCondition>;
};

/** A condition to be used against `Project` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ProjectCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `developerId` field. */
  developerId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `creditClassId` field. */
  creditClassId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `metadata` field. */
  metadata?: Maybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `handle` field. */
  handle?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `onChainId` field. */
  onChainId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `adminWalletId` field. */
  adminWalletId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `verifierId` field. */
  verifierId?: Maybe<Scalars['UUID']>;
};

/** A filter to be used against `Project` object types. All fields are combined with a logical ‘and.’ */
export type ProjectFilter = {
  /** Filter by the object’s `metadata` field. */
  metadata?: Maybe<JsonFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ProjectFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ProjectFilter>>;
  /** Negates the expression. */
  not?: Maybe<ProjectFilter>;
};

/** An input for mutations affecting `Project` */
export type ProjectInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  developerId?: Maybe<Scalars['UUID']>;
  creditClassId?: Maybe<Scalars['UUID']>;
  metadata?: Maybe<Scalars['JSON']>;
  handle?: Maybe<Scalars['String']>;
  onChainId?: Maybe<Scalars['String']>;
  adminWalletId?: Maybe<Scalars['UUID']>;
  verifierId?: Maybe<Scalars['UUID']>;
};

/** Represents an update to a `Project`. Fields that are set will be updated. */
export type ProjectPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  developerId?: Maybe<Scalars['UUID']>;
  creditClassId?: Maybe<Scalars['UUID']>;
  metadata?: Maybe<Scalars['JSON']>;
  handle?: Maybe<Scalars['String']>;
  onChainId?: Maybe<Scalars['String']>;
  adminWalletId?: Maybe<Scalars['UUID']>;
  verifierId?: Maybe<Scalars['UUID']>;
};

/** A connection to a list of `Project` values. */
export type ProjectsConnection = {
  __typename?: 'ProjectsConnection';
  /** A list of `Project` objects. */
  nodes: Array<Maybe<Project>>;
  /** A list of edges which contains the `Project` and cursor to aid in pagination. */
  edges: Array<ProjectsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Project` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Project` edge in the connection. */
export type ProjectsEdge = {
  __typename?: 'ProjectsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Project` at the end of the edge. */
  node?: Maybe<Project>;
};

/** Methods to use when ordering `Project`. */
export enum ProjectsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  DeveloperIdAsc = 'DEVELOPER_ID_ASC',
  DeveloperIdDesc = 'DEVELOPER_ID_DESC',
  CreditClassIdAsc = 'CREDIT_CLASS_ID_ASC',
  CreditClassIdDesc = 'CREDIT_CLASS_ID_DESC',
  MetadataAsc = 'METADATA_ASC',
  MetadataDesc = 'METADATA_DESC',
  HandleAsc = 'HANDLE_ASC',
  HandleDesc = 'HANDLE_DESC',
  OnChainIdAsc = 'ON_CHAIN_ID_ASC',
  OnChainIdDesc = 'ON_CHAIN_ID_DESC',
  AdminWalletIdAsc = 'ADMIN_WALLET_ID_ASC',
  AdminWalletIdDesc = 'ADMIN_WALLET_ID_DESC',
  VerifierIdAsc = 'VERIFIER_ID_ASC',
  VerifierIdDesc = 'VERIFIER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** Reads and enables pagination through a set of `Account`. */
  allAccounts?: Maybe<AccountsConnection>;
  /** Reads and enables pagination through a set of `CreditBatch`. */
  allCreditBatches?: Maybe<CreditBatchesConnection>;
  /** Reads and enables pagination through a set of `CreditClass`. */
  allCreditClasses?: Maybe<CreditClassesConnection>;
  /** Reads and enables pagination through a set of `CreditClassVersion`. */
  allCreditClassVersions?: Maybe<CreditClassVersionsConnection>;
  /** Reads and enables pagination through a set of `Document`. */
  allDocuments?: Maybe<DocumentsConnection>;
  /** Reads and enables pagination through a set of `MetadataGraph`. */
  allMetadataGraphs?: Maybe<MetadataGraphsConnection>;
  /** Reads and enables pagination through a set of `Organization`. */
  allOrganizations?: Maybe<OrganizationsConnection>;
  /** Reads and enables pagination through a set of `Party`. */
  allParties?: Maybe<PartiesConnection>;
  /** Reads and enables pagination through a set of `Project`. */
  allProjects?: Maybe<ProjectsConnection>;
  /** Reads and enables pagination through a set of `ShaclGraph`. */
  allShaclGraphs?: Maybe<ShaclGraphsConnection>;
  /** Reads and enables pagination through a set of `Wallet`. */
  allWallets?: Maybe<WalletsConnection>;
  accountById?: Maybe<Account>;
  creditBatchById?: Maybe<CreditBatch>;
  creditBatchByBatchDenom?: Maybe<CreditBatch>;
  creditClassById?: Maybe<CreditClass>;
  creditClassByUri?: Maybe<CreditClass>;
  creditClassByOnChainId?: Maybe<CreditClass>;
  creditClassVersionByIdAndCreatedAt?: Maybe<CreditClassVersion>;
  documentById?: Maybe<Document>;
  metadataGraphByIri?: Maybe<MetadataGraph>;
  organizationById?: Maybe<Organization>;
  organizationByPartyId?: Maybe<Organization>;
  partyById?: Maybe<Party>;
  partyByWalletId?: Maybe<Party>;
  projectById?: Maybe<Project>;
  projectByHandle?: Maybe<Project>;
  projectByOnChainId?: Maybe<Project>;
  shaclGraphByUri?: Maybe<ShaclGraph>;
  walletById?: Maybe<Wallet>;
  walletByAddr?: Maybe<Wallet>;
  getCurrentAccount?: Maybe<Scalars['UUID']>;
  getCurrentAccountId?: Maybe<Scalars['UUID']>;
  getCurrentAddrs?: Maybe<GetCurrentAddrsConnection>;
  getCurrentUser?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `Party`. */
  getPartiesByNameOrAddr?: Maybe<PartiesConnection>;
  /** Reads a single `Account` using its globally unique `ID`. */
  account?: Maybe<Account>;
  /** Reads a single `CreditBatch` using its globally unique `ID`. */
  creditBatch?: Maybe<CreditBatch>;
  /** Reads a single `CreditClass` using its globally unique `ID`. */
  creditClass?: Maybe<CreditClass>;
  /** Reads a single `CreditClassVersion` using its globally unique `ID`. */
  creditClassVersion?: Maybe<CreditClassVersion>;
  /** Reads a single `Document` using its globally unique `ID`. */
  document?: Maybe<Document>;
  /** Reads a single `MetadataGraph` using its globally unique `ID`. */
  metadataGraph?: Maybe<MetadataGraph>;
  /** Reads a single `Organization` using its globally unique `ID`. */
  organization?: Maybe<Organization>;
  /** Reads a single `Party` using its globally unique `ID`. */
  party?: Maybe<Party>;
  /** Reads a single `Project` using its globally unique `ID`. */
  project?: Maybe<Project>;
  /** Reads a single `ShaclGraph` using its globally unique `ID`. */
  shaclGraph?: Maybe<ShaclGraph>;
  /** Reads a single `Wallet` using its globally unique `ID`. */
  wallet?: Maybe<Wallet>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAllAccountsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountsOrderBy>>;
  condition?: Maybe<AccountCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllCreditBatchesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditBatchesOrderBy>>;
  condition?: Maybe<CreditBatchCondition>;
  filter?: Maybe<CreditBatchFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllCreditClassesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllCreditClassVersionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassVersionsOrderBy>>;
  condition?: Maybe<CreditClassVersionCondition>;
  filter?: Maybe<CreditClassVersionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllDocumentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<DocumentsOrderBy>>;
  condition?: Maybe<DocumentCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllMetadataGraphsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MetadataGraphsOrderBy>>;
  condition?: Maybe<MetadataGraphCondition>;
  filter?: Maybe<MetadataGraphFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllOrganizationsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<OrganizationsOrderBy>>;
  condition?: Maybe<OrganizationCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllPartiesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllProjectsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllShaclGraphsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ShaclGraphsOrderBy>>;
  condition?: Maybe<ShaclGraphCondition>;
  filter?: Maybe<ShaclGraphFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllWalletsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCreditBatchByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCreditBatchByBatchDenomArgs = {
  batchDenom: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCreditClassByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCreditClassByUriArgs = {
  uri: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCreditClassByOnChainIdArgs = {
  onChainId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCreditClassVersionByIdAndCreatedAtArgs = {
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDocumentByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMetadataGraphByIriArgs = {
  iri: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationByPartyIdArgs = {
  partyId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPartyByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPartyByWalletIdArgs = {
  walletId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectByHandleArgs = {
  handle: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectByOnChainIdArgs = {
  onChainId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryShaclGraphByUriArgs = {
  uri: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWalletByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWalletByAddrArgs = {
  addr: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGetCurrentAddrsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetPartiesByNameOrAddrArgs = {
  input?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCreditBatchArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCreditClassArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCreditClassVersionArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDocumentArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMetadataGraphArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPartyArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryShaclGraphArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWalletArgs = {
  nodeId: Scalars['ID'];
};

export type ShaclGraph = Node & {
  __typename?: 'ShaclGraph';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  uri: Scalars['String'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  graph: Scalars['JSON'];
};

/**
 * A condition to be used against `ShaclGraph` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type ShaclGraphCondition = {
  /** Checks for equality with the object’s `uri` field. */
  uri?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `graph` field. */
  graph?: Maybe<Scalars['JSON']>;
};

/** A filter to be used against `ShaclGraph` object types. All fields are combined with a logical ‘and.’ */
export type ShaclGraphFilter = {
  /** Filter by the object’s `graph` field. */
  graph?: Maybe<JsonFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ShaclGraphFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ShaclGraphFilter>>;
  /** Negates the expression. */
  not?: Maybe<ShaclGraphFilter>;
};

/** An input for mutations affecting `ShaclGraph` */
export type ShaclGraphInput = {
  uri: Scalars['String'];
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  graph: Scalars['JSON'];
};

/** Represents an update to a `ShaclGraph`. Fields that are set will be updated. */
export type ShaclGraphPatch = {
  uri?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  graph?: Maybe<Scalars['JSON']>;
};

/** A connection to a list of `ShaclGraph` values. */
export type ShaclGraphsConnection = {
  __typename?: 'ShaclGraphsConnection';
  /** A list of `ShaclGraph` objects. */
  nodes: Array<Maybe<ShaclGraph>>;
  /** A list of edges which contains the `ShaclGraph` and cursor to aid in pagination. */
  edges: Array<ShaclGraphsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ShaclGraph` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `ShaclGraph` edge in the connection. */
export type ShaclGraphsEdge = {
  __typename?: 'ShaclGraphsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ShaclGraph` at the end of the edge. */
  node?: Maybe<ShaclGraph>;
};

/** Methods to use when ordering `ShaclGraph`. */
export enum ShaclGraphsOrderBy {
  Natural = 'NATURAL',
  UriAsc = 'URI_ASC',
  UriDesc = 'URI_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  GraphAsc = 'GRAPH_ASC',
  GraphDesc = 'GRAPH_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}


/** All input for the `updateAccountById` mutation. */
export type UpdateAccountByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Account` being updated. */
  accountPatch: AccountPatch;
  id: Scalars['UUID'];
};

/** All input for the `updateAccount` mutation. */
export type UpdateAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Account` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Account` being updated. */
  accountPatch: AccountPatch;
};

/** The output of our update `Account` mutation. */
export type UpdateAccountPayload = {
  __typename?: 'UpdateAccountPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Account` that was updated by this mutation. */
  account?: Maybe<Account>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Account`. May be used by Relay 1. */
  accountEdge?: Maybe<AccountsEdge>;
};


/** The output of our update `Account` mutation. */
export type UpdateAccountPayloadAccountEdgeArgs = {
  orderBy?: Maybe<Array<AccountsOrderBy>>;
};

/** All input for the `updateCreditBatchByBatchDenom` mutation. */
export type UpdateCreditBatchByBatchDenomInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `CreditBatch` being updated. */
  creditBatchPatch: CreditBatchPatch;
  batchDenom: Scalars['String'];
};

/** All input for the `updateCreditBatchById` mutation. */
export type UpdateCreditBatchByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `CreditBatch` being updated. */
  creditBatchPatch: CreditBatchPatch;
  id: Scalars['UUID'];
};

/** All input for the `updateCreditBatch` mutation. */
export type UpdateCreditBatchInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `CreditBatch` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `CreditBatch` being updated. */
  creditBatchPatch: CreditBatchPatch;
};

/** The output of our update `CreditBatch` mutation. */
export type UpdateCreditBatchPayload = {
  __typename?: 'UpdateCreditBatchPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CreditBatch` that was updated by this mutation. */
  creditBatch?: Maybe<CreditBatch>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Project` that is related to this `CreditBatch`. */
  projectByProjectId?: Maybe<Project>;
  /** Reads a single `CreditClassVersion` that is related to this `CreditBatch`. */
  creditClassVersionByCreditClassVersionIdAndCreditClassVersionCreatedAt?: Maybe<CreditClassVersion>;
  /** An edge for our `CreditBatch`. May be used by Relay 1. */
  creditBatchEdge?: Maybe<CreditBatchesEdge>;
};


/** The output of our update `CreditBatch` mutation. */
export type UpdateCreditBatchPayloadCreditBatchEdgeArgs = {
  orderBy?: Maybe<Array<CreditBatchesOrderBy>>;
};

/** All input for the `updateCreditClassById` mutation. */
export type UpdateCreditClassByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `CreditClass` being updated. */
  creditClassPatch: CreditClassPatch;
  id: Scalars['UUID'];
};

/** All input for the `updateCreditClassByOnChainId` mutation. */
export type UpdateCreditClassByOnChainIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `CreditClass` being updated. */
  creditClassPatch: CreditClassPatch;
  onChainId: Scalars['String'];
};

/** All input for the `updateCreditClassByUri` mutation. */
export type UpdateCreditClassByUriInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `CreditClass` being updated. */
  creditClassPatch: CreditClassPatch;
  uri: Scalars['String'];
};

/** All input for the `updateCreditClass` mutation. */
export type UpdateCreditClassInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `CreditClass` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `CreditClass` being updated. */
  creditClassPatch: CreditClassPatch;
};

/** The output of our update `CreditClass` mutation. */
export type UpdateCreditClassPayload = {
  __typename?: 'UpdateCreditClassPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CreditClass` that was updated by this mutation. */
  creditClass?: Maybe<CreditClass>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `CreditClass`. */
  partyByRegistryId?: Maybe<Party>;
  /** An edge for our `CreditClass`. May be used by Relay 1. */
  creditClassEdge?: Maybe<CreditClassesEdge>;
};


/** The output of our update `CreditClass` mutation. */
export type UpdateCreditClassPayloadCreditClassEdgeArgs = {
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
};

/** All input for the `updateCreditClassVersionByIdAndCreatedAt` mutation. */
export type UpdateCreditClassVersionByIdAndCreatedAtInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `CreditClassVersion` being updated. */
  creditClassVersionPatch: CreditClassVersionPatch;
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
};

/** All input for the `updateCreditClassVersion` mutation. */
export type UpdateCreditClassVersionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `CreditClassVersion` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `CreditClassVersion` being updated. */
  creditClassVersionPatch: CreditClassVersionPatch;
};

/** The output of our update `CreditClassVersion` mutation. */
export type UpdateCreditClassVersionPayload = {
  __typename?: 'UpdateCreditClassVersionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CreditClassVersion` that was updated by this mutation. */
  creditClassVersion?: Maybe<CreditClassVersion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `CreditClass` that is related to this `CreditClassVersion`. */
  creditClassById?: Maybe<CreditClass>;
  /** An edge for our `CreditClassVersion`. May be used by Relay 1. */
  creditClassVersionEdge?: Maybe<CreditClassVersionsEdge>;
};


/** The output of our update `CreditClassVersion` mutation. */
export type UpdateCreditClassVersionPayloadCreditClassVersionEdgeArgs = {
  orderBy?: Maybe<Array<CreditClassVersionsOrderBy>>;
};

/** All input for the `updateDocumentById` mutation. */
export type UpdateDocumentByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Document` being updated. */
  documentPatch: DocumentPatch;
  id: Scalars['UUID'];
};

/** All input for the `updateDocument` mutation. */
export type UpdateDocumentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Document` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Document` being updated. */
  documentPatch: DocumentPatch;
};

/** The output of our update `Document` mutation. */
export type UpdateDocumentPayload = {
  __typename?: 'UpdateDocumentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Document` that was updated by this mutation. */
  document?: Maybe<Document>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Project` that is related to this `Document`. */
  projectByProjectId?: Maybe<Project>;
  /** An edge for our `Document`. May be used by Relay 1. */
  documentEdge?: Maybe<DocumentsEdge>;
};


/** The output of our update `Document` mutation. */
export type UpdateDocumentPayloadDocumentEdgeArgs = {
  orderBy?: Maybe<Array<DocumentsOrderBy>>;
};

/** All input for the `updateMetadataGraphByIri` mutation. */
export type UpdateMetadataGraphByIriInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `MetadataGraph` being updated. */
  metadataGraphPatch: MetadataGraphPatch;
  iri: Scalars['String'];
};

/** All input for the `updateMetadataGraph` mutation. */
export type UpdateMetadataGraphInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MetadataGraph` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `MetadataGraph` being updated. */
  metadataGraphPatch: MetadataGraphPatch;
};

/** The output of our update `MetadataGraph` mutation. */
export type UpdateMetadataGraphPayload = {
  __typename?: 'UpdateMetadataGraphPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MetadataGraph` that was updated by this mutation. */
  metadataGraph?: Maybe<MetadataGraph>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `MetadataGraph`. May be used by Relay 1. */
  metadataGraphEdge?: Maybe<MetadataGraphsEdge>;
};


/** The output of our update `MetadataGraph` mutation. */
export type UpdateMetadataGraphPayloadMetadataGraphEdgeArgs = {
  orderBy?: Maybe<Array<MetadataGraphsOrderBy>>;
};

/** All input for the `updateOrganizationById` mutation. */
export type UpdateOrganizationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Organization` being updated. */
  organizationPatch: OrganizationPatch;
  id: Scalars['UUID'];
};

/** All input for the `updateOrganizationByPartyId` mutation. */
export type UpdateOrganizationByPartyIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Organization` being updated. */
  organizationPatch: OrganizationPatch;
  partyId: Scalars['UUID'];
};

/** All input for the `updateOrganization` mutation. */
export type UpdateOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Organization` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Organization` being updated. */
  organizationPatch: OrganizationPatch;
};

/** The output of our update `Organization` mutation. */
export type UpdateOrganizationPayload = {
  __typename?: 'UpdateOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Organization` that was updated by this mutation. */
  organization?: Maybe<Organization>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `Organization`. */
  partyByPartyId?: Maybe<Party>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
};


/** The output of our update `Organization` mutation. */
export type UpdateOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: Maybe<Array<OrganizationsOrderBy>>;
};

/** All input for the `updatePartyById` mutation. */
export type UpdatePartyByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Party` being updated. */
  partyPatch: PartyPatch;
  id: Scalars['UUID'];
};

/** All input for the `updatePartyByWalletId` mutation. */
export type UpdatePartyByWalletIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Party` being updated. */
  partyPatch: PartyPatch;
  walletId: Scalars['UUID'];
};

/** All input for the `updateParty` mutation. */
export type UpdatePartyInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Party` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Party` being updated. */
  partyPatch: PartyPatch;
};

/** The output of our update `Party` mutation. */
export type UpdatePartyPayload = {
  __typename?: 'UpdatePartyPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Party` that was updated by this mutation. */
  party?: Maybe<Party>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Wallet` that is related to this `Party`. */
  walletByWalletId?: Maybe<Wallet>;
  /** Reads a single `Account` that is related to this `Party`. */
  accountByAccountId?: Maybe<Account>;
  /** An edge for our `Party`. May be used by Relay 1. */
  partyEdge?: Maybe<PartiesEdge>;
};


/** The output of our update `Party` mutation. */
export type UpdatePartyPayloadPartyEdgeArgs = {
  orderBy?: Maybe<Array<PartiesOrderBy>>;
};

/** All input for the `updateProjectByHandle` mutation. */
export type UpdateProjectByHandleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Project` being updated. */
  projectPatch: ProjectPatch;
  handle: Scalars['String'];
};

/** All input for the `updateProjectById` mutation. */
export type UpdateProjectByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Project` being updated. */
  projectPatch: ProjectPatch;
  id: Scalars['UUID'];
};

/** All input for the `updateProjectByOnChainId` mutation. */
export type UpdateProjectByOnChainIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Project` being updated. */
  projectPatch: ProjectPatch;
  onChainId: Scalars['String'];
};

/** All input for the `updateProject` mutation. */
export type UpdateProjectInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Project` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Project` being updated. */
  projectPatch: ProjectPatch;
};

/** The output of our update `Project` mutation. */
export type UpdateProjectPayload = {
  __typename?: 'UpdateProjectPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Project` that was updated by this mutation. */
  project?: Maybe<Project>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByDeveloperId?: Maybe<Party>;
  /** Reads a single `CreditClass` that is related to this `Project`. */
  creditClassByCreditClassId?: Maybe<CreditClass>;
  /** Reads a single `Wallet` that is related to this `Project`. */
  walletByAdminWalletId?: Maybe<Wallet>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByVerifierId?: Maybe<Party>;
  /** An edge for our `Project`. May be used by Relay 1. */
  projectEdge?: Maybe<ProjectsEdge>;
};


/** The output of our update `Project` mutation. */
export type UpdateProjectPayloadProjectEdgeArgs = {
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
};

/** All input for the `updateShaclGraphByUri` mutation. */
export type UpdateShaclGraphByUriInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `ShaclGraph` being updated. */
  shaclGraphPatch: ShaclGraphPatch;
  uri: Scalars['String'];
};

/** All input for the `updateShaclGraph` mutation. */
export type UpdateShaclGraphInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ShaclGraph` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `ShaclGraph` being updated. */
  shaclGraphPatch: ShaclGraphPatch;
};

/** The output of our update `ShaclGraph` mutation. */
export type UpdateShaclGraphPayload = {
  __typename?: 'UpdateShaclGraphPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ShaclGraph` that was updated by this mutation. */
  shaclGraph?: Maybe<ShaclGraph>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `ShaclGraph`. May be used by Relay 1. */
  shaclGraphEdge?: Maybe<ShaclGraphsEdge>;
};


/** The output of our update `ShaclGraph` mutation. */
export type UpdateShaclGraphPayloadShaclGraphEdgeArgs = {
  orderBy?: Maybe<Array<ShaclGraphsOrderBy>>;
};

/** All input for the `updateWalletByAddr` mutation. */
export type UpdateWalletByAddrInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Wallet` being updated. */
  walletPatch: WalletPatch;
  addr: Scalars['String'];
};

/** All input for the `updateWalletById` mutation. */
export type UpdateWalletByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Wallet` being updated. */
  walletPatch: WalletPatch;
  id: Scalars['UUID'];
};

/** All input for the `updateWallet` mutation. */
export type UpdateWalletInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Wallet` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Wallet` being updated. */
  walletPatch: WalletPatch;
};

/** The output of our update `Wallet` mutation. */
export type UpdateWalletPayload = {
  __typename?: 'UpdateWalletPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Wallet` that was updated by this mutation. */
  wallet?: Maybe<Wallet>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Wallet`. May be used by Relay 1. */
  walletEdge?: Maybe<WalletsEdge>;
};


/** The output of our update `Wallet` mutation. */
export type UpdateWalletPayloadWalletEdgeArgs = {
  orderBy?: Maybe<Array<WalletsOrderBy>>;
};

export type Wallet = Node & {
  __typename?: 'Wallet';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  addr: Scalars['String'];
  /** Reads a single `Party` that is related to this `Wallet`. */
  partyByWalletId?: Maybe<Party>;
  /**
   * Reads and enables pagination through a set of `Party`.
   * @deprecated Please use partyByWalletId instead
   */
  partiesByWalletId: PartiesConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByAdminWalletId: ProjectsConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectAdminWalletIdAndDeveloperId: WalletPartiesByProjectAdminWalletIdAndDeveloperIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByProjectAdminWalletIdAndCreditClassId: WalletCreditClassesByProjectAdminWalletIdAndCreditClassIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectAdminWalletIdAndVerifierId: WalletPartiesByProjectAdminWalletIdAndVerifierIdManyToManyConnection;
};


export type WalletPartiesByWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type WalletProjectsByAdminWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};


export type WalletPartiesByProjectAdminWalletIdAndDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type WalletCreditClassesByProjectAdminWalletIdAndCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};


export type WalletPartiesByProjectAdminWalletIdAndVerifierIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};

/** A condition to be used against `Wallet` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type WalletCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `addr` field. */
  addr?: Maybe<Scalars['String']>;
};

/** A connection to a list of `CreditClass` values, with data from `Project`. */
export type WalletCreditClassesByProjectAdminWalletIdAndCreditClassIdManyToManyConnection = {
  __typename?: 'WalletCreditClassesByProjectAdminWalletIdAndCreditClassIdManyToManyConnection';
  /** A list of `CreditClass` objects. */
  nodes: Array<Maybe<CreditClass>>;
  /** A list of edges which contains the `CreditClass`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<WalletCreditClassesByProjectAdminWalletIdAndCreditClassIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditClass` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditClass` edge in the connection, with data from `Project`. */
export type WalletCreditClassesByProjectAdminWalletIdAndCreditClassIdManyToManyEdge = {
  __typename?: 'WalletCreditClassesByProjectAdminWalletIdAndCreditClassIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditClass` at the end of the edge. */
  node?: Maybe<CreditClass>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreditClassId: ProjectsConnection;
};


/** A `CreditClass` edge in the connection, with data from `Project`. */
export type WalletCreditClassesByProjectAdminWalletIdAndCreditClassIdManyToManyEdgeProjectsByCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};

/** An input for mutations affecting `Wallet` */
export type WalletInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  addr: Scalars['String'];
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type WalletPartiesByProjectAdminWalletIdAndDeveloperIdManyToManyConnection = {
  __typename?: 'WalletPartiesByProjectAdminWalletIdAndDeveloperIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<WalletPartiesByProjectAdminWalletIdAndDeveloperIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type WalletPartiesByProjectAdminWalletIdAndDeveloperIdManyToManyEdge = {
  __typename?: 'WalletPartiesByProjectAdminWalletIdAndDeveloperIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByDeveloperId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type WalletPartiesByProjectAdminWalletIdAndDeveloperIdManyToManyEdgeProjectsByDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type WalletPartiesByProjectAdminWalletIdAndVerifierIdManyToManyConnection = {
  __typename?: 'WalletPartiesByProjectAdminWalletIdAndVerifierIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<WalletPartiesByProjectAdminWalletIdAndVerifierIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type WalletPartiesByProjectAdminWalletIdAndVerifierIdManyToManyEdge = {
  __typename?: 'WalletPartiesByProjectAdminWalletIdAndVerifierIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByVerifierId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type WalletPartiesByProjectAdminWalletIdAndVerifierIdManyToManyEdgeProjectsByVerifierIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};

/** Represents an update to a `Wallet`. Fields that are set will be updated. */
export type WalletPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  addr?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Wallet` values. */
export type WalletsConnection = {
  __typename?: 'WalletsConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet` and cursor to aid in pagination. */
  edges: Array<WalletsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection. */
export type WalletsEdge = {
  __typename?: 'WalletsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
};

/** Methods to use when ordering `Wallet`. */
export enum WalletsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  AddrAsc = 'ADDR_ASC',
  AddrDesc = 'ADDR_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type PartiesByAccountIdQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type PartiesByAccountIdQuery = (
  { __typename?: 'Query' }
  & { accountById?: Maybe<(
    { __typename?: 'Account' }
    & { partiesByAccountId: (
      { __typename?: 'PartiesConnection' }
      & { nodes: Array<Maybe<(
        { __typename?: 'Party' }
        & PartyWithAccountFieldsFragment
      )>> }
    ) }
  )> }
);

export type PartyWithAccountFieldsFragment = (
  { __typename?: 'Party' }
  & Pick<Party, 'id' | 'accountId' | 'name' | 'type' | 'image' | 'description'>
  & { walletByWalletId?: Maybe<(
    { __typename?: 'Wallet' }
    & Pick<Wallet, 'addr'>
  )> }
);

export type AllCreditClassesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCreditClassesQuery = (
  { __typename?: 'Query' }
  & { allCreditClasses?: Maybe<(
    { __typename?: 'CreditClassesConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'CreditClass' }
      & Pick<CreditClass, 'id' | 'uri' | 'onChainId'>
      & { creditClassVersionsById: (
        { __typename?: 'CreditClassVersionsConnection' }
        & { nodes: Array<Maybe<(
          { __typename?: 'CreditClassVersion' }
          & Pick<CreditClassVersion, 'name'>
        )>> }
      ) }
    )>> }
  )> }
);

export type AllPartiesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPartiesQuery = (
  { __typename?: 'Query' }
  & { allParties?: Maybe<(
    { __typename?: 'PartiesConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'Party' }
      & Pick<Party, 'id' | 'type' | 'name' | 'walletId'>
    )>> }
  )> }
);

export type AllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProjectsQuery = (
  { __typename?: 'Query' }
  & { allProjects?: Maybe<(
    { __typename?: 'ProjectsConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'handle' | 'metadata'>
      & { creditClassByCreditClassId?: Maybe<(
        { __typename?: 'CreditClass' }
        & Pick<CreditClass, 'id' | 'onChainId'>
        & { creditClassVersionsById: (
          { __typename?: 'CreditClassVersionsConnection' }
          & { nodes: Array<Maybe<(
            { __typename?: 'CreditClassVersion' }
            & Pick<CreditClassVersion, 'id' | 'createdAt' | 'name' | 'metadata'>
          )>> }
        ) }
      )> }
    )>> }
  )> }
);

export type CreatePartyMutationVariables = Exact<{
  input: CreatePartyInput;
}>;


export type CreatePartyMutation = (
  { __typename?: 'Mutation' }
  & { createParty?: Maybe<(
    { __typename?: 'CreatePartyPayload' }
    & { party?: Maybe<(
      { __typename?: 'Party' }
      & Pick<Party, 'id'>
    )> }
  )> }
);

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject?: Maybe<(
    { __typename?: 'CreateProjectPayload' }
    & { project?: Maybe<(
      { __typename?: 'Project' }
      & Pick<Project, 'id'>
    )> }
  )> }
);

export type CreateWalletMutationVariables = Exact<{
  input: CreateWalletInput;
}>;


export type CreateWalletMutation = (
  { __typename?: 'Mutation' }
  & { createWallet?: Maybe<(
    { __typename?: 'CreateWalletPayload' }
    & { wallet?: Maybe<(
      { __typename?: 'Wallet' }
      & Pick<Wallet, 'id' | 'addr'>
    )> }
  )> }
);

export type CreditClassByOnChainIdQueryVariables = Exact<{
  onChainId: Scalars['String'];
}>;


export type CreditClassByOnChainIdQuery = (
  { __typename?: 'Query' }
  & { creditClassByOnChainId?: Maybe<(
    { __typename?: 'CreditClass' }
    & Pick<CreditClass, 'id' | 'uri'>
    & { projectsByCreditClassId: (
      { __typename?: 'ProjectsConnection' }
      & { nodes: Array<Maybe<(
        { __typename?: 'Project' }
        & MoreProjectFieldsFragment
      )>> }
    ), creditClassVersionsById: (
      { __typename?: 'CreditClassVersionsConnection' }
      & { nodes: Array<Maybe<(
        { __typename?: 'CreditClassVersion' }
        & Pick<CreditClassVersion, 'name' | 'metadata'>
      )>> }
    ), partyByRegistryId?: Maybe<(
      { __typename?: 'Party' }
      & PartyFieldsFragment
    )> }
  )> }
);

export type CreditClassByUriQueryVariables = Exact<{
  uri: Scalars['String'];
}>;


export type CreditClassByUriQuery = (
  { __typename?: 'Query' }
  & { creditClassByUri?: Maybe<(
    { __typename?: 'CreditClass' }
    & { creditClassVersionsById: (
      { __typename?: 'CreditClassVersionsConnection' }
      & { nodes: Array<Maybe<(
        { __typename?: 'CreditClassVersion' }
        & Pick<CreditClassVersion, 'name' | 'metadata'>
      )>> }
    ) }
  )> }
);

export type GetCurrentAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentAccountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getCurrentAccount'>
);

export type GetPartiesByNameOrAddrQueryVariables = Exact<{
  input?: Maybe<Scalars['String']>;
}>;


export type GetPartiesByNameOrAddrQuery = (
  { __typename?: 'Query' }
  & { getPartiesByNameOrAddr?: Maybe<(
    { __typename?: 'PartiesConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'Party' }
      & PartyWithAccountFieldsFragment
    )>> }
  )> }
);

export type WalletByAddrQueryVariables = Exact<{
  addr: Scalars['String'];
}>;


export type WalletByAddrQuery = (
  { __typename?: 'Query' }
  & { walletByAddr?: Maybe<(
    { __typename?: 'Wallet' }
    & Pick<Wallet, 'id' | 'addr'>
    & { partyByWalletId?: Maybe<(
      { __typename?: 'Party' }
      & Pick<Party, 'accountId'>
    )>, projectsByAdminWalletId: (
      { __typename?: 'ProjectsConnection' }
      & { nodes: Array<Maybe<(
        { __typename?: 'Project' }
        & ProjectFieldsFragment
      )>> }
    ) }
  )> }
);

export type MoreProjectFieldsFragment = (
  { __typename?: 'Project' }
  & Pick<Project, 'handle' | 'onChainId' | 'metadata'>
  & { creditClassByCreditClassId?: Maybe<(
    { __typename?: 'CreditClass' }
    & Pick<CreditClass, 'uri'>
  )>, partyByDeveloperId?: Maybe<(
    { __typename?: 'Party' }
    & Pick<Party, 'name' | 'image' | 'type'>
  )> }
);

export type MoreProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type MoreProjectsQuery = (
  { __typename?: 'Query' }
  & { allProjects?: Maybe<(
    { __typename?: 'ProjectsConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'Project' }
      & MoreProjectFieldsFragment
    )>> }
  )> }
);

export type PartyByAddrQueryVariables = Exact<{
  addr: Scalars['String'];
}>;


export type PartyByAddrQuery = (
  { __typename?: 'Query' }
  & { walletByAddr?: Maybe<(
    { __typename?: 'Wallet' }
    & Pick<Wallet, 'id'>
    & { partyByWalletId?: Maybe<(
      { __typename?: 'Party' }
      & Pick<Party, 'id' | 'name' | 'type' | 'image' | 'bgImage' | 'description' | 'accountId' | 'websiteLink' | 'twitterLink'>
    )> }
  )> }
);

export type PartyByIdQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type PartyByIdQuery = (
  { __typename?: 'Query' }
  & { partyById?: Maybe<(
    { __typename?: 'Party' }
    & Pick<Party, 'name' | 'type' | 'image' | 'description'>
  )> }
);

export type PartyFieldsFragment = (
  { __typename?: 'Party' }
  & Pick<Party, 'id' | 'accountId' | 'type' | 'name' | 'description' | 'image' | 'websiteLink' | 'twitterLink'>
  & { organizationByPartyId?: Maybe<(
    { __typename?: 'Organization' }
    & OrganizationFieldsFragment
  )>, walletByWalletId?: Maybe<(
    { __typename?: 'Wallet' }
    & Pick<Wallet, 'id' | 'addr'>
  )> }
);

export type OrganizationFieldsFragment = (
  { __typename?: 'Organization' }
  & Pick<Organization, 'id'>
);

export type ProjectByHandleQueryVariables = Exact<{
  handle: Scalars['String'];
}>;


export type ProjectByHandleQuery = (
  { __typename?: 'Query' }
  & { projectByHandle?: Maybe<(
    { __typename?: 'Project' }
    & ProjectFieldsFragment
  )> }
);

export type ProjectByIdQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type ProjectByIdQuery = (
  { __typename?: 'Query' }
  & { projectById?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'metadata' | 'developerId' | 'onChainId'>
    & { walletByAdminWalletId?: Maybe<(
      { __typename?: 'Wallet' }
      & Pick<Wallet, 'addr'>
    )>, partyByDeveloperId?: Maybe<(
      { __typename?: 'Party' }
      & PartyFieldsFragment
    )>, partyByVerifierId?: Maybe<(
      { __typename?: 'Party' }
      & PartyFieldsFragment
    )>, creditClassByCreditClassId?: Maybe<(
      { __typename?: 'CreditClass' }
      & Pick<CreditClass, 'id' | 'onChainId'>
      & { creditClassVersionsById: (
        { __typename?: 'CreditClassVersionsConnection' }
        & { nodes: Array<Maybe<(
          { __typename?: 'CreditClassVersion' }
          & Pick<CreditClassVersion, 'name' | 'metadata'>
        )>> }
      ) }
    )> }
  )> }
);

export type ProjectByOnChainIdQueryVariables = Exact<{
  onChainId: Scalars['String'];
}>;


export type ProjectByOnChainIdQuery = (
  { __typename?: 'Query' }
  & { projectByOnChainId?: Maybe<(
    { __typename?: 'Project' }
    & ProjectFieldsFragment
  )> }
);

export type ProjectFieldsFragment = (
  { __typename?: 'Project' }
  & Pick<Project, 'id' | 'onChainId' | 'metadata'>
  & { walletByAdminWalletId?: Maybe<(
    { __typename?: 'Wallet' }
    & Pick<Wallet, 'addr'>
  )>, creditClassByCreditClassId?: Maybe<(
    { __typename?: 'CreditClass' }
    & Pick<CreditClass, 'onChainId'>
    & { partyByRegistryId?: Maybe<(
      { __typename?: 'Party' }
      & PartyFieldsFragment
    )>, creditClassVersionsById: (
      { __typename?: 'CreditClassVersionsConnection' }
      & { nodes: Array<Maybe<(
        { __typename?: 'CreditClassVersion' }
        & Pick<CreditClassVersion, 'name' | 'metadata'>
      )>> }
    ) }
  )>, partyByDeveloperId?: Maybe<(
    { __typename?: 'Party' }
    & PartyFieldsFragment
  )>, partyByVerifierId?: Maybe<(
    { __typename?: 'Party' }
    & PartyFieldsFragment
  )>, documentsByProjectId: (
    { __typename?: 'DocumentsConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'Document' }
      & Pick<Document, 'name' | 'type' | 'date' | 'url'>
    )>> }
  ) }
);

export type ProjectsByMetadataQueryVariables = Exact<{
  metadata?: Maybe<Scalars['JSON']>;
}>;


export type ProjectsByMetadataQuery = (
  { __typename?: 'Query' }
  & { allProjects?: Maybe<(
    { __typename?: 'ProjectsConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'Project' }
      & Pick<Project, 'handle' | 'metadata'>
    )>> }
  )> }
);

export type ShaclGraphByUriQueryVariables = Exact<{
  uri: Scalars['String'];
}>;


export type ShaclGraphByUriQuery = (
  { __typename?: 'Query' }
  & { shaclGraphByUri?: Maybe<(
    { __typename?: 'ShaclGraph' }
    & Pick<ShaclGraph, 'graph'>
  )> }
);

export type UpdateOrganizationByIdMutationVariables = Exact<{
  input: UpdateOrganizationByIdInput;
}>;


export type UpdateOrganizationByIdMutation = (
  { __typename?: 'Mutation' }
  & { updateOrganizationById?: Maybe<(
    { __typename?: 'UpdateOrganizationPayload' }
    & { organization?: Maybe<(
      { __typename?: 'Organization' }
      & Pick<Organization, 'id' | 'legalName'>
    )> }
  )> }
);

export type UpdateOrganizationByPartyIdMutationVariables = Exact<{
  input: UpdateOrganizationByPartyIdInput;
}>;


export type UpdateOrganizationByPartyIdMutation = (
  { __typename?: 'Mutation' }
  & { updateOrganizationByPartyId?: Maybe<(
    { __typename?: 'UpdateOrganizationPayload' }
    & { organization?: Maybe<(
      { __typename?: 'Organization' }
      & Pick<Organization, 'id' | 'legalName'>
    )> }
  )> }
);

export type UpdatePartyByIdMutationVariables = Exact<{
  input: UpdatePartyByIdInput;
}>;


export type UpdatePartyByIdMutation = (
  { __typename?: 'Mutation' }
  & { updatePartyById?: Maybe<(
    { __typename?: 'UpdatePartyPayload' }
    & { party?: Maybe<(
      { __typename?: 'Party' }
      & Pick<Party, 'id'>
    )> }
  )> }
);

export type UpdateProjectByIdMutationVariables = Exact<{
  input: UpdateProjectByIdInput;
}>;


export type UpdateProjectByIdMutation = (
  { __typename?: 'Mutation' }
  & { updateProjectById?: Maybe<(
    { __typename?: 'UpdateProjectPayload' }
    & { project?: Maybe<(
      { __typename?: 'Project' }
      & Pick<Project, 'id'>
    )> }
  )> }
);

export type UpdateWalletByIdMutationVariables = Exact<{
  input: UpdateWalletByIdInput;
}>;


export type UpdateWalletByIdMutation = (
  { __typename?: 'Mutation' }
  & { updateWalletById?: Maybe<(
    { __typename?: 'UpdateWalletPayload' }
    & { wallet?: Maybe<(
      { __typename?: 'Wallet' }
      & Pick<Wallet, 'id'>
    )> }
  )> }
);

export const PartyWithAccountFieldsFragmentDoc = gql`
    fragment partyWithAccountFields on Party {
  id
  accountId
  name
  type
  image
  description
  walletByWalletId {
    addr
  }
}
    `;
export const MoreProjectFieldsFragmentDoc = gql`
    fragment moreProjectFields on Project {
  handle
  onChainId
  metadata
  creditClassByCreditClassId {
    uri
  }
  partyByDeveloperId {
    name
    image
    type
  }
}
    `;
export const OrganizationFieldsFragmentDoc = gql`
    fragment organizationFields on Organization {
  id
}
    `;
export const PartyFieldsFragmentDoc = gql`
    fragment partyFields on Party {
  id
  accountId
  type
  name
  description
  image
  websiteLink
  twitterLink
  organizationByPartyId {
    ...organizationFields
  }
  walletByWalletId {
    id
    addr
  }
}
    ${OrganizationFieldsFragmentDoc}`;
export const ProjectFieldsFragmentDoc = gql`
    fragment projectFields on Project {
  id
  walletByAdminWalletId {
    addr
  }
  onChainId
  metadata
  creditClassByCreditClassId {
    onChainId
    partyByRegistryId {
      ...partyFields
    }
    creditClassVersionsById(orderBy: CREATED_AT_DESC, first: 1) {
      nodes {
        name
        metadata
      }
    }
  }
  partyByDeveloperId {
    ...partyFields
  }
  partyByVerifierId {
    ...partyFields
  }
  documentsByProjectId {
    nodes {
      name
      type
      date
      url
    }
  }
}
    ${PartyFieldsFragmentDoc}`;
export const PartiesByAccountIdDocument = gql`
    query partiesByAccountId($id: UUID!) {
  accountById(id: $id) {
    partiesByAccountId {
      nodes {
        ...partyWithAccountFields
      }
    }
  }
}
    ${PartyWithAccountFieldsFragmentDoc}`;

/**
 * __usePartiesByAccountIdQuery__
 *
 * To run a query within a React component, call `usePartiesByAccountIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePartiesByAccountIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePartiesByAccountIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePartiesByAccountIdQuery(baseOptions: Apollo.QueryHookOptions<PartiesByAccountIdQuery, PartiesByAccountIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PartiesByAccountIdQuery, PartiesByAccountIdQueryVariables>(PartiesByAccountIdDocument, options);
      }
export function usePartiesByAccountIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PartiesByAccountIdQuery, PartiesByAccountIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PartiesByAccountIdQuery, PartiesByAccountIdQueryVariables>(PartiesByAccountIdDocument, options);
        }
export type PartiesByAccountIdQueryHookResult = ReturnType<typeof usePartiesByAccountIdQuery>;
export type PartiesByAccountIdLazyQueryHookResult = ReturnType<typeof usePartiesByAccountIdLazyQuery>;
export type PartiesByAccountIdQueryResult = Apollo.QueryResult<PartiesByAccountIdQuery, PartiesByAccountIdQueryVariables>;
export const AllCreditClassesDocument = gql`
    query AllCreditClasses {
  allCreditClasses {
    nodes {
      id
      uri
      onChainId
      creditClassVersionsById(orderBy: CREATED_AT_DESC, first: 1) {
        nodes {
          name
        }
      }
    }
  }
}
    `;

/**
 * __useAllCreditClassesQuery__
 *
 * To run a query within a React component, call `useAllCreditClassesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCreditClassesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCreditClassesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllCreditClassesQuery(baseOptions?: Apollo.QueryHookOptions<AllCreditClassesQuery, AllCreditClassesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllCreditClassesQuery, AllCreditClassesQueryVariables>(AllCreditClassesDocument, options);
      }
export function useAllCreditClassesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCreditClassesQuery, AllCreditClassesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllCreditClassesQuery, AllCreditClassesQueryVariables>(AllCreditClassesDocument, options);
        }
export type AllCreditClassesQueryHookResult = ReturnType<typeof useAllCreditClassesQuery>;
export type AllCreditClassesLazyQueryHookResult = ReturnType<typeof useAllCreditClassesLazyQuery>;
export type AllCreditClassesQueryResult = Apollo.QueryResult<AllCreditClassesQuery, AllCreditClassesQueryVariables>;
export const AllPartiesDocument = gql`
    query AllParties {
  allParties {
    nodes {
      id
      type
      name
      walletId
    }
  }
}
    `;

/**
 * __useAllPartiesQuery__
 *
 * To run a query within a React component, call `useAllPartiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPartiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPartiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllPartiesQuery(baseOptions?: Apollo.QueryHookOptions<AllPartiesQuery, AllPartiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPartiesQuery, AllPartiesQueryVariables>(AllPartiesDocument, options);
      }
export function useAllPartiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPartiesQuery, AllPartiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPartiesQuery, AllPartiesQueryVariables>(AllPartiesDocument, options);
        }
export type AllPartiesQueryHookResult = ReturnType<typeof useAllPartiesQuery>;
export type AllPartiesLazyQueryHookResult = ReturnType<typeof useAllPartiesLazyQuery>;
export type AllPartiesQueryResult = Apollo.QueryResult<AllPartiesQuery, AllPartiesQueryVariables>;
export const AllProjectsDocument = gql`
    query AllProjects {
  allProjects {
    nodes {
      id
      handle
      metadata
      creditClassByCreditClassId {
        id
        onChainId
        creditClassVersionsById {
          nodes {
            id
            createdAt
            name
            metadata
          }
        }
      }
    }
  }
}
    `;

/**
 * __useAllProjectsQuery__
 *
 * To run a query within a React component, call `useAllProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllProjectsQuery(baseOptions?: Apollo.QueryHookOptions<AllProjectsQuery, AllProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllProjectsQuery, AllProjectsQueryVariables>(AllProjectsDocument, options);
      }
export function useAllProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllProjectsQuery, AllProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllProjectsQuery, AllProjectsQueryVariables>(AllProjectsDocument, options);
        }
export type AllProjectsQueryHookResult = ReturnType<typeof useAllProjectsQuery>;
export type AllProjectsLazyQueryHookResult = ReturnType<typeof useAllProjectsLazyQuery>;
export type AllProjectsQueryResult = Apollo.QueryResult<AllProjectsQuery, AllProjectsQueryVariables>;
export const CreatePartyDocument = gql`
    mutation CreateParty($input: CreatePartyInput!) {
  createParty(input: $input) {
    party {
      id
    }
  }
}
    `;
export type CreatePartyMutationFn = Apollo.MutationFunction<CreatePartyMutation, CreatePartyMutationVariables>;

/**
 * __useCreatePartyMutation__
 *
 * To run a mutation, you first call `useCreatePartyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePartyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPartyMutation, { data, loading, error }] = useCreatePartyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePartyMutation(baseOptions?: Apollo.MutationHookOptions<CreatePartyMutation, CreatePartyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePartyMutation, CreatePartyMutationVariables>(CreatePartyDocument, options);
      }
export type CreatePartyMutationHookResult = ReturnType<typeof useCreatePartyMutation>;
export type CreatePartyMutationResult = Apollo.MutationResult<CreatePartyMutation>;
export type CreatePartyMutationOptions = Apollo.BaseMutationOptions<CreatePartyMutation, CreatePartyMutationVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    project {
      id
    }
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateWalletDocument = gql`
    mutation CreateWallet($input: CreateWalletInput!) {
  createWallet(input: $input) {
    wallet {
      id
      addr
    }
  }
}
    `;
export type CreateWalletMutationFn = Apollo.MutationFunction<CreateWalletMutation, CreateWalletMutationVariables>;

/**
 * __useCreateWalletMutation__
 *
 * To run a mutation, you first call `useCreateWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWalletMutation, { data, loading, error }] = useCreateWalletMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWalletMutation(baseOptions?: Apollo.MutationHookOptions<CreateWalletMutation, CreateWalletMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWalletMutation, CreateWalletMutationVariables>(CreateWalletDocument, options);
      }
export type CreateWalletMutationHookResult = ReturnType<typeof useCreateWalletMutation>;
export type CreateWalletMutationResult = Apollo.MutationResult<CreateWalletMutation>;
export type CreateWalletMutationOptions = Apollo.BaseMutationOptions<CreateWalletMutation, CreateWalletMutationVariables>;
export const CreditClassByOnChainIdDocument = gql`
    query CreditClassByOnChainId($onChainId: String!) {
  creditClassByOnChainId(onChainId: $onChainId) {
    id
    uri
    projectsByCreditClassId {
      nodes {
        ...moreProjectFields
      }
    }
    creditClassVersionsById {
      nodes {
        name
        metadata
      }
    }
    partyByRegistryId {
      ...partyFields
    }
  }
}
    ${MoreProjectFieldsFragmentDoc}
${PartyFieldsFragmentDoc}`;

/**
 * __useCreditClassByOnChainIdQuery__
 *
 * To run a query within a React component, call `useCreditClassByOnChainIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCreditClassByOnChainIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCreditClassByOnChainIdQuery({
 *   variables: {
 *      onChainId: // value for 'onChainId'
 *   },
 * });
 */
export function useCreditClassByOnChainIdQuery(baseOptions: Apollo.QueryHookOptions<CreditClassByOnChainIdQuery, CreditClassByOnChainIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CreditClassByOnChainIdQuery, CreditClassByOnChainIdQueryVariables>(CreditClassByOnChainIdDocument, options);
      }
export function useCreditClassByOnChainIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CreditClassByOnChainIdQuery, CreditClassByOnChainIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CreditClassByOnChainIdQuery, CreditClassByOnChainIdQueryVariables>(CreditClassByOnChainIdDocument, options);
        }
export type CreditClassByOnChainIdQueryHookResult = ReturnType<typeof useCreditClassByOnChainIdQuery>;
export type CreditClassByOnChainIdLazyQueryHookResult = ReturnType<typeof useCreditClassByOnChainIdLazyQuery>;
export type CreditClassByOnChainIdQueryResult = Apollo.QueryResult<CreditClassByOnChainIdQuery, CreditClassByOnChainIdQueryVariables>;
export const CreditClassByUriDocument = gql`
    query CreditClassByUri($uri: String!) {
  creditClassByUri(uri: $uri) {
    creditClassVersionsById(last: 1) {
      nodes {
        name
        metadata
      }
    }
  }
}
    `;

/**
 * __useCreditClassByUriQuery__
 *
 * To run a query within a React component, call `useCreditClassByUriQuery` and pass it any options that fit your needs.
 * When your component renders, `useCreditClassByUriQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCreditClassByUriQuery({
 *   variables: {
 *      uri: // value for 'uri'
 *   },
 * });
 */
export function useCreditClassByUriQuery(baseOptions: Apollo.QueryHookOptions<CreditClassByUriQuery, CreditClassByUriQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CreditClassByUriQuery, CreditClassByUriQueryVariables>(CreditClassByUriDocument, options);
      }
export function useCreditClassByUriLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CreditClassByUriQuery, CreditClassByUriQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CreditClassByUriQuery, CreditClassByUriQueryVariables>(CreditClassByUriDocument, options);
        }
export type CreditClassByUriQueryHookResult = ReturnType<typeof useCreditClassByUriQuery>;
export type CreditClassByUriLazyQueryHookResult = ReturnType<typeof useCreditClassByUriLazyQuery>;
export type CreditClassByUriQueryResult = Apollo.QueryResult<CreditClassByUriQuery, CreditClassByUriQueryVariables>;
export const GetCurrentAccountDocument = gql`
    query GetCurrentAccount {
  getCurrentAccount
}
    `;

/**
 * __useGetCurrentAccountQuery__
 *
 * To run a query within a React component, call `useGetCurrentAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentAccountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentAccountQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentAccountQuery, GetCurrentAccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentAccountQuery, GetCurrentAccountQueryVariables>(GetCurrentAccountDocument, options);
      }
export function useGetCurrentAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentAccountQuery, GetCurrentAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentAccountQuery, GetCurrentAccountQueryVariables>(GetCurrentAccountDocument, options);
        }
export type GetCurrentAccountQueryHookResult = ReturnType<typeof useGetCurrentAccountQuery>;
export type GetCurrentAccountLazyQueryHookResult = ReturnType<typeof useGetCurrentAccountLazyQuery>;
export type GetCurrentAccountQueryResult = Apollo.QueryResult<GetCurrentAccountQuery, GetCurrentAccountQueryVariables>;
export const GetPartiesByNameOrAddrDocument = gql`
    query GetPartiesByNameOrAddr($input: String) {
  getPartiesByNameOrAddr(input: $input) {
    nodes {
      ...partyWithAccountFields
    }
  }
}
    ${PartyWithAccountFieldsFragmentDoc}`;

/**
 * __useGetPartiesByNameOrAddrQuery__
 *
 * To run a query within a React component, call `useGetPartiesByNameOrAddrQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPartiesByNameOrAddrQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPartiesByNameOrAddrQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPartiesByNameOrAddrQuery(baseOptions?: Apollo.QueryHookOptions<GetPartiesByNameOrAddrQuery, GetPartiesByNameOrAddrQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPartiesByNameOrAddrQuery, GetPartiesByNameOrAddrQueryVariables>(GetPartiesByNameOrAddrDocument, options);
      }
export function useGetPartiesByNameOrAddrLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPartiesByNameOrAddrQuery, GetPartiesByNameOrAddrQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPartiesByNameOrAddrQuery, GetPartiesByNameOrAddrQueryVariables>(GetPartiesByNameOrAddrDocument, options);
        }
export type GetPartiesByNameOrAddrQueryHookResult = ReturnType<typeof useGetPartiesByNameOrAddrQuery>;
export type GetPartiesByNameOrAddrLazyQueryHookResult = ReturnType<typeof useGetPartiesByNameOrAddrLazyQuery>;
export type GetPartiesByNameOrAddrQueryResult = Apollo.QueryResult<GetPartiesByNameOrAddrQuery, GetPartiesByNameOrAddrQueryVariables>;
export const WalletByAddrDocument = gql`
    query walletByAddr($addr: String!) {
  walletByAddr(addr: $addr) {
    id
    addr
    partyByWalletId {
      accountId
    }
    projectsByAdminWalletId {
      nodes {
        ...projectFields
      }
    }
  }
}
    ${ProjectFieldsFragmentDoc}`;

/**
 * __useWalletByAddrQuery__
 *
 * To run a query within a React component, call `useWalletByAddrQuery` and pass it any options that fit your needs.
 * When your component renders, `useWalletByAddrQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWalletByAddrQuery({
 *   variables: {
 *      addr: // value for 'addr'
 *   },
 * });
 */
export function useWalletByAddrQuery(baseOptions: Apollo.QueryHookOptions<WalletByAddrQuery, WalletByAddrQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WalletByAddrQuery, WalletByAddrQueryVariables>(WalletByAddrDocument, options);
      }
export function useWalletByAddrLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WalletByAddrQuery, WalletByAddrQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WalletByAddrQuery, WalletByAddrQueryVariables>(WalletByAddrDocument, options);
        }
export type WalletByAddrQueryHookResult = ReturnType<typeof useWalletByAddrQuery>;
export type WalletByAddrLazyQueryHookResult = ReturnType<typeof useWalletByAddrLazyQuery>;
export type WalletByAddrQueryResult = Apollo.QueryResult<WalletByAddrQuery, WalletByAddrQueryVariables>;
export const MoreProjectsDocument = gql`
    query MoreProjects {
  allProjects {
    nodes {
      ...moreProjectFields
    }
  }
}
    ${MoreProjectFieldsFragmentDoc}`;

/**
 * __useMoreProjectsQuery__
 *
 * To run a query within a React component, call `useMoreProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoreProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoreProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMoreProjectsQuery(baseOptions?: Apollo.QueryHookOptions<MoreProjectsQuery, MoreProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MoreProjectsQuery, MoreProjectsQueryVariables>(MoreProjectsDocument, options);
      }
export function useMoreProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MoreProjectsQuery, MoreProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MoreProjectsQuery, MoreProjectsQueryVariables>(MoreProjectsDocument, options);
        }
export type MoreProjectsQueryHookResult = ReturnType<typeof useMoreProjectsQuery>;
export type MoreProjectsLazyQueryHookResult = ReturnType<typeof useMoreProjectsLazyQuery>;
export type MoreProjectsQueryResult = Apollo.QueryResult<MoreProjectsQuery, MoreProjectsQueryVariables>;
export const PartyByAddrDocument = gql`
    query partyByAddr($addr: String!) {
  walletByAddr(addr: $addr) {
    id
    partyByWalletId {
      id
      name
      type
      image
      bgImage
      description
      accountId
      websiteLink
      twitterLink
    }
  }
}
    `;

/**
 * __usePartyByAddrQuery__
 *
 * To run a query within a React component, call `usePartyByAddrQuery` and pass it any options that fit your needs.
 * When your component renders, `usePartyByAddrQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePartyByAddrQuery({
 *   variables: {
 *      addr: // value for 'addr'
 *   },
 * });
 */
export function usePartyByAddrQuery(baseOptions: Apollo.QueryHookOptions<PartyByAddrQuery, PartyByAddrQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PartyByAddrQuery, PartyByAddrQueryVariables>(PartyByAddrDocument, options);
      }
export function usePartyByAddrLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PartyByAddrQuery, PartyByAddrQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PartyByAddrQuery, PartyByAddrQueryVariables>(PartyByAddrDocument, options);
        }
export type PartyByAddrQueryHookResult = ReturnType<typeof usePartyByAddrQuery>;
export type PartyByAddrLazyQueryHookResult = ReturnType<typeof usePartyByAddrLazyQuery>;
export type PartyByAddrQueryResult = Apollo.QueryResult<PartyByAddrQuery, PartyByAddrQueryVariables>;
export const PartyByIdDocument = gql`
    query partyById($id: UUID!) {
  partyById(id: $id) {
    name
    type
    image
    description
  }
}
    `;

/**
 * __usePartyByIdQuery__
 *
 * To run a query within a React component, call `usePartyByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePartyByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePartyByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePartyByIdQuery(baseOptions: Apollo.QueryHookOptions<PartyByIdQuery, PartyByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PartyByIdQuery, PartyByIdQueryVariables>(PartyByIdDocument, options);
      }
export function usePartyByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PartyByIdQuery, PartyByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PartyByIdQuery, PartyByIdQueryVariables>(PartyByIdDocument, options);
        }
export type PartyByIdQueryHookResult = ReturnType<typeof usePartyByIdQuery>;
export type PartyByIdLazyQueryHookResult = ReturnType<typeof usePartyByIdLazyQuery>;
export type PartyByIdQueryResult = Apollo.QueryResult<PartyByIdQuery, PartyByIdQueryVariables>;
export const ProjectByHandleDocument = gql`
    query ProjectByHandle($handle: String!) {
  projectByHandle(handle: $handle) {
    ...projectFields
  }
}
    ${ProjectFieldsFragmentDoc}`;

/**
 * __useProjectByHandleQuery__
 *
 * To run a query within a React component, call `useProjectByHandleQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectByHandleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectByHandleQuery({
 *   variables: {
 *      handle: // value for 'handle'
 *   },
 * });
 */
export function useProjectByHandleQuery(baseOptions: Apollo.QueryHookOptions<ProjectByHandleQuery, ProjectByHandleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectByHandleQuery, ProjectByHandleQueryVariables>(ProjectByHandleDocument, options);
      }
export function useProjectByHandleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectByHandleQuery, ProjectByHandleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectByHandleQuery, ProjectByHandleQueryVariables>(ProjectByHandleDocument, options);
        }
export type ProjectByHandleQueryHookResult = ReturnType<typeof useProjectByHandleQuery>;
export type ProjectByHandleLazyQueryHookResult = ReturnType<typeof useProjectByHandleLazyQuery>;
export type ProjectByHandleQueryResult = Apollo.QueryResult<ProjectByHandleQuery, ProjectByHandleQueryVariables>;
export const ProjectByIdDocument = gql`
    query ProjectById($id: UUID!) {
  projectById(id: $id) {
    id
    walletByAdminWalletId {
      addr
    }
    metadata
    developerId
    onChainId
    partyByDeveloperId {
      ...partyFields
    }
    partyByVerifierId {
      ...partyFields
    }
    creditClassByCreditClassId {
      id
      onChainId
      creditClassVersionsById(orderBy: CREATED_AT_DESC, first: 1) {
        nodes {
          name
          metadata
        }
      }
    }
  }
}
    ${PartyFieldsFragmentDoc}`;

/**
 * __useProjectByIdQuery__
 *
 * To run a query within a React component, call `useProjectByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectByIdQuery(baseOptions: Apollo.QueryHookOptions<ProjectByIdQuery, ProjectByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectByIdQuery, ProjectByIdQueryVariables>(ProjectByIdDocument, options);
      }
export function useProjectByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectByIdQuery, ProjectByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectByIdQuery, ProjectByIdQueryVariables>(ProjectByIdDocument, options);
        }
export type ProjectByIdQueryHookResult = ReturnType<typeof useProjectByIdQuery>;
export type ProjectByIdLazyQueryHookResult = ReturnType<typeof useProjectByIdLazyQuery>;
export type ProjectByIdQueryResult = Apollo.QueryResult<ProjectByIdQuery, ProjectByIdQueryVariables>;
export const ProjectByOnChainIdDocument = gql`
    query ProjectByOnChainId($onChainId: String!) {
  projectByOnChainId(onChainId: $onChainId) {
    ...projectFields
  }
}
    ${ProjectFieldsFragmentDoc}`;

/**
 * __useProjectByOnChainIdQuery__
 *
 * To run a query within a React component, call `useProjectByOnChainIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectByOnChainIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectByOnChainIdQuery({
 *   variables: {
 *      onChainId: // value for 'onChainId'
 *   },
 * });
 */
export function useProjectByOnChainIdQuery(baseOptions: Apollo.QueryHookOptions<ProjectByOnChainIdQuery, ProjectByOnChainIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectByOnChainIdQuery, ProjectByOnChainIdQueryVariables>(ProjectByOnChainIdDocument, options);
      }
export function useProjectByOnChainIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectByOnChainIdQuery, ProjectByOnChainIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectByOnChainIdQuery, ProjectByOnChainIdQueryVariables>(ProjectByOnChainIdDocument, options);
        }
export type ProjectByOnChainIdQueryHookResult = ReturnType<typeof useProjectByOnChainIdQuery>;
export type ProjectByOnChainIdLazyQueryHookResult = ReturnType<typeof useProjectByOnChainIdLazyQuery>;
export type ProjectByOnChainIdQueryResult = Apollo.QueryResult<ProjectByOnChainIdQuery, ProjectByOnChainIdQueryVariables>;
export const ProjectsByMetadataDocument = gql`
    query ProjectsByMetadata($metadata: JSON) {
  allProjects(filter: {metadata: {contains: $metadata}}) {
    nodes {
      handle
      metadata
    }
  }
}
    `;

/**
 * __useProjectsByMetadataQuery__
 *
 * To run a query within a React component, call `useProjectsByMetadataQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsByMetadataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsByMetadataQuery({
 *   variables: {
 *      metadata: // value for 'metadata'
 *   },
 * });
 */
export function useProjectsByMetadataQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsByMetadataQuery, ProjectsByMetadataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsByMetadataQuery, ProjectsByMetadataQueryVariables>(ProjectsByMetadataDocument, options);
      }
export function useProjectsByMetadataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsByMetadataQuery, ProjectsByMetadataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsByMetadataQuery, ProjectsByMetadataQueryVariables>(ProjectsByMetadataDocument, options);
        }
export type ProjectsByMetadataQueryHookResult = ReturnType<typeof useProjectsByMetadataQuery>;
export type ProjectsByMetadataLazyQueryHookResult = ReturnType<typeof useProjectsByMetadataLazyQuery>;
export type ProjectsByMetadataQueryResult = Apollo.QueryResult<ProjectsByMetadataQuery, ProjectsByMetadataQueryVariables>;
export const ShaclGraphByUriDocument = gql`
    query ShaclGraphByUri($uri: String!) {
  shaclGraphByUri(uri: $uri) {
    graph
  }
}
    `;

/**
 * __useShaclGraphByUriQuery__
 *
 * To run a query within a React component, call `useShaclGraphByUriQuery` and pass it any options that fit your needs.
 * When your component renders, `useShaclGraphByUriQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShaclGraphByUriQuery({
 *   variables: {
 *      uri: // value for 'uri'
 *   },
 * });
 */
export function useShaclGraphByUriQuery(baseOptions: Apollo.QueryHookOptions<ShaclGraphByUriQuery, ShaclGraphByUriQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShaclGraphByUriQuery, ShaclGraphByUriQueryVariables>(ShaclGraphByUriDocument, options);
      }
export function useShaclGraphByUriLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShaclGraphByUriQuery, ShaclGraphByUriQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShaclGraphByUriQuery, ShaclGraphByUriQueryVariables>(ShaclGraphByUriDocument, options);
        }
export type ShaclGraphByUriQueryHookResult = ReturnType<typeof useShaclGraphByUriQuery>;
export type ShaclGraphByUriLazyQueryHookResult = ReturnType<typeof useShaclGraphByUriLazyQuery>;
export type ShaclGraphByUriQueryResult = Apollo.QueryResult<ShaclGraphByUriQuery, ShaclGraphByUriQueryVariables>;
export const UpdateOrganizationByIdDocument = gql`
    mutation UpdateOrganizationById($input: UpdateOrganizationByIdInput!) {
  updateOrganizationById(input: $input) {
    organization {
      id
      legalName
    }
  }
}
    `;
export type UpdateOrganizationByIdMutationFn = Apollo.MutationFunction<UpdateOrganizationByIdMutation, UpdateOrganizationByIdMutationVariables>;

/**
 * __useUpdateOrganizationByIdMutation__
 *
 * To run a mutation, you first call `useUpdateOrganizationByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrganizationByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrganizationByIdMutation, { data, loading, error }] = useUpdateOrganizationByIdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOrganizationByIdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrganizationByIdMutation, UpdateOrganizationByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrganizationByIdMutation, UpdateOrganizationByIdMutationVariables>(UpdateOrganizationByIdDocument, options);
      }
export type UpdateOrganizationByIdMutationHookResult = ReturnType<typeof useUpdateOrganizationByIdMutation>;
export type UpdateOrganizationByIdMutationResult = Apollo.MutationResult<UpdateOrganizationByIdMutation>;
export type UpdateOrganizationByIdMutationOptions = Apollo.BaseMutationOptions<UpdateOrganizationByIdMutation, UpdateOrganizationByIdMutationVariables>;
export const UpdateOrganizationByPartyIdDocument = gql`
    mutation UpdateOrganizationByPartyId($input: UpdateOrganizationByPartyIdInput!) {
  updateOrganizationByPartyId(input: $input) {
    organization {
      id
      legalName
    }
  }
}
    `;
export type UpdateOrganizationByPartyIdMutationFn = Apollo.MutationFunction<UpdateOrganizationByPartyIdMutation, UpdateOrganizationByPartyIdMutationVariables>;

/**
 * __useUpdateOrganizationByPartyIdMutation__
 *
 * To run a mutation, you first call `useUpdateOrganizationByPartyIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrganizationByPartyIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrganizationByPartyIdMutation, { data, loading, error }] = useUpdateOrganizationByPartyIdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOrganizationByPartyIdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrganizationByPartyIdMutation, UpdateOrganizationByPartyIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrganizationByPartyIdMutation, UpdateOrganizationByPartyIdMutationVariables>(UpdateOrganizationByPartyIdDocument, options);
      }
export type UpdateOrganizationByPartyIdMutationHookResult = ReturnType<typeof useUpdateOrganizationByPartyIdMutation>;
export type UpdateOrganizationByPartyIdMutationResult = Apollo.MutationResult<UpdateOrganizationByPartyIdMutation>;
export type UpdateOrganizationByPartyIdMutationOptions = Apollo.BaseMutationOptions<UpdateOrganizationByPartyIdMutation, UpdateOrganizationByPartyIdMutationVariables>;
export const UpdatePartyByIdDocument = gql`
    mutation UpdatePartyById($input: UpdatePartyByIdInput!) {
  updatePartyById(input: $input) {
    party {
      id
    }
  }
}
    `;
export type UpdatePartyByIdMutationFn = Apollo.MutationFunction<UpdatePartyByIdMutation, UpdatePartyByIdMutationVariables>;

/**
 * __useUpdatePartyByIdMutation__
 *
 * To run a mutation, you first call `useUpdatePartyByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePartyByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePartyByIdMutation, { data, loading, error }] = useUpdatePartyByIdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePartyByIdMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePartyByIdMutation, UpdatePartyByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePartyByIdMutation, UpdatePartyByIdMutationVariables>(UpdatePartyByIdDocument, options);
      }
export type UpdatePartyByIdMutationHookResult = ReturnType<typeof useUpdatePartyByIdMutation>;
export type UpdatePartyByIdMutationResult = Apollo.MutationResult<UpdatePartyByIdMutation>;
export type UpdatePartyByIdMutationOptions = Apollo.BaseMutationOptions<UpdatePartyByIdMutation, UpdatePartyByIdMutationVariables>;
export const UpdateProjectByIdDocument = gql`
    mutation UpdateProjectById($input: UpdateProjectByIdInput!) {
  updateProjectById(input: $input) {
    project {
      id
    }
  }
}
    `;
export type UpdateProjectByIdMutationFn = Apollo.MutationFunction<UpdateProjectByIdMutation, UpdateProjectByIdMutationVariables>;

/**
 * __useUpdateProjectByIdMutation__
 *
 * To run a mutation, you first call `useUpdateProjectByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectByIdMutation, { data, loading, error }] = useUpdateProjectByIdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProjectByIdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectByIdMutation, UpdateProjectByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectByIdMutation, UpdateProjectByIdMutationVariables>(UpdateProjectByIdDocument, options);
      }
export type UpdateProjectByIdMutationHookResult = ReturnType<typeof useUpdateProjectByIdMutation>;
export type UpdateProjectByIdMutationResult = Apollo.MutationResult<UpdateProjectByIdMutation>;
export type UpdateProjectByIdMutationOptions = Apollo.BaseMutationOptions<UpdateProjectByIdMutation, UpdateProjectByIdMutationVariables>;
export const UpdateWalletByIdDocument = gql`
    mutation UpdateWalletById($input: UpdateWalletByIdInput!) {
  updateWalletById(input: $input) {
    wallet {
      id
    }
  }
}
    `;
export type UpdateWalletByIdMutationFn = Apollo.MutationFunction<UpdateWalletByIdMutation, UpdateWalletByIdMutationVariables>;

/**
 * __useUpdateWalletByIdMutation__
 *
 * To run a mutation, you first call `useUpdateWalletByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWalletByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWalletByIdMutation, { data, loading, error }] = useUpdateWalletByIdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateWalletByIdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWalletByIdMutation, UpdateWalletByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWalletByIdMutation, UpdateWalletByIdMutationVariables>(UpdateWalletByIdDocument, options);
      }
export type UpdateWalletByIdMutationHookResult = ReturnType<typeof useUpdateWalletByIdMutation>;
export type UpdateWalletByIdMutationResult = Apollo.MutationResult<UpdateWalletByIdMutation>;
export type UpdateWalletByIdMutationOptions = Apollo.BaseMutationOptions<UpdateWalletByIdMutation, UpdateWalletByIdMutationVariables>;