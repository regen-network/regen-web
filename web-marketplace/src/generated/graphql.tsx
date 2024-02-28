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
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  type: AccountType;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  bgImage?: Maybe<Scalars['String']>;
  twitterLink?: Maybe<Scalars['String']>;
  websiteLink?: Maybe<Scalars['String']>;
  creatorId?: Maybe<Scalars['UUID']>;
  nonce: Scalars['String'];
  addr?: Maybe<Scalars['String']>;
  /** Reads a single `Account` that is related to this `Account`. */
  accountByCreatorId?: Maybe<Account>;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByRegistryId: CreditClassesConnection;
  /** Reads a single `Organization` that is related to this `Account`. */
  organizationByAccountId?: Maybe<Organization>;
  /**
   * Reads and enables pagination through a set of `Organization`.
   * @deprecated Please use organizationByAccountId instead
   */
  organizationsByAccountId: OrganizationsConnection;
  /** Reads and enables pagination through a set of `Account`. */
  accountsByCreatorId: AccountsConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByDeveloperId: ProjectsConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByVerifierId: ProjectsConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByAdminAccountId: ProjectsConnection;
  /** Reads and enables pagination through a set of `Upload`. */
  uploadsByAccountId: UploadsConnection;
  /** Reads and enables pagination through a set of `Post`. */
  postsByCreatorAccountId: PostsConnection;
  /** Reads and enables pagination through a set of `ProjectPartner`. */
  projectPartnersByAccountId: ProjectPartnersConnection;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByProjectDeveloperIdAndCreditClassId: AccountCreditClassesByProjectDeveloperIdAndCreditClassIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Account`. */
  accountsByProjectDeveloperIdAndVerifierId: AccountAccountsByProjectDeveloperIdAndVerifierIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Account`. */
  accountsByProjectDeveloperIdAndAdminAccountId: AccountAccountsByProjectDeveloperIdAndAdminAccountIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Account`. */
  accountsByProjectVerifierIdAndDeveloperId: AccountAccountsByProjectVerifierIdAndDeveloperIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByProjectVerifierIdAndCreditClassId: AccountCreditClassesByProjectVerifierIdAndCreditClassIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Account`. */
  accountsByProjectVerifierIdAndAdminAccountId: AccountAccountsByProjectVerifierIdAndAdminAccountIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Account`. */
  accountsByProjectAdminAccountIdAndDeveloperId: AccountAccountsByProjectAdminAccountIdAndDeveloperIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByProjectAdminAccountIdAndCreditClassId: AccountCreditClassesByProjectAdminAccountIdAndCreditClassIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Account`. */
  accountsByProjectAdminAccountIdAndVerifierId: AccountAccountsByProjectAdminAccountIdAndVerifierIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByUploadAccountIdAndProjectId: AccountProjectsByUploadAccountIdAndProjectIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByPostCreatorAccountIdAndProjectId: AccountProjectsByPostCreatorAccountIdAndProjectIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByProjectPartnerAccountIdAndProjectId: AccountProjectsByProjectPartnerAccountIdAndProjectIdManyToManyConnection;
};


export type AccountCreditClassesByRegistryIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};


export type AccountOrganizationsByAccountIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<OrganizationsOrderBy>>;
  condition?: Maybe<OrganizationCondition>;
};


export type AccountAccountsByCreatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountsOrderBy>>;
  condition?: Maybe<AccountCondition>;
};


export type AccountProjectsByDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};


export type AccountProjectsByVerifierIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};


export type AccountProjectsByAdminAccountIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};


export type AccountUploadsByAccountIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UploadsOrderBy>>;
  condition?: Maybe<UploadCondition>;
};


export type AccountPostsByCreatorAccountIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
};


export type AccountProjectPartnersByAccountIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectPartnersOrderBy>>;
  condition?: Maybe<ProjectPartnerCondition>;
};


export type AccountCreditClassesByProjectDeveloperIdAndCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};


export type AccountAccountsByProjectDeveloperIdAndVerifierIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountsOrderBy>>;
  condition?: Maybe<AccountCondition>;
};


export type AccountAccountsByProjectDeveloperIdAndAdminAccountIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountsOrderBy>>;
  condition?: Maybe<AccountCondition>;
};


export type AccountAccountsByProjectVerifierIdAndDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountsOrderBy>>;
  condition?: Maybe<AccountCondition>;
};


export type AccountCreditClassesByProjectVerifierIdAndCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};


export type AccountAccountsByProjectVerifierIdAndAdminAccountIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountsOrderBy>>;
  condition?: Maybe<AccountCondition>;
};


export type AccountAccountsByProjectAdminAccountIdAndDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountsOrderBy>>;
  condition?: Maybe<AccountCondition>;
};


export type AccountCreditClassesByProjectAdminAccountIdAndCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};


export type AccountAccountsByProjectAdminAccountIdAndVerifierIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountsOrderBy>>;
  condition?: Maybe<AccountCondition>;
};


export type AccountProjectsByUploadAccountIdAndProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};


export type AccountProjectsByPostCreatorAccountIdAndProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};


export type AccountProjectsByProjectPartnerAccountIdAndProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};

/** A connection to a list of `Account` values, with data from `Project`. */
export type AccountAccountsByProjectAdminAccountIdAndDeveloperIdManyToManyConnection = {
  __typename?: 'AccountAccountsByProjectAdminAccountIdAndDeveloperIdManyToManyConnection';
  /** A list of `Account` objects. */
  nodes: Array<Maybe<Account>>;
  /** A list of edges which contains the `Account`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<AccountAccountsByProjectAdminAccountIdAndDeveloperIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Account` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Account` edge in the connection, with data from `Project`. */
export type AccountAccountsByProjectAdminAccountIdAndDeveloperIdManyToManyEdge = {
  __typename?: 'AccountAccountsByProjectAdminAccountIdAndDeveloperIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Account` at the end of the edge. */
  node?: Maybe<Account>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByDeveloperId: ProjectsConnection;
};


/** A `Account` edge in the connection, with data from `Project`. */
export type AccountAccountsByProjectAdminAccountIdAndDeveloperIdManyToManyEdgeProjectsByDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};

/** A connection to a list of `Account` values, with data from `Project`. */
export type AccountAccountsByProjectAdminAccountIdAndVerifierIdManyToManyConnection = {
  __typename?: 'AccountAccountsByProjectAdminAccountIdAndVerifierIdManyToManyConnection';
  /** A list of `Account` objects. */
  nodes: Array<Maybe<Account>>;
  /** A list of edges which contains the `Account`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<AccountAccountsByProjectAdminAccountIdAndVerifierIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Account` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Account` edge in the connection, with data from `Project`. */
export type AccountAccountsByProjectAdminAccountIdAndVerifierIdManyToManyEdge = {
  __typename?: 'AccountAccountsByProjectAdminAccountIdAndVerifierIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Account` at the end of the edge. */
  node?: Maybe<Account>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByVerifierId: ProjectsConnection;
};


/** A `Account` edge in the connection, with data from `Project`. */
export type AccountAccountsByProjectAdminAccountIdAndVerifierIdManyToManyEdgeProjectsByVerifierIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};

/** A connection to a list of `Account` values, with data from `Project`. */
export type AccountAccountsByProjectDeveloperIdAndAdminAccountIdManyToManyConnection = {
  __typename?: 'AccountAccountsByProjectDeveloperIdAndAdminAccountIdManyToManyConnection';
  /** A list of `Account` objects. */
  nodes: Array<Maybe<Account>>;
  /** A list of edges which contains the `Account`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<AccountAccountsByProjectDeveloperIdAndAdminAccountIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Account` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Account` edge in the connection, with data from `Project`. */
export type AccountAccountsByProjectDeveloperIdAndAdminAccountIdManyToManyEdge = {
  __typename?: 'AccountAccountsByProjectDeveloperIdAndAdminAccountIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Account` at the end of the edge. */
  node?: Maybe<Account>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByAdminAccountId: ProjectsConnection;
};


/** A `Account` edge in the connection, with data from `Project`. */
export type AccountAccountsByProjectDeveloperIdAndAdminAccountIdManyToManyEdgeProjectsByAdminAccountIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};

/** A connection to a list of `Account` values, with data from `Project`. */
export type AccountAccountsByProjectDeveloperIdAndVerifierIdManyToManyConnection = {
  __typename?: 'AccountAccountsByProjectDeveloperIdAndVerifierIdManyToManyConnection';
  /** A list of `Account` objects. */
  nodes: Array<Maybe<Account>>;
  /** A list of edges which contains the `Account`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<AccountAccountsByProjectDeveloperIdAndVerifierIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Account` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Account` edge in the connection, with data from `Project`. */
export type AccountAccountsByProjectDeveloperIdAndVerifierIdManyToManyEdge = {
  __typename?: 'AccountAccountsByProjectDeveloperIdAndVerifierIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Account` at the end of the edge. */
  node?: Maybe<Account>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByVerifierId: ProjectsConnection;
};


/** A `Account` edge in the connection, with data from `Project`. */
export type AccountAccountsByProjectDeveloperIdAndVerifierIdManyToManyEdgeProjectsByVerifierIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};

/** A connection to a list of `Account` values, with data from `Project`. */
export type AccountAccountsByProjectVerifierIdAndAdminAccountIdManyToManyConnection = {
  __typename?: 'AccountAccountsByProjectVerifierIdAndAdminAccountIdManyToManyConnection';
  /** A list of `Account` objects. */
  nodes: Array<Maybe<Account>>;
  /** A list of edges which contains the `Account`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<AccountAccountsByProjectVerifierIdAndAdminAccountIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Account` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Account` edge in the connection, with data from `Project`. */
export type AccountAccountsByProjectVerifierIdAndAdminAccountIdManyToManyEdge = {
  __typename?: 'AccountAccountsByProjectVerifierIdAndAdminAccountIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Account` at the end of the edge. */
  node?: Maybe<Account>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByAdminAccountId: ProjectsConnection;
};


/** A `Account` edge in the connection, with data from `Project`. */
export type AccountAccountsByProjectVerifierIdAndAdminAccountIdManyToManyEdgeProjectsByAdminAccountIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};

/** A connection to a list of `Account` values, with data from `Project`. */
export type AccountAccountsByProjectVerifierIdAndDeveloperIdManyToManyConnection = {
  __typename?: 'AccountAccountsByProjectVerifierIdAndDeveloperIdManyToManyConnection';
  /** A list of `Account` objects. */
  nodes: Array<Maybe<Account>>;
  /** A list of edges which contains the `Account`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<AccountAccountsByProjectVerifierIdAndDeveloperIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Account` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Account` edge in the connection, with data from `Project`. */
export type AccountAccountsByProjectVerifierIdAndDeveloperIdManyToManyEdge = {
  __typename?: 'AccountAccountsByProjectVerifierIdAndDeveloperIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Account` at the end of the edge. */
  node?: Maybe<Account>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByDeveloperId: ProjectsConnection;
};


/** A `Account` edge in the connection, with data from `Project`. */
export type AccountAccountsByProjectVerifierIdAndDeveloperIdManyToManyEdgeProjectsByDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};

/** A condition to be used against `Account` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type AccountCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `type` field. */
  type?: Maybe<AccountType>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `image` field. */
  image?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `bgImage` field. */
  bgImage?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `twitterLink` field. */
  twitterLink?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `websiteLink` field. */
  websiteLink?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `creatorId` field. */
  creatorId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `nonce` field. */
  nonce?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `addr` field. */
  addr?: Maybe<Scalars['String']>;
};

/** A connection to a list of `CreditClass` values, with data from `Project`. */
export type AccountCreditClassesByProjectAdminAccountIdAndCreditClassIdManyToManyConnection = {
  __typename?: 'AccountCreditClassesByProjectAdminAccountIdAndCreditClassIdManyToManyConnection';
  /** A list of `CreditClass` objects. */
  nodes: Array<Maybe<CreditClass>>;
  /** A list of edges which contains the `CreditClass`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<AccountCreditClassesByProjectAdminAccountIdAndCreditClassIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditClass` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditClass` edge in the connection, with data from `Project`. */
export type AccountCreditClassesByProjectAdminAccountIdAndCreditClassIdManyToManyEdge = {
  __typename?: 'AccountCreditClassesByProjectAdminAccountIdAndCreditClassIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditClass` at the end of the edge. */
  node?: Maybe<CreditClass>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreditClassId: ProjectsConnection;
};


/** A `CreditClass` edge in the connection, with data from `Project`. */
export type AccountCreditClassesByProjectAdminAccountIdAndCreditClassIdManyToManyEdgeProjectsByCreditClassIdArgs = {
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
export type AccountCreditClassesByProjectDeveloperIdAndCreditClassIdManyToManyConnection = {
  __typename?: 'AccountCreditClassesByProjectDeveloperIdAndCreditClassIdManyToManyConnection';
  /** A list of `CreditClass` objects. */
  nodes: Array<Maybe<CreditClass>>;
  /** A list of edges which contains the `CreditClass`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<AccountCreditClassesByProjectDeveloperIdAndCreditClassIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditClass` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditClass` edge in the connection, with data from `Project`. */
export type AccountCreditClassesByProjectDeveloperIdAndCreditClassIdManyToManyEdge = {
  __typename?: 'AccountCreditClassesByProjectDeveloperIdAndCreditClassIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditClass` at the end of the edge. */
  node?: Maybe<CreditClass>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreditClassId: ProjectsConnection;
};


/** A `CreditClass` edge in the connection, with data from `Project`. */
export type AccountCreditClassesByProjectDeveloperIdAndCreditClassIdManyToManyEdgeProjectsByCreditClassIdArgs = {
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
export type AccountCreditClassesByProjectVerifierIdAndCreditClassIdManyToManyConnection = {
  __typename?: 'AccountCreditClassesByProjectVerifierIdAndCreditClassIdManyToManyConnection';
  /** A list of `CreditClass` objects. */
  nodes: Array<Maybe<CreditClass>>;
  /** A list of edges which contains the `CreditClass`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<AccountCreditClassesByProjectVerifierIdAndCreditClassIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditClass` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditClass` edge in the connection, with data from `Project`. */
export type AccountCreditClassesByProjectVerifierIdAndCreditClassIdManyToManyEdge = {
  __typename?: 'AccountCreditClassesByProjectVerifierIdAndCreditClassIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditClass` at the end of the edge. */
  node?: Maybe<CreditClass>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreditClassId: ProjectsConnection;
};


/** A `CreditClass` edge in the connection, with data from `Project`. */
export type AccountCreditClassesByProjectVerifierIdAndCreditClassIdManyToManyEdgeProjectsByCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};

/** An input for mutations affecting `Account` */
export type AccountInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  type: AccountType;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  bgImage?: Maybe<Scalars['String']>;
  twitterLink?: Maybe<Scalars['String']>;
  websiteLink?: Maybe<Scalars['String']>;
  creatorId?: Maybe<Scalars['UUID']>;
  nonce?: Maybe<Scalars['String']>;
  addr?: Maybe<Scalars['String']>;
};

/** Represents an update to a `Account`. Fields that are set will be updated. */
export type AccountPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  type?: Maybe<AccountType>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  bgImage?: Maybe<Scalars['String']>;
  twitterLink?: Maybe<Scalars['String']>;
  websiteLink?: Maybe<Scalars['String']>;
  creatorId?: Maybe<Scalars['UUID']>;
  nonce?: Maybe<Scalars['String']>;
  addr?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Project` values, with data from `Post`. */
export type AccountProjectsByPostCreatorAccountIdAndProjectIdManyToManyConnection = {
  __typename?: 'AccountProjectsByPostCreatorAccountIdAndProjectIdManyToManyConnection';
  /** A list of `Project` objects. */
  nodes: Array<Maybe<Project>>;
  /** A list of edges which contains the `Project`, info from the `Post`, and the cursor to aid in pagination. */
  edges: Array<AccountProjectsByPostCreatorAccountIdAndProjectIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Project` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Project` edge in the connection, with data from `Post`. */
export type AccountProjectsByPostCreatorAccountIdAndProjectIdManyToManyEdge = {
  __typename?: 'AccountProjectsByPostCreatorAccountIdAndProjectIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Project` at the end of the edge. */
  node?: Maybe<Project>;
  /** Reads and enables pagination through a set of `Post`. */
  postsByProjectId: PostsConnection;
};


/** A `Project` edge in the connection, with data from `Post`. */
export type AccountProjectsByPostCreatorAccountIdAndProjectIdManyToManyEdgePostsByProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
};

/** A connection to a list of `Project` values, with data from `ProjectPartner`. */
export type AccountProjectsByProjectPartnerAccountIdAndProjectIdManyToManyConnection = {
  __typename?: 'AccountProjectsByProjectPartnerAccountIdAndProjectIdManyToManyConnection';
  /** A list of `Project` objects. */
  nodes: Array<Maybe<Project>>;
  /** A list of edges which contains the `Project`, info from the `ProjectPartner`, and the cursor to aid in pagination. */
  edges: Array<AccountProjectsByProjectPartnerAccountIdAndProjectIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Project` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Project` edge in the connection, with data from `ProjectPartner`. */
export type AccountProjectsByProjectPartnerAccountIdAndProjectIdManyToManyEdge = {
  __typename?: 'AccountProjectsByProjectPartnerAccountIdAndProjectIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Project` at the end of the edge. */
  node?: Maybe<Project>;
};

/** A connection to a list of `Project` values, with data from `Upload`. */
export type AccountProjectsByUploadAccountIdAndProjectIdManyToManyConnection = {
  __typename?: 'AccountProjectsByUploadAccountIdAndProjectIdManyToManyConnection';
  /** A list of `Project` objects. */
  nodes: Array<Maybe<Project>>;
  /** A list of edges which contains the `Project`, info from the `Upload`, and the cursor to aid in pagination. */
  edges: Array<AccountProjectsByUploadAccountIdAndProjectIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Project` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Project` edge in the connection, with data from `Upload`. */
export type AccountProjectsByUploadAccountIdAndProjectIdManyToManyEdge = {
  __typename?: 'AccountProjectsByUploadAccountIdAndProjectIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Project` at the end of the edge. */
  node?: Maybe<Project>;
  /** Reads and enables pagination through a set of `Upload`. */
  uploadsByProjectId: UploadsConnection;
};


/** A `Project` edge in the connection, with data from `Upload`. */
export type AccountProjectsByUploadAccountIdAndProjectIdManyToManyEdgeUploadsByProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UploadsOrderBy>>;
  condition?: Maybe<UploadCondition>;
};

export enum AccountType {
  User = 'USER',
  Organization = 'ORGANIZATION'
}

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
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  ImageAsc = 'IMAGE_ASC',
  ImageDesc = 'IMAGE_DESC',
  BgImageAsc = 'BG_IMAGE_ASC',
  BgImageDesc = 'BG_IMAGE_DESC',
  TwitterLinkAsc = 'TWITTER_LINK_ASC',
  TwitterLinkDesc = 'TWITTER_LINK_DESC',
  WebsiteLinkAsc = 'WEBSITE_LINK_ASC',
  WebsiteLinkDesc = 'WEBSITE_LINK_DESC',
  CreatorIdAsc = 'CREATOR_ID_ASC',
  CreatorIdDesc = 'CREATOR_ID_DESC',
  NonceAsc = 'NONCE_ASC',
  NonceDesc = 'NONCE_DESC',
  AddrAsc = 'ADDR_ASC',
  AddrDesc = 'ADDR_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}


export type Context = {
  __typename?: 'Context';
  column?: Maybe<Scalars['JSON']>;
};

/** A condition to be used against `Context` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ContextCondition = {
  /** Checks for equality with the object’s `column` field. */
  column?: Maybe<Scalars['JSON']>;
};

/** A filter to be used against `Context` object types. All fields are combined with a logical ‘and.’ */
export type ContextFilter = {
  /** Filter by the object’s `column` field. */
  column?: Maybe<JsonFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ContextFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ContextFilter>>;
  /** Negates the expression. */
  not?: Maybe<ContextFilter>;
};

/** A connection to a list of `Context` values. */
export type ContextsConnection = {
  __typename?: 'ContextsConnection';
  /** A list of `Context` objects. */
  nodes: Array<Maybe<Context>>;
  /** A list of edges which contains the `Context` and cursor to aid in pagination. */
  edges: Array<ContextsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Context` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Context` edge in the connection. */
export type ContextsEdge = {
  __typename?: 'ContextsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Context` at the end of the edge. */
  node?: Maybe<Context>;
};

/** Methods to use when ordering `Context`. */
export enum ContextsOrderBy {
  Natural = 'NATURAL',
  ColumnAsc = 'COLUMN_ASC',
  ColumnDesc = 'COLUMN_DESC'
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
  /** Reads a single `Account` that is related to this `Account`. */
  accountByCreatorId?: Maybe<Account>;
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
  /** Reads a single `Account` that is related to this `CreditClass`. */
  accountByRegistryId?: Maybe<Account>;
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
  /** Reads a single `Account` that is related to this `Organization`. */
  accountByAccountId?: Maybe<Account>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
};


/** The output of our create `Organization` mutation. */
export type CreateOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: Maybe<Array<OrganizationsOrderBy>>;
};

/** All input for the create `Post` mutation. */
export type CreatePostInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Post` to be created by this mutation. */
  post: PostInput;
};

/** The output of our create `Post` mutation. */
export type CreatePostPayload = {
  __typename?: 'CreatePostPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Post` that was created by this mutation. */
  post?: Maybe<Post>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Account` that is related to this `Post`. */
  accountByCreatorAccountId?: Maybe<Account>;
  /** Reads a single `Project` that is related to this `Post`. */
  projectByProjectId?: Maybe<Project>;
  /** An edge for our `Post`. May be used by Relay 1. */
  postEdge?: Maybe<PostsEdge>;
};


/** The output of our create `Post` mutation. */
export type CreatePostPayloadPostEdgeArgs = {
  orderBy?: Maybe<Array<PostsOrderBy>>;
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

/** All input for the create `ProjectPartner` mutation. */
export type CreateProjectPartnerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ProjectPartner` to be created by this mutation. */
  projectPartner: ProjectPartnerInput;
};

/** The output of our create `ProjectPartner` mutation. */
export type CreateProjectPartnerPayload = {
  __typename?: 'CreateProjectPartnerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ProjectPartner` that was created by this mutation. */
  projectPartner?: Maybe<ProjectPartner>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Project` that is related to this `ProjectPartner`. */
  projectByProjectId?: Maybe<Project>;
  /** Reads a single `Account` that is related to this `ProjectPartner`. */
  accountByAccountId?: Maybe<Account>;
  /** An edge for our `ProjectPartner`. May be used by Relay 1. */
  projectPartnerEdge?: Maybe<ProjectPartnersEdge>;
};


/** The output of our create `ProjectPartner` mutation. */
export type CreateProjectPartnerPayloadProjectPartnerEdgeArgs = {
  orderBy?: Maybe<Array<ProjectPartnersOrderBy>>;
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
  /** Reads a single `Account` that is related to this `Project`. */
  accountByDeveloperId?: Maybe<Account>;
  /** Reads a single `CreditClass` that is related to this `Project`. */
  creditClassByCreditClassId?: Maybe<CreditClass>;
  /** Reads a single `Account` that is related to this `Project`. */
  accountByVerifierId?: Maybe<Account>;
  /** Reads a single `Account` that is related to this `Project`. */
  accountByAdminAccountId?: Maybe<Account>;
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

/** All input for the create `Upload` mutation. */
export type CreateUploadInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Upload` to be created by this mutation. */
  upload: UploadInput;
};

/** The output of our create `Upload` mutation. */
export type CreateUploadPayload = {
  __typename?: 'CreateUploadPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Upload` that was created by this mutation. */
  upload?: Maybe<Upload>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Account` that is related to this `Upload`. */
  accountByAccountId?: Maybe<Account>;
  /** Reads a single `Project` that is related to this `Upload`. */
  projectByProjectId?: Maybe<Project>;
  /** An edge for our `Upload`. May be used by Relay 1. */
  uploadEdge?: Maybe<UploadsEdge>;
};


/** The output of our create `Upload` mutation. */
export type CreateUploadPayloadUploadEdgeArgs = {
  orderBy?: Maybe<Array<UploadsOrderBy>>;
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
  /** Reads a single `Account` that is related to this `CreditClass`. */
  accountByRegistryId?: Maybe<Account>;
  /** Reads and enables pagination through a set of `CreditClassVersion`. */
  creditClassVersionsById: CreditClassVersionsConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreditClassId: ProjectsConnection;
  /** Reads and enables pagination through a set of `Account`. */
  accountsByProjectCreditClassIdAndDeveloperId: CreditClassAccountsByProjectCreditClassIdAndDeveloperIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Account`. */
  accountsByProjectCreditClassIdAndVerifierId: CreditClassAccountsByProjectCreditClassIdAndVerifierIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Account`. */
  accountsByProjectCreditClassIdAndAdminAccountId: CreditClassAccountsByProjectCreditClassIdAndAdminAccountIdManyToManyConnection;
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


export type CreditClassAccountsByProjectCreditClassIdAndDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountsOrderBy>>;
  condition?: Maybe<AccountCondition>;
};


export type CreditClassAccountsByProjectCreditClassIdAndVerifierIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountsOrderBy>>;
  condition?: Maybe<AccountCondition>;
};


export type CreditClassAccountsByProjectCreditClassIdAndAdminAccountIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountsOrderBy>>;
  condition?: Maybe<AccountCondition>;
};

/** A connection to a list of `Account` values, with data from `Project`. */
export type CreditClassAccountsByProjectCreditClassIdAndAdminAccountIdManyToManyConnection = {
  __typename?: 'CreditClassAccountsByProjectCreditClassIdAndAdminAccountIdManyToManyConnection';
  /** A list of `Account` objects. */
  nodes: Array<Maybe<Account>>;
  /** A list of edges which contains the `Account`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<CreditClassAccountsByProjectCreditClassIdAndAdminAccountIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Account` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Account` edge in the connection, with data from `Project`. */
export type CreditClassAccountsByProjectCreditClassIdAndAdminAccountIdManyToManyEdge = {
  __typename?: 'CreditClassAccountsByProjectCreditClassIdAndAdminAccountIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Account` at the end of the edge. */
  node?: Maybe<Account>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByAdminAccountId: ProjectsConnection;
};


/** A `Account` edge in the connection, with data from `Project`. */
export type CreditClassAccountsByProjectCreditClassIdAndAdminAccountIdManyToManyEdgeProjectsByAdminAccountIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};

/** A connection to a list of `Account` values, with data from `Project`. */
export type CreditClassAccountsByProjectCreditClassIdAndDeveloperIdManyToManyConnection = {
  __typename?: 'CreditClassAccountsByProjectCreditClassIdAndDeveloperIdManyToManyConnection';
  /** A list of `Account` objects. */
  nodes: Array<Maybe<Account>>;
  /** A list of edges which contains the `Account`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<CreditClassAccountsByProjectCreditClassIdAndDeveloperIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Account` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Account` edge in the connection, with data from `Project`. */
export type CreditClassAccountsByProjectCreditClassIdAndDeveloperIdManyToManyEdge = {
  __typename?: 'CreditClassAccountsByProjectCreditClassIdAndDeveloperIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Account` at the end of the edge. */
  node?: Maybe<Account>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByDeveloperId: ProjectsConnection;
};


/** A `Account` edge in the connection, with data from `Project`. */
export type CreditClassAccountsByProjectCreditClassIdAndDeveloperIdManyToManyEdgeProjectsByDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
};

/** A connection to a list of `Account` values, with data from `Project`. */
export type CreditClassAccountsByProjectCreditClassIdAndVerifierIdManyToManyConnection = {
  __typename?: 'CreditClassAccountsByProjectCreditClassIdAndVerifierIdManyToManyConnection';
  /** A list of `Account` objects. */
  nodes: Array<Maybe<Account>>;
  /** A list of edges which contains the `Account`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<CreditClassAccountsByProjectCreditClassIdAndVerifierIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Account` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Account` edge in the connection, with data from `Project`. */
export type CreditClassAccountsByProjectCreditClassIdAndVerifierIdManyToManyEdge = {
  __typename?: 'CreditClassAccountsByProjectCreditClassIdAndVerifierIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Account` at the end of the edge. */
  node?: Maybe<Account>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByVerifierId: ProjectsConnection;
};


/** A `Account` edge in the connection, with data from `Project`. */
export type CreditClassAccountsByProjectCreditClassIdAndVerifierIdManyToManyEdgeProjectsByVerifierIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
  filter?: Maybe<ProjectFilter>;
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



/** All input for the `deleteAccountByAddr` mutation. */
export type DeleteAccountByAddrInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  addr: Scalars['String'];
};

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
  /** Reads a single `Account` that is related to this `Account`. */
  accountByCreatorId?: Maybe<Account>;
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
  /** Reads a single `Account` that is related to this `CreditClass`. */
  accountByRegistryId?: Maybe<Account>;
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

/** All input for the `deleteOrganizationByAccountId` mutation. */
export type DeleteOrganizationByAccountIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  accountId: Scalars['UUID'];
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
  /** Reads a single `Account` that is related to this `Organization`. */
  accountByAccountId?: Maybe<Account>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
};


/** The output of our delete `Organization` mutation. */
export type DeleteOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: Maybe<Array<OrganizationsOrderBy>>;
};

/** All input for the `deletePostByIri` mutation. */
export type DeletePostByIriInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  iri: Scalars['String'];
};

/** All input for the `deletePost` mutation. */
export type DeletePostInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Post` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Post` mutation. */
export type DeletePostPayload = {
  __typename?: 'DeletePostPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Post` that was deleted by this mutation. */
  post?: Maybe<Post>;
  deletedPostId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Account` that is related to this `Post`. */
  accountByCreatorAccountId?: Maybe<Account>;
  /** Reads a single `Project` that is related to this `Post`. */
  projectByProjectId?: Maybe<Project>;
  /** An edge for our `Post`. May be used by Relay 1. */
  postEdge?: Maybe<PostsEdge>;
};


/** The output of our delete `Post` mutation. */
export type DeletePostPayloadPostEdgeArgs = {
  orderBy?: Maybe<Array<PostsOrderBy>>;
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

/** All input for the `deleteProjectBySlug` mutation. */
export type DeleteProjectBySlugInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
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

/** All input for the `deleteProjectPartnerByProjectIdAndAccountId` mutation. */
export type DeleteProjectPartnerByProjectIdAndAccountIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  projectId: Scalars['UUID'];
  accountId: Scalars['UUID'];
};

/** All input for the `deleteProjectPartner` mutation. */
export type DeleteProjectPartnerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ProjectPartner` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `ProjectPartner` mutation. */
export type DeleteProjectPartnerPayload = {
  __typename?: 'DeleteProjectPartnerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ProjectPartner` that was deleted by this mutation. */
  projectPartner?: Maybe<ProjectPartner>;
  deletedProjectPartnerId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Project` that is related to this `ProjectPartner`. */
  projectByProjectId?: Maybe<Project>;
  /** Reads a single `Account` that is related to this `ProjectPartner`. */
  accountByAccountId?: Maybe<Account>;
  /** An edge for our `ProjectPartner`. May be used by Relay 1. */
  projectPartnerEdge?: Maybe<ProjectPartnersEdge>;
};


/** The output of our delete `ProjectPartner` mutation. */
export type DeleteProjectPartnerPayloadProjectPartnerEdgeArgs = {
  orderBy?: Maybe<Array<ProjectPartnersOrderBy>>;
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
  /** Reads a single `Account` that is related to this `Project`. */
  accountByDeveloperId?: Maybe<Account>;
  /** Reads a single `CreditClass` that is related to this `Project`. */
  creditClassByCreditClassId?: Maybe<CreditClass>;
  /** Reads a single `Account` that is related to this `Project`. */
  accountByVerifierId?: Maybe<Account>;
  /** Reads a single `Account` that is related to this `Project`. */
  accountByAdminAccountId?: Maybe<Account>;
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

/** All input for the `deleteUploadByIri` mutation. */
export type DeleteUploadByIriInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  iri: Scalars['String'];
};

/** All input for the `deleteUploadByUrl` mutation. */
export type DeleteUploadByUrlInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

/** All input for the `deleteUpload` mutation. */
export type DeleteUploadInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Upload` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Upload` mutation. */
export type DeleteUploadPayload = {
  __typename?: 'DeleteUploadPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Upload` that was deleted by this mutation. */
  upload?: Maybe<Upload>;
  deletedUploadId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Account` that is related to this `Upload`. */
  accountByAccountId?: Maybe<Account>;
  /** Reads a single `Project` that is related to this `Upload`. */
  projectByProjectId?: Maybe<Project>;
  /** An edge for our `Upload`. May be used by Relay 1. */
  uploadEdge?: Maybe<UploadsEdge>;
};


/** The output of our delete `Upload` mutation. */
export type DeleteUploadPayloadUploadEdgeArgs = {
  orderBy?: Maybe<Array<UploadsOrderBy>>;
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
  /** Creates a single `Post`. */
  createPost?: Maybe<CreatePostPayload>;
  /** Creates a single `Project`. */
  createProject?: Maybe<CreateProjectPayload>;
  /** Creates a single `ProjectPartner`. */
  createProjectPartner?: Maybe<CreateProjectPartnerPayload>;
  /** Creates a single `ShaclGraph`. */
  createShaclGraph?: Maybe<CreateShaclGraphPayload>;
  /** Creates a single `Upload`. */
  createUpload?: Maybe<CreateUploadPayload>;
  /** Updates a single `Account` using its globally unique id and a patch. */
  updateAccount?: Maybe<UpdateAccountPayload>;
  /** Updates a single `Account` using a unique key and a patch. */
  updateAccountById?: Maybe<UpdateAccountPayload>;
  /** Updates a single `Account` using a unique key and a patch. */
  updateAccountByAddr?: Maybe<UpdateAccountPayload>;
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
  updateOrganizationByAccountId?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `Post` using its globally unique id and a patch. */
  updatePost?: Maybe<UpdatePostPayload>;
  /** Updates a single `Post` using a unique key and a patch. */
  updatePostByIri?: Maybe<UpdatePostPayload>;
  /** Updates a single `Project` using its globally unique id and a patch. */
  updateProject?: Maybe<UpdateProjectPayload>;
  /** Updates a single `Project` using a unique key and a patch. */
  updateProjectById?: Maybe<UpdateProjectPayload>;
  /** Updates a single `Project` using a unique key and a patch. */
  updateProjectBySlug?: Maybe<UpdateProjectPayload>;
  /** Updates a single `Project` using a unique key and a patch. */
  updateProjectByOnChainId?: Maybe<UpdateProjectPayload>;
  /** Updates a single `ProjectPartner` using its globally unique id and a patch. */
  updateProjectPartner?: Maybe<UpdateProjectPartnerPayload>;
  /** Updates a single `ProjectPartner` using a unique key and a patch. */
  updateProjectPartnerByProjectIdAndAccountId?: Maybe<UpdateProjectPartnerPayload>;
  /** Updates a single `ShaclGraph` using its globally unique id and a patch. */
  updateShaclGraph?: Maybe<UpdateShaclGraphPayload>;
  /** Updates a single `ShaclGraph` using a unique key and a patch. */
  updateShaclGraphByUri?: Maybe<UpdateShaclGraphPayload>;
  /** Updates a single `Upload` using its globally unique id and a patch. */
  updateUpload?: Maybe<UpdateUploadPayload>;
  /** Updates a single `Upload` using a unique key and a patch. */
  updateUploadByIri?: Maybe<UpdateUploadPayload>;
  /** Updates a single `Upload` using a unique key and a patch. */
  updateUploadByUrl?: Maybe<UpdateUploadPayload>;
  /** Deletes a single `Account` using its globally unique id. */
  deleteAccount?: Maybe<DeleteAccountPayload>;
  /** Deletes a single `Account` using a unique key. */
  deleteAccountById?: Maybe<DeleteAccountPayload>;
  /** Deletes a single `Account` using a unique key. */
  deleteAccountByAddr?: Maybe<DeleteAccountPayload>;
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
  deleteOrganizationByAccountId?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `Post` using its globally unique id. */
  deletePost?: Maybe<DeletePostPayload>;
  /** Deletes a single `Post` using a unique key. */
  deletePostByIri?: Maybe<DeletePostPayload>;
  /** Deletes a single `Project` using its globally unique id. */
  deleteProject?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `Project` using a unique key. */
  deleteProjectById?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `Project` using a unique key. */
  deleteProjectBySlug?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `Project` using a unique key. */
  deleteProjectByOnChainId?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `ProjectPartner` using its globally unique id. */
  deleteProjectPartner?: Maybe<DeleteProjectPartnerPayload>;
  /** Deletes a single `ProjectPartner` using a unique key. */
  deleteProjectPartnerByProjectIdAndAccountId?: Maybe<DeleteProjectPartnerPayload>;
  /** Deletes a single `ShaclGraph` using its globally unique id. */
  deleteShaclGraph?: Maybe<DeleteShaclGraphPayload>;
  /** Deletes a single `ShaclGraph` using a unique key. */
  deleteShaclGraphByUri?: Maybe<DeleteShaclGraphPayload>;
  /** Deletes a single `Upload` using its globally unique id. */
  deleteUpload?: Maybe<DeleteUploadPayload>;
  /** Deletes a single `Upload` using a unique key. */
  deleteUploadByIri?: Maybe<DeleteUploadPayload>;
  /** Deletes a single `Upload` using a unique key. */
  deleteUploadByUrl?: Maybe<DeleteUploadPayload>;
  shuffle?: Maybe<ShufflePayload>;
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
export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateProjectPartnerArgs = {
  input: CreateProjectPartnerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateShaclGraphArgs = {
  input: CreateShaclGraphInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUploadArgs = {
  input: CreateUploadInput;
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
export type MutationUpdateAccountByAddrArgs = {
  input: UpdateAccountByAddrInput;
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
export type MutationUpdateOrganizationByAccountIdArgs = {
  input: UpdateOrganizationByAccountIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePostByIriArgs = {
  input: UpdatePostByIriInput;
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
export type MutationUpdateProjectBySlugArgs = {
  input: UpdateProjectBySlugInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectByOnChainIdArgs = {
  input: UpdateProjectByOnChainIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectPartnerArgs = {
  input: UpdateProjectPartnerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectPartnerByProjectIdAndAccountIdArgs = {
  input: UpdateProjectPartnerByProjectIdAndAccountIdInput;
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
export type MutationUpdateUploadArgs = {
  input: UpdateUploadInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUploadByIriArgs = {
  input: UpdateUploadByIriInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUploadByUrlArgs = {
  input: UpdateUploadByUrlInput;
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
export type MutationDeleteAccountByAddrArgs = {
  input: DeleteAccountByAddrInput;
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
export type MutationDeleteOrganizationByAccountIdArgs = {
  input: DeleteOrganizationByAccountIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePostArgs = {
  input: DeletePostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePostByIriArgs = {
  input: DeletePostByIriInput;
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
export type MutationDeleteProjectBySlugArgs = {
  input: DeleteProjectBySlugInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectByOnChainIdArgs = {
  input: DeleteProjectByOnChainIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectPartnerArgs = {
  input: DeleteProjectPartnerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectPartnerByProjectIdAndAccountIdArgs = {
  input: DeleteProjectPartnerByProjectIdAndAccountIdInput;
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
export type MutationDeleteUploadArgs = {
  input: DeleteUploadInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUploadByIriArgs = {
  input: DeleteUploadByIriInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUploadByUrlArgs = {
  input: DeleteUploadByUrlInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationShuffleArgs = {
  input: ShuffleInput;
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
  accountId: Scalars['UUID'];
  legalName: Scalars['String'];
  /** Reads a single `Account` that is related to this `Organization`. */
  accountByAccountId?: Maybe<Account>;
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
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `legalName` field. */
  legalName?: Maybe<Scalars['String']>;
};

/** An input for mutations affecting `Organization` */
export type OrganizationInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  accountId: Scalars['UUID'];
  legalName?: Maybe<Scalars['String']>;
};

/** Represents an update to a `Organization`. Fields that are set will be updated. */
export type OrganizationPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  accountId?: Maybe<Scalars['UUID']>;
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
  AccountIdAsc = 'ACCOUNT_ID_ASC',
  AccountIdDesc = 'ACCOUNT_ID_DESC',
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

/** Project posts */
export type Post = Node & {
  __typename?: 'Post';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  iri: Scalars['String'];
  createdAt?: Maybe<Scalars['Datetime']>;
  creatorAccountId: Scalars['UUID'];
  projectId: Scalars['UUID'];
  privacy: PostPrivacy;
  contents: Scalars['JSON'];
  /** Reads a single `Account` that is related to this `Post`. */
  accountByCreatorAccountId?: Maybe<Account>;
  /** Reads a single `Project` that is related to this `Post`. */
  projectByProjectId?: Maybe<Project>;
};

/** A condition to be used against `Post` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PostCondition = {
  /** Checks for equality with the object’s `iri` field. */
  iri?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `creatorAccountId` field. */
  creatorAccountId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `privacy` field. */
  privacy?: Maybe<PostPrivacy>;
  /** Checks for equality with the object’s `contents` field. */
  contents?: Maybe<Scalars['JSON']>;
};

/** A filter to be used against `Post` object types. All fields are combined with a logical ‘and.’ */
export type PostFilter = {
  /** Filter by the object’s `contents` field. */
  contents?: Maybe<JsonFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<PostFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<PostFilter>>;
  /** Negates the expression. */
  not?: Maybe<PostFilter>;
};

/** An input for mutations affecting `Post` */
export type PostInput = {
  iri: Scalars['String'];
  createdAt?: Maybe<Scalars['Datetime']>;
  creatorAccountId: Scalars['UUID'];
  projectId: Scalars['UUID'];
  privacy?: Maybe<PostPrivacy>;
  contents: Scalars['JSON'];
};

/** Represents an update to a `Post`. Fields that are set will be updated. */
export type PostPatch = {
  iri?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  creatorAccountId?: Maybe<Scalars['UUID']>;
  projectId?: Maybe<Scalars['UUID']>;
  privacy?: Maybe<PostPrivacy>;
  contents?: Maybe<Scalars['JSON']>;
};

/**
 * private: post data including files are private,
 *    private_files: files including location data are private,
 *    private_locations: location data is private,
 *    public: post data including files are public
 */
export enum PostPrivacy {
  Private = 'PRIVATE',
  PrivateFiles = 'PRIVATE_FILES',
  PrivateLocations = 'PRIVATE_LOCATIONS',
  Public = 'PUBLIC'
}

/** A connection to a list of `Post` values. */
export type PostsConnection = {
  __typename?: 'PostsConnection';
  /** A list of `Post` objects. */
  nodes: Array<Maybe<Post>>;
  /** A list of edges which contains the `Post` and cursor to aid in pagination. */
  edges: Array<PostsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Post` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Post` edge in the connection. */
export type PostsEdge = {
  __typename?: 'PostsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Post` at the end of the edge. */
  node?: Maybe<Post>;
};

/** Methods to use when ordering `Post`. */
export enum PostsOrderBy {
  Natural = 'NATURAL',
  IriAsc = 'IRI_ASC',
  IriDesc = 'IRI_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  CreatorAccountIdAsc = 'CREATOR_ACCOUNT_ID_ASC',
  CreatorAccountIdDesc = 'CREATOR_ACCOUNT_ID_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  PrivacyAsc = 'PRIVACY_ASC',
  PrivacyDesc = 'PRIVACY_DESC',
  ContentsAsc = 'CONTENTS_ASC',
  ContentsDesc = 'CONTENTS_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

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
  slug?: Maybe<Scalars['String']>;
  onChainId?: Maybe<Scalars['String']>;
  verifierId?: Maybe<Scalars['UUID']>;
  approved?: Maybe<Scalars['Boolean']>;
  published?: Maybe<Scalars['Boolean']>;
  adminAccountId?: Maybe<Scalars['UUID']>;
  /** Reads a single `Account` that is related to this `Project`. */
  accountByDeveloperId?: Maybe<Account>;
  /** Reads a single `CreditClass` that is related to this `Project`. */
  creditClassByCreditClassId?: Maybe<CreditClass>;
  /** Reads a single `Account` that is related to this `Project`. */
  accountByVerifierId?: Maybe<Account>;
  /** Reads a single `Account` that is related to this `Project`. */
  accountByAdminAccountId?: Maybe<Account>;
  /** Reads and enables pagination through a set of `CreditBatch`. */
  creditBatchesByProjectId: CreditBatchesConnection;
  /** Reads and enables pagination through a set of `Document`. */
  documentsByProjectId: DocumentsConnection;
  /** Reads and enables pagination through a set of `Upload`. */
  uploadsByProjectId: UploadsConnection;
  /** Reads and enables pagination through a set of `Post`. */
  postsByProjectId: PostsConnection;
  /** Reads and enables pagination through a set of `ProjectPartner`. */
  projectPartnersByProjectId: ProjectPartnersConnection;
  /** Reads and enables pagination through a set of `Account`. */
  accountsByUploadProjectIdAndAccountId: ProjectAccountsByUploadProjectIdAndAccountIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Account`. */
  accountsByPostProjectIdAndCreatorAccountId: ProjectAccountsByPostProjectIdAndCreatorAccountIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Account`. */
  accountsByProjectPartnerProjectIdAndAccountId: ProjectAccountsByProjectPartnerProjectIdAndAccountIdManyToManyConnection;
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


export type ProjectUploadsByProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UploadsOrderBy>>;
  condition?: Maybe<UploadCondition>;
};


export type ProjectPostsByProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
};


export type ProjectProjectPartnersByProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectPartnersOrderBy>>;
  condition?: Maybe<ProjectPartnerCondition>;
};


export type ProjectAccountsByUploadProjectIdAndAccountIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountsOrderBy>>;
  condition?: Maybe<AccountCondition>;
};


export type ProjectAccountsByPostProjectIdAndCreatorAccountIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountsOrderBy>>;
  condition?: Maybe<AccountCondition>;
};


export type ProjectAccountsByProjectPartnerProjectIdAndAccountIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountsOrderBy>>;
  condition?: Maybe<AccountCondition>;
};

/** A connection to a list of `Account` values, with data from `Post`. */
export type ProjectAccountsByPostProjectIdAndCreatorAccountIdManyToManyConnection = {
  __typename?: 'ProjectAccountsByPostProjectIdAndCreatorAccountIdManyToManyConnection';
  /** A list of `Account` objects. */
  nodes: Array<Maybe<Account>>;
  /** A list of edges which contains the `Account`, info from the `Post`, and the cursor to aid in pagination. */
  edges: Array<ProjectAccountsByPostProjectIdAndCreatorAccountIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Account` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Account` edge in the connection, with data from `Post`. */
export type ProjectAccountsByPostProjectIdAndCreatorAccountIdManyToManyEdge = {
  __typename?: 'ProjectAccountsByPostProjectIdAndCreatorAccountIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Account` at the end of the edge. */
  node?: Maybe<Account>;
  /** Reads and enables pagination through a set of `Post`. */
  postsByCreatorAccountId: PostsConnection;
};


/** A `Account` edge in the connection, with data from `Post`. */
export type ProjectAccountsByPostProjectIdAndCreatorAccountIdManyToManyEdgePostsByCreatorAccountIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
};

/** A connection to a list of `Account` values, with data from `ProjectPartner`. */
export type ProjectAccountsByProjectPartnerProjectIdAndAccountIdManyToManyConnection = {
  __typename?: 'ProjectAccountsByProjectPartnerProjectIdAndAccountIdManyToManyConnection';
  /** A list of `Account` objects. */
  nodes: Array<Maybe<Account>>;
  /** A list of edges which contains the `Account`, info from the `ProjectPartner`, and the cursor to aid in pagination. */
  edges: Array<ProjectAccountsByProjectPartnerProjectIdAndAccountIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Account` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Account` edge in the connection, with data from `ProjectPartner`. */
export type ProjectAccountsByProjectPartnerProjectIdAndAccountIdManyToManyEdge = {
  __typename?: 'ProjectAccountsByProjectPartnerProjectIdAndAccountIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Account` at the end of the edge. */
  node?: Maybe<Account>;
};

/** A connection to a list of `Account` values, with data from `Upload`. */
export type ProjectAccountsByUploadProjectIdAndAccountIdManyToManyConnection = {
  __typename?: 'ProjectAccountsByUploadProjectIdAndAccountIdManyToManyConnection';
  /** A list of `Account` objects. */
  nodes: Array<Maybe<Account>>;
  /** A list of edges which contains the `Account`, info from the `Upload`, and the cursor to aid in pagination. */
  edges: Array<ProjectAccountsByUploadProjectIdAndAccountIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Account` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Account` edge in the connection, with data from `Upload`. */
export type ProjectAccountsByUploadProjectIdAndAccountIdManyToManyEdge = {
  __typename?: 'ProjectAccountsByUploadProjectIdAndAccountIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Account` at the end of the edge. */
  node?: Maybe<Account>;
  /** Reads and enables pagination through a set of `Upload`. */
  uploadsByAccountId: UploadsConnection;
};


/** A `Account` edge in the connection, with data from `Upload`. */
export type ProjectAccountsByUploadProjectIdAndAccountIdManyToManyEdgeUploadsByAccountIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UploadsOrderBy>>;
  condition?: Maybe<UploadCondition>;
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
  /** Checks for equality with the object’s `slug` field. */
  slug?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `onChainId` field. */
  onChainId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `verifierId` field. */
  verifierId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `approved` field. */
  approved?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `published` field. */
  published?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `adminAccountId` field. */
  adminAccountId?: Maybe<Scalars['UUID']>;
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
  slug?: Maybe<Scalars['String']>;
  onChainId?: Maybe<Scalars['String']>;
  verifierId?: Maybe<Scalars['UUID']>;
  approved?: Maybe<Scalars['Boolean']>;
  published?: Maybe<Scalars['Boolean']>;
  adminAccountId?: Maybe<Scalars['UUID']>;
};

export type ProjectPartner = Node & {
  __typename?: 'ProjectPartner';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  projectId: Scalars['UUID'];
  accountId: Scalars['UUID'];
  /** Reads a single `Project` that is related to this `ProjectPartner`. */
  projectByProjectId?: Maybe<Project>;
  /** Reads a single `Account` that is related to this `ProjectPartner`. */
  accountByAccountId?: Maybe<Account>;
};

/**
 * A condition to be used against `ProjectPartner` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ProjectPartnerCondition = {
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: Maybe<Scalars['UUID']>;
};

/** An input for mutations affecting `ProjectPartner` */
export type ProjectPartnerInput = {
  projectId: Scalars['UUID'];
  accountId: Scalars['UUID'];
};

/** Represents an update to a `ProjectPartner`. Fields that are set will be updated. */
export type ProjectPartnerPatch = {
  projectId?: Maybe<Scalars['UUID']>;
  accountId?: Maybe<Scalars['UUID']>;
};

/** A connection to a list of `ProjectPartner` values. */
export type ProjectPartnersConnection = {
  __typename?: 'ProjectPartnersConnection';
  /** A list of `ProjectPartner` objects. */
  nodes: Array<Maybe<ProjectPartner>>;
  /** A list of edges which contains the `ProjectPartner` and cursor to aid in pagination. */
  edges: Array<ProjectPartnersEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ProjectPartner` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `ProjectPartner` edge in the connection. */
export type ProjectPartnersEdge = {
  __typename?: 'ProjectPartnersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ProjectPartner` at the end of the edge. */
  node?: Maybe<ProjectPartner>;
};

/** Methods to use when ordering `ProjectPartner`. */
export enum ProjectPartnersOrderBy {
  Natural = 'NATURAL',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  AccountIdAsc = 'ACCOUNT_ID_ASC',
  AccountIdDesc = 'ACCOUNT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** Represents an update to a `Project`. Fields that are set will be updated. */
export type ProjectPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  developerId?: Maybe<Scalars['UUID']>;
  creditClassId?: Maybe<Scalars['UUID']>;
  metadata?: Maybe<Scalars['JSON']>;
  slug?: Maybe<Scalars['String']>;
  onChainId?: Maybe<Scalars['String']>;
  verifierId?: Maybe<Scalars['UUID']>;
  approved?: Maybe<Scalars['Boolean']>;
  published?: Maybe<Scalars['Boolean']>;
  adminAccountId?: Maybe<Scalars['UUID']>;
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
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
  OnChainIdAsc = 'ON_CHAIN_ID_ASC',
  OnChainIdDesc = 'ON_CHAIN_ID_DESC',
  VerifierIdAsc = 'VERIFIER_ID_ASC',
  VerifierIdDesc = 'VERIFIER_ID_DESC',
  ApprovedAsc = 'APPROVED_ASC',
  ApprovedDesc = 'APPROVED_DESC',
  PublishedAsc = 'PUBLISHED_ASC',
  PublishedDesc = 'PUBLISHED_DESC',
  AdminAccountIdAsc = 'ADMIN_ACCOUNT_ID_ASC',
  AdminAccountIdDesc = 'ADMIN_ACCOUNT_ID_DESC',
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
  /** Reads and enables pagination through a set of `Context`. */
  allContexts?: Maybe<ContextsConnection>;
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
  /** Reads and enables pagination through a set of `Post`. */
  allPosts?: Maybe<PostsConnection>;
  /** Reads and enables pagination through a set of `Project`. */
  allProjects?: Maybe<ProjectsConnection>;
  /** Reads and enables pagination through a set of `ProjectPartner`. */
  allProjectPartners?: Maybe<ProjectPartnersConnection>;
  /** Reads and enables pagination through a set of `ShaclGraph`. */
  allShaclGraphs?: Maybe<ShaclGraphsConnection>;
  /** Reads and enables pagination through a set of `Upload`. */
  allUploads?: Maybe<UploadsConnection>;
  accountById?: Maybe<Account>;
  accountByAddr?: Maybe<Account>;
  creditBatchById?: Maybe<CreditBatch>;
  creditBatchByBatchDenom?: Maybe<CreditBatch>;
  creditClassById?: Maybe<CreditClass>;
  creditClassByUri?: Maybe<CreditClass>;
  creditClassByOnChainId?: Maybe<CreditClass>;
  creditClassVersionByIdAndCreatedAt?: Maybe<CreditClassVersion>;
  documentById?: Maybe<Document>;
  metadataGraphByIri?: Maybe<MetadataGraph>;
  organizationById?: Maybe<Organization>;
  organizationByAccountId?: Maybe<Organization>;
  postByIri?: Maybe<Post>;
  projectById?: Maybe<Project>;
  projectBySlug?: Maybe<Project>;
  projectByOnChainId?: Maybe<Project>;
  projectPartnerByProjectIdAndAccountId?: Maybe<ProjectPartner>;
  shaclGraphByUri?: Maybe<ShaclGraph>;
  uploadByIri?: Maybe<Upload>;
  uploadByUrl?: Maybe<Upload>;
  /** Reads and enables pagination through a set of `Account`. */
  getAccountsByNameOrAddr?: Maybe<AccountsConnection>;
  getCurrentAccount?: Maybe<Account>;
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
  /** Reads a single `Post` using its globally unique `ID`. */
  post?: Maybe<Post>;
  /** Reads a single `Project` using its globally unique `ID`. */
  project?: Maybe<Project>;
  /** Reads a single `ProjectPartner` using its globally unique `ID`. */
  projectPartner?: Maybe<ProjectPartner>;
  /** Reads a single `ShaclGraph` using its globally unique `ID`. */
  shaclGraph?: Maybe<ShaclGraph>;
  /** Reads a single `Upload` using its globally unique `ID`. */
  upload?: Maybe<Upload>;
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
export type QueryAllContextsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ContextsOrderBy>>;
  condition?: Maybe<ContextCondition>;
  filter?: Maybe<ContextFilter>;
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
export type QueryAllPostsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
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
export type QueryAllProjectPartnersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectPartnersOrderBy>>;
  condition?: Maybe<ProjectPartnerCondition>;
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
export type QueryAllUploadsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UploadsOrderBy>>;
  condition?: Maybe<UploadCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountByAddrArgs = {
  addr: Scalars['String'];
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
export type QueryOrganizationByAccountIdArgs = {
  accountId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPostByIriArgs = {
  iri: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectBySlugArgs = {
  slug: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectByOnChainIdArgs = {
  onChainId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectPartnerByProjectIdAndAccountIdArgs = {
  projectId: Scalars['UUID'];
  accountId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryShaclGraphByUriArgs = {
  uri: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUploadByIriArgs = {
  iri: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUploadByUrlArgs = {
  url: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGetAccountsByNameOrAddrArgs = {
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
export type QueryPostArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectPartnerArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryShaclGraphArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUploadArgs = {
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

/** All input for the `shuffle` mutation. */
export type ShuffleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  arg0?: Maybe<Scalars['String']>;
};

/** The output of our `shuffle` mutation. */
export type ShufflePayload = {
  __typename?: 'ShufflePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  string?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** All input for the `updateAccountByAddr` mutation. */
export type UpdateAccountByAddrInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Account` being updated. */
  accountPatch: AccountPatch;
  addr: Scalars['String'];
};

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
  /** Reads a single `Account` that is related to this `Account`. */
  accountByCreatorId?: Maybe<Account>;
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
  /** Reads a single `Account` that is related to this `CreditClass`. */
  accountByRegistryId?: Maybe<Account>;
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

/** All input for the `updateOrganizationByAccountId` mutation. */
export type UpdateOrganizationByAccountIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Organization` being updated. */
  organizationPatch: OrganizationPatch;
  accountId: Scalars['UUID'];
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
  /** Reads a single `Account` that is related to this `Organization`. */
  accountByAccountId?: Maybe<Account>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
};


/** The output of our update `Organization` mutation. */
export type UpdateOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: Maybe<Array<OrganizationsOrderBy>>;
};

/** All input for the `updatePostByIri` mutation. */
export type UpdatePostByIriInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Post` being updated. */
  postPatch: PostPatch;
  iri: Scalars['String'];
};

/** All input for the `updatePost` mutation. */
export type UpdatePostInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Post` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Post` being updated. */
  postPatch: PostPatch;
};

/** The output of our update `Post` mutation. */
export type UpdatePostPayload = {
  __typename?: 'UpdatePostPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Post` that was updated by this mutation. */
  post?: Maybe<Post>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Account` that is related to this `Post`. */
  accountByCreatorAccountId?: Maybe<Account>;
  /** Reads a single `Project` that is related to this `Post`. */
  projectByProjectId?: Maybe<Project>;
  /** An edge for our `Post`. May be used by Relay 1. */
  postEdge?: Maybe<PostsEdge>;
};


/** The output of our update `Post` mutation. */
export type UpdatePostPayloadPostEdgeArgs = {
  orderBy?: Maybe<Array<PostsOrderBy>>;
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

/** All input for the `updateProjectBySlug` mutation. */
export type UpdateProjectBySlugInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Project` being updated. */
  projectPatch: ProjectPatch;
  slug: Scalars['String'];
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

/** All input for the `updateProjectPartnerByProjectIdAndAccountId` mutation. */
export type UpdateProjectPartnerByProjectIdAndAccountIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `ProjectPartner` being updated. */
  projectPartnerPatch: ProjectPartnerPatch;
  projectId: Scalars['UUID'];
  accountId: Scalars['UUID'];
};

/** All input for the `updateProjectPartner` mutation. */
export type UpdateProjectPartnerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ProjectPartner` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `ProjectPartner` being updated. */
  projectPartnerPatch: ProjectPartnerPatch;
};

/** The output of our update `ProjectPartner` mutation. */
export type UpdateProjectPartnerPayload = {
  __typename?: 'UpdateProjectPartnerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ProjectPartner` that was updated by this mutation. */
  projectPartner?: Maybe<ProjectPartner>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Project` that is related to this `ProjectPartner`. */
  projectByProjectId?: Maybe<Project>;
  /** Reads a single `Account` that is related to this `ProjectPartner`. */
  accountByAccountId?: Maybe<Account>;
  /** An edge for our `ProjectPartner`. May be used by Relay 1. */
  projectPartnerEdge?: Maybe<ProjectPartnersEdge>;
};


/** The output of our update `ProjectPartner` mutation. */
export type UpdateProjectPartnerPayloadProjectPartnerEdgeArgs = {
  orderBy?: Maybe<Array<ProjectPartnersOrderBy>>;
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
  /** Reads a single `Account` that is related to this `Project`. */
  accountByDeveloperId?: Maybe<Account>;
  /** Reads a single `CreditClass` that is related to this `Project`. */
  creditClassByCreditClassId?: Maybe<CreditClass>;
  /** Reads a single `Account` that is related to this `Project`. */
  accountByVerifierId?: Maybe<Account>;
  /** Reads a single `Account` that is related to this `Project`. */
  accountByAdminAccountId?: Maybe<Account>;
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

/** All input for the `updateUploadByIri` mutation. */
export type UpdateUploadByIriInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Upload` being updated. */
  uploadPatch: UploadPatch;
  iri: Scalars['String'];
};

/** All input for the `updateUploadByUrl` mutation. */
export type UpdateUploadByUrlInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Upload` being updated. */
  uploadPatch: UploadPatch;
  url: Scalars['String'];
};

/** All input for the `updateUpload` mutation. */
export type UpdateUploadInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Upload` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Upload` being updated. */
  uploadPatch: UploadPatch;
};

/** The output of our update `Upload` mutation. */
export type UpdateUploadPayload = {
  __typename?: 'UpdateUploadPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Upload` that was updated by this mutation. */
  upload?: Maybe<Upload>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Account` that is related to this `Upload`. */
  accountByAccountId?: Maybe<Account>;
  /** Reads a single `Project` that is related to this `Upload`. */
  projectByProjectId?: Maybe<Project>;
  /** An edge for our `Upload`. May be used by Relay 1. */
  uploadEdge?: Maybe<UploadsEdge>;
};


/** The output of our update `Upload` mutation. */
export type UpdateUploadPayloadUploadEdgeArgs = {
  orderBy?: Maybe<Array<UploadsOrderBy>>;
};

/** Storage tracking for project media uploads */
export type Upload = Node & {
  __typename?: 'Upload';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  iri: Scalars['String'];
  createdAt?: Maybe<Scalars['Datetime']>;
  url: Scalars['String'];
  size: Scalars['Int'];
  mimetype: Scalars['String'];
  accountId: Scalars['UUID'];
  projectId: Scalars['UUID'];
  /** Reads a single `Account` that is related to this `Upload`. */
  accountByAccountId?: Maybe<Account>;
  /** Reads a single `Project` that is related to this `Upload`. */
  projectByProjectId?: Maybe<Project>;
};

/** A condition to be used against `Upload` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UploadCondition = {
  /** Checks for equality with the object’s `iri` field. */
  iri?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `url` field. */
  url?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `size` field. */
  size?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `mimetype` field. */
  mimetype?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: Maybe<Scalars['UUID']>;
};

/** An input for mutations affecting `Upload` */
export type UploadInput = {
  iri: Scalars['String'];
  createdAt?: Maybe<Scalars['Datetime']>;
  url: Scalars['String'];
  size: Scalars['Int'];
  mimetype: Scalars['String'];
  accountId: Scalars['UUID'];
  projectId: Scalars['UUID'];
};

/** Represents an update to a `Upload`. Fields that are set will be updated. */
export type UploadPatch = {
  iri?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  url?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  mimetype?: Maybe<Scalars['String']>;
  accountId?: Maybe<Scalars['UUID']>;
  projectId?: Maybe<Scalars['UUID']>;
};

/** A connection to a list of `Upload` values. */
export type UploadsConnection = {
  __typename?: 'UploadsConnection';
  /** A list of `Upload` objects. */
  nodes: Array<Maybe<Upload>>;
  /** A list of edges which contains the `Upload` and cursor to aid in pagination. */
  edges: Array<UploadsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Upload` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Upload` edge in the connection. */
export type UploadsEdge = {
  __typename?: 'UploadsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Upload` at the end of the edge. */
  node?: Maybe<Upload>;
};

/** Methods to use when ordering `Upload`. */
export enum UploadsOrderBy {
  Natural = 'NATURAL',
  IriAsc = 'IRI_ASC',
  IriDesc = 'IRI_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UrlAsc = 'URL_ASC',
  UrlDesc = 'URL_DESC',
  SizeAsc = 'SIZE_ASC',
  SizeDesc = 'SIZE_DESC',
  MimetypeAsc = 'MIMETYPE_ASC',
  MimetypeDesc = 'MIMETYPE_DESC',
  AccountIdAsc = 'ACCOUNT_ID_ASC',
  AccountIdDesc = 'ACCOUNT_ID_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type AccountByAddrQueryVariables = Exact<{
  addr: Scalars['String'];
}>;


export type AccountByAddrQuery = (
  { __typename?: 'Query' }
  & { accountByAddr?: Maybe<(
    { __typename?: 'Account' }
    & Pick<Account, 'id' | 'name' | 'type' | 'image' | 'bgImage' | 'description' | 'websiteLink' | 'twitterLink'>
  )> }
);

export type AccountByIdQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type AccountByIdQuery = (
  { __typename?: 'Query' }
  & { accountById?: Maybe<(
    { __typename?: 'Account' }
    & Pick<Account, 'id' | 'name' | 'type' | 'image' | 'bgImage' | 'description' | 'websiteLink' | 'twitterLink' | 'addr' | 'nonce'>
  )> }
);

export type AccountProjectsByIdQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type AccountProjectsByIdQuery = (
  { __typename?: 'Query' }
  & { accountById?: Maybe<(
    { __typename?: 'Account' }
    & Pick<Account, 'id'>
    & { projectsByAdminAccountId: (
      { __typename?: 'ProjectsConnection' }
      & { nodes: Array<Maybe<(
        { __typename?: 'Project' }
        & ProjectFieldsFragment
      )>> }
    ) }
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

export type AllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProjectsQuery = (
  { __typename?: 'Query' }
  & { allProjects?: Maybe<(
    { __typename?: 'ProjectsConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'slug' | 'metadata' | 'onChainId' | 'approved' | 'published'>
      & { creditClassByCreditClassId?: Maybe<(
        { __typename?: 'CreditClass' }
        & Pick<CreditClass, 'id' | 'onChainId'>
        & { accountByRegistryId?: Maybe<(
          { __typename?: 'Account' }
          & AccountFieldsFragment
        )>, creditClassVersionsById: (
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

export type CreateAccountMutationVariables = Exact<{
  input: CreateAccountInput;
}>;


export type CreateAccountMutation = (
  { __typename?: 'Mutation' }
  & { createAccount?: Maybe<(
    { __typename?: 'CreateAccountPayload' }
    & { account?: Maybe<(
      { __typename?: 'Account' }
      & Pick<Account, 'id'>
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
    ), accountByRegistryId?: Maybe<(
      { __typename?: 'Account' }
      & AccountFieldsFragment
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

export type GetAccountsByNameOrAddrQueryVariables = Exact<{
  input?: Maybe<Scalars['String']>;
}>;


export type GetAccountsByNameOrAddrQuery = (
  { __typename?: 'Query' }
  & { getAccountsByNameOrAddr?: Maybe<(
    { __typename?: 'AccountsConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'creatorId' | 'name' | 'type' | 'image' | 'description' | 'addr'>
    )>> }
  )> }
);

export type MoreProjectFieldsFragment = (
  { __typename?: 'Project' }
  & Pick<Project, 'slug' | 'onChainId' | 'metadata'>
  & { creditClassByCreditClassId?: Maybe<(
    { __typename?: 'CreditClass' }
    & Pick<CreditClass, 'uri'>
  )>, accountByDeveloperId?: Maybe<(
    { __typename?: 'Account' }
    & Pick<Account, 'name' | 'image' | 'type'>
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

export type ProjectByIdQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type ProjectByIdQuery = (
  { __typename?: 'Query' }
  & { projectById?: Maybe<(
    { __typename?: 'Project' }
    & ProjectFieldsFragment
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

export type AccountFieldsFragment = (
  { __typename?: 'Account' }
  & Pick<Account, 'id' | 'creatorId' | 'type' | 'name' | 'description' | 'image' | 'websiteLink' | 'twitterLink' | 'addr'>
  & { organizationByAccountId?: Maybe<(
    { __typename?: 'Organization' }
    & OrganizationFieldsFragment
  )> }
);

export type OrganizationFieldsFragment = (
  { __typename?: 'Organization' }
  & Pick<Organization, 'id'>
);

export type ProjectBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type ProjectBySlugQuery = (
  { __typename?: 'Query' }
  & { projectBySlug?: Maybe<(
    { __typename?: 'Project' }
    & ProjectFieldsFragment
  )> }
);

export type ProjectFieldsFragment = (
  { __typename?: 'Project' }
  & Pick<Project, 'id' | 'adminAccountId' | 'onChainId' | 'metadata' | 'approved' | 'published' | 'slug'>
  & { accountByAdminAccountId?: Maybe<(
    { __typename?: 'Account' }
    & Pick<Account, 'addr'>
  )>, creditClassByCreditClassId?: Maybe<(
    { __typename?: 'CreditClass' }
    & Pick<CreditClass, 'onChainId'>
    & { accountByRegistryId?: Maybe<(
      { __typename?: 'Account' }
      & AccountFieldsFragment
    )>, creditClassVersionsById: (
      { __typename?: 'CreditClassVersionsConnection' }
      & { nodes: Array<Maybe<(
        { __typename?: 'CreditClassVersion' }
        & Pick<CreditClassVersion, 'name' | 'metadata'>
      )>> }
    ) }
  )>, accountByDeveloperId?: Maybe<(
    { __typename?: 'Account' }
    & AccountFieldsFragment
  )>, accountByVerifierId?: Maybe<(
    { __typename?: 'Account' }
    & AccountFieldsFragment
  )>, projectPartnersByProjectId: (
    { __typename?: 'ProjectPartnersConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'ProjectPartner' }
      & { accountByAccountId?: Maybe<(
        { __typename?: 'Account' }
        & AccountFieldsFragment
      )> }
    )>> }
  ), documentsByProjectId: (
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
      & Pick<Project, 'slug' | 'metadata'>
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

export type UpdateAccountByIdMutationVariables = Exact<{
  input: UpdateAccountByIdInput;
}>;


export type UpdateAccountByIdMutation = (
  { __typename?: 'Mutation' }
  & { updateAccountById?: Maybe<(
    { __typename?: 'UpdateAccountPayload' }
    & { account?: Maybe<(
      { __typename?: 'Account' }
      & Pick<Account, 'id'>
    )> }
  )> }
);

export type UpdateOrganizationByAccountIdMutationVariables = Exact<{
  input: UpdateOrganizationByAccountIdInput;
}>;


export type UpdateOrganizationByAccountIdMutation = (
  { __typename?: 'Mutation' }
  & { updateOrganizationByAccountId?: Maybe<(
    { __typename?: 'UpdateOrganizationPayload' }
    & { organization?: Maybe<(
      { __typename?: 'Organization' }
      & Pick<Organization, 'id' | 'legalName'>
    )> }
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

export const MoreProjectFieldsFragmentDoc = gql`
    fragment moreProjectFields on Project {
  slug
  onChainId
  metadata
  creditClassByCreditClassId {
    uri
  }
  accountByDeveloperId {
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
export const AccountFieldsFragmentDoc = gql`
    fragment accountFields on Account {
  id
  creatorId
  type
  name
  description
  image
  websiteLink
  twitterLink
  organizationByAccountId {
    ...organizationFields
  }
  addr
}
    ${OrganizationFieldsFragmentDoc}`;
export const ProjectFieldsFragmentDoc = gql`
    fragment projectFields on Project {
  id
  adminAccountId
  accountByAdminAccountId {
    addr
  }
  onChainId
  metadata
  approved
  published
  slug
  creditClassByCreditClassId {
    onChainId
    accountByRegistryId {
      ...accountFields
    }
    creditClassVersionsById(orderBy: CREATED_AT_DESC, first: 1) {
      nodes {
        name
        metadata
      }
    }
  }
  accountByDeveloperId {
    ...accountFields
  }
  accountByVerifierId {
    ...accountFields
  }
  projectPartnersByProjectId {
    nodes {
      accountByAccountId {
        ...accountFields
      }
    }
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
    ${AccountFieldsFragmentDoc}`;
export const AccountByAddrDocument = gql`
    query AccountByAddr($addr: String!) {
  accountByAddr(addr: $addr) {
    id
    name
    type
    image
    bgImage
    description
    websiteLink
    twitterLink
  }
}
    `;

/**
 * __useAccountByAddrQuery__
 *
 * To run a query within a React component, call `useAccountByAddrQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountByAddrQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountByAddrQuery({
 *   variables: {
 *      addr: // value for 'addr'
 *   },
 * });
 */
export function useAccountByAddrQuery(baseOptions: Apollo.QueryHookOptions<AccountByAddrQuery, AccountByAddrQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountByAddrQuery, AccountByAddrQueryVariables>(AccountByAddrDocument, options);
      }
export function useAccountByAddrLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountByAddrQuery, AccountByAddrQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountByAddrQuery, AccountByAddrQueryVariables>(AccountByAddrDocument, options);
        }
export type AccountByAddrQueryHookResult = ReturnType<typeof useAccountByAddrQuery>;
export type AccountByAddrLazyQueryHookResult = ReturnType<typeof useAccountByAddrLazyQuery>;
export type AccountByAddrQueryResult = Apollo.QueryResult<AccountByAddrQuery, AccountByAddrQueryVariables>;
export const AccountByIdDocument = gql`
    query AccountById($id: UUID!) {
  accountById(id: $id) {
    id
    name
    type
    image
    bgImage
    description
    websiteLink
    twitterLink
    addr
    nonce
  }
}
    `;

/**
 * __useAccountByIdQuery__
 *
 * To run a query within a React component, call `useAccountByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAccountByIdQuery(baseOptions: Apollo.QueryHookOptions<AccountByIdQuery, AccountByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountByIdQuery, AccountByIdQueryVariables>(AccountByIdDocument, options);
      }
export function useAccountByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountByIdQuery, AccountByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountByIdQuery, AccountByIdQueryVariables>(AccountByIdDocument, options);
        }
export type AccountByIdQueryHookResult = ReturnType<typeof useAccountByIdQuery>;
export type AccountByIdLazyQueryHookResult = ReturnType<typeof useAccountByIdLazyQuery>;
export type AccountByIdQueryResult = Apollo.QueryResult<AccountByIdQuery, AccountByIdQueryVariables>;
export const AccountProjectsByIdDocument = gql`
    query AccountProjectsById($id: UUID!) {
  accountById(id: $id) {
    id
    projectsByAdminAccountId {
      nodes {
        ...projectFields
      }
    }
  }
}
    ${ProjectFieldsFragmentDoc}`;

/**
 * __useAccountProjectsByIdQuery__
 *
 * To run a query within a React component, call `useAccountProjectsByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountProjectsByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountProjectsByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAccountProjectsByIdQuery(baseOptions: Apollo.QueryHookOptions<AccountProjectsByIdQuery, AccountProjectsByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountProjectsByIdQuery, AccountProjectsByIdQueryVariables>(AccountProjectsByIdDocument, options);
      }
export function useAccountProjectsByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountProjectsByIdQuery, AccountProjectsByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountProjectsByIdQuery, AccountProjectsByIdQueryVariables>(AccountProjectsByIdDocument, options);
        }
export type AccountProjectsByIdQueryHookResult = ReturnType<typeof useAccountProjectsByIdQuery>;
export type AccountProjectsByIdLazyQueryHookResult = ReturnType<typeof useAccountProjectsByIdLazyQuery>;
export type AccountProjectsByIdQueryResult = Apollo.QueryResult<AccountProjectsByIdQuery, AccountProjectsByIdQueryVariables>;
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
export const AllProjectsDocument = gql`
    query AllProjects {
  allProjects {
    nodes {
      id
      slug
      metadata
      onChainId
      approved
      published
      creditClassByCreditClassId {
        id
        onChainId
        accountByRegistryId {
          ...accountFields
        }
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
    ${AccountFieldsFragmentDoc}`;

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
export const CreateAccountDocument = gql`
    mutation CreateAccount($input: CreateAccountInput!) {
  createAccount(input: $input) {
    account {
      id
    }
  }
}
    `;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
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
    accountByRegistryId {
      ...accountFields
    }
  }
}
    ${MoreProjectFieldsFragmentDoc}
${AccountFieldsFragmentDoc}`;

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
export const GetAccountsByNameOrAddrDocument = gql`
    query GetAccountsByNameOrAddr($input: String) {
  getAccountsByNameOrAddr(input: $input) {
    nodes {
      id
      creatorId
      name
      type
      image
      description
      addr
    }
  }
}
    `;

/**
 * __useGetAccountsByNameOrAddrQuery__
 *
 * To run a query within a React component, call `useGetAccountsByNameOrAddrQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountsByNameOrAddrQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountsByNameOrAddrQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAccountsByNameOrAddrQuery(baseOptions?: Apollo.QueryHookOptions<GetAccountsByNameOrAddrQuery, GetAccountsByNameOrAddrQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountsByNameOrAddrQuery, GetAccountsByNameOrAddrQueryVariables>(GetAccountsByNameOrAddrDocument, options);
      }
export function useGetAccountsByNameOrAddrLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountsByNameOrAddrQuery, GetAccountsByNameOrAddrQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountsByNameOrAddrQuery, GetAccountsByNameOrAddrQueryVariables>(GetAccountsByNameOrAddrDocument, options);
        }
export type GetAccountsByNameOrAddrQueryHookResult = ReturnType<typeof useGetAccountsByNameOrAddrQuery>;
export type GetAccountsByNameOrAddrLazyQueryHookResult = ReturnType<typeof useGetAccountsByNameOrAddrLazyQuery>;
export type GetAccountsByNameOrAddrQueryResult = Apollo.QueryResult<GetAccountsByNameOrAddrQuery, GetAccountsByNameOrAddrQueryVariables>;
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
export const ProjectByIdDocument = gql`
    query ProjectById($id: UUID!) {
  projectById(id: $id) {
    ...projectFields
  }
}
    ${ProjectFieldsFragmentDoc}`;

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
export const ProjectBySlugDocument = gql`
    query ProjectBySlug($slug: String!) {
  projectBySlug(slug: $slug) {
    ...projectFields
  }
}
    ${ProjectFieldsFragmentDoc}`;

/**
 * __useProjectBySlugQuery__
 *
 * To run a query within a React component, call `useProjectBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useProjectBySlugQuery(baseOptions: Apollo.QueryHookOptions<ProjectBySlugQuery, ProjectBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectBySlugQuery, ProjectBySlugQueryVariables>(ProjectBySlugDocument, options);
      }
export function useProjectBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectBySlugQuery, ProjectBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectBySlugQuery, ProjectBySlugQueryVariables>(ProjectBySlugDocument, options);
        }
export type ProjectBySlugQueryHookResult = ReturnType<typeof useProjectBySlugQuery>;
export type ProjectBySlugLazyQueryHookResult = ReturnType<typeof useProjectBySlugLazyQuery>;
export type ProjectBySlugQueryResult = Apollo.QueryResult<ProjectBySlugQuery, ProjectBySlugQueryVariables>;
export const ProjectsByMetadataDocument = gql`
    query ProjectsByMetadata($metadata: JSON) {
  allProjects(filter: {metadata: {contains: $metadata}}) {
    nodes {
      slug
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
export const UpdateAccountByIdDocument = gql`
    mutation UpdateAccountById($input: UpdateAccountByIdInput!) {
  updateAccountById(input: $input) {
    account {
      id
    }
  }
}
    `;
export type UpdateAccountByIdMutationFn = Apollo.MutationFunction<UpdateAccountByIdMutation, UpdateAccountByIdMutationVariables>;

/**
 * __useUpdateAccountByIdMutation__
 *
 * To run a mutation, you first call `useUpdateAccountByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountByIdMutation, { data, loading, error }] = useUpdateAccountByIdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAccountByIdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccountByIdMutation, UpdateAccountByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAccountByIdMutation, UpdateAccountByIdMutationVariables>(UpdateAccountByIdDocument, options);
      }
export type UpdateAccountByIdMutationHookResult = ReturnType<typeof useUpdateAccountByIdMutation>;
export type UpdateAccountByIdMutationResult = Apollo.MutationResult<UpdateAccountByIdMutation>;
export type UpdateAccountByIdMutationOptions = Apollo.BaseMutationOptions<UpdateAccountByIdMutation, UpdateAccountByIdMutationVariables>;
export const UpdateOrganizationByAccountIdDocument = gql`
    mutation UpdateOrganizationByAccountId($input: UpdateOrganizationByAccountIdInput!) {
  updateOrganizationByAccountId(input: $input) {
    organization {
      id
      legalName
    }
  }
}
    `;
export type UpdateOrganizationByAccountIdMutationFn = Apollo.MutationFunction<UpdateOrganizationByAccountIdMutation, UpdateOrganizationByAccountIdMutationVariables>;

/**
 * __useUpdateOrganizationByAccountIdMutation__
 *
 * To run a mutation, you first call `useUpdateOrganizationByAccountIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrganizationByAccountIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrganizationByAccountIdMutation, { data, loading, error }] = useUpdateOrganizationByAccountIdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOrganizationByAccountIdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrganizationByAccountIdMutation, UpdateOrganizationByAccountIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrganizationByAccountIdMutation, UpdateOrganizationByAccountIdMutationVariables>(UpdateOrganizationByAccountIdDocument, options);
      }
export type UpdateOrganizationByAccountIdMutationHookResult = ReturnType<typeof useUpdateOrganizationByAccountIdMutation>;
export type UpdateOrganizationByAccountIdMutationResult = Apollo.MutationResult<UpdateOrganizationByAccountIdMutation>;
export type UpdateOrganizationByAccountIdMutationOptions = Apollo.BaseMutationOptions<UpdateOrganizationByAccountIdMutation, UpdateOrganizationByAccountIdMutationVariables>;
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