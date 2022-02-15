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

export type AccountBalance = Node & {
  __typename?: 'AccountBalance';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  creditVintageId: Scalars['UUID'];
  walletId: Scalars['UUID'];
  liquidBalance?: Maybe<Scalars['BigFloat']>;
  burntBalance?: Maybe<Scalars['BigFloat']>;
  /** Reads a single `CreditVintage` that is related to this `AccountBalance`. */
  creditVintageByCreditVintageId?: Maybe<CreditVintage>;
  /** Reads a single `Wallet` that is related to this `AccountBalance`. */
  walletByWalletId?: Maybe<Wallet>;
};

/**
 * A condition to be used against `AccountBalance` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type AccountBalanceCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `creditVintageId` field. */
  creditVintageId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `walletId` field. */
  walletId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `liquidBalance` field. */
  liquidBalance?: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `burntBalance` field. */
  burntBalance?: Maybe<Scalars['BigFloat']>;
};

/** An input for mutations affecting `AccountBalance` */
export type AccountBalanceInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  creditVintageId: Scalars['UUID'];
  walletId: Scalars['UUID'];
  liquidBalance?: Maybe<Scalars['BigFloat']>;
  burntBalance?: Maybe<Scalars['BigFloat']>;
};

/** Represents an update to a `AccountBalance`. Fields that are set will be updated. */
export type AccountBalancePatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  creditVintageId?: Maybe<Scalars['UUID']>;
  walletId?: Maybe<Scalars['UUID']>;
  liquidBalance?: Maybe<Scalars['BigFloat']>;
  burntBalance?: Maybe<Scalars['BigFloat']>;
};

/** A connection to a list of `AccountBalance` values. */
export type AccountBalancesConnection = {
  __typename?: 'AccountBalancesConnection';
  /** A list of `AccountBalance` objects. */
  nodes: Array<Maybe<AccountBalance>>;
  /** A list of edges which contains the `AccountBalance` and cursor to aid in pagination. */
  edges: Array<AccountBalancesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AccountBalance` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `AccountBalance` edge in the connection. */
export type AccountBalancesEdge = {
  __typename?: 'AccountBalancesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `AccountBalance` at the end of the edge. */
  node?: Maybe<AccountBalance>;
};

/** Methods to use when ordering `AccountBalance`. */
export enum AccountBalancesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  CreditVintageIdAsc = 'CREDIT_VINTAGE_ID_ASC',
  CreditVintageIdDesc = 'CREDIT_VINTAGE_ID_DESC',
  WalletIdAsc = 'WALLET_ID_ASC',
  WalletIdDesc = 'WALLET_ID_DESC',
  LiquidBalanceAsc = 'LIQUID_BALANCE_ASC',
  LiquidBalanceDesc = 'LIQUID_BALANCE_DESC',
  BurntBalanceAsc = 'BURNT_BALANCE_ASC',
  BurntBalanceDesc = 'BURNT_BALANCE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Address = Node & {
  __typename?: 'Address';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  feature?: Maybe<Scalars['JSON']>;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByAddressId: PartiesConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByAddressId: ProjectsConnection;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByAddressId: PurchasesConnection;
  /** Reads and enables pagination through a set of `Retirement`. */
  retirementsByAddressId: RetirementsConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByPartyAddressIdAndWalletId: AddressWalletsByPartyAddressIdAndWalletIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectAddressIdAndDeveloperId: AddressPartiesByProjectAddressIdAndDeveloperIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectAddressIdAndStewardId: AddressPartiesByProjectAddressIdAndStewardIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectAddressIdAndLandOwnerId: AddressPartiesByProjectAddressIdAndLandOwnerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByProjectAddressIdAndCreditClassId: AddressCreditClassesByProjectAddressIdAndCreditClassIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectAddressIdAndRegistryId: AddressPartiesByProjectAddressIdAndRegistryIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByProjectAddressIdAndCreatorId: AddressUsersByProjectAddressIdAndCreatorIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectAddressIdAndOriginatorId: AddressPartiesByProjectAddressIdAndOriginatorIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectAddressIdAndIssuerId: AddressPartiesByProjectAddressIdAndIssuerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectAddressIdAndResellerId: AddressPartiesByProjectAddressIdAndResellerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByPurchaseAddressIdAndBuyerWalletId: AddressWalletsByPurchaseAddressIdAndBuyerWalletIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByPurchaseAddressIdAndCreditVintageId: AddressCreditVintagesByPurchaseAddressIdAndCreditVintageIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByPurchaseAddressIdAndPartyId: AddressPartiesByPurchaseAddressIdAndPartyIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByPurchaseAddressIdAndUserId: AddressUsersByPurchaseAddressIdAndUserIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByRetirementAddressIdAndWalletId: AddressWalletsByRetirementAddressIdAndWalletIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByRetirementAddressIdAndCreditVintageId: AddressCreditVintagesByRetirementAddressIdAndCreditVintageIdManyToManyConnection;
};


export type AddressPartiesByAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type AddressProjectsByAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};


export type AddressPurchasesByAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};


export type AddressRetirementsByAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<RetirementsOrderBy>>;
  condition?: Maybe<RetirementCondition>;
};


export type AddressWalletsByPartyAddressIdAndWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type AddressPartiesByProjectAddressIdAndDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type AddressPartiesByProjectAddressIdAndStewardIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type AddressPartiesByProjectAddressIdAndLandOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type AddressCreditClassesByProjectAddressIdAndCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};


export type AddressPartiesByProjectAddressIdAndRegistryIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type AddressUsersByProjectAddressIdAndCreatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
};


export type AddressPartiesByProjectAddressIdAndOriginatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type AddressPartiesByProjectAddressIdAndIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type AddressPartiesByProjectAddressIdAndResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type AddressWalletsByPurchaseAddressIdAndBuyerWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type AddressCreditVintagesByPurchaseAddressIdAndCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};


export type AddressPartiesByPurchaseAddressIdAndPartyIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type AddressUsersByPurchaseAddressIdAndUserIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
};


export type AddressWalletsByRetirementAddressIdAndWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type AddressCreditVintagesByRetirementAddressIdAndCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};

/** A condition to be used against `Address` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type AddressCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `feature` field. */
  feature?: Maybe<Scalars['JSON']>;
};

/** A connection to a list of `CreditClass` values, with data from `Project`. */
export type AddressCreditClassesByProjectAddressIdAndCreditClassIdManyToManyConnection = {
  __typename?: 'AddressCreditClassesByProjectAddressIdAndCreditClassIdManyToManyConnection';
  /** A list of `CreditClass` objects. */
  nodes: Array<Maybe<CreditClass>>;
  /** A list of edges which contains the `CreditClass`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<AddressCreditClassesByProjectAddressIdAndCreditClassIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditClass` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditClass` edge in the connection, with data from `Project`. */
export type AddressCreditClassesByProjectAddressIdAndCreditClassIdManyToManyEdge = {
  __typename?: 'AddressCreditClassesByProjectAddressIdAndCreditClassIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditClass` at the end of the edge. */
  node?: Maybe<CreditClass>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreditClassId: ProjectsConnection;
};


/** A `CreditClass` edge in the connection, with data from `Project`. */
export type AddressCreditClassesByProjectAddressIdAndCreditClassIdManyToManyEdgeProjectsByCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `CreditVintage` values, with data from `Purchase`. */
export type AddressCreditVintagesByPurchaseAddressIdAndCreditVintageIdManyToManyConnection = {
  __typename?: 'AddressCreditVintagesByPurchaseAddressIdAndCreditVintageIdManyToManyConnection';
  /** A list of `CreditVintage` objects. */
  nodes: Array<Maybe<CreditVintage>>;
  /** A list of edges which contains the `CreditVintage`, info from the `Purchase`, and the cursor to aid in pagination. */
  edges: Array<AddressCreditVintagesByPurchaseAddressIdAndCreditVintageIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditVintage` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditVintage` edge in the connection, with data from `Purchase`. */
export type AddressCreditVintagesByPurchaseAddressIdAndCreditVintageIdManyToManyEdge = {
  __typename?: 'AddressCreditVintagesByPurchaseAddressIdAndCreditVintageIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditVintage` at the end of the edge. */
  node?: Maybe<CreditVintage>;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByCreditVintageId: PurchasesConnection;
};


/** A `CreditVintage` edge in the connection, with data from `Purchase`. */
export type AddressCreditVintagesByPurchaseAddressIdAndCreditVintageIdManyToManyEdgePurchasesByCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};

/** A connection to a list of `CreditVintage` values, with data from `Retirement`. */
export type AddressCreditVintagesByRetirementAddressIdAndCreditVintageIdManyToManyConnection = {
  __typename?: 'AddressCreditVintagesByRetirementAddressIdAndCreditVintageIdManyToManyConnection';
  /** A list of `CreditVintage` objects. */
  nodes: Array<Maybe<CreditVintage>>;
  /** A list of edges which contains the `CreditVintage`, info from the `Retirement`, and the cursor to aid in pagination. */
  edges: Array<AddressCreditVintagesByRetirementAddressIdAndCreditVintageIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditVintage` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditVintage` edge in the connection, with data from `Retirement`. */
export type AddressCreditVintagesByRetirementAddressIdAndCreditVintageIdManyToManyEdge = {
  __typename?: 'AddressCreditVintagesByRetirementAddressIdAndCreditVintageIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditVintage` at the end of the edge. */
  node?: Maybe<CreditVintage>;
  /** Reads and enables pagination through a set of `Retirement`. */
  retirementsByCreditVintageId: RetirementsConnection;
};


/** A `CreditVintage` edge in the connection, with data from `Retirement`. */
export type AddressCreditVintagesByRetirementAddressIdAndCreditVintageIdManyToManyEdgeRetirementsByCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<RetirementsOrderBy>>;
  condition?: Maybe<RetirementCondition>;
};

/** An input for mutations affecting `Address` */
export type AddressInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  feature?: Maybe<Scalars['JSON']>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type AddressPartiesByProjectAddressIdAndDeveloperIdManyToManyConnection = {
  __typename?: 'AddressPartiesByProjectAddressIdAndDeveloperIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<AddressPartiesByProjectAddressIdAndDeveloperIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type AddressPartiesByProjectAddressIdAndDeveloperIdManyToManyEdge = {
  __typename?: 'AddressPartiesByProjectAddressIdAndDeveloperIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByDeveloperId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type AddressPartiesByProjectAddressIdAndDeveloperIdManyToManyEdgeProjectsByDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type AddressPartiesByProjectAddressIdAndIssuerIdManyToManyConnection = {
  __typename?: 'AddressPartiesByProjectAddressIdAndIssuerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<AddressPartiesByProjectAddressIdAndIssuerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type AddressPartiesByProjectAddressIdAndIssuerIdManyToManyEdge = {
  __typename?: 'AddressPartiesByProjectAddressIdAndIssuerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByIssuerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type AddressPartiesByProjectAddressIdAndIssuerIdManyToManyEdgeProjectsByIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type AddressPartiesByProjectAddressIdAndLandOwnerIdManyToManyConnection = {
  __typename?: 'AddressPartiesByProjectAddressIdAndLandOwnerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<AddressPartiesByProjectAddressIdAndLandOwnerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type AddressPartiesByProjectAddressIdAndLandOwnerIdManyToManyEdge = {
  __typename?: 'AddressPartiesByProjectAddressIdAndLandOwnerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByLandOwnerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type AddressPartiesByProjectAddressIdAndLandOwnerIdManyToManyEdgeProjectsByLandOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type AddressPartiesByProjectAddressIdAndOriginatorIdManyToManyConnection = {
  __typename?: 'AddressPartiesByProjectAddressIdAndOriginatorIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<AddressPartiesByProjectAddressIdAndOriginatorIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type AddressPartiesByProjectAddressIdAndOriginatorIdManyToManyEdge = {
  __typename?: 'AddressPartiesByProjectAddressIdAndOriginatorIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByOriginatorId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type AddressPartiesByProjectAddressIdAndOriginatorIdManyToManyEdgeProjectsByOriginatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type AddressPartiesByProjectAddressIdAndRegistryIdManyToManyConnection = {
  __typename?: 'AddressPartiesByProjectAddressIdAndRegistryIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<AddressPartiesByProjectAddressIdAndRegistryIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type AddressPartiesByProjectAddressIdAndRegistryIdManyToManyEdge = {
  __typename?: 'AddressPartiesByProjectAddressIdAndRegistryIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByRegistryId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type AddressPartiesByProjectAddressIdAndRegistryIdManyToManyEdgeProjectsByRegistryIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type AddressPartiesByProjectAddressIdAndResellerIdManyToManyConnection = {
  __typename?: 'AddressPartiesByProjectAddressIdAndResellerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<AddressPartiesByProjectAddressIdAndResellerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type AddressPartiesByProjectAddressIdAndResellerIdManyToManyEdge = {
  __typename?: 'AddressPartiesByProjectAddressIdAndResellerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByResellerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type AddressPartiesByProjectAddressIdAndResellerIdManyToManyEdgeProjectsByResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type AddressPartiesByProjectAddressIdAndStewardIdManyToManyConnection = {
  __typename?: 'AddressPartiesByProjectAddressIdAndStewardIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<AddressPartiesByProjectAddressIdAndStewardIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type AddressPartiesByProjectAddressIdAndStewardIdManyToManyEdge = {
  __typename?: 'AddressPartiesByProjectAddressIdAndStewardIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByStewardId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type AddressPartiesByProjectAddressIdAndStewardIdManyToManyEdgeProjectsByStewardIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Purchase`. */
export type AddressPartiesByPurchaseAddressIdAndPartyIdManyToManyConnection = {
  __typename?: 'AddressPartiesByPurchaseAddressIdAndPartyIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Purchase`, and the cursor to aid in pagination. */
  edges: Array<AddressPartiesByPurchaseAddressIdAndPartyIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Purchase`. */
export type AddressPartiesByPurchaseAddressIdAndPartyIdManyToManyEdge = {
  __typename?: 'AddressPartiesByPurchaseAddressIdAndPartyIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByPartyId: PurchasesConnection;
};


/** A `Party` edge in the connection, with data from `Purchase`. */
export type AddressPartiesByPurchaseAddressIdAndPartyIdManyToManyEdgePurchasesByPartyIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};

/** Represents an update to a `Address`. Fields that are set will be updated. */
export type AddressPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  feature?: Maybe<Scalars['JSON']>;
};

/** A connection to a list of `User` values, with data from `Project`. */
export type AddressUsersByProjectAddressIdAndCreatorIdManyToManyConnection = {
  __typename?: 'AddressUsersByProjectAddressIdAndCreatorIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<AddressUsersByProjectAddressIdAndCreatorIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `Project`. */
export type AddressUsersByProjectAddressIdAndCreatorIdManyToManyEdge = {
  __typename?: 'AddressUsersByProjectAddressIdAndCreatorIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreatorId: ProjectsConnection;
};


/** A `User` edge in the connection, with data from `Project`. */
export type AddressUsersByProjectAddressIdAndCreatorIdManyToManyEdgeProjectsByCreatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `User` values, with data from `Purchase`. */
export type AddressUsersByPurchaseAddressIdAndUserIdManyToManyConnection = {
  __typename?: 'AddressUsersByPurchaseAddressIdAndUserIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `Purchase`, and the cursor to aid in pagination. */
  edges: Array<AddressUsersByPurchaseAddressIdAndUserIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `Purchase`. */
export type AddressUsersByPurchaseAddressIdAndUserIdManyToManyEdge = {
  __typename?: 'AddressUsersByPurchaseAddressIdAndUserIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByUserId: PurchasesConnection;
};


/** A `User` edge in the connection, with data from `Purchase`. */
export type AddressUsersByPurchaseAddressIdAndUserIdManyToManyEdgePurchasesByUserIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};

/** A connection to a list of `Wallet` values, with data from `Party`. */
export type AddressWalletsByPartyAddressIdAndWalletIdManyToManyConnection = {
  __typename?: 'AddressWalletsByPartyAddressIdAndWalletIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `Party`, and the cursor to aid in pagination. */
  edges: Array<AddressWalletsByPartyAddressIdAndWalletIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `Party`. */
export type AddressWalletsByPartyAddressIdAndWalletIdManyToManyEdge = {
  __typename?: 'AddressWalletsByPartyAddressIdAndWalletIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByWalletId: PartiesConnection;
};


/** A `Wallet` edge in the connection, with data from `Party`. */
export type AddressWalletsByPartyAddressIdAndWalletIdManyToManyEdgePartiesByWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};

/** A connection to a list of `Wallet` values, with data from `Purchase`. */
export type AddressWalletsByPurchaseAddressIdAndBuyerWalletIdManyToManyConnection = {
  __typename?: 'AddressWalletsByPurchaseAddressIdAndBuyerWalletIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `Purchase`, and the cursor to aid in pagination. */
  edges: Array<AddressWalletsByPurchaseAddressIdAndBuyerWalletIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `Purchase`. */
export type AddressWalletsByPurchaseAddressIdAndBuyerWalletIdManyToManyEdge = {
  __typename?: 'AddressWalletsByPurchaseAddressIdAndBuyerWalletIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByBuyerWalletId: PurchasesConnection;
};


/** A `Wallet` edge in the connection, with data from `Purchase`. */
export type AddressWalletsByPurchaseAddressIdAndBuyerWalletIdManyToManyEdgePurchasesByBuyerWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};

/** A connection to a list of `Wallet` values, with data from `Retirement`. */
export type AddressWalletsByRetirementAddressIdAndWalletIdManyToManyConnection = {
  __typename?: 'AddressWalletsByRetirementAddressIdAndWalletIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `Retirement`, and the cursor to aid in pagination. */
  edges: Array<AddressWalletsByRetirementAddressIdAndWalletIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `Retirement`. */
export type AddressWalletsByRetirementAddressIdAndWalletIdManyToManyEdge = {
  __typename?: 'AddressWalletsByRetirementAddressIdAndWalletIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `Retirement`. */
  retirementsByWalletId: RetirementsConnection;
};


/** A `Wallet` edge in the connection, with data from `Retirement`. */
export type AddressWalletsByRetirementAddressIdAndWalletIdManyToManyEdgeRetirementsByWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<RetirementsOrderBy>>;
  condition?: Maybe<RetirementCondition>;
};

/** A connection to a list of `Address` values. */
export type AddressesConnection = {
  __typename?: 'AddressesConnection';
  /** A list of `Address` objects. */
  nodes: Array<Maybe<Address>>;
  /** A list of edges which contains the `Address` and cursor to aid in pagination. */
  edges: Array<AddressesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Address` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Address` edge in the connection. */
export type AddressesEdge = {
  __typename?: 'AddressesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Address` at the end of the edge. */
  node?: Maybe<Address>;
};

/** Methods to use when ordering `Address`. */
export enum AddressesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  FeatureAsc = 'FEATURE_ASC',
  FeatureDesc = 'FEATURE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Admin = Node & {
  __typename?: 'Admin';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  auth0Sub: Scalars['String'];
};

/** A condition to be used against `Admin` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type AdminCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `auth0Sub` field. */
  auth0Sub?: Maybe<Scalars['String']>;
};

/** An input for mutations affecting `Admin` */
export type AdminInput = {
  id?: Maybe<Scalars['UUID']>;
  auth0Sub: Scalars['String'];
};

/** Represents an update to a `Admin`. Fields that are set will be updated. */
export type AdminPatch = {
  id?: Maybe<Scalars['UUID']>;
  auth0Sub?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Admin` values. */
export type AdminsConnection = {
  __typename?: 'AdminsConnection';
  /** A list of `Admin` objects. */
  nodes: Array<Maybe<Admin>>;
  /** A list of edges which contains the `Admin` and cursor to aid in pagination. */
  edges: Array<AdminsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Admin` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Admin` edge in the connection. */
export type AdminsEdge = {
  __typename?: 'AdminsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Admin` at the end of the edge. */
  node?: Maybe<Admin>;
};

/** Methods to use when ordering `Admin`. */
export enum AdminsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Auth0SubAsc = 'AUTH0_SUB_ASC',
  Auth0SubDesc = 'AUTH0_SUB_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}


/** All input for the create `AccountBalance` mutation. */
export type CreateAccountBalanceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `AccountBalance` to be created by this mutation. */
  accountBalance: AccountBalanceInput;
};

/** The output of our create `AccountBalance` mutation. */
export type CreateAccountBalancePayload = {
  __typename?: 'CreateAccountBalancePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `AccountBalance` that was created by this mutation. */
  accountBalance?: Maybe<AccountBalance>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `CreditVintage` that is related to this `AccountBalance`. */
  creditVintageByCreditVintageId?: Maybe<CreditVintage>;
  /** Reads a single `Wallet` that is related to this `AccountBalance`. */
  walletByWalletId?: Maybe<Wallet>;
  /** An edge for our `AccountBalance`. May be used by Relay 1. */
  accountBalanceEdge?: Maybe<AccountBalancesEdge>;
};


/** The output of our create `AccountBalance` mutation. */
export type CreateAccountBalancePayloadAccountBalanceEdgeArgs = {
  orderBy?: Maybe<Array<AccountBalancesOrderBy>>;
};

/** All input for the create `Address` mutation. */
export type CreateAddressInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Address` to be created by this mutation. */
  address: AddressInput;
};

/** The output of our create `Address` mutation. */
export type CreateAddressPayload = {
  __typename?: 'CreateAddressPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Address` that was created by this mutation. */
  address?: Maybe<Address>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Address`. May be used by Relay 1. */
  addressEdge?: Maybe<AddressesEdge>;
};


/** The output of our create `Address` mutation. */
export type CreateAddressPayloadAddressEdgeArgs = {
  orderBy?: Maybe<Array<AddressesOrderBy>>;
};

/** All input for the create `Admin` mutation. */
export type CreateAdminInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Admin` to be created by this mutation. */
  admin: AdminInput;
};

/** The output of our create `Admin` mutation. */
export type CreateAdminPayload = {
  __typename?: 'CreateAdminPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Admin` that was created by this mutation. */
  admin?: Maybe<Admin>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Admin`. May be used by Relay 1. */
  adminEdge?: Maybe<AdminsEdge>;
};


/** The output of our create `Admin` mutation. */
export type CreateAdminPayloadAdminEdgeArgs = {
  orderBy?: Maybe<Array<AdminsOrderBy>>;
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

/** All input for the create `CreditClassIssuer` mutation. */
export type CreateCreditClassIssuerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CreditClassIssuer` to be created by this mutation. */
  creditClassIssuer: CreditClassIssuerInput;
};

/** The output of our create `CreditClassIssuer` mutation. */
export type CreateCreditClassIssuerPayload = {
  __typename?: 'CreateCreditClassIssuerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CreditClassIssuer` that was created by this mutation. */
  creditClassIssuer?: Maybe<CreditClassIssuer>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `CreditClass` that is related to this `CreditClassIssuer`. */
  creditClassByCreditClassId?: Maybe<CreditClass>;
  /** Reads a single `Wallet` that is related to this `CreditClassIssuer`. */
  walletByIssuerId?: Maybe<Wallet>;
  /** An edge for our `CreditClassIssuer`. May be used by Relay 1. */
  creditClassIssuerEdge?: Maybe<CreditClassIssuersEdge>;
};


/** The output of our create `CreditClassIssuer` mutation. */
export type CreateCreditClassIssuerPayloadCreditClassIssuerEdgeArgs = {
  orderBy?: Maybe<Array<CreditClassIssuersOrderBy>>;
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
  partyByDesignerId?: Maybe<Party>;
  /** Reads a single `Methodology` that is related to this `CreditClass`. */
  methodologyByMethodologyId?: Maybe<Methodology>;
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

/** All input for the create `CreditVintage` mutation. */
export type CreateCreditVintageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CreditVintage` to be created by this mutation. */
  creditVintage: CreditVintageInput;
};

/** The output of our create `CreditVintage` mutation. */
export type CreateCreditVintagePayload = {
  __typename?: 'CreateCreditVintagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CreditVintage` that was created by this mutation. */
  creditVintage?: Maybe<CreditVintage>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `CreditClass` that is related to this `CreditVintage`. */
  creditClassByCreditClassId?: Maybe<CreditClass>;
  /** Reads a single `Project` that is related to this `CreditVintage`. */
  projectByProjectId?: Maybe<Project>;
  /** Reads a single `Wallet` that is related to this `CreditVintage`. */
  walletByTokenizerId?: Maybe<Wallet>;
  /** Reads a single `Event` that is related to this `CreditVintage`. */
  eventByEventId?: Maybe<Event>;
  /** Reads a single `MethodologyVersion` that is related to this `CreditVintage`. */
  methodologyVersionByMethodologyVersionIdAndMethodologyVersionCreatedAt?: Maybe<MethodologyVersion>;
  /** Reads a single `CreditClassVersion` that is related to this `CreditVintage`. */
  creditClassVersionByCreditClassVersionIdAndCreditClassVersionCreatedAt?: Maybe<CreditClassVersion>;
  /** Reads a single `Party` that is related to this `CreditVintage`. */
  partyByIssuerId?: Maybe<Party>;
  /** Reads a single `Wallet` that is related to this `CreditVintage`. */
  walletByResellerId?: Maybe<Wallet>;
  /** An edge for our `CreditVintage`. May be used by Relay 1. */
  creditVintageEdge?: Maybe<CreditVintagesEdge>;
};


/** The output of our create `CreditVintage` mutation. */
export type CreateCreditVintagePayloadCreditVintageEdgeArgs = {
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
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
  /** Reads a single `Event` that is related to this `Document`. */
  eventByEventId?: Maybe<Event>;
  /** An edge for our `Document`. May be used by Relay 1. */
  documentEdge?: Maybe<DocumentsEdge>;
};


/** The output of our create `Document` mutation. */
export type CreateDocumentPayloadDocumentEdgeArgs = {
  orderBy?: Maybe<Array<DocumentsOrderBy>>;
};

/** All input for the create `Event` mutation. */
export type CreateEventInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Event` to be created by this mutation. */
  event: EventInput;
};

/** The output of our create `Event` mutation. */
export type CreateEventPayload = {
  __typename?: 'CreateEventPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Event` that was created by this mutation. */
  event?: Maybe<Event>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Project` that is related to this `Event`. */
  projectByProjectId?: Maybe<Project>;
  /** An edge for our `Event`. May be used by Relay 1. */
  eventEdge?: Maybe<EventsEdge>;
};


/** The output of our create `Event` mutation. */
export type CreateEventPayloadEventEdgeArgs = {
  orderBy?: Maybe<Array<EventsOrderBy>>;
};

/** All input for the create `FlywaySchemaHistory` mutation. */
export type CreateFlywaySchemaHistoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `FlywaySchemaHistory` to be created by this mutation. */
  flywaySchemaHistory: FlywaySchemaHistoryInput;
};

/** The output of our create `FlywaySchemaHistory` mutation. */
export type CreateFlywaySchemaHistoryPayload = {
  __typename?: 'CreateFlywaySchemaHistoryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `FlywaySchemaHistory` that was created by this mutation. */
  flywaySchemaHistory?: Maybe<FlywaySchemaHistory>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `FlywaySchemaHistory`. May be used by Relay 1. */
  flywaySchemaHistoryEdge?: Maybe<FlywaySchemaHistoriesEdge>;
};


/** The output of our create `FlywaySchemaHistory` mutation. */
export type CreateFlywaySchemaHistoryPayloadFlywaySchemaHistoryEdgeArgs = {
  orderBy?: Maybe<Array<FlywaySchemaHistoriesOrderBy>>;
};

/** All input for the create `Methodology` mutation. */
export type CreateMethodologyInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Methodology` to be created by this mutation. */
  methodology: MethodologyInput;
};

/** The output of our create `Methodology` mutation. */
export type CreateMethodologyPayload = {
  __typename?: 'CreateMethodologyPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Methodology` that was created by this mutation. */
  methodology?: Maybe<Methodology>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `Methodology`. */
  partyByAuthorId?: Maybe<Party>;
  /** An edge for our `Methodology`. May be used by Relay 1. */
  methodologyEdge?: Maybe<MethodologiesEdge>;
};


/** The output of our create `Methodology` mutation. */
export type CreateMethodologyPayloadMethodologyEdgeArgs = {
  orderBy?: Maybe<Array<MethodologiesOrderBy>>;
};

/** All input for the create `MethodologyVersion` mutation. */
export type CreateMethodologyVersionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MethodologyVersion` to be created by this mutation. */
  methodologyVersion: MethodologyVersionInput;
};

/** The output of our create `MethodologyVersion` mutation. */
export type CreateMethodologyVersionPayload = {
  __typename?: 'CreateMethodologyVersionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MethodologyVersion` that was created by this mutation. */
  methodologyVersion?: Maybe<MethodologyVersion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Methodology` that is related to this `MethodologyVersion`. */
  methodologyById?: Maybe<Methodology>;
  /** An edge for our `MethodologyVersion`. May be used by Relay 1. */
  methodologyVersionEdge?: Maybe<MethodologyVersionsEdge>;
};


/** The output of our create `MethodologyVersion` mutation. */
export type CreateMethodologyVersionPayloadMethodologyVersionEdgeArgs = {
  orderBy?: Maybe<Array<MethodologyVersionsOrderBy>>;
};

/** All input for the create `Mrv` mutation. */
export type CreateMrvInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Mrv` to be created by this mutation. */
  mrv: MrvInput;
};

/** The output of our create `Mrv` mutation. */
export type CreateMrvPayload = {
  __typename?: 'CreateMrvPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Mrv` that was created by this mutation. */
  mrv?: Maybe<Mrv>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Project` that is related to this `Mrv`. */
  projectByProjectId?: Maybe<Project>;
  /** An edge for our `Mrv`. May be used by Relay 1. */
  mrvEdge?: Maybe<MrvsEdge>;
};


/** The output of our create `Mrv` mutation. */
export type CreateMrvPayloadMrvEdgeArgs = {
  orderBy?: Maybe<Array<MrvsOrderBy>>;
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

/** All input for the create `OrganizationMember` mutation. */
export type CreateOrganizationMemberInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `OrganizationMember` to be created by this mutation. */
  organizationMember: OrganizationMemberInput;
};

/** The output of our create `OrganizationMember` mutation. */
export type CreateOrganizationMemberPayload = {
  __typename?: 'CreateOrganizationMemberPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `OrganizationMember` that was created by this mutation. */
  organizationMember?: Maybe<OrganizationMember>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `OrganizationMember`. */
  userByMemberId?: Maybe<User>;
  /** Reads a single `Organization` that is related to this `OrganizationMember`. */
  organizationByOrganizationId?: Maybe<Organization>;
  /** An edge for our `OrganizationMember`. May be used by Relay 1. */
  organizationMemberEdge?: Maybe<OrganizationMembersEdge>;
};


/** The output of our create `OrganizationMember` mutation. */
export type CreateOrganizationMemberPayloadOrganizationMemberEdgeArgs = {
  orderBy?: Maybe<Array<OrganizationMembersOrderBy>>;
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
  /** Reads a single `Address` that is related to this `Party`. */
  addressByAddressId?: Maybe<Address>;
  /** An edge for our `Party`. May be used by Relay 1. */
  partyEdge?: Maybe<PartiesEdge>;
};


/** The output of our create `Party` mutation. */
export type CreatePartyPayloadPartyEdgeArgs = {
  orderBy?: Maybe<Array<PartiesOrderBy>>;
};

/** All input for the create `ProjectBroker` mutation. */
export type CreateProjectBrokerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ProjectBroker` to be created by this mutation. */
  projectBroker: ProjectBrokerInput;
};

/** The output of our create `ProjectBroker` mutation. */
export type CreateProjectBrokerPayload = {
  __typename?: 'CreateProjectBrokerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ProjectBroker` that was created by this mutation. */
  projectBroker?: Maybe<ProjectBroker>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Project` that is related to this `ProjectBroker`. */
  projectByProjectId?: Maybe<Project>;
  /** Reads a single `Party` that is related to this `ProjectBroker`. */
  partyByBrokerId?: Maybe<Party>;
  /** Reads a single `Party` that is related to this `ProjectBroker`. */
  partyByAuthorizedByPartyId?: Maybe<Party>;
  /** Reads a single `User` that is related to this `ProjectBroker`. */
  userBySignerId?: Maybe<User>;
  /** An edge for our `ProjectBroker`. May be used by Relay 1. */
  projectBrokerEdge?: Maybe<ProjectBrokersEdge>;
};


/** The output of our create `ProjectBroker` mutation. */
export type CreateProjectBrokerPayloadProjectBrokerEdgeArgs = {
  orderBy?: Maybe<Array<ProjectBrokersOrderBy>>;
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
  /** Reads a single `Party` that is related to this `Project`. */
  partyByStewardId?: Maybe<Party>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByLandOwnerId?: Maybe<Party>;
  /** Reads a single `CreditClass` that is related to this `Project`. */
  creditClassByCreditClassId?: Maybe<CreditClass>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByRegistryId?: Maybe<Party>;
  /** Reads a single `Address` that is related to this `Project`. */
  addressByAddressId?: Maybe<Address>;
  /** Reads a single `User` that is related to this `Project`. */
  userByCreatorId?: Maybe<User>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByOriginatorId?: Maybe<Party>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByIssuerId?: Maybe<Party>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByResellerId?: Maybe<Party>;
  /** An edge for our `Project`. May be used by Relay 1. */
  projectEdge?: Maybe<ProjectsEdge>;
};


/** The output of our create `Project` mutation. */
export type CreateProjectPayloadProjectEdgeArgs = {
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
};

/** All input for the create `Purchase` mutation. */
export type CreatePurchaseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Purchase` to be created by this mutation. */
  purchase: PurchaseInput;
};

/** The output of our create `Purchase` mutation. */
export type CreatePurchasePayload = {
  __typename?: 'CreatePurchasePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Purchase` that was created by this mutation. */
  purchase?: Maybe<Purchase>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Wallet` that is related to this `Purchase`. */
  walletByBuyerWalletId?: Maybe<Wallet>;
  /** Reads a single `Address` that is related to this `Purchase`. */
  addressByAddressId?: Maybe<Address>;
  /** Reads a single `CreditVintage` that is related to this `Purchase`. */
  creditVintageByCreditVintageId?: Maybe<CreditVintage>;
  /** Reads a single `Party` that is related to this `Purchase`. */
  partyByPartyId?: Maybe<Party>;
  /** Reads a single `User` that is related to this `Purchase`. */
  userByUserId?: Maybe<User>;
  /** An edge for our `Purchase`. May be used by Relay 1. */
  purchaseEdge?: Maybe<PurchasesEdge>;
};


/** The output of our create `Purchase` mutation. */
export type CreatePurchasePayloadPurchaseEdgeArgs = {
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
};

/** All input for the create `Retirement` mutation. */
export type CreateRetirementInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Retirement` to be created by this mutation. */
  retirement: RetirementInput;
};

/** The output of our create `Retirement` mutation. */
export type CreateRetirementPayload = {
  __typename?: 'CreateRetirementPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Retirement` that was created by this mutation. */
  retirement?: Maybe<Retirement>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Wallet` that is related to this `Retirement`. */
  walletByWalletId?: Maybe<Wallet>;
  /** Reads a single `Address` that is related to this `Retirement`. */
  addressByAddressId?: Maybe<Address>;
  /** Reads a single `CreditVintage` that is related to this `Retirement`. */
  creditVintageByCreditVintageId?: Maybe<CreditVintage>;
  /** An edge for our `Retirement`. May be used by Relay 1. */
  retirementEdge?: Maybe<RetirementsEdge>;
};


/** The output of our create `Retirement` mutation. */
export type CreateRetirementPayloadRetirementEdgeArgs = {
  orderBy?: Maybe<Array<RetirementsOrderBy>>;
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

/** All input for the create `Transaction` mutation. */
export type CreateTransactionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Transaction` to be created by this mutation. */
  transaction: TransactionInput;
};

/** The output of our create `Transaction` mutation. */
export type CreateTransactionPayload = {
  __typename?: 'CreateTransactionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Transaction` that was created by this mutation. */
  transaction?: Maybe<Transaction>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `Transaction`. */
  partyByBrokerId?: Maybe<Party>;
  /** Reads a single `Wallet` that is related to this `Transaction`. */
  walletByFromWalletId?: Maybe<Wallet>;
  /** Reads a single `Wallet` that is related to this `Transaction`. */
  walletByToWalletId?: Maybe<Wallet>;
  /** Reads a single `CreditVintage` that is related to this `Transaction`. */
  creditVintageByCreditVintageId?: Maybe<CreditVintage>;
  /** Reads a single `Purchase` that is related to this `Transaction`. */
  purchaseByPurchaseId?: Maybe<Purchase>;
  /** An edge for our `Transaction`. May be used by Relay 1. */
  transactionEdge?: Maybe<TransactionsEdge>;
};


/** The output of our create `Transaction` mutation. */
export type CreateTransactionPayloadTransactionEdgeArgs = {
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
};

/** All input for the create `User` mutation. */
export type CreateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` to be created by this mutation. */
  user: UserInput;
};

/** All input for the `createUserOrganizationIfNeeded` mutation. */
export type CreateUserOrganizationIfNeededInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  orgName?: Maybe<Scalars['String']>;
  walletAddr?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
  orgAddress?: Maybe<Scalars['JSON']>;
  updates?: Maybe<Scalars['Boolean']>;
};

/** The output of our `createUserOrganizationIfNeeded` mutation. */
export type CreateUserOrganizationIfNeededPayload = {
  __typename?: 'CreateUserOrganizationIfNeededPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `Organization`. */
  partyByPartyId?: Maybe<Party>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
};


/** The output of our `createUserOrganizationIfNeeded` mutation. */
export type CreateUserOrganizationIfNeededPayloadOrganizationEdgeArgs = {
  orderBy?: Maybe<Array<OrganizationsOrderBy>>;
};

/** All input for the `createUserOrganization` mutation. */
export type CreateUserOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  orgName?: Maybe<Scalars['String']>;
  walletAddr?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
  orgAddress?: Maybe<Scalars['JSON']>;
};

/** The output of our `createUserOrganization` mutation. */
export type CreateUserOrganizationPayload = {
  __typename?: 'CreateUserOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `Organization`. */
  partyByPartyId?: Maybe<Party>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
};


/** The output of our `createUserOrganization` mutation. */
export type CreateUserOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: Maybe<Array<OrganizationsOrderBy>>;
};

/** The output of our create `User` mutation. */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` that was created by this mutation. */
  user?: Maybe<User>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `User`. */
  partyByPartyId?: Maybe<Party>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our create `User` mutation. */
export type CreateUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
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

export type CreditClass = Node & {
  __typename?: 'CreditClass';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  designerId?: Maybe<Scalars['UUID']>;
  methodologyId: Scalars['UUID'];
  uri: Scalars['String'];
  standard: Scalars['Boolean'];
  /** Reads a single `Party` that is related to this `CreditClass`. */
  partyByDesignerId?: Maybe<Party>;
  /** Reads a single `Methodology` that is related to this `CreditClass`. */
  methodologyByMethodologyId?: Maybe<Methodology>;
  /** Reads and enables pagination through a set of `CreditClassVersion`. */
  creditClassVersionsById: CreditClassVersionsConnection;
  /** Reads and enables pagination through a set of `CreditClassIssuer`. */
  creditClassIssuersByCreditClassId: CreditClassIssuersConnection;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByCreditClassId: CreditVintagesConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreditClassId: ProjectsConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByCreditClassIssuerCreditClassIdAndIssuerId: CreditClassWalletsByCreditClassIssuerCreditClassIdAndIssuerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreditVintageCreditClassIdAndProjectId: CreditClassProjectsByCreditVintageCreditClassIdAndProjectIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByCreditVintageCreditClassIdAndTokenizerId: CreditClassWalletsByCreditVintageCreditClassIdAndTokenizerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByCreditVintageCreditClassIdAndIssuerId: CreditClassPartiesByCreditVintageCreditClassIdAndIssuerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByCreditVintageCreditClassIdAndResellerId: CreditClassWalletsByCreditVintageCreditClassIdAndResellerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectCreditClassIdAndDeveloperId: CreditClassPartiesByProjectCreditClassIdAndDeveloperIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectCreditClassIdAndStewardId: CreditClassPartiesByProjectCreditClassIdAndStewardIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectCreditClassIdAndLandOwnerId: CreditClassPartiesByProjectCreditClassIdAndLandOwnerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectCreditClassIdAndRegistryId: CreditClassPartiesByProjectCreditClassIdAndRegistryIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Address`. */
  addressesByProjectCreditClassIdAndAddressId: CreditClassAddressesByProjectCreditClassIdAndAddressIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByProjectCreditClassIdAndCreatorId: CreditClassUsersByProjectCreditClassIdAndCreatorIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectCreditClassIdAndOriginatorId: CreditClassPartiesByProjectCreditClassIdAndOriginatorIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectCreditClassIdAndIssuerId: CreditClassPartiesByProjectCreditClassIdAndIssuerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectCreditClassIdAndResellerId: CreditClassPartiesByProjectCreditClassIdAndResellerIdManyToManyConnection;
};


export type CreditClassCreditClassVersionsByIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassVersionsOrderBy>>;
  condition?: Maybe<CreditClassVersionCondition>;
};


export type CreditClassCreditClassIssuersByCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassIssuersOrderBy>>;
  condition?: Maybe<CreditClassIssuerCondition>;
};


export type CreditClassCreditVintagesByCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};


export type CreditClassProjectsByCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};


export type CreditClassWalletsByCreditClassIssuerCreditClassIdAndIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type CreditClassProjectsByCreditVintageCreditClassIdAndProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};


export type CreditClassWalletsByCreditVintageCreditClassIdAndTokenizerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type CreditClassPartiesByCreditVintageCreditClassIdAndIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type CreditClassWalletsByCreditVintageCreditClassIdAndResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
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


export type CreditClassPartiesByProjectCreditClassIdAndStewardIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type CreditClassPartiesByProjectCreditClassIdAndLandOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type CreditClassPartiesByProjectCreditClassIdAndRegistryIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type CreditClassAddressesByProjectCreditClassIdAndAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AddressesOrderBy>>;
  condition?: Maybe<AddressCondition>;
};


export type CreditClassUsersByProjectCreditClassIdAndCreatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
};


export type CreditClassPartiesByProjectCreditClassIdAndOriginatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type CreditClassPartiesByProjectCreditClassIdAndIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type CreditClassPartiesByProjectCreditClassIdAndResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};

/** A connection to a list of `Address` values, with data from `Project`. */
export type CreditClassAddressesByProjectCreditClassIdAndAddressIdManyToManyConnection = {
  __typename?: 'CreditClassAddressesByProjectCreditClassIdAndAddressIdManyToManyConnection';
  /** A list of `Address` objects. */
  nodes: Array<Maybe<Address>>;
  /** A list of edges which contains the `Address`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<CreditClassAddressesByProjectCreditClassIdAndAddressIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Address` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Address` edge in the connection, with data from `Project`. */
export type CreditClassAddressesByProjectCreditClassIdAndAddressIdManyToManyEdge = {
  __typename?: 'CreditClassAddressesByProjectCreditClassIdAndAddressIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Address` at the end of the edge. */
  node?: Maybe<Address>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByAddressId: ProjectsConnection;
};


/** A `Address` edge in the connection, with data from `Project`. */
export type CreditClassAddressesByProjectCreditClassIdAndAddressIdManyToManyEdgeProjectsByAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
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
  /** Checks for equality with the object’s `designerId` field. */
  designerId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `methodologyId` field. */
  methodologyId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `uri` field. */
  uri?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `standard` field. */
  standard?: Maybe<Scalars['Boolean']>;
};

/** An input for mutations affecting `CreditClass` */
export type CreditClassInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  designerId?: Maybe<Scalars['UUID']>;
  methodologyId: Scalars['UUID'];
  uri?: Maybe<Scalars['String']>;
  standard?: Maybe<Scalars['Boolean']>;
};

export type CreditClassIssuer = {
  __typename?: 'CreditClassIssuer';
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  creditClassId: Scalars['UUID'];
  issuerId: Scalars['UUID'];
  /** Reads a single `CreditClass` that is related to this `CreditClassIssuer`. */
  creditClassByCreditClassId?: Maybe<CreditClass>;
  /** Reads a single `Wallet` that is related to this `CreditClassIssuer`. */
  walletByIssuerId?: Maybe<Wallet>;
};

/**
 * A condition to be used against `CreditClassIssuer` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type CreditClassIssuerCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `creditClassId` field. */
  creditClassId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `issuerId` field. */
  issuerId?: Maybe<Scalars['UUID']>;
};

/** An input for mutations affecting `CreditClassIssuer` */
export type CreditClassIssuerInput = {
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  creditClassId: Scalars['UUID'];
  issuerId: Scalars['UUID'];
};

/** A connection to a list of `CreditClassIssuer` values. */
export type CreditClassIssuersConnection = {
  __typename?: 'CreditClassIssuersConnection';
  /** A list of `CreditClassIssuer` objects. */
  nodes: Array<Maybe<CreditClassIssuer>>;
  /** A list of edges which contains the `CreditClassIssuer` and cursor to aid in pagination. */
  edges: Array<CreditClassIssuersEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditClassIssuer` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditClassIssuer` edge in the connection. */
export type CreditClassIssuersEdge = {
  __typename?: 'CreditClassIssuersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditClassIssuer` at the end of the edge. */
  node?: Maybe<CreditClassIssuer>;
};

/** Methods to use when ordering `CreditClassIssuer`. */
export enum CreditClassIssuersOrderBy {
  Natural = 'NATURAL',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  CreditClassIdAsc = 'CREDIT_CLASS_ID_ASC',
  CreditClassIdDesc = 'CREDIT_CLASS_ID_DESC',
  IssuerIdAsc = 'ISSUER_ID_ASC',
  IssuerIdDesc = 'ISSUER_ID_DESC'
}

/** A connection to a list of `Party` values, with data from `CreditVintage`. */
export type CreditClassPartiesByCreditVintageCreditClassIdAndIssuerIdManyToManyConnection = {
  __typename?: 'CreditClassPartiesByCreditVintageCreditClassIdAndIssuerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `CreditVintage`, and the cursor to aid in pagination. */
  edges: Array<CreditClassPartiesByCreditVintageCreditClassIdAndIssuerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `CreditVintage`. */
export type CreditClassPartiesByCreditVintageCreditClassIdAndIssuerIdManyToManyEdge = {
  __typename?: 'CreditClassPartiesByCreditVintageCreditClassIdAndIssuerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByIssuerId: CreditVintagesConnection;
};


/** A `Party` edge in the connection, with data from `CreditVintage`. */
export type CreditClassPartiesByCreditVintageCreditClassIdAndIssuerIdManyToManyEdgeCreditVintagesByIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
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
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type CreditClassPartiesByProjectCreditClassIdAndIssuerIdManyToManyConnection = {
  __typename?: 'CreditClassPartiesByProjectCreditClassIdAndIssuerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<CreditClassPartiesByProjectCreditClassIdAndIssuerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type CreditClassPartiesByProjectCreditClassIdAndIssuerIdManyToManyEdge = {
  __typename?: 'CreditClassPartiesByProjectCreditClassIdAndIssuerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByIssuerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type CreditClassPartiesByProjectCreditClassIdAndIssuerIdManyToManyEdgeProjectsByIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type CreditClassPartiesByProjectCreditClassIdAndLandOwnerIdManyToManyConnection = {
  __typename?: 'CreditClassPartiesByProjectCreditClassIdAndLandOwnerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<CreditClassPartiesByProjectCreditClassIdAndLandOwnerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type CreditClassPartiesByProjectCreditClassIdAndLandOwnerIdManyToManyEdge = {
  __typename?: 'CreditClassPartiesByProjectCreditClassIdAndLandOwnerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByLandOwnerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type CreditClassPartiesByProjectCreditClassIdAndLandOwnerIdManyToManyEdgeProjectsByLandOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type CreditClassPartiesByProjectCreditClassIdAndOriginatorIdManyToManyConnection = {
  __typename?: 'CreditClassPartiesByProjectCreditClassIdAndOriginatorIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<CreditClassPartiesByProjectCreditClassIdAndOriginatorIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type CreditClassPartiesByProjectCreditClassIdAndOriginatorIdManyToManyEdge = {
  __typename?: 'CreditClassPartiesByProjectCreditClassIdAndOriginatorIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByOriginatorId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type CreditClassPartiesByProjectCreditClassIdAndOriginatorIdManyToManyEdgeProjectsByOriginatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type CreditClassPartiesByProjectCreditClassIdAndRegistryIdManyToManyConnection = {
  __typename?: 'CreditClassPartiesByProjectCreditClassIdAndRegistryIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<CreditClassPartiesByProjectCreditClassIdAndRegistryIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type CreditClassPartiesByProjectCreditClassIdAndRegistryIdManyToManyEdge = {
  __typename?: 'CreditClassPartiesByProjectCreditClassIdAndRegistryIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByRegistryId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type CreditClassPartiesByProjectCreditClassIdAndRegistryIdManyToManyEdgeProjectsByRegistryIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type CreditClassPartiesByProjectCreditClassIdAndResellerIdManyToManyConnection = {
  __typename?: 'CreditClassPartiesByProjectCreditClassIdAndResellerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<CreditClassPartiesByProjectCreditClassIdAndResellerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type CreditClassPartiesByProjectCreditClassIdAndResellerIdManyToManyEdge = {
  __typename?: 'CreditClassPartiesByProjectCreditClassIdAndResellerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByResellerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type CreditClassPartiesByProjectCreditClassIdAndResellerIdManyToManyEdgeProjectsByResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type CreditClassPartiesByProjectCreditClassIdAndStewardIdManyToManyConnection = {
  __typename?: 'CreditClassPartiesByProjectCreditClassIdAndStewardIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<CreditClassPartiesByProjectCreditClassIdAndStewardIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type CreditClassPartiesByProjectCreditClassIdAndStewardIdManyToManyEdge = {
  __typename?: 'CreditClassPartiesByProjectCreditClassIdAndStewardIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByStewardId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type CreditClassPartiesByProjectCreditClassIdAndStewardIdManyToManyEdgeProjectsByStewardIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** Represents an update to a `CreditClass`. Fields that are set will be updated. */
export type CreditClassPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  designerId?: Maybe<Scalars['UUID']>;
  methodologyId?: Maybe<Scalars['UUID']>;
  uri?: Maybe<Scalars['String']>;
  standard?: Maybe<Scalars['Boolean']>;
};

/** A connection to a list of `Project` values, with data from `CreditVintage`. */
export type CreditClassProjectsByCreditVintageCreditClassIdAndProjectIdManyToManyConnection = {
  __typename?: 'CreditClassProjectsByCreditVintageCreditClassIdAndProjectIdManyToManyConnection';
  /** A list of `Project` objects. */
  nodes: Array<Maybe<Project>>;
  /** A list of edges which contains the `Project`, info from the `CreditVintage`, and the cursor to aid in pagination. */
  edges: Array<CreditClassProjectsByCreditVintageCreditClassIdAndProjectIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Project` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Project` edge in the connection, with data from `CreditVintage`. */
export type CreditClassProjectsByCreditVintageCreditClassIdAndProjectIdManyToManyEdge = {
  __typename?: 'CreditClassProjectsByCreditVintageCreditClassIdAndProjectIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Project` at the end of the edge. */
  node?: Maybe<Project>;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByProjectId: CreditVintagesConnection;
};


/** A `Project` edge in the connection, with data from `CreditVintage`. */
export type CreditClassProjectsByCreditVintageCreditClassIdAndProjectIdManyToManyEdgeCreditVintagesByProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};

/** A connection to a list of `User` values, with data from `Project`. */
export type CreditClassUsersByProjectCreditClassIdAndCreatorIdManyToManyConnection = {
  __typename?: 'CreditClassUsersByProjectCreditClassIdAndCreatorIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<CreditClassUsersByProjectCreditClassIdAndCreatorIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `Project`. */
export type CreditClassUsersByProjectCreditClassIdAndCreatorIdManyToManyEdge = {
  __typename?: 'CreditClassUsersByProjectCreditClassIdAndCreatorIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreatorId: ProjectsConnection;
};


/** A `User` edge in the connection, with data from `Project`. */
export type CreditClassUsersByProjectCreditClassIdAndCreatorIdManyToManyEdgeProjectsByCreatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

export type CreditClassVersion = Node & {
  __typename?: 'CreditClassVersion';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  name: Scalars['String'];
  version: Scalars['String'];
  dateDeveloped: Scalars['Datetime'];
  description?: Maybe<Scalars['String']>;
  stateMachine?: Maybe<Scalars['JSON']>;
  metadata?: Maybe<Scalars['JSON']>;
  image: Scalars['String'];
  documentId?: Maybe<Scalars['String']>;
  /** Reads a single `CreditClass` that is related to this `CreditClassVersion`. */
  creditClassById?: Maybe<CreditClass>;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByCreditClassVersionIdAndCreditClassVersionCreatedAt: CreditVintagesConnection;
};


export type CreditClassVersionCreditVintagesByCreditClassVersionIdAndCreditClassVersionCreatedAtArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
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
  /** Checks for equality with the object’s `version` field. */
  version?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `dateDeveloped` field. */
  dateDeveloped?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `stateMachine` field. */
  stateMachine?: Maybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `metadata` field. */
  metadata?: Maybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `image` field. */
  image?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `documentId` field. */
  documentId?: Maybe<Scalars['String']>;
};

/** An input for mutations affecting `CreditClassVersion` */
export type CreditClassVersionInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  name: Scalars['String'];
  version: Scalars['String'];
  dateDeveloped: Scalars['Datetime'];
  description?: Maybe<Scalars['String']>;
  stateMachine?: Maybe<Scalars['JSON']>;
  metadata?: Maybe<Scalars['JSON']>;
  image?: Maybe<Scalars['String']>;
  documentId?: Maybe<Scalars['String']>;
};

/** Represents an update to a `CreditClassVersion`. Fields that are set will be updated. */
export type CreditClassVersionPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  dateDeveloped?: Maybe<Scalars['Datetime']>;
  description?: Maybe<Scalars['String']>;
  stateMachine?: Maybe<Scalars['JSON']>;
  metadata?: Maybe<Scalars['JSON']>;
  image?: Maybe<Scalars['String']>;
  documentId?: Maybe<Scalars['String']>;
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
  VersionAsc = 'VERSION_ASC',
  VersionDesc = 'VERSION_DESC',
  DateDevelopedAsc = 'DATE_DEVELOPED_ASC',
  DateDevelopedDesc = 'DATE_DEVELOPED_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  StateMachineAsc = 'STATE_MACHINE_ASC',
  StateMachineDesc = 'STATE_MACHINE_DESC',
  MetadataAsc = 'METADATA_ASC',
  MetadataDesc = 'METADATA_DESC',
  ImageAsc = 'IMAGE_ASC',
  ImageDesc = 'IMAGE_DESC',
  DocumentIdAsc = 'DOCUMENT_ID_ASC',
  DocumentIdDesc = 'DOCUMENT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A connection to a list of `Wallet` values, with data from `CreditClassIssuer`. */
export type CreditClassWalletsByCreditClassIssuerCreditClassIdAndIssuerIdManyToManyConnection = {
  __typename?: 'CreditClassWalletsByCreditClassIssuerCreditClassIdAndIssuerIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `CreditClassIssuer`, and the cursor to aid in pagination. */
  edges: Array<CreditClassWalletsByCreditClassIssuerCreditClassIdAndIssuerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `CreditClassIssuer`. */
export type CreditClassWalletsByCreditClassIssuerCreditClassIdAndIssuerIdManyToManyEdge = {
  __typename?: 'CreditClassWalletsByCreditClassIssuerCreditClassIdAndIssuerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `CreditClassIssuer`. */
  creditClassIssuersByIssuerId: CreditClassIssuersConnection;
};


/** A `Wallet` edge in the connection, with data from `CreditClassIssuer`. */
export type CreditClassWalletsByCreditClassIssuerCreditClassIdAndIssuerIdManyToManyEdgeCreditClassIssuersByIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassIssuersOrderBy>>;
  condition?: Maybe<CreditClassIssuerCondition>;
};

/** A connection to a list of `Wallet` values, with data from `CreditVintage`. */
export type CreditClassWalletsByCreditVintageCreditClassIdAndResellerIdManyToManyConnection = {
  __typename?: 'CreditClassWalletsByCreditVintageCreditClassIdAndResellerIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `CreditVintage`, and the cursor to aid in pagination. */
  edges: Array<CreditClassWalletsByCreditVintageCreditClassIdAndResellerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `CreditVintage`. */
export type CreditClassWalletsByCreditVintageCreditClassIdAndResellerIdManyToManyEdge = {
  __typename?: 'CreditClassWalletsByCreditVintageCreditClassIdAndResellerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByResellerId: CreditVintagesConnection;
};


/** A `Wallet` edge in the connection, with data from `CreditVintage`. */
export type CreditClassWalletsByCreditVintageCreditClassIdAndResellerIdManyToManyEdgeCreditVintagesByResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};

/** A connection to a list of `Wallet` values, with data from `CreditVintage`. */
export type CreditClassWalletsByCreditVintageCreditClassIdAndTokenizerIdManyToManyConnection = {
  __typename?: 'CreditClassWalletsByCreditVintageCreditClassIdAndTokenizerIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `CreditVintage`, and the cursor to aid in pagination. */
  edges: Array<CreditClassWalletsByCreditVintageCreditClassIdAndTokenizerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `CreditVintage`. */
export type CreditClassWalletsByCreditVintageCreditClassIdAndTokenizerIdManyToManyEdge = {
  __typename?: 'CreditClassWalletsByCreditVintageCreditClassIdAndTokenizerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByTokenizerId: CreditVintagesConnection;
};


/** A `Wallet` edge in the connection, with data from `CreditVintage`. */
export type CreditClassWalletsByCreditVintageCreditClassIdAndTokenizerIdManyToManyEdgeCreditVintagesByTokenizerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
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
  DesignerIdAsc = 'DESIGNER_ID_ASC',
  DesignerIdDesc = 'DESIGNER_ID_DESC',
  MethodologyIdAsc = 'METHODOLOGY_ID_ASC',
  MethodologyIdDesc = 'METHODOLOGY_ID_DESC',
  UriAsc = 'URI_ASC',
  UriDesc = 'URI_DESC',
  StandardAsc = 'STANDARD_ASC',
  StandardDesc = 'STANDARD_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type CreditVintage = Node & {
  __typename?: 'CreditVintage';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  creditClassId?: Maybe<Scalars['UUID']>;
  projectId?: Maybe<Scalars['UUID']>;
  tokenizerId?: Maybe<Scalars['UUID']>;
  units?: Maybe<Scalars['BigFloat']>;
  initialDistribution?: Maybe<Scalars['JSON']>;
  startDate?: Maybe<Scalars['Datetime']>;
  endDate?: Maybe<Scalars['Datetime']>;
  eventId?: Maybe<Scalars['UUID']>;
  certificateLink?: Maybe<Scalars['String']>;
  txHash?: Maybe<Scalars['String']>;
  methodologyVersionId?: Maybe<Scalars['UUID']>;
  methodologyVersionCreatedAt?: Maybe<Scalars['Datetime']>;
  creditClassVersionId?: Maybe<Scalars['UUID']>;
  creditClassVersionCreatedAt?: Maybe<Scalars['Datetime']>;
  metadata?: Maybe<Scalars['JSON']>;
  issuerId?: Maybe<Scalars['UUID']>;
  resellerId?: Maybe<Scalars['UUID']>;
  /** Reads a single `CreditClass` that is related to this `CreditVintage`. */
  creditClassByCreditClassId?: Maybe<CreditClass>;
  /** Reads a single `Project` that is related to this `CreditVintage`. */
  projectByProjectId?: Maybe<Project>;
  /** Reads a single `Wallet` that is related to this `CreditVintage`. */
  walletByTokenizerId?: Maybe<Wallet>;
  /** Reads a single `Event` that is related to this `CreditVintage`. */
  eventByEventId?: Maybe<Event>;
  /** Reads a single `MethodologyVersion` that is related to this `CreditVintage`. */
  methodologyVersionByMethodologyVersionIdAndMethodologyVersionCreatedAt?: Maybe<MethodologyVersion>;
  /** Reads a single `CreditClassVersion` that is related to this `CreditVintage`. */
  creditClassVersionByCreditClassVersionIdAndCreditClassVersionCreatedAt?: Maybe<CreditClassVersion>;
  /** Reads a single `Party` that is related to this `CreditVintage`. */
  partyByIssuerId?: Maybe<Party>;
  /** Reads a single `Wallet` that is related to this `CreditVintage`. */
  walletByResellerId?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `AccountBalance`. */
  accountBalancesByCreditVintageId: AccountBalancesConnection;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByCreditVintageId: TransactionsConnection;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByCreditVintageId: PurchasesConnection;
  /** Reads and enables pagination through a set of `Retirement`. */
  retirementsByCreditVintageId: RetirementsConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByAccountBalanceCreditVintageIdAndWalletId: CreditVintageWalletsByAccountBalanceCreditVintageIdAndWalletIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByTransactionCreditVintageIdAndBrokerId: CreditVintagePartiesByTransactionCreditVintageIdAndBrokerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByTransactionCreditVintageIdAndFromWalletId: CreditVintageWalletsByTransactionCreditVintageIdAndFromWalletIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByTransactionCreditVintageIdAndToWalletId: CreditVintageWalletsByTransactionCreditVintageIdAndToWalletIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByTransactionCreditVintageIdAndPurchaseId: CreditVintagePurchasesByTransactionCreditVintageIdAndPurchaseIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByPurchaseCreditVintageIdAndBuyerWalletId: CreditVintageWalletsByPurchaseCreditVintageIdAndBuyerWalletIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Address`. */
  addressesByPurchaseCreditVintageIdAndAddressId: CreditVintageAddressesByPurchaseCreditVintageIdAndAddressIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByPurchaseCreditVintageIdAndPartyId: CreditVintagePartiesByPurchaseCreditVintageIdAndPartyIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByPurchaseCreditVintageIdAndUserId: CreditVintageUsersByPurchaseCreditVintageIdAndUserIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByRetirementCreditVintageIdAndWalletId: CreditVintageWalletsByRetirementCreditVintageIdAndWalletIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Address`. */
  addressesByRetirementCreditVintageIdAndAddressId: CreditVintageAddressesByRetirementCreditVintageIdAndAddressIdManyToManyConnection;
};


export type CreditVintageAccountBalancesByCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountBalancesOrderBy>>;
  condition?: Maybe<AccountBalanceCondition>;
};


export type CreditVintageTransactionsByCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};


export type CreditVintagePurchasesByCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};


export type CreditVintageRetirementsByCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<RetirementsOrderBy>>;
  condition?: Maybe<RetirementCondition>;
};


export type CreditVintageWalletsByAccountBalanceCreditVintageIdAndWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type CreditVintagePartiesByTransactionCreditVintageIdAndBrokerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type CreditVintageWalletsByTransactionCreditVintageIdAndFromWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type CreditVintageWalletsByTransactionCreditVintageIdAndToWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type CreditVintagePurchasesByTransactionCreditVintageIdAndPurchaseIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};


export type CreditVintageWalletsByPurchaseCreditVintageIdAndBuyerWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type CreditVintageAddressesByPurchaseCreditVintageIdAndAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AddressesOrderBy>>;
  condition?: Maybe<AddressCondition>;
};


export type CreditVintagePartiesByPurchaseCreditVintageIdAndPartyIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type CreditVintageUsersByPurchaseCreditVintageIdAndUserIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
};


export type CreditVintageWalletsByRetirementCreditVintageIdAndWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type CreditVintageAddressesByRetirementCreditVintageIdAndAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AddressesOrderBy>>;
  condition?: Maybe<AddressCondition>;
};

/** A connection to a list of `Address` values, with data from `Purchase`. */
export type CreditVintageAddressesByPurchaseCreditVintageIdAndAddressIdManyToManyConnection = {
  __typename?: 'CreditVintageAddressesByPurchaseCreditVintageIdAndAddressIdManyToManyConnection';
  /** A list of `Address` objects. */
  nodes: Array<Maybe<Address>>;
  /** A list of edges which contains the `Address`, info from the `Purchase`, and the cursor to aid in pagination. */
  edges: Array<CreditVintageAddressesByPurchaseCreditVintageIdAndAddressIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Address` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Address` edge in the connection, with data from `Purchase`. */
export type CreditVintageAddressesByPurchaseCreditVintageIdAndAddressIdManyToManyEdge = {
  __typename?: 'CreditVintageAddressesByPurchaseCreditVintageIdAndAddressIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Address` at the end of the edge. */
  node?: Maybe<Address>;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByAddressId: PurchasesConnection;
};


/** A `Address` edge in the connection, with data from `Purchase`. */
export type CreditVintageAddressesByPurchaseCreditVintageIdAndAddressIdManyToManyEdgePurchasesByAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};

/** A connection to a list of `Address` values, with data from `Retirement`. */
export type CreditVintageAddressesByRetirementCreditVintageIdAndAddressIdManyToManyConnection = {
  __typename?: 'CreditVintageAddressesByRetirementCreditVintageIdAndAddressIdManyToManyConnection';
  /** A list of `Address` objects. */
  nodes: Array<Maybe<Address>>;
  /** A list of edges which contains the `Address`, info from the `Retirement`, and the cursor to aid in pagination. */
  edges: Array<CreditVintageAddressesByRetirementCreditVintageIdAndAddressIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Address` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Address` edge in the connection, with data from `Retirement`. */
export type CreditVintageAddressesByRetirementCreditVintageIdAndAddressIdManyToManyEdge = {
  __typename?: 'CreditVintageAddressesByRetirementCreditVintageIdAndAddressIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Address` at the end of the edge. */
  node?: Maybe<Address>;
  /** Reads and enables pagination through a set of `Retirement`. */
  retirementsByAddressId: RetirementsConnection;
};


/** A `Address` edge in the connection, with data from `Retirement`. */
export type CreditVintageAddressesByRetirementCreditVintageIdAndAddressIdManyToManyEdgeRetirementsByAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<RetirementsOrderBy>>;
  condition?: Maybe<RetirementCondition>;
};

/**
 * A condition to be used against `CreditVintage` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type CreditVintageCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `creditClassId` field. */
  creditClassId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `tokenizerId` field. */
  tokenizerId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `units` field. */
  units?: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `initialDistribution` field. */
  initialDistribution?: Maybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `startDate` field. */
  startDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `endDate` field. */
  endDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `eventId` field. */
  eventId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `certificateLink` field. */
  certificateLink?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `txHash` field. */
  txHash?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `methodologyVersionId` field. */
  methodologyVersionId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `methodologyVersionCreatedAt` field. */
  methodologyVersionCreatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `creditClassVersionId` field. */
  creditClassVersionId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `creditClassVersionCreatedAt` field. */
  creditClassVersionCreatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `metadata` field. */
  metadata?: Maybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `issuerId` field. */
  issuerId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `resellerId` field. */
  resellerId?: Maybe<Scalars['UUID']>;
};

/** An input for mutations affecting `CreditVintage` */
export type CreditVintageInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  creditClassId?: Maybe<Scalars['UUID']>;
  projectId?: Maybe<Scalars['UUID']>;
  tokenizerId?: Maybe<Scalars['UUID']>;
  units?: Maybe<Scalars['BigFloat']>;
  initialDistribution?: Maybe<Scalars['JSON']>;
  startDate?: Maybe<Scalars['Datetime']>;
  endDate?: Maybe<Scalars['Datetime']>;
  eventId?: Maybe<Scalars['UUID']>;
  certificateLink?: Maybe<Scalars['String']>;
  txHash?: Maybe<Scalars['String']>;
  methodologyVersionId?: Maybe<Scalars['UUID']>;
  methodologyVersionCreatedAt?: Maybe<Scalars['Datetime']>;
  creditClassVersionId?: Maybe<Scalars['UUID']>;
  creditClassVersionCreatedAt?: Maybe<Scalars['Datetime']>;
  metadata?: Maybe<Scalars['JSON']>;
  issuerId?: Maybe<Scalars['UUID']>;
  resellerId?: Maybe<Scalars['UUID']>;
};

/** A connection to a list of `Party` values, with data from `Purchase`. */
export type CreditVintagePartiesByPurchaseCreditVintageIdAndPartyIdManyToManyConnection = {
  __typename?: 'CreditVintagePartiesByPurchaseCreditVintageIdAndPartyIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Purchase`, and the cursor to aid in pagination. */
  edges: Array<CreditVintagePartiesByPurchaseCreditVintageIdAndPartyIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Purchase`. */
export type CreditVintagePartiesByPurchaseCreditVintageIdAndPartyIdManyToManyEdge = {
  __typename?: 'CreditVintagePartiesByPurchaseCreditVintageIdAndPartyIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByPartyId: PurchasesConnection;
};


/** A `Party` edge in the connection, with data from `Purchase`. */
export type CreditVintagePartiesByPurchaseCreditVintageIdAndPartyIdManyToManyEdgePurchasesByPartyIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};

/** A connection to a list of `Party` values, with data from `Transaction`. */
export type CreditVintagePartiesByTransactionCreditVintageIdAndBrokerIdManyToManyConnection = {
  __typename?: 'CreditVintagePartiesByTransactionCreditVintageIdAndBrokerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Transaction`, and the cursor to aid in pagination. */
  edges: Array<CreditVintagePartiesByTransactionCreditVintageIdAndBrokerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Transaction`. */
export type CreditVintagePartiesByTransactionCreditVintageIdAndBrokerIdManyToManyEdge = {
  __typename?: 'CreditVintagePartiesByTransactionCreditVintageIdAndBrokerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByBrokerId: TransactionsConnection;
};


/** A `Party` edge in the connection, with data from `Transaction`. */
export type CreditVintagePartiesByTransactionCreditVintageIdAndBrokerIdManyToManyEdgeTransactionsByBrokerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};

/** Represents an update to a `CreditVintage`. Fields that are set will be updated. */
export type CreditVintagePatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  creditClassId?: Maybe<Scalars['UUID']>;
  projectId?: Maybe<Scalars['UUID']>;
  tokenizerId?: Maybe<Scalars['UUID']>;
  units?: Maybe<Scalars['BigFloat']>;
  initialDistribution?: Maybe<Scalars['JSON']>;
  startDate?: Maybe<Scalars['Datetime']>;
  endDate?: Maybe<Scalars['Datetime']>;
  eventId?: Maybe<Scalars['UUID']>;
  certificateLink?: Maybe<Scalars['String']>;
  txHash?: Maybe<Scalars['String']>;
  methodologyVersionId?: Maybe<Scalars['UUID']>;
  methodologyVersionCreatedAt?: Maybe<Scalars['Datetime']>;
  creditClassVersionId?: Maybe<Scalars['UUID']>;
  creditClassVersionCreatedAt?: Maybe<Scalars['Datetime']>;
  metadata?: Maybe<Scalars['JSON']>;
  issuerId?: Maybe<Scalars['UUID']>;
  resellerId?: Maybe<Scalars['UUID']>;
};

/** A connection to a list of `Purchase` values, with data from `Transaction`. */
export type CreditVintagePurchasesByTransactionCreditVintageIdAndPurchaseIdManyToManyConnection = {
  __typename?: 'CreditVintagePurchasesByTransactionCreditVintageIdAndPurchaseIdManyToManyConnection';
  /** A list of `Purchase` objects. */
  nodes: Array<Maybe<Purchase>>;
  /** A list of edges which contains the `Purchase`, info from the `Transaction`, and the cursor to aid in pagination. */
  edges: Array<CreditVintagePurchasesByTransactionCreditVintageIdAndPurchaseIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Purchase` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Purchase` edge in the connection, with data from `Transaction`. */
export type CreditVintagePurchasesByTransactionCreditVintageIdAndPurchaseIdManyToManyEdge = {
  __typename?: 'CreditVintagePurchasesByTransactionCreditVintageIdAndPurchaseIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Purchase` at the end of the edge. */
  node?: Maybe<Purchase>;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByPurchaseId: TransactionsConnection;
};


/** A `Purchase` edge in the connection, with data from `Transaction`. */
export type CreditVintagePurchasesByTransactionCreditVintageIdAndPurchaseIdManyToManyEdgeTransactionsByPurchaseIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};

/** A connection to a list of `User` values, with data from `Purchase`. */
export type CreditVintageUsersByPurchaseCreditVintageIdAndUserIdManyToManyConnection = {
  __typename?: 'CreditVintageUsersByPurchaseCreditVintageIdAndUserIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `Purchase`, and the cursor to aid in pagination. */
  edges: Array<CreditVintageUsersByPurchaseCreditVintageIdAndUserIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `Purchase`. */
export type CreditVintageUsersByPurchaseCreditVintageIdAndUserIdManyToManyEdge = {
  __typename?: 'CreditVintageUsersByPurchaseCreditVintageIdAndUserIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByUserId: PurchasesConnection;
};


/** A `User` edge in the connection, with data from `Purchase`. */
export type CreditVintageUsersByPurchaseCreditVintageIdAndUserIdManyToManyEdgePurchasesByUserIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};

/** A connection to a list of `Wallet` values, with data from `AccountBalance`. */
export type CreditVintageWalletsByAccountBalanceCreditVintageIdAndWalletIdManyToManyConnection = {
  __typename?: 'CreditVintageWalletsByAccountBalanceCreditVintageIdAndWalletIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `AccountBalance`, and the cursor to aid in pagination. */
  edges: Array<CreditVintageWalletsByAccountBalanceCreditVintageIdAndWalletIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `AccountBalance`. */
export type CreditVintageWalletsByAccountBalanceCreditVintageIdAndWalletIdManyToManyEdge = {
  __typename?: 'CreditVintageWalletsByAccountBalanceCreditVintageIdAndWalletIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  liquidBalance?: Maybe<Scalars['BigFloat']>;
  burntBalance?: Maybe<Scalars['BigFloat']>;
};

/** A connection to a list of `Wallet` values, with data from `Purchase`. */
export type CreditVintageWalletsByPurchaseCreditVintageIdAndBuyerWalletIdManyToManyConnection = {
  __typename?: 'CreditVintageWalletsByPurchaseCreditVintageIdAndBuyerWalletIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `Purchase`, and the cursor to aid in pagination. */
  edges: Array<CreditVintageWalletsByPurchaseCreditVintageIdAndBuyerWalletIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `Purchase`. */
export type CreditVintageWalletsByPurchaseCreditVintageIdAndBuyerWalletIdManyToManyEdge = {
  __typename?: 'CreditVintageWalletsByPurchaseCreditVintageIdAndBuyerWalletIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByBuyerWalletId: PurchasesConnection;
};


/** A `Wallet` edge in the connection, with data from `Purchase`. */
export type CreditVintageWalletsByPurchaseCreditVintageIdAndBuyerWalletIdManyToManyEdgePurchasesByBuyerWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};

/** A connection to a list of `Wallet` values, with data from `Retirement`. */
export type CreditVintageWalletsByRetirementCreditVintageIdAndWalletIdManyToManyConnection = {
  __typename?: 'CreditVintageWalletsByRetirementCreditVintageIdAndWalletIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `Retirement`, and the cursor to aid in pagination. */
  edges: Array<CreditVintageWalletsByRetirementCreditVintageIdAndWalletIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `Retirement`. */
export type CreditVintageWalletsByRetirementCreditVintageIdAndWalletIdManyToManyEdge = {
  __typename?: 'CreditVintageWalletsByRetirementCreditVintageIdAndWalletIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `Retirement`. */
  retirementsByWalletId: RetirementsConnection;
};


/** A `Wallet` edge in the connection, with data from `Retirement`. */
export type CreditVintageWalletsByRetirementCreditVintageIdAndWalletIdManyToManyEdgeRetirementsByWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<RetirementsOrderBy>>;
  condition?: Maybe<RetirementCondition>;
};

/** A connection to a list of `Wallet` values, with data from `Transaction`. */
export type CreditVintageWalletsByTransactionCreditVintageIdAndFromWalletIdManyToManyConnection = {
  __typename?: 'CreditVintageWalletsByTransactionCreditVintageIdAndFromWalletIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `Transaction`, and the cursor to aid in pagination. */
  edges: Array<CreditVintageWalletsByTransactionCreditVintageIdAndFromWalletIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `Transaction`. */
export type CreditVintageWalletsByTransactionCreditVintageIdAndFromWalletIdManyToManyEdge = {
  __typename?: 'CreditVintageWalletsByTransactionCreditVintageIdAndFromWalletIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByFromWalletId: TransactionsConnection;
};


/** A `Wallet` edge in the connection, with data from `Transaction`. */
export type CreditVintageWalletsByTransactionCreditVintageIdAndFromWalletIdManyToManyEdgeTransactionsByFromWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};

/** A connection to a list of `Wallet` values, with data from `Transaction`. */
export type CreditVintageWalletsByTransactionCreditVintageIdAndToWalletIdManyToManyConnection = {
  __typename?: 'CreditVintageWalletsByTransactionCreditVintageIdAndToWalletIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `Transaction`, and the cursor to aid in pagination. */
  edges: Array<CreditVintageWalletsByTransactionCreditVintageIdAndToWalletIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `Transaction`. */
export type CreditVintageWalletsByTransactionCreditVintageIdAndToWalletIdManyToManyEdge = {
  __typename?: 'CreditVintageWalletsByTransactionCreditVintageIdAndToWalletIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByToWalletId: TransactionsConnection;
};


/** A `Wallet` edge in the connection, with data from `Transaction`. */
export type CreditVintageWalletsByTransactionCreditVintageIdAndToWalletIdManyToManyEdgeTransactionsByToWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};

/** A connection to a list of `CreditVintage` values. */
export type CreditVintagesConnection = {
  __typename?: 'CreditVintagesConnection';
  /** A list of `CreditVintage` objects. */
  nodes: Array<Maybe<CreditVintage>>;
  /** A list of edges which contains the `CreditVintage` and cursor to aid in pagination. */
  edges: Array<CreditVintagesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditVintage` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditVintage` edge in the connection. */
export type CreditVintagesEdge = {
  __typename?: 'CreditVintagesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditVintage` at the end of the edge. */
  node?: Maybe<CreditVintage>;
};

/** Methods to use when ordering `CreditVintage`. */
export enum CreditVintagesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  CreditClassIdAsc = 'CREDIT_CLASS_ID_ASC',
  CreditClassIdDesc = 'CREDIT_CLASS_ID_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  TokenizerIdAsc = 'TOKENIZER_ID_ASC',
  TokenizerIdDesc = 'TOKENIZER_ID_DESC',
  UnitsAsc = 'UNITS_ASC',
  UnitsDesc = 'UNITS_DESC',
  InitialDistributionAsc = 'INITIAL_DISTRIBUTION_ASC',
  InitialDistributionDesc = 'INITIAL_DISTRIBUTION_DESC',
  StartDateAsc = 'START_DATE_ASC',
  StartDateDesc = 'START_DATE_DESC',
  EndDateAsc = 'END_DATE_ASC',
  EndDateDesc = 'END_DATE_DESC',
  EventIdAsc = 'EVENT_ID_ASC',
  EventIdDesc = 'EVENT_ID_DESC',
  CertificateLinkAsc = 'CERTIFICATE_LINK_ASC',
  CertificateLinkDesc = 'CERTIFICATE_LINK_DESC',
  TxHashAsc = 'TX_HASH_ASC',
  TxHashDesc = 'TX_HASH_DESC',
  MethodologyVersionIdAsc = 'METHODOLOGY_VERSION_ID_ASC',
  MethodologyVersionIdDesc = 'METHODOLOGY_VERSION_ID_DESC',
  MethodologyVersionCreatedAtAsc = 'METHODOLOGY_VERSION_CREATED_AT_ASC',
  MethodologyVersionCreatedAtDesc = 'METHODOLOGY_VERSION_CREATED_AT_DESC',
  CreditClassVersionIdAsc = 'CREDIT_CLASS_VERSION_ID_ASC',
  CreditClassVersionIdDesc = 'CREDIT_CLASS_VERSION_ID_DESC',
  CreditClassVersionCreatedAtAsc = 'CREDIT_CLASS_VERSION_CREATED_AT_ASC',
  CreditClassVersionCreatedAtDesc = 'CREDIT_CLASS_VERSION_CREATED_AT_DESC',
  MetadataAsc = 'METADATA_ASC',
  MetadataDesc = 'METADATA_DESC',
  IssuerIdAsc = 'ISSUER_ID_ASC',
  IssuerIdDesc = 'ISSUER_ID_DESC',
  ResellerIdAsc = 'RESELLER_ID_ASC',
  ResellerIdDesc = 'RESELLER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}



/** All input for the `deleteAccountBalanceByCreditVintageIdAndWalletId` mutation. */
export type DeleteAccountBalanceByCreditVintageIdAndWalletIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  creditVintageId: Scalars['UUID'];
  walletId: Scalars['UUID'];
};

/** All input for the `deleteAccountBalanceById` mutation. */
export type DeleteAccountBalanceByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteAccountBalance` mutation. */
export type DeleteAccountBalanceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `AccountBalance` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `AccountBalance` mutation. */
export type DeleteAccountBalancePayload = {
  __typename?: 'DeleteAccountBalancePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `AccountBalance` that was deleted by this mutation. */
  accountBalance?: Maybe<AccountBalance>;
  deletedAccountBalanceId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `CreditVintage` that is related to this `AccountBalance`. */
  creditVintageByCreditVintageId?: Maybe<CreditVintage>;
  /** Reads a single `Wallet` that is related to this `AccountBalance`. */
  walletByWalletId?: Maybe<Wallet>;
  /** An edge for our `AccountBalance`. May be used by Relay 1. */
  accountBalanceEdge?: Maybe<AccountBalancesEdge>;
};


/** The output of our delete `AccountBalance` mutation. */
export type DeleteAccountBalancePayloadAccountBalanceEdgeArgs = {
  orderBy?: Maybe<Array<AccountBalancesOrderBy>>;
};

/** All input for the `deleteAddressById` mutation. */
export type DeleteAddressByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteAddress` mutation. */
export type DeleteAddressInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Address` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Address` mutation. */
export type DeleteAddressPayload = {
  __typename?: 'DeleteAddressPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Address` that was deleted by this mutation. */
  address?: Maybe<Address>;
  deletedAddressId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Address`. May be used by Relay 1. */
  addressEdge?: Maybe<AddressesEdge>;
};


/** The output of our delete `Address` mutation. */
export type DeleteAddressPayloadAddressEdgeArgs = {
  orderBy?: Maybe<Array<AddressesOrderBy>>;
};

/** All input for the `deleteAdminByAuth0Sub` mutation. */
export type DeleteAdminByAuth0SubInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  auth0Sub: Scalars['String'];
};

/** All input for the `deleteAdminById` mutation. */
export type DeleteAdminByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteAdmin` mutation. */
export type DeleteAdminInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Admin` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Admin` mutation. */
export type DeleteAdminPayload = {
  __typename?: 'DeleteAdminPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Admin` that was deleted by this mutation. */
  admin?: Maybe<Admin>;
  deletedAdminId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Admin`. May be used by Relay 1. */
  adminEdge?: Maybe<AdminsEdge>;
};


/** The output of our delete `Admin` mutation. */
export type DeleteAdminPayloadAdminEdgeArgs = {
  orderBy?: Maybe<Array<AdminsOrderBy>>;
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
  partyByDesignerId?: Maybe<Party>;
  /** Reads a single `Methodology` that is related to this `CreditClass`. */
  methodologyByMethodologyId?: Maybe<Methodology>;
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

/** All input for the `deleteCreditVintageByEventId` mutation. */
export type DeleteCreditVintageByEventIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  eventId: Scalars['UUID'];
};

/** All input for the `deleteCreditVintageById` mutation. */
export type DeleteCreditVintageByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteCreditVintage` mutation. */
export type DeleteCreditVintageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `CreditVintage` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `CreditVintage` mutation. */
export type DeleteCreditVintagePayload = {
  __typename?: 'DeleteCreditVintagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CreditVintage` that was deleted by this mutation. */
  creditVintage?: Maybe<CreditVintage>;
  deletedCreditVintageId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `CreditClass` that is related to this `CreditVintage`. */
  creditClassByCreditClassId?: Maybe<CreditClass>;
  /** Reads a single `Project` that is related to this `CreditVintage`. */
  projectByProjectId?: Maybe<Project>;
  /** Reads a single `Wallet` that is related to this `CreditVintage`. */
  walletByTokenizerId?: Maybe<Wallet>;
  /** Reads a single `Event` that is related to this `CreditVintage`. */
  eventByEventId?: Maybe<Event>;
  /** Reads a single `MethodologyVersion` that is related to this `CreditVintage`. */
  methodologyVersionByMethodologyVersionIdAndMethodologyVersionCreatedAt?: Maybe<MethodologyVersion>;
  /** Reads a single `CreditClassVersion` that is related to this `CreditVintage`. */
  creditClassVersionByCreditClassVersionIdAndCreditClassVersionCreatedAt?: Maybe<CreditClassVersion>;
  /** Reads a single `Party` that is related to this `CreditVintage`. */
  partyByIssuerId?: Maybe<Party>;
  /** Reads a single `Wallet` that is related to this `CreditVintage`. */
  walletByResellerId?: Maybe<Wallet>;
  /** An edge for our `CreditVintage`. May be used by Relay 1. */
  creditVintageEdge?: Maybe<CreditVintagesEdge>;
};


/** The output of our delete `CreditVintage` mutation. */
export type DeleteCreditVintagePayloadCreditVintageEdgeArgs = {
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
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
  /** Reads a single `Event` that is related to this `Document`. */
  eventByEventId?: Maybe<Event>;
  /** An edge for our `Document`. May be used by Relay 1. */
  documentEdge?: Maybe<DocumentsEdge>;
};


/** The output of our delete `Document` mutation. */
export type DeleteDocumentPayloadDocumentEdgeArgs = {
  orderBy?: Maybe<Array<DocumentsOrderBy>>;
};

/** All input for the `deleteEventById` mutation. */
export type DeleteEventByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteEvent` mutation. */
export type DeleteEventInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Event` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Event` mutation. */
export type DeleteEventPayload = {
  __typename?: 'DeleteEventPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Event` that was deleted by this mutation. */
  event?: Maybe<Event>;
  deletedEventId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Project` that is related to this `Event`. */
  projectByProjectId?: Maybe<Project>;
  /** An edge for our `Event`. May be used by Relay 1. */
  eventEdge?: Maybe<EventsEdge>;
};


/** The output of our delete `Event` mutation. */
export type DeleteEventPayloadEventEdgeArgs = {
  orderBy?: Maybe<Array<EventsOrderBy>>;
};

/** All input for the `deleteFlywaySchemaHistoryByInstalledRank` mutation. */
export type DeleteFlywaySchemaHistoryByInstalledRankInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  installedRank: Scalars['Int'];
};

/** All input for the `deleteFlywaySchemaHistory` mutation. */
export type DeleteFlywaySchemaHistoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `FlywaySchemaHistory` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `FlywaySchemaHistory` mutation. */
export type DeleteFlywaySchemaHistoryPayload = {
  __typename?: 'DeleteFlywaySchemaHistoryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `FlywaySchemaHistory` that was deleted by this mutation. */
  flywaySchemaHistory?: Maybe<FlywaySchemaHistory>;
  deletedFlywaySchemaHistoryId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `FlywaySchemaHistory`. May be used by Relay 1. */
  flywaySchemaHistoryEdge?: Maybe<FlywaySchemaHistoriesEdge>;
};


/** The output of our delete `FlywaySchemaHistory` mutation. */
export type DeleteFlywaySchemaHistoryPayloadFlywaySchemaHistoryEdgeArgs = {
  orderBy?: Maybe<Array<FlywaySchemaHistoriesOrderBy>>;
};

/** All input for the `deleteMethodologyById` mutation. */
export type DeleteMethodologyByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteMethodology` mutation. */
export type DeleteMethodologyInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Methodology` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Methodology` mutation. */
export type DeleteMethodologyPayload = {
  __typename?: 'DeleteMethodologyPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Methodology` that was deleted by this mutation. */
  methodology?: Maybe<Methodology>;
  deletedMethodologyId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `Methodology`. */
  partyByAuthorId?: Maybe<Party>;
  /** An edge for our `Methodology`. May be used by Relay 1. */
  methodologyEdge?: Maybe<MethodologiesEdge>;
};


/** The output of our delete `Methodology` mutation. */
export type DeleteMethodologyPayloadMethodologyEdgeArgs = {
  orderBy?: Maybe<Array<MethodologiesOrderBy>>;
};

/** All input for the `deleteMethodologyVersionByIdAndCreatedAt` mutation. */
export type DeleteMethodologyVersionByIdAndCreatedAtInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
};

/** All input for the `deleteMethodologyVersion` mutation. */
export type DeleteMethodologyVersionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MethodologyVersion` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `MethodologyVersion` mutation. */
export type DeleteMethodologyVersionPayload = {
  __typename?: 'DeleteMethodologyVersionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MethodologyVersion` that was deleted by this mutation. */
  methodologyVersion?: Maybe<MethodologyVersion>;
  deletedMethodologyVersionId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Methodology` that is related to this `MethodologyVersion`. */
  methodologyById?: Maybe<Methodology>;
  /** An edge for our `MethodologyVersion`. May be used by Relay 1. */
  methodologyVersionEdge?: Maybe<MethodologyVersionsEdge>;
};


/** The output of our delete `MethodologyVersion` mutation. */
export type DeleteMethodologyVersionPayloadMethodologyVersionEdgeArgs = {
  orderBy?: Maybe<Array<MethodologyVersionsOrderBy>>;
};

/** All input for the `deleteMrvById` mutation. */
export type DeleteMrvByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteMrv` mutation. */
export type DeleteMrvInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Mrv` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Mrv` mutation. */
export type DeleteMrvPayload = {
  __typename?: 'DeleteMrvPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Mrv` that was deleted by this mutation. */
  mrv?: Maybe<Mrv>;
  deletedMrvId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Project` that is related to this `Mrv`. */
  projectByProjectId?: Maybe<Project>;
  /** An edge for our `Mrv`. May be used by Relay 1. */
  mrvEdge?: Maybe<MrvsEdge>;
};


/** The output of our delete `Mrv` mutation. */
export type DeleteMrvPayloadMrvEdgeArgs = {
  orderBy?: Maybe<Array<MrvsOrderBy>>;
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

/** All input for the `deleteOrganizationByPartyIdAndType` mutation. */
export type DeleteOrganizationByPartyIdAndTypeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  partyId: Scalars['UUID'];
  type: PartyType;
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

/** All input for the `deleteOrganizationMemberByMemberIdAndOrganizationId` mutation. */
export type DeleteOrganizationMemberByMemberIdAndOrganizationIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  memberId: Scalars['UUID'];
  organizationId: Scalars['UUID'];
};

/** All input for the `deleteOrganizationMember` mutation. */
export type DeleteOrganizationMemberInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `OrganizationMember` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `OrganizationMember` mutation. */
export type DeleteOrganizationMemberPayload = {
  __typename?: 'DeleteOrganizationMemberPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `OrganizationMember` that was deleted by this mutation. */
  organizationMember?: Maybe<OrganizationMember>;
  deletedOrganizationMemberId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `OrganizationMember`. */
  userByMemberId?: Maybe<User>;
  /** Reads a single `Organization` that is related to this `OrganizationMember`. */
  organizationByOrganizationId?: Maybe<Organization>;
  /** An edge for our `OrganizationMember`. May be used by Relay 1. */
  organizationMemberEdge?: Maybe<OrganizationMembersEdge>;
};


/** The output of our delete `OrganizationMember` mutation. */
export type DeleteOrganizationMemberPayloadOrganizationMemberEdgeArgs = {
  orderBy?: Maybe<Array<OrganizationMembersOrderBy>>;
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
  /** Reads a single `Address` that is related to this `Party`. */
  addressByAddressId?: Maybe<Address>;
  /** An edge for our `Party`. May be used by Relay 1. */
  partyEdge?: Maybe<PartiesEdge>;
};


/** The output of our delete `Party` mutation. */
export type DeletePartyPayloadPartyEdgeArgs = {
  orderBy?: Maybe<Array<PartiesOrderBy>>;
};

/** All input for the `deleteProjectBrokerById` mutation. */
export type DeleteProjectBrokerByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteProjectBroker` mutation. */
export type DeleteProjectBrokerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ProjectBroker` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `ProjectBroker` mutation. */
export type DeleteProjectBrokerPayload = {
  __typename?: 'DeleteProjectBrokerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ProjectBroker` that was deleted by this mutation. */
  projectBroker?: Maybe<ProjectBroker>;
  deletedProjectBrokerId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Project` that is related to this `ProjectBroker`. */
  projectByProjectId?: Maybe<Project>;
  /** Reads a single `Party` that is related to this `ProjectBroker`. */
  partyByBrokerId?: Maybe<Party>;
  /** Reads a single `Party` that is related to this `ProjectBroker`. */
  partyByAuthorizedByPartyId?: Maybe<Party>;
  /** Reads a single `User` that is related to this `ProjectBroker`. */
  userBySignerId?: Maybe<User>;
  /** An edge for our `ProjectBroker`. May be used by Relay 1. */
  projectBrokerEdge?: Maybe<ProjectBrokersEdge>;
};


/** The output of our delete `ProjectBroker` mutation. */
export type DeleteProjectBrokerPayloadProjectBrokerEdgeArgs = {
  orderBy?: Maybe<Array<ProjectBrokersOrderBy>>;
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
  /** Reads a single `Party` that is related to this `Project`. */
  partyByStewardId?: Maybe<Party>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByLandOwnerId?: Maybe<Party>;
  /** Reads a single `CreditClass` that is related to this `Project`. */
  creditClassByCreditClassId?: Maybe<CreditClass>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByRegistryId?: Maybe<Party>;
  /** Reads a single `Address` that is related to this `Project`. */
  addressByAddressId?: Maybe<Address>;
  /** Reads a single `User` that is related to this `Project`. */
  userByCreatorId?: Maybe<User>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByOriginatorId?: Maybe<Party>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByIssuerId?: Maybe<Party>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByResellerId?: Maybe<Party>;
  /** An edge for our `Project`. May be used by Relay 1. */
  projectEdge?: Maybe<ProjectsEdge>;
};


/** The output of our delete `Project` mutation. */
export type DeleteProjectPayloadProjectEdgeArgs = {
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
};

/** All input for the `deletePurchaseById` mutation. */
export type DeletePurchaseByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deletePurchase` mutation. */
export type DeletePurchaseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Purchase` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Purchase` mutation. */
export type DeletePurchasePayload = {
  __typename?: 'DeletePurchasePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Purchase` that was deleted by this mutation. */
  purchase?: Maybe<Purchase>;
  deletedPurchaseId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Wallet` that is related to this `Purchase`. */
  walletByBuyerWalletId?: Maybe<Wallet>;
  /** Reads a single `Address` that is related to this `Purchase`. */
  addressByAddressId?: Maybe<Address>;
  /** Reads a single `CreditVintage` that is related to this `Purchase`. */
  creditVintageByCreditVintageId?: Maybe<CreditVintage>;
  /** Reads a single `Party` that is related to this `Purchase`. */
  partyByPartyId?: Maybe<Party>;
  /** Reads a single `User` that is related to this `Purchase`. */
  userByUserId?: Maybe<User>;
  /** An edge for our `Purchase`. May be used by Relay 1. */
  purchaseEdge?: Maybe<PurchasesEdge>;
};


/** The output of our delete `Purchase` mutation. */
export type DeletePurchasePayloadPurchaseEdgeArgs = {
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
};

/** All input for the `deleteRetirementById` mutation. */
export type DeleteRetirementByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteRetirement` mutation. */
export type DeleteRetirementInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Retirement` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Retirement` mutation. */
export type DeleteRetirementPayload = {
  __typename?: 'DeleteRetirementPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Retirement` that was deleted by this mutation. */
  retirement?: Maybe<Retirement>;
  deletedRetirementId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Wallet` that is related to this `Retirement`. */
  walletByWalletId?: Maybe<Wallet>;
  /** Reads a single `Address` that is related to this `Retirement`. */
  addressByAddressId?: Maybe<Address>;
  /** Reads a single `CreditVintage` that is related to this `Retirement`. */
  creditVintageByCreditVintageId?: Maybe<CreditVintage>;
  /** An edge for our `Retirement`. May be used by Relay 1. */
  retirementEdge?: Maybe<RetirementsEdge>;
};


/** The output of our delete `Retirement` mutation. */
export type DeleteRetirementPayloadRetirementEdgeArgs = {
  orderBy?: Maybe<Array<RetirementsOrderBy>>;
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

/** All input for the `deleteTransactionById` mutation. */
export type DeleteTransactionByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteTransaction` mutation. */
export type DeleteTransactionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Transaction` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Transaction` mutation. */
export type DeleteTransactionPayload = {
  __typename?: 'DeleteTransactionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Transaction` that was deleted by this mutation. */
  transaction?: Maybe<Transaction>;
  deletedTransactionId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `Transaction`. */
  partyByBrokerId?: Maybe<Party>;
  /** Reads a single `Wallet` that is related to this `Transaction`. */
  walletByFromWalletId?: Maybe<Wallet>;
  /** Reads a single `Wallet` that is related to this `Transaction`. */
  walletByToWalletId?: Maybe<Wallet>;
  /** Reads a single `CreditVintage` that is related to this `Transaction`. */
  creditVintageByCreditVintageId?: Maybe<CreditVintage>;
  /** Reads a single `Purchase` that is related to this `Transaction`. */
  purchaseByPurchaseId?: Maybe<Purchase>;
  /** An edge for our `Transaction`. May be used by Relay 1. */
  transactionEdge?: Maybe<TransactionsEdge>;
};


/** The output of our delete `Transaction` mutation. */
export type DeleteTransactionPayloadTransactionEdgeArgs = {
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
};

/** All input for the `deleteUserByAuth0Sub` mutation. */
export type DeleteUserByAuth0SubInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  auth0Sub: Scalars['String'];
};

/** All input for the `deleteUserByEmail` mutation. */
export type DeleteUserByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
};

/** All input for the `deleteUserById` mutation. */
export type DeleteUserByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteUserByPartyIdAndType` mutation. */
export type DeleteUserByPartyIdAndTypeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  partyId: Scalars['UUID'];
  type: PartyType;
};

/** All input for the `deleteUserByPartyId` mutation. */
export type DeleteUserByPartyIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  partyId: Scalars['UUID'];
};

/** All input for the `deleteUser` mutation. */
export type DeleteUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `User` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `User` mutation. */
export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` that was deleted by this mutation. */
  user?: Maybe<User>;
  deletedUserId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `User`. */
  partyByPartyId?: Maybe<Party>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our delete `User` mutation. */
export type DeleteUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
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
  eventId?: Maybe<Scalars['UUID']>;
  /** Reads a single `Project` that is related to this `Document`. */
  projectByProjectId?: Maybe<Project>;
  /** Reads a single `Event` that is related to this `Document`. */
  eventByEventId?: Maybe<Event>;
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
  /** Checks for equality with the object’s `eventId` field. */
  eventId?: Maybe<Scalars['UUID']>;
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
  eventId?: Maybe<Scalars['UUID']>;
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
  eventId?: Maybe<Scalars['UUID']>;
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
  EventIdAsc = 'EVENT_ID_ASC',
  EventIdDesc = 'EVENT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Event = Node & {
  __typename?: 'Event';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  projectId: Scalars['UUID'];
  date?: Maybe<Scalars['Datetime']>;
  summary: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  fromState?: Maybe<ProjectState>;
  toState?: Maybe<ProjectState>;
  /** Reads a single `Project` that is related to this `Event`. */
  projectByProjectId?: Maybe<Project>;
  /** Reads a single `CreditVintage` that is related to this `Event`. */
  creditVintageByEventId?: Maybe<CreditVintage>;
  /**
   * Reads and enables pagination through a set of `CreditVintage`.
   * @deprecated Please use creditVintageByEventId instead
   */
  creditVintagesByEventId: CreditVintagesConnection;
  /** Reads and enables pagination through a set of `Document`. */
  documentsByEventId: DocumentsConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByDocumentEventIdAndProjectId: EventProjectsByDocumentEventIdAndProjectIdManyToManyConnection;
};


export type EventCreditVintagesByEventIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};


export type EventDocumentsByEventIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<DocumentsOrderBy>>;
  condition?: Maybe<DocumentCondition>;
};


export type EventProjectsByDocumentEventIdAndProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A condition to be used against `Event` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type EventCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `date` field. */
  date?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `summary` field. */
  summary?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `fromState` field. */
  fromState?: Maybe<ProjectState>;
  /** Checks for equality with the object’s `toState` field. */
  toState?: Maybe<ProjectState>;
};

/** An input for mutations affecting `Event` */
export type EventInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  projectId: Scalars['UUID'];
  date?: Maybe<Scalars['Datetime']>;
  summary: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  fromState?: Maybe<ProjectState>;
  toState?: Maybe<ProjectState>;
};

/** Represents an update to a `Event`. Fields that are set will be updated. */
export type EventPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  projectId?: Maybe<Scalars['UUID']>;
  date?: Maybe<Scalars['Datetime']>;
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  fromState?: Maybe<ProjectState>;
  toState?: Maybe<ProjectState>;
};

/** A connection to a list of `Project` values, with data from `Document`. */
export type EventProjectsByDocumentEventIdAndProjectIdManyToManyConnection = {
  __typename?: 'EventProjectsByDocumentEventIdAndProjectIdManyToManyConnection';
  /** A list of `Project` objects. */
  nodes: Array<Maybe<Project>>;
  /** A list of edges which contains the `Project`, info from the `Document`, and the cursor to aid in pagination. */
  edges: Array<EventProjectsByDocumentEventIdAndProjectIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Project` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Project` edge in the connection, with data from `Document`. */
export type EventProjectsByDocumentEventIdAndProjectIdManyToManyEdge = {
  __typename?: 'EventProjectsByDocumentEventIdAndProjectIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Project` at the end of the edge. */
  node?: Maybe<Project>;
  /** Reads and enables pagination through a set of `Document`. */
  documentsByProjectId: DocumentsConnection;
};


/** A `Project` edge in the connection, with data from `Document`. */
export type EventProjectsByDocumentEventIdAndProjectIdManyToManyEdgeDocumentsByProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<DocumentsOrderBy>>;
  condition?: Maybe<DocumentCondition>;
};

/** A connection to a list of `Event` values. */
export type EventsConnection = {
  __typename?: 'EventsConnection';
  /** A list of `Event` objects. */
  nodes: Array<Maybe<Event>>;
  /** A list of edges which contains the `Event` and cursor to aid in pagination. */
  edges: Array<EventsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Event` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Event` edge in the connection. */
export type EventsEdge = {
  __typename?: 'EventsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Event` at the end of the edge. */
  node?: Maybe<Event>;
};

/** Methods to use when ordering `Event`. */
export enum EventsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  DateAsc = 'DATE_ASC',
  DateDesc = 'DATE_DESC',
  SummaryAsc = 'SUMMARY_ASC',
  SummaryDesc = 'SUMMARY_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  FromStateAsc = 'FROM_STATE_ASC',
  FromStateDesc = 'FROM_STATE_DESC',
  ToStateAsc = 'TO_STATE_ASC',
  ToStateDesc = 'TO_STATE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A connection to a list of `FlywaySchemaHistory` values. */
export type FlywaySchemaHistoriesConnection = {
  __typename?: 'FlywaySchemaHistoriesConnection';
  /** A list of `FlywaySchemaHistory` objects. */
  nodes: Array<Maybe<FlywaySchemaHistory>>;
  /** A list of edges which contains the `FlywaySchemaHistory` and cursor to aid in pagination. */
  edges: Array<FlywaySchemaHistoriesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `FlywaySchemaHistory` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `FlywaySchemaHistory` edge in the connection. */
export type FlywaySchemaHistoriesEdge = {
  __typename?: 'FlywaySchemaHistoriesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `FlywaySchemaHistory` at the end of the edge. */
  node?: Maybe<FlywaySchemaHistory>;
};

/** Methods to use when ordering `FlywaySchemaHistory`. */
export enum FlywaySchemaHistoriesOrderBy {
  Natural = 'NATURAL',
  InstalledRankAsc = 'INSTALLED_RANK_ASC',
  InstalledRankDesc = 'INSTALLED_RANK_DESC',
  VersionAsc = 'VERSION_ASC',
  VersionDesc = 'VERSION_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  ScriptAsc = 'SCRIPT_ASC',
  ScriptDesc = 'SCRIPT_DESC',
  ChecksumAsc = 'CHECKSUM_ASC',
  ChecksumDesc = 'CHECKSUM_DESC',
  InstalledByAsc = 'INSTALLED_BY_ASC',
  InstalledByDesc = 'INSTALLED_BY_DESC',
  InstalledOnAsc = 'INSTALLED_ON_ASC',
  InstalledOnDesc = 'INSTALLED_ON_DESC',
  ExecutionTimeAsc = 'EXECUTION_TIME_ASC',
  ExecutionTimeDesc = 'EXECUTION_TIME_DESC',
  SuccessAsc = 'SUCCESS_ASC',
  SuccessDesc = 'SUCCESS_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type FlywaySchemaHistory = Node & {
  __typename?: 'FlywaySchemaHistory';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  installedRank: Scalars['Int'];
  version?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  type: Scalars['String'];
  script: Scalars['String'];
  checksum?: Maybe<Scalars['Int']>;
  installedBy: Scalars['String'];
  installedOn: Scalars['Datetime'];
  executionTime: Scalars['Int'];
  success: Scalars['Boolean'];
};

/**
 * A condition to be used against `FlywaySchemaHistory` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type FlywaySchemaHistoryCondition = {
  /** Checks for equality with the object’s `installedRank` field. */
  installedRank?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `version` field. */
  version?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `type` field. */
  type?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `script` field. */
  script?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `checksum` field. */
  checksum?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `installedBy` field. */
  installedBy?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `installedOn` field. */
  installedOn?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `executionTime` field. */
  executionTime?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `success` field. */
  success?: Maybe<Scalars['Boolean']>;
};

/** An input for mutations affecting `FlywaySchemaHistory` */
export type FlywaySchemaHistoryInput = {
  installedRank: Scalars['Int'];
  version?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  type: Scalars['String'];
  script: Scalars['String'];
  checksum?: Maybe<Scalars['Int']>;
  installedBy: Scalars['String'];
  installedOn?: Maybe<Scalars['Datetime']>;
  executionTime: Scalars['Int'];
  success: Scalars['Boolean'];
};

/** Represents an update to a `FlywaySchemaHistory`. Fields that are set will be updated. */
export type FlywaySchemaHistoryPatch = {
  installedRank?: Maybe<Scalars['Int']>;
  version?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  script?: Maybe<Scalars['String']>;
  checksum?: Maybe<Scalars['Int']>;
  installedBy?: Maybe<Scalars['String']>;
  installedOn?: Maybe<Scalars['Datetime']>;
  executionTime?: Maybe<Scalars['Int']>;
  success?: Maybe<Scalars['Boolean']>;
};

/** All input for the `getUserFirstOrganization` mutation. */
export type GetUserFirstOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  userId: Scalars['UUID'];
};

/** The output of our `getUserFirstOrganization` mutation. */
export type GetUserFirstOrganizationPayload = {
  __typename?: 'GetUserFirstOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `Organization`. */
  partyByPartyId?: Maybe<Party>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
};


/** The output of our `getUserFirstOrganization` mutation. */
export type GetUserFirstOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: Maybe<Array<OrganizationsOrderBy>>;
};

/** All input for the `getWalletContactEmail` mutation. */
export type GetWalletContactEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  vWalletId: Scalars['UUID'];
};

/** The output of our `getWalletContactEmail` mutation. */
export type GetWalletContactEmailPayload = {
  __typename?: 'GetWalletContactEmailPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  string?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `isAdmin` mutation. */
export type IsAdminInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** The output of our `isAdmin` mutation. */
export type IsAdminPayload = {
  __typename?: 'IsAdminPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  boolean?: Maybe<Scalars['Boolean']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `issueCredits` mutation. */
export type IssueCreditsInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  projectId: Scalars['UUID'];
  creditClassVersionId: Scalars['UUID'];
  creditClassVersionCreatedAt: Scalars['Datetime'];
  methodologyVersionId: Scalars['UUID'];
  methodologyVersionCreatedAt: Scalars['Datetime'];
  units: Scalars['Int'];
  initialDistribution: Scalars['JSON'];
  startDate: Scalars['Datetime'];
  endDate: Scalars['Datetime'];
  metadata?: Maybe<Scalars['JSON']>;
  initialIssuerId?: Maybe<Scalars['UUID']>;
  resellerId?: Maybe<Scalars['UUID']>;
};

/** The output of our `issueCredits` mutation. */
export type IssueCreditsPayload = {
  __typename?: 'IssueCreditsPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  json?: Maybe<Scalars['JSON']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** A connection to a list of `Methodology` values. */
export type MethodologiesConnection = {
  __typename?: 'MethodologiesConnection';
  /** A list of `Methodology` objects. */
  nodes: Array<Maybe<Methodology>>;
  /** A list of edges which contains the `Methodology` and cursor to aid in pagination. */
  edges: Array<MethodologiesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Methodology` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Methodology` edge in the connection. */
export type MethodologiesEdge = {
  __typename?: 'MethodologiesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Methodology` at the end of the edge. */
  node?: Maybe<Methodology>;
};

/** Methods to use when ordering `Methodology`. */
export enum MethodologiesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  AuthorIdAsc = 'AUTHOR_ID_ASC',
  AuthorIdDesc = 'AUTHOR_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Methodology = Node & {
  __typename?: 'Methodology';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  authorId: Scalars['UUID'];
  /** Reads a single `Party` that is related to this `Methodology`. */
  partyByAuthorId?: Maybe<Party>;
  /** Reads and enables pagination through a set of `MethodologyVersion`. */
  methodologyVersionsById: MethodologyVersionsConnection;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByMethodologyId: CreditClassesConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByCreditClassMethodologyIdAndDesignerId: MethodologyPartiesByCreditClassMethodologyIdAndDesignerIdManyToManyConnection;
};


export type MethodologyMethodologyVersionsByIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MethodologyVersionsOrderBy>>;
  condition?: Maybe<MethodologyVersionCondition>;
};


export type MethodologyCreditClassesByMethodologyIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};


export type MethodologyPartiesByCreditClassMethodologyIdAndDesignerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};

/**
 * A condition to be used against `Methodology` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type MethodologyCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `authorId` field. */
  authorId?: Maybe<Scalars['UUID']>;
};

/** An input for mutations affecting `Methodology` */
export type MethodologyInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  authorId: Scalars['UUID'];
};

/** A connection to a list of `Party` values, with data from `CreditClass`. */
export type MethodologyPartiesByCreditClassMethodologyIdAndDesignerIdManyToManyConnection = {
  __typename?: 'MethodologyPartiesByCreditClassMethodologyIdAndDesignerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `CreditClass`, and the cursor to aid in pagination. */
  edges: Array<MethodologyPartiesByCreditClassMethodologyIdAndDesignerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `CreditClass`. */
export type MethodologyPartiesByCreditClassMethodologyIdAndDesignerIdManyToManyEdge = {
  __typename?: 'MethodologyPartiesByCreditClassMethodologyIdAndDesignerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByDesignerId: CreditClassesConnection;
};


/** A `Party` edge in the connection, with data from `CreditClass`. */
export type MethodologyPartiesByCreditClassMethodologyIdAndDesignerIdManyToManyEdgeCreditClassesByDesignerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};

/** Represents an update to a `Methodology`. Fields that are set will be updated. */
export type MethodologyPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  authorId?: Maybe<Scalars['UUID']>;
};

export type MethodologyVersion = Node & {
  __typename?: 'MethodologyVersion';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  name: Scalars['String'];
  version: Scalars['String'];
  dateDeveloped: Scalars['Datetime'];
  description?: Maybe<Scalars['String']>;
  boundary?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  files?: Maybe<Scalars['JSON']>;
  documentId?: Maybe<Scalars['String']>;
  /** Reads a single `Methodology` that is related to this `MethodologyVersion`. */
  methodologyById?: Maybe<Methodology>;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByMethodologyVersionIdAndMethodologyVersionCreatedAt: CreditVintagesConnection;
};


export type MethodologyVersionCreditVintagesByMethodologyVersionIdAndMethodologyVersionCreatedAtArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};

/**
 * A condition to be used against `MethodologyVersion` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type MethodologyVersionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `version` field. */
  version?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `dateDeveloped` field. */
  dateDeveloped?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `boundary` field. */
  boundary?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `metadata` field. */
  metadata?: Maybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `files` field. */
  files?: Maybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `documentId` field. */
  documentId?: Maybe<Scalars['String']>;
};

/** An input for mutations affecting `MethodologyVersion` */
export type MethodologyVersionInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  name: Scalars['String'];
  version: Scalars['String'];
  dateDeveloped: Scalars['Datetime'];
  description?: Maybe<Scalars['String']>;
  boundary?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  files?: Maybe<Scalars['JSON']>;
  documentId?: Maybe<Scalars['String']>;
};

/** Represents an update to a `MethodologyVersion`. Fields that are set will be updated. */
export type MethodologyVersionPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  dateDeveloped?: Maybe<Scalars['Datetime']>;
  description?: Maybe<Scalars['String']>;
  boundary?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  files?: Maybe<Scalars['JSON']>;
  documentId?: Maybe<Scalars['String']>;
};

/** A connection to a list of `MethodologyVersion` values. */
export type MethodologyVersionsConnection = {
  __typename?: 'MethodologyVersionsConnection';
  /** A list of `MethodologyVersion` objects. */
  nodes: Array<Maybe<MethodologyVersion>>;
  /** A list of edges which contains the `MethodologyVersion` and cursor to aid in pagination. */
  edges: Array<MethodologyVersionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `MethodologyVersion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `MethodologyVersion` edge in the connection. */
export type MethodologyVersionsEdge = {
  __typename?: 'MethodologyVersionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `MethodologyVersion` at the end of the edge. */
  node?: Maybe<MethodologyVersion>;
};

/** Methods to use when ordering `MethodologyVersion`. */
export enum MethodologyVersionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  VersionAsc = 'VERSION_ASC',
  VersionDesc = 'VERSION_DESC',
  DateDevelopedAsc = 'DATE_DEVELOPED_ASC',
  DateDevelopedDesc = 'DATE_DEVELOPED_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  BoundaryAsc = 'BOUNDARY_ASC',
  BoundaryDesc = 'BOUNDARY_DESC',
  MetadataAsc = 'METADATA_ASC',
  MetadataDesc = 'METADATA_DESC',
  FilesAsc = 'FILES_ASC',
  FilesDesc = 'FILES_DESC',
  DocumentIdAsc = 'DOCUMENT_ID_ASC',
  DocumentIdDesc = 'DOCUMENT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Mrv = Node & {
  __typename?: 'Mrv';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  projectId?: Maybe<Scalars['UUID']>;
  /** Reads a single `Project` that is related to this `Mrv`. */
  projectByProjectId?: Maybe<Project>;
};

/** A condition to be used against `Mrv` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type MrvCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: Maybe<Scalars['UUID']>;
};

/** An input for mutations affecting `Mrv` */
export type MrvInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  projectId?: Maybe<Scalars['UUID']>;
};

/** Represents an update to a `Mrv`. Fields that are set will be updated. */
export type MrvPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  projectId?: Maybe<Scalars['UUID']>;
};

/** A connection to a list of `Mrv` values. */
export type MrvsConnection = {
  __typename?: 'MrvsConnection';
  /** A list of `Mrv` objects. */
  nodes: Array<Maybe<Mrv>>;
  /** A list of edges which contains the `Mrv` and cursor to aid in pagination. */
  edges: Array<MrvsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Mrv` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Mrv` edge in the connection. */
export type MrvsEdge = {
  __typename?: 'MrvsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Mrv` at the end of the edge. */
  node?: Maybe<Mrv>;
};

/** Methods to use when ordering `Mrv`. */
export enum MrvsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `AccountBalance`. */
  createAccountBalance?: Maybe<CreateAccountBalancePayload>;
  /** Creates a single `Address`. */
  createAddress?: Maybe<CreateAddressPayload>;
  /** Creates a single `Admin`. */
  createAdmin?: Maybe<CreateAdminPayload>;
  /** Creates a single `CreditClass`. */
  createCreditClass?: Maybe<CreateCreditClassPayload>;
  /** Creates a single `CreditClassIssuer`. */
  createCreditClassIssuer?: Maybe<CreateCreditClassIssuerPayload>;
  /** Creates a single `CreditClassVersion`. */
  createCreditClassVersion?: Maybe<CreateCreditClassVersionPayload>;
  /** Creates a single `CreditVintage`. */
  createCreditVintage?: Maybe<CreateCreditVintagePayload>;
  /** Creates a single `Document`. */
  createDocument?: Maybe<CreateDocumentPayload>;
  /** Creates a single `Event`. */
  createEvent?: Maybe<CreateEventPayload>;
  /** Creates a single `FlywaySchemaHistory`. */
  createFlywaySchemaHistory?: Maybe<CreateFlywaySchemaHistoryPayload>;
  /** Creates a single `Methodology`. */
  createMethodology?: Maybe<CreateMethodologyPayload>;
  /** Creates a single `MethodologyVersion`. */
  createMethodologyVersion?: Maybe<CreateMethodologyVersionPayload>;
  /** Creates a single `Mrv`. */
  createMrv?: Maybe<CreateMrvPayload>;
  /** Creates a single `Organization`. */
  createOrganization?: Maybe<CreateOrganizationPayload>;
  /** Creates a single `OrganizationMember`. */
  createOrganizationMember?: Maybe<CreateOrganizationMemberPayload>;
  /** Creates a single `Party`. */
  createParty?: Maybe<CreatePartyPayload>;
  /** Creates a single `Project`. */
  createProject?: Maybe<CreateProjectPayload>;
  /** Creates a single `ProjectBroker`. */
  createProjectBroker?: Maybe<CreateProjectBrokerPayload>;
  /** Creates a single `Purchase`. */
  createPurchase?: Maybe<CreatePurchasePayload>;
  /** Creates a single `Retirement`. */
  createRetirement?: Maybe<CreateRetirementPayload>;
  /** Creates a single `ShaclGraph`. */
  createShaclGraph?: Maybe<CreateShaclGraphPayload>;
  /** Creates a single `Transaction`. */
  createTransaction?: Maybe<CreateTransactionPayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Creates a single `Wallet`. */
  createWallet?: Maybe<CreateWalletPayload>;
  /** Updates a single `AccountBalance` using its globally unique id and a patch. */
  updateAccountBalance?: Maybe<UpdateAccountBalancePayload>;
  /** Updates a single `AccountBalance` using a unique key and a patch. */
  updateAccountBalanceById?: Maybe<UpdateAccountBalancePayload>;
  /** Updates a single `AccountBalance` using a unique key and a patch. */
  updateAccountBalanceByCreditVintageIdAndWalletId?: Maybe<UpdateAccountBalancePayload>;
  /** Updates a single `Address` using its globally unique id and a patch. */
  updateAddress?: Maybe<UpdateAddressPayload>;
  /** Updates a single `Address` using a unique key and a patch. */
  updateAddressById?: Maybe<UpdateAddressPayload>;
  /** Updates a single `Admin` using its globally unique id and a patch. */
  updateAdmin?: Maybe<UpdateAdminPayload>;
  /** Updates a single `Admin` using a unique key and a patch. */
  updateAdminById?: Maybe<UpdateAdminPayload>;
  /** Updates a single `Admin` using a unique key and a patch. */
  updateAdminByAuth0Sub?: Maybe<UpdateAdminPayload>;
  /** Updates a single `CreditClass` using its globally unique id and a patch. */
  updateCreditClass?: Maybe<UpdateCreditClassPayload>;
  /** Updates a single `CreditClass` using a unique key and a patch. */
  updateCreditClassById?: Maybe<UpdateCreditClassPayload>;
  /** Updates a single `CreditClassVersion` using its globally unique id and a patch. */
  updateCreditClassVersion?: Maybe<UpdateCreditClassVersionPayload>;
  /** Updates a single `CreditClassVersion` using a unique key and a patch. */
  updateCreditClassVersionByIdAndCreatedAt?: Maybe<UpdateCreditClassVersionPayload>;
  /** Updates a single `CreditVintage` using its globally unique id and a patch. */
  updateCreditVintage?: Maybe<UpdateCreditVintagePayload>;
  /** Updates a single `CreditVintage` using a unique key and a patch. */
  updateCreditVintageById?: Maybe<UpdateCreditVintagePayload>;
  /** Updates a single `CreditVintage` using a unique key and a patch. */
  updateCreditVintageByEventId?: Maybe<UpdateCreditVintagePayload>;
  /** Updates a single `Document` using its globally unique id and a patch. */
  updateDocument?: Maybe<UpdateDocumentPayload>;
  /** Updates a single `Document` using a unique key and a patch. */
  updateDocumentById?: Maybe<UpdateDocumentPayload>;
  /** Updates a single `Event` using its globally unique id and a patch. */
  updateEvent?: Maybe<UpdateEventPayload>;
  /** Updates a single `Event` using a unique key and a patch. */
  updateEventById?: Maybe<UpdateEventPayload>;
  /** Updates a single `FlywaySchemaHistory` using its globally unique id and a patch. */
  updateFlywaySchemaHistory?: Maybe<UpdateFlywaySchemaHistoryPayload>;
  /** Updates a single `FlywaySchemaHistory` using a unique key and a patch. */
  updateFlywaySchemaHistoryByInstalledRank?: Maybe<UpdateFlywaySchemaHistoryPayload>;
  /** Updates a single `Methodology` using its globally unique id and a patch. */
  updateMethodology?: Maybe<UpdateMethodologyPayload>;
  /** Updates a single `Methodology` using a unique key and a patch. */
  updateMethodologyById?: Maybe<UpdateMethodologyPayload>;
  /** Updates a single `MethodologyVersion` using its globally unique id and a patch. */
  updateMethodologyVersion?: Maybe<UpdateMethodologyVersionPayload>;
  /** Updates a single `MethodologyVersion` using a unique key and a patch. */
  updateMethodologyVersionByIdAndCreatedAt?: Maybe<UpdateMethodologyVersionPayload>;
  /** Updates a single `Mrv` using its globally unique id and a patch. */
  updateMrv?: Maybe<UpdateMrvPayload>;
  /** Updates a single `Mrv` using a unique key and a patch. */
  updateMrvById?: Maybe<UpdateMrvPayload>;
  /** Updates a single `Organization` using its globally unique id and a patch. */
  updateOrganization?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `Organization` using a unique key and a patch. */
  updateOrganizationById?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `Organization` using a unique key and a patch. */
  updateOrganizationByPartyId?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `Organization` using a unique key and a patch. */
  updateOrganizationByPartyIdAndType?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `OrganizationMember` using its globally unique id and a patch. */
  updateOrganizationMember?: Maybe<UpdateOrganizationMemberPayload>;
  /** Updates a single `OrganizationMember` using a unique key and a patch. */
  updateOrganizationMemberByMemberIdAndOrganizationId?: Maybe<UpdateOrganizationMemberPayload>;
  /** Updates a single `Party` using its globally unique id and a patch. */
  updateParty?: Maybe<UpdatePartyPayload>;
  /** Updates a single `Party` using a unique key and a patch. */
  updatePartyById?: Maybe<UpdatePartyPayload>;
  /** Updates a single `Project` using its globally unique id and a patch. */
  updateProject?: Maybe<UpdateProjectPayload>;
  /** Updates a single `Project` using a unique key and a patch. */
  updateProjectById?: Maybe<UpdateProjectPayload>;
  /** Updates a single `Project` using a unique key and a patch. */
  updateProjectByHandle?: Maybe<UpdateProjectPayload>;
  /** Updates a single `ProjectBroker` using its globally unique id and a patch. */
  updateProjectBroker?: Maybe<UpdateProjectBrokerPayload>;
  /** Updates a single `ProjectBroker` using a unique key and a patch. */
  updateProjectBrokerById?: Maybe<UpdateProjectBrokerPayload>;
  /** Updates a single `Purchase` using its globally unique id and a patch. */
  updatePurchase?: Maybe<UpdatePurchasePayload>;
  /** Updates a single `Purchase` using a unique key and a patch. */
  updatePurchaseById?: Maybe<UpdatePurchasePayload>;
  /** Updates a single `Retirement` using its globally unique id and a patch. */
  updateRetirement?: Maybe<UpdateRetirementPayload>;
  /** Updates a single `Retirement` using a unique key and a patch. */
  updateRetirementById?: Maybe<UpdateRetirementPayload>;
  /** Updates a single `ShaclGraph` using its globally unique id and a patch. */
  updateShaclGraph?: Maybe<UpdateShaclGraphPayload>;
  /** Updates a single `ShaclGraph` using a unique key and a patch. */
  updateShaclGraphByUri?: Maybe<UpdateShaclGraphPayload>;
  /** Updates a single `Transaction` using its globally unique id and a patch. */
  updateTransaction?: Maybe<UpdateTransactionPayload>;
  /** Updates a single `Transaction` using a unique key and a patch. */
  updateTransactionById?: Maybe<UpdateTransactionPayload>;
  /** Updates a single `User` using its globally unique id and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserById?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByEmail?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByPartyId?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByPartyIdAndType?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByAuth0Sub?: Maybe<UpdateUserPayload>;
  /** Updates a single `Wallet` using its globally unique id and a patch. */
  updateWallet?: Maybe<UpdateWalletPayload>;
  /** Updates a single `Wallet` using a unique key and a patch. */
  updateWalletById?: Maybe<UpdateWalletPayload>;
  /** Deletes a single `AccountBalance` using its globally unique id. */
  deleteAccountBalance?: Maybe<DeleteAccountBalancePayload>;
  /** Deletes a single `AccountBalance` using a unique key. */
  deleteAccountBalanceById?: Maybe<DeleteAccountBalancePayload>;
  /** Deletes a single `AccountBalance` using a unique key. */
  deleteAccountBalanceByCreditVintageIdAndWalletId?: Maybe<DeleteAccountBalancePayload>;
  /** Deletes a single `Address` using its globally unique id. */
  deleteAddress?: Maybe<DeleteAddressPayload>;
  /** Deletes a single `Address` using a unique key. */
  deleteAddressById?: Maybe<DeleteAddressPayload>;
  /** Deletes a single `Admin` using its globally unique id. */
  deleteAdmin?: Maybe<DeleteAdminPayload>;
  /** Deletes a single `Admin` using a unique key. */
  deleteAdminById?: Maybe<DeleteAdminPayload>;
  /** Deletes a single `Admin` using a unique key. */
  deleteAdminByAuth0Sub?: Maybe<DeleteAdminPayload>;
  /** Deletes a single `CreditClass` using its globally unique id. */
  deleteCreditClass?: Maybe<DeleteCreditClassPayload>;
  /** Deletes a single `CreditClass` using a unique key. */
  deleteCreditClassById?: Maybe<DeleteCreditClassPayload>;
  /** Deletes a single `CreditClassVersion` using its globally unique id. */
  deleteCreditClassVersion?: Maybe<DeleteCreditClassVersionPayload>;
  /** Deletes a single `CreditClassVersion` using a unique key. */
  deleteCreditClassVersionByIdAndCreatedAt?: Maybe<DeleteCreditClassVersionPayload>;
  /** Deletes a single `CreditVintage` using its globally unique id. */
  deleteCreditVintage?: Maybe<DeleteCreditVintagePayload>;
  /** Deletes a single `CreditVintage` using a unique key. */
  deleteCreditVintageById?: Maybe<DeleteCreditVintagePayload>;
  /** Deletes a single `CreditVintage` using a unique key. */
  deleteCreditVintageByEventId?: Maybe<DeleteCreditVintagePayload>;
  /** Deletes a single `Document` using its globally unique id. */
  deleteDocument?: Maybe<DeleteDocumentPayload>;
  /** Deletes a single `Document` using a unique key. */
  deleteDocumentById?: Maybe<DeleteDocumentPayload>;
  /** Deletes a single `Event` using its globally unique id. */
  deleteEvent?: Maybe<DeleteEventPayload>;
  /** Deletes a single `Event` using a unique key. */
  deleteEventById?: Maybe<DeleteEventPayload>;
  /** Deletes a single `FlywaySchemaHistory` using its globally unique id. */
  deleteFlywaySchemaHistory?: Maybe<DeleteFlywaySchemaHistoryPayload>;
  /** Deletes a single `FlywaySchemaHistory` using a unique key. */
  deleteFlywaySchemaHistoryByInstalledRank?: Maybe<DeleteFlywaySchemaHistoryPayload>;
  /** Deletes a single `Methodology` using its globally unique id. */
  deleteMethodology?: Maybe<DeleteMethodologyPayload>;
  /** Deletes a single `Methodology` using a unique key. */
  deleteMethodologyById?: Maybe<DeleteMethodologyPayload>;
  /** Deletes a single `MethodologyVersion` using its globally unique id. */
  deleteMethodologyVersion?: Maybe<DeleteMethodologyVersionPayload>;
  /** Deletes a single `MethodologyVersion` using a unique key. */
  deleteMethodologyVersionByIdAndCreatedAt?: Maybe<DeleteMethodologyVersionPayload>;
  /** Deletes a single `Mrv` using its globally unique id. */
  deleteMrv?: Maybe<DeleteMrvPayload>;
  /** Deletes a single `Mrv` using a unique key. */
  deleteMrvById?: Maybe<DeleteMrvPayload>;
  /** Deletes a single `Organization` using its globally unique id. */
  deleteOrganization?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `Organization` using a unique key. */
  deleteOrganizationById?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `Organization` using a unique key. */
  deleteOrganizationByPartyId?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `Organization` using a unique key. */
  deleteOrganizationByPartyIdAndType?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `OrganizationMember` using its globally unique id. */
  deleteOrganizationMember?: Maybe<DeleteOrganizationMemberPayload>;
  /** Deletes a single `OrganizationMember` using a unique key. */
  deleteOrganizationMemberByMemberIdAndOrganizationId?: Maybe<DeleteOrganizationMemberPayload>;
  /** Deletes a single `Party` using its globally unique id. */
  deleteParty?: Maybe<DeletePartyPayload>;
  /** Deletes a single `Party` using a unique key. */
  deletePartyById?: Maybe<DeletePartyPayload>;
  /** Deletes a single `Project` using its globally unique id. */
  deleteProject?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `Project` using a unique key. */
  deleteProjectById?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `Project` using a unique key. */
  deleteProjectByHandle?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `ProjectBroker` using its globally unique id. */
  deleteProjectBroker?: Maybe<DeleteProjectBrokerPayload>;
  /** Deletes a single `ProjectBroker` using a unique key. */
  deleteProjectBrokerById?: Maybe<DeleteProjectBrokerPayload>;
  /** Deletes a single `Purchase` using its globally unique id. */
  deletePurchase?: Maybe<DeletePurchasePayload>;
  /** Deletes a single `Purchase` using a unique key. */
  deletePurchaseById?: Maybe<DeletePurchasePayload>;
  /** Deletes a single `Retirement` using its globally unique id. */
  deleteRetirement?: Maybe<DeleteRetirementPayload>;
  /** Deletes a single `Retirement` using a unique key. */
  deleteRetirementById?: Maybe<DeleteRetirementPayload>;
  /** Deletes a single `ShaclGraph` using its globally unique id. */
  deleteShaclGraph?: Maybe<DeleteShaclGraphPayload>;
  /** Deletes a single `ShaclGraph` using a unique key. */
  deleteShaclGraphByUri?: Maybe<DeleteShaclGraphPayload>;
  /** Deletes a single `Transaction` using its globally unique id. */
  deleteTransaction?: Maybe<DeleteTransactionPayload>;
  /** Deletes a single `Transaction` using a unique key. */
  deleteTransactionById?: Maybe<DeleteTransactionPayload>;
  /** Deletes a single `User` using its globally unique id. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserById?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByEmail?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByPartyId?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByPartyIdAndType?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByAuth0Sub?: Maybe<DeleteUserPayload>;
  /** Deletes a single `Wallet` using its globally unique id. */
  deleteWallet?: Maybe<DeleteWalletPayload>;
  /** Deletes a single `Wallet` using a unique key. */
  deleteWalletById?: Maybe<DeleteWalletPayload>;
  createUserOrganization?: Maybe<CreateUserOrganizationPayload>;
  createUserOrganizationIfNeeded?: Maybe<CreateUserOrganizationIfNeededPayload>;
  getUserFirstOrganization?: Maybe<GetUserFirstOrganizationPayload>;
  getWalletContactEmail?: Maybe<GetWalletContactEmailPayload>;
  isAdmin?: Maybe<IsAdminPayload>;
  issueCredits?: Maybe<IssueCreditsPayload>;
  reallyCreateOrganization?: Maybe<ReallyCreateOrganizationPayload>;
  reallyCreateOrganizationIfNeeded?: Maybe<ReallyCreateOrganizationIfNeededPayload>;
  reallyCreateUser?: Maybe<ReallyCreateUserPayload>;
  reallyCreateUserIfNeeded?: Maybe<ReallyCreateUserIfNeededPayload>;
  retireCredits?: Maybe<RetireCreditsPayload>;
  sendTransferCreditsConfirmation?: Maybe<SendTransferCreditsConfirmationPayload>;
  transferCredits?: Maybe<TransferCreditsPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAccountBalanceArgs = {
  input: CreateAccountBalanceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAddressArgs = {
  input: CreateAddressInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAdminArgs = {
  input: CreateAdminInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCreditClassArgs = {
  input: CreateCreditClassInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCreditClassIssuerArgs = {
  input: CreateCreditClassIssuerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCreditClassVersionArgs = {
  input: CreateCreditClassVersionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCreditVintageArgs = {
  input: CreateCreditVintageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateDocumentArgs = {
  input: CreateDocumentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateFlywaySchemaHistoryArgs = {
  input: CreateFlywaySchemaHistoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMethodologyArgs = {
  input: CreateMethodologyInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMethodologyVersionArgs = {
  input: CreateMethodologyVersionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMrvArgs = {
  input: CreateMrvInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateOrganizationMemberArgs = {
  input: CreateOrganizationMemberInput;
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
export type MutationCreateProjectBrokerArgs = {
  input: CreateProjectBrokerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePurchaseArgs = {
  input: CreatePurchaseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRetirementArgs = {
  input: CreateRetirementInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateShaclGraphArgs = {
  input: CreateShaclGraphInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTransactionArgs = {
  input: CreateTransactionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateWalletArgs = {
  input: CreateWalletInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountBalanceArgs = {
  input: UpdateAccountBalanceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountBalanceByIdArgs = {
  input: UpdateAccountBalanceByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountBalanceByCreditVintageIdAndWalletIdArgs = {
  input: UpdateAccountBalanceByCreditVintageIdAndWalletIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAddressArgs = {
  input: UpdateAddressInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAddressByIdArgs = {
  input: UpdateAddressByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAdminArgs = {
  input: UpdateAdminInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAdminByIdArgs = {
  input: UpdateAdminByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAdminByAuth0SubArgs = {
  input: UpdateAdminByAuth0SubInput;
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
export type MutationUpdateCreditClassVersionArgs = {
  input: UpdateCreditClassVersionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCreditClassVersionByIdAndCreatedAtArgs = {
  input: UpdateCreditClassVersionByIdAndCreatedAtInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCreditVintageArgs = {
  input: UpdateCreditVintageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCreditVintageByIdArgs = {
  input: UpdateCreditVintageByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCreditVintageByEventIdArgs = {
  input: UpdateCreditVintageByEventIdInput;
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
export type MutationUpdateEventArgs = {
  input: UpdateEventInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventByIdArgs = {
  input: UpdateEventByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateFlywaySchemaHistoryArgs = {
  input: UpdateFlywaySchemaHistoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateFlywaySchemaHistoryByInstalledRankArgs = {
  input: UpdateFlywaySchemaHistoryByInstalledRankInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMethodologyArgs = {
  input: UpdateMethodologyInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMethodologyByIdArgs = {
  input: UpdateMethodologyByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMethodologyVersionArgs = {
  input: UpdateMethodologyVersionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMethodologyVersionByIdAndCreatedAtArgs = {
  input: UpdateMethodologyVersionByIdAndCreatedAtInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMrvArgs = {
  input: UpdateMrvInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMrvByIdArgs = {
  input: UpdateMrvByIdInput;
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
export type MutationUpdateOrganizationByPartyIdAndTypeArgs = {
  input: UpdateOrganizationByPartyIdAndTypeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationMemberArgs = {
  input: UpdateOrganizationMemberInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationMemberByMemberIdAndOrganizationIdArgs = {
  input: UpdateOrganizationMemberByMemberIdAndOrganizationIdInput;
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
export type MutationUpdateProjectBrokerArgs = {
  input: UpdateProjectBrokerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectBrokerByIdArgs = {
  input: UpdateProjectBrokerByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePurchaseArgs = {
  input: UpdatePurchaseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePurchaseByIdArgs = {
  input: UpdatePurchaseByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRetirementArgs = {
  input: UpdateRetirementInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRetirementByIdArgs = {
  input: UpdateRetirementByIdInput;
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
export type MutationUpdateTransactionArgs = {
  input: UpdateTransactionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTransactionByIdArgs = {
  input: UpdateTransactionByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByIdArgs = {
  input: UpdateUserByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByEmailArgs = {
  input: UpdateUserByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByPartyIdArgs = {
  input: UpdateUserByPartyIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByPartyIdAndTypeArgs = {
  input: UpdateUserByPartyIdAndTypeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByAuth0SubArgs = {
  input: UpdateUserByAuth0SubInput;
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
export type MutationDeleteAccountBalanceArgs = {
  input: DeleteAccountBalanceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountBalanceByIdArgs = {
  input: DeleteAccountBalanceByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountBalanceByCreditVintageIdAndWalletIdArgs = {
  input: DeleteAccountBalanceByCreditVintageIdAndWalletIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAddressArgs = {
  input: DeleteAddressInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAddressByIdArgs = {
  input: DeleteAddressByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAdminArgs = {
  input: DeleteAdminInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAdminByIdArgs = {
  input: DeleteAdminByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAdminByAuth0SubArgs = {
  input: DeleteAdminByAuth0SubInput;
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
export type MutationDeleteCreditClassVersionArgs = {
  input: DeleteCreditClassVersionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCreditClassVersionByIdAndCreatedAtArgs = {
  input: DeleteCreditClassVersionByIdAndCreatedAtInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCreditVintageArgs = {
  input: DeleteCreditVintageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCreditVintageByIdArgs = {
  input: DeleteCreditVintageByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCreditVintageByEventIdArgs = {
  input: DeleteCreditVintageByEventIdInput;
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
export type MutationDeleteEventArgs = {
  input: DeleteEventInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventByIdArgs = {
  input: DeleteEventByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteFlywaySchemaHistoryArgs = {
  input: DeleteFlywaySchemaHistoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteFlywaySchemaHistoryByInstalledRankArgs = {
  input: DeleteFlywaySchemaHistoryByInstalledRankInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMethodologyArgs = {
  input: DeleteMethodologyInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMethodologyByIdArgs = {
  input: DeleteMethodologyByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMethodologyVersionArgs = {
  input: DeleteMethodologyVersionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMethodologyVersionByIdAndCreatedAtArgs = {
  input: DeleteMethodologyVersionByIdAndCreatedAtInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMrvArgs = {
  input: DeleteMrvInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMrvByIdArgs = {
  input: DeleteMrvByIdInput;
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
export type MutationDeleteOrganizationByPartyIdAndTypeArgs = {
  input: DeleteOrganizationByPartyIdAndTypeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationMemberArgs = {
  input: DeleteOrganizationMemberInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationMemberByMemberIdAndOrganizationIdArgs = {
  input: DeleteOrganizationMemberByMemberIdAndOrganizationIdInput;
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
export type MutationDeleteProjectBrokerArgs = {
  input: DeleteProjectBrokerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectBrokerByIdArgs = {
  input: DeleteProjectBrokerByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePurchaseArgs = {
  input: DeletePurchaseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePurchaseByIdArgs = {
  input: DeletePurchaseByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRetirementArgs = {
  input: DeleteRetirementInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRetirementByIdArgs = {
  input: DeleteRetirementByIdInput;
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
export type MutationDeleteTransactionArgs = {
  input: DeleteTransactionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTransactionByIdArgs = {
  input: DeleteTransactionByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByIdArgs = {
  input: DeleteUserByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByEmailArgs = {
  input: DeleteUserByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByPartyIdArgs = {
  input: DeleteUserByPartyIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByPartyIdAndTypeArgs = {
  input: DeleteUserByPartyIdAndTypeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByAuth0SubArgs = {
  input: DeleteUserByAuth0SubInput;
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
export type MutationCreateUserOrganizationArgs = {
  input: CreateUserOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserOrganizationIfNeededArgs = {
  input: CreateUserOrganizationIfNeededInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationGetUserFirstOrganizationArgs = {
  input: GetUserFirstOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationGetWalletContactEmailArgs = {
  input: GetWalletContactEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationIsAdminArgs = {
  input: IsAdminInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationIssueCreditsArgs = {
  input: IssueCreditsInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationReallyCreateOrganizationArgs = {
  input: ReallyCreateOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationReallyCreateOrganizationIfNeededArgs = {
  input: ReallyCreateOrganizationIfNeededInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationReallyCreateUserArgs = {
  input: ReallyCreateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationReallyCreateUserIfNeededArgs = {
  input: ReallyCreateUserIfNeededInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRetireCreditsArgs = {
  input: RetireCreditsInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationSendTransferCreditsConfirmationArgs = {
  input: SendTransferCreditsConfirmationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationTransferCreditsArgs = {
  input: TransferCreditsInput;
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
  type: PartyType;
  website?: Maybe<Scalars['String']>;
  partyId: Scalars['UUID'];
  legalName: Scalars['String'];
  /** Reads a single `Party` that is related to this `Organization`. */
  partyByPartyId?: Maybe<Party>;
  /** Reads and enables pagination through a set of `OrganizationMember`. */
  organizationMembersByOrganizationId: OrganizationMembersConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByOrganizationMemberOrganizationIdAndMemberId: OrganizationUsersByOrganizationMemberOrganizationIdAndMemberIdManyToManyConnection;
};


export type OrganizationOrganizationMembersByOrganizationIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<OrganizationMembersOrderBy>>;
  condition?: Maybe<OrganizationMemberCondition>;
};


export type OrganizationUsersByOrganizationMemberOrganizationIdAndMemberIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
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
  /** Checks for equality with the object’s `type` field. */
  type?: Maybe<PartyType>;
  /** Checks for equality with the object’s `website` field. */
  website?: Maybe<Scalars['String']>;
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
  type?: Maybe<PartyType>;
  website?: Maybe<Scalars['String']>;
  partyId: Scalars['UUID'];
  legalName?: Maybe<Scalars['String']>;
};

export type OrganizationMember = Node & {
  __typename?: 'OrganizationMember';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  memberId: Scalars['UUID'];
  organizationId: Scalars['UUID'];
  isOwner: Scalars['Boolean'];
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Reads a single `User` that is related to this `OrganizationMember`. */
  userByMemberId?: Maybe<User>;
  /** Reads a single `Organization` that is related to this `OrganizationMember`. */
  organizationByOrganizationId?: Maybe<Organization>;
};

/**
 * A condition to be used against `OrganizationMember` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type OrganizationMemberCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `memberId` field. */
  memberId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `isOwner` field. */
  isOwner?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `roles` field. */
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** An input for mutations affecting `OrganizationMember` */
export type OrganizationMemberInput = {
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  memberId: Scalars['UUID'];
  organizationId: Scalars['UUID'];
  isOwner?: Maybe<Scalars['Boolean']>;
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Represents an update to a `OrganizationMember`. Fields that are set will be updated. */
export type OrganizationMemberPatch = {
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  memberId?: Maybe<Scalars['UUID']>;
  organizationId?: Maybe<Scalars['UUID']>;
  isOwner?: Maybe<Scalars['Boolean']>;
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** A connection to a list of `OrganizationMember` values. */
export type OrganizationMembersConnection = {
  __typename?: 'OrganizationMembersConnection';
  /** A list of `OrganizationMember` objects. */
  nodes: Array<Maybe<OrganizationMember>>;
  /** A list of edges which contains the `OrganizationMember` and cursor to aid in pagination. */
  edges: Array<OrganizationMembersEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `OrganizationMember` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `OrganizationMember` edge in the connection. */
export type OrganizationMembersEdge = {
  __typename?: 'OrganizationMembersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `OrganizationMember` at the end of the edge. */
  node?: Maybe<OrganizationMember>;
};

/** Methods to use when ordering `OrganizationMember`. */
export enum OrganizationMembersOrderBy {
  Natural = 'NATURAL',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  MemberIdAsc = 'MEMBER_ID_ASC',
  MemberIdDesc = 'MEMBER_ID_DESC',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  IsOwnerAsc = 'IS_OWNER_ASC',
  IsOwnerDesc = 'IS_OWNER_DESC',
  RolesAsc = 'ROLES_ASC',
  RolesDesc = 'ROLES_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** Represents an update to a `Organization`. Fields that are set will be updated. */
export type OrganizationPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  type?: Maybe<PartyType>;
  website?: Maybe<Scalars['String']>;
  partyId?: Maybe<Scalars['UUID']>;
  legalName?: Maybe<Scalars['String']>;
};

/** A connection to a list of `User` values, with data from `OrganizationMember`. */
export type OrganizationUsersByOrganizationMemberOrganizationIdAndMemberIdManyToManyConnection = {
  __typename?: 'OrganizationUsersByOrganizationMemberOrganizationIdAndMemberIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `OrganizationMember`, and the cursor to aid in pagination. */
  edges: Array<OrganizationUsersByOrganizationMemberOrganizationIdAndMemberIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `OrganizationMember`. */
export type OrganizationUsersByOrganizationMemberOrganizationIdAndMemberIdManyToManyEdge = {
  __typename?: 'OrganizationUsersByOrganizationMemberOrganizationIdAndMemberIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  isOwner: Scalars['Boolean'];
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
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
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  WebsiteAsc = 'WEBSITE_ASC',
  WebsiteDesc = 'WEBSITE_DESC',
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
  AddressIdAsc = 'ADDRESS_ID_ASC',
  AddressIdDesc = 'ADDRESS_ID_DESC',
  RolesAsc = 'ROLES_ASC',
  RolesDesc = 'ROLES_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  ImageAsc = 'IMAGE_ASC',
  ImageDesc = 'IMAGE_DESC',
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
  addressId?: Maybe<Scalars['UUID']>;
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  /** Reads a single `Wallet` that is related to this `Party`. */
  walletByWalletId?: Maybe<Wallet>;
  /** Reads a single `Address` that is related to this `Party`. */
  addressByAddressId?: Maybe<Address>;
  /** Reads a single `User` that is related to this `Party`. */
  userByPartyId?: Maybe<User>;
  /**
   * Reads and enables pagination through a set of `User`.
   * @deprecated Please use userByPartyId instead
   */
  usersByPartyId: UsersConnection;
  /** Reads a single `Organization` that is related to this `Party`. */
  organizationByPartyId?: Maybe<Organization>;
  /**
   * Reads and enables pagination through a set of `Organization`.
   * @deprecated Please use organizationByPartyId instead
   */
  organizationsByPartyId: OrganizationsConnection;
  /** Reads and enables pagination through a set of `Methodology`. */
  methodologiesByAuthorId: MethodologiesConnection;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByDesignerId: CreditClassesConnection;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByIssuerId: CreditVintagesConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByDeveloperId: ProjectsConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByStewardId: ProjectsConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByLandOwnerId: ProjectsConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByRegistryId: ProjectsConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByOriginatorId: ProjectsConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByIssuerId: ProjectsConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByResellerId: ProjectsConnection;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByBrokerId: TransactionsConnection;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByPartyId: PurchasesConnection;
  /** Reads and enables pagination through a set of `ProjectBroker`. */
  projectBrokersByBrokerId: ProjectBrokersConnection;
  /** Reads and enables pagination through a set of `ProjectBroker`. */
  projectBrokersByAuthorizedByPartyId: ProjectBrokersConnection;
  /** Reads and enables pagination through a set of `Methodology`. */
  methodologiesByCreditClassDesignerIdAndMethodologyId: PartyMethodologiesByCreditClassDesignerIdAndMethodologyIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByCreditVintageIssuerIdAndCreditClassId: PartyCreditClassesByCreditVintageIssuerIdAndCreditClassIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreditVintageIssuerIdAndProjectId: PartyProjectsByCreditVintageIssuerIdAndProjectIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByCreditVintageIssuerIdAndTokenizerId: PartyWalletsByCreditVintageIssuerIdAndTokenizerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByCreditVintageIssuerIdAndResellerId: PartyWalletsByCreditVintageIssuerIdAndResellerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectDeveloperIdAndStewardId: PartyPartiesByProjectDeveloperIdAndStewardIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectDeveloperIdAndLandOwnerId: PartyPartiesByProjectDeveloperIdAndLandOwnerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByProjectDeveloperIdAndCreditClassId: PartyCreditClassesByProjectDeveloperIdAndCreditClassIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectDeveloperIdAndRegistryId: PartyPartiesByProjectDeveloperIdAndRegistryIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Address`. */
  addressesByProjectDeveloperIdAndAddressId: PartyAddressesByProjectDeveloperIdAndAddressIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByProjectDeveloperIdAndCreatorId: PartyUsersByProjectDeveloperIdAndCreatorIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectDeveloperIdAndOriginatorId: PartyPartiesByProjectDeveloperIdAndOriginatorIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectDeveloperIdAndIssuerId: PartyPartiesByProjectDeveloperIdAndIssuerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectDeveloperIdAndResellerId: PartyPartiesByProjectDeveloperIdAndResellerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectStewardIdAndDeveloperId: PartyPartiesByProjectStewardIdAndDeveloperIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectStewardIdAndLandOwnerId: PartyPartiesByProjectStewardIdAndLandOwnerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByProjectStewardIdAndCreditClassId: PartyCreditClassesByProjectStewardIdAndCreditClassIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectStewardIdAndRegistryId: PartyPartiesByProjectStewardIdAndRegistryIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Address`. */
  addressesByProjectStewardIdAndAddressId: PartyAddressesByProjectStewardIdAndAddressIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByProjectStewardIdAndCreatorId: PartyUsersByProjectStewardIdAndCreatorIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectStewardIdAndOriginatorId: PartyPartiesByProjectStewardIdAndOriginatorIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectStewardIdAndIssuerId: PartyPartiesByProjectStewardIdAndIssuerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectStewardIdAndResellerId: PartyPartiesByProjectStewardIdAndResellerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectLandOwnerIdAndDeveloperId: PartyPartiesByProjectLandOwnerIdAndDeveloperIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectLandOwnerIdAndStewardId: PartyPartiesByProjectLandOwnerIdAndStewardIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByProjectLandOwnerIdAndCreditClassId: PartyCreditClassesByProjectLandOwnerIdAndCreditClassIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectLandOwnerIdAndRegistryId: PartyPartiesByProjectLandOwnerIdAndRegistryIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Address`. */
  addressesByProjectLandOwnerIdAndAddressId: PartyAddressesByProjectLandOwnerIdAndAddressIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByProjectLandOwnerIdAndCreatorId: PartyUsersByProjectLandOwnerIdAndCreatorIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectLandOwnerIdAndOriginatorId: PartyPartiesByProjectLandOwnerIdAndOriginatorIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectLandOwnerIdAndIssuerId: PartyPartiesByProjectLandOwnerIdAndIssuerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectLandOwnerIdAndResellerId: PartyPartiesByProjectLandOwnerIdAndResellerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectRegistryIdAndDeveloperId: PartyPartiesByProjectRegistryIdAndDeveloperIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectRegistryIdAndStewardId: PartyPartiesByProjectRegistryIdAndStewardIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectRegistryIdAndLandOwnerId: PartyPartiesByProjectRegistryIdAndLandOwnerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByProjectRegistryIdAndCreditClassId: PartyCreditClassesByProjectRegistryIdAndCreditClassIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Address`. */
  addressesByProjectRegistryIdAndAddressId: PartyAddressesByProjectRegistryIdAndAddressIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByProjectRegistryIdAndCreatorId: PartyUsersByProjectRegistryIdAndCreatorIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectRegistryIdAndOriginatorId: PartyPartiesByProjectRegistryIdAndOriginatorIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectRegistryIdAndIssuerId: PartyPartiesByProjectRegistryIdAndIssuerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectRegistryIdAndResellerId: PartyPartiesByProjectRegistryIdAndResellerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectOriginatorIdAndDeveloperId: PartyPartiesByProjectOriginatorIdAndDeveloperIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectOriginatorIdAndStewardId: PartyPartiesByProjectOriginatorIdAndStewardIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectOriginatorIdAndLandOwnerId: PartyPartiesByProjectOriginatorIdAndLandOwnerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByProjectOriginatorIdAndCreditClassId: PartyCreditClassesByProjectOriginatorIdAndCreditClassIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectOriginatorIdAndRegistryId: PartyPartiesByProjectOriginatorIdAndRegistryIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Address`. */
  addressesByProjectOriginatorIdAndAddressId: PartyAddressesByProjectOriginatorIdAndAddressIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByProjectOriginatorIdAndCreatorId: PartyUsersByProjectOriginatorIdAndCreatorIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectOriginatorIdAndIssuerId: PartyPartiesByProjectOriginatorIdAndIssuerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectOriginatorIdAndResellerId: PartyPartiesByProjectOriginatorIdAndResellerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectIssuerIdAndDeveloperId: PartyPartiesByProjectIssuerIdAndDeveloperIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectIssuerIdAndStewardId: PartyPartiesByProjectIssuerIdAndStewardIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectIssuerIdAndLandOwnerId: PartyPartiesByProjectIssuerIdAndLandOwnerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByProjectIssuerIdAndCreditClassId: PartyCreditClassesByProjectIssuerIdAndCreditClassIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectIssuerIdAndRegistryId: PartyPartiesByProjectIssuerIdAndRegistryIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Address`. */
  addressesByProjectIssuerIdAndAddressId: PartyAddressesByProjectIssuerIdAndAddressIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByProjectIssuerIdAndCreatorId: PartyUsersByProjectIssuerIdAndCreatorIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectIssuerIdAndOriginatorId: PartyPartiesByProjectIssuerIdAndOriginatorIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectIssuerIdAndResellerId: PartyPartiesByProjectIssuerIdAndResellerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectResellerIdAndDeveloperId: PartyPartiesByProjectResellerIdAndDeveloperIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectResellerIdAndStewardId: PartyPartiesByProjectResellerIdAndStewardIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectResellerIdAndLandOwnerId: PartyPartiesByProjectResellerIdAndLandOwnerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByProjectResellerIdAndCreditClassId: PartyCreditClassesByProjectResellerIdAndCreditClassIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectResellerIdAndRegistryId: PartyPartiesByProjectResellerIdAndRegistryIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Address`. */
  addressesByProjectResellerIdAndAddressId: PartyAddressesByProjectResellerIdAndAddressIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByProjectResellerIdAndCreatorId: PartyUsersByProjectResellerIdAndCreatorIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectResellerIdAndOriginatorId: PartyPartiesByProjectResellerIdAndOriginatorIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectResellerIdAndIssuerId: PartyPartiesByProjectResellerIdAndIssuerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByTransactionBrokerIdAndFromWalletId: PartyWalletsByTransactionBrokerIdAndFromWalletIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByTransactionBrokerIdAndToWalletId: PartyWalletsByTransactionBrokerIdAndToWalletIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByTransactionBrokerIdAndCreditVintageId: PartyCreditVintagesByTransactionBrokerIdAndCreditVintageIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByTransactionBrokerIdAndPurchaseId: PartyPurchasesByTransactionBrokerIdAndPurchaseIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByPurchasePartyIdAndBuyerWalletId: PartyWalletsByPurchasePartyIdAndBuyerWalletIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Address`. */
  addressesByPurchasePartyIdAndAddressId: PartyAddressesByPurchasePartyIdAndAddressIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByPurchasePartyIdAndCreditVintageId: PartyCreditVintagesByPurchasePartyIdAndCreditVintageIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByPurchasePartyIdAndUserId: PartyUsersByPurchasePartyIdAndUserIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByProjectBrokerBrokerIdAndProjectId: PartyProjectsByProjectBrokerBrokerIdAndProjectIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectBrokerBrokerIdAndAuthorizedByPartyId: PartyPartiesByProjectBrokerBrokerIdAndAuthorizedByPartyIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByProjectBrokerBrokerIdAndSignerId: PartyUsersByProjectBrokerBrokerIdAndSignerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByProjectBrokerAuthorizedByPartyIdAndProjectId: PartyProjectsByProjectBrokerAuthorizedByPartyIdAndProjectIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectBrokerAuthorizedByPartyIdAndBrokerId: PartyPartiesByProjectBrokerAuthorizedByPartyIdAndBrokerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByProjectBrokerAuthorizedByPartyIdAndSignerId: PartyUsersByProjectBrokerAuthorizedByPartyIdAndSignerIdManyToManyConnection;
};


export type PartyUsersByPartyIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
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


export type PartyMethodologiesByAuthorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MethodologiesOrderBy>>;
  condition?: Maybe<MethodologyCondition>;
};


export type PartyCreditClassesByDesignerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};


export type PartyCreditVintagesByIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};


export type PartyProjectsByDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};


export type PartyProjectsByStewardIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};


export type PartyProjectsByLandOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};


export type PartyProjectsByRegistryIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};


export type PartyProjectsByOriginatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};


export type PartyProjectsByIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};


export type PartyProjectsByResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};


export type PartyTransactionsByBrokerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};


export type PartyPurchasesByPartyIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};


export type PartyProjectBrokersByBrokerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectBrokersOrderBy>>;
  condition?: Maybe<ProjectBrokerCondition>;
};


export type PartyProjectBrokersByAuthorizedByPartyIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectBrokersOrderBy>>;
  condition?: Maybe<ProjectBrokerCondition>;
};


export type PartyMethodologiesByCreditClassDesignerIdAndMethodologyIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MethodologiesOrderBy>>;
  condition?: Maybe<MethodologyCondition>;
};


export type PartyCreditClassesByCreditVintageIssuerIdAndCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};


export type PartyProjectsByCreditVintageIssuerIdAndProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};


export type PartyWalletsByCreditVintageIssuerIdAndTokenizerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type PartyWalletsByCreditVintageIssuerIdAndResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type PartyPartiesByProjectDeveloperIdAndStewardIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectDeveloperIdAndLandOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
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


export type PartyPartiesByProjectDeveloperIdAndRegistryIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyAddressesByProjectDeveloperIdAndAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AddressesOrderBy>>;
  condition?: Maybe<AddressCondition>;
};


export type PartyUsersByProjectDeveloperIdAndCreatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
};


export type PartyPartiesByProjectDeveloperIdAndOriginatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectDeveloperIdAndIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectDeveloperIdAndResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectStewardIdAndDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectStewardIdAndLandOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyCreditClassesByProjectStewardIdAndCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};


export type PartyPartiesByProjectStewardIdAndRegistryIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyAddressesByProjectStewardIdAndAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AddressesOrderBy>>;
  condition?: Maybe<AddressCondition>;
};


export type PartyUsersByProjectStewardIdAndCreatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
};


export type PartyPartiesByProjectStewardIdAndOriginatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectStewardIdAndIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectStewardIdAndResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectLandOwnerIdAndDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectLandOwnerIdAndStewardIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyCreditClassesByProjectLandOwnerIdAndCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};


export type PartyPartiesByProjectLandOwnerIdAndRegistryIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyAddressesByProjectLandOwnerIdAndAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AddressesOrderBy>>;
  condition?: Maybe<AddressCondition>;
};


export type PartyUsersByProjectLandOwnerIdAndCreatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
};


export type PartyPartiesByProjectLandOwnerIdAndOriginatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectLandOwnerIdAndIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectLandOwnerIdAndResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectRegistryIdAndDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectRegistryIdAndStewardIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectRegistryIdAndLandOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyCreditClassesByProjectRegistryIdAndCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};


export type PartyAddressesByProjectRegistryIdAndAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AddressesOrderBy>>;
  condition?: Maybe<AddressCondition>;
};


export type PartyUsersByProjectRegistryIdAndCreatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
};


export type PartyPartiesByProjectRegistryIdAndOriginatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectRegistryIdAndIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectRegistryIdAndResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectOriginatorIdAndDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectOriginatorIdAndStewardIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectOriginatorIdAndLandOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyCreditClassesByProjectOriginatorIdAndCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};


export type PartyPartiesByProjectOriginatorIdAndRegistryIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyAddressesByProjectOriginatorIdAndAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AddressesOrderBy>>;
  condition?: Maybe<AddressCondition>;
};


export type PartyUsersByProjectOriginatorIdAndCreatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
};


export type PartyPartiesByProjectOriginatorIdAndIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectOriginatorIdAndResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectIssuerIdAndDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectIssuerIdAndStewardIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectIssuerIdAndLandOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyCreditClassesByProjectIssuerIdAndCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};


export type PartyPartiesByProjectIssuerIdAndRegistryIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyAddressesByProjectIssuerIdAndAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AddressesOrderBy>>;
  condition?: Maybe<AddressCondition>;
};


export type PartyUsersByProjectIssuerIdAndCreatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
};


export type PartyPartiesByProjectIssuerIdAndOriginatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectIssuerIdAndResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectResellerIdAndDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectResellerIdAndStewardIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectResellerIdAndLandOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyCreditClassesByProjectResellerIdAndCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};


export type PartyPartiesByProjectResellerIdAndRegistryIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyAddressesByProjectResellerIdAndAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AddressesOrderBy>>;
  condition?: Maybe<AddressCondition>;
};


export type PartyUsersByProjectResellerIdAndCreatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
};


export type PartyPartiesByProjectResellerIdAndOriginatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyPartiesByProjectResellerIdAndIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyWalletsByTransactionBrokerIdAndFromWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type PartyWalletsByTransactionBrokerIdAndToWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type PartyCreditVintagesByTransactionBrokerIdAndCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};


export type PartyPurchasesByTransactionBrokerIdAndPurchaseIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};


export type PartyWalletsByPurchasePartyIdAndBuyerWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type PartyAddressesByPurchasePartyIdAndAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AddressesOrderBy>>;
  condition?: Maybe<AddressCondition>;
};


export type PartyCreditVintagesByPurchasePartyIdAndCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};


export type PartyUsersByPurchasePartyIdAndUserIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
};


export type PartyProjectsByProjectBrokerBrokerIdAndProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};


export type PartyPartiesByProjectBrokerBrokerIdAndAuthorizedByPartyIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyUsersByProjectBrokerBrokerIdAndSignerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
};


export type PartyProjectsByProjectBrokerAuthorizedByPartyIdAndProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};


export type PartyPartiesByProjectBrokerAuthorizedByPartyIdAndBrokerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PartyUsersByProjectBrokerAuthorizedByPartyIdAndSignerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
};

/** A connection to a list of `Address` values, with data from `Project`. */
export type PartyAddressesByProjectDeveloperIdAndAddressIdManyToManyConnection = {
  __typename?: 'PartyAddressesByProjectDeveloperIdAndAddressIdManyToManyConnection';
  /** A list of `Address` objects. */
  nodes: Array<Maybe<Address>>;
  /** A list of edges which contains the `Address`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyAddressesByProjectDeveloperIdAndAddressIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Address` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Address` edge in the connection, with data from `Project`. */
export type PartyAddressesByProjectDeveloperIdAndAddressIdManyToManyEdge = {
  __typename?: 'PartyAddressesByProjectDeveloperIdAndAddressIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Address` at the end of the edge. */
  node?: Maybe<Address>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByAddressId: ProjectsConnection;
};


/** A `Address` edge in the connection, with data from `Project`. */
export type PartyAddressesByProjectDeveloperIdAndAddressIdManyToManyEdgeProjectsByAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Address` values, with data from `Project`. */
export type PartyAddressesByProjectIssuerIdAndAddressIdManyToManyConnection = {
  __typename?: 'PartyAddressesByProjectIssuerIdAndAddressIdManyToManyConnection';
  /** A list of `Address` objects. */
  nodes: Array<Maybe<Address>>;
  /** A list of edges which contains the `Address`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyAddressesByProjectIssuerIdAndAddressIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Address` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Address` edge in the connection, with data from `Project`. */
export type PartyAddressesByProjectIssuerIdAndAddressIdManyToManyEdge = {
  __typename?: 'PartyAddressesByProjectIssuerIdAndAddressIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Address` at the end of the edge. */
  node?: Maybe<Address>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByAddressId: ProjectsConnection;
};


/** A `Address` edge in the connection, with data from `Project`. */
export type PartyAddressesByProjectIssuerIdAndAddressIdManyToManyEdgeProjectsByAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Address` values, with data from `Project`. */
export type PartyAddressesByProjectLandOwnerIdAndAddressIdManyToManyConnection = {
  __typename?: 'PartyAddressesByProjectLandOwnerIdAndAddressIdManyToManyConnection';
  /** A list of `Address` objects. */
  nodes: Array<Maybe<Address>>;
  /** A list of edges which contains the `Address`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyAddressesByProjectLandOwnerIdAndAddressIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Address` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Address` edge in the connection, with data from `Project`. */
export type PartyAddressesByProjectLandOwnerIdAndAddressIdManyToManyEdge = {
  __typename?: 'PartyAddressesByProjectLandOwnerIdAndAddressIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Address` at the end of the edge. */
  node?: Maybe<Address>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByAddressId: ProjectsConnection;
};


/** A `Address` edge in the connection, with data from `Project`. */
export type PartyAddressesByProjectLandOwnerIdAndAddressIdManyToManyEdgeProjectsByAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Address` values, with data from `Project`. */
export type PartyAddressesByProjectOriginatorIdAndAddressIdManyToManyConnection = {
  __typename?: 'PartyAddressesByProjectOriginatorIdAndAddressIdManyToManyConnection';
  /** A list of `Address` objects. */
  nodes: Array<Maybe<Address>>;
  /** A list of edges which contains the `Address`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyAddressesByProjectOriginatorIdAndAddressIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Address` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Address` edge in the connection, with data from `Project`. */
export type PartyAddressesByProjectOriginatorIdAndAddressIdManyToManyEdge = {
  __typename?: 'PartyAddressesByProjectOriginatorIdAndAddressIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Address` at the end of the edge. */
  node?: Maybe<Address>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByAddressId: ProjectsConnection;
};


/** A `Address` edge in the connection, with data from `Project`. */
export type PartyAddressesByProjectOriginatorIdAndAddressIdManyToManyEdgeProjectsByAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Address` values, with data from `Project`. */
export type PartyAddressesByProjectRegistryIdAndAddressIdManyToManyConnection = {
  __typename?: 'PartyAddressesByProjectRegistryIdAndAddressIdManyToManyConnection';
  /** A list of `Address` objects. */
  nodes: Array<Maybe<Address>>;
  /** A list of edges which contains the `Address`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyAddressesByProjectRegistryIdAndAddressIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Address` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Address` edge in the connection, with data from `Project`. */
export type PartyAddressesByProjectRegistryIdAndAddressIdManyToManyEdge = {
  __typename?: 'PartyAddressesByProjectRegistryIdAndAddressIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Address` at the end of the edge. */
  node?: Maybe<Address>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByAddressId: ProjectsConnection;
};


/** A `Address` edge in the connection, with data from `Project`. */
export type PartyAddressesByProjectRegistryIdAndAddressIdManyToManyEdgeProjectsByAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Address` values, with data from `Project`. */
export type PartyAddressesByProjectResellerIdAndAddressIdManyToManyConnection = {
  __typename?: 'PartyAddressesByProjectResellerIdAndAddressIdManyToManyConnection';
  /** A list of `Address` objects. */
  nodes: Array<Maybe<Address>>;
  /** A list of edges which contains the `Address`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyAddressesByProjectResellerIdAndAddressIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Address` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Address` edge in the connection, with data from `Project`. */
export type PartyAddressesByProjectResellerIdAndAddressIdManyToManyEdge = {
  __typename?: 'PartyAddressesByProjectResellerIdAndAddressIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Address` at the end of the edge. */
  node?: Maybe<Address>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByAddressId: ProjectsConnection;
};


/** A `Address` edge in the connection, with data from `Project`. */
export type PartyAddressesByProjectResellerIdAndAddressIdManyToManyEdgeProjectsByAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Address` values, with data from `Project`. */
export type PartyAddressesByProjectStewardIdAndAddressIdManyToManyConnection = {
  __typename?: 'PartyAddressesByProjectStewardIdAndAddressIdManyToManyConnection';
  /** A list of `Address` objects. */
  nodes: Array<Maybe<Address>>;
  /** A list of edges which contains the `Address`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyAddressesByProjectStewardIdAndAddressIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Address` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Address` edge in the connection, with data from `Project`. */
export type PartyAddressesByProjectStewardIdAndAddressIdManyToManyEdge = {
  __typename?: 'PartyAddressesByProjectStewardIdAndAddressIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Address` at the end of the edge. */
  node?: Maybe<Address>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByAddressId: ProjectsConnection;
};


/** A `Address` edge in the connection, with data from `Project`. */
export type PartyAddressesByProjectStewardIdAndAddressIdManyToManyEdgeProjectsByAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Address` values, with data from `Purchase`. */
export type PartyAddressesByPurchasePartyIdAndAddressIdManyToManyConnection = {
  __typename?: 'PartyAddressesByPurchasePartyIdAndAddressIdManyToManyConnection';
  /** A list of `Address` objects. */
  nodes: Array<Maybe<Address>>;
  /** A list of edges which contains the `Address`, info from the `Purchase`, and the cursor to aid in pagination. */
  edges: Array<PartyAddressesByPurchasePartyIdAndAddressIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Address` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Address` edge in the connection, with data from `Purchase`. */
export type PartyAddressesByPurchasePartyIdAndAddressIdManyToManyEdge = {
  __typename?: 'PartyAddressesByPurchasePartyIdAndAddressIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Address` at the end of the edge. */
  node?: Maybe<Address>;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByAddressId: PurchasesConnection;
};


/** A `Address` edge in the connection, with data from `Purchase`. */
export type PartyAddressesByPurchasePartyIdAndAddressIdManyToManyEdgePurchasesByAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
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
  /** Checks for equality with the object’s `addressId` field. */
  addressId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `roles` field. */
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `image` field. */
  image?: Maybe<Scalars['String']>;
};

/** A connection to a list of `CreditClass` values, with data from `CreditVintage`. */
export type PartyCreditClassesByCreditVintageIssuerIdAndCreditClassIdManyToManyConnection = {
  __typename?: 'PartyCreditClassesByCreditVintageIssuerIdAndCreditClassIdManyToManyConnection';
  /** A list of `CreditClass` objects. */
  nodes: Array<Maybe<CreditClass>>;
  /** A list of edges which contains the `CreditClass`, info from the `CreditVintage`, and the cursor to aid in pagination. */
  edges: Array<PartyCreditClassesByCreditVintageIssuerIdAndCreditClassIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditClass` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditClass` edge in the connection, with data from `CreditVintage`. */
export type PartyCreditClassesByCreditVintageIssuerIdAndCreditClassIdManyToManyEdge = {
  __typename?: 'PartyCreditClassesByCreditVintageIssuerIdAndCreditClassIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditClass` at the end of the edge. */
  node?: Maybe<CreditClass>;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByCreditClassId: CreditVintagesConnection;
};


/** A `CreditClass` edge in the connection, with data from `CreditVintage`. */
export type PartyCreditClassesByCreditVintageIssuerIdAndCreditClassIdManyToManyEdgeCreditVintagesByCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
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
};

/** A connection to a list of `CreditClass` values, with data from `Project`. */
export type PartyCreditClassesByProjectIssuerIdAndCreditClassIdManyToManyConnection = {
  __typename?: 'PartyCreditClassesByProjectIssuerIdAndCreditClassIdManyToManyConnection';
  /** A list of `CreditClass` objects. */
  nodes: Array<Maybe<CreditClass>>;
  /** A list of edges which contains the `CreditClass`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyCreditClassesByProjectIssuerIdAndCreditClassIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditClass` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditClass` edge in the connection, with data from `Project`. */
export type PartyCreditClassesByProjectIssuerIdAndCreditClassIdManyToManyEdge = {
  __typename?: 'PartyCreditClassesByProjectIssuerIdAndCreditClassIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditClass` at the end of the edge. */
  node?: Maybe<CreditClass>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreditClassId: ProjectsConnection;
};


/** A `CreditClass` edge in the connection, with data from `Project`. */
export type PartyCreditClassesByProjectIssuerIdAndCreditClassIdManyToManyEdgeProjectsByCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `CreditClass` values, with data from `Project`. */
export type PartyCreditClassesByProjectLandOwnerIdAndCreditClassIdManyToManyConnection = {
  __typename?: 'PartyCreditClassesByProjectLandOwnerIdAndCreditClassIdManyToManyConnection';
  /** A list of `CreditClass` objects. */
  nodes: Array<Maybe<CreditClass>>;
  /** A list of edges which contains the `CreditClass`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyCreditClassesByProjectLandOwnerIdAndCreditClassIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditClass` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditClass` edge in the connection, with data from `Project`. */
export type PartyCreditClassesByProjectLandOwnerIdAndCreditClassIdManyToManyEdge = {
  __typename?: 'PartyCreditClassesByProjectLandOwnerIdAndCreditClassIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditClass` at the end of the edge. */
  node?: Maybe<CreditClass>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreditClassId: ProjectsConnection;
};


/** A `CreditClass` edge in the connection, with data from `Project`. */
export type PartyCreditClassesByProjectLandOwnerIdAndCreditClassIdManyToManyEdgeProjectsByCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `CreditClass` values, with data from `Project`. */
export type PartyCreditClassesByProjectOriginatorIdAndCreditClassIdManyToManyConnection = {
  __typename?: 'PartyCreditClassesByProjectOriginatorIdAndCreditClassIdManyToManyConnection';
  /** A list of `CreditClass` objects. */
  nodes: Array<Maybe<CreditClass>>;
  /** A list of edges which contains the `CreditClass`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyCreditClassesByProjectOriginatorIdAndCreditClassIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditClass` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditClass` edge in the connection, with data from `Project`. */
export type PartyCreditClassesByProjectOriginatorIdAndCreditClassIdManyToManyEdge = {
  __typename?: 'PartyCreditClassesByProjectOriginatorIdAndCreditClassIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditClass` at the end of the edge. */
  node?: Maybe<CreditClass>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreditClassId: ProjectsConnection;
};


/** A `CreditClass` edge in the connection, with data from `Project`. */
export type PartyCreditClassesByProjectOriginatorIdAndCreditClassIdManyToManyEdgeProjectsByCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `CreditClass` values, with data from `Project`. */
export type PartyCreditClassesByProjectRegistryIdAndCreditClassIdManyToManyConnection = {
  __typename?: 'PartyCreditClassesByProjectRegistryIdAndCreditClassIdManyToManyConnection';
  /** A list of `CreditClass` objects. */
  nodes: Array<Maybe<CreditClass>>;
  /** A list of edges which contains the `CreditClass`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyCreditClassesByProjectRegistryIdAndCreditClassIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditClass` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditClass` edge in the connection, with data from `Project`. */
export type PartyCreditClassesByProjectRegistryIdAndCreditClassIdManyToManyEdge = {
  __typename?: 'PartyCreditClassesByProjectRegistryIdAndCreditClassIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditClass` at the end of the edge. */
  node?: Maybe<CreditClass>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreditClassId: ProjectsConnection;
};


/** A `CreditClass` edge in the connection, with data from `Project`. */
export type PartyCreditClassesByProjectRegistryIdAndCreditClassIdManyToManyEdgeProjectsByCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `CreditClass` values, with data from `Project`. */
export type PartyCreditClassesByProjectResellerIdAndCreditClassIdManyToManyConnection = {
  __typename?: 'PartyCreditClassesByProjectResellerIdAndCreditClassIdManyToManyConnection';
  /** A list of `CreditClass` objects. */
  nodes: Array<Maybe<CreditClass>>;
  /** A list of edges which contains the `CreditClass`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyCreditClassesByProjectResellerIdAndCreditClassIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditClass` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditClass` edge in the connection, with data from `Project`. */
export type PartyCreditClassesByProjectResellerIdAndCreditClassIdManyToManyEdge = {
  __typename?: 'PartyCreditClassesByProjectResellerIdAndCreditClassIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditClass` at the end of the edge. */
  node?: Maybe<CreditClass>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreditClassId: ProjectsConnection;
};


/** A `CreditClass` edge in the connection, with data from `Project`. */
export type PartyCreditClassesByProjectResellerIdAndCreditClassIdManyToManyEdgeProjectsByCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `CreditClass` values, with data from `Project`. */
export type PartyCreditClassesByProjectStewardIdAndCreditClassIdManyToManyConnection = {
  __typename?: 'PartyCreditClassesByProjectStewardIdAndCreditClassIdManyToManyConnection';
  /** A list of `CreditClass` objects. */
  nodes: Array<Maybe<CreditClass>>;
  /** A list of edges which contains the `CreditClass`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyCreditClassesByProjectStewardIdAndCreditClassIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditClass` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditClass` edge in the connection, with data from `Project`. */
export type PartyCreditClassesByProjectStewardIdAndCreditClassIdManyToManyEdge = {
  __typename?: 'PartyCreditClassesByProjectStewardIdAndCreditClassIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditClass` at the end of the edge. */
  node?: Maybe<CreditClass>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreditClassId: ProjectsConnection;
};


/** A `CreditClass` edge in the connection, with data from `Project`. */
export type PartyCreditClassesByProjectStewardIdAndCreditClassIdManyToManyEdgeProjectsByCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `CreditVintage` values, with data from `Purchase`. */
export type PartyCreditVintagesByPurchasePartyIdAndCreditVintageIdManyToManyConnection = {
  __typename?: 'PartyCreditVintagesByPurchasePartyIdAndCreditVintageIdManyToManyConnection';
  /** A list of `CreditVintage` objects. */
  nodes: Array<Maybe<CreditVintage>>;
  /** A list of edges which contains the `CreditVintage`, info from the `Purchase`, and the cursor to aid in pagination. */
  edges: Array<PartyCreditVintagesByPurchasePartyIdAndCreditVintageIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditVintage` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditVintage` edge in the connection, with data from `Purchase`. */
export type PartyCreditVintagesByPurchasePartyIdAndCreditVintageIdManyToManyEdge = {
  __typename?: 'PartyCreditVintagesByPurchasePartyIdAndCreditVintageIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditVintage` at the end of the edge. */
  node?: Maybe<CreditVintage>;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByCreditVintageId: PurchasesConnection;
};


/** A `CreditVintage` edge in the connection, with data from `Purchase`. */
export type PartyCreditVintagesByPurchasePartyIdAndCreditVintageIdManyToManyEdgePurchasesByCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};

/** A connection to a list of `CreditVintage` values, with data from `Transaction`. */
export type PartyCreditVintagesByTransactionBrokerIdAndCreditVintageIdManyToManyConnection = {
  __typename?: 'PartyCreditVintagesByTransactionBrokerIdAndCreditVintageIdManyToManyConnection';
  /** A list of `CreditVintage` objects. */
  nodes: Array<Maybe<CreditVintage>>;
  /** A list of edges which contains the `CreditVintage`, info from the `Transaction`, and the cursor to aid in pagination. */
  edges: Array<PartyCreditVintagesByTransactionBrokerIdAndCreditVintageIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditVintage` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditVintage` edge in the connection, with data from `Transaction`. */
export type PartyCreditVintagesByTransactionBrokerIdAndCreditVintageIdManyToManyEdge = {
  __typename?: 'PartyCreditVintagesByTransactionBrokerIdAndCreditVintageIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditVintage` at the end of the edge. */
  node?: Maybe<CreditVintage>;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByCreditVintageId: TransactionsConnection;
};


/** A `CreditVintage` edge in the connection, with data from `Transaction`. */
export type PartyCreditVintagesByTransactionBrokerIdAndCreditVintageIdManyToManyEdgeTransactionsByCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};

/** An input for mutations affecting `Party` */
export type PartyInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  type: PartyType;
  name?: Maybe<Scalars['String']>;
  walletId?: Maybe<Scalars['UUID']>;
  addressId?: Maybe<Scalars['UUID']>;
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Methodology` values, with data from `CreditClass`. */
export type PartyMethodologiesByCreditClassDesignerIdAndMethodologyIdManyToManyConnection = {
  __typename?: 'PartyMethodologiesByCreditClassDesignerIdAndMethodologyIdManyToManyConnection';
  /** A list of `Methodology` objects. */
  nodes: Array<Maybe<Methodology>>;
  /** A list of edges which contains the `Methodology`, info from the `CreditClass`, and the cursor to aid in pagination. */
  edges: Array<PartyMethodologiesByCreditClassDesignerIdAndMethodologyIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Methodology` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Methodology` edge in the connection, with data from `CreditClass`. */
export type PartyMethodologiesByCreditClassDesignerIdAndMethodologyIdManyToManyEdge = {
  __typename?: 'PartyMethodologiesByCreditClassDesignerIdAndMethodologyIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Methodology` at the end of the edge. */
  node?: Maybe<Methodology>;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByMethodologyId: CreditClassesConnection;
};


/** A `Methodology` edge in the connection, with data from `CreditClass`. */
export type PartyMethodologiesByCreditClassDesignerIdAndMethodologyIdManyToManyEdgeCreditClassesByMethodologyIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};

/** A connection to a list of `Party` values, with data from `ProjectBroker`. */
export type PartyPartiesByProjectBrokerAuthorizedByPartyIdAndBrokerIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectBrokerAuthorizedByPartyIdAndBrokerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `ProjectBroker`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectBrokerAuthorizedByPartyIdAndBrokerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `ProjectBroker`. */
export type PartyPartiesByProjectBrokerAuthorizedByPartyIdAndBrokerIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectBrokerAuthorizedByPartyIdAndBrokerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `ProjectBroker`. */
  projectBrokersByBrokerId: ProjectBrokersConnection;
};


/** A `Party` edge in the connection, with data from `ProjectBroker`. */
export type PartyPartiesByProjectBrokerAuthorizedByPartyIdAndBrokerIdManyToManyEdgeProjectBrokersByBrokerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectBrokersOrderBy>>;
  condition?: Maybe<ProjectBrokerCondition>;
};

/** A connection to a list of `Party` values, with data from `ProjectBroker`. */
export type PartyPartiesByProjectBrokerBrokerIdAndAuthorizedByPartyIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectBrokerBrokerIdAndAuthorizedByPartyIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `ProjectBroker`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectBrokerBrokerIdAndAuthorizedByPartyIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `ProjectBroker`. */
export type PartyPartiesByProjectBrokerBrokerIdAndAuthorizedByPartyIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectBrokerBrokerIdAndAuthorizedByPartyIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `ProjectBroker`. */
  projectBrokersByAuthorizedByPartyId: ProjectBrokersConnection;
};


/** A `Party` edge in the connection, with data from `ProjectBroker`. */
export type PartyPartiesByProjectBrokerBrokerIdAndAuthorizedByPartyIdManyToManyEdgeProjectBrokersByAuthorizedByPartyIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectBrokersOrderBy>>;
  condition?: Maybe<ProjectBrokerCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectDeveloperIdAndIssuerIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectDeveloperIdAndIssuerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectDeveloperIdAndIssuerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectDeveloperIdAndIssuerIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectDeveloperIdAndIssuerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByIssuerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectDeveloperIdAndIssuerIdManyToManyEdgeProjectsByIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectDeveloperIdAndLandOwnerIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectDeveloperIdAndLandOwnerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectDeveloperIdAndLandOwnerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectDeveloperIdAndLandOwnerIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectDeveloperIdAndLandOwnerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByLandOwnerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectDeveloperIdAndLandOwnerIdManyToManyEdgeProjectsByLandOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectDeveloperIdAndOriginatorIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectDeveloperIdAndOriginatorIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectDeveloperIdAndOriginatorIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectDeveloperIdAndOriginatorIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectDeveloperIdAndOriginatorIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByOriginatorId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectDeveloperIdAndOriginatorIdManyToManyEdgeProjectsByOriginatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectDeveloperIdAndRegistryIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectDeveloperIdAndRegistryIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectDeveloperIdAndRegistryIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectDeveloperIdAndRegistryIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectDeveloperIdAndRegistryIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByRegistryId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectDeveloperIdAndRegistryIdManyToManyEdgeProjectsByRegistryIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectDeveloperIdAndResellerIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectDeveloperIdAndResellerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectDeveloperIdAndResellerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectDeveloperIdAndResellerIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectDeveloperIdAndResellerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByResellerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectDeveloperIdAndResellerIdManyToManyEdgeProjectsByResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectDeveloperIdAndStewardIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectDeveloperIdAndStewardIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectDeveloperIdAndStewardIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectDeveloperIdAndStewardIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectDeveloperIdAndStewardIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByStewardId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectDeveloperIdAndStewardIdManyToManyEdgeProjectsByStewardIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectIssuerIdAndDeveloperIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectIssuerIdAndDeveloperIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectIssuerIdAndDeveloperIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectIssuerIdAndDeveloperIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectIssuerIdAndDeveloperIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByDeveloperId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectIssuerIdAndDeveloperIdManyToManyEdgeProjectsByDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectIssuerIdAndLandOwnerIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectIssuerIdAndLandOwnerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectIssuerIdAndLandOwnerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectIssuerIdAndLandOwnerIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectIssuerIdAndLandOwnerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByLandOwnerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectIssuerIdAndLandOwnerIdManyToManyEdgeProjectsByLandOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectIssuerIdAndOriginatorIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectIssuerIdAndOriginatorIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectIssuerIdAndOriginatorIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectIssuerIdAndOriginatorIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectIssuerIdAndOriginatorIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByOriginatorId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectIssuerIdAndOriginatorIdManyToManyEdgeProjectsByOriginatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectIssuerIdAndRegistryIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectIssuerIdAndRegistryIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectIssuerIdAndRegistryIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectIssuerIdAndRegistryIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectIssuerIdAndRegistryIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByRegistryId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectIssuerIdAndRegistryIdManyToManyEdgeProjectsByRegistryIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectIssuerIdAndResellerIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectIssuerIdAndResellerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectIssuerIdAndResellerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectIssuerIdAndResellerIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectIssuerIdAndResellerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByResellerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectIssuerIdAndResellerIdManyToManyEdgeProjectsByResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectIssuerIdAndStewardIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectIssuerIdAndStewardIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectIssuerIdAndStewardIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectIssuerIdAndStewardIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectIssuerIdAndStewardIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByStewardId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectIssuerIdAndStewardIdManyToManyEdgeProjectsByStewardIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectLandOwnerIdAndDeveloperIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectLandOwnerIdAndDeveloperIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectLandOwnerIdAndDeveloperIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectLandOwnerIdAndDeveloperIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectLandOwnerIdAndDeveloperIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByDeveloperId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectLandOwnerIdAndDeveloperIdManyToManyEdgeProjectsByDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectLandOwnerIdAndIssuerIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectLandOwnerIdAndIssuerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectLandOwnerIdAndIssuerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectLandOwnerIdAndIssuerIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectLandOwnerIdAndIssuerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByIssuerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectLandOwnerIdAndIssuerIdManyToManyEdgeProjectsByIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectLandOwnerIdAndOriginatorIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectLandOwnerIdAndOriginatorIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectLandOwnerIdAndOriginatorIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectLandOwnerIdAndOriginatorIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectLandOwnerIdAndOriginatorIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByOriginatorId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectLandOwnerIdAndOriginatorIdManyToManyEdgeProjectsByOriginatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectLandOwnerIdAndRegistryIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectLandOwnerIdAndRegistryIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectLandOwnerIdAndRegistryIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectLandOwnerIdAndRegistryIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectLandOwnerIdAndRegistryIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByRegistryId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectLandOwnerIdAndRegistryIdManyToManyEdgeProjectsByRegistryIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectLandOwnerIdAndResellerIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectLandOwnerIdAndResellerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectLandOwnerIdAndResellerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectLandOwnerIdAndResellerIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectLandOwnerIdAndResellerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByResellerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectLandOwnerIdAndResellerIdManyToManyEdgeProjectsByResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectLandOwnerIdAndStewardIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectLandOwnerIdAndStewardIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectLandOwnerIdAndStewardIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectLandOwnerIdAndStewardIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectLandOwnerIdAndStewardIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByStewardId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectLandOwnerIdAndStewardIdManyToManyEdgeProjectsByStewardIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectOriginatorIdAndDeveloperIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectOriginatorIdAndDeveloperIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectOriginatorIdAndDeveloperIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectOriginatorIdAndDeveloperIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectOriginatorIdAndDeveloperIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByDeveloperId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectOriginatorIdAndDeveloperIdManyToManyEdgeProjectsByDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectOriginatorIdAndIssuerIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectOriginatorIdAndIssuerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectOriginatorIdAndIssuerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectOriginatorIdAndIssuerIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectOriginatorIdAndIssuerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByIssuerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectOriginatorIdAndIssuerIdManyToManyEdgeProjectsByIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectOriginatorIdAndLandOwnerIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectOriginatorIdAndLandOwnerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectOriginatorIdAndLandOwnerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectOriginatorIdAndLandOwnerIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectOriginatorIdAndLandOwnerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByLandOwnerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectOriginatorIdAndLandOwnerIdManyToManyEdgeProjectsByLandOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectOriginatorIdAndRegistryIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectOriginatorIdAndRegistryIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectOriginatorIdAndRegistryIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectOriginatorIdAndRegistryIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectOriginatorIdAndRegistryIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByRegistryId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectOriginatorIdAndRegistryIdManyToManyEdgeProjectsByRegistryIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectOriginatorIdAndResellerIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectOriginatorIdAndResellerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectOriginatorIdAndResellerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectOriginatorIdAndResellerIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectOriginatorIdAndResellerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByResellerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectOriginatorIdAndResellerIdManyToManyEdgeProjectsByResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectOriginatorIdAndStewardIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectOriginatorIdAndStewardIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectOriginatorIdAndStewardIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectOriginatorIdAndStewardIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectOriginatorIdAndStewardIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByStewardId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectOriginatorIdAndStewardIdManyToManyEdgeProjectsByStewardIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectRegistryIdAndDeveloperIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectRegistryIdAndDeveloperIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectRegistryIdAndDeveloperIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectRegistryIdAndDeveloperIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectRegistryIdAndDeveloperIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByDeveloperId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectRegistryIdAndDeveloperIdManyToManyEdgeProjectsByDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectRegistryIdAndIssuerIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectRegistryIdAndIssuerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectRegistryIdAndIssuerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectRegistryIdAndIssuerIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectRegistryIdAndIssuerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByIssuerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectRegistryIdAndIssuerIdManyToManyEdgeProjectsByIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectRegistryIdAndLandOwnerIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectRegistryIdAndLandOwnerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectRegistryIdAndLandOwnerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectRegistryIdAndLandOwnerIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectRegistryIdAndLandOwnerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByLandOwnerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectRegistryIdAndLandOwnerIdManyToManyEdgeProjectsByLandOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectRegistryIdAndOriginatorIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectRegistryIdAndOriginatorIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectRegistryIdAndOriginatorIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectRegistryIdAndOriginatorIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectRegistryIdAndOriginatorIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByOriginatorId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectRegistryIdAndOriginatorIdManyToManyEdgeProjectsByOriginatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectRegistryIdAndResellerIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectRegistryIdAndResellerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectRegistryIdAndResellerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectRegistryIdAndResellerIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectRegistryIdAndResellerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByResellerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectRegistryIdAndResellerIdManyToManyEdgeProjectsByResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectRegistryIdAndStewardIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectRegistryIdAndStewardIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectRegistryIdAndStewardIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectRegistryIdAndStewardIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectRegistryIdAndStewardIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByStewardId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectRegistryIdAndStewardIdManyToManyEdgeProjectsByStewardIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectResellerIdAndDeveloperIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectResellerIdAndDeveloperIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectResellerIdAndDeveloperIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectResellerIdAndDeveloperIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectResellerIdAndDeveloperIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByDeveloperId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectResellerIdAndDeveloperIdManyToManyEdgeProjectsByDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectResellerIdAndIssuerIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectResellerIdAndIssuerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectResellerIdAndIssuerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectResellerIdAndIssuerIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectResellerIdAndIssuerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByIssuerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectResellerIdAndIssuerIdManyToManyEdgeProjectsByIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectResellerIdAndLandOwnerIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectResellerIdAndLandOwnerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectResellerIdAndLandOwnerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectResellerIdAndLandOwnerIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectResellerIdAndLandOwnerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByLandOwnerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectResellerIdAndLandOwnerIdManyToManyEdgeProjectsByLandOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectResellerIdAndOriginatorIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectResellerIdAndOriginatorIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectResellerIdAndOriginatorIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectResellerIdAndOriginatorIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectResellerIdAndOriginatorIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByOriginatorId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectResellerIdAndOriginatorIdManyToManyEdgeProjectsByOriginatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectResellerIdAndRegistryIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectResellerIdAndRegistryIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectResellerIdAndRegistryIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectResellerIdAndRegistryIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectResellerIdAndRegistryIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByRegistryId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectResellerIdAndRegistryIdManyToManyEdgeProjectsByRegistryIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectResellerIdAndStewardIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectResellerIdAndStewardIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectResellerIdAndStewardIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectResellerIdAndStewardIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectResellerIdAndStewardIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByStewardId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectResellerIdAndStewardIdManyToManyEdgeProjectsByStewardIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectStewardIdAndDeveloperIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectStewardIdAndDeveloperIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectStewardIdAndDeveloperIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectStewardIdAndDeveloperIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectStewardIdAndDeveloperIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByDeveloperId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectStewardIdAndDeveloperIdManyToManyEdgeProjectsByDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectStewardIdAndIssuerIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectStewardIdAndIssuerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectStewardIdAndIssuerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectStewardIdAndIssuerIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectStewardIdAndIssuerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByIssuerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectStewardIdAndIssuerIdManyToManyEdgeProjectsByIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectStewardIdAndLandOwnerIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectStewardIdAndLandOwnerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectStewardIdAndLandOwnerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectStewardIdAndLandOwnerIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectStewardIdAndLandOwnerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByLandOwnerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectStewardIdAndLandOwnerIdManyToManyEdgeProjectsByLandOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectStewardIdAndOriginatorIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectStewardIdAndOriginatorIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectStewardIdAndOriginatorIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectStewardIdAndOriginatorIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectStewardIdAndOriginatorIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByOriginatorId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectStewardIdAndOriginatorIdManyToManyEdgeProjectsByOriginatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectStewardIdAndRegistryIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectStewardIdAndRegistryIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectStewardIdAndRegistryIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectStewardIdAndRegistryIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectStewardIdAndRegistryIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByRegistryId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectStewardIdAndRegistryIdManyToManyEdgeProjectsByRegistryIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type PartyPartiesByProjectStewardIdAndResellerIdManyToManyConnection = {
  __typename?: 'PartyPartiesByProjectStewardIdAndResellerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyPartiesByProjectStewardIdAndResellerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectStewardIdAndResellerIdManyToManyEdge = {
  __typename?: 'PartyPartiesByProjectStewardIdAndResellerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByResellerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type PartyPartiesByProjectStewardIdAndResellerIdManyToManyEdgeProjectsByResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** Represents an update to a `Party`. Fields that are set will be updated. */
export type PartyPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  type?: Maybe<PartyType>;
  name?: Maybe<Scalars['String']>;
  walletId?: Maybe<Scalars['UUID']>;
  addressId?: Maybe<Scalars['UUID']>;
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Project` values, with data from `CreditVintage`. */
export type PartyProjectsByCreditVintageIssuerIdAndProjectIdManyToManyConnection = {
  __typename?: 'PartyProjectsByCreditVintageIssuerIdAndProjectIdManyToManyConnection';
  /** A list of `Project` objects. */
  nodes: Array<Maybe<Project>>;
  /** A list of edges which contains the `Project`, info from the `CreditVintage`, and the cursor to aid in pagination. */
  edges: Array<PartyProjectsByCreditVintageIssuerIdAndProjectIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Project` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Project` edge in the connection, with data from `CreditVintage`. */
export type PartyProjectsByCreditVintageIssuerIdAndProjectIdManyToManyEdge = {
  __typename?: 'PartyProjectsByCreditVintageIssuerIdAndProjectIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Project` at the end of the edge. */
  node?: Maybe<Project>;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByProjectId: CreditVintagesConnection;
};


/** A `Project` edge in the connection, with data from `CreditVintage`. */
export type PartyProjectsByCreditVintageIssuerIdAndProjectIdManyToManyEdgeCreditVintagesByProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};

/** A connection to a list of `Project` values, with data from `ProjectBroker`. */
export type PartyProjectsByProjectBrokerAuthorizedByPartyIdAndProjectIdManyToManyConnection = {
  __typename?: 'PartyProjectsByProjectBrokerAuthorizedByPartyIdAndProjectIdManyToManyConnection';
  /** A list of `Project` objects. */
  nodes: Array<Maybe<Project>>;
  /** A list of edges which contains the `Project`, info from the `ProjectBroker`, and the cursor to aid in pagination. */
  edges: Array<PartyProjectsByProjectBrokerAuthorizedByPartyIdAndProjectIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Project` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Project` edge in the connection, with data from `ProjectBroker`. */
export type PartyProjectsByProjectBrokerAuthorizedByPartyIdAndProjectIdManyToManyEdge = {
  __typename?: 'PartyProjectsByProjectBrokerAuthorizedByPartyIdAndProjectIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Project` at the end of the edge. */
  node?: Maybe<Project>;
  /** Reads and enables pagination through a set of `ProjectBroker`. */
  projectBrokersByProjectId: ProjectBrokersConnection;
};


/** A `Project` edge in the connection, with data from `ProjectBroker`. */
export type PartyProjectsByProjectBrokerAuthorizedByPartyIdAndProjectIdManyToManyEdgeProjectBrokersByProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectBrokersOrderBy>>;
  condition?: Maybe<ProjectBrokerCondition>;
};

/** A connection to a list of `Project` values, with data from `ProjectBroker`. */
export type PartyProjectsByProjectBrokerBrokerIdAndProjectIdManyToManyConnection = {
  __typename?: 'PartyProjectsByProjectBrokerBrokerIdAndProjectIdManyToManyConnection';
  /** A list of `Project` objects. */
  nodes: Array<Maybe<Project>>;
  /** A list of edges which contains the `Project`, info from the `ProjectBroker`, and the cursor to aid in pagination. */
  edges: Array<PartyProjectsByProjectBrokerBrokerIdAndProjectIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Project` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Project` edge in the connection, with data from `ProjectBroker`. */
export type PartyProjectsByProjectBrokerBrokerIdAndProjectIdManyToManyEdge = {
  __typename?: 'PartyProjectsByProjectBrokerBrokerIdAndProjectIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Project` at the end of the edge. */
  node?: Maybe<Project>;
  /** Reads and enables pagination through a set of `ProjectBroker`. */
  projectBrokersByProjectId: ProjectBrokersConnection;
};


/** A `Project` edge in the connection, with data from `ProjectBroker`. */
export type PartyProjectsByProjectBrokerBrokerIdAndProjectIdManyToManyEdgeProjectBrokersByProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectBrokersOrderBy>>;
  condition?: Maybe<ProjectBrokerCondition>;
};

/** A connection to a list of `Purchase` values, with data from `Transaction`. */
export type PartyPurchasesByTransactionBrokerIdAndPurchaseIdManyToManyConnection = {
  __typename?: 'PartyPurchasesByTransactionBrokerIdAndPurchaseIdManyToManyConnection';
  /** A list of `Purchase` objects. */
  nodes: Array<Maybe<Purchase>>;
  /** A list of edges which contains the `Purchase`, info from the `Transaction`, and the cursor to aid in pagination. */
  edges: Array<PartyPurchasesByTransactionBrokerIdAndPurchaseIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Purchase` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Purchase` edge in the connection, with data from `Transaction`. */
export type PartyPurchasesByTransactionBrokerIdAndPurchaseIdManyToManyEdge = {
  __typename?: 'PartyPurchasesByTransactionBrokerIdAndPurchaseIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Purchase` at the end of the edge. */
  node?: Maybe<Purchase>;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByPurchaseId: TransactionsConnection;
};


/** A `Purchase` edge in the connection, with data from `Transaction`. */
export type PartyPurchasesByTransactionBrokerIdAndPurchaseIdManyToManyEdgeTransactionsByPurchaseIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};

export enum PartyType {
  User = 'USER',
  Organization = 'ORGANIZATION'
}

/** A connection to a list of `User` values, with data from `ProjectBroker`. */
export type PartyUsersByProjectBrokerAuthorizedByPartyIdAndSignerIdManyToManyConnection = {
  __typename?: 'PartyUsersByProjectBrokerAuthorizedByPartyIdAndSignerIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `ProjectBroker`, and the cursor to aid in pagination. */
  edges: Array<PartyUsersByProjectBrokerAuthorizedByPartyIdAndSignerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `ProjectBroker`. */
export type PartyUsersByProjectBrokerAuthorizedByPartyIdAndSignerIdManyToManyEdge = {
  __typename?: 'PartyUsersByProjectBrokerAuthorizedByPartyIdAndSignerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `ProjectBroker`. */
  projectBrokersBySignerId: ProjectBrokersConnection;
};


/** A `User` edge in the connection, with data from `ProjectBroker`. */
export type PartyUsersByProjectBrokerAuthorizedByPartyIdAndSignerIdManyToManyEdgeProjectBrokersBySignerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectBrokersOrderBy>>;
  condition?: Maybe<ProjectBrokerCondition>;
};

/** A connection to a list of `User` values, with data from `ProjectBroker`. */
export type PartyUsersByProjectBrokerBrokerIdAndSignerIdManyToManyConnection = {
  __typename?: 'PartyUsersByProjectBrokerBrokerIdAndSignerIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `ProjectBroker`, and the cursor to aid in pagination. */
  edges: Array<PartyUsersByProjectBrokerBrokerIdAndSignerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `ProjectBroker`. */
export type PartyUsersByProjectBrokerBrokerIdAndSignerIdManyToManyEdge = {
  __typename?: 'PartyUsersByProjectBrokerBrokerIdAndSignerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `ProjectBroker`. */
  projectBrokersBySignerId: ProjectBrokersConnection;
};


/** A `User` edge in the connection, with data from `ProjectBroker`. */
export type PartyUsersByProjectBrokerBrokerIdAndSignerIdManyToManyEdgeProjectBrokersBySignerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectBrokersOrderBy>>;
  condition?: Maybe<ProjectBrokerCondition>;
};

/** A connection to a list of `User` values, with data from `Project`. */
export type PartyUsersByProjectDeveloperIdAndCreatorIdManyToManyConnection = {
  __typename?: 'PartyUsersByProjectDeveloperIdAndCreatorIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyUsersByProjectDeveloperIdAndCreatorIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `Project`. */
export type PartyUsersByProjectDeveloperIdAndCreatorIdManyToManyEdge = {
  __typename?: 'PartyUsersByProjectDeveloperIdAndCreatorIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreatorId: ProjectsConnection;
};


/** A `User` edge in the connection, with data from `Project`. */
export type PartyUsersByProjectDeveloperIdAndCreatorIdManyToManyEdgeProjectsByCreatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `User` values, with data from `Project`. */
export type PartyUsersByProjectIssuerIdAndCreatorIdManyToManyConnection = {
  __typename?: 'PartyUsersByProjectIssuerIdAndCreatorIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyUsersByProjectIssuerIdAndCreatorIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `Project`. */
export type PartyUsersByProjectIssuerIdAndCreatorIdManyToManyEdge = {
  __typename?: 'PartyUsersByProjectIssuerIdAndCreatorIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreatorId: ProjectsConnection;
};


/** A `User` edge in the connection, with data from `Project`. */
export type PartyUsersByProjectIssuerIdAndCreatorIdManyToManyEdgeProjectsByCreatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `User` values, with data from `Project`. */
export type PartyUsersByProjectLandOwnerIdAndCreatorIdManyToManyConnection = {
  __typename?: 'PartyUsersByProjectLandOwnerIdAndCreatorIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyUsersByProjectLandOwnerIdAndCreatorIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `Project`. */
export type PartyUsersByProjectLandOwnerIdAndCreatorIdManyToManyEdge = {
  __typename?: 'PartyUsersByProjectLandOwnerIdAndCreatorIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreatorId: ProjectsConnection;
};


/** A `User` edge in the connection, with data from `Project`. */
export type PartyUsersByProjectLandOwnerIdAndCreatorIdManyToManyEdgeProjectsByCreatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `User` values, with data from `Project`. */
export type PartyUsersByProjectOriginatorIdAndCreatorIdManyToManyConnection = {
  __typename?: 'PartyUsersByProjectOriginatorIdAndCreatorIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyUsersByProjectOriginatorIdAndCreatorIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `Project`. */
export type PartyUsersByProjectOriginatorIdAndCreatorIdManyToManyEdge = {
  __typename?: 'PartyUsersByProjectOriginatorIdAndCreatorIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreatorId: ProjectsConnection;
};


/** A `User` edge in the connection, with data from `Project`. */
export type PartyUsersByProjectOriginatorIdAndCreatorIdManyToManyEdgeProjectsByCreatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `User` values, with data from `Project`. */
export type PartyUsersByProjectRegistryIdAndCreatorIdManyToManyConnection = {
  __typename?: 'PartyUsersByProjectRegistryIdAndCreatorIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyUsersByProjectRegistryIdAndCreatorIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `Project`. */
export type PartyUsersByProjectRegistryIdAndCreatorIdManyToManyEdge = {
  __typename?: 'PartyUsersByProjectRegistryIdAndCreatorIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreatorId: ProjectsConnection;
};


/** A `User` edge in the connection, with data from `Project`. */
export type PartyUsersByProjectRegistryIdAndCreatorIdManyToManyEdgeProjectsByCreatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `User` values, with data from `Project`. */
export type PartyUsersByProjectResellerIdAndCreatorIdManyToManyConnection = {
  __typename?: 'PartyUsersByProjectResellerIdAndCreatorIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyUsersByProjectResellerIdAndCreatorIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `Project`. */
export type PartyUsersByProjectResellerIdAndCreatorIdManyToManyEdge = {
  __typename?: 'PartyUsersByProjectResellerIdAndCreatorIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreatorId: ProjectsConnection;
};


/** A `User` edge in the connection, with data from `Project`. */
export type PartyUsersByProjectResellerIdAndCreatorIdManyToManyEdgeProjectsByCreatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `User` values, with data from `Project`. */
export type PartyUsersByProjectStewardIdAndCreatorIdManyToManyConnection = {
  __typename?: 'PartyUsersByProjectStewardIdAndCreatorIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<PartyUsersByProjectStewardIdAndCreatorIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `Project`. */
export type PartyUsersByProjectStewardIdAndCreatorIdManyToManyEdge = {
  __typename?: 'PartyUsersByProjectStewardIdAndCreatorIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreatorId: ProjectsConnection;
};


/** A `User` edge in the connection, with data from `Project`. */
export type PartyUsersByProjectStewardIdAndCreatorIdManyToManyEdgeProjectsByCreatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `User` values, with data from `Purchase`. */
export type PartyUsersByPurchasePartyIdAndUserIdManyToManyConnection = {
  __typename?: 'PartyUsersByPurchasePartyIdAndUserIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `Purchase`, and the cursor to aid in pagination. */
  edges: Array<PartyUsersByPurchasePartyIdAndUserIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `Purchase`. */
export type PartyUsersByPurchasePartyIdAndUserIdManyToManyEdge = {
  __typename?: 'PartyUsersByPurchasePartyIdAndUserIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByUserId: PurchasesConnection;
};


/** A `User` edge in the connection, with data from `Purchase`. */
export type PartyUsersByPurchasePartyIdAndUserIdManyToManyEdgePurchasesByUserIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};

/** A connection to a list of `Wallet` values, with data from `CreditVintage`. */
export type PartyWalletsByCreditVintageIssuerIdAndResellerIdManyToManyConnection = {
  __typename?: 'PartyWalletsByCreditVintageIssuerIdAndResellerIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `CreditVintage`, and the cursor to aid in pagination. */
  edges: Array<PartyWalletsByCreditVintageIssuerIdAndResellerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `CreditVintage`. */
export type PartyWalletsByCreditVintageIssuerIdAndResellerIdManyToManyEdge = {
  __typename?: 'PartyWalletsByCreditVintageIssuerIdAndResellerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByResellerId: CreditVintagesConnection;
};


/** A `Wallet` edge in the connection, with data from `CreditVintage`. */
export type PartyWalletsByCreditVintageIssuerIdAndResellerIdManyToManyEdgeCreditVintagesByResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};

/** A connection to a list of `Wallet` values, with data from `CreditVintage`. */
export type PartyWalletsByCreditVintageIssuerIdAndTokenizerIdManyToManyConnection = {
  __typename?: 'PartyWalletsByCreditVintageIssuerIdAndTokenizerIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `CreditVintage`, and the cursor to aid in pagination. */
  edges: Array<PartyWalletsByCreditVintageIssuerIdAndTokenizerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `CreditVintage`. */
export type PartyWalletsByCreditVintageIssuerIdAndTokenizerIdManyToManyEdge = {
  __typename?: 'PartyWalletsByCreditVintageIssuerIdAndTokenizerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByTokenizerId: CreditVintagesConnection;
};


/** A `Wallet` edge in the connection, with data from `CreditVintage`. */
export type PartyWalletsByCreditVintageIssuerIdAndTokenizerIdManyToManyEdgeCreditVintagesByTokenizerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};

/** A connection to a list of `Wallet` values, with data from `Purchase`. */
export type PartyWalletsByPurchasePartyIdAndBuyerWalletIdManyToManyConnection = {
  __typename?: 'PartyWalletsByPurchasePartyIdAndBuyerWalletIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `Purchase`, and the cursor to aid in pagination. */
  edges: Array<PartyWalletsByPurchasePartyIdAndBuyerWalletIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `Purchase`. */
export type PartyWalletsByPurchasePartyIdAndBuyerWalletIdManyToManyEdge = {
  __typename?: 'PartyWalletsByPurchasePartyIdAndBuyerWalletIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByBuyerWalletId: PurchasesConnection;
};


/** A `Wallet` edge in the connection, with data from `Purchase`. */
export type PartyWalletsByPurchasePartyIdAndBuyerWalletIdManyToManyEdgePurchasesByBuyerWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};

/** A connection to a list of `Wallet` values, with data from `Transaction`. */
export type PartyWalletsByTransactionBrokerIdAndFromWalletIdManyToManyConnection = {
  __typename?: 'PartyWalletsByTransactionBrokerIdAndFromWalletIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `Transaction`, and the cursor to aid in pagination. */
  edges: Array<PartyWalletsByTransactionBrokerIdAndFromWalletIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `Transaction`. */
export type PartyWalletsByTransactionBrokerIdAndFromWalletIdManyToManyEdge = {
  __typename?: 'PartyWalletsByTransactionBrokerIdAndFromWalletIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByFromWalletId: TransactionsConnection;
};


/** A `Wallet` edge in the connection, with data from `Transaction`. */
export type PartyWalletsByTransactionBrokerIdAndFromWalletIdManyToManyEdgeTransactionsByFromWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};

/** A connection to a list of `Wallet` values, with data from `Transaction`. */
export type PartyWalletsByTransactionBrokerIdAndToWalletIdManyToManyConnection = {
  __typename?: 'PartyWalletsByTransactionBrokerIdAndToWalletIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `Transaction`, and the cursor to aid in pagination. */
  edges: Array<PartyWalletsByTransactionBrokerIdAndToWalletIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `Transaction`. */
export type PartyWalletsByTransactionBrokerIdAndToWalletIdManyToManyEdge = {
  __typename?: 'PartyWalletsByTransactionBrokerIdAndToWalletIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByToWalletId: TransactionsConnection;
};


/** A `Wallet` edge in the connection, with data from `Transaction`. */
export type PartyWalletsByTransactionBrokerIdAndToWalletIdManyToManyEdgeTransactionsByToWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};

export type Project = Node & {
  __typename?: 'Project';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  developerId?: Maybe<Scalars['UUID']>;
  stewardId?: Maybe<Scalars['UUID']>;
  landOwnerId?: Maybe<Scalars['UUID']>;
  creditClassId?: Maybe<Scalars['UUID']>;
  applicationDate?: Maybe<Scalars['Datetime']>;
  startDate?: Maybe<Scalars['Datetime']>;
  endDate?: Maybe<Scalars['Datetime']>;
  state?: Maybe<ProjectState>;
  lastEventIndex?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['JSON']>;
  registryId?: Maybe<Scalars['UUID']>;
  /** Project GIS data, at least boundary */
  map?: Maybe<Scalars['String']>;
  addressId?: Maybe<Scalars['UUID']>;
  handle?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  creatorId?: Maybe<Scalars['UUID']>;
  originatorId?: Maybe<Scalars['UUID']>;
  issuerId?: Maybe<Scalars['UUID']>;
  resellerId?: Maybe<Scalars['UUID']>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByDeveloperId?: Maybe<Party>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByStewardId?: Maybe<Party>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByLandOwnerId?: Maybe<Party>;
  /** Reads a single `CreditClass` that is related to this `Project`. */
  creditClassByCreditClassId?: Maybe<CreditClass>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByRegistryId?: Maybe<Party>;
  /** Reads a single `Address` that is related to this `Project`. */
  addressByAddressId?: Maybe<Address>;
  /** Reads a single `User` that is related to this `Project`. */
  userByCreatorId?: Maybe<User>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByOriginatorId?: Maybe<Party>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByIssuerId?: Maybe<Party>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByResellerId?: Maybe<Party>;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByProjectId: CreditVintagesConnection;
  /** Reads and enables pagination through a set of `Mrv`. */
  mrvsByProjectId: MrvsConnection;
  /** Reads and enables pagination through a set of `Event`. */
  eventsByProjectId: EventsConnection;
  /** Reads and enables pagination through a set of `ProjectBroker`. */
  projectBrokersByProjectId: ProjectBrokersConnection;
  /** Reads and enables pagination through a set of `Document`. */
  documentsByProjectId: DocumentsConnection;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByCreditVintageProjectIdAndCreditClassId: ProjectCreditClassesByCreditVintageProjectIdAndCreditClassIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByCreditVintageProjectIdAndTokenizerId: ProjectWalletsByCreditVintageProjectIdAndTokenizerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByCreditVintageProjectIdAndIssuerId: ProjectPartiesByCreditVintageProjectIdAndIssuerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByCreditVintageProjectIdAndResellerId: ProjectWalletsByCreditVintageProjectIdAndResellerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectBrokerProjectIdAndBrokerId: ProjectPartiesByProjectBrokerProjectIdAndBrokerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectBrokerProjectIdAndAuthorizedByPartyId: ProjectPartiesByProjectBrokerProjectIdAndAuthorizedByPartyIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByProjectBrokerProjectIdAndSignerId: ProjectUsersByProjectBrokerProjectIdAndSignerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Event`. */
  eventsByDocumentProjectIdAndEventId: ProjectEventsByDocumentProjectIdAndEventIdManyToManyConnection;
};


export type ProjectCreditVintagesByProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};


export type ProjectMrvsByProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MrvsOrderBy>>;
  condition?: Maybe<MrvCondition>;
};


export type ProjectEventsByProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EventsOrderBy>>;
  condition?: Maybe<EventCondition>;
};


export type ProjectProjectBrokersByProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectBrokersOrderBy>>;
  condition?: Maybe<ProjectBrokerCondition>;
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


export type ProjectCreditClassesByCreditVintageProjectIdAndCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};


export type ProjectWalletsByCreditVintageProjectIdAndTokenizerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type ProjectPartiesByCreditVintageProjectIdAndIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type ProjectWalletsByCreditVintageProjectIdAndResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type ProjectPartiesByProjectBrokerProjectIdAndBrokerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type ProjectPartiesByProjectBrokerProjectIdAndAuthorizedByPartyIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type ProjectUsersByProjectBrokerProjectIdAndSignerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
};


export type ProjectEventsByDocumentProjectIdAndEventIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EventsOrderBy>>;
  condition?: Maybe<EventCondition>;
};

export type ProjectBroker = Node & {
  __typename?: 'ProjectBroker';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  projectId: Scalars['UUID'];
  brokerId: Scalars['UUID'];
  authorizedByPartyId: Scalars['UUID'];
  signerId: Scalars['UUID'];
  /** Reads a single `Project` that is related to this `ProjectBroker`. */
  projectByProjectId?: Maybe<Project>;
  /** Reads a single `Party` that is related to this `ProjectBroker`. */
  partyByBrokerId?: Maybe<Party>;
  /** Reads a single `Party` that is related to this `ProjectBroker`. */
  partyByAuthorizedByPartyId?: Maybe<Party>;
  /** Reads a single `User` that is related to this `ProjectBroker`. */
  userBySignerId?: Maybe<User>;
};

/**
 * A condition to be used against `ProjectBroker` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ProjectBrokerCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `brokerId` field. */
  brokerId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `authorizedByPartyId` field. */
  authorizedByPartyId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `signerId` field. */
  signerId?: Maybe<Scalars['UUID']>;
};

/** An input for mutations affecting `ProjectBroker` */
export type ProjectBrokerInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  projectId: Scalars['UUID'];
  brokerId: Scalars['UUID'];
  authorizedByPartyId: Scalars['UUID'];
  signerId: Scalars['UUID'];
};

/** Represents an update to a `ProjectBroker`. Fields that are set will be updated. */
export type ProjectBrokerPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  projectId?: Maybe<Scalars['UUID']>;
  brokerId?: Maybe<Scalars['UUID']>;
  authorizedByPartyId?: Maybe<Scalars['UUID']>;
  signerId?: Maybe<Scalars['UUID']>;
};

/** A connection to a list of `ProjectBroker` values. */
export type ProjectBrokersConnection = {
  __typename?: 'ProjectBrokersConnection';
  /** A list of `ProjectBroker` objects. */
  nodes: Array<Maybe<ProjectBroker>>;
  /** A list of edges which contains the `ProjectBroker` and cursor to aid in pagination. */
  edges: Array<ProjectBrokersEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ProjectBroker` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `ProjectBroker` edge in the connection. */
export type ProjectBrokersEdge = {
  __typename?: 'ProjectBrokersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ProjectBroker` at the end of the edge. */
  node?: Maybe<ProjectBroker>;
};

/** Methods to use when ordering `ProjectBroker`. */
export enum ProjectBrokersOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  BrokerIdAsc = 'BROKER_ID_ASC',
  BrokerIdDesc = 'BROKER_ID_DESC',
  AuthorizedByPartyIdAsc = 'AUTHORIZED_BY_PARTY_ID_ASC',
  AuthorizedByPartyIdDesc = 'AUTHORIZED_BY_PARTY_ID_DESC',
  SignerIdAsc = 'SIGNER_ID_ASC',
  SignerIdDesc = 'SIGNER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

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
  /** Checks for equality with the object’s `stewardId` field. */
  stewardId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `landOwnerId` field. */
  landOwnerId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `creditClassId` field. */
  creditClassId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `applicationDate` field. */
  applicationDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `startDate` field. */
  startDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `endDate` field. */
  endDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `state` field. */
  state?: Maybe<ProjectState>;
  /** Checks for equality with the object’s `lastEventIndex` field. */
  lastEventIndex?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `metadata` field. */
  metadata?: Maybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `registryId` field. */
  registryId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `map` field. */
  map?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `addressId` field. */
  addressId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `handle` field. */
  handle?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `type` field. */
  type?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `creatorId` field. */
  creatorId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `originatorId` field. */
  originatorId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `issuerId` field. */
  issuerId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `resellerId` field. */
  resellerId?: Maybe<Scalars['UUID']>;
};

/** A connection to a list of `CreditClass` values, with data from `CreditVintage`. */
export type ProjectCreditClassesByCreditVintageProjectIdAndCreditClassIdManyToManyConnection = {
  __typename?: 'ProjectCreditClassesByCreditVintageProjectIdAndCreditClassIdManyToManyConnection';
  /** A list of `CreditClass` objects. */
  nodes: Array<Maybe<CreditClass>>;
  /** A list of edges which contains the `CreditClass`, info from the `CreditVintage`, and the cursor to aid in pagination. */
  edges: Array<ProjectCreditClassesByCreditVintageProjectIdAndCreditClassIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditClass` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditClass` edge in the connection, with data from `CreditVintage`. */
export type ProjectCreditClassesByCreditVintageProjectIdAndCreditClassIdManyToManyEdge = {
  __typename?: 'ProjectCreditClassesByCreditVintageProjectIdAndCreditClassIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditClass` at the end of the edge. */
  node?: Maybe<CreditClass>;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByCreditClassId: CreditVintagesConnection;
};


/** A `CreditClass` edge in the connection, with data from `CreditVintage`. */
export type ProjectCreditClassesByCreditVintageProjectIdAndCreditClassIdManyToManyEdgeCreditVintagesByCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};

/** A connection to a list of `Event` values, with data from `Document`. */
export type ProjectEventsByDocumentProjectIdAndEventIdManyToManyConnection = {
  __typename?: 'ProjectEventsByDocumentProjectIdAndEventIdManyToManyConnection';
  /** A list of `Event` objects. */
  nodes: Array<Maybe<Event>>;
  /** A list of edges which contains the `Event`, info from the `Document`, and the cursor to aid in pagination. */
  edges: Array<ProjectEventsByDocumentProjectIdAndEventIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Event` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Event` edge in the connection, with data from `Document`. */
export type ProjectEventsByDocumentProjectIdAndEventIdManyToManyEdge = {
  __typename?: 'ProjectEventsByDocumentProjectIdAndEventIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Event` at the end of the edge. */
  node?: Maybe<Event>;
  /** Reads and enables pagination through a set of `Document`. */
  documentsByEventId: DocumentsConnection;
};


/** A `Event` edge in the connection, with data from `Document`. */
export type ProjectEventsByDocumentProjectIdAndEventIdManyToManyEdgeDocumentsByEventIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<DocumentsOrderBy>>;
  condition?: Maybe<DocumentCondition>;
};

/** An input for mutations affecting `Project` */
export type ProjectInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  developerId?: Maybe<Scalars['UUID']>;
  stewardId?: Maybe<Scalars['UUID']>;
  landOwnerId?: Maybe<Scalars['UUID']>;
  creditClassId?: Maybe<Scalars['UUID']>;
  applicationDate?: Maybe<Scalars['Datetime']>;
  startDate?: Maybe<Scalars['Datetime']>;
  endDate?: Maybe<Scalars['Datetime']>;
  state?: Maybe<ProjectState>;
  lastEventIndex?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['JSON']>;
  registryId?: Maybe<Scalars['UUID']>;
  /** Project GIS data, at least boundary */
  map?: Maybe<Scalars['String']>;
  addressId?: Maybe<Scalars['UUID']>;
  handle?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  creatorId?: Maybe<Scalars['UUID']>;
  originatorId?: Maybe<Scalars['UUID']>;
  issuerId?: Maybe<Scalars['UUID']>;
  resellerId?: Maybe<Scalars['UUID']>;
};

/** A connection to a list of `Party` values, with data from `CreditVintage`. */
export type ProjectPartiesByCreditVintageProjectIdAndIssuerIdManyToManyConnection = {
  __typename?: 'ProjectPartiesByCreditVintageProjectIdAndIssuerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `CreditVintage`, and the cursor to aid in pagination. */
  edges: Array<ProjectPartiesByCreditVintageProjectIdAndIssuerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `CreditVintage`. */
export type ProjectPartiesByCreditVintageProjectIdAndIssuerIdManyToManyEdge = {
  __typename?: 'ProjectPartiesByCreditVintageProjectIdAndIssuerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByIssuerId: CreditVintagesConnection;
};


/** A `Party` edge in the connection, with data from `CreditVintage`. */
export type ProjectPartiesByCreditVintageProjectIdAndIssuerIdManyToManyEdgeCreditVintagesByIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};

/** A connection to a list of `Party` values, with data from `ProjectBroker`. */
export type ProjectPartiesByProjectBrokerProjectIdAndAuthorizedByPartyIdManyToManyConnection = {
  __typename?: 'ProjectPartiesByProjectBrokerProjectIdAndAuthorizedByPartyIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `ProjectBroker`, and the cursor to aid in pagination. */
  edges: Array<ProjectPartiesByProjectBrokerProjectIdAndAuthorizedByPartyIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `ProjectBroker`. */
export type ProjectPartiesByProjectBrokerProjectIdAndAuthorizedByPartyIdManyToManyEdge = {
  __typename?: 'ProjectPartiesByProjectBrokerProjectIdAndAuthorizedByPartyIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `ProjectBroker`. */
  projectBrokersByAuthorizedByPartyId: ProjectBrokersConnection;
};


/** A `Party` edge in the connection, with data from `ProjectBroker`. */
export type ProjectPartiesByProjectBrokerProjectIdAndAuthorizedByPartyIdManyToManyEdgeProjectBrokersByAuthorizedByPartyIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectBrokersOrderBy>>;
  condition?: Maybe<ProjectBrokerCondition>;
};

/** A connection to a list of `Party` values, with data from `ProjectBroker`. */
export type ProjectPartiesByProjectBrokerProjectIdAndBrokerIdManyToManyConnection = {
  __typename?: 'ProjectPartiesByProjectBrokerProjectIdAndBrokerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `ProjectBroker`, and the cursor to aid in pagination. */
  edges: Array<ProjectPartiesByProjectBrokerProjectIdAndBrokerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `ProjectBroker`. */
export type ProjectPartiesByProjectBrokerProjectIdAndBrokerIdManyToManyEdge = {
  __typename?: 'ProjectPartiesByProjectBrokerProjectIdAndBrokerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `ProjectBroker`. */
  projectBrokersByBrokerId: ProjectBrokersConnection;
};


/** A `Party` edge in the connection, with data from `ProjectBroker`. */
export type ProjectPartiesByProjectBrokerProjectIdAndBrokerIdManyToManyEdgeProjectBrokersByBrokerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectBrokersOrderBy>>;
  condition?: Maybe<ProjectBrokerCondition>;
};

/** Represents an update to a `Project`. Fields that are set will be updated. */
export type ProjectPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  developerId?: Maybe<Scalars['UUID']>;
  stewardId?: Maybe<Scalars['UUID']>;
  landOwnerId?: Maybe<Scalars['UUID']>;
  creditClassId?: Maybe<Scalars['UUID']>;
  applicationDate?: Maybe<Scalars['Datetime']>;
  startDate?: Maybe<Scalars['Datetime']>;
  endDate?: Maybe<Scalars['Datetime']>;
  state?: Maybe<ProjectState>;
  lastEventIndex?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['JSON']>;
  registryId?: Maybe<Scalars['UUID']>;
  /** Project GIS data, at least boundary */
  map?: Maybe<Scalars['String']>;
  addressId?: Maybe<Scalars['UUID']>;
  handle?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  creatorId?: Maybe<Scalars['UUID']>;
  originatorId?: Maybe<Scalars['UUID']>;
  issuerId?: Maybe<Scalars['UUID']>;
  resellerId?: Maybe<Scalars['UUID']>;
};

export enum ProjectState {
  Proposed = 'PROPOSED',
  PendingApproval = 'PENDING_APPROVAL',
  Active = 'ACTIVE',
  Hold = 'HOLD',
  Ended = 'ENDED'
}

/** A connection to a list of `User` values, with data from `ProjectBroker`. */
export type ProjectUsersByProjectBrokerProjectIdAndSignerIdManyToManyConnection = {
  __typename?: 'ProjectUsersByProjectBrokerProjectIdAndSignerIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `ProjectBroker`, and the cursor to aid in pagination. */
  edges: Array<ProjectUsersByProjectBrokerProjectIdAndSignerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `ProjectBroker`. */
export type ProjectUsersByProjectBrokerProjectIdAndSignerIdManyToManyEdge = {
  __typename?: 'ProjectUsersByProjectBrokerProjectIdAndSignerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `ProjectBroker`. */
  projectBrokersBySignerId: ProjectBrokersConnection;
};


/** A `User` edge in the connection, with data from `ProjectBroker`. */
export type ProjectUsersByProjectBrokerProjectIdAndSignerIdManyToManyEdgeProjectBrokersBySignerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectBrokersOrderBy>>;
  condition?: Maybe<ProjectBrokerCondition>;
};

/** A connection to a list of `Wallet` values, with data from `CreditVintage`. */
export type ProjectWalletsByCreditVintageProjectIdAndResellerIdManyToManyConnection = {
  __typename?: 'ProjectWalletsByCreditVintageProjectIdAndResellerIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `CreditVintage`, and the cursor to aid in pagination. */
  edges: Array<ProjectWalletsByCreditVintageProjectIdAndResellerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `CreditVintage`. */
export type ProjectWalletsByCreditVintageProjectIdAndResellerIdManyToManyEdge = {
  __typename?: 'ProjectWalletsByCreditVintageProjectIdAndResellerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByResellerId: CreditVintagesConnection;
};


/** A `Wallet` edge in the connection, with data from `CreditVintage`. */
export type ProjectWalletsByCreditVintageProjectIdAndResellerIdManyToManyEdgeCreditVintagesByResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};

/** A connection to a list of `Wallet` values, with data from `CreditVintage`. */
export type ProjectWalletsByCreditVintageProjectIdAndTokenizerIdManyToManyConnection = {
  __typename?: 'ProjectWalletsByCreditVintageProjectIdAndTokenizerIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `CreditVintage`, and the cursor to aid in pagination. */
  edges: Array<ProjectWalletsByCreditVintageProjectIdAndTokenizerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `CreditVintage`. */
export type ProjectWalletsByCreditVintageProjectIdAndTokenizerIdManyToManyEdge = {
  __typename?: 'ProjectWalletsByCreditVintageProjectIdAndTokenizerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByTokenizerId: CreditVintagesConnection;
};


/** A `Wallet` edge in the connection, with data from `CreditVintage`. */
export type ProjectWalletsByCreditVintageProjectIdAndTokenizerIdManyToManyEdgeCreditVintagesByTokenizerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
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
  StewardIdAsc = 'STEWARD_ID_ASC',
  StewardIdDesc = 'STEWARD_ID_DESC',
  LandOwnerIdAsc = 'LAND_OWNER_ID_ASC',
  LandOwnerIdDesc = 'LAND_OWNER_ID_DESC',
  CreditClassIdAsc = 'CREDIT_CLASS_ID_ASC',
  CreditClassIdDesc = 'CREDIT_CLASS_ID_DESC',
  ApplicationDateAsc = 'APPLICATION_DATE_ASC',
  ApplicationDateDesc = 'APPLICATION_DATE_DESC',
  StartDateAsc = 'START_DATE_ASC',
  StartDateDesc = 'START_DATE_DESC',
  EndDateAsc = 'END_DATE_ASC',
  EndDateDesc = 'END_DATE_DESC',
  StateAsc = 'STATE_ASC',
  StateDesc = 'STATE_DESC',
  LastEventIndexAsc = 'LAST_EVENT_INDEX_ASC',
  LastEventIndexDesc = 'LAST_EVENT_INDEX_DESC',
  MetadataAsc = 'METADATA_ASC',
  MetadataDesc = 'METADATA_DESC',
  RegistryIdAsc = 'REGISTRY_ID_ASC',
  RegistryIdDesc = 'REGISTRY_ID_DESC',
  MapAsc = 'MAP_ASC',
  MapDesc = 'MAP_DESC',
  AddressIdAsc = 'ADDRESS_ID_ASC',
  AddressIdDesc = 'ADDRESS_ID_DESC',
  HandleAsc = 'HANDLE_ASC',
  HandleDesc = 'HANDLE_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  CreatorIdAsc = 'CREATOR_ID_ASC',
  CreatorIdDesc = 'CREATOR_ID_DESC',
  OriginatorIdAsc = 'ORIGINATOR_ID_ASC',
  OriginatorIdDesc = 'ORIGINATOR_ID_DESC',
  IssuerIdAsc = 'ISSUER_ID_ASC',
  IssuerIdDesc = 'ISSUER_ID_DESC',
  ResellerIdAsc = 'RESELLER_ID_ASC',
  ResellerIdDesc = 'RESELLER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Purchase = Node & {
  __typename?: 'Purchase';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  stripeId?: Maybe<Scalars['String']>;
  type: PurchaseType;
  buyerWalletId: Scalars['UUID'];
  addressId?: Maybe<Scalars['UUID']>;
  creditVintageId: Scalars['UUID'];
  /** id of the party that did the transfer */
  partyId?: Maybe<Scalars['UUID']>;
  /** id of the user that did the transfer on behalf of the party */
  userId?: Maybe<Scalars['UUID']>;
  /** Reads a single `Wallet` that is related to this `Purchase`. */
  walletByBuyerWalletId?: Maybe<Wallet>;
  /** Reads a single `Address` that is related to this `Purchase`. */
  addressByAddressId?: Maybe<Address>;
  /** Reads a single `CreditVintage` that is related to this `Purchase`. */
  creditVintageByCreditVintageId?: Maybe<CreditVintage>;
  /** Reads a single `Party` that is related to this `Purchase`. */
  partyByPartyId?: Maybe<Party>;
  /** Reads a single `User` that is related to this `Purchase`. */
  userByUserId?: Maybe<User>;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByPurchaseId: TransactionsConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByTransactionPurchaseIdAndBrokerId: PurchasePartiesByTransactionPurchaseIdAndBrokerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByTransactionPurchaseIdAndFromWalletId: PurchaseWalletsByTransactionPurchaseIdAndFromWalletIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByTransactionPurchaseIdAndToWalletId: PurchaseWalletsByTransactionPurchaseIdAndToWalletIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByTransactionPurchaseIdAndCreditVintageId: PurchaseCreditVintagesByTransactionPurchaseIdAndCreditVintageIdManyToManyConnection;
};


export type PurchaseTransactionsByPurchaseIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};


export type PurchasePartiesByTransactionPurchaseIdAndBrokerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type PurchaseWalletsByTransactionPurchaseIdAndFromWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type PurchaseWalletsByTransactionPurchaseIdAndToWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type PurchaseCreditVintagesByTransactionPurchaseIdAndCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};

/**
 * A condition to be used against `Purchase` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type PurchaseCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `stripeId` field. */
  stripeId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `type` field. */
  type?: Maybe<PurchaseType>;
  /** Checks for equality with the object’s `buyerWalletId` field. */
  buyerWalletId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `addressId` field. */
  addressId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `creditVintageId` field. */
  creditVintageId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `partyId` field. */
  partyId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['UUID']>;
};

/** A connection to a list of `CreditVintage` values, with data from `Transaction`. */
export type PurchaseCreditVintagesByTransactionPurchaseIdAndCreditVintageIdManyToManyConnection = {
  __typename?: 'PurchaseCreditVintagesByTransactionPurchaseIdAndCreditVintageIdManyToManyConnection';
  /** A list of `CreditVintage` objects. */
  nodes: Array<Maybe<CreditVintage>>;
  /** A list of edges which contains the `CreditVintage`, info from the `Transaction`, and the cursor to aid in pagination. */
  edges: Array<PurchaseCreditVintagesByTransactionPurchaseIdAndCreditVintageIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditVintage` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditVintage` edge in the connection, with data from `Transaction`. */
export type PurchaseCreditVintagesByTransactionPurchaseIdAndCreditVintageIdManyToManyEdge = {
  __typename?: 'PurchaseCreditVintagesByTransactionPurchaseIdAndCreditVintageIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditVintage` at the end of the edge. */
  node?: Maybe<CreditVintage>;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByCreditVintageId: TransactionsConnection;
};


/** A `CreditVintage` edge in the connection, with data from `Transaction`. */
export type PurchaseCreditVintagesByTransactionPurchaseIdAndCreditVintageIdManyToManyEdgeTransactionsByCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};

/** An input for mutations affecting `Purchase` */
export type PurchaseInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  stripeId?: Maybe<Scalars['String']>;
  type?: Maybe<PurchaseType>;
  buyerWalletId: Scalars['UUID'];
  addressId?: Maybe<Scalars['UUID']>;
  creditVintageId: Scalars['UUID'];
  /** id of the party that did the transfer */
  partyId?: Maybe<Scalars['UUID']>;
  /** id of the user that did the transfer on behalf of the party */
  userId?: Maybe<Scalars['UUID']>;
};

/** A connection to a list of `Party` values, with data from `Transaction`. */
export type PurchasePartiesByTransactionPurchaseIdAndBrokerIdManyToManyConnection = {
  __typename?: 'PurchasePartiesByTransactionPurchaseIdAndBrokerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Transaction`, and the cursor to aid in pagination. */
  edges: Array<PurchasePartiesByTransactionPurchaseIdAndBrokerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Transaction`. */
export type PurchasePartiesByTransactionPurchaseIdAndBrokerIdManyToManyEdge = {
  __typename?: 'PurchasePartiesByTransactionPurchaseIdAndBrokerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByBrokerId: TransactionsConnection;
};


/** A `Party` edge in the connection, with data from `Transaction`. */
export type PurchasePartiesByTransactionPurchaseIdAndBrokerIdManyToManyEdgeTransactionsByBrokerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};

/** Represents an update to a `Purchase`. Fields that are set will be updated. */
export type PurchasePatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  stripeId?: Maybe<Scalars['String']>;
  type?: Maybe<PurchaseType>;
  buyerWalletId?: Maybe<Scalars['UUID']>;
  addressId?: Maybe<Scalars['UUID']>;
  creditVintageId?: Maybe<Scalars['UUID']>;
  /** id of the party that did the transfer */
  partyId?: Maybe<Scalars['UUID']>;
  /** id of the user that did the transfer on behalf of the party */
  userId?: Maybe<Scalars['UUID']>;
};

export enum PurchaseType {
  StripeInvoice = 'STRIPE_INVOICE',
  StripeCheckout = 'STRIPE_CHECKOUT',
  Offline = 'OFFLINE'
}

/** A connection to a list of `Wallet` values, with data from `Transaction`. */
export type PurchaseWalletsByTransactionPurchaseIdAndFromWalletIdManyToManyConnection = {
  __typename?: 'PurchaseWalletsByTransactionPurchaseIdAndFromWalletIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `Transaction`, and the cursor to aid in pagination. */
  edges: Array<PurchaseWalletsByTransactionPurchaseIdAndFromWalletIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `Transaction`. */
export type PurchaseWalletsByTransactionPurchaseIdAndFromWalletIdManyToManyEdge = {
  __typename?: 'PurchaseWalletsByTransactionPurchaseIdAndFromWalletIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByFromWalletId: TransactionsConnection;
};


/** A `Wallet` edge in the connection, with data from `Transaction`. */
export type PurchaseWalletsByTransactionPurchaseIdAndFromWalletIdManyToManyEdgeTransactionsByFromWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};

/** A connection to a list of `Wallet` values, with data from `Transaction`. */
export type PurchaseWalletsByTransactionPurchaseIdAndToWalletIdManyToManyConnection = {
  __typename?: 'PurchaseWalletsByTransactionPurchaseIdAndToWalletIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `Transaction`, and the cursor to aid in pagination. */
  edges: Array<PurchaseWalletsByTransactionPurchaseIdAndToWalletIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `Transaction`. */
export type PurchaseWalletsByTransactionPurchaseIdAndToWalletIdManyToManyEdge = {
  __typename?: 'PurchaseWalletsByTransactionPurchaseIdAndToWalletIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByToWalletId: TransactionsConnection;
};


/** A `Wallet` edge in the connection, with data from `Transaction`. */
export type PurchaseWalletsByTransactionPurchaseIdAndToWalletIdManyToManyEdgeTransactionsByToWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};

/** A connection to a list of `Purchase` values. */
export type PurchasesConnection = {
  __typename?: 'PurchasesConnection';
  /** A list of `Purchase` objects. */
  nodes: Array<Maybe<Purchase>>;
  /** A list of edges which contains the `Purchase` and cursor to aid in pagination. */
  edges: Array<PurchasesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Purchase` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Purchase` edge in the connection. */
export type PurchasesEdge = {
  __typename?: 'PurchasesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Purchase` at the end of the edge. */
  node?: Maybe<Purchase>;
};

/** Methods to use when ordering `Purchase`. */
export enum PurchasesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  StripeIdAsc = 'STRIPE_ID_ASC',
  StripeIdDesc = 'STRIPE_ID_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  BuyerWalletIdAsc = 'BUYER_WALLET_ID_ASC',
  BuyerWalletIdDesc = 'BUYER_WALLET_ID_DESC',
  AddressIdAsc = 'ADDRESS_ID_ASC',
  AddressIdDesc = 'ADDRESS_ID_DESC',
  CreditVintageIdAsc = 'CREDIT_VINTAGE_ID_ASC',
  CreditVintageIdDesc = 'CREDIT_VINTAGE_ID_DESC',
  PartyIdAsc = 'PARTY_ID_ASC',
  PartyIdDesc = 'PARTY_ID_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
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
  /** Reads and enables pagination through a set of `AccountBalance`. */
  allAccountBalances?: Maybe<AccountBalancesConnection>;
  /** Reads and enables pagination through a set of `Address`. */
  allAddresses?: Maybe<AddressesConnection>;
  /** Reads and enables pagination through a set of `Admin`. */
  allAdmins?: Maybe<AdminsConnection>;
  /** Reads and enables pagination through a set of `CreditClass`. */
  allCreditClasses?: Maybe<CreditClassesConnection>;
  /** Reads and enables pagination through a set of `CreditClassIssuer`. */
  allCreditClassIssuers?: Maybe<CreditClassIssuersConnection>;
  /** Reads and enables pagination through a set of `CreditClassVersion`. */
  allCreditClassVersions?: Maybe<CreditClassVersionsConnection>;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  allCreditVintages?: Maybe<CreditVintagesConnection>;
  /** Reads and enables pagination through a set of `Document`. */
  allDocuments?: Maybe<DocumentsConnection>;
  /** Reads and enables pagination through a set of `Event`. */
  allEvents?: Maybe<EventsConnection>;
  /** Reads and enables pagination through a set of `FlywaySchemaHistory`. */
  allFlywaySchemaHistories?: Maybe<FlywaySchemaHistoriesConnection>;
  /** Reads and enables pagination through a set of `Methodology`. */
  allMethodologies?: Maybe<MethodologiesConnection>;
  /** Reads and enables pagination through a set of `MethodologyVersion`. */
  allMethodologyVersions?: Maybe<MethodologyVersionsConnection>;
  /** Reads and enables pagination through a set of `Mrv`. */
  allMrvs?: Maybe<MrvsConnection>;
  /** Reads and enables pagination through a set of `Organization`. */
  allOrganizations?: Maybe<OrganizationsConnection>;
  /** Reads and enables pagination through a set of `OrganizationMember`. */
  allOrganizationMembers?: Maybe<OrganizationMembersConnection>;
  /** Reads and enables pagination through a set of `Party`. */
  allParties?: Maybe<PartiesConnection>;
  /** Reads and enables pagination through a set of `Project`. */
  allProjects?: Maybe<ProjectsConnection>;
  /** Reads and enables pagination through a set of `ProjectBroker`. */
  allProjectBrokers?: Maybe<ProjectBrokersConnection>;
  /** Reads and enables pagination through a set of `Purchase`. */
  allPurchases?: Maybe<PurchasesConnection>;
  /** Reads and enables pagination through a set of `Retirement`. */
  allRetirements?: Maybe<RetirementsConnection>;
  /** Reads and enables pagination through a set of `ShaclGraph`. */
  allShaclGraphs?: Maybe<ShaclGraphsConnection>;
  /** Reads and enables pagination through a set of `Transaction`. */
  allTransactions?: Maybe<TransactionsConnection>;
  /** Reads and enables pagination through a set of `User`. */
  allUsers?: Maybe<UsersConnection>;
  /** Reads and enables pagination through a set of `Wallet`. */
  allWallets?: Maybe<WalletsConnection>;
  accountBalanceById?: Maybe<AccountBalance>;
  accountBalanceByCreditVintageIdAndWalletId?: Maybe<AccountBalance>;
  addressById?: Maybe<Address>;
  adminById?: Maybe<Admin>;
  adminByAuth0Sub?: Maybe<Admin>;
  creditClassById?: Maybe<CreditClass>;
  creditClassVersionByIdAndCreatedAt?: Maybe<CreditClassVersion>;
  creditVintageById?: Maybe<CreditVintage>;
  creditVintageByEventId?: Maybe<CreditVintage>;
  documentById?: Maybe<Document>;
  eventById?: Maybe<Event>;
  flywaySchemaHistoryByInstalledRank?: Maybe<FlywaySchemaHistory>;
  methodologyById?: Maybe<Methodology>;
  methodologyVersionByIdAndCreatedAt?: Maybe<MethodologyVersion>;
  mrvById?: Maybe<Mrv>;
  organizationById?: Maybe<Organization>;
  organizationByPartyId?: Maybe<Organization>;
  organizationByPartyIdAndType?: Maybe<Organization>;
  organizationMemberByMemberIdAndOrganizationId?: Maybe<OrganizationMember>;
  partyById?: Maybe<Party>;
  projectById?: Maybe<Project>;
  projectByHandle?: Maybe<Project>;
  projectBrokerById?: Maybe<ProjectBroker>;
  purchaseById?: Maybe<Purchase>;
  retirementById?: Maybe<Retirement>;
  shaclGraphByUri?: Maybe<ShaclGraph>;
  transactionById?: Maybe<Transaction>;
  userById?: Maybe<User>;
  userByEmail?: Maybe<User>;
  userByPartyId?: Maybe<User>;
  userByPartyIdAndType?: Maybe<User>;
  userByAuth0Sub?: Maybe<User>;
  walletById?: Maybe<Wallet>;
  getAvailableCredits?: Maybe<Scalars['BigFloat']>;
  getCurrentUser?: Maybe<Scalars['String']>;
  getCurrentUserId?: Maybe<Scalars['UUID']>;
  /** Reads a single `AccountBalance` using its globally unique `ID`. */
  accountBalance?: Maybe<AccountBalance>;
  /** Reads a single `Address` using its globally unique `ID`. */
  address?: Maybe<Address>;
  /** Reads a single `Admin` using its globally unique `ID`. */
  admin?: Maybe<Admin>;
  /** Reads a single `CreditClass` using its globally unique `ID`. */
  creditClass?: Maybe<CreditClass>;
  /** Reads a single `CreditClassVersion` using its globally unique `ID`. */
  creditClassVersion?: Maybe<CreditClassVersion>;
  /** Reads a single `CreditVintage` using its globally unique `ID`. */
  creditVintage?: Maybe<CreditVintage>;
  /** Reads a single `Document` using its globally unique `ID`. */
  document?: Maybe<Document>;
  /** Reads a single `Event` using its globally unique `ID`. */
  event?: Maybe<Event>;
  /** Reads a single `FlywaySchemaHistory` using its globally unique `ID`. */
  flywaySchemaHistory?: Maybe<FlywaySchemaHistory>;
  /** Reads a single `Methodology` using its globally unique `ID`. */
  methodology?: Maybe<Methodology>;
  /** Reads a single `MethodologyVersion` using its globally unique `ID`. */
  methodologyVersion?: Maybe<MethodologyVersion>;
  /** Reads a single `Mrv` using its globally unique `ID`. */
  mrv?: Maybe<Mrv>;
  /** Reads a single `Organization` using its globally unique `ID`. */
  organization?: Maybe<Organization>;
  /** Reads a single `OrganizationMember` using its globally unique `ID`. */
  organizationMember?: Maybe<OrganizationMember>;
  /** Reads a single `Party` using its globally unique `ID`. */
  party?: Maybe<Party>;
  /** Reads a single `Project` using its globally unique `ID`. */
  project?: Maybe<Project>;
  /** Reads a single `ProjectBroker` using its globally unique `ID`. */
  projectBroker?: Maybe<ProjectBroker>;
  /** Reads a single `Purchase` using its globally unique `ID`. */
  purchase?: Maybe<Purchase>;
  /** Reads a single `Retirement` using its globally unique `ID`. */
  retirement?: Maybe<Retirement>;
  /** Reads a single `ShaclGraph` using its globally unique `ID`. */
  shaclGraph?: Maybe<ShaclGraph>;
  /** Reads a single `Transaction` using its globally unique `ID`. */
  transaction?: Maybe<Transaction>;
  /** Reads a single `User` using its globally unique `ID`. */
  user?: Maybe<User>;
  /** Reads a single `Wallet` using its globally unique `ID`. */
  wallet?: Maybe<Wallet>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAllAccountBalancesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountBalancesOrderBy>>;
  condition?: Maybe<AccountBalanceCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllAddressesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AddressesOrderBy>>;
  condition?: Maybe<AddressCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllAdminsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AdminsOrderBy>>;
  condition?: Maybe<AdminCondition>;
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
export type QueryAllCreditClassIssuersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassIssuersOrderBy>>;
  condition?: Maybe<CreditClassIssuerCondition>;
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
};


/** The root query type which gives access points into the data universe. */
export type QueryAllCreditVintagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
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
export type QueryAllEventsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EventsOrderBy>>;
  condition?: Maybe<EventCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllFlywaySchemaHistoriesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<FlywaySchemaHistoriesOrderBy>>;
  condition?: Maybe<FlywaySchemaHistoryCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllMethodologiesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MethodologiesOrderBy>>;
  condition?: Maybe<MethodologyCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllMethodologyVersionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MethodologyVersionsOrderBy>>;
  condition?: Maybe<MethodologyVersionCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllMrvsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MrvsOrderBy>>;
  condition?: Maybe<MrvCondition>;
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
export type QueryAllOrganizationMembersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<OrganizationMembersOrderBy>>;
  condition?: Maybe<OrganizationMemberCondition>;
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
};


/** The root query type which gives access points into the data universe. */
export type QueryAllProjectBrokersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectBrokersOrderBy>>;
  condition?: Maybe<ProjectBrokerCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllPurchasesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllRetirementsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<RetirementsOrderBy>>;
  condition?: Maybe<RetirementCondition>;
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
};


/** The root query type which gives access points into the data universe. */
export type QueryAllTransactionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
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
export type QueryAccountBalanceByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountBalanceByCreditVintageIdAndWalletIdArgs = {
  creditVintageId: Scalars['UUID'];
  walletId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAddressByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAdminByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAdminByAuth0SubArgs = {
  auth0Sub: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCreditClassByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCreditClassVersionByIdAndCreatedAtArgs = {
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCreditVintageByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCreditVintageByEventIdArgs = {
  eventId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDocumentByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEventByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFlywaySchemaHistoryByInstalledRankArgs = {
  installedRank: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMethodologyByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMethodologyVersionByIdAndCreatedAtArgs = {
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMrvByIdArgs = {
  id: Scalars['UUID'];
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
export type QueryOrganizationByPartyIdAndTypeArgs = {
  partyId: Scalars['UUID'];
  type: PartyType;
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationMemberByMemberIdAndOrganizationIdArgs = {
  memberId: Scalars['UUID'];
  organizationId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPartyByIdArgs = {
  id: Scalars['UUID'];
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
export type QueryProjectBrokerByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPurchaseByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRetirementByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryShaclGraphByUriArgs = {
  uri: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTransactionByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByPartyIdArgs = {
  partyId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByPartyIdAndTypeArgs = {
  partyId: Scalars['UUID'];
  type: PartyType;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByAuth0SubArgs = {
  auth0Sub: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWalletByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGetAvailableCreditsArgs = {
  vintageId?: Maybe<Scalars['UUID']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountBalanceArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAddressArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAdminArgs = {
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
export type QueryCreditVintageArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDocumentArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEventArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFlywaySchemaHistoryArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMethodologyArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMethodologyVersionArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMrvArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationMemberArgs = {
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
export type QueryProjectBrokerArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPurchaseArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRetirementArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryShaclGraphArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTransactionArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWalletArgs = {
  nodeId: Scalars['ID'];
};

/** All input for the `reallyCreateOrganizationIfNeeded` mutation. */
export type ReallyCreateOrganizationIfNeededInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  legalName?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  walletAddr?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['UUID']>;
  image?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
  orgAddress?: Maybe<Scalars['JSON']>;
};

/** The output of our `reallyCreateOrganizationIfNeeded` mutation. */
export type ReallyCreateOrganizationIfNeededPayload = {
  __typename?: 'ReallyCreateOrganizationIfNeededPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `Organization`. */
  partyByPartyId?: Maybe<Party>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
};


/** The output of our `reallyCreateOrganizationIfNeeded` mutation. */
export type ReallyCreateOrganizationIfNeededPayloadOrganizationEdgeArgs = {
  orderBy?: Maybe<Array<OrganizationsOrderBy>>;
};

/** All input for the `reallyCreateOrganization` mutation. */
export type ReallyCreateOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  legalName?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  walletAddr?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['UUID']>;
  image?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
  orgAddress?: Maybe<Scalars['JSON']>;
};

/** The output of our `reallyCreateOrganization` mutation. */
export type ReallyCreateOrganizationPayload = {
  __typename?: 'ReallyCreateOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `Organization`. */
  partyByPartyId?: Maybe<Party>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
};


/** The output of our `reallyCreateOrganization` mutation. */
export type ReallyCreateOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: Maybe<Array<OrganizationsOrderBy>>;
};

/** All input for the `reallyCreateUserIfNeeded` mutation. */
export type ReallyCreateUserIfNeededInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  userEmail?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  auth0Sub?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
  address?: Maybe<Scalars['JSON']>;
  walletAddr?: Maybe<Scalars['String']>;
  updates?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

/** The output of our `reallyCreateUserIfNeeded` mutation. */
export type ReallyCreateUserIfNeededPayload = {
  __typename?: 'ReallyCreateUserIfNeededPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `User`. */
  partyByPartyId?: Maybe<Party>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our `reallyCreateUserIfNeeded` mutation. */
export type ReallyCreateUserIfNeededPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** All input for the `reallyCreateUser` mutation. */
export type ReallyCreateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  auth0Sub?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
  address?: Maybe<Scalars['JSON']>;
  walletAddr?: Maybe<Scalars['String']>;
  updates?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

/** The output of our `reallyCreateUser` mutation. */
export type ReallyCreateUserPayload = {
  __typename?: 'ReallyCreateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `User`. */
  partyByPartyId?: Maybe<Party>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our `reallyCreateUser` mutation. */
export type ReallyCreateUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** All input for the `retireCredits` mutation. */
export type RetireCreditsInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  vintageId: Scalars['UUID'];
  buyerWalletId: Scalars['UUID'];
  addressId: Scalars['UUID'];
  units: Scalars['BigFloat'];
  metadata?: Maybe<Scalars['JSON']>;
};

/** The output of our `retireCredits` mutation. */
export type RetireCreditsPayload = {
  __typename?: 'RetireCreditsPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  retirement?: Maybe<Retirement>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Wallet` that is related to this `Retirement`. */
  walletByWalletId?: Maybe<Wallet>;
  /** Reads a single `Address` that is related to this `Retirement`. */
  addressByAddressId?: Maybe<Address>;
  /** Reads a single `CreditVintage` that is related to this `Retirement`. */
  creditVintageByCreditVintageId?: Maybe<CreditVintage>;
  /** An edge for our `Retirement`. May be used by Relay 1. */
  retirementEdge?: Maybe<RetirementsEdge>;
};


/** The output of our `retireCredits` mutation. */
export type RetireCreditsPayloadRetirementEdgeArgs = {
  orderBy?: Maybe<Array<RetirementsOrderBy>>;
};

export type Retirement = Node & {
  __typename?: 'Retirement';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  walletId: Scalars['UUID'];
  addressId: Scalars['UUID'];
  creditVintageId: Scalars['UUID'];
  units: Scalars['BigFloat'];
  metadata?: Maybe<Scalars['JSON']>;
  /** Reads a single `Wallet` that is related to this `Retirement`. */
  walletByWalletId?: Maybe<Wallet>;
  /** Reads a single `Address` that is related to this `Retirement`. */
  addressByAddressId?: Maybe<Address>;
  /** Reads a single `CreditVintage` that is related to this `Retirement`. */
  creditVintageByCreditVintageId?: Maybe<CreditVintage>;
};

/**
 * A condition to be used against `Retirement` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type RetirementCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `walletId` field. */
  walletId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `addressId` field. */
  addressId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `creditVintageId` field. */
  creditVintageId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `units` field. */
  units?: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `metadata` field. */
  metadata?: Maybe<Scalars['JSON']>;
};

/** An input for mutations affecting `Retirement` */
export type RetirementInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  walletId: Scalars['UUID'];
  addressId: Scalars['UUID'];
  creditVintageId: Scalars['UUID'];
  units: Scalars['BigFloat'];
  metadata?: Maybe<Scalars['JSON']>;
};

/** Represents an update to a `Retirement`. Fields that are set will be updated. */
export type RetirementPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  walletId?: Maybe<Scalars['UUID']>;
  addressId?: Maybe<Scalars['UUID']>;
  creditVintageId?: Maybe<Scalars['UUID']>;
  units?: Maybe<Scalars['BigFloat']>;
  metadata?: Maybe<Scalars['JSON']>;
};

/** A connection to a list of `Retirement` values. */
export type RetirementsConnection = {
  __typename?: 'RetirementsConnection';
  /** A list of `Retirement` objects. */
  nodes: Array<Maybe<Retirement>>;
  /** A list of edges which contains the `Retirement` and cursor to aid in pagination. */
  edges: Array<RetirementsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Retirement` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Retirement` edge in the connection. */
export type RetirementsEdge = {
  __typename?: 'RetirementsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Retirement` at the end of the edge. */
  node?: Maybe<Retirement>;
};

/** Methods to use when ordering `Retirement`. */
export enum RetirementsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  WalletIdAsc = 'WALLET_ID_ASC',
  WalletIdDesc = 'WALLET_ID_DESC',
  AddressIdAsc = 'ADDRESS_ID_ASC',
  AddressIdDesc = 'ADDRESS_ID_DESC',
  CreditVintageIdAsc = 'CREDIT_VINTAGE_ID_ASC',
  CreditVintageIdDesc = 'CREDIT_VINTAGE_ID_DESC',
  UnitsAsc = 'UNITS_ASC',
  UnitsDesc = 'UNITS_DESC',
  MetadataAsc = 'METADATA_ASC',
  MetadataDesc = 'METADATA_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** All input for the `sendTransferCreditsConfirmation` mutation. */
export type SendTransferCreditsConfirmationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  units: Scalars['BigFloat'];
  creditPrice: Scalars['BigFloat'];
  currency: Scalars['String'];
  purchaseId: Scalars['UUID'];
  creditClassVersion: CreditClassVersionInput;
  buyerName: Scalars['String'];
  email: Scalars['String'];
  project: Scalars['JSON'];
  receiptUrl: Scalars['String'];
};

/** The output of our `sendTransferCreditsConfirmation` mutation. */
export type SendTransferCreditsConfirmationPayload = {
  __typename?: 'SendTransferCreditsConfirmationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
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

export type Transaction = Node & {
  __typename?: 'Transaction';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  brokerId?: Maybe<Scalars['UUID']>;
  fromWalletId: Scalars['UUID'];
  toWalletId: Scalars['UUID'];
  state: TransactionState;
  units: Scalars['BigFloat'];
  creditPrice: Scalars['BigFloat'];
  creditVintageId: Scalars['UUID'];
  purchaseId?: Maybe<Scalars['UUID']>;
  /** Reads a single `Party` that is related to this `Transaction`. */
  partyByBrokerId?: Maybe<Party>;
  /** Reads a single `Wallet` that is related to this `Transaction`. */
  walletByFromWalletId?: Maybe<Wallet>;
  /** Reads a single `Wallet` that is related to this `Transaction`. */
  walletByToWalletId?: Maybe<Wallet>;
  /** Reads a single `CreditVintage` that is related to this `Transaction`. */
  creditVintageByCreditVintageId?: Maybe<CreditVintage>;
  /** Reads a single `Purchase` that is related to this `Transaction`. */
  purchaseByPurchaseId?: Maybe<Purchase>;
};

/**
 * A condition to be used against `Transaction` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type TransactionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `brokerId` field. */
  brokerId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `fromWalletId` field. */
  fromWalletId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `toWalletId` field. */
  toWalletId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `state` field. */
  state?: Maybe<TransactionState>;
  /** Checks for equality with the object’s `units` field. */
  units?: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `creditPrice` field. */
  creditPrice?: Maybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `creditVintageId` field. */
  creditVintageId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `purchaseId` field. */
  purchaseId?: Maybe<Scalars['UUID']>;
};

/** An input for mutations affecting `Transaction` */
export type TransactionInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  brokerId?: Maybe<Scalars['UUID']>;
  fromWalletId: Scalars['UUID'];
  toWalletId: Scalars['UUID'];
  state: TransactionState;
  units: Scalars['BigFloat'];
  creditPrice: Scalars['BigFloat'];
  creditVintageId: Scalars['UUID'];
  purchaseId?: Maybe<Scalars['UUID']>;
};

/** Represents an update to a `Transaction`. Fields that are set will be updated. */
export type TransactionPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  brokerId?: Maybe<Scalars['UUID']>;
  fromWalletId?: Maybe<Scalars['UUID']>;
  toWalletId?: Maybe<Scalars['UUID']>;
  state?: Maybe<TransactionState>;
  units?: Maybe<Scalars['BigFloat']>;
  creditPrice?: Maybe<Scalars['BigFloat']>;
  creditVintageId?: Maybe<Scalars['UUID']>;
  purchaseId?: Maybe<Scalars['UUID']>;
};

export enum TransactionState {
  Hold = 'HOLD',
  Processing = 'PROCESSING',
  Succeeded = 'SUCCEEDED',
  PaymentFailed = 'PAYMENT_FAILED',
  Revoked = 'REVOKED'
}

/** A connection to a list of `Transaction` values. */
export type TransactionsConnection = {
  __typename?: 'TransactionsConnection';
  /** A list of `Transaction` objects. */
  nodes: Array<Maybe<Transaction>>;
  /** A list of edges which contains the `Transaction` and cursor to aid in pagination. */
  edges: Array<TransactionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Transaction` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Transaction` edge in the connection. */
export type TransactionsEdge = {
  __typename?: 'TransactionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Transaction` at the end of the edge. */
  node?: Maybe<Transaction>;
};

/** Methods to use when ordering `Transaction`. */
export enum TransactionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  BrokerIdAsc = 'BROKER_ID_ASC',
  BrokerIdDesc = 'BROKER_ID_DESC',
  FromWalletIdAsc = 'FROM_WALLET_ID_ASC',
  FromWalletIdDesc = 'FROM_WALLET_ID_DESC',
  ToWalletIdAsc = 'TO_WALLET_ID_ASC',
  ToWalletIdDesc = 'TO_WALLET_ID_DESC',
  StateAsc = 'STATE_ASC',
  StateDesc = 'STATE_DESC',
  UnitsAsc = 'UNITS_ASC',
  UnitsDesc = 'UNITS_DESC',
  CreditPriceAsc = 'CREDIT_PRICE_ASC',
  CreditPriceDesc = 'CREDIT_PRICE_DESC',
  CreditVintageIdAsc = 'CREDIT_VINTAGE_ID_ASC',
  CreditVintageIdDesc = 'CREDIT_VINTAGE_ID_DESC',
  PurchaseIdAsc = 'PURCHASE_ID_ASC',
  PurchaseIdDesc = 'PURCHASE_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** All input for the `transferCredits` mutation. */
export type TransferCreditsInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  vintageId: Scalars['UUID'];
  buyerWalletId: Scalars['UUID'];
  addressId: Scalars['UUID'];
  units: Scalars['BigFloat'];
  creditPrice: Scalars['BigFloat'];
  txState: TransactionState;
  brokerId?: Maybe<Scalars['UUID']>;
  stripeId?: Maybe<Scalars['String']>;
  pType?: Maybe<PurchaseType>;
  currency?: Maybe<Scalars['String']>;
  contactEmail?: Maybe<Scalars['String']>;
  autoRetire?: Maybe<Scalars['Boolean']>;
  buyerName?: Maybe<Scalars['String']>;
  receiptUrl?: Maybe<Scalars['String']>;
  sendConfirmation?: Maybe<Scalars['Boolean']>;
  partyId?: Maybe<Scalars['UUID']>;
  userId?: Maybe<Scalars['UUID']>;
};

/** The output of our `transferCredits` mutation. */
export type TransferCreditsPayload = {
  __typename?: 'TransferCreditsPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  json?: Maybe<Scalars['JSON']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** All input for the `updateAccountBalanceByCreditVintageIdAndWalletId` mutation. */
export type UpdateAccountBalanceByCreditVintageIdAndWalletIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `AccountBalance` being updated. */
  accountBalancePatch: AccountBalancePatch;
  creditVintageId: Scalars['UUID'];
  walletId: Scalars['UUID'];
};

/** All input for the `updateAccountBalanceById` mutation. */
export type UpdateAccountBalanceByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `AccountBalance` being updated. */
  accountBalancePatch: AccountBalancePatch;
  id: Scalars['UUID'];
};

/** All input for the `updateAccountBalance` mutation. */
export type UpdateAccountBalanceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `AccountBalance` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `AccountBalance` being updated. */
  accountBalancePatch: AccountBalancePatch;
};

/** The output of our update `AccountBalance` mutation. */
export type UpdateAccountBalancePayload = {
  __typename?: 'UpdateAccountBalancePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `AccountBalance` that was updated by this mutation. */
  accountBalance?: Maybe<AccountBalance>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `CreditVintage` that is related to this `AccountBalance`. */
  creditVintageByCreditVintageId?: Maybe<CreditVintage>;
  /** Reads a single `Wallet` that is related to this `AccountBalance`. */
  walletByWalletId?: Maybe<Wallet>;
  /** An edge for our `AccountBalance`. May be used by Relay 1. */
  accountBalanceEdge?: Maybe<AccountBalancesEdge>;
};


/** The output of our update `AccountBalance` mutation. */
export type UpdateAccountBalancePayloadAccountBalanceEdgeArgs = {
  orderBy?: Maybe<Array<AccountBalancesOrderBy>>;
};

/** All input for the `updateAddressById` mutation. */
export type UpdateAddressByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Address` being updated. */
  addressPatch: AddressPatch;
  id: Scalars['UUID'];
};

/** All input for the `updateAddress` mutation. */
export type UpdateAddressInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Address` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Address` being updated. */
  addressPatch: AddressPatch;
};

/** The output of our update `Address` mutation. */
export type UpdateAddressPayload = {
  __typename?: 'UpdateAddressPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Address` that was updated by this mutation. */
  address?: Maybe<Address>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Address`. May be used by Relay 1. */
  addressEdge?: Maybe<AddressesEdge>;
};


/** The output of our update `Address` mutation. */
export type UpdateAddressPayloadAddressEdgeArgs = {
  orderBy?: Maybe<Array<AddressesOrderBy>>;
};

/** All input for the `updateAdminByAuth0Sub` mutation. */
export type UpdateAdminByAuth0SubInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Admin` being updated. */
  adminPatch: AdminPatch;
  auth0Sub: Scalars['String'];
};

/** All input for the `updateAdminById` mutation. */
export type UpdateAdminByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Admin` being updated. */
  adminPatch: AdminPatch;
  id: Scalars['UUID'];
};

/** All input for the `updateAdmin` mutation. */
export type UpdateAdminInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Admin` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Admin` being updated. */
  adminPatch: AdminPatch;
};

/** The output of our update `Admin` mutation. */
export type UpdateAdminPayload = {
  __typename?: 'UpdateAdminPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Admin` that was updated by this mutation. */
  admin?: Maybe<Admin>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Admin`. May be used by Relay 1. */
  adminEdge?: Maybe<AdminsEdge>;
};


/** The output of our update `Admin` mutation. */
export type UpdateAdminPayloadAdminEdgeArgs = {
  orderBy?: Maybe<Array<AdminsOrderBy>>;
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
  partyByDesignerId?: Maybe<Party>;
  /** Reads a single `Methodology` that is related to this `CreditClass`. */
  methodologyByMethodologyId?: Maybe<Methodology>;
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

/** All input for the `updateCreditVintageByEventId` mutation. */
export type UpdateCreditVintageByEventIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `CreditVintage` being updated. */
  creditVintagePatch: CreditVintagePatch;
  eventId: Scalars['UUID'];
};

/** All input for the `updateCreditVintageById` mutation. */
export type UpdateCreditVintageByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `CreditVintage` being updated. */
  creditVintagePatch: CreditVintagePatch;
  id: Scalars['UUID'];
};

/** All input for the `updateCreditVintage` mutation. */
export type UpdateCreditVintageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `CreditVintage` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `CreditVintage` being updated. */
  creditVintagePatch: CreditVintagePatch;
};

/** The output of our update `CreditVintage` mutation. */
export type UpdateCreditVintagePayload = {
  __typename?: 'UpdateCreditVintagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CreditVintage` that was updated by this mutation. */
  creditVintage?: Maybe<CreditVintage>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `CreditClass` that is related to this `CreditVintage`. */
  creditClassByCreditClassId?: Maybe<CreditClass>;
  /** Reads a single `Project` that is related to this `CreditVintage`. */
  projectByProjectId?: Maybe<Project>;
  /** Reads a single `Wallet` that is related to this `CreditVintage`. */
  walletByTokenizerId?: Maybe<Wallet>;
  /** Reads a single `Event` that is related to this `CreditVintage`. */
  eventByEventId?: Maybe<Event>;
  /** Reads a single `MethodologyVersion` that is related to this `CreditVintage`. */
  methodologyVersionByMethodologyVersionIdAndMethodologyVersionCreatedAt?: Maybe<MethodologyVersion>;
  /** Reads a single `CreditClassVersion` that is related to this `CreditVintage`. */
  creditClassVersionByCreditClassVersionIdAndCreditClassVersionCreatedAt?: Maybe<CreditClassVersion>;
  /** Reads a single `Party` that is related to this `CreditVintage`. */
  partyByIssuerId?: Maybe<Party>;
  /** Reads a single `Wallet` that is related to this `CreditVintage`. */
  walletByResellerId?: Maybe<Wallet>;
  /** An edge for our `CreditVintage`. May be used by Relay 1. */
  creditVintageEdge?: Maybe<CreditVintagesEdge>;
};


/** The output of our update `CreditVintage` mutation. */
export type UpdateCreditVintagePayloadCreditVintageEdgeArgs = {
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
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
  /** Reads a single `Event` that is related to this `Document`. */
  eventByEventId?: Maybe<Event>;
  /** An edge for our `Document`. May be used by Relay 1. */
  documentEdge?: Maybe<DocumentsEdge>;
};


/** The output of our update `Document` mutation. */
export type UpdateDocumentPayloadDocumentEdgeArgs = {
  orderBy?: Maybe<Array<DocumentsOrderBy>>;
};

/** All input for the `updateEventById` mutation. */
export type UpdateEventByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Event` being updated. */
  eventPatch: EventPatch;
  id: Scalars['UUID'];
};

/** All input for the `updateEvent` mutation. */
export type UpdateEventInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Event` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Event` being updated. */
  eventPatch: EventPatch;
};

/** The output of our update `Event` mutation. */
export type UpdateEventPayload = {
  __typename?: 'UpdateEventPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Event` that was updated by this mutation. */
  event?: Maybe<Event>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Project` that is related to this `Event`. */
  projectByProjectId?: Maybe<Project>;
  /** An edge for our `Event`. May be used by Relay 1. */
  eventEdge?: Maybe<EventsEdge>;
};


/** The output of our update `Event` mutation. */
export type UpdateEventPayloadEventEdgeArgs = {
  orderBy?: Maybe<Array<EventsOrderBy>>;
};

/** All input for the `updateFlywaySchemaHistoryByInstalledRank` mutation. */
export type UpdateFlywaySchemaHistoryByInstalledRankInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `FlywaySchemaHistory` being updated. */
  flywaySchemaHistoryPatch: FlywaySchemaHistoryPatch;
  installedRank: Scalars['Int'];
};

/** All input for the `updateFlywaySchemaHistory` mutation. */
export type UpdateFlywaySchemaHistoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `FlywaySchemaHistory` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `FlywaySchemaHistory` being updated. */
  flywaySchemaHistoryPatch: FlywaySchemaHistoryPatch;
};

/** The output of our update `FlywaySchemaHistory` mutation. */
export type UpdateFlywaySchemaHistoryPayload = {
  __typename?: 'UpdateFlywaySchemaHistoryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `FlywaySchemaHistory` that was updated by this mutation. */
  flywaySchemaHistory?: Maybe<FlywaySchemaHistory>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `FlywaySchemaHistory`. May be used by Relay 1. */
  flywaySchemaHistoryEdge?: Maybe<FlywaySchemaHistoriesEdge>;
};


/** The output of our update `FlywaySchemaHistory` mutation. */
export type UpdateFlywaySchemaHistoryPayloadFlywaySchemaHistoryEdgeArgs = {
  orderBy?: Maybe<Array<FlywaySchemaHistoriesOrderBy>>;
};

/** All input for the `updateMethodologyById` mutation. */
export type UpdateMethodologyByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Methodology` being updated. */
  methodologyPatch: MethodologyPatch;
  id: Scalars['UUID'];
};

/** All input for the `updateMethodology` mutation. */
export type UpdateMethodologyInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Methodology` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Methodology` being updated. */
  methodologyPatch: MethodologyPatch;
};

/** The output of our update `Methodology` mutation. */
export type UpdateMethodologyPayload = {
  __typename?: 'UpdateMethodologyPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Methodology` that was updated by this mutation. */
  methodology?: Maybe<Methodology>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `Methodology`. */
  partyByAuthorId?: Maybe<Party>;
  /** An edge for our `Methodology`. May be used by Relay 1. */
  methodologyEdge?: Maybe<MethodologiesEdge>;
};


/** The output of our update `Methodology` mutation. */
export type UpdateMethodologyPayloadMethodologyEdgeArgs = {
  orderBy?: Maybe<Array<MethodologiesOrderBy>>;
};

/** All input for the `updateMethodologyVersionByIdAndCreatedAt` mutation. */
export type UpdateMethodologyVersionByIdAndCreatedAtInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `MethodologyVersion` being updated. */
  methodologyVersionPatch: MethodologyVersionPatch;
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
};

/** All input for the `updateMethodologyVersion` mutation. */
export type UpdateMethodologyVersionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MethodologyVersion` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `MethodologyVersion` being updated. */
  methodologyVersionPatch: MethodologyVersionPatch;
};

/** The output of our update `MethodologyVersion` mutation. */
export type UpdateMethodologyVersionPayload = {
  __typename?: 'UpdateMethodologyVersionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MethodologyVersion` that was updated by this mutation. */
  methodologyVersion?: Maybe<MethodologyVersion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Methodology` that is related to this `MethodologyVersion`. */
  methodologyById?: Maybe<Methodology>;
  /** An edge for our `MethodologyVersion`. May be used by Relay 1. */
  methodologyVersionEdge?: Maybe<MethodologyVersionsEdge>;
};


/** The output of our update `MethodologyVersion` mutation. */
export type UpdateMethodologyVersionPayloadMethodologyVersionEdgeArgs = {
  orderBy?: Maybe<Array<MethodologyVersionsOrderBy>>;
};

/** All input for the `updateMrvById` mutation. */
export type UpdateMrvByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Mrv` being updated. */
  mrvPatch: MrvPatch;
  id: Scalars['UUID'];
};

/** All input for the `updateMrv` mutation. */
export type UpdateMrvInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Mrv` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Mrv` being updated. */
  mrvPatch: MrvPatch;
};

/** The output of our update `Mrv` mutation. */
export type UpdateMrvPayload = {
  __typename?: 'UpdateMrvPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Mrv` that was updated by this mutation. */
  mrv?: Maybe<Mrv>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Project` that is related to this `Mrv`. */
  projectByProjectId?: Maybe<Project>;
  /** An edge for our `Mrv`. May be used by Relay 1. */
  mrvEdge?: Maybe<MrvsEdge>;
};


/** The output of our update `Mrv` mutation. */
export type UpdateMrvPayloadMrvEdgeArgs = {
  orderBy?: Maybe<Array<MrvsOrderBy>>;
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

/** All input for the `updateOrganizationByPartyIdAndType` mutation. */
export type UpdateOrganizationByPartyIdAndTypeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Organization` being updated. */
  organizationPatch: OrganizationPatch;
  partyId: Scalars['UUID'];
  type: PartyType;
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

/** All input for the `updateOrganizationMemberByMemberIdAndOrganizationId` mutation. */
export type UpdateOrganizationMemberByMemberIdAndOrganizationIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `OrganizationMember` being updated. */
  organizationMemberPatch: OrganizationMemberPatch;
  memberId: Scalars['UUID'];
  organizationId: Scalars['UUID'];
};

/** All input for the `updateOrganizationMember` mutation. */
export type UpdateOrganizationMemberInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `OrganizationMember` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `OrganizationMember` being updated. */
  organizationMemberPatch: OrganizationMemberPatch;
};

/** The output of our update `OrganizationMember` mutation. */
export type UpdateOrganizationMemberPayload = {
  __typename?: 'UpdateOrganizationMemberPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `OrganizationMember` that was updated by this mutation. */
  organizationMember?: Maybe<OrganizationMember>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `OrganizationMember`. */
  userByMemberId?: Maybe<User>;
  /** Reads a single `Organization` that is related to this `OrganizationMember`. */
  organizationByOrganizationId?: Maybe<Organization>;
  /** An edge for our `OrganizationMember`. May be used by Relay 1. */
  organizationMemberEdge?: Maybe<OrganizationMembersEdge>;
};


/** The output of our update `OrganizationMember` mutation. */
export type UpdateOrganizationMemberPayloadOrganizationMemberEdgeArgs = {
  orderBy?: Maybe<Array<OrganizationMembersOrderBy>>;
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
  /** Reads a single `Address` that is related to this `Party`. */
  addressByAddressId?: Maybe<Address>;
  /** An edge for our `Party`. May be used by Relay 1. */
  partyEdge?: Maybe<PartiesEdge>;
};


/** The output of our update `Party` mutation. */
export type UpdatePartyPayloadPartyEdgeArgs = {
  orderBy?: Maybe<Array<PartiesOrderBy>>;
};

/** All input for the `updateProjectBrokerById` mutation. */
export type UpdateProjectBrokerByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `ProjectBroker` being updated. */
  projectBrokerPatch: ProjectBrokerPatch;
  id: Scalars['UUID'];
};

/** All input for the `updateProjectBroker` mutation. */
export type UpdateProjectBrokerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ProjectBroker` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `ProjectBroker` being updated. */
  projectBrokerPatch: ProjectBrokerPatch;
};

/** The output of our update `ProjectBroker` mutation. */
export type UpdateProjectBrokerPayload = {
  __typename?: 'UpdateProjectBrokerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ProjectBroker` that was updated by this mutation. */
  projectBroker?: Maybe<ProjectBroker>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Project` that is related to this `ProjectBroker`. */
  projectByProjectId?: Maybe<Project>;
  /** Reads a single `Party` that is related to this `ProjectBroker`. */
  partyByBrokerId?: Maybe<Party>;
  /** Reads a single `Party` that is related to this `ProjectBroker`. */
  partyByAuthorizedByPartyId?: Maybe<Party>;
  /** Reads a single `User` that is related to this `ProjectBroker`. */
  userBySignerId?: Maybe<User>;
  /** An edge for our `ProjectBroker`. May be used by Relay 1. */
  projectBrokerEdge?: Maybe<ProjectBrokersEdge>;
};


/** The output of our update `ProjectBroker` mutation. */
export type UpdateProjectBrokerPayloadProjectBrokerEdgeArgs = {
  orderBy?: Maybe<Array<ProjectBrokersOrderBy>>;
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
  /** Reads a single `Party` that is related to this `Project`. */
  partyByStewardId?: Maybe<Party>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByLandOwnerId?: Maybe<Party>;
  /** Reads a single `CreditClass` that is related to this `Project`. */
  creditClassByCreditClassId?: Maybe<CreditClass>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByRegistryId?: Maybe<Party>;
  /** Reads a single `Address` that is related to this `Project`. */
  addressByAddressId?: Maybe<Address>;
  /** Reads a single `User` that is related to this `Project`. */
  userByCreatorId?: Maybe<User>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByOriginatorId?: Maybe<Party>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByIssuerId?: Maybe<Party>;
  /** Reads a single `Party` that is related to this `Project`. */
  partyByResellerId?: Maybe<Party>;
  /** An edge for our `Project`. May be used by Relay 1. */
  projectEdge?: Maybe<ProjectsEdge>;
};


/** The output of our update `Project` mutation. */
export type UpdateProjectPayloadProjectEdgeArgs = {
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
};

/** All input for the `updatePurchaseById` mutation. */
export type UpdatePurchaseByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Purchase` being updated. */
  purchasePatch: PurchasePatch;
  id: Scalars['UUID'];
};

/** All input for the `updatePurchase` mutation. */
export type UpdatePurchaseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Purchase` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Purchase` being updated. */
  purchasePatch: PurchasePatch;
};

/** The output of our update `Purchase` mutation. */
export type UpdatePurchasePayload = {
  __typename?: 'UpdatePurchasePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Purchase` that was updated by this mutation. */
  purchase?: Maybe<Purchase>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Wallet` that is related to this `Purchase`. */
  walletByBuyerWalletId?: Maybe<Wallet>;
  /** Reads a single `Address` that is related to this `Purchase`. */
  addressByAddressId?: Maybe<Address>;
  /** Reads a single `CreditVintage` that is related to this `Purchase`. */
  creditVintageByCreditVintageId?: Maybe<CreditVintage>;
  /** Reads a single `Party` that is related to this `Purchase`. */
  partyByPartyId?: Maybe<Party>;
  /** Reads a single `User` that is related to this `Purchase`. */
  userByUserId?: Maybe<User>;
  /** An edge for our `Purchase`. May be used by Relay 1. */
  purchaseEdge?: Maybe<PurchasesEdge>;
};


/** The output of our update `Purchase` mutation. */
export type UpdatePurchasePayloadPurchaseEdgeArgs = {
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
};

/** All input for the `updateRetirementById` mutation. */
export type UpdateRetirementByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Retirement` being updated. */
  retirementPatch: RetirementPatch;
  id: Scalars['UUID'];
};

/** All input for the `updateRetirement` mutation. */
export type UpdateRetirementInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Retirement` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Retirement` being updated. */
  retirementPatch: RetirementPatch;
};

/** The output of our update `Retirement` mutation. */
export type UpdateRetirementPayload = {
  __typename?: 'UpdateRetirementPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Retirement` that was updated by this mutation. */
  retirement?: Maybe<Retirement>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Wallet` that is related to this `Retirement`. */
  walletByWalletId?: Maybe<Wallet>;
  /** Reads a single `Address` that is related to this `Retirement`. */
  addressByAddressId?: Maybe<Address>;
  /** Reads a single `CreditVintage` that is related to this `Retirement`. */
  creditVintageByCreditVintageId?: Maybe<CreditVintage>;
  /** An edge for our `Retirement`. May be used by Relay 1. */
  retirementEdge?: Maybe<RetirementsEdge>;
};


/** The output of our update `Retirement` mutation. */
export type UpdateRetirementPayloadRetirementEdgeArgs = {
  orderBy?: Maybe<Array<RetirementsOrderBy>>;
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

/** All input for the `updateTransactionById` mutation. */
export type UpdateTransactionByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Transaction` being updated. */
  transactionPatch: TransactionPatch;
  id: Scalars['UUID'];
};

/** All input for the `updateTransaction` mutation. */
export type UpdateTransactionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Transaction` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Transaction` being updated. */
  transactionPatch: TransactionPatch;
};

/** The output of our update `Transaction` mutation. */
export type UpdateTransactionPayload = {
  __typename?: 'UpdateTransactionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Transaction` that was updated by this mutation. */
  transaction?: Maybe<Transaction>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `Transaction`. */
  partyByBrokerId?: Maybe<Party>;
  /** Reads a single `Wallet` that is related to this `Transaction`. */
  walletByFromWalletId?: Maybe<Wallet>;
  /** Reads a single `Wallet` that is related to this `Transaction`. */
  walletByToWalletId?: Maybe<Wallet>;
  /** Reads a single `CreditVintage` that is related to this `Transaction`. */
  creditVintageByCreditVintageId?: Maybe<CreditVintage>;
  /** Reads a single `Purchase` that is related to this `Transaction`. */
  purchaseByPurchaseId?: Maybe<Purchase>;
  /** An edge for our `Transaction`. May be used by Relay 1. */
  transactionEdge?: Maybe<TransactionsEdge>;
};


/** The output of our update `Transaction` mutation. */
export type UpdateTransactionPayloadTransactionEdgeArgs = {
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
};

/** All input for the `updateUserByAuth0Sub` mutation. */
export type UpdateUserByAuth0SubInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `User` being updated. */
  userPatch: UserPatch;
  auth0Sub: Scalars['String'];
};

/** All input for the `updateUserByEmail` mutation. */
export type UpdateUserByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `User` being updated. */
  userPatch: UserPatch;
  email: Scalars['String'];
};

/** All input for the `updateUserById` mutation. */
export type UpdateUserByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `User` being updated. */
  userPatch: UserPatch;
  id: Scalars['UUID'];
};

/** All input for the `updateUserByPartyIdAndType` mutation. */
export type UpdateUserByPartyIdAndTypeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `User` being updated. */
  userPatch: UserPatch;
  partyId: Scalars['UUID'];
  type: PartyType;
};

/** All input for the `updateUserByPartyId` mutation. */
export type UpdateUserByPartyIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `User` being updated. */
  userPatch: UserPatch;
  partyId: Scalars['UUID'];
};

/** All input for the `updateUser` mutation. */
export type UpdateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `User` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `User` being updated. */
  userPatch: UserPatch;
};

/** The output of our update `User` mutation. */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` that was updated by this mutation. */
  user?: Maybe<User>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Party` that is related to this `User`. */
  partyByPartyId?: Maybe<Party>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our update `User` mutation. */
export type UpdateUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
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

export type User = Node & {
  __typename?: 'User';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  type: PartyType;
  email: Scalars['String'];
  partyId: Scalars['UUID'];
  auth0Sub?: Maybe<Scalars['String']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  updates?: Maybe<Scalars['Boolean']>;
  stripeAccountId?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  roleTitle?: Maybe<Scalars['String']>;
  /** Reads a single `Party` that is related to this `User`. */
  partyByPartyId?: Maybe<Party>;
  /** Reads and enables pagination through a set of `OrganizationMember`. */
  organizationMembersByMemberId: OrganizationMembersConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreatorId: ProjectsConnection;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByUserId: PurchasesConnection;
  /** Reads and enables pagination through a set of `ProjectBroker`. */
  projectBrokersBySignerId: ProjectBrokersConnection;
  /** Reads and enables pagination through a set of `Organization`. */
  organizationsByOrganizationMemberMemberIdAndOrganizationId: UserOrganizationsByOrganizationMemberMemberIdAndOrganizationIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectCreatorIdAndDeveloperId: UserPartiesByProjectCreatorIdAndDeveloperIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectCreatorIdAndStewardId: UserPartiesByProjectCreatorIdAndStewardIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectCreatorIdAndLandOwnerId: UserPartiesByProjectCreatorIdAndLandOwnerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByProjectCreatorIdAndCreditClassId: UserCreditClassesByProjectCreatorIdAndCreditClassIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectCreatorIdAndRegistryId: UserPartiesByProjectCreatorIdAndRegistryIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Address`. */
  addressesByProjectCreatorIdAndAddressId: UserAddressesByProjectCreatorIdAndAddressIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectCreatorIdAndOriginatorId: UserPartiesByProjectCreatorIdAndOriginatorIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectCreatorIdAndIssuerId: UserPartiesByProjectCreatorIdAndIssuerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectCreatorIdAndResellerId: UserPartiesByProjectCreatorIdAndResellerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByPurchaseUserIdAndBuyerWalletId: UserWalletsByPurchaseUserIdAndBuyerWalletIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Address`. */
  addressesByPurchaseUserIdAndAddressId: UserAddressesByPurchaseUserIdAndAddressIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByPurchaseUserIdAndCreditVintageId: UserCreditVintagesByPurchaseUserIdAndCreditVintageIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByPurchaseUserIdAndPartyId: UserPartiesByPurchaseUserIdAndPartyIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByProjectBrokerSignerIdAndProjectId: UserProjectsByProjectBrokerSignerIdAndProjectIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectBrokerSignerIdAndBrokerId: UserPartiesByProjectBrokerSignerIdAndBrokerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByProjectBrokerSignerIdAndAuthorizedByPartyId: UserPartiesByProjectBrokerSignerIdAndAuthorizedByPartyIdManyToManyConnection;
};


export type UserOrganizationMembersByMemberIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<OrganizationMembersOrderBy>>;
  condition?: Maybe<OrganizationMemberCondition>;
};


export type UserProjectsByCreatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};


export type UserPurchasesByUserIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};


export type UserProjectBrokersBySignerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectBrokersOrderBy>>;
  condition?: Maybe<ProjectBrokerCondition>;
};


export type UserOrganizationsByOrganizationMemberMemberIdAndOrganizationIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<OrganizationsOrderBy>>;
  condition?: Maybe<OrganizationCondition>;
};


export type UserPartiesByProjectCreatorIdAndDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type UserPartiesByProjectCreatorIdAndStewardIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type UserPartiesByProjectCreatorIdAndLandOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type UserCreditClassesByProjectCreatorIdAndCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};


export type UserPartiesByProjectCreatorIdAndRegistryIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type UserAddressesByProjectCreatorIdAndAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AddressesOrderBy>>;
  condition?: Maybe<AddressCondition>;
};


export type UserPartiesByProjectCreatorIdAndOriginatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type UserPartiesByProjectCreatorIdAndIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type UserPartiesByProjectCreatorIdAndResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type UserWalletsByPurchaseUserIdAndBuyerWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type UserAddressesByPurchaseUserIdAndAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AddressesOrderBy>>;
  condition?: Maybe<AddressCondition>;
};


export type UserCreditVintagesByPurchaseUserIdAndCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};


export type UserPartiesByPurchaseUserIdAndPartyIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type UserProjectsByProjectBrokerSignerIdAndProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};


export type UserPartiesByProjectBrokerSignerIdAndBrokerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type UserPartiesByProjectBrokerSignerIdAndAuthorizedByPartyIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};

/** A connection to a list of `Address` values, with data from `Project`. */
export type UserAddressesByProjectCreatorIdAndAddressIdManyToManyConnection = {
  __typename?: 'UserAddressesByProjectCreatorIdAndAddressIdManyToManyConnection';
  /** A list of `Address` objects. */
  nodes: Array<Maybe<Address>>;
  /** A list of edges which contains the `Address`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<UserAddressesByProjectCreatorIdAndAddressIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Address` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Address` edge in the connection, with data from `Project`. */
export type UserAddressesByProjectCreatorIdAndAddressIdManyToManyEdge = {
  __typename?: 'UserAddressesByProjectCreatorIdAndAddressIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Address` at the end of the edge. */
  node?: Maybe<Address>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByAddressId: ProjectsConnection;
};


/** A `Address` edge in the connection, with data from `Project`. */
export type UserAddressesByProjectCreatorIdAndAddressIdManyToManyEdgeProjectsByAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Address` values, with data from `Purchase`. */
export type UserAddressesByPurchaseUserIdAndAddressIdManyToManyConnection = {
  __typename?: 'UserAddressesByPurchaseUserIdAndAddressIdManyToManyConnection';
  /** A list of `Address` objects. */
  nodes: Array<Maybe<Address>>;
  /** A list of edges which contains the `Address`, info from the `Purchase`, and the cursor to aid in pagination. */
  edges: Array<UserAddressesByPurchaseUserIdAndAddressIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Address` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Address` edge in the connection, with data from `Purchase`. */
export type UserAddressesByPurchaseUserIdAndAddressIdManyToManyEdge = {
  __typename?: 'UserAddressesByPurchaseUserIdAndAddressIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Address` at the end of the edge. */
  node?: Maybe<Address>;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByAddressId: PurchasesConnection;
};


/** A `Address` edge in the connection, with data from `Purchase`. */
export type UserAddressesByPurchaseUserIdAndAddressIdManyToManyEdgePurchasesByAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};

/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UserCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `type` field. */
  type?: Maybe<PartyType>;
  /** Checks for equality with the object’s `email` field. */
  email?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `partyId` field. */
  partyId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `auth0Sub` field. */
  auth0Sub?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `isAdmin` field. */
  isAdmin?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `updates` field. */
  updates?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `stripeAccountId` field. */
  stripeAccountId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `phoneNumber` field. */
  phoneNumber?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `roleTitle` field. */
  roleTitle?: Maybe<Scalars['String']>;
};

/** A connection to a list of `CreditClass` values, with data from `Project`. */
export type UserCreditClassesByProjectCreatorIdAndCreditClassIdManyToManyConnection = {
  __typename?: 'UserCreditClassesByProjectCreatorIdAndCreditClassIdManyToManyConnection';
  /** A list of `CreditClass` objects. */
  nodes: Array<Maybe<CreditClass>>;
  /** A list of edges which contains the `CreditClass`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<UserCreditClassesByProjectCreatorIdAndCreditClassIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditClass` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditClass` edge in the connection, with data from `Project`. */
export type UserCreditClassesByProjectCreatorIdAndCreditClassIdManyToManyEdge = {
  __typename?: 'UserCreditClassesByProjectCreatorIdAndCreditClassIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditClass` at the end of the edge. */
  node?: Maybe<CreditClass>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreditClassId: ProjectsConnection;
};


/** A `CreditClass` edge in the connection, with data from `Project`. */
export type UserCreditClassesByProjectCreatorIdAndCreditClassIdManyToManyEdgeProjectsByCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `CreditVintage` values, with data from `Purchase`. */
export type UserCreditVintagesByPurchaseUserIdAndCreditVintageIdManyToManyConnection = {
  __typename?: 'UserCreditVintagesByPurchaseUserIdAndCreditVintageIdManyToManyConnection';
  /** A list of `CreditVintage` objects. */
  nodes: Array<Maybe<CreditVintage>>;
  /** A list of edges which contains the `CreditVintage`, info from the `Purchase`, and the cursor to aid in pagination. */
  edges: Array<UserCreditVintagesByPurchaseUserIdAndCreditVintageIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditVintage` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditVintage` edge in the connection, with data from `Purchase`. */
export type UserCreditVintagesByPurchaseUserIdAndCreditVintageIdManyToManyEdge = {
  __typename?: 'UserCreditVintagesByPurchaseUserIdAndCreditVintageIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditVintage` at the end of the edge. */
  node?: Maybe<CreditVintage>;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByCreditVintageId: PurchasesConnection;
};


/** A `CreditVintage` edge in the connection, with data from `Purchase`. */
export type UserCreditVintagesByPurchaseUserIdAndCreditVintageIdManyToManyEdgePurchasesByCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};

/** An input for mutations affecting `User` */
export type UserInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  type?: Maybe<PartyType>;
  email: Scalars['String'];
  partyId: Scalars['UUID'];
  auth0Sub?: Maybe<Scalars['String']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  updates?: Maybe<Scalars['Boolean']>;
  stripeAccountId?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  roleTitle?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Organization` values, with data from `OrganizationMember`. */
export type UserOrganizationsByOrganizationMemberMemberIdAndOrganizationIdManyToManyConnection = {
  __typename?: 'UserOrganizationsByOrganizationMemberMemberIdAndOrganizationIdManyToManyConnection';
  /** A list of `Organization` objects. */
  nodes: Array<Maybe<Organization>>;
  /** A list of edges which contains the `Organization`, info from the `OrganizationMember`, and the cursor to aid in pagination. */
  edges: Array<UserOrganizationsByOrganizationMemberMemberIdAndOrganizationIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Organization` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Organization` edge in the connection, with data from `OrganizationMember`. */
export type UserOrganizationsByOrganizationMemberMemberIdAndOrganizationIdManyToManyEdge = {
  __typename?: 'UserOrganizationsByOrganizationMemberMemberIdAndOrganizationIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Organization` at the end of the edge. */
  node?: Maybe<Organization>;
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  isOwner: Scalars['Boolean'];
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** A connection to a list of `Party` values, with data from `ProjectBroker`. */
export type UserPartiesByProjectBrokerSignerIdAndAuthorizedByPartyIdManyToManyConnection = {
  __typename?: 'UserPartiesByProjectBrokerSignerIdAndAuthorizedByPartyIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `ProjectBroker`, and the cursor to aid in pagination. */
  edges: Array<UserPartiesByProjectBrokerSignerIdAndAuthorizedByPartyIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `ProjectBroker`. */
export type UserPartiesByProjectBrokerSignerIdAndAuthorizedByPartyIdManyToManyEdge = {
  __typename?: 'UserPartiesByProjectBrokerSignerIdAndAuthorizedByPartyIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `ProjectBroker`. */
  projectBrokersByAuthorizedByPartyId: ProjectBrokersConnection;
};


/** A `Party` edge in the connection, with data from `ProjectBroker`. */
export type UserPartiesByProjectBrokerSignerIdAndAuthorizedByPartyIdManyToManyEdgeProjectBrokersByAuthorizedByPartyIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectBrokersOrderBy>>;
  condition?: Maybe<ProjectBrokerCondition>;
};

/** A connection to a list of `Party` values, with data from `ProjectBroker`. */
export type UserPartiesByProjectBrokerSignerIdAndBrokerIdManyToManyConnection = {
  __typename?: 'UserPartiesByProjectBrokerSignerIdAndBrokerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `ProjectBroker`, and the cursor to aid in pagination. */
  edges: Array<UserPartiesByProjectBrokerSignerIdAndBrokerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `ProjectBroker`. */
export type UserPartiesByProjectBrokerSignerIdAndBrokerIdManyToManyEdge = {
  __typename?: 'UserPartiesByProjectBrokerSignerIdAndBrokerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `ProjectBroker`. */
  projectBrokersByBrokerId: ProjectBrokersConnection;
};


/** A `Party` edge in the connection, with data from `ProjectBroker`. */
export type UserPartiesByProjectBrokerSignerIdAndBrokerIdManyToManyEdgeProjectBrokersByBrokerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectBrokersOrderBy>>;
  condition?: Maybe<ProjectBrokerCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type UserPartiesByProjectCreatorIdAndDeveloperIdManyToManyConnection = {
  __typename?: 'UserPartiesByProjectCreatorIdAndDeveloperIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<UserPartiesByProjectCreatorIdAndDeveloperIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type UserPartiesByProjectCreatorIdAndDeveloperIdManyToManyEdge = {
  __typename?: 'UserPartiesByProjectCreatorIdAndDeveloperIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByDeveloperId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type UserPartiesByProjectCreatorIdAndDeveloperIdManyToManyEdgeProjectsByDeveloperIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type UserPartiesByProjectCreatorIdAndIssuerIdManyToManyConnection = {
  __typename?: 'UserPartiesByProjectCreatorIdAndIssuerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<UserPartiesByProjectCreatorIdAndIssuerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type UserPartiesByProjectCreatorIdAndIssuerIdManyToManyEdge = {
  __typename?: 'UserPartiesByProjectCreatorIdAndIssuerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByIssuerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type UserPartiesByProjectCreatorIdAndIssuerIdManyToManyEdgeProjectsByIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type UserPartiesByProjectCreatorIdAndLandOwnerIdManyToManyConnection = {
  __typename?: 'UserPartiesByProjectCreatorIdAndLandOwnerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<UserPartiesByProjectCreatorIdAndLandOwnerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type UserPartiesByProjectCreatorIdAndLandOwnerIdManyToManyEdge = {
  __typename?: 'UserPartiesByProjectCreatorIdAndLandOwnerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByLandOwnerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type UserPartiesByProjectCreatorIdAndLandOwnerIdManyToManyEdgeProjectsByLandOwnerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type UserPartiesByProjectCreatorIdAndOriginatorIdManyToManyConnection = {
  __typename?: 'UserPartiesByProjectCreatorIdAndOriginatorIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<UserPartiesByProjectCreatorIdAndOriginatorIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type UserPartiesByProjectCreatorIdAndOriginatorIdManyToManyEdge = {
  __typename?: 'UserPartiesByProjectCreatorIdAndOriginatorIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByOriginatorId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type UserPartiesByProjectCreatorIdAndOriginatorIdManyToManyEdgeProjectsByOriginatorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type UserPartiesByProjectCreatorIdAndRegistryIdManyToManyConnection = {
  __typename?: 'UserPartiesByProjectCreatorIdAndRegistryIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<UserPartiesByProjectCreatorIdAndRegistryIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type UserPartiesByProjectCreatorIdAndRegistryIdManyToManyEdge = {
  __typename?: 'UserPartiesByProjectCreatorIdAndRegistryIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByRegistryId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type UserPartiesByProjectCreatorIdAndRegistryIdManyToManyEdgeProjectsByRegistryIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type UserPartiesByProjectCreatorIdAndResellerIdManyToManyConnection = {
  __typename?: 'UserPartiesByProjectCreatorIdAndResellerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<UserPartiesByProjectCreatorIdAndResellerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type UserPartiesByProjectCreatorIdAndResellerIdManyToManyEdge = {
  __typename?: 'UserPartiesByProjectCreatorIdAndResellerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByResellerId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type UserPartiesByProjectCreatorIdAndResellerIdManyToManyEdgeProjectsByResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Project`. */
export type UserPartiesByProjectCreatorIdAndStewardIdManyToManyConnection = {
  __typename?: 'UserPartiesByProjectCreatorIdAndStewardIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Project`, and the cursor to aid in pagination. */
  edges: Array<UserPartiesByProjectCreatorIdAndStewardIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Project`. */
export type UserPartiesByProjectCreatorIdAndStewardIdManyToManyEdge = {
  __typename?: 'UserPartiesByProjectCreatorIdAndStewardIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByStewardId: ProjectsConnection;
};


/** A `Party` edge in the connection, with data from `Project`. */
export type UserPartiesByProjectCreatorIdAndStewardIdManyToManyEdgeProjectsByStewardIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};

/** A connection to a list of `Party` values, with data from `Purchase`. */
export type UserPartiesByPurchaseUserIdAndPartyIdManyToManyConnection = {
  __typename?: 'UserPartiesByPurchaseUserIdAndPartyIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Purchase`, and the cursor to aid in pagination. */
  edges: Array<UserPartiesByPurchaseUserIdAndPartyIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Purchase`. */
export type UserPartiesByPurchaseUserIdAndPartyIdManyToManyEdge = {
  __typename?: 'UserPartiesByPurchaseUserIdAndPartyIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByPartyId: PurchasesConnection;
};


/** A `Party` edge in the connection, with data from `Purchase`. */
export type UserPartiesByPurchaseUserIdAndPartyIdManyToManyEdgePurchasesByPartyIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  type?: Maybe<PartyType>;
  email?: Maybe<Scalars['String']>;
  partyId?: Maybe<Scalars['UUID']>;
  auth0Sub?: Maybe<Scalars['String']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  updates?: Maybe<Scalars['Boolean']>;
  stripeAccountId?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  roleTitle?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Project` values, with data from `ProjectBroker`. */
export type UserProjectsByProjectBrokerSignerIdAndProjectIdManyToManyConnection = {
  __typename?: 'UserProjectsByProjectBrokerSignerIdAndProjectIdManyToManyConnection';
  /** A list of `Project` objects. */
  nodes: Array<Maybe<Project>>;
  /** A list of edges which contains the `Project`, info from the `ProjectBroker`, and the cursor to aid in pagination. */
  edges: Array<UserProjectsByProjectBrokerSignerIdAndProjectIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Project` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Project` edge in the connection, with data from `ProjectBroker`. */
export type UserProjectsByProjectBrokerSignerIdAndProjectIdManyToManyEdge = {
  __typename?: 'UserProjectsByProjectBrokerSignerIdAndProjectIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Project` at the end of the edge. */
  node?: Maybe<Project>;
  /** Reads and enables pagination through a set of `ProjectBroker`. */
  projectBrokersByProjectId: ProjectBrokersConnection;
};


/** A `Project` edge in the connection, with data from `ProjectBroker`. */
export type UserProjectsByProjectBrokerSignerIdAndProjectIdManyToManyEdgeProjectBrokersByProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectBrokersOrderBy>>;
  condition?: Maybe<ProjectBrokerCondition>;
};

/** A connection to a list of `Wallet` values, with data from `Purchase`. */
export type UserWalletsByPurchaseUserIdAndBuyerWalletIdManyToManyConnection = {
  __typename?: 'UserWalletsByPurchaseUserIdAndBuyerWalletIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `Purchase`, and the cursor to aid in pagination. */
  edges: Array<UserWalletsByPurchaseUserIdAndBuyerWalletIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `Purchase`. */
export type UserWalletsByPurchaseUserIdAndBuyerWalletIdManyToManyEdge = {
  __typename?: 'UserWalletsByPurchaseUserIdAndBuyerWalletIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByBuyerWalletId: PurchasesConnection;
};


/** A `Wallet` edge in the connection, with data from `Purchase`. */
export type UserWalletsByPurchaseUserIdAndBuyerWalletIdManyToManyEdgePurchasesByBuyerWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};

/** A connection to a list of `User` values. */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User` and cursor to aid in pagination. */
  edges: Array<UsersEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
};

/** Methods to use when ordering `User`. */
export enum UsersOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  PartyIdAsc = 'PARTY_ID_ASC',
  PartyIdDesc = 'PARTY_ID_DESC',
  Auth0SubAsc = 'AUTH0_SUB_ASC',
  Auth0SubDesc = 'AUTH0_SUB_DESC',
  IsAdminAsc = 'IS_ADMIN_ASC',
  IsAdminDesc = 'IS_ADMIN_DESC',
  UpdatesAsc = 'UPDATES_ASC',
  UpdatesDesc = 'UPDATES_DESC',
  StripeAccountIdAsc = 'STRIPE_ACCOUNT_ID_ASC',
  StripeAccountIdDesc = 'STRIPE_ACCOUNT_ID_DESC',
  PhoneNumberAsc = 'PHONE_NUMBER_ASC',
  PhoneNumberDesc = 'PHONE_NUMBER_DESC',
  RoleTitleAsc = 'ROLE_TITLE_ASC',
  RoleTitleDesc = 'ROLE_TITLE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Wallet = Node & {
  __typename?: 'Wallet';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  addr: Scalars['String'];
  /** Reads and enables pagination through a set of `Party`. */
  partiesByWalletId: PartiesConnection;
  /** Reads and enables pagination through a set of `AccountBalance`. */
  accountBalancesByWalletId: AccountBalancesConnection;
  /** Reads and enables pagination through a set of `CreditClassIssuer`. */
  creditClassIssuersByIssuerId: CreditClassIssuersConnection;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByTokenizerId: CreditVintagesConnection;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByResellerId: CreditVintagesConnection;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByFromWalletId: TransactionsConnection;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByToWalletId: TransactionsConnection;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByBuyerWalletId: PurchasesConnection;
  /** Reads and enables pagination through a set of `Retirement`. */
  retirementsByWalletId: RetirementsConnection;
  /** Reads and enables pagination through a set of `Address`. */
  addressesByPartyWalletIdAndAddressId: WalletAddressesByPartyWalletIdAndAddressIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByAccountBalanceWalletIdAndCreditVintageId: WalletCreditVintagesByAccountBalanceWalletIdAndCreditVintageIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByCreditClassIssuerIssuerIdAndCreditClassId: WalletCreditClassesByCreditClassIssuerIssuerIdAndCreditClassIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByCreditVintageTokenizerIdAndCreditClassId: WalletCreditClassesByCreditVintageTokenizerIdAndCreditClassIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreditVintageTokenizerIdAndProjectId: WalletProjectsByCreditVintageTokenizerIdAndProjectIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByCreditVintageTokenizerIdAndIssuerId: WalletPartiesByCreditVintageTokenizerIdAndIssuerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByCreditVintageTokenizerIdAndResellerId: WalletWalletsByCreditVintageTokenizerIdAndResellerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditClass`. */
  creditClassesByCreditVintageResellerIdAndCreditClassId: WalletCreditClassesByCreditVintageResellerIdAndCreditClassIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByCreditVintageResellerIdAndProjectId: WalletProjectsByCreditVintageResellerIdAndProjectIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByCreditVintageResellerIdAndTokenizerId: WalletWalletsByCreditVintageResellerIdAndTokenizerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByCreditVintageResellerIdAndIssuerId: WalletPartiesByCreditVintageResellerIdAndIssuerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByTransactionFromWalletIdAndBrokerId: WalletPartiesByTransactionFromWalletIdAndBrokerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByTransactionFromWalletIdAndToWalletId: WalletWalletsByTransactionFromWalletIdAndToWalletIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByTransactionFromWalletIdAndCreditVintageId: WalletCreditVintagesByTransactionFromWalletIdAndCreditVintageIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByTransactionFromWalletIdAndPurchaseId: WalletPurchasesByTransactionFromWalletIdAndPurchaseIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByTransactionToWalletIdAndBrokerId: WalletPartiesByTransactionToWalletIdAndBrokerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Wallet`. */
  walletsByTransactionToWalletIdAndFromWalletId: WalletWalletsByTransactionToWalletIdAndFromWalletIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByTransactionToWalletIdAndCreditVintageId: WalletCreditVintagesByTransactionToWalletIdAndCreditVintageIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByTransactionToWalletIdAndPurchaseId: WalletPurchasesByTransactionToWalletIdAndPurchaseIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Address`. */
  addressesByPurchaseBuyerWalletIdAndAddressId: WalletAddressesByPurchaseBuyerWalletIdAndAddressIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByPurchaseBuyerWalletIdAndCreditVintageId: WalletCreditVintagesByPurchaseBuyerWalletIdAndCreditVintageIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByPurchaseBuyerWalletIdAndPartyId: WalletPartiesByPurchaseBuyerWalletIdAndPartyIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByPurchaseBuyerWalletIdAndUserId: WalletUsersByPurchaseBuyerWalletIdAndUserIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Address`. */
  addressesByRetirementWalletIdAndAddressId: WalletAddressesByRetirementWalletIdAndAddressIdManyToManyConnection;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByRetirementWalletIdAndCreditVintageId: WalletCreditVintagesByRetirementWalletIdAndCreditVintageIdManyToManyConnection;
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


export type WalletAccountBalancesByWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountBalancesOrderBy>>;
  condition?: Maybe<AccountBalanceCondition>;
};


export type WalletCreditClassIssuersByIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassIssuersOrderBy>>;
  condition?: Maybe<CreditClassIssuerCondition>;
};


export type WalletCreditVintagesByTokenizerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};


export type WalletCreditVintagesByResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};


export type WalletTransactionsByFromWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};


export type WalletTransactionsByToWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};


export type WalletPurchasesByBuyerWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};


export type WalletRetirementsByWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<RetirementsOrderBy>>;
  condition?: Maybe<RetirementCondition>;
};


export type WalletAddressesByPartyWalletIdAndAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AddressesOrderBy>>;
  condition?: Maybe<AddressCondition>;
};


export type WalletCreditVintagesByAccountBalanceWalletIdAndCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};


export type WalletCreditClassesByCreditClassIssuerIssuerIdAndCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};


export type WalletCreditClassesByCreditVintageTokenizerIdAndCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};


export type WalletProjectsByCreditVintageTokenizerIdAndProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};


export type WalletPartiesByCreditVintageTokenizerIdAndIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type WalletWalletsByCreditVintageTokenizerIdAndResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type WalletCreditClassesByCreditVintageResellerIdAndCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassesOrderBy>>;
  condition?: Maybe<CreditClassCondition>;
};


export type WalletProjectsByCreditVintageResellerIdAndProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProjectsOrderBy>>;
  condition?: Maybe<ProjectCondition>;
};


export type WalletWalletsByCreditVintageResellerIdAndTokenizerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type WalletPartiesByCreditVintageResellerIdAndIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type WalletPartiesByTransactionFromWalletIdAndBrokerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type WalletWalletsByTransactionFromWalletIdAndToWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type WalletCreditVintagesByTransactionFromWalletIdAndCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};


export type WalletPurchasesByTransactionFromWalletIdAndPurchaseIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};


export type WalletPartiesByTransactionToWalletIdAndBrokerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type WalletWalletsByTransactionToWalletIdAndFromWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WalletsOrderBy>>;
  condition?: Maybe<WalletCondition>;
};


export type WalletCreditVintagesByTransactionToWalletIdAndCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};


export type WalletPurchasesByTransactionToWalletIdAndPurchaseIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};


export type WalletAddressesByPurchaseBuyerWalletIdAndAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AddressesOrderBy>>;
  condition?: Maybe<AddressCondition>;
};


export type WalletCreditVintagesByPurchaseBuyerWalletIdAndCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};


export type WalletPartiesByPurchaseBuyerWalletIdAndPartyIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};


export type WalletUsersByPurchaseBuyerWalletIdAndUserIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
};


export type WalletAddressesByRetirementWalletIdAndAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AddressesOrderBy>>;
  condition?: Maybe<AddressCondition>;
};


export type WalletCreditVintagesByRetirementWalletIdAndCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};

/** A connection to a list of `Address` values, with data from `Party`. */
export type WalletAddressesByPartyWalletIdAndAddressIdManyToManyConnection = {
  __typename?: 'WalletAddressesByPartyWalletIdAndAddressIdManyToManyConnection';
  /** A list of `Address` objects. */
  nodes: Array<Maybe<Address>>;
  /** A list of edges which contains the `Address`, info from the `Party`, and the cursor to aid in pagination. */
  edges: Array<WalletAddressesByPartyWalletIdAndAddressIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Address` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Address` edge in the connection, with data from `Party`. */
export type WalletAddressesByPartyWalletIdAndAddressIdManyToManyEdge = {
  __typename?: 'WalletAddressesByPartyWalletIdAndAddressIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Address` at the end of the edge. */
  node?: Maybe<Address>;
  /** Reads and enables pagination through a set of `Party`. */
  partiesByAddressId: PartiesConnection;
};


/** A `Address` edge in the connection, with data from `Party`. */
export type WalletAddressesByPartyWalletIdAndAddressIdManyToManyEdgePartiesByAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PartiesOrderBy>>;
  condition?: Maybe<PartyCondition>;
};

/** A connection to a list of `Address` values, with data from `Purchase`. */
export type WalletAddressesByPurchaseBuyerWalletIdAndAddressIdManyToManyConnection = {
  __typename?: 'WalletAddressesByPurchaseBuyerWalletIdAndAddressIdManyToManyConnection';
  /** A list of `Address` objects. */
  nodes: Array<Maybe<Address>>;
  /** A list of edges which contains the `Address`, info from the `Purchase`, and the cursor to aid in pagination. */
  edges: Array<WalletAddressesByPurchaseBuyerWalletIdAndAddressIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Address` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Address` edge in the connection, with data from `Purchase`. */
export type WalletAddressesByPurchaseBuyerWalletIdAndAddressIdManyToManyEdge = {
  __typename?: 'WalletAddressesByPurchaseBuyerWalletIdAndAddressIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Address` at the end of the edge. */
  node?: Maybe<Address>;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByAddressId: PurchasesConnection;
};


/** A `Address` edge in the connection, with data from `Purchase`. */
export type WalletAddressesByPurchaseBuyerWalletIdAndAddressIdManyToManyEdgePurchasesByAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};

/** A connection to a list of `Address` values, with data from `Retirement`. */
export type WalletAddressesByRetirementWalletIdAndAddressIdManyToManyConnection = {
  __typename?: 'WalletAddressesByRetirementWalletIdAndAddressIdManyToManyConnection';
  /** A list of `Address` objects. */
  nodes: Array<Maybe<Address>>;
  /** A list of edges which contains the `Address`, info from the `Retirement`, and the cursor to aid in pagination. */
  edges: Array<WalletAddressesByRetirementWalletIdAndAddressIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Address` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Address` edge in the connection, with data from `Retirement`. */
export type WalletAddressesByRetirementWalletIdAndAddressIdManyToManyEdge = {
  __typename?: 'WalletAddressesByRetirementWalletIdAndAddressIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Address` at the end of the edge. */
  node?: Maybe<Address>;
  /** Reads and enables pagination through a set of `Retirement`. */
  retirementsByAddressId: RetirementsConnection;
};


/** A `Address` edge in the connection, with data from `Retirement`. */
export type WalletAddressesByRetirementWalletIdAndAddressIdManyToManyEdgeRetirementsByAddressIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<RetirementsOrderBy>>;
  condition?: Maybe<RetirementCondition>;
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

/** A connection to a list of `CreditClass` values, with data from `CreditClassIssuer`. */
export type WalletCreditClassesByCreditClassIssuerIssuerIdAndCreditClassIdManyToManyConnection = {
  __typename?: 'WalletCreditClassesByCreditClassIssuerIssuerIdAndCreditClassIdManyToManyConnection';
  /** A list of `CreditClass` objects. */
  nodes: Array<Maybe<CreditClass>>;
  /** A list of edges which contains the `CreditClass`, info from the `CreditClassIssuer`, and the cursor to aid in pagination. */
  edges: Array<WalletCreditClassesByCreditClassIssuerIssuerIdAndCreditClassIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditClass` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditClass` edge in the connection, with data from `CreditClassIssuer`. */
export type WalletCreditClassesByCreditClassIssuerIssuerIdAndCreditClassIdManyToManyEdge = {
  __typename?: 'WalletCreditClassesByCreditClassIssuerIssuerIdAndCreditClassIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditClass` at the end of the edge. */
  node?: Maybe<CreditClass>;
  /** Reads and enables pagination through a set of `CreditClassIssuer`. */
  creditClassIssuersByCreditClassId: CreditClassIssuersConnection;
};


/** A `CreditClass` edge in the connection, with data from `CreditClassIssuer`. */
export type WalletCreditClassesByCreditClassIssuerIssuerIdAndCreditClassIdManyToManyEdgeCreditClassIssuersByCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditClassIssuersOrderBy>>;
  condition?: Maybe<CreditClassIssuerCondition>;
};

/** A connection to a list of `CreditClass` values, with data from `CreditVintage`. */
export type WalletCreditClassesByCreditVintageResellerIdAndCreditClassIdManyToManyConnection = {
  __typename?: 'WalletCreditClassesByCreditVintageResellerIdAndCreditClassIdManyToManyConnection';
  /** A list of `CreditClass` objects. */
  nodes: Array<Maybe<CreditClass>>;
  /** A list of edges which contains the `CreditClass`, info from the `CreditVintage`, and the cursor to aid in pagination. */
  edges: Array<WalletCreditClassesByCreditVintageResellerIdAndCreditClassIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditClass` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditClass` edge in the connection, with data from `CreditVintage`. */
export type WalletCreditClassesByCreditVintageResellerIdAndCreditClassIdManyToManyEdge = {
  __typename?: 'WalletCreditClassesByCreditVintageResellerIdAndCreditClassIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditClass` at the end of the edge. */
  node?: Maybe<CreditClass>;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByCreditClassId: CreditVintagesConnection;
};


/** A `CreditClass` edge in the connection, with data from `CreditVintage`. */
export type WalletCreditClassesByCreditVintageResellerIdAndCreditClassIdManyToManyEdgeCreditVintagesByCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};

/** A connection to a list of `CreditClass` values, with data from `CreditVintage`. */
export type WalletCreditClassesByCreditVintageTokenizerIdAndCreditClassIdManyToManyConnection = {
  __typename?: 'WalletCreditClassesByCreditVintageTokenizerIdAndCreditClassIdManyToManyConnection';
  /** A list of `CreditClass` objects. */
  nodes: Array<Maybe<CreditClass>>;
  /** A list of edges which contains the `CreditClass`, info from the `CreditVintage`, and the cursor to aid in pagination. */
  edges: Array<WalletCreditClassesByCreditVintageTokenizerIdAndCreditClassIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditClass` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditClass` edge in the connection, with data from `CreditVintage`. */
export type WalletCreditClassesByCreditVintageTokenizerIdAndCreditClassIdManyToManyEdge = {
  __typename?: 'WalletCreditClassesByCreditVintageTokenizerIdAndCreditClassIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditClass` at the end of the edge. */
  node?: Maybe<CreditClass>;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByCreditClassId: CreditVintagesConnection;
};


/** A `CreditClass` edge in the connection, with data from `CreditVintage`. */
export type WalletCreditClassesByCreditVintageTokenizerIdAndCreditClassIdManyToManyEdgeCreditVintagesByCreditClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};

/** A connection to a list of `CreditVintage` values, with data from `AccountBalance`. */
export type WalletCreditVintagesByAccountBalanceWalletIdAndCreditVintageIdManyToManyConnection = {
  __typename?: 'WalletCreditVintagesByAccountBalanceWalletIdAndCreditVintageIdManyToManyConnection';
  /** A list of `CreditVintage` objects. */
  nodes: Array<Maybe<CreditVintage>>;
  /** A list of edges which contains the `CreditVintage`, info from the `AccountBalance`, and the cursor to aid in pagination. */
  edges: Array<WalletCreditVintagesByAccountBalanceWalletIdAndCreditVintageIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditVintage` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditVintage` edge in the connection, with data from `AccountBalance`. */
export type WalletCreditVintagesByAccountBalanceWalletIdAndCreditVintageIdManyToManyEdge = {
  __typename?: 'WalletCreditVintagesByAccountBalanceWalletIdAndCreditVintageIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditVintage` at the end of the edge. */
  node?: Maybe<CreditVintage>;
  id: Scalars['UUID'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  liquidBalance?: Maybe<Scalars['BigFloat']>;
  burntBalance?: Maybe<Scalars['BigFloat']>;
};

/** A connection to a list of `CreditVintage` values, with data from `Purchase`. */
export type WalletCreditVintagesByPurchaseBuyerWalletIdAndCreditVintageIdManyToManyConnection = {
  __typename?: 'WalletCreditVintagesByPurchaseBuyerWalletIdAndCreditVintageIdManyToManyConnection';
  /** A list of `CreditVintage` objects. */
  nodes: Array<Maybe<CreditVintage>>;
  /** A list of edges which contains the `CreditVintage`, info from the `Purchase`, and the cursor to aid in pagination. */
  edges: Array<WalletCreditVintagesByPurchaseBuyerWalletIdAndCreditVintageIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditVintage` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditVintage` edge in the connection, with data from `Purchase`. */
export type WalletCreditVintagesByPurchaseBuyerWalletIdAndCreditVintageIdManyToManyEdge = {
  __typename?: 'WalletCreditVintagesByPurchaseBuyerWalletIdAndCreditVintageIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditVintage` at the end of the edge. */
  node?: Maybe<CreditVintage>;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByCreditVintageId: PurchasesConnection;
};


/** A `CreditVintage` edge in the connection, with data from `Purchase`. */
export type WalletCreditVintagesByPurchaseBuyerWalletIdAndCreditVintageIdManyToManyEdgePurchasesByCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};

/** A connection to a list of `CreditVintage` values, with data from `Retirement`. */
export type WalletCreditVintagesByRetirementWalletIdAndCreditVintageIdManyToManyConnection = {
  __typename?: 'WalletCreditVintagesByRetirementWalletIdAndCreditVintageIdManyToManyConnection';
  /** A list of `CreditVintage` objects. */
  nodes: Array<Maybe<CreditVintage>>;
  /** A list of edges which contains the `CreditVintage`, info from the `Retirement`, and the cursor to aid in pagination. */
  edges: Array<WalletCreditVintagesByRetirementWalletIdAndCreditVintageIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditVintage` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditVintage` edge in the connection, with data from `Retirement`. */
export type WalletCreditVintagesByRetirementWalletIdAndCreditVintageIdManyToManyEdge = {
  __typename?: 'WalletCreditVintagesByRetirementWalletIdAndCreditVintageIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditVintage` at the end of the edge. */
  node?: Maybe<CreditVintage>;
  /** Reads and enables pagination through a set of `Retirement`. */
  retirementsByCreditVintageId: RetirementsConnection;
};


/** A `CreditVintage` edge in the connection, with data from `Retirement`. */
export type WalletCreditVintagesByRetirementWalletIdAndCreditVintageIdManyToManyEdgeRetirementsByCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<RetirementsOrderBy>>;
  condition?: Maybe<RetirementCondition>;
};

/** A connection to a list of `CreditVintage` values, with data from `Transaction`. */
export type WalletCreditVintagesByTransactionFromWalletIdAndCreditVintageIdManyToManyConnection = {
  __typename?: 'WalletCreditVintagesByTransactionFromWalletIdAndCreditVintageIdManyToManyConnection';
  /** A list of `CreditVintage` objects. */
  nodes: Array<Maybe<CreditVintage>>;
  /** A list of edges which contains the `CreditVintage`, info from the `Transaction`, and the cursor to aid in pagination. */
  edges: Array<WalletCreditVintagesByTransactionFromWalletIdAndCreditVintageIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditVintage` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditVintage` edge in the connection, with data from `Transaction`. */
export type WalletCreditVintagesByTransactionFromWalletIdAndCreditVintageIdManyToManyEdge = {
  __typename?: 'WalletCreditVintagesByTransactionFromWalletIdAndCreditVintageIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditVintage` at the end of the edge. */
  node?: Maybe<CreditVintage>;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByCreditVintageId: TransactionsConnection;
};


/** A `CreditVintage` edge in the connection, with data from `Transaction`. */
export type WalletCreditVintagesByTransactionFromWalletIdAndCreditVintageIdManyToManyEdgeTransactionsByCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};

/** A connection to a list of `CreditVintage` values, with data from `Transaction`. */
export type WalletCreditVintagesByTransactionToWalletIdAndCreditVintageIdManyToManyConnection = {
  __typename?: 'WalletCreditVintagesByTransactionToWalletIdAndCreditVintageIdManyToManyConnection';
  /** A list of `CreditVintage` objects. */
  nodes: Array<Maybe<CreditVintage>>;
  /** A list of edges which contains the `CreditVintage`, info from the `Transaction`, and the cursor to aid in pagination. */
  edges: Array<WalletCreditVintagesByTransactionToWalletIdAndCreditVintageIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreditVintage` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CreditVintage` edge in the connection, with data from `Transaction`. */
export type WalletCreditVintagesByTransactionToWalletIdAndCreditVintageIdManyToManyEdge = {
  __typename?: 'WalletCreditVintagesByTransactionToWalletIdAndCreditVintageIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreditVintage` at the end of the edge. */
  node?: Maybe<CreditVintage>;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByCreditVintageId: TransactionsConnection;
};


/** A `CreditVintage` edge in the connection, with data from `Transaction`. */
export type WalletCreditVintagesByTransactionToWalletIdAndCreditVintageIdManyToManyEdgeTransactionsByCreditVintageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};

/** An input for mutations affecting `Wallet` */
export type WalletInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  addr: Scalars['String'];
};

/** A connection to a list of `Party` values, with data from `CreditVintage`. */
export type WalletPartiesByCreditVintageResellerIdAndIssuerIdManyToManyConnection = {
  __typename?: 'WalletPartiesByCreditVintageResellerIdAndIssuerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `CreditVintage`, and the cursor to aid in pagination. */
  edges: Array<WalletPartiesByCreditVintageResellerIdAndIssuerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `CreditVintage`. */
export type WalletPartiesByCreditVintageResellerIdAndIssuerIdManyToManyEdge = {
  __typename?: 'WalletPartiesByCreditVintageResellerIdAndIssuerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByIssuerId: CreditVintagesConnection;
};


/** A `Party` edge in the connection, with data from `CreditVintage`. */
export type WalletPartiesByCreditVintageResellerIdAndIssuerIdManyToManyEdgeCreditVintagesByIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};

/** A connection to a list of `Party` values, with data from `CreditVintage`. */
export type WalletPartiesByCreditVintageTokenizerIdAndIssuerIdManyToManyConnection = {
  __typename?: 'WalletPartiesByCreditVintageTokenizerIdAndIssuerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `CreditVintage`, and the cursor to aid in pagination. */
  edges: Array<WalletPartiesByCreditVintageTokenizerIdAndIssuerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `CreditVintage`. */
export type WalletPartiesByCreditVintageTokenizerIdAndIssuerIdManyToManyEdge = {
  __typename?: 'WalletPartiesByCreditVintageTokenizerIdAndIssuerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByIssuerId: CreditVintagesConnection;
};


/** A `Party` edge in the connection, with data from `CreditVintage`. */
export type WalletPartiesByCreditVintageTokenizerIdAndIssuerIdManyToManyEdgeCreditVintagesByIssuerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};

/** A connection to a list of `Party` values, with data from `Purchase`. */
export type WalletPartiesByPurchaseBuyerWalletIdAndPartyIdManyToManyConnection = {
  __typename?: 'WalletPartiesByPurchaseBuyerWalletIdAndPartyIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Purchase`, and the cursor to aid in pagination. */
  edges: Array<WalletPartiesByPurchaseBuyerWalletIdAndPartyIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Purchase`. */
export type WalletPartiesByPurchaseBuyerWalletIdAndPartyIdManyToManyEdge = {
  __typename?: 'WalletPartiesByPurchaseBuyerWalletIdAndPartyIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByPartyId: PurchasesConnection;
};


/** A `Party` edge in the connection, with data from `Purchase`. */
export type WalletPartiesByPurchaseBuyerWalletIdAndPartyIdManyToManyEdgePurchasesByPartyIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};

/** A connection to a list of `Party` values, with data from `Transaction`. */
export type WalletPartiesByTransactionFromWalletIdAndBrokerIdManyToManyConnection = {
  __typename?: 'WalletPartiesByTransactionFromWalletIdAndBrokerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Transaction`, and the cursor to aid in pagination. */
  edges: Array<WalletPartiesByTransactionFromWalletIdAndBrokerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Transaction`. */
export type WalletPartiesByTransactionFromWalletIdAndBrokerIdManyToManyEdge = {
  __typename?: 'WalletPartiesByTransactionFromWalletIdAndBrokerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByBrokerId: TransactionsConnection;
};


/** A `Party` edge in the connection, with data from `Transaction`. */
export type WalletPartiesByTransactionFromWalletIdAndBrokerIdManyToManyEdgeTransactionsByBrokerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};

/** A connection to a list of `Party` values, with data from `Transaction`. */
export type WalletPartiesByTransactionToWalletIdAndBrokerIdManyToManyConnection = {
  __typename?: 'WalletPartiesByTransactionToWalletIdAndBrokerIdManyToManyConnection';
  /** A list of `Party` objects. */
  nodes: Array<Maybe<Party>>;
  /** A list of edges which contains the `Party`, info from the `Transaction`, and the cursor to aid in pagination. */
  edges: Array<WalletPartiesByTransactionToWalletIdAndBrokerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Party` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Party` edge in the connection, with data from `Transaction`. */
export type WalletPartiesByTransactionToWalletIdAndBrokerIdManyToManyEdge = {
  __typename?: 'WalletPartiesByTransactionToWalletIdAndBrokerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Party` at the end of the edge. */
  node?: Maybe<Party>;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByBrokerId: TransactionsConnection;
};


/** A `Party` edge in the connection, with data from `Transaction`. */
export type WalletPartiesByTransactionToWalletIdAndBrokerIdManyToManyEdgeTransactionsByBrokerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};

/** Represents an update to a `Wallet`. Fields that are set will be updated. */
export type WalletPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  addr?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Project` values, with data from `CreditVintage`. */
export type WalletProjectsByCreditVintageResellerIdAndProjectIdManyToManyConnection = {
  __typename?: 'WalletProjectsByCreditVintageResellerIdAndProjectIdManyToManyConnection';
  /** A list of `Project` objects. */
  nodes: Array<Maybe<Project>>;
  /** A list of edges which contains the `Project`, info from the `CreditVintage`, and the cursor to aid in pagination. */
  edges: Array<WalletProjectsByCreditVintageResellerIdAndProjectIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Project` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Project` edge in the connection, with data from `CreditVintage`. */
export type WalletProjectsByCreditVintageResellerIdAndProjectIdManyToManyEdge = {
  __typename?: 'WalletProjectsByCreditVintageResellerIdAndProjectIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Project` at the end of the edge. */
  node?: Maybe<Project>;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByProjectId: CreditVintagesConnection;
};


/** A `Project` edge in the connection, with data from `CreditVintage`. */
export type WalletProjectsByCreditVintageResellerIdAndProjectIdManyToManyEdgeCreditVintagesByProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};

/** A connection to a list of `Project` values, with data from `CreditVintage`. */
export type WalletProjectsByCreditVintageTokenizerIdAndProjectIdManyToManyConnection = {
  __typename?: 'WalletProjectsByCreditVintageTokenizerIdAndProjectIdManyToManyConnection';
  /** A list of `Project` objects. */
  nodes: Array<Maybe<Project>>;
  /** A list of edges which contains the `Project`, info from the `CreditVintage`, and the cursor to aid in pagination. */
  edges: Array<WalletProjectsByCreditVintageTokenizerIdAndProjectIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Project` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Project` edge in the connection, with data from `CreditVintage`. */
export type WalletProjectsByCreditVintageTokenizerIdAndProjectIdManyToManyEdge = {
  __typename?: 'WalletProjectsByCreditVintageTokenizerIdAndProjectIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Project` at the end of the edge. */
  node?: Maybe<Project>;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByProjectId: CreditVintagesConnection;
};


/** A `Project` edge in the connection, with data from `CreditVintage`. */
export type WalletProjectsByCreditVintageTokenizerIdAndProjectIdManyToManyEdgeCreditVintagesByProjectIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};

/** A connection to a list of `Purchase` values, with data from `Transaction`. */
export type WalletPurchasesByTransactionFromWalletIdAndPurchaseIdManyToManyConnection = {
  __typename?: 'WalletPurchasesByTransactionFromWalletIdAndPurchaseIdManyToManyConnection';
  /** A list of `Purchase` objects. */
  nodes: Array<Maybe<Purchase>>;
  /** A list of edges which contains the `Purchase`, info from the `Transaction`, and the cursor to aid in pagination. */
  edges: Array<WalletPurchasesByTransactionFromWalletIdAndPurchaseIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Purchase` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Purchase` edge in the connection, with data from `Transaction`. */
export type WalletPurchasesByTransactionFromWalletIdAndPurchaseIdManyToManyEdge = {
  __typename?: 'WalletPurchasesByTransactionFromWalletIdAndPurchaseIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Purchase` at the end of the edge. */
  node?: Maybe<Purchase>;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByPurchaseId: TransactionsConnection;
};


/** A `Purchase` edge in the connection, with data from `Transaction`. */
export type WalletPurchasesByTransactionFromWalletIdAndPurchaseIdManyToManyEdgeTransactionsByPurchaseIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};

/** A connection to a list of `Purchase` values, with data from `Transaction`. */
export type WalletPurchasesByTransactionToWalletIdAndPurchaseIdManyToManyConnection = {
  __typename?: 'WalletPurchasesByTransactionToWalletIdAndPurchaseIdManyToManyConnection';
  /** A list of `Purchase` objects. */
  nodes: Array<Maybe<Purchase>>;
  /** A list of edges which contains the `Purchase`, info from the `Transaction`, and the cursor to aid in pagination. */
  edges: Array<WalletPurchasesByTransactionToWalletIdAndPurchaseIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Purchase` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Purchase` edge in the connection, with data from `Transaction`. */
export type WalletPurchasesByTransactionToWalletIdAndPurchaseIdManyToManyEdge = {
  __typename?: 'WalletPurchasesByTransactionToWalletIdAndPurchaseIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Purchase` at the end of the edge. */
  node?: Maybe<Purchase>;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByPurchaseId: TransactionsConnection;
};


/** A `Purchase` edge in the connection, with data from `Transaction`. */
export type WalletPurchasesByTransactionToWalletIdAndPurchaseIdManyToManyEdgeTransactionsByPurchaseIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};

/** A connection to a list of `User` values, with data from `Purchase`. */
export type WalletUsersByPurchaseBuyerWalletIdAndUserIdManyToManyConnection = {
  __typename?: 'WalletUsersByPurchaseBuyerWalletIdAndUserIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `Purchase`, and the cursor to aid in pagination. */
  edges: Array<WalletUsersByPurchaseBuyerWalletIdAndUserIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `Purchase`. */
export type WalletUsersByPurchaseBuyerWalletIdAndUserIdManyToManyEdge = {
  __typename?: 'WalletUsersByPurchaseBuyerWalletIdAndUserIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `Purchase`. */
  purchasesByUserId: PurchasesConnection;
};


/** A `User` edge in the connection, with data from `Purchase`. */
export type WalletUsersByPurchaseBuyerWalletIdAndUserIdManyToManyEdgePurchasesByUserIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PurchasesOrderBy>>;
  condition?: Maybe<PurchaseCondition>;
};

/** A connection to a list of `Wallet` values, with data from `CreditVintage`. */
export type WalletWalletsByCreditVintageResellerIdAndTokenizerIdManyToManyConnection = {
  __typename?: 'WalletWalletsByCreditVintageResellerIdAndTokenizerIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `CreditVintage`, and the cursor to aid in pagination. */
  edges: Array<WalletWalletsByCreditVintageResellerIdAndTokenizerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `CreditVintage`. */
export type WalletWalletsByCreditVintageResellerIdAndTokenizerIdManyToManyEdge = {
  __typename?: 'WalletWalletsByCreditVintageResellerIdAndTokenizerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByTokenizerId: CreditVintagesConnection;
};


/** A `Wallet` edge in the connection, with data from `CreditVintage`. */
export type WalletWalletsByCreditVintageResellerIdAndTokenizerIdManyToManyEdgeCreditVintagesByTokenizerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};

/** A connection to a list of `Wallet` values, with data from `CreditVintage`. */
export type WalletWalletsByCreditVintageTokenizerIdAndResellerIdManyToManyConnection = {
  __typename?: 'WalletWalletsByCreditVintageTokenizerIdAndResellerIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `CreditVintage`, and the cursor to aid in pagination. */
  edges: Array<WalletWalletsByCreditVintageTokenizerIdAndResellerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `CreditVintage`. */
export type WalletWalletsByCreditVintageTokenizerIdAndResellerIdManyToManyEdge = {
  __typename?: 'WalletWalletsByCreditVintageTokenizerIdAndResellerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `CreditVintage`. */
  creditVintagesByResellerId: CreditVintagesConnection;
};


/** A `Wallet` edge in the connection, with data from `CreditVintage`. */
export type WalletWalletsByCreditVintageTokenizerIdAndResellerIdManyToManyEdgeCreditVintagesByResellerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CreditVintagesOrderBy>>;
  condition?: Maybe<CreditVintageCondition>;
};

/** A connection to a list of `Wallet` values, with data from `Transaction`. */
export type WalletWalletsByTransactionFromWalletIdAndToWalletIdManyToManyConnection = {
  __typename?: 'WalletWalletsByTransactionFromWalletIdAndToWalletIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `Transaction`, and the cursor to aid in pagination. */
  edges: Array<WalletWalletsByTransactionFromWalletIdAndToWalletIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `Transaction`. */
export type WalletWalletsByTransactionFromWalletIdAndToWalletIdManyToManyEdge = {
  __typename?: 'WalletWalletsByTransactionFromWalletIdAndToWalletIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByToWalletId: TransactionsConnection;
};


/** A `Wallet` edge in the connection, with data from `Transaction`. */
export type WalletWalletsByTransactionFromWalletIdAndToWalletIdManyToManyEdgeTransactionsByToWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
};

/** A connection to a list of `Wallet` values, with data from `Transaction`. */
export type WalletWalletsByTransactionToWalletIdAndFromWalletIdManyToManyConnection = {
  __typename?: 'WalletWalletsByTransactionToWalletIdAndFromWalletIdManyToManyConnection';
  /** A list of `Wallet` objects. */
  nodes: Array<Maybe<Wallet>>;
  /** A list of edges which contains the `Wallet`, info from the `Transaction`, and the cursor to aid in pagination. */
  edges: Array<WalletWalletsByTransactionToWalletIdAndFromWalletIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wallet` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wallet` edge in the connection, with data from `Transaction`. */
export type WalletWalletsByTransactionToWalletIdAndFromWalletIdManyToManyEdge = {
  __typename?: 'WalletWalletsByTransactionToWalletIdAndFromWalletIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wallet` at the end of the edge. */
  node?: Maybe<Wallet>;
  /** Reads and enables pagination through a set of `Transaction`. */
  transactionsByFromWalletId: TransactionsConnection;
};


/** A `Wallet` edge in the connection, with data from `Transaction`. */
export type WalletWalletsByTransactionToWalletIdAndFromWalletIdManyToManyEdgeTransactionsByFromWalletIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TransactionsOrderBy>>;
  condition?: Maybe<TransactionCondition>;
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

export type AllCreditClassesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCreditClassesQuery = (
  { __typename?: 'Query' }
  & { allCreditClasses?: Maybe<(
    { __typename?: 'CreditClassesConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'CreditClass' }
      & Pick<CreditClass, 'id' | 'uri' | 'standard'>
      & { creditClassVersionsById: (
        { __typename?: 'CreditClassVersionsConnection' }
        & { nodes: Array<Maybe<(
          { __typename?: 'CreditClassVersion' }
          & Pick<CreditClassVersion, 'name' | 'description' | 'image'>
        )>> }
      ) }
    )>> }
  )> }
);

export type AllCreditVintagesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCreditVintagesQuery = (
  { __typename?: 'Query' }
  & { allCreditVintages?: Maybe<(
    { __typename?: 'CreditVintagesConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'CreditVintage' }
      & Pick<CreditVintage, 'id' | 'createdAt' | 'initialDistribution'>
      & { creditClassByCreditClassId?: Maybe<(
        { __typename?: 'CreditClass' }
        & { creditClassVersionsById: (
          { __typename?: 'CreditClassVersionsConnection' }
          & { nodes: Array<Maybe<(
            { __typename?: 'CreditClassVersion' }
            & Pick<CreditClassVersion, 'name' | 'createdAt'>
          )>> }
        ) }
      )>, projectByProjectId?: Maybe<(
        { __typename?: 'Project' }
        & Pick<Project, 'metadata' | 'developerId' | 'stewardId' | 'landOwnerId'>
        & { partyByLandOwnerId?: Maybe<(
          { __typename?: 'Party' }
          & Pick<Party, 'name'>
        )>, partyByStewardId?: Maybe<(
          { __typename?: 'Party' }
          & Pick<Party, 'name'>
        )>, partyByDeveloperId?: Maybe<(
          { __typename?: 'Party' }
          & Pick<Party, 'name'>
        )> }
      )>, accountBalancesByCreditVintageId: (
        { __typename?: 'AccountBalancesConnection' }
        & { nodes: Array<Maybe<(
          { __typename?: 'AccountBalance' }
          & Pick<AccountBalance, 'id' | 'walletId' | 'liquidBalance'>
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
      & Pick<Party, 'id' | 'type' | 'name' | 'walletId' | 'addressId'>
      & { addressByAddressId?: Maybe<(
        { __typename?: 'Address' }
        & Pick<Address, 'feature'>
      )>, userByPartyId?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id'>
      )> }
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
      & Pick<Project, 'id' | 'metadata'>
      & { creditClassByCreditClassId?: Maybe<(
        { __typename?: 'CreditClass' }
        & Pick<CreditClass, 'id'>
        & { methodologyByMethodologyId?: Maybe<(
          { __typename?: 'Methodology' }
          & Pick<Methodology, 'id'>
          & { methodologyVersionsById: (
            { __typename?: 'MethodologyVersionsConnection' }
            & { nodes: Array<Maybe<(
              { __typename?: 'MethodologyVersion' }
              & Pick<MethodologyVersion, 'id' | 'createdAt' | 'name' | 'version'>
            )>> }
          ) }
        )>, creditClassVersionsById: (
          { __typename?: 'CreditClassVersionsConnection' }
          & { nodes: Array<Maybe<(
            { __typename?: 'CreditClassVersion' }
            & Pick<CreditClassVersion, 'id' | 'createdAt' | 'name' | 'version'>
          )>> }
        ) }
      )> }
    )>> }
  )> }
);

export type CreateAddressMutationVariables = Exact<{
  input: CreateAddressInput;
}>;


export type CreateAddressMutation = (
  { __typename?: 'Mutation' }
  & { createAddress?: Maybe<(
    { __typename?: 'CreateAddressPayload' }
    & { address?: Maybe<(
      { __typename?: 'Address' }
      & Pick<Address, 'id'>
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

export type CreateUserOrganizationMutationVariables = Exact<{
  input: CreateUserOrganizationInput;
}>;


export type CreateUserOrganizationMutation = (
  { __typename?: 'Mutation' }
  & { createUserOrganization?: Maybe<(
    { __typename?: 'CreateUserOrganizationPayload' }
    & { organization?: Maybe<(
      { __typename?: 'Organization' }
      & Pick<Organization, 'id'>
      & { partyByPartyId?: Maybe<(
        { __typename?: 'Party' }
        & Pick<Party, 'walletId' | 'addressId'>
      )> }
    )> }
  )> }
);

export type CreateUserOrganizationIfNeededMutationVariables = Exact<{
  input: CreateUserOrganizationIfNeededInput;
}>;


export type CreateUserOrganizationIfNeededMutation = (
  { __typename?: 'Mutation' }
  & { createUserOrganizationIfNeeded?: Maybe<(
    { __typename?: 'CreateUserOrganizationIfNeededPayload' }
    & { organization?: Maybe<(
      { __typename?: 'Organization' }
      & Pick<Organization, 'id'>
      & { partyByPartyId?: Maybe<(
        { __typename?: 'Party' }
        & Pick<Party, 'walletId' | 'addressId'>
      )> }
    )> }
  )> }
);

export type IssueCreditsMutationVariables = Exact<{
  input: IssueCreditsInput;
}>;


export type IssueCreditsMutation = (
  { __typename?: 'Mutation' }
  & { issueCredits?: Maybe<(
    { __typename?: 'IssueCreditsPayload' }
    & Pick<IssueCreditsPayload, 'json'>
  )> }
);

export type TransferCreditsMutationVariables = Exact<{
  input: TransferCreditsInput;
}>;


export type TransferCreditsMutation = (
  { __typename?: 'Mutation' }
  & { transferCredits?: Maybe<(
    { __typename?: 'TransferCreditsPayload' }
    & Pick<TransferCreditsPayload, 'json'>
  )> }
);

export type GetAvailableCreditsQueryVariables = Exact<{
  vintageId?: Maybe<Scalars['UUID']>;
}>;


export type GetAvailableCreditsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getAvailableCredits'>
);

export type GetOrganizationProfileByEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type GetOrganizationProfileByEmailQuery = (
  { __typename?: 'Query' }
  & { userByEmail?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'phoneNumber' | 'partyId'>
    & { partyByPartyId?: Maybe<(
      { __typename?: 'Party' }
      & Pick<Party, 'id' | 'name'>
      & { walletByWalletId?: Maybe<(
        { __typename?: 'Wallet' }
        & Pick<Wallet, 'addr'>
      )> }
    )>, organizationMembersByMemberId: (
      { __typename?: 'OrganizationMembersConnection' }
      & { nodes: Array<Maybe<(
        { __typename?: 'OrganizationMember' }
        & { organizationByOrganizationId?: Maybe<(
          { __typename?: 'Organization' }
          & Pick<Organization, 'id' | 'legalName' | 'partyId'>
          & { partyByPartyId?: Maybe<(
            { __typename?: 'Party' }
            & Pick<Party, 'name' | 'image' | 'description'>
            & { addressByAddressId?: Maybe<(
              { __typename?: 'Address' }
              & Pick<Address, 'id' | 'feature'>
            )> }
          )> }
        )> }
      )>> }
    ) }
  )> }
);

export type ProjectFragment = (
  { __typename?: 'ProjectsConnection' }
  & { nodes: Array<Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'creditClassId' | 'metadata'>
  )>> }
);

export type GetUserProfileByEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type GetUserProfileByEmailQuery = (
  { __typename?: 'Query' }
  & { userByEmail?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email' | 'id' | 'isAdmin' | 'phoneNumber' | 'partyId' | 'roleTitle'>
    & { projectsByCreatorId: (
      { __typename?: 'ProjectsConnection' }
      & ProjectFragment
    ), partyByPartyId?: Maybe<(
      { __typename?: 'Party' }
      & Pick<Party, 'name' | 'walletId' | 'description' | 'image'>
      & { projectsByStewardId: (
        { __typename?: 'ProjectsConnection' }
        & ProjectFragment
      ), projectsByDeveloperId: (
        { __typename?: 'ProjectsConnection' }
        & ProjectFragment
      ), projectsByLandOwnerId: (
        { __typename?: 'ProjectsConnection' }
        & ProjectFragment
      ) }
    )> }
  )> }
);

export type MoreProjectFieldsFragment = (
  { __typename?: 'Project' }
  & Pick<Project, 'handle' | 'metadata'>
  & { creditClassByCreditClassId?: Maybe<(
    { __typename?: 'CreditClass' }
    & Pick<CreditClass, 'uri'>
  )>, partyByRegistryId?: Maybe<(
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

export type PartyFieldsFragment = (
  { __typename?: 'Party' }
  & Pick<Party, 'id' | 'type' | 'name' | 'description' | 'image'>
  & { organizationByPartyId?: Maybe<(
    { __typename?: 'Organization' }
    & OrganizationFieldsFragment
  )>, userByPartyId?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )>, addressByAddressId?: Maybe<(
    { __typename?: 'Address' }
    & Pick<Address, 'id' | 'feature'>
  )>, walletByWalletId?: Maybe<(
    { __typename?: 'Wallet' }
    & Pick<Wallet, 'addr'>
  )> }
);

export type OrganizationFieldsFragment = (
  { __typename?: 'Organization' }
  & Pick<Organization, 'id'>
  & { organizationMembersByOrganizationId: (
    { __typename?: 'OrganizationMembersConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'OrganizationMember' }
      & { userByMemberId?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'partyId'>
        & { partyByPartyId?: Maybe<(
          { __typename?: 'Party' }
          & Pick<Party, 'name' | 'roles'>
        )> }
      )> }
    )>> }
  ) }
);

export type CreditVintageFieldsFragment = (
  { __typename?: 'CreditVintage' }
  & Pick<CreditVintage, 'id' | 'createdAt' | 'startDate' | 'endDate' | 'initialDistribution' | 'units' | 'certificateLink' | 'txHash'>
  & { creditClassVersionByCreditClassVersionIdAndCreditClassVersionCreatedAt?: Maybe<(
    { __typename?: 'CreditClassVersion' }
    & Pick<CreditClassVersion, 'name' | 'version' | 'metadata' | 'documentId'>
  )>, methodologyVersionByMethodologyVersionIdAndMethodologyVersionCreatedAt?: Maybe<(
    { __typename?: 'MethodologyVersion' }
    & Pick<MethodologyVersion, 'name' | 'version' | 'documentId'>
  )>, walletByTokenizerId?: Maybe<(
    { __typename?: 'Wallet' }
    & Pick<Wallet, 'addr'>
    & { partiesByWalletId: (
      { __typename?: 'PartiesConnection' }
      & { nodes: Array<Maybe<(
        { __typename?: 'Party' }
        & PartyFieldsFragment
      )>> }
    ) }
  )> }
);

export type ProjectByHandleQueryVariables = Exact<{
  handle: Scalars['String'];
}>;


export type ProjectByHandleQuery = (
  { __typename?: 'Query' }
  & { projectByHandle?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'metadata'>
    & { eventsByProjectId: (
      { __typename?: 'EventsConnection' }
      & { nodes: Array<Maybe<(
        { __typename?: 'Event' }
        & Pick<Event, 'date' | 'summary' | 'description'>
        & { creditVintageByEventId?: Maybe<(
          { __typename?: 'CreditVintage' }
          & CreditVintageFieldsFragment
        )> }
      )>> }
    ), partyByRegistryId?: Maybe<(
      { __typename?: 'Party' }
      & Pick<Party, 'name'>
      & { organizationByPartyId?: Maybe<(
        { __typename?: 'Organization' }
        & Pick<Organization, 'website'>
      )> }
    )>, creditClassByCreditClassId?: Maybe<(
      { __typename?: 'CreditClass' }
      & Pick<CreditClass, 'standard'>
      & { creditClassVersionsById: (
        { __typename?: 'CreditClassVersionsConnection' }
        & { nodes: Array<Maybe<(
          { __typename?: 'CreditClassVersion' }
          & Pick<CreditClassVersion, 'name' | 'metadata'>
        )>> }
      ), methodologyByMethodologyId?: Maybe<(
        { __typename?: 'Methodology' }
        & { methodologyVersionsById: (
          { __typename?: 'MethodologyVersionsConnection' }
          & { nodes: Array<Maybe<(
            { __typename?: 'MethodologyVersion' }
            & Pick<MethodologyVersion, 'name' | 'metadata'>
          )>> }
        ) }
      )> }
    )>, partyByDeveloperId?: Maybe<(
      { __typename?: 'Party' }
      & PartyFieldsFragment
    )>, partyByStewardId?: Maybe<(
      { __typename?: 'Party' }
      & PartyFieldsFragment
    )>, partyByLandOwnerId?: Maybe<(
      { __typename?: 'Party' }
      & PartyFieldsFragment
    )>, partyByIssuerId?: Maybe<(
      { __typename?: 'Party' }
      & PartyFieldsFragment
    )>, partyByResellerId?: Maybe<(
      { __typename?: 'Party' }
      & PartyFieldsFragment
    )>, documentsByProjectId: (
      { __typename?: 'DocumentsConnection' }
      & { nodes: Array<Maybe<(
        { __typename?: 'Document' }
        & Pick<Document, 'name' | 'type' | 'date' | 'url'>
        & { eventByEventId?: Maybe<(
          { __typename?: 'Event' }
          & Pick<Event, 'date' | 'summary' | 'description'>
          & { creditVintageByEventId?: Maybe<(
            { __typename?: 'CreditVintage' }
            & CreditVintageFieldsFragment
          )> }
        )> }
      )>> }
    ) }
  )> }
);

export type ProjectByIdQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type ProjectByIdQuery = (
  { __typename?: 'Query' }
  & { projectById?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'metadata' | 'developerId' | 'originatorId' | 'landOwnerId' | 'stewardId' | 'addressId'>
    & { partyByDeveloperId?: Maybe<(
      { __typename?: 'Party' }
      & PartyFieldsFragment
    )>, partyByStewardId?: Maybe<(
      { __typename?: 'Party' }
      & PartyFieldsFragment
    )>, partyByLandOwnerId?: Maybe<(
      { __typename?: 'Party' }
      & PartyFieldsFragment
    )>, partyByOriginatorId?: Maybe<(
      { __typename?: 'Party' }
      & PartyFieldsFragment
    )>, creditClassByCreditClassId?: Maybe<(
      { __typename?: 'CreditClass' }
      & Pick<CreditClass, 'id'>
      & { creditClassVersionsById: (
        { __typename?: 'CreditClassVersionsConnection' }
        & { nodes: Array<Maybe<(
          { __typename?: 'CreditClassVersion' }
          & Pick<CreditClassVersion, 'name' | 'version' | 'metadata'>
        )>> }
      ) }
    )> }
  )> }
);

export type AllPurchasesByWalletIdQueryVariables = Exact<{
  buyerWalletId?: Maybe<Scalars['UUID']>;
}>;


export type AllPurchasesByWalletIdQuery = (
  { __typename?: 'Query' }
  & { allPurchases?: Maybe<(
    { __typename?: 'PurchasesConnection' }
    & PurchasesFieldsFragment
  )> }
);

export type AllPurchasesByStripeIdQueryVariables = Exact<{
  stripeId?: Maybe<Scalars['String']>;
}>;


export type AllPurchasesByStripeIdQuery = (
  { __typename?: 'Query' }
  & { allPurchases?: Maybe<(
    { __typename?: 'PurchasesConnection' }
    & PurchasesFieldsFragment
  )> }
);

export type PurchasesFieldsFragment = (
  { __typename?: 'PurchasesConnection' }
  & { nodes: Array<Maybe<(
    { __typename?: 'Purchase' }
    & Pick<Purchase, 'id' | 'createdAt' | 'buyerWalletId'>
    & { walletByBuyerWalletId?: Maybe<(
      { __typename?: 'Wallet' }
      & { partiesByWalletId: (
        { __typename?: 'PartiesConnection' }
        & { nodes: Array<Maybe<(
          { __typename?: 'Party' }
          & Pick<Party, 'name'>
        )>> }
      ) }
    )>, transactionsByPurchaseId: (
      { __typename?: 'TransactionsConnection' }
      & { nodes: Array<Maybe<(
        { __typename?: 'Transaction' }
        & Pick<Transaction, 'units'>
      )>> }
    ), creditVintageByCreditVintageId?: Maybe<(
      { __typename?: 'CreditVintage' }
      & Pick<CreditVintage, 'id' | 'startDate' | 'endDate' | 'initialDistribution' | 'metadata'>
      & { retirementsByCreditVintageId: (
        { __typename?: 'RetirementsConnection' }
        & { nodes: Array<Maybe<(
          { __typename?: 'Retirement' }
          & Pick<Retirement, 'walletId' | 'metadata'>
        )>> }
      ), walletByTokenizerId?: Maybe<(
        { __typename?: 'Wallet' }
        & { partiesByWalletId: (
          { __typename?: 'PartiesConnection' }
          & { nodes: Array<Maybe<(
            { __typename?: 'Party' }
            & Pick<Party, 'name'>
            & { organizationByPartyId?: Maybe<(
              { __typename?: 'Organization' }
              & Pick<Organization, 'id'>
              & { organizationMembersByOrganizationId: (
                { __typename?: 'OrganizationMembersConnection' }
                & { nodes: Array<Maybe<(
                  { __typename?: 'OrganizationMember' }
                  & Pick<OrganizationMember, 'roles'>
                  & { userByMemberId?: Maybe<(
                    { __typename?: 'User' }
                    & { partyByPartyId?: Maybe<(
                      { __typename?: 'Party' }
                      & Pick<Party, 'name' | 'roles'>
                    )> }
                  )> }
                )>> }
              ) }
            )> }
          )>> }
        ) }
      )>, partyByIssuerId?: Maybe<(
        { __typename?: 'Party' }
        & Pick<Party, 'name' | 'image'>
      )>, creditClassVersionByCreditClassVersionIdAndCreditClassVersionCreatedAt?: Maybe<(
        { __typename?: 'CreditClassVersion' }
        & Pick<CreditClassVersion, 'name' | 'version' | 'metadata' | 'documentId'>
        & { creditClassById?: Maybe<(
          { __typename?: 'CreditClass' }
          & Pick<CreditClass, 'standard'>
        )> }
      )>, methodologyVersionByMethodologyVersionIdAndMethodologyVersionCreatedAt?: Maybe<(
        { __typename?: 'MethodologyVersion' }
        & Pick<MethodologyVersion, 'name' | 'version' | 'metadata' | 'documentId'>
      )>, projectByProjectId?: Maybe<(
        { __typename?: 'Project' }
        & Pick<Project, 'type' | 'handle' | 'metadata'>
        & { addressByAddressId?: Maybe<(
          { __typename?: 'Address' }
          & Pick<Address, 'feature'>
        )>, partyByLandOwnerId?: Maybe<(
          { __typename?: 'Party' }
          & ProjectPartyFragment
        )>, partyByStewardId?: Maybe<(
          { __typename?: 'Party' }
          & ProjectPartyFragment
        )>, partyByDeveloperId?: Maybe<(
          { __typename?: 'Party' }
          & ProjectPartyFragment
        )> }
      )> }
    )> }
  )>> }
);

export type ProjectPartyFragment = (
  { __typename?: 'Party' }
  & Pick<Party, 'id' | 'name'>
  & { organizationByPartyId?: Maybe<(
    { __typename?: 'Organization' }
    & Pick<Organization, 'id'>
    & { organizationMembersByOrganizationId: (
      { __typename?: 'OrganizationMembersConnection' }
      & { nodes: Array<Maybe<(
        { __typename?: 'OrganizationMember' }
        & Pick<OrganizationMember, 'roles'>
        & { userByMemberId?: Maybe<(
          { __typename?: 'User' }
          & { partyByPartyId?: Maybe<(
            { __typename?: 'Party' }
            & Pick<Party, 'name' | 'roles'>
          )> }
        )> }
      )>> }
    ) }
  )> }
);

export type ReallyCreateOrganizationMutationVariables = Exact<{
  input: ReallyCreateOrganizationInput;
}>;


export type ReallyCreateOrganizationMutation = (
  { __typename?: 'Mutation' }
  & { reallyCreateOrganization?: Maybe<(
    { __typename?: 'ReallyCreateOrganizationPayload' }
    & { organization?: Maybe<(
      { __typename?: 'Organization' }
      & Pick<Organization, 'id' | 'partyId'>
      & { partyByPartyId?: Maybe<(
        { __typename?: 'Party' }
        & Pick<Party, 'addressId'>
      )> }
    )> }
  )> }
);

export type ReallyCreateUserMutationVariables = Exact<{
  input: ReallyCreateUserInput;
}>;


export type ReallyCreateUserMutation = (
  { __typename?: 'Mutation' }
  & { reallyCreateUser?: Maybe<(
    { __typename?: 'ReallyCreateUserPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'partyId'>
      & { partyByPartyId?: Maybe<(
        { __typename?: 'Party' }
        & Pick<Party, 'walletId' | 'addressId'>
      )> }
    )> }
  )> }
);

export type ReallyCreateUserIfNeededMutationVariables = Exact<{
  input: ReallyCreateUserIfNeededInput;
}>;


export type ReallyCreateUserIfNeededMutation = (
  { __typename?: 'Mutation' }
  & { reallyCreateUserIfNeeded?: Maybe<(
    { __typename?: 'ReallyCreateUserIfNeededPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
      & { partyByPartyId?: Maybe<(
        { __typename?: 'Party' }
        & Pick<Party, 'walletId' | 'addressId'>
      )> }
    )> }
  )> }
);

export type RetireCreditsMutationVariables = Exact<{
  input: RetireCreditsInput;
}>;


export type RetireCreditsMutation = (
  { __typename?: 'Mutation' }
  & { retireCredits?: Maybe<(
    { __typename?: 'RetireCreditsPayload' }
    & { retirement?: Maybe<(
      { __typename?: 'Retirement' }
      & Pick<Retirement, 'id'>
    )> }
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

export type UpdateAddressByIdMutationVariables = Exact<{
  input: UpdateAddressByIdInput;
}>;


export type UpdateAddressByIdMutation = (
  { __typename?: 'Mutation' }
  & { updateAddressById?: Maybe<(
    { __typename?: 'UpdateAddressPayload' }
    & { address?: Maybe<(
      { __typename?: 'Address' }
      & Pick<Address, 'id' | 'feature'>
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

export type UpdateUserByEmailMutationVariables = Exact<{
  input: UpdateUserByEmailInput;
}>;


export type UpdateUserByEmailMutation = (
  { __typename?: 'Mutation' }
  & { updateUserByEmail?: Maybe<(
    { __typename?: 'UpdateUserPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'partyId' | 'phoneNumber' | 'roleTitle'>
    )>, partyByPartyId?: Maybe<(
      { __typename?: 'Party' }
      & Pick<Party, 'name' | 'description' | 'image'>
    )> }
  )> }
);

export type UpdateUserByIdMutationVariables = Exact<{
  input: UpdateUserByIdInput;
}>;


export type UpdateUserByIdMutation = (
  { __typename?: 'Mutation' }
  & { updateUserById?: Maybe<(
    { __typename?: 'UpdateUserPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )> }
  )> }
);

export const ProjectFragmentDoc = gql`
    fragment project on ProjectsConnection {
  nodes {
    id
    creditClassId
    metadata
  }
}
    `;
export const MoreProjectFieldsFragmentDoc = gql`
    fragment moreProjectFields on Project {
  handle
  metadata
  creditClassByCreditClassId {
    uri
  }
  partyByRegistryId {
    name
    image
    type
  }
}
    `;
export const OrganizationFieldsFragmentDoc = gql`
    fragment organizationFields on Organization {
  id
  organizationMembersByOrganizationId(condition: {isOwner: true}) {
    nodes {
      userByMemberId {
        id
        partyId
        partyByPartyId {
          name
          roles
        }
      }
    }
  }
}
    `;
export const PartyFieldsFragmentDoc = gql`
    fragment partyFields on Party {
  id
  type
  name
  description
  image
  organizationByPartyId {
    ...organizationFields
  }
  userByPartyId {
    id
  }
  addressByAddressId {
    id
    feature
  }
  walletByWalletId {
    addr
  }
}
    ${OrganizationFieldsFragmentDoc}`;
export const CreditVintageFieldsFragmentDoc = gql`
    fragment creditVintageFields on CreditVintage {
  id
  createdAt
  startDate
  endDate
  initialDistribution
  units
  certificateLink
  txHash
  creditClassVersionByCreditClassVersionIdAndCreditClassVersionCreatedAt {
    name
    version
    metadata
    documentId
  }
  methodologyVersionByMethodologyVersionIdAndMethodologyVersionCreatedAt {
    name
    version
    documentId
  }
  walletByTokenizerId {
    addr
    partiesByWalletId(first: 1) {
      nodes {
        ...partyFields
      }
    }
  }
}
    ${PartyFieldsFragmentDoc}`;
export const ProjectPartyFragmentDoc = gql`
    fragment projectParty on Party {
  id
  name
  organizationByPartyId {
    id
    organizationMembersByOrganizationId(condition: {isOwner: true}) {
      nodes {
        roles
        userByMemberId {
          partyByPartyId {
            name
            roles
          }
        }
      }
    }
  }
}
    `;
export const PurchasesFieldsFragmentDoc = gql`
    fragment purchasesFields on PurchasesConnection {
  nodes {
    id
    createdAt
    buyerWalletId
    walletByBuyerWalletId {
      partiesByWalletId(first: 1) {
        nodes {
          name
        }
      }
    }
    transactionsByPurchaseId {
      nodes {
        units
      }
    }
    creditVintageByCreditVintageId {
      id
      startDate
      endDate
      initialDistribution
      metadata
      retirementsByCreditVintageId {
        nodes {
          walletId
          metadata
        }
      }
      walletByTokenizerId {
        partiesByWalletId(first: 1) {
          nodes {
            name
            organizationByPartyId {
              id
              organizationMembersByOrganizationId(condition: {isOwner: true}) {
                nodes {
                  roles
                  userByMemberId {
                    partyByPartyId {
                      name
                      roles
                    }
                  }
                }
              }
            }
          }
        }
      }
      partyByIssuerId {
        name
        image
      }
      creditClassVersionByCreditClassVersionIdAndCreditClassVersionCreatedAt {
        name
        version
        metadata
        documentId
        creditClassById {
          standard
        }
      }
      methodologyVersionByMethodologyVersionIdAndMethodologyVersionCreatedAt {
        name
        version
        metadata
        documentId
      }
      projectByProjectId {
        type
        handle
        metadata
        addressByAddressId {
          feature
        }
        partyByLandOwnerId {
          ...projectParty
        }
        partyByStewardId {
          ...projectParty
        }
        partyByDeveloperId {
          ...projectParty
        }
      }
    }
  }
}
    ${ProjectPartyFragmentDoc}`;
export const AllCreditClassesDocument = gql`
    query AllCreditClasses {
  allCreditClasses {
    nodes {
      id
      uri
      standard
      creditClassVersionsById(orderBy: CREATED_AT_DESC, first: 1) {
        nodes {
          name
          description
          image
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
export const AllCreditVintagesDocument = gql`
    query AllCreditVintages {
  allCreditVintages {
    nodes {
      id
      createdAt
      creditClassByCreditClassId {
        creditClassVersionsById(last: 1) {
          nodes {
            name
            createdAt
          }
        }
      }
      projectByProjectId {
        metadata
        developerId
        stewardId
        landOwnerId
        partyByLandOwnerId {
          name
        }
        partyByStewardId {
          name
        }
        partyByDeveloperId {
          name
        }
      }
      initialDistribution
      accountBalancesByCreditVintageId {
        nodes {
          id
          walletId
          liquidBalance
        }
      }
    }
  }
}
    `;

/**
 * __useAllCreditVintagesQuery__
 *
 * To run a query within a React component, call `useAllCreditVintagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCreditVintagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCreditVintagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllCreditVintagesQuery(baseOptions?: Apollo.QueryHookOptions<AllCreditVintagesQuery, AllCreditVintagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllCreditVintagesQuery, AllCreditVintagesQueryVariables>(AllCreditVintagesDocument, options);
      }
export function useAllCreditVintagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCreditVintagesQuery, AllCreditVintagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllCreditVintagesQuery, AllCreditVintagesQueryVariables>(AllCreditVintagesDocument, options);
        }
export type AllCreditVintagesQueryHookResult = ReturnType<typeof useAllCreditVintagesQuery>;
export type AllCreditVintagesLazyQueryHookResult = ReturnType<typeof useAllCreditVintagesLazyQuery>;
export type AllCreditVintagesQueryResult = Apollo.QueryResult<AllCreditVintagesQuery, AllCreditVintagesQueryVariables>;
export const AllPartiesDocument = gql`
    query AllParties {
  allParties {
    nodes {
      id
      type
      name
      walletId
      addressId
      addressByAddressId {
        feature
      }
      userByPartyId {
        id
      }
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
      metadata
      creditClassByCreditClassId {
        id
        methodologyByMethodologyId {
          id
          methodologyVersionsById {
            nodes {
              id
              createdAt
              name
              version
            }
          }
        }
        creditClassVersionsById {
          nodes {
            id
            createdAt
            name
            version
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
export const CreateAddressDocument = gql`
    mutation CreateAddress($input: CreateAddressInput!) {
  createAddress(input: $input) {
    address {
      id
    }
  }
}
    `;
export type CreateAddressMutationFn = Apollo.MutationFunction<CreateAddressMutation, CreateAddressMutationVariables>;

/**
 * __useCreateAddressMutation__
 *
 * To run a mutation, you first call `useCreateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAddressMutation, { data, loading, error }] = useCreateAddressMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAddressMutation(baseOptions?: Apollo.MutationHookOptions<CreateAddressMutation, CreateAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAddressMutation, CreateAddressMutationVariables>(CreateAddressDocument, options);
      }
export type CreateAddressMutationHookResult = ReturnType<typeof useCreateAddressMutation>;
export type CreateAddressMutationResult = Apollo.MutationResult<CreateAddressMutation>;
export type CreateAddressMutationOptions = Apollo.BaseMutationOptions<CreateAddressMutation, CreateAddressMutationVariables>;
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
export const CreateUserOrganizationDocument = gql`
    mutation CreateUserOrganization($input: CreateUserOrganizationInput!) {
  createUserOrganization(input: $input) {
    organization {
      id
      partyByPartyId {
        walletId
        addressId
      }
    }
  }
}
    `;
export type CreateUserOrganizationMutationFn = Apollo.MutationFunction<CreateUserOrganizationMutation, CreateUserOrganizationMutationVariables>;

/**
 * __useCreateUserOrganizationMutation__
 *
 * To run a mutation, you first call `useCreateUserOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserOrganizationMutation, { data, loading, error }] = useCreateUserOrganizationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserOrganizationMutation, CreateUserOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserOrganizationMutation, CreateUserOrganizationMutationVariables>(CreateUserOrganizationDocument, options);
      }
export type CreateUserOrganizationMutationHookResult = ReturnType<typeof useCreateUserOrganizationMutation>;
export type CreateUserOrganizationMutationResult = Apollo.MutationResult<CreateUserOrganizationMutation>;
export type CreateUserOrganizationMutationOptions = Apollo.BaseMutationOptions<CreateUserOrganizationMutation, CreateUserOrganizationMutationVariables>;
export const CreateUserOrganizationIfNeededDocument = gql`
    mutation CreateUserOrganizationIfNeeded($input: CreateUserOrganizationIfNeededInput!) {
  createUserOrganizationIfNeeded(input: $input) {
    organization {
      id
      partyByPartyId {
        walletId
        addressId
      }
    }
  }
}
    `;
export type CreateUserOrganizationIfNeededMutationFn = Apollo.MutationFunction<CreateUserOrganizationIfNeededMutation, CreateUserOrganizationIfNeededMutationVariables>;

/**
 * __useCreateUserOrganizationIfNeededMutation__
 *
 * To run a mutation, you first call `useCreateUserOrganizationIfNeededMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserOrganizationIfNeededMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserOrganizationIfNeededMutation, { data, loading, error }] = useCreateUserOrganizationIfNeededMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserOrganizationIfNeededMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserOrganizationIfNeededMutation, CreateUserOrganizationIfNeededMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserOrganizationIfNeededMutation, CreateUserOrganizationIfNeededMutationVariables>(CreateUserOrganizationIfNeededDocument, options);
      }
export type CreateUserOrganizationIfNeededMutationHookResult = ReturnType<typeof useCreateUserOrganizationIfNeededMutation>;
export type CreateUserOrganizationIfNeededMutationResult = Apollo.MutationResult<CreateUserOrganizationIfNeededMutation>;
export type CreateUserOrganizationIfNeededMutationOptions = Apollo.BaseMutationOptions<CreateUserOrganizationIfNeededMutation, CreateUserOrganizationIfNeededMutationVariables>;
export const IssueCreditsDocument = gql`
    mutation IssueCredits($input: IssueCreditsInput!) {
  issueCredits(input: $input) {
    json
  }
}
    `;
export type IssueCreditsMutationFn = Apollo.MutationFunction<IssueCreditsMutation, IssueCreditsMutationVariables>;

/**
 * __useIssueCreditsMutation__
 *
 * To run a mutation, you first call `useIssueCreditsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIssueCreditsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [issueCreditsMutation, { data, loading, error }] = useIssueCreditsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useIssueCreditsMutation(baseOptions?: Apollo.MutationHookOptions<IssueCreditsMutation, IssueCreditsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IssueCreditsMutation, IssueCreditsMutationVariables>(IssueCreditsDocument, options);
      }
export type IssueCreditsMutationHookResult = ReturnType<typeof useIssueCreditsMutation>;
export type IssueCreditsMutationResult = Apollo.MutationResult<IssueCreditsMutation>;
export type IssueCreditsMutationOptions = Apollo.BaseMutationOptions<IssueCreditsMutation, IssueCreditsMutationVariables>;
export const TransferCreditsDocument = gql`
    mutation TransferCredits($input: TransferCreditsInput!) {
  transferCredits(input: $input) {
    json
  }
}
    `;
export type TransferCreditsMutationFn = Apollo.MutationFunction<TransferCreditsMutation, TransferCreditsMutationVariables>;

/**
 * __useTransferCreditsMutation__
 *
 * To run a mutation, you first call `useTransferCreditsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTransferCreditsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transferCreditsMutation, { data, loading, error }] = useTransferCreditsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTransferCreditsMutation(baseOptions?: Apollo.MutationHookOptions<TransferCreditsMutation, TransferCreditsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TransferCreditsMutation, TransferCreditsMutationVariables>(TransferCreditsDocument, options);
      }
export type TransferCreditsMutationHookResult = ReturnType<typeof useTransferCreditsMutation>;
export type TransferCreditsMutationResult = Apollo.MutationResult<TransferCreditsMutation>;
export type TransferCreditsMutationOptions = Apollo.BaseMutationOptions<TransferCreditsMutation, TransferCreditsMutationVariables>;
export const GetAvailableCreditsDocument = gql`
    query GetAvailableCredits($vintageId: UUID) {
  getAvailableCredits(vintageId: $vintageId)
}
    `;

/**
 * __useGetAvailableCreditsQuery__
 *
 * To run a query within a React component, call `useGetAvailableCreditsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAvailableCreditsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAvailableCreditsQuery({
 *   variables: {
 *      vintageId: // value for 'vintageId'
 *   },
 * });
 */
export function useGetAvailableCreditsQuery(baseOptions?: Apollo.QueryHookOptions<GetAvailableCreditsQuery, GetAvailableCreditsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAvailableCreditsQuery, GetAvailableCreditsQueryVariables>(GetAvailableCreditsDocument, options);
      }
export function useGetAvailableCreditsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAvailableCreditsQuery, GetAvailableCreditsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAvailableCreditsQuery, GetAvailableCreditsQueryVariables>(GetAvailableCreditsDocument, options);
        }
export type GetAvailableCreditsQueryHookResult = ReturnType<typeof useGetAvailableCreditsQuery>;
export type GetAvailableCreditsLazyQueryHookResult = ReturnType<typeof useGetAvailableCreditsLazyQuery>;
export type GetAvailableCreditsQueryResult = Apollo.QueryResult<GetAvailableCreditsQuery, GetAvailableCreditsQueryVariables>;
export const GetOrganizationProfileByEmailDocument = gql`
    query GetOrganizationProfileByEmail($email: String!) {
  userByEmail(email: $email) {
    id
    email
    phoneNumber
    partyId
    partyByPartyId {
      id
      name
      walletByWalletId {
        addr
      }
    }
    organizationMembersByMemberId(condition: {isOwner: true}) {
      nodes {
        organizationByOrganizationId {
          id
          legalName
          partyId
          partyByPartyId {
            name
            image
            description
            addressByAddressId {
              id
              feature
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetOrganizationProfileByEmailQuery__
 *
 * To run a query within a React component, call `useGetOrganizationProfileByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationProfileByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationProfileByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetOrganizationProfileByEmailQuery(baseOptions: Apollo.QueryHookOptions<GetOrganizationProfileByEmailQuery, GetOrganizationProfileByEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganizationProfileByEmailQuery, GetOrganizationProfileByEmailQueryVariables>(GetOrganizationProfileByEmailDocument, options);
      }
export function useGetOrganizationProfileByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizationProfileByEmailQuery, GetOrganizationProfileByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganizationProfileByEmailQuery, GetOrganizationProfileByEmailQueryVariables>(GetOrganizationProfileByEmailDocument, options);
        }
export type GetOrganizationProfileByEmailQueryHookResult = ReturnType<typeof useGetOrganizationProfileByEmailQuery>;
export type GetOrganizationProfileByEmailLazyQueryHookResult = ReturnType<typeof useGetOrganizationProfileByEmailLazyQuery>;
export type GetOrganizationProfileByEmailQueryResult = Apollo.QueryResult<GetOrganizationProfileByEmailQuery, GetOrganizationProfileByEmailQueryVariables>;
export const GetUserProfileByEmailDocument = gql`
    query GetUserProfileByEmail($email: String!) {
  userByEmail(email: $email) {
    email
    id
    isAdmin
    phoneNumber
    partyId
    roleTitle
    projectsByCreatorId {
      ...project
    }
    partyByPartyId {
      name
      walletId
      description
      image
      projectsByStewardId {
        ...project
      }
      projectsByDeveloperId {
        ...project
      }
      projectsByLandOwnerId {
        ...project
      }
    }
  }
}
    ${ProjectFragmentDoc}`;

/**
 * __useGetUserProfileByEmailQuery__
 *
 * To run a query within a React component, call `useGetUserProfileByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProfileByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProfileByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetUserProfileByEmailQuery(baseOptions: Apollo.QueryHookOptions<GetUserProfileByEmailQuery, GetUserProfileByEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserProfileByEmailQuery, GetUserProfileByEmailQueryVariables>(GetUserProfileByEmailDocument, options);
      }
export function useGetUserProfileByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserProfileByEmailQuery, GetUserProfileByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserProfileByEmailQuery, GetUserProfileByEmailQueryVariables>(GetUserProfileByEmailDocument, options);
        }
export type GetUserProfileByEmailQueryHookResult = ReturnType<typeof useGetUserProfileByEmailQuery>;
export type GetUserProfileByEmailLazyQueryHookResult = ReturnType<typeof useGetUserProfileByEmailLazyQuery>;
export type GetUserProfileByEmailQueryResult = Apollo.QueryResult<GetUserProfileByEmailQuery, GetUserProfileByEmailQueryVariables>;
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
export const ProjectByHandleDocument = gql`
    query ProjectByHandle($handle: String!) {
  projectByHandle(handle: $handle) {
    eventsByProjectId(orderBy: DATE_ASC) {
      nodes {
        date
        summary
        description
        creditVintageByEventId {
          ...creditVintageFields
        }
      }
    }
    metadata
    partyByRegistryId {
      name
      organizationByPartyId {
        website
      }
    }
    creditClassByCreditClassId {
      standard
      creditClassVersionsById(orderBy: CREATED_AT_DESC, first: 1) {
        nodes {
          name
          metadata
        }
      }
      methodologyByMethodologyId {
        methodologyVersionsById(orderBy: CREATED_AT_DESC, first: 1) {
          nodes {
            name
            metadata
          }
        }
      }
    }
    partyByDeveloperId {
      ...partyFields
    }
    partyByStewardId {
      ...partyFields
    }
    partyByLandOwnerId {
      ...partyFields
    }
    partyByIssuerId {
      ...partyFields
    }
    partyByResellerId {
      ...partyFields
    }
    documentsByProjectId {
      nodes {
        name
        type
        date
        url
        eventByEventId {
          date
          summary
          description
          creditVintageByEventId {
            ...creditVintageFields
          }
        }
      }
    }
  }
}
    ${CreditVintageFieldsFragmentDoc}
${PartyFieldsFragmentDoc}`;

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
    metadata
    developerId
    originatorId
    landOwnerId
    stewardId
    addressId
    partyByDeveloperId {
      ...partyFields
    }
    partyByStewardId {
      ...partyFields
    }
    partyByLandOwnerId {
      ...partyFields
    }
    partyByOriginatorId {
      ...partyFields
    }
    creditClassByCreditClassId {
      id
      creditClassVersionsById(orderBy: CREATED_AT_DESC, first: 1) {
        nodes {
          name
          version
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
export const AllPurchasesByWalletIdDocument = gql`
    query AllPurchasesByWalletId($buyerWalletId: UUID) {
  allPurchases(first: 5, condition: {buyerWalletId: $buyerWalletId}) {
    ...purchasesFields
  }
}
    ${PurchasesFieldsFragmentDoc}`;

/**
 * __useAllPurchasesByWalletIdQuery__
 *
 * To run a query within a React component, call `useAllPurchasesByWalletIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPurchasesByWalletIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPurchasesByWalletIdQuery({
 *   variables: {
 *      buyerWalletId: // value for 'buyerWalletId'
 *   },
 * });
 */
export function useAllPurchasesByWalletIdQuery(baseOptions?: Apollo.QueryHookOptions<AllPurchasesByWalletIdQuery, AllPurchasesByWalletIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPurchasesByWalletIdQuery, AllPurchasesByWalletIdQueryVariables>(AllPurchasesByWalletIdDocument, options);
      }
export function useAllPurchasesByWalletIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPurchasesByWalletIdQuery, AllPurchasesByWalletIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPurchasesByWalletIdQuery, AllPurchasesByWalletIdQueryVariables>(AllPurchasesByWalletIdDocument, options);
        }
export type AllPurchasesByWalletIdQueryHookResult = ReturnType<typeof useAllPurchasesByWalletIdQuery>;
export type AllPurchasesByWalletIdLazyQueryHookResult = ReturnType<typeof useAllPurchasesByWalletIdLazyQuery>;
export type AllPurchasesByWalletIdQueryResult = Apollo.QueryResult<AllPurchasesByWalletIdQuery, AllPurchasesByWalletIdQueryVariables>;
export const AllPurchasesByStripeIdDocument = gql`
    query AllPurchasesByStripeId($stripeId: String) {
  allPurchases(first: 5, condition: {stripeId: $stripeId}) {
    ...purchasesFields
  }
}
    ${PurchasesFieldsFragmentDoc}`;

/**
 * __useAllPurchasesByStripeIdQuery__
 *
 * To run a query within a React component, call `useAllPurchasesByStripeIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPurchasesByStripeIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPurchasesByStripeIdQuery({
 *   variables: {
 *      stripeId: // value for 'stripeId'
 *   },
 * });
 */
export function useAllPurchasesByStripeIdQuery(baseOptions?: Apollo.QueryHookOptions<AllPurchasesByStripeIdQuery, AllPurchasesByStripeIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPurchasesByStripeIdQuery, AllPurchasesByStripeIdQueryVariables>(AllPurchasesByStripeIdDocument, options);
      }
export function useAllPurchasesByStripeIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPurchasesByStripeIdQuery, AllPurchasesByStripeIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPurchasesByStripeIdQuery, AllPurchasesByStripeIdQueryVariables>(AllPurchasesByStripeIdDocument, options);
        }
export type AllPurchasesByStripeIdQueryHookResult = ReturnType<typeof useAllPurchasesByStripeIdQuery>;
export type AllPurchasesByStripeIdLazyQueryHookResult = ReturnType<typeof useAllPurchasesByStripeIdLazyQuery>;
export type AllPurchasesByStripeIdQueryResult = Apollo.QueryResult<AllPurchasesByStripeIdQuery, AllPurchasesByStripeIdQueryVariables>;
export const ReallyCreateOrganizationDocument = gql`
    mutation ReallyCreateOrganization($input: ReallyCreateOrganizationInput!) {
  reallyCreateOrganization(input: $input) {
    organization {
      id
      partyId
      partyByPartyId {
        addressId
      }
    }
  }
}
    `;
export type ReallyCreateOrganizationMutationFn = Apollo.MutationFunction<ReallyCreateOrganizationMutation, ReallyCreateOrganizationMutationVariables>;

/**
 * __useReallyCreateOrganizationMutation__
 *
 * To run a mutation, you first call `useReallyCreateOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReallyCreateOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reallyCreateOrganizationMutation, { data, loading, error }] = useReallyCreateOrganizationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReallyCreateOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<ReallyCreateOrganizationMutation, ReallyCreateOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReallyCreateOrganizationMutation, ReallyCreateOrganizationMutationVariables>(ReallyCreateOrganizationDocument, options);
      }
export type ReallyCreateOrganizationMutationHookResult = ReturnType<typeof useReallyCreateOrganizationMutation>;
export type ReallyCreateOrganizationMutationResult = Apollo.MutationResult<ReallyCreateOrganizationMutation>;
export type ReallyCreateOrganizationMutationOptions = Apollo.BaseMutationOptions<ReallyCreateOrganizationMutation, ReallyCreateOrganizationMutationVariables>;
export const ReallyCreateUserDocument = gql`
    mutation ReallyCreateUser($input: ReallyCreateUserInput!) {
  reallyCreateUser(input: $input) {
    user {
      id
      partyId
      partyByPartyId {
        walletId
        addressId
      }
    }
  }
}
    `;
export type ReallyCreateUserMutationFn = Apollo.MutationFunction<ReallyCreateUserMutation, ReallyCreateUserMutationVariables>;

/**
 * __useReallyCreateUserMutation__
 *
 * To run a mutation, you first call `useReallyCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReallyCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reallyCreateUserMutation, { data, loading, error }] = useReallyCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReallyCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<ReallyCreateUserMutation, ReallyCreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReallyCreateUserMutation, ReallyCreateUserMutationVariables>(ReallyCreateUserDocument, options);
      }
export type ReallyCreateUserMutationHookResult = ReturnType<typeof useReallyCreateUserMutation>;
export type ReallyCreateUserMutationResult = Apollo.MutationResult<ReallyCreateUserMutation>;
export type ReallyCreateUserMutationOptions = Apollo.BaseMutationOptions<ReallyCreateUserMutation, ReallyCreateUserMutationVariables>;
export const ReallyCreateUserIfNeededDocument = gql`
    mutation ReallyCreateUserIfNeeded($input: ReallyCreateUserIfNeededInput!) {
  reallyCreateUserIfNeeded(input: $input) {
    user {
      id
      partyByPartyId {
        walletId
        addressId
      }
    }
  }
}
    `;
export type ReallyCreateUserIfNeededMutationFn = Apollo.MutationFunction<ReallyCreateUserIfNeededMutation, ReallyCreateUserIfNeededMutationVariables>;

/**
 * __useReallyCreateUserIfNeededMutation__
 *
 * To run a mutation, you first call `useReallyCreateUserIfNeededMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReallyCreateUserIfNeededMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reallyCreateUserIfNeededMutation, { data, loading, error }] = useReallyCreateUserIfNeededMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReallyCreateUserIfNeededMutation(baseOptions?: Apollo.MutationHookOptions<ReallyCreateUserIfNeededMutation, ReallyCreateUserIfNeededMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReallyCreateUserIfNeededMutation, ReallyCreateUserIfNeededMutationVariables>(ReallyCreateUserIfNeededDocument, options);
      }
export type ReallyCreateUserIfNeededMutationHookResult = ReturnType<typeof useReallyCreateUserIfNeededMutation>;
export type ReallyCreateUserIfNeededMutationResult = Apollo.MutationResult<ReallyCreateUserIfNeededMutation>;
export type ReallyCreateUserIfNeededMutationOptions = Apollo.BaseMutationOptions<ReallyCreateUserIfNeededMutation, ReallyCreateUserIfNeededMutationVariables>;
export const RetireCreditsDocument = gql`
    mutation RetireCredits($input: RetireCreditsInput!) {
  retireCredits(input: $input) {
    retirement {
      id
    }
  }
}
    `;
export type RetireCreditsMutationFn = Apollo.MutationFunction<RetireCreditsMutation, RetireCreditsMutationVariables>;

/**
 * __useRetireCreditsMutation__
 *
 * To run a mutation, you first call `useRetireCreditsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRetireCreditsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [retireCreditsMutation, { data, loading, error }] = useRetireCreditsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRetireCreditsMutation(baseOptions?: Apollo.MutationHookOptions<RetireCreditsMutation, RetireCreditsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RetireCreditsMutation, RetireCreditsMutationVariables>(RetireCreditsDocument, options);
      }
export type RetireCreditsMutationHookResult = ReturnType<typeof useRetireCreditsMutation>;
export type RetireCreditsMutationResult = Apollo.MutationResult<RetireCreditsMutation>;
export type RetireCreditsMutationOptions = Apollo.BaseMutationOptions<RetireCreditsMutation, RetireCreditsMutationVariables>;
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
export const UpdateAddressByIdDocument = gql`
    mutation UpdateAddressById($input: UpdateAddressByIdInput!) {
  updateAddressById(input: $input) {
    address {
      id
      feature
    }
  }
}
    `;
export type UpdateAddressByIdMutationFn = Apollo.MutationFunction<UpdateAddressByIdMutation, UpdateAddressByIdMutationVariables>;

/**
 * __useUpdateAddressByIdMutation__
 *
 * To run a mutation, you first call `useUpdateAddressByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAddressByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAddressByIdMutation, { data, loading, error }] = useUpdateAddressByIdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAddressByIdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAddressByIdMutation, UpdateAddressByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAddressByIdMutation, UpdateAddressByIdMutationVariables>(UpdateAddressByIdDocument, options);
      }
export type UpdateAddressByIdMutationHookResult = ReturnType<typeof useUpdateAddressByIdMutation>;
export type UpdateAddressByIdMutationResult = Apollo.MutationResult<UpdateAddressByIdMutation>;
export type UpdateAddressByIdMutationOptions = Apollo.BaseMutationOptions<UpdateAddressByIdMutation, UpdateAddressByIdMutationVariables>;
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
export const UpdateUserByEmailDocument = gql`
    mutation UpdateUserByEmail($input: UpdateUserByEmailInput!) {
  updateUserByEmail(input: $input) {
    user {
      partyId
      phoneNumber
      roleTitle
    }
    partyByPartyId {
      name
      description
      image
    }
  }
}
    `;
export type UpdateUserByEmailMutationFn = Apollo.MutationFunction<UpdateUserByEmailMutation, UpdateUserByEmailMutationVariables>;

/**
 * __useUpdateUserByEmailMutation__
 *
 * To run a mutation, you first call `useUpdateUserByEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserByEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserByEmailMutation, { data, loading, error }] = useUpdateUserByEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserByEmailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserByEmailMutation, UpdateUserByEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserByEmailMutation, UpdateUserByEmailMutationVariables>(UpdateUserByEmailDocument, options);
      }
export type UpdateUserByEmailMutationHookResult = ReturnType<typeof useUpdateUserByEmailMutation>;
export type UpdateUserByEmailMutationResult = Apollo.MutationResult<UpdateUserByEmailMutation>;
export type UpdateUserByEmailMutationOptions = Apollo.BaseMutationOptions<UpdateUserByEmailMutation, UpdateUserByEmailMutationVariables>;
export const UpdateUserByIdDocument = gql`
    mutation UpdateUserById($input: UpdateUserByIdInput!) {
  updateUserById(input: $input) {
    user {
      id
    }
  }
}
    `;
export type UpdateUserByIdMutationFn = Apollo.MutationFunction<UpdateUserByIdMutation, UpdateUserByIdMutationVariables>;

/**
 * __useUpdateUserByIdMutation__
 *
 * To run a mutation, you first call `useUpdateUserByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserByIdMutation, { data, loading, error }] = useUpdateUserByIdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserByIdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserByIdMutation, UpdateUserByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserByIdMutation, UpdateUserByIdMutationVariables>(UpdateUserByIdDocument, options);
      }
export type UpdateUserByIdMutationHookResult = ReturnType<typeof useUpdateUserByIdMutation>;
export type UpdateUserByIdMutationResult = Apollo.MutationResult<UpdateUserByIdMutation>;
export type UpdateUserByIdMutationOptions = Apollo.BaseMutationOptions<UpdateUserByIdMutation, UpdateUserByIdMutationVariables>;