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
  /**
   * A signed eight-byte integer. The upper big integer values are greater than the
   * max value for a JavaScript number. Therefore all big integers will be output as
   * strings and not numbers.
   */
  BigInt: any;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};


export type Block = Node & {
  __typename?: 'Block';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  chainNum: Scalars['Int'];
  height: Scalars['BigInt'];
  data: Scalars['JSON'];
  time: Scalars['Datetime'];
  /** Reads a single `Chain` that is related to this `Block`. */
  chainByChainNum?: Maybe<Chain>;
  /** Reads and enables pagination through a set of `Tx`. */
  txesByChainNumAndBlockHeight: TxesConnection;
};


export type BlockTxesByChainNumAndBlockHeightArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TxesOrderBy>>;
  condition?: Maybe<TxCondition>;
};

/** A condition to be used against `Block` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type BlockCondition = {
  /** Checks for equality with the object’s `chainNum` field. */
  chainNum?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `height` field. */
  height?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `data` field. */
  data?: Maybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `time` field. */
  time?: Maybe<Scalars['Datetime']>;
};

/** An input for mutations affecting `Block` */
export type BlockInput = {
  chainNum: Scalars['Int'];
  height: Scalars['BigInt'];
  data: Scalars['JSON'];
  time: Scalars['Datetime'];
};

/** Represents an update to a `Block`. Fields that are set will be updated. */
export type BlockPatch = {
  chainNum?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['BigInt']>;
  data?: Maybe<Scalars['JSON']>;
  time?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `Block` values. */
export type BlocksConnection = {
  __typename?: 'BlocksConnection';
  /** A list of `Block` objects. */
  nodes: Array<Maybe<Block>>;
  /** A list of edges which contains the `Block` and cursor to aid in pagination. */
  edges: Array<BlocksEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Block` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Block` edge in the connection. */
export type BlocksEdge = {
  __typename?: 'BlocksEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Block` at the end of the edge. */
  node?: Maybe<Block>;
};

/** Methods to use when ordering `Block`. */
export enum BlocksOrderBy {
  Natural = 'NATURAL',
  ChainNumAsc = 'CHAIN_NUM_ASC',
  ChainNumDesc = 'CHAIN_NUM_DESC',
  HeightAsc = 'HEIGHT_ASC',
  HeightDesc = 'HEIGHT_DESC',
  DataAsc = 'DATA_ASC',
  DataDesc = 'DATA_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Chain = Node & {
  __typename?: 'Chain';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  num: Scalars['Int'];
  chainId: Scalars['String'];
  /** Reads and enables pagination through a set of `Block`. */
  blocksByChainNum: BlocksConnection;
};


export type ChainBlocksByChainNumArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<BlocksOrderBy>>;
  condition?: Maybe<BlockCondition>;
};

/** A condition to be used against `Chain` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ChainCondition = {
  /** Checks for equality with the object’s `num` field. */
  num?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `chainId` field. */
  chainId?: Maybe<Scalars['String']>;
};

/** An input for mutations affecting `Chain` */
export type ChainInput = {
  num?: Maybe<Scalars['Int']>;
  chainId: Scalars['String'];
};

/** Represents an update to a `Chain`. Fields that are set will be updated. */
export type ChainPatch = {
  num?: Maybe<Scalars['Int']>;
  chainId?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Chain` values. */
export type ChainsConnection = {
  __typename?: 'ChainsConnection';
  /** A list of `Chain` objects. */
  nodes: Array<Maybe<Chain>>;
  /** A list of edges which contains the `Chain` and cursor to aid in pagination. */
  edges: Array<ChainsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Chain` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Chain` edge in the connection. */
export type ChainsEdge = {
  __typename?: 'ChainsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Chain` at the end of the edge. */
  node?: Maybe<Chain>;
};

/** Methods to use when ordering `Chain`. */
export enum ChainsOrderBy {
  Natural = 'NATURAL',
  NumAsc = 'NUM_ASC',
  NumDesc = 'NUM_DESC',
  ChainIdAsc = 'CHAIN_ID_ASC',
  ChainIdDesc = 'CHAIN_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type ClassIssuer = Node & {
  __typename?: 'ClassIssuer';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  type: Scalars['String'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  chainNum: Scalars['Int'];
  timestamp?: Maybe<Scalars['Datetime']>;
  txHash: Scalars['String'];
  classId: Scalars['String'];
  issuer: Scalars['String'];
  latest: Scalars['Boolean'];
  /** Reads a single `MsgEvent` that is related to this `ClassIssuer`. */
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
};

/**
 * A condition to be used against `ClassIssuer` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type ClassIssuerCondition = {
  /** Checks for equality with the object’s `type` field. */
  type?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `blockHeight` field. */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txIdx` field. */
  txIdx?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `msgIdx` field. */
  msgIdx?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `chainNum` field. */
  chainNum?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `timestamp` field. */
  timestamp?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `txHash` field. */
  txHash?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `classId` field. */
  classId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `issuer` field. */
  issuer?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `latest` field. */
  latest?: Maybe<Scalars['Boolean']>;
};

/** An input for mutations affecting `ClassIssuer` */
export type ClassIssuerInput = {
  type: Scalars['String'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  chainNum: Scalars['Int'];
  timestamp?: Maybe<Scalars['Datetime']>;
  txHash: Scalars['String'];
  classId: Scalars['String'];
  issuer: Scalars['String'];
  latest?: Maybe<Scalars['Boolean']>;
};

/** Represents an update to a `ClassIssuer`. Fields that are set will be updated. */
export type ClassIssuerPatch = {
  type?: Maybe<Scalars['String']>;
  blockHeight?: Maybe<Scalars['BigInt']>;
  txIdx?: Maybe<Scalars['Int']>;
  msgIdx?: Maybe<Scalars['Int']>;
  chainNum?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['Datetime']>;
  txHash?: Maybe<Scalars['String']>;
  classId?: Maybe<Scalars['String']>;
  issuer?: Maybe<Scalars['String']>;
  latest?: Maybe<Scalars['Boolean']>;
};

/** A connection to a list of `ClassIssuer` values. */
export type ClassIssuersConnection = {
  __typename?: 'ClassIssuersConnection';
  /** A list of `ClassIssuer` objects. */
  nodes: Array<Maybe<ClassIssuer>>;
  /** A list of edges which contains the `ClassIssuer` and cursor to aid in pagination. */
  edges: Array<ClassIssuersEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ClassIssuer` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `ClassIssuer` edge in the connection. */
export type ClassIssuersEdge = {
  __typename?: 'ClassIssuersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ClassIssuer` at the end of the edge. */
  node?: Maybe<ClassIssuer>;
};

/** Methods to use when ordering `ClassIssuer`. */
export enum ClassIssuersOrderBy {
  Natural = 'NATURAL',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  BlockHeightAsc = 'BLOCK_HEIGHT_ASC',
  BlockHeightDesc = 'BLOCK_HEIGHT_DESC',
  TxIdxAsc = 'TX_IDX_ASC',
  TxIdxDesc = 'TX_IDX_DESC',
  MsgIdxAsc = 'MSG_IDX_ASC',
  MsgIdxDesc = 'MSG_IDX_DESC',
  ChainNumAsc = 'CHAIN_NUM_ASC',
  ChainNumDesc = 'CHAIN_NUM_DESC',
  TimestampAsc = 'TIMESTAMP_ASC',
  TimestampDesc = 'TIMESTAMP_DESC',
  TxHashAsc = 'TX_HASH_ASC',
  TxHashDesc = 'TX_HASH_DESC',
  ClassIdAsc = 'CLASS_ID_ASC',
  ClassIdDesc = 'CLASS_ID_DESC',
  IssuerAsc = 'ISSUER_ASC',
  IssuerDesc = 'ISSUER_DESC',
  LatestAsc = 'LATEST_ASC',
  LatestDesc = 'LATEST_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** All input for the create `Block` mutation. */
export type CreateBlockInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Block` to be created by this mutation. */
  block: BlockInput;
};

/** The output of our create `Block` mutation. */
export type CreateBlockPayload = {
  __typename?: 'CreateBlockPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Block` that was created by this mutation. */
  block?: Maybe<Block>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Chain` that is related to this `Block`. */
  chainByChainNum?: Maybe<Chain>;
  /** An edge for our `Block`. May be used by Relay 1. */
  blockEdge?: Maybe<BlocksEdge>;
};


/** The output of our create `Block` mutation. */
export type CreateBlockPayloadBlockEdgeArgs = {
  orderBy?: Maybe<Array<BlocksOrderBy>>;
};

/** All input for the create `Chain` mutation. */
export type CreateChainInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Chain` to be created by this mutation. */
  chain: ChainInput;
};

/** The output of our create `Chain` mutation. */
export type CreateChainPayload = {
  __typename?: 'CreateChainPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Chain` that was created by this mutation. */
  chain?: Maybe<Chain>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Chain`. May be used by Relay 1. */
  chainEdge?: Maybe<ChainsEdge>;
};


/** The output of our create `Chain` mutation. */
export type CreateChainPayloadChainEdgeArgs = {
  orderBy?: Maybe<Array<ChainsOrderBy>>;
};

/** All input for the create `ClassIssuer` mutation. */
export type CreateClassIssuerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ClassIssuer` to be created by this mutation. */
  classIssuer: ClassIssuerInput;
};

/** The output of our create `ClassIssuer` mutation. */
export type CreateClassIssuerPayload = {
  __typename?: 'CreateClassIssuerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ClassIssuer` that was created by this mutation. */
  classIssuer?: Maybe<ClassIssuer>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `MsgEvent` that is related to this `ClassIssuer`. */
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
  /** An edge for our `ClassIssuer`. May be used by Relay 1. */
  classIssuerEdge?: Maybe<ClassIssuersEdge>;
};


/** The output of our create `ClassIssuer` mutation. */
export type CreateClassIssuerPayloadClassIssuerEdgeArgs = {
  orderBy?: Maybe<Array<ClassIssuersOrderBy>>;
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

/** All input for the create `MsgEventAttr` mutation. */
export type CreateMsgEventAttrInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MsgEventAttr` to be created by this mutation. */
  msgEventAttr: MsgEventAttrInput;
};

/** The output of our create `MsgEventAttr` mutation. */
export type CreateMsgEventAttrPayload = {
  __typename?: 'CreateMsgEventAttrPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MsgEventAttr` that was created by this mutation. */
  msgEventAttr?: Maybe<MsgEventAttr>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Msg` that is related to this `MsgEventAttr`. */
  msgByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Msg>;
  /** An edge for our `MsgEventAttr`. May be used by Relay 1. */
  msgEventAttrEdge?: Maybe<MsgEventAttrsEdge>;
};


/** The output of our create `MsgEventAttr` mutation. */
export type CreateMsgEventAttrPayloadMsgEventAttrEdgeArgs = {
  orderBy?: Maybe<Array<MsgEventAttrsOrderBy>>;
};

/** All input for the create `MsgEvent` mutation. */
export type CreateMsgEventInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MsgEvent` to be created by this mutation. */
  msgEvent: MsgEventInput;
};

/** The output of our create `MsgEvent` mutation. */
export type CreateMsgEventPayload = {
  __typename?: 'CreateMsgEventPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MsgEvent` that was created by this mutation. */
  msgEvent?: Maybe<MsgEvent>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Msg` that is related to this `MsgEvent`. */
  msgByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Msg>;
  /** An edge for our `MsgEvent`. May be used by Relay 1. */
  msgEventEdge?: Maybe<MsgEventsEdge>;
};


/** The output of our create `MsgEvent` mutation. */
export type CreateMsgEventPayloadMsgEventEdgeArgs = {
  orderBy?: Maybe<Array<MsgEventsOrderBy>>;
};

/** All input for the create `Msg` mutation. */
export type CreateMsgInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Msg` to be created by this mutation. */
  msg: MsgInput;
};

/** The output of our create `Msg` mutation. */
export type CreateMsgPayload = {
  __typename?: 'CreateMsgPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Msg` that was created by this mutation. */
  msg?: Maybe<Msg>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tx` that is related to this `Msg`. */
  txByChainNumAndBlockHeightAndTxIdx?: Maybe<Tx>;
  /** An edge for our `Msg`. May be used by Relay 1. */
  msgEdge?: Maybe<MsgsEdge>;
};


/** The output of our create `Msg` mutation. */
export type CreateMsgPayloadMsgEdgeArgs = {
  orderBy?: Maybe<Array<MsgsOrderBy>>;
};

/** All input for the create `Proposal` mutation. */
export type CreateProposalInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Proposal` to be created by this mutation. */
  proposal: ProposalInput;
};

/** The output of our create `Proposal` mutation. */
export type CreateProposalPayload = {
  __typename?: 'CreateProposalPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Proposal` that was created by this mutation. */
  proposal?: Maybe<Proposal>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `MsgEvent` that is related to this `Proposal`. */
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
  /** An edge for our `Proposal`. May be used by Relay 1. */
  proposalEdge?: Maybe<ProposalsEdge>;
};


/** The output of our create `Proposal` mutation. */
export type CreateProposalPayloadProposalEdgeArgs = {
  orderBy?: Maybe<Array<ProposalsOrderBy>>;
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
  /** Reads a single `MsgEvent` that is related to this `Retirement`. */
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
  /** An edge for our `Retirement`. May be used by Relay 1. */
  retirementEdge?: Maybe<RetirementsEdge>;
};


/** The output of our create `Retirement` mutation. */
export type CreateRetirementPayloadRetirementEdgeArgs = {
  orderBy?: Maybe<Array<RetirementsOrderBy>>;
};

/** All input for the create `Tx` mutation. */
export type CreateTxInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Tx` to be created by this mutation. */
  tx: TxInput;
};

/** The output of our create `Tx` mutation. */
export type CreateTxPayload = {
  __typename?: 'CreateTxPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Tx` that was created by this mutation. */
  tx?: Maybe<Tx>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Block` that is related to this `Tx`. */
  blockByChainNumAndBlockHeight?: Maybe<Block>;
  /** An edge for our `Tx`. May be used by Relay 1. */
  txEdge?: Maybe<TxesEdge>;
};


/** The output of our create `Tx` mutation. */
export type CreateTxPayloadTxEdgeArgs = {
  orderBy?: Maybe<Array<TxesOrderBy>>;
};

/** All input for the create `Vote` mutation. */
export type CreateVoteInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Vote` to be created by this mutation. */
  vote: VoteInput;
};

/** The output of our create `Vote` mutation. */
export type CreateVotePayload = {
  __typename?: 'CreateVotePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Vote` that was created by this mutation. */
  vote?: Maybe<Vote>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `MsgEvent` that is related to this `Vote`. */
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
  /** An edge for our `Vote`. May be used by Relay 1. */
  voteEdge?: Maybe<VotesEdge>;
};


/** The output of our create `Vote` mutation. */
export type CreateVotePayloadVoteEdgeArgs = {
  orderBy?: Maybe<Array<VotesOrderBy>>;
};



/** All input for the `deleteBlockByChainNumAndHeight` mutation. */
export type DeleteBlockByChainNumAndHeightInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  chainNum: Scalars['Int'];
  height: Scalars['BigInt'];
};

/** All input for the `deleteBlock` mutation. */
export type DeleteBlockInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Block` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Block` mutation. */
export type DeleteBlockPayload = {
  __typename?: 'DeleteBlockPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Block` that was deleted by this mutation. */
  block?: Maybe<Block>;
  deletedBlockId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Chain` that is related to this `Block`. */
  chainByChainNum?: Maybe<Chain>;
  /** An edge for our `Block`. May be used by Relay 1. */
  blockEdge?: Maybe<BlocksEdge>;
};


/** The output of our delete `Block` mutation. */
export type DeleteBlockPayloadBlockEdgeArgs = {
  orderBy?: Maybe<Array<BlocksOrderBy>>;
};

/** All input for the `deleteChainByChainId` mutation. */
export type DeleteChainByChainIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  chainId: Scalars['String'];
};

/** All input for the `deleteChainByNum` mutation. */
export type DeleteChainByNumInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  num: Scalars['Int'];
};

/** All input for the `deleteChain` mutation. */
export type DeleteChainInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Chain` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Chain` mutation. */
export type DeleteChainPayload = {
  __typename?: 'DeleteChainPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Chain` that was deleted by this mutation. */
  chain?: Maybe<Chain>;
  deletedChainId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Chain`. May be used by Relay 1. */
  chainEdge?: Maybe<ChainsEdge>;
};


/** The output of our delete `Chain` mutation. */
export type DeleteChainPayloadChainEdgeArgs = {
  orderBy?: Maybe<Array<ChainsOrderBy>>;
};

/** All input for the `deleteClassIssuerByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndClassIdAndIssuer` mutation. */
export type DeleteClassIssuerByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndClassIdAndIssuerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  classId: Scalars['String'];
  issuer: Scalars['String'];
};

/** All input for the `deleteClassIssuer` mutation. */
export type DeleteClassIssuerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ClassIssuer` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `ClassIssuer` mutation. */
export type DeleteClassIssuerPayload = {
  __typename?: 'DeleteClassIssuerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ClassIssuer` that was deleted by this mutation. */
  classIssuer?: Maybe<ClassIssuer>;
  deletedClassIssuerId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `MsgEvent` that is related to this `ClassIssuer`. */
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
  /** An edge for our `ClassIssuer`. May be used by Relay 1. */
  classIssuerEdge?: Maybe<ClassIssuersEdge>;
};


/** The output of our delete `ClassIssuer` mutation. */
export type DeleteClassIssuerPayloadClassIssuerEdgeArgs = {
  orderBy?: Maybe<Array<ClassIssuersOrderBy>>;
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

/** All input for the `deleteMsgByChainNumAndBlockHeightAndTxIdxAndMsgIdx` mutation. */
export type DeleteMsgByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
};

/** All input for the `deleteMsgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHash` mutation. */
export type DeleteMsgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHashInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  type: Scalars['String'];
  key: Scalars['String'];
  valueHash: Scalars['String'];
};

/** All input for the `deleteMsgEventAttr` mutation. */
export type DeleteMsgEventAttrInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MsgEventAttr` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `MsgEventAttr` mutation. */
export type DeleteMsgEventAttrPayload = {
  __typename?: 'DeleteMsgEventAttrPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MsgEventAttr` that was deleted by this mutation. */
  msgEventAttr?: Maybe<MsgEventAttr>;
  deletedMsgEventAttrId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Msg` that is related to this `MsgEventAttr`. */
  msgByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Msg>;
  /** An edge for our `MsgEventAttr`. May be used by Relay 1. */
  msgEventAttrEdge?: Maybe<MsgEventAttrsEdge>;
};


/** The output of our delete `MsgEventAttr` mutation. */
export type DeleteMsgEventAttrPayloadMsgEventAttrEdgeArgs = {
  orderBy?: Maybe<Array<MsgEventAttrsOrderBy>>;
};

/** All input for the `deleteMsgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType` mutation. */
export type DeleteMsgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  type: Scalars['String'];
};

/** All input for the `deleteMsgEvent` mutation. */
export type DeleteMsgEventInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MsgEvent` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `MsgEvent` mutation. */
export type DeleteMsgEventPayload = {
  __typename?: 'DeleteMsgEventPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MsgEvent` that was deleted by this mutation. */
  msgEvent?: Maybe<MsgEvent>;
  deletedMsgEventId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Msg` that is related to this `MsgEvent`. */
  msgByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Msg>;
  /** An edge for our `MsgEvent`. May be used by Relay 1. */
  msgEventEdge?: Maybe<MsgEventsEdge>;
};


/** The output of our delete `MsgEvent` mutation. */
export type DeleteMsgEventPayloadMsgEventEdgeArgs = {
  orderBy?: Maybe<Array<MsgEventsOrderBy>>;
};

/** All input for the `deleteMsg` mutation. */
export type DeleteMsgInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Msg` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Msg` mutation. */
export type DeleteMsgPayload = {
  __typename?: 'DeleteMsgPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Msg` that was deleted by this mutation. */
  msg?: Maybe<Msg>;
  deletedMsgId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tx` that is related to this `Msg`. */
  txByChainNumAndBlockHeightAndTxIdx?: Maybe<Tx>;
  /** An edge for our `Msg`. May be used by Relay 1. */
  msgEdge?: Maybe<MsgsEdge>;
};


/** The output of our delete `Msg` mutation. */
export type DeleteMsgPayloadMsgEdgeArgs = {
  orderBy?: Maybe<Array<MsgsOrderBy>>;
};

/** All input for the `deleteProposalByChainNumAndBlockHeightAndTxIdxAndMsgIdx` mutation. */
export type DeleteProposalByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
};

/** All input for the `deleteProposal` mutation. */
export type DeleteProposalInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Proposal` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Proposal` mutation. */
export type DeleteProposalPayload = {
  __typename?: 'DeleteProposalPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Proposal` that was deleted by this mutation. */
  proposal?: Maybe<Proposal>;
  deletedProposalId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `MsgEvent` that is related to this `Proposal`. */
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
  /** An edge for our `Proposal`. May be used by Relay 1. */
  proposalEdge?: Maybe<ProposalsEdge>;
};


/** The output of our delete `Proposal` mutation. */
export type DeleteProposalPayloadProposalEdgeArgs = {
  orderBy?: Maybe<Array<ProposalsOrderBy>>;
};

/** All input for the `deleteRetirementByChainNumAndBlockHeightAndTxIdxAndMsgIdx` mutation. */
export type DeleteRetirementByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
};

/** All input for the `deleteRetirementByTxHash` mutation. */
export type DeleteRetirementByTxHashInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  txHash: Scalars['String'];
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
  /** Reads a single `MsgEvent` that is related to this `Retirement`. */
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
  /** An edge for our `Retirement`. May be used by Relay 1. */
  retirementEdge?: Maybe<RetirementsEdge>;
};


/** The output of our delete `Retirement` mutation. */
export type DeleteRetirementPayloadRetirementEdgeArgs = {
  orderBy?: Maybe<Array<RetirementsOrderBy>>;
};

/** All input for the `deleteTxByChainNumAndBlockHeightAndTxIdx` mutation. */
export type DeleteTxByChainNumAndBlockHeightAndTxIdxInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
};

/** All input for the `deleteTxByHash` mutation. */
export type DeleteTxByHashInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  hash: Scalars['String'];
};

/** All input for the `deleteTx` mutation. */
export type DeleteTxInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Tx` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Tx` mutation. */
export type DeleteTxPayload = {
  __typename?: 'DeleteTxPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Tx` that was deleted by this mutation. */
  tx?: Maybe<Tx>;
  deletedTxId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Block` that is related to this `Tx`. */
  blockByChainNumAndBlockHeight?: Maybe<Block>;
  /** An edge for our `Tx`. May be used by Relay 1. */
  txEdge?: Maybe<TxesEdge>;
};


/** The output of our delete `Tx` mutation. */
export type DeleteTxPayloadTxEdgeArgs = {
  orderBy?: Maybe<Array<TxesOrderBy>>;
};

/** All input for the `deleteVoteByChainNumAndBlockHeightAndTxIdxAndMsgIdx` mutation. */
export type DeleteVoteByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
};

/** All input for the `deleteVoteByChainNumAndProposalIdAndVoter` mutation. */
export type DeleteVoteByChainNumAndProposalIdAndVoterInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  chainNum: Scalars['Int'];
  proposalId: Scalars['BigInt'];
  voter: Scalars['String'];
};

/** All input for the `deleteVote` mutation. */
export type DeleteVoteInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Vote` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Vote` mutation. */
export type DeleteVotePayload = {
  __typename?: 'DeleteVotePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Vote` that was deleted by this mutation. */
  vote?: Maybe<Vote>;
  deletedVoteId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `MsgEvent` that is related to this `Vote`. */
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
  /** An edge for our `Vote`. May be used by Relay 1. */
  voteEdge?: Maybe<VotesEdge>;
};


/** The output of our delete `Vote` mutation. */
export type DeleteVotePayloadVoteEdgeArgs = {
  orderBy?: Maybe<Array<VotesOrderBy>>;
};

export type EventRetire = {
  __typename?: 'EventRetire';
  chainNum?: Maybe<Scalars['Int']>;
  blockHeight?: Maybe<Scalars['BigInt']>;
  txIdx?: Maybe<Scalars['Int']>;
  msgIdx?: Maybe<Scalars['Int']>;
  owner?: Maybe<Scalars['String']>;
  batchDenom?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['String']>;
  jurisdiction?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  hasDuplicates?: Maybe<Scalars['Boolean']>;
};

/**
 * A condition to be used against `EventRetire` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type EventRetireCondition = {
  /** Checks for equality with the object’s `chainNum` field. */
  chainNum?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `blockHeight` field. */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txIdx` field. */
  txIdx?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `msgIdx` field. */
  msgIdx?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `owner` field. */
  owner?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `batchDenom` field. */
  batchDenom?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `amount` field. */
  amount?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `jurisdiction` field. */
  jurisdiction?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `reason` field. */
  reason?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `hasDuplicates` field. */
  hasDuplicates?: Maybe<Scalars['Boolean']>;
};

export type EventRetireV1 = {
  __typename?: 'EventRetireV1';
  chainNum?: Maybe<Scalars['Int']>;
  blockHeight?: Maybe<Scalars['BigInt']>;
  txIdx?: Maybe<Scalars['Int']>;
  msgIdx?: Maybe<Scalars['Int']>;
  owner?: Maybe<Scalars['String']>;
  batchDenom?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['String']>;
  jurisdiction?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  hasDuplicates?: Maybe<Scalars['Boolean']>;
};

export type EventRetireV1Alpha1 = {
  __typename?: 'EventRetireV1Alpha1';
  chainNum?: Maybe<Scalars['Int']>;
  blockHeight?: Maybe<Scalars['BigInt']>;
  txIdx?: Maybe<Scalars['Int']>;
  msgIdx?: Maybe<Scalars['Int']>;
  retirer?: Maybe<Scalars['String']>;
  batchDenom?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  hasDuplicates?: Maybe<Scalars['Boolean']>;
};

/**
 * A condition to be used against `EventRetireV1Alpha1` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type EventRetireV1Alpha1Condition = {
  /** Checks for equality with the object’s `chainNum` field. */
  chainNum?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `blockHeight` field. */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txIdx` field. */
  txIdx?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `msgIdx` field. */
  msgIdx?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `retirer` field. */
  retirer?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `batchDenom` field. */
  batchDenom?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `amount` field. */
  amount?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `location` field. */
  location?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `hasDuplicates` field. */
  hasDuplicates?: Maybe<Scalars['Boolean']>;
};

/** A connection to a list of `EventRetireV1Alpha1` values. */
export type EventRetireV1Alpha1SConnection = {
  __typename?: 'EventRetireV1Alpha1SConnection';
  /** A list of `EventRetireV1Alpha1` objects. */
  nodes: Array<Maybe<EventRetireV1Alpha1>>;
  /** A list of edges which contains the `EventRetireV1Alpha1` and cursor to aid in pagination. */
  edges: Array<EventRetireV1Alpha1SEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `EventRetireV1Alpha1` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `EventRetireV1Alpha1` edge in the connection. */
export type EventRetireV1Alpha1SEdge = {
  __typename?: 'EventRetireV1Alpha1SEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `EventRetireV1Alpha1` at the end of the edge. */
  node?: Maybe<EventRetireV1Alpha1>;
};

/** Methods to use when ordering `EventRetireV1Alpha1`. */
export enum EventRetireV1Alpha1SOrderBy {
  Natural = 'NATURAL',
  ChainNumAsc = 'CHAIN_NUM_ASC',
  ChainNumDesc = 'CHAIN_NUM_DESC',
  BlockHeightAsc = 'BLOCK_HEIGHT_ASC',
  BlockHeightDesc = 'BLOCK_HEIGHT_DESC',
  TxIdxAsc = 'TX_IDX_ASC',
  TxIdxDesc = 'TX_IDX_DESC',
  MsgIdxAsc = 'MSG_IDX_ASC',
  MsgIdxDesc = 'MSG_IDX_DESC',
  RetirerAsc = 'RETIRER_ASC',
  RetirerDesc = 'RETIRER_DESC',
  BatchDenomAsc = 'BATCH_DENOM_ASC',
  BatchDenomDesc = 'BATCH_DENOM_DESC',
  AmountAsc = 'AMOUNT_ASC',
  AmountDesc = 'AMOUNT_DESC',
  LocationAsc = 'LOCATION_ASC',
  LocationDesc = 'LOCATION_DESC',
  HasDuplicatesAsc = 'HAS_DUPLICATES_ASC',
  HasDuplicatesDesc = 'HAS_DUPLICATES_DESC'
}

/**
 * A condition to be used against `EventRetireV1` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type EventRetireV1Condition = {
  /** Checks for equality with the object’s `chainNum` field. */
  chainNum?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `blockHeight` field. */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txIdx` field. */
  txIdx?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `msgIdx` field. */
  msgIdx?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `owner` field. */
  owner?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `batchDenom` field. */
  batchDenom?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `amount` field. */
  amount?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `jurisdiction` field. */
  jurisdiction?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `reason` field. */
  reason?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `hasDuplicates` field. */
  hasDuplicates?: Maybe<Scalars['Boolean']>;
};

/** A connection to a list of `EventRetireV1` values. */
export type EventRetireV1SConnection = {
  __typename?: 'EventRetireV1SConnection';
  /** A list of `EventRetireV1` objects. */
  nodes: Array<Maybe<EventRetireV1>>;
  /** A list of edges which contains the `EventRetireV1` and cursor to aid in pagination. */
  edges: Array<EventRetireV1SEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `EventRetireV1` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `EventRetireV1` edge in the connection. */
export type EventRetireV1SEdge = {
  __typename?: 'EventRetireV1SEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `EventRetireV1` at the end of the edge. */
  node?: Maybe<EventRetireV1>;
};

/** Methods to use when ordering `EventRetireV1`. */
export enum EventRetireV1SOrderBy {
  Natural = 'NATURAL',
  ChainNumAsc = 'CHAIN_NUM_ASC',
  ChainNumDesc = 'CHAIN_NUM_DESC',
  BlockHeightAsc = 'BLOCK_HEIGHT_ASC',
  BlockHeightDesc = 'BLOCK_HEIGHT_DESC',
  TxIdxAsc = 'TX_IDX_ASC',
  TxIdxDesc = 'TX_IDX_DESC',
  MsgIdxAsc = 'MSG_IDX_ASC',
  MsgIdxDesc = 'MSG_IDX_DESC',
  OwnerAsc = 'OWNER_ASC',
  OwnerDesc = 'OWNER_DESC',
  BatchDenomAsc = 'BATCH_DENOM_ASC',
  BatchDenomDesc = 'BATCH_DENOM_DESC',
  AmountAsc = 'AMOUNT_ASC',
  AmountDesc = 'AMOUNT_DESC',
  JurisdictionAsc = 'JURISDICTION_ASC',
  JurisdictionDesc = 'JURISDICTION_DESC',
  ReasonAsc = 'REASON_ASC',
  ReasonDesc = 'REASON_DESC',
  HasDuplicatesAsc = 'HAS_DUPLICATES_ASC',
  HasDuplicatesDesc = 'HAS_DUPLICATES_DESC'
}

/** A connection to a list of `EventRetire` values. */
export type EventRetiresConnection = {
  __typename?: 'EventRetiresConnection';
  /** A list of `EventRetire` objects. */
  nodes: Array<Maybe<EventRetire>>;
  /** A list of edges which contains the `EventRetire` and cursor to aid in pagination. */
  edges: Array<EventRetiresEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `EventRetire` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `EventRetire` edge in the connection. */
export type EventRetiresEdge = {
  __typename?: 'EventRetiresEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `EventRetire` at the end of the edge. */
  node?: Maybe<EventRetire>;
};

/** Methods to use when ordering `EventRetire`. */
export enum EventRetiresOrderBy {
  Natural = 'NATURAL',
  ChainNumAsc = 'CHAIN_NUM_ASC',
  ChainNumDesc = 'CHAIN_NUM_DESC',
  BlockHeightAsc = 'BLOCK_HEIGHT_ASC',
  BlockHeightDesc = 'BLOCK_HEIGHT_DESC',
  TxIdxAsc = 'TX_IDX_ASC',
  TxIdxDesc = 'TX_IDX_DESC',
  MsgIdxAsc = 'MSG_IDX_ASC',
  MsgIdxDesc = 'MSG_IDX_DESC',
  OwnerAsc = 'OWNER_ASC',
  OwnerDesc = 'OWNER_DESC',
  BatchDenomAsc = 'BATCH_DENOM_ASC',
  BatchDenomDesc = 'BATCH_DENOM_DESC',
  AmountAsc = 'AMOUNT_ASC',
  AmountDesc = 'AMOUNT_DESC',
  JurisdictionAsc = 'JURISDICTION_ASC',
  JurisdictionDesc = 'JURISDICTION_DESC',
  ReasonAsc = 'REASON_ASC',
  ReasonDesc = 'REASON_DESC',
  HasDuplicatesAsc = 'HAS_DUPLICATES_ASC',
  HasDuplicatesDesc = 'HAS_DUPLICATES_DESC'
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


export type Msg = Node & {
  __typename?: 'Msg';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  data: Scalars['JSON'];
  /** Reads a single `Tx` that is related to this `Msg`. */
  txByChainNumAndBlockHeightAndTxIdx?: Maybe<Tx>;
  /** Reads and enables pagination through a set of `MsgEventAttr`. */
  msgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdx: MsgEventAttrsConnection;
  /** Reads and enables pagination through a set of `MsgEvent`. */
  msgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdx: MsgEventsConnection;
};


export type MsgMsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MsgEventAttrsOrderBy>>;
  condition?: Maybe<MsgEventAttrCondition>;
};


export type MsgMsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MsgEventsOrderBy>>;
  condition?: Maybe<MsgEventCondition>;
};

/** A condition to be used against `Msg` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type MsgCondition = {
  /** Checks for equality with the object’s `chainNum` field. */
  chainNum?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `blockHeight` field. */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txIdx` field. */
  txIdx?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `msgIdx` field. */
  msgIdx?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `data` field. */
  data?: Maybe<Scalars['JSON']>;
};

export type MsgEvent = Node & {
  __typename?: 'MsgEvent';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  type: Scalars['String'];
  /** Reads a single `Msg` that is related to this `MsgEvent`. */
  msgByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Msg>;
  /** Reads and enables pagination through a set of `ClassIssuer`. */
  classIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType: ClassIssuersConnection;
  /** Reads and enables pagination through a set of `Proposal`. */
  proposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType: ProposalsConnection;
  /** Reads and enables pagination through a set of `Retirement`. */
  retirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType: RetirementsConnection;
  /** Reads and enables pagination through a set of `Vote`. */
  votesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType: VotesConnection;
};


export type MsgEventClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ClassIssuersOrderBy>>;
  condition?: Maybe<ClassIssuerCondition>;
};


export type MsgEventProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProposalsOrderBy>>;
  condition?: Maybe<ProposalCondition>;
};


export type MsgEventRetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<RetirementsOrderBy>>;
  condition?: Maybe<RetirementCondition>;
};


export type MsgEventVotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<VotesOrderBy>>;
  condition?: Maybe<VoteCondition>;
};

export type MsgEventAttr = Node & {
  __typename?: 'MsgEventAttr';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  type: Scalars['String'];
  key: Scalars['String'];
  value: Scalars['String'];
  valueHash: Scalars['String'];
  /** Reads a single `Msg` that is related to this `MsgEventAttr`. */
  msgByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Msg>;
};

/**
 * A condition to be used against `MsgEventAttr` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type MsgEventAttrCondition = {
  /** Checks for equality with the object’s `chainNum` field. */
  chainNum?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `blockHeight` field. */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txIdx` field. */
  txIdx?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `msgIdx` field. */
  msgIdx?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `type` field. */
  type?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `key` field. */
  key?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `value` field. */
  value?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `valueHash` field. */
  valueHash?: Maybe<Scalars['String']>;
};

/** An input for mutations affecting `MsgEventAttr` */
export type MsgEventAttrInput = {
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  type: Scalars['String'];
  key: Scalars['String'];
  value: Scalars['String'];
  valueHash: Scalars['String'];
};

/** Represents an update to a `MsgEventAttr`. Fields that are set will be updated. */
export type MsgEventAttrPatch = {
  chainNum?: Maybe<Scalars['Int']>;
  blockHeight?: Maybe<Scalars['BigInt']>;
  txIdx?: Maybe<Scalars['Int']>;
  msgIdx?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  valueHash?: Maybe<Scalars['String']>;
};

/** A connection to a list of `MsgEventAttr` values. */
export type MsgEventAttrsConnection = {
  __typename?: 'MsgEventAttrsConnection';
  /** A list of `MsgEventAttr` objects. */
  nodes: Array<Maybe<MsgEventAttr>>;
  /** A list of edges which contains the `MsgEventAttr` and cursor to aid in pagination. */
  edges: Array<MsgEventAttrsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `MsgEventAttr` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `MsgEventAttr` edge in the connection. */
export type MsgEventAttrsEdge = {
  __typename?: 'MsgEventAttrsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `MsgEventAttr` at the end of the edge. */
  node?: Maybe<MsgEventAttr>;
};

/** Methods to use when ordering `MsgEventAttr`. */
export enum MsgEventAttrsOrderBy {
  Natural = 'NATURAL',
  ChainNumAsc = 'CHAIN_NUM_ASC',
  ChainNumDesc = 'CHAIN_NUM_DESC',
  BlockHeightAsc = 'BLOCK_HEIGHT_ASC',
  BlockHeightDesc = 'BLOCK_HEIGHT_DESC',
  TxIdxAsc = 'TX_IDX_ASC',
  TxIdxDesc = 'TX_IDX_DESC',
  MsgIdxAsc = 'MSG_IDX_ASC',
  MsgIdxDesc = 'MSG_IDX_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  KeyAsc = 'KEY_ASC',
  KeyDesc = 'KEY_DESC',
  ValueAsc = 'VALUE_ASC',
  ValueDesc = 'VALUE_DESC',
  ValueHashAsc = 'VALUE_HASH_ASC',
  ValueHashDesc = 'VALUE_HASH_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/**
 * A condition to be used against `MsgEvent` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type MsgEventCondition = {
  /** Checks for equality with the object’s `chainNum` field. */
  chainNum?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `blockHeight` field. */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txIdx` field. */
  txIdx?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `msgIdx` field. */
  msgIdx?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `type` field. */
  type?: Maybe<Scalars['String']>;
};

/** An input for mutations affecting `MsgEvent` */
export type MsgEventInput = {
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  type: Scalars['String'];
};

/** Represents an update to a `MsgEvent`. Fields that are set will be updated. */
export type MsgEventPatch = {
  chainNum?: Maybe<Scalars['Int']>;
  blockHeight?: Maybe<Scalars['BigInt']>;
  txIdx?: Maybe<Scalars['Int']>;
  msgIdx?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

/** A connection to a list of `MsgEvent` values. */
export type MsgEventsConnection = {
  __typename?: 'MsgEventsConnection';
  /** A list of `MsgEvent` objects. */
  nodes: Array<Maybe<MsgEvent>>;
  /** A list of edges which contains the `MsgEvent` and cursor to aid in pagination. */
  edges: Array<MsgEventsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `MsgEvent` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `MsgEvent` edge in the connection. */
export type MsgEventsEdge = {
  __typename?: 'MsgEventsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `MsgEvent` at the end of the edge. */
  node?: Maybe<MsgEvent>;
};

/** Methods to use when ordering `MsgEvent`. */
export enum MsgEventsOrderBy {
  Natural = 'NATURAL',
  ChainNumAsc = 'CHAIN_NUM_ASC',
  ChainNumDesc = 'CHAIN_NUM_DESC',
  BlockHeightAsc = 'BLOCK_HEIGHT_ASC',
  BlockHeightDesc = 'BLOCK_HEIGHT_DESC',
  TxIdxAsc = 'TX_IDX_ASC',
  TxIdxDesc = 'TX_IDX_DESC',
  MsgIdxAsc = 'MSG_IDX_ASC',
  MsgIdxDesc = 'MSG_IDX_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** An input for mutations affecting `Msg` */
export type MsgInput = {
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  data: Scalars['JSON'];
};

/** Represents an update to a `Msg`. Fields that are set will be updated. */
export type MsgPatch = {
  chainNum?: Maybe<Scalars['Int']>;
  blockHeight?: Maybe<Scalars['BigInt']>;
  txIdx?: Maybe<Scalars['Int']>;
  msgIdx?: Maybe<Scalars['Int']>;
  data?: Maybe<Scalars['JSON']>;
};

/** A connection to a list of `Msg` values. */
export type MsgsConnection = {
  __typename?: 'MsgsConnection';
  /** A list of `Msg` objects. */
  nodes: Array<Maybe<Msg>>;
  /** A list of edges which contains the `Msg` and cursor to aid in pagination. */
  edges: Array<MsgsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Msg` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Msg` edge in the connection. */
export type MsgsEdge = {
  __typename?: 'MsgsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Msg` at the end of the edge. */
  node?: Maybe<Msg>;
};

/** Methods to use when ordering `Msg`. */
export enum MsgsOrderBy {
  Natural = 'NATURAL',
  ChainNumAsc = 'CHAIN_NUM_ASC',
  ChainNumDesc = 'CHAIN_NUM_DESC',
  BlockHeightAsc = 'BLOCK_HEIGHT_ASC',
  BlockHeightDesc = 'BLOCK_HEIGHT_DESC',
  TxIdxAsc = 'TX_IDX_ASC',
  TxIdxDesc = 'TX_IDX_DESC',
  MsgIdxAsc = 'MSG_IDX_ASC',
  MsgIdxDesc = 'MSG_IDX_DESC',
  DataAsc = 'DATA_ASC',
  DataDesc = 'DATA_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `Block`. */
  createBlock?: Maybe<CreateBlockPayload>;
  /** Creates a single `Chain`. */
  createChain?: Maybe<CreateChainPayload>;
  /** Creates a single `ClassIssuer`. */
  createClassIssuer?: Maybe<CreateClassIssuerPayload>;
  /** Creates a single `FlywaySchemaHistory`. */
  createFlywaySchemaHistory?: Maybe<CreateFlywaySchemaHistoryPayload>;
  /** Creates a single `Msg`. */
  createMsg?: Maybe<CreateMsgPayload>;
  /** Creates a single `MsgEvent`. */
  createMsgEvent?: Maybe<CreateMsgEventPayload>;
  /** Creates a single `MsgEventAttr`. */
  createMsgEventAttr?: Maybe<CreateMsgEventAttrPayload>;
  /** Creates a single `Proposal`. */
  createProposal?: Maybe<CreateProposalPayload>;
  /** Creates a single `Retirement`. */
  createRetirement?: Maybe<CreateRetirementPayload>;
  /** Creates a single `Tx`. */
  createTx?: Maybe<CreateTxPayload>;
  /** Creates a single `Vote`. */
  createVote?: Maybe<CreateVotePayload>;
  /** Updates a single `Block` using its globally unique id and a patch. */
  updateBlock?: Maybe<UpdateBlockPayload>;
  /** Updates a single `Block` using a unique key and a patch. */
  updateBlockByChainNumAndHeight?: Maybe<UpdateBlockPayload>;
  /** Updates a single `Chain` using its globally unique id and a patch. */
  updateChain?: Maybe<UpdateChainPayload>;
  /** Updates a single `Chain` using a unique key and a patch. */
  updateChainByNum?: Maybe<UpdateChainPayload>;
  /** Updates a single `Chain` using a unique key and a patch. */
  updateChainByChainId?: Maybe<UpdateChainPayload>;
  /** Updates a single `ClassIssuer` using its globally unique id and a patch. */
  updateClassIssuer?: Maybe<UpdateClassIssuerPayload>;
  /** Updates a single `ClassIssuer` using a unique key and a patch. */
  updateClassIssuerByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndClassIdAndIssuer?: Maybe<UpdateClassIssuerPayload>;
  /** Updates a single `FlywaySchemaHistory` using its globally unique id and a patch. */
  updateFlywaySchemaHistory?: Maybe<UpdateFlywaySchemaHistoryPayload>;
  /** Updates a single `FlywaySchemaHistory` using a unique key and a patch. */
  updateFlywaySchemaHistoryByInstalledRank?: Maybe<UpdateFlywaySchemaHistoryPayload>;
  /** Updates a single `Msg` using its globally unique id and a patch. */
  updateMsg?: Maybe<UpdateMsgPayload>;
  /** Updates a single `Msg` using a unique key and a patch. */
  updateMsgByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<UpdateMsgPayload>;
  /** Updates a single `MsgEvent` using its globally unique id and a patch. */
  updateMsgEvent?: Maybe<UpdateMsgEventPayload>;
  /** Updates a single `MsgEvent` using a unique key and a patch. */
  updateMsgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<UpdateMsgEventPayload>;
  /** Updates a single `MsgEventAttr` using its globally unique id and a patch. */
  updateMsgEventAttr?: Maybe<UpdateMsgEventAttrPayload>;
  /** Updates a single `MsgEventAttr` using a unique key and a patch. */
  updateMsgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHash?: Maybe<UpdateMsgEventAttrPayload>;
  /** Updates a single `Proposal` using its globally unique id and a patch. */
  updateProposal?: Maybe<UpdateProposalPayload>;
  /** Updates a single `Proposal` using a unique key and a patch. */
  updateProposalByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<UpdateProposalPayload>;
  /** Updates a single `Retirement` using its globally unique id and a patch. */
  updateRetirement?: Maybe<UpdateRetirementPayload>;
  /** Updates a single `Retirement` using a unique key and a patch. */
  updateRetirementByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<UpdateRetirementPayload>;
  /** Updates a single `Retirement` using a unique key and a patch. */
  updateRetirementByTxHash?: Maybe<UpdateRetirementPayload>;
  /** Updates a single `Tx` using its globally unique id and a patch. */
  updateTx?: Maybe<UpdateTxPayload>;
  /** Updates a single `Tx` using a unique key and a patch. */
  updateTxByChainNumAndBlockHeightAndTxIdx?: Maybe<UpdateTxPayload>;
  /** Updates a single `Tx` using a unique key and a patch. */
  updateTxByHash?: Maybe<UpdateTxPayload>;
  /** Updates a single `Vote` using its globally unique id and a patch. */
  updateVote?: Maybe<UpdateVotePayload>;
  /** Updates a single `Vote` using a unique key and a patch. */
  updateVoteByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<UpdateVotePayload>;
  /** Updates a single `Vote` using a unique key and a patch. */
  updateVoteByChainNumAndProposalIdAndVoter?: Maybe<UpdateVotePayload>;
  /** Deletes a single `Block` using its globally unique id. */
  deleteBlock?: Maybe<DeleteBlockPayload>;
  /** Deletes a single `Block` using a unique key. */
  deleteBlockByChainNumAndHeight?: Maybe<DeleteBlockPayload>;
  /** Deletes a single `Chain` using its globally unique id. */
  deleteChain?: Maybe<DeleteChainPayload>;
  /** Deletes a single `Chain` using a unique key. */
  deleteChainByNum?: Maybe<DeleteChainPayload>;
  /** Deletes a single `Chain` using a unique key. */
  deleteChainByChainId?: Maybe<DeleteChainPayload>;
  /** Deletes a single `ClassIssuer` using its globally unique id. */
  deleteClassIssuer?: Maybe<DeleteClassIssuerPayload>;
  /** Deletes a single `ClassIssuer` using a unique key. */
  deleteClassIssuerByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndClassIdAndIssuer?: Maybe<DeleteClassIssuerPayload>;
  /** Deletes a single `FlywaySchemaHistory` using its globally unique id. */
  deleteFlywaySchemaHistory?: Maybe<DeleteFlywaySchemaHistoryPayload>;
  /** Deletes a single `FlywaySchemaHistory` using a unique key. */
  deleteFlywaySchemaHistoryByInstalledRank?: Maybe<DeleteFlywaySchemaHistoryPayload>;
  /** Deletes a single `Msg` using its globally unique id. */
  deleteMsg?: Maybe<DeleteMsgPayload>;
  /** Deletes a single `Msg` using a unique key. */
  deleteMsgByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<DeleteMsgPayload>;
  /** Deletes a single `MsgEvent` using its globally unique id. */
  deleteMsgEvent?: Maybe<DeleteMsgEventPayload>;
  /** Deletes a single `MsgEvent` using a unique key. */
  deleteMsgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<DeleteMsgEventPayload>;
  /** Deletes a single `MsgEventAttr` using its globally unique id. */
  deleteMsgEventAttr?: Maybe<DeleteMsgEventAttrPayload>;
  /** Deletes a single `MsgEventAttr` using a unique key. */
  deleteMsgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHash?: Maybe<DeleteMsgEventAttrPayload>;
  /** Deletes a single `Proposal` using its globally unique id. */
  deleteProposal?: Maybe<DeleteProposalPayload>;
  /** Deletes a single `Proposal` using a unique key. */
  deleteProposalByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<DeleteProposalPayload>;
  /** Deletes a single `Retirement` using its globally unique id. */
  deleteRetirement?: Maybe<DeleteRetirementPayload>;
  /** Deletes a single `Retirement` using a unique key. */
  deleteRetirementByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<DeleteRetirementPayload>;
  /** Deletes a single `Retirement` using a unique key. */
  deleteRetirementByTxHash?: Maybe<DeleteRetirementPayload>;
  /** Deletes a single `Tx` using its globally unique id. */
  deleteTx?: Maybe<DeleteTxPayload>;
  /** Deletes a single `Tx` using a unique key. */
  deleteTxByChainNumAndBlockHeightAndTxIdx?: Maybe<DeleteTxPayload>;
  /** Deletes a single `Tx` using a unique key. */
  deleteTxByHash?: Maybe<DeleteTxPayload>;
  /** Deletes a single `Vote` using its globally unique id. */
  deleteVote?: Maybe<DeleteVotePayload>;
  /** Deletes a single `Vote` using a unique key. */
  deleteVoteByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<DeleteVotePayload>;
  /** Deletes a single `Vote` using a unique key. */
  deleteVoteByChainNumAndProposalIdAndVoter?: Maybe<DeleteVotePayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateBlockArgs = {
  input: CreateBlockInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateChainArgs = {
  input: CreateChainInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateClassIssuerArgs = {
  input: CreateClassIssuerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateFlywaySchemaHistoryArgs = {
  input: CreateFlywaySchemaHistoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMsgArgs = {
  input: CreateMsgInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMsgEventArgs = {
  input: CreateMsgEventInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMsgEventAttrArgs = {
  input: CreateMsgEventAttrInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateProposalArgs = {
  input: CreateProposalInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRetirementArgs = {
  input: CreateRetirementInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTxArgs = {
  input: CreateTxInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateVoteArgs = {
  input: CreateVoteInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBlockArgs = {
  input: UpdateBlockInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBlockByChainNumAndHeightArgs = {
  input: UpdateBlockByChainNumAndHeightInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateChainArgs = {
  input: UpdateChainInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateChainByNumArgs = {
  input: UpdateChainByNumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateChainByChainIdArgs = {
  input: UpdateChainByChainIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateClassIssuerArgs = {
  input: UpdateClassIssuerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateClassIssuerByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndClassIdAndIssuerArgs = {
  input: UpdateClassIssuerByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndClassIdAndIssuerInput;
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
export type MutationUpdateMsgArgs = {
  input: UpdateMsgInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMsgByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  input: UpdateMsgByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMsgEventArgs = {
  input: UpdateMsgEventInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMsgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeArgs = {
  input: UpdateMsgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMsgEventAttrArgs = {
  input: UpdateMsgEventAttrInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMsgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHashArgs = {
  input: UpdateMsgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHashInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProposalArgs = {
  input: UpdateProposalInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProposalByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  input: UpdateProposalByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRetirementArgs = {
  input: UpdateRetirementInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRetirementByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  input: UpdateRetirementByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRetirementByTxHashArgs = {
  input: UpdateRetirementByTxHashInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTxArgs = {
  input: UpdateTxInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTxByChainNumAndBlockHeightAndTxIdxArgs = {
  input: UpdateTxByChainNumAndBlockHeightAndTxIdxInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTxByHashArgs = {
  input: UpdateTxByHashInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateVoteArgs = {
  input: UpdateVoteInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateVoteByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  input: UpdateVoteByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateVoteByChainNumAndProposalIdAndVoterArgs = {
  input: UpdateVoteByChainNumAndProposalIdAndVoterInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBlockArgs = {
  input: DeleteBlockInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBlockByChainNumAndHeightArgs = {
  input: DeleteBlockByChainNumAndHeightInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteChainArgs = {
  input: DeleteChainInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteChainByNumArgs = {
  input: DeleteChainByNumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteChainByChainIdArgs = {
  input: DeleteChainByChainIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteClassIssuerArgs = {
  input: DeleteClassIssuerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteClassIssuerByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndClassIdAndIssuerArgs = {
  input: DeleteClassIssuerByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndClassIdAndIssuerInput;
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
export type MutationDeleteMsgArgs = {
  input: DeleteMsgInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMsgByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  input: DeleteMsgByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMsgEventArgs = {
  input: DeleteMsgEventInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMsgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeArgs = {
  input: DeleteMsgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMsgEventAttrArgs = {
  input: DeleteMsgEventAttrInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMsgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHashArgs = {
  input: DeleteMsgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHashInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProposalArgs = {
  input: DeleteProposalInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProposalByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  input: DeleteProposalByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRetirementArgs = {
  input: DeleteRetirementInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRetirementByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  input: DeleteRetirementByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRetirementByTxHashArgs = {
  input: DeleteRetirementByTxHashInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTxArgs = {
  input: DeleteTxInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTxByChainNumAndBlockHeightAndTxIdxArgs = {
  input: DeleteTxByChainNumAndBlockHeightAndTxIdxInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTxByHashArgs = {
  input: DeleteTxByHashInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteVoteArgs = {
  input: DeleteVoteInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteVoteByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  input: DeleteVoteByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteVoteByChainNumAndProposalIdAndVoterArgs = {
  input: DeleteVoteByChainNumAndProposalIdAndVoterInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

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

export type Proposal = Node & {
  __typename?: 'Proposal';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  type: Scalars['String'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  chainNum: Scalars['Int'];
  timestamp?: Maybe<Scalars['Datetime']>;
  txHash: Scalars['String'];
  proposalId: Scalars['BigInt'];
  status: Scalars['String'];
  groupPolicyAddress: Scalars['String'];
  metadata: Scalars['String'];
  proposers: Array<Maybe<Scalars['String']>>;
  submitTime?: Maybe<Scalars['Datetime']>;
  groupVersion: Scalars['BigInt'];
  groupPolicyVersion: Scalars['BigInt'];
  finalTallyResult: Scalars['JSON'];
  votingPeriodEnd: Scalars['Datetime'];
  executorResult: Scalars['String'];
  messages: Scalars['JSON'];
  /** Reads a single `MsgEvent` that is related to this `Proposal`. */
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
};

/**
 * A condition to be used against `Proposal` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type ProposalCondition = {
  /** Checks for equality with the object’s `type` field. */
  type?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `blockHeight` field. */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txIdx` field. */
  txIdx?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `msgIdx` field. */
  msgIdx?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `chainNum` field. */
  chainNum?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `timestamp` field. */
  timestamp?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `txHash` field. */
  txHash?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `proposalId` field. */
  proposalId?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `status` field. */
  status?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `groupPolicyAddress` field. */
  groupPolicyAddress?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `metadata` field. */
  metadata?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `proposers` field. */
  proposers?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Checks for equality with the object’s `submitTime` field. */
  submitTime?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `groupVersion` field. */
  groupVersion?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `groupPolicyVersion` field. */
  groupPolicyVersion?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `finalTallyResult` field. */
  finalTallyResult?: Maybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `votingPeriodEnd` field. */
  votingPeriodEnd?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `executorResult` field. */
  executorResult?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `messages` field. */
  messages?: Maybe<Scalars['JSON']>;
};

/** An input for mutations affecting `Proposal` */
export type ProposalInput = {
  type: Scalars['String'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  chainNum: Scalars['Int'];
  timestamp?: Maybe<Scalars['Datetime']>;
  txHash: Scalars['String'];
  proposalId: Scalars['BigInt'];
  status: Scalars['String'];
  groupPolicyAddress: Scalars['String'];
  metadata: Scalars['String'];
  proposers: Array<Maybe<Scalars['String']>>;
  submitTime?: Maybe<Scalars['Datetime']>;
  groupVersion: Scalars['BigInt'];
  groupPolicyVersion: Scalars['BigInt'];
  finalTallyResult: Scalars['JSON'];
  votingPeriodEnd: Scalars['Datetime'];
  executorResult: Scalars['String'];
  messages: Scalars['JSON'];
};

/** Represents an update to a `Proposal`. Fields that are set will be updated. */
export type ProposalPatch = {
  type?: Maybe<Scalars['String']>;
  blockHeight?: Maybe<Scalars['BigInt']>;
  txIdx?: Maybe<Scalars['Int']>;
  msgIdx?: Maybe<Scalars['Int']>;
  chainNum?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['Datetime']>;
  txHash?: Maybe<Scalars['String']>;
  proposalId?: Maybe<Scalars['BigInt']>;
  status?: Maybe<Scalars['String']>;
  groupPolicyAddress?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['String']>;
  proposers?: Maybe<Array<Maybe<Scalars['String']>>>;
  submitTime?: Maybe<Scalars['Datetime']>;
  groupVersion?: Maybe<Scalars['BigInt']>;
  groupPolicyVersion?: Maybe<Scalars['BigInt']>;
  finalTallyResult?: Maybe<Scalars['JSON']>;
  votingPeriodEnd?: Maybe<Scalars['Datetime']>;
  executorResult?: Maybe<Scalars['String']>;
  messages?: Maybe<Scalars['JSON']>;
};

/** A connection to a list of `Proposal` values. */
export type ProposalsConnection = {
  __typename?: 'ProposalsConnection';
  /** A list of `Proposal` objects. */
  nodes: Array<Maybe<Proposal>>;
  /** A list of edges which contains the `Proposal` and cursor to aid in pagination. */
  edges: Array<ProposalsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Proposal` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Proposal` edge in the connection. */
export type ProposalsEdge = {
  __typename?: 'ProposalsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Proposal` at the end of the edge. */
  node?: Maybe<Proposal>;
};

/** Methods to use when ordering `Proposal`. */
export enum ProposalsOrderBy {
  Natural = 'NATURAL',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  BlockHeightAsc = 'BLOCK_HEIGHT_ASC',
  BlockHeightDesc = 'BLOCK_HEIGHT_DESC',
  TxIdxAsc = 'TX_IDX_ASC',
  TxIdxDesc = 'TX_IDX_DESC',
  MsgIdxAsc = 'MSG_IDX_ASC',
  MsgIdxDesc = 'MSG_IDX_DESC',
  ChainNumAsc = 'CHAIN_NUM_ASC',
  ChainNumDesc = 'CHAIN_NUM_DESC',
  TimestampAsc = 'TIMESTAMP_ASC',
  TimestampDesc = 'TIMESTAMP_DESC',
  TxHashAsc = 'TX_HASH_ASC',
  TxHashDesc = 'TX_HASH_DESC',
  ProposalIdAsc = 'PROPOSAL_ID_ASC',
  ProposalIdDesc = 'PROPOSAL_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  GroupPolicyAddressAsc = 'GROUP_POLICY_ADDRESS_ASC',
  GroupPolicyAddressDesc = 'GROUP_POLICY_ADDRESS_DESC',
  MetadataAsc = 'METADATA_ASC',
  MetadataDesc = 'METADATA_DESC',
  ProposersAsc = 'PROPOSERS_ASC',
  ProposersDesc = 'PROPOSERS_DESC',
  SubmitTimeAsc = 'SUBMIT_TIME_ASC',
  SubmitTimeDesc = 'SUBMIT_TIME_DESC',
  GroupVersionAsc = 'GROUP_VERSION_ASC',
  GroupVersionDesc = 'GROUP_VERSION_DESC',
  GroupPolicyVersionAsc = 'GROUP_POLICY_VERSION_ASC',
  GroupPolicyVersionDesc = 'GROUP_POLICY_VERSION_DESC',
  FinalTallyResultAsc = 'FINAL_TALLY_RESULT_ASC',
  FinalTallyResultDesc = 'FINAL_TALLY_RESULT_DESC',
  VotingPeriodEndAsc = 'VOTING_PERIOD_END_ASC',
  VotingPeriodEndDesc = 'VOTING_PERIOD_END_DESC',
  ExecutorResultAsc = 'EXECUTOR_RESULT_ASC',
  ExecutorResultDesc = 'EXECUTOR_RESULT_DESC',
  MessagesAsc = 'MESSAGES_ASC',
  MessagesDesc = 'MESSAGES_DESC',
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
  /** Reads and enables pagination through a set of `Block`. */
  allBlocks?: Maybe<BlocksConnection>;
  /** Reads and enables pagination through a set of `Chain`. */
  allChains?: Maybe<ChainsConnection>;
  /** Reads and enables pagination through a set of `ClassIssuer`. */
  allClassIssuers?: Maybe<ClassIssuersConnection>;
  /** Reads and enables pagination through a set of `EventRetire`. */
  allEventRetires?: Maybe<EventRetiresConnection>;
  /** Reads and enables pagination through a set of `EventRetireV1`. */
  allEventRetireV1S?: Maybe<EventRetireV1SConnection>;
  /** Reads and enables pagination through a set of `EventRetireV1Alpha1`. */
  allEventRetireV1Alpha1S?: Maybe<EventRetireV1Alpha1SConnection>;
  /** Reads and enables pagination through a set of `FlywaySchemaHistory`. */
  allFlywaySchemaHistories?: Maybe<FlywaySchemaHistoriesConnection>;
  /** Reads and enables pagination through a set of `Msg`. */
  allMsgs?: Maybe<MsgsConnection>;
  /** Reads and enables pagination through a set of `MsgEvent`. */
  allMsgEvents?: Maybe<MsgEventsConnection>;
  /** Reads and enables pagination through a set of `MsgEventAttr`. */
  allMsgEventAttrs?: Maybe<MsgEventAttrsConnection>;
  /** Reads and enables pagination through a set of `Proposal`. */
  allProposals?: Maybe<ProposalsConnection>;
  /** Reads and enables pagination through a set of `Retirement`. */
  allRetirements?: Maybe<RetirementsConnection>;
  /** Reads and enables pagination through a set of `Tx`. */
  allTxes?: Maybe<TxesConnection>;
  /** Reads and enables pagination through a set of `Vote`. */
  allVotes?: Maybe<VotesConnection>;
  blockByChainNumAndHeight?: Maybe<Block>;
  chainByNum?: Maybe<Chain>;
  chainByChainId?: Maybe<Chain>;
  classIssuerByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndClassIdAndIssuer?: Maybe<ClassIssuer>;
  flywaySchemaHistoryByInstalledRank?: Maybe<FlywaySchemaHistory>;
  msgByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Msg>;
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
  msgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHash?: Maybe<MsgEventAttr>;
  proposalByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Proposal>;
  retirementByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Retirement>;
  retirementByTxHash?: Maybe<Retirement>;
  txByChainNumAndBlockHeightAndTxIdx?: Maybe<Tx>;
  txByHash?: Maybe<Tx>;
  voteByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Vote>;
  voteByChainNumAndProposalIdAndVoter?: Maybe<Vote>;
  /** Reads and enables pagination through a set of `Tx`. */
  allEcocreditTxes?: Maybe<TxesConnection>;
  /** Reads a single `Block` using its globally unique `ID`. */
  block?: Maybe<Block>;
  /** Reads a single `Chain` using its globally unique `ID`. */
  chain?: Maybe<Chain>;
  /** Reads a single `ClassIssuer` using its globally unique `ID`. */
  classIssuer?: Maybe<ClassIssuer>;
  /** Reads a single `FlywaySchemaHistory` using its globally unique `ID`. */
  flywaySchemaHistory?: Maybe<FlywaySchemaHistory>;
  /** Reads a single `Msg` using its globally unique `ID`. */
  msg?: Maybe<Msg>;
  /** Reads a single `MsgEvent` using its globally unique `ID`. */
  msgEvent?: Maybe<MsgEvent>;
  /** Reads a single `MsgEventAttr` using its globally unique `ID`. */
  msgEventAttr?: Maybe<MsgEventAttr>;
  /** Reads a single `Proposal` using its globally unique `ID`. */
  proposal?: Maybe<Proposal>;
  /** Reads a single `Retirement` using its globally unique `ID`. */
  retirement?: Maybe<Retirement>;
  /** Reads a single `Tx` using its globally unique `ID`. */
  tx?: Maybe<Tx>;
  /** Reads a single `Vote` using its globally unique `ID`. */
  vote?: Maybe<Vote>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAllBlocksArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<BlocksOrderBy>>;
  condition?: Maybe<BlockCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllChainsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ChainsOrderBy>>;
  condition?: Maybe<ChainCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllClassIssuersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ClassIssuersOrderBy>>;
  condition?: Maybe<ClassIssuerCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllEventRetiresArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EventRetiresOrderBy>>;
  condition?: Maybe<EventRetireCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllEventRetireV1SArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EventRetireV1SOrderBy>>;
  condition?: Maybe<EventRetireV1Condition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllEventRetireV1Alpha1SArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EventRetireV1Alpha1SOrderBy>>;
  condition?: Maybe<EventRetireV1Alpha1Condition>;
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
export type QueryAllMsgsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MsgsOrderBy>>;
  condition?: Maybe<MsgCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllMsgEventsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MsgEventsOrderBy>>;
  condition?: Maybe<MsgEventCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllMsgEventAttrsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MsgEventAttrsOrderBy>>;
  condition?: Maybe<MsgEventAttrCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllProposalsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProposalsOrderBy>>;
  condition?: Maybe<ProposalCondition>;
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
export type QueryAllTxesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TxesOrderBy>>;
  condition?: Maybe<TxCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllVotesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<VotesOrderBy>>;
  condition?: Maybe<VoteCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryBlockByChainNumAndHeightArgs = {
  chainNum: Scalars['Int'];
  height: Scalars['BigInt'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChainByNumArgs = {
  num: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChainByChainIdArgs = {
  chainId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryClassIssuerByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndClassIdAndIssuerArgs = {
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  classId: Scalars['String'];
  issuer: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFlywaySchemaHistoryByInstalledRankArgs = {
  installedRank: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMsgByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMsgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeArgs = {
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  type: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMsgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHashArgs = {
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  type: Scalars['String'];
  key: Scalars['String'];
  valueHash: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProposalByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRetirementByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRetirementByTxHashArgs = {
  txHash: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTxByChainNumAndBlockHeightAndTxIdxArgs = {
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTxByHashArgs = {
  hash: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryVoteByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryVoteByChainNumAndProposalIdAndVoterArgs = {
  chainNum: Scalars['Int'];
  proposalId: Scalars['BigInt'];
  voter: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAllEcocreditTxesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryBlockArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChainArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryClassIssuerArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFlywaySchemaHistoryArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMsgArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMsgEventArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMsgEventAttrArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProposalArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRetirementArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTxArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryVoteArgs = {
  nodeId: Scalars['ID'];
};

export type Retirement = Node & {
  __typename?: 'Retirement';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  type: Scalars['String'];
  jurisdiction: Scalars['String'];
  owner: Scalars['String'];
  reason: Scalars['String'];
  timestamp?: Maybe<Scalars['Datetime']>;
  blockHeight: Scalars['BigInt'];
  chainNum: Scalars['Int'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  txHash: Scalars['String'];
  amount: Scalars['String'];
  batchDenom: Scalars['String'];
  batchDenoms: Array<Maybe<Scalars['String']>>;
  /** Reads a single `MsgEvent` that is related to this `Retirement`. */
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
};

/**
 * A condition to be used against `Retirement` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type RetirementCondition = {
  /** Checks for equality with the object’s `type` field. */
  type?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `jurisdiction` field. */
  jurisdiction?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `owner` field. */
  owner?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `reason` field. */
  reason?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `timestamp` field. */
  timestamp?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `blockHeight` field. */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `chainNum` field. */
  chainNum?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `txIdx` field. */
  txIdx?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `msgIdx` field. */
  msgIdx?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `txHash` field. */
  txHash?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `amount` field. */
  amount?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `batchDenom` field. */
  batchDenom?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `batchDenoms` field. */
  batchDenoms?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** An input for mutations affecting `Retirement` */
export type RetirementInput = {
  type: Scalars['String'];
  jurisdiction: Scalars['String'];
  owner: Scalars['String'];
  reason: Scalars['String'];
  timestamp?: Maybe<Scalars['Datetime']>;
  blockHeight: Scalars['BigInt'];
  chainNum: Scalars['Int'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  txHash: Scalars['String'];
  amount: Scalars['String'];
  batchDenom: Scalars['String'];
  batchDenoms?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Represents an update to a `Retirement`. Fields that are set will be updated. */
export type RetirementPatch = {
  type?: Maybe<Scalars['String']>;
  jurisdiction?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Datetime']>;
  blockHeight?: Maybe<Scalars['BigInt']>;
  chainNum?: Maybe<Scalars['Int']>;
  txIdx?: Maybe<Scalars['Int']>;
  msgIdx?: Maybe<Scalars['Int']>;
  txHash?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['String']>;
  batchDenom?: Maybe<Scalars['String']>;
  batchDenoms?: Maybe<Array<Maybe<Scalars['String']>>>;
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
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  JurisdictionAsc = 'JURISDICTION_ASC',
  JurisdictionDesc = 'JURISDICTION_DESC',
  OwnerAsc = 'OWNER_ASC',
  OwnerDesc = 'OWNER_DESC',
  ReasonAsc = 'REASON_ASC',
  ReasonDesc = 'REASON_DESC',
  TimestampAsc = 'TIMESTAMP_ASC',
  TimestampDesc = 'TIMESTAMP_DESC',
  BlockHeightAsc = 'BLOCK_HEIGHT_ASC',
  BlockHeightDesc = 'BLOCK_HEIGHT_DESC',
  ChainNumAsc = 'CHAIN_NUM_ASC',
  ChainNumDesc = 'CHAIN_NUM_DESC',
  TxIdxAsc = 'TX_IDX_ASC',
  TxIdxDesc = 'TX_IDX_DESC',
  MsgIdxAsc = 'MSG_IDX_ASC',
  MsgIdxDesc = 'MSG_IDX_DESC',
  TxHashAsc = 'TX_HASH_ASC',
  TxHashDesc = 'TX_HASH_DESC',
  AmountAsc = 'AMOUNT_ASC',
  AmountDesc = 'AMOUNT_DESC',
  BatchDenomAsc = 'BATCH_DENOM_ASC',
  BatchDenomDesc = 'BATCH_DENOM_DESC',
  BatchDenomsAsc = 'BATCH_DENOMS_ASC',
  BatchDenomsDesc = 'BATCH_DENOMS_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Tx = Node & {
  __typename?: 'Tx';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  hash: Scalars['String'];
  data: Scalars['JSON'];
  /** Reads a single `Block` that is related to this `Tx`. */
  blockByChainNumAndBlockHeight?: Maybe<Block>;
  /** Reads and enables pagination through a set of `Msg`. */
  msgsByChainNumAndBlockHeightAndTxIdx: MsgsConnection;
};


export type TxMsgsByChainNumAndBlockHeightAndTxIdxArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MsgsOrderBy>>;
  condition?: Maybe<MsgCondition>;
};

/** A condition to be used against `Tx` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TxCondition = {
  /** Checks for equality with the object’s `chainNum` field. */
  chainNum?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `blockHeight` field. */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txIdx` field. */
  txIdx?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `hash` field. */
  hash?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `data` field. */
  data?: Maybe<Scalars['JSON']>;
};

/** An input for mutations affecting `Tx` */
export type TxInput = {
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  hash: Scalars['String'];
  data: Scalars['JSON'];
};

/** Represents an update to a `Tx`. Fields that are set will be updated. */
export type TxPatch = {
  chainNum?: Maybe<Scalars['Int']>;
  blockHeight?: Maybe<Scalars['BigInt']>;
  txIdx?: Maybe<Scalars['Int']>;
  hash?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['JSON']>;
};

/** A connection to a list of `Tx` values. */
export type TxesConnection = {
  __typename?: 'TxesConnection';
  /** A list of `Tx` objects. */
  nodes: Array<Maybe<Tx>>;
  /** A list of edges which contains the `Tx` and cursor to aid in pagination. */
  edges: Array<TxesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Tx` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Tx` edge in the connection. */
export type TxesEdge = {
  __typename?: 'TxesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Tx` at the end of the edge. */
  node?: Maybe<Tx>;
};

/** Methods to use when ordering `Tx`. */
export enum TxesOrderBy {
  Natural = 'NATURAL',
  ChainNumAsc = 'CHAIN_NUM_ASC',
  ChainNumDesc = 'CHAIN_NUM_DESC',
  BlockHeightAsc = 'BLOCK_HEIGHT_ASC',
  BlockHeightDesc = 'BLOCK_HEIGHT_DESC',
  TxIdxAsc = 'TX_IDX_ASC',
  TxIdxDesc = 'TX_IDX_DESC',
  HashAsc = 'HASH_ASC',
  HashDesc = 'HASH_DESC',
  DataAsc = 'DATA_ASC',
  DataDesc = 'DATA_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** All input for the `updateBlockByChainNumAndHeight` mutation. */
export type UpdateBlockByChainNumAndHeightInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Block` being updated. */
  blockPatch: BlockPatch;
  chainNum: Scalars['Int'];
  height: Scalars['BigInt'];
};

/** All input for the `updateBlock` mutation. */
export type UpdateBlockInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Block` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Block` being updated. */
  blockPatch: BlockPatch;
};

/** The output of our update `Block` mutation. */
export type UpdateBlockPayload = {
  __typename?: 'UpdateBlockPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Block` that was updated by this mutation. */
  block?: Maybe<Block>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Chain` that is related to this `Block`. */
  chainByChainNum?: Maybe<Chain>;
  /** An edge for our `Block`. May be used by Relay 1. */
  blockEdge?: Maybe<BlocksEdge>;
};


/** The output of our update `Block` mutation. */
export type UpdateBlockPayloadBlockEdgeArgs = {
  orderBy?: Maybe<Array<BlocksOrderBy>>;
};

/** All input for the `updateChainByChainId` mutation. */
export type UpdateChainByChainIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Chain` being updated. */
  chainPatch: ChainPatch;
  chainId: Scalars['String'];
};

/** All input for the `updateChainByNum` mutation. */
export type UpdateChainByNumInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Chain` being updated. */
  chainPatch: ChainPatch;
  num: Scalars['Int'];
};

/** All input for the `updateChain` mutation. */
export type UpdateChainInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Chain` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Chain` being updated. */
  chainPatch: ChainPatch;
};

/** The output of our update `Chain` mutation. */
export type UpdateChainPayload = {
  __typename?: 'UpdateChainPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Chain` that was updated by this mutation. */
  chain?: Maybe<Chain>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Chain`. May be used by Relay 1. */
  chainEdge?: Maybe<ChainsEdge>;
};


/** The output of our update `Chain` mutation. */
export type UpdateChainPayloadChainEdgeArgs = {
  orderBy?: Maybe<Array<ChainsOrderBy>>;
};

/** All input for the `updateClassIssuerByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndClassIdAndIssuer` mutation. */
export type UpdateClassIssuerByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndClassIdAndIssuerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `ClassIssuer` being updated. */
  classIssuerPatch: ClassIssuerPatch;
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  classId: Scalars['String'];
  issuer: Scalars['String'];
};

/** All input for the `updateClassIssuer` mutation. */
export type UpdateClassIssuerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ClassIssuer` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `ClassIssuer` being updated. */
  classIssuerPatch: ClassIssuerPatch;
};

/** The output of our update `ClassIssuer` mutation. */
export type UpdateClassIssuerPayload = {
  __typename?: 'UpdateClassIssuerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ClassIssuer` that was updated by this mutation. */
  classIssuer?: Maybe<ClassIssuer>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `MsgEvent` that is related to this `ClassIssuer`. */
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
  /** An edge for our `ClassIssuer`. May be used by Relay 1. */
  classIssuerEdge?: Maybe<ClassIssuersEdge>;
};


/** The output of our update `ClassIssuer` mutation. */
export type UpdateClassIssuerPayloadClassIssuerEdgeArgs = {
  orderBy?: Maybe<Array<ClassIssuersOrderBy>>;
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

/** All input for the `updateMsgByChainNumAndBlockHeightAndTxIdxAndMsgIdx` mutation. */
export type UpdateMsgByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Msg` being updated. */
  msgPatch: MsgPatch;
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
};

/** All input for the `updateMsgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHash` mutation. */
export type UpdateMsgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHashInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `MsgEventAttr` being updated. */
  msgEventAttrPatch: MsgEventAttrPatch;
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  type: Scalars['String'];
  key: Scalars['String'];
  valueHash: Scalars['String'];
};

/** All input for the `updateMsgEventAttr` mutation. */
export type UpdateMsgEventAttrInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MsgEventAttr` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `MsgEventAttr` being updated. */
  msgEventAttrPatch: MsgEventAttrPatch;
};

/** The output of our update `MsgEventAttr` mutation. */
export type UpdateMsgEventAttrPayload = {
  __typename?: 'UpdateMsgEventAttrPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MsgEventAttr` that was updated by this mutation. */
  msgEventAttr?: Maybe<MsgEventAttr>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Msg` that is related to this `MsgEventAttr`. */
  msgByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Msg>;
  /** An edge for our `MsgEventAttr`. May be used by Relay 1. */
  msgEventAttrEdge?: Maybe<MsgEventAttrsEdge>;
};


/** The output of our update `MsgEventAttr` mutation. */
export type UpdateMsgEventAttrPayloadMsgEventAttrEdgeArgs = {
  orderBy?: Maybe<Array<MsgEventAttrsOrderBy>>;
};

/** All input for the `updateMsgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType` mutation. */
export type UpdateMsgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `MsgEvent` being updated. */
  msgEventPatch: MsgEventPatch;
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  type: Scalars['String'];
};

/** All input for the `updateMsgEvent` mutation. */
export type UpdateMsgEventInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MsgEvent` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `MsgEvent` being updated. */
  msgEventPatch: MsgEventPatch;
};

/** The output of our update `MsgEvent` mutation. */
export type UpdateMsgEventPayload = {
  __typename?: 'UpdateMsgEventPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MsgEvent` that was updated by this mutation. */
  msgEvent?: Maybe<MsgEvent>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Msg` that is related to this `MsgEvent`. */
  msgByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Msg>;
  /** An edge for our `MsgEvent`. May be used by Relay 1. */
  msgEventEdge?: Maybe<MsgEventsEdge>;
};


/** The output of our update `MsgEvent` mutation. */
export type UpdateMsgEventPayloadMsgEventEdgeArgs = {
  orderBy?: Maybe<Array<MsgEventsOrderBy>>;
};

/** All input for the `updateMsg` mutation. */
export type UpdateMsgInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Msg` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Msg` being updated. */
  msgPatch: MsgPatch;
};

/** The output of our update `Msg` mutation. */
export type UpdateMsgPayload = {
  __typename?: 'UpdateMsgPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Msg` that was updated by this mutation. */
  msg?: Maybe<Msg>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Tx` that is related to this `Msg`. */
  txByChainNumAndBlockHeightAndTxIdx?: Maybe<Tx>;
  /** An edge for our `Msg`. May be used by Relay 1. */
  msgEdge?: Maybe<MsgsEdge>;
};


/** The output of our update `Msg` mutation. */
export type UpdateMsgPayloadMsgEdgeArgs = {
  orderBy?: Maybe<Array<MsgsOrderBy>>;
};

/** All input for the `updateProposalByChainNumAndBlockHeightAndTxIdxAndMsgIdx` mutation. */
export type UpdateProposalByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Proposal` being updated. */
  proposalPatch: ProposalPatch;
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
};

/** All input for the `updateProposal` mutation. */
export type UpdateProposalInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Proposal` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Proposal` being updated. */
  proposalPatch: ProposalPatch;
};

/** The output of our update `Proposal` mutation. */
export type UpdateProposalPayload = {
  __typename?: 'UpdateProposalPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Proposal` that was updated by this mutation. */
  proposal?: Maybe<Proposal>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `MsgEvent` that is related to this `Proposal`. */
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
  /** An edge for our `Proposal`. May be used by Relay 1. */
  proposalEdge?: Maybe<ProposalsEdge>;
};


/** The output of our update `Proposal` mutation. */
export type UpdateProposalPayloadProposalEdgeArgs = {
  orderBy?: Maybe<Array<ProposalsOrderBy>>;
};

/** All input for the `updateRetirementByChainNumAndBlockHeightAndTxIdxAndMsgIdx` mutation. */
export type UpdateRetirementByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Retirement` being updated. */
  retirementPatch: RetirementPatch;
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
};

/** All input for the `updateRetirementByTxHash` mutation. */
export type UpdateRetirementByTxHashInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Retirement` being updated. */
  retirementPatch: RetirementPatch;
  txHash: Scalars['String'];
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
  /** Reads a single `MsgEvent` that is related to this `Retirement`. */
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
  /** An edge for our `Retirement`. May be used by Relay 1. */
  retirementEdge?: Maybe<RetirementsEdge>;
};


/** The output of our update `Retirement` mutation. */
export type UpdateRetirementPayloadRetirementEdgeArgs = {
  orderBy?: Maybe<Array<RetirementsOrderBy>>;
};

/** All input for the `updateTxByChainNumAndBlockHeightAndTxIdx` mutation. */
export type UpdateTxByChainNumAndBlockHeightAndTxIdxInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Tx` being updated. */
  txPatch: TxPatch;
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
};

/** All input for the `updateTxByHash` mutation. */
export type UpdateTxByHashInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Tx` being updated. */
  txPatch: TxPatch;
  hash: Scalars['String'];
};

/** All input for the `updateTx` mutation. */
export type UpdateTxInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Tx` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Tx` being updated. */
  txPatch: TxPatch;
};

/** The output of our update `Tx` mutation. */
export type UpdateTxPayload = {
  __typename?: 'UpdateTxPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Tx` that was updated by this mutation. */
  tx?: Maybe<Tx>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Block` that is related to this `Tx`. */
  blockByChainNumAndBlockHeight?: Maybe<Block>;
  /** An edge for our `Tx`. May be used by Relay 1. */
  txEdge?: Maybe<TxesEdge>;
};


/** The output of our update `Tx` mutation. */
export type UpdateTxPayloadTxEdgeArgs = {
  orderBy?: Maybe<Array<TxesOrderBy>>;
};

/** All input for the `updateVoteByChainNumAndBlockHeightAndTxIdxAndMsgIdx` mutation. */
export type UpdateVoteByChainNumAndBlockHeightAndTxIdxAndMsgIdxInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Vote` being updated. */
  votePatch: VotePatch;
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
};

/** All input for the `updateVoteByChainNumAndProposalIdAndVoter` mutation. */
export type UpdateVoteByChainNumAndProposalIdAndVoterInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Vote` being updated. */
  votePatch: VotePatch;
  chainNum: Scalars['Int'];
  proposalId: Scalars['BigInt'];
  voter: Scalars['String'];
};

/** All input for the `updateVote` mutation. */
export type UpdateVoteInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Vote` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Vote` being updated. */
  votePatch: VotePatch;
};

/** The output of our update `Vote` mutation. */
export type UpdateVotePayload = {
  __typename?: 'UpdateVotePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Vote` that was updated by this mutation. */
  vote?: Maybe<Vote>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `MsgEvent` that is related to this `Vote`. */
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
  /** An edge for our `Vote`. May be used by Relay 1. */
  voteEdge?: Maybe<VotesEdge>;
};


/** The output of our update `Vote` mutation. */
export type UpdateVotePayloadVoteEdgeArgs = {
  orderBy?: Maybe<Array<VotesOrderBy>>;
};

export type Vote = Node & {
  __typename?: 'Vote';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  type: Scalars['String'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  chainNum: Scalars['Int'];
  timestamp?: Maybe<Scalars['Datetime']>;
  txHash: Scalars['String'];
  proposalId: Scalars['BigInt'];
  voter: Scalars['String'];
  option: Scalars['String'];
  metadata: Scalars['String'];
  submitTime: Scalars['Datetime'];
  /** Reads a single `MsgEvent` that is related to this `Vote`. */
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
};

/** A condition to be used against `Vote` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type VoteCondition = {
  /** Checks for equality with the object’s `type` field. */
  type?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `blockHeight` field. */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txIdx` field. */
  txIdx?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `msgIdx` field. */
  msgIdx?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `chainNum` field. */
  chainNum?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `timestamp` field. */
  timestamp?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `txHash` field. */
  txHash?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `proposalId` field. */
  proposalId?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `voter` field. */
  voter?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `option` field. */
  option?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `metadata` field. */
  metadata?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `submitTime` field. */
  submitTime?: Maybe<Scalars['Datetime']>;
};

/** An input for mutations affecting `Vote` */
export type VoteInput = {
  type: Scalars['String'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  chainNum: Scalars['Int'];
  timestamp?: Maybe<Scalars['Datetime']>;
  txHash: Scalars['String'];
  proposalId: Scalars['BigInt'];
  voter: Scalars['String'];
  option: Scalars['String'];
  metadata: Scalars['String'];
  submitTime: Scalars['Datetime'];
};

/** Represents an update to a `Vote`. Fields that are set will be updated. */
export type VotePatch = {
  type?: Maybe<Scalars['String']>;
  blockHeight?: Maybe<Scalars['BigInt']>;
  txIdx?: Maybe<Scalars['Int']>;
  msgIdx?: Maybe<Scalars['Int']>;
  chainNum?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['Datetime']>;
  txHash?: Maybe<Scalars['String']>;
  proposalId?: Maybe<Scalars['BigInt']>;
  voter?: Maybe<Scalars['String']>;
  option?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['String']>;
  submitTime?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `Vote` values. */
export type VotesConnection = {
  __typename?: 'VotesConnection';
  /** A list of `Vote` objects. */
  nodes: Array<Maybe<Vote>>;
  /** A list of edges which contains the `Vote` and cursor to aid in pagination. */
  edges: Array<VotesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Vote` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Vote` edge in the connection. */
export type VotesEdge = {
  __typename?: 'VotesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Vote` at the end of the edge. */
  node?: Maybe<Vote>;
};

/** Methods to use when ordering `Vote`. */
export enum VotesOrderBy {
  Natural = 'NATURAL',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  BlockHeightAsc = 'BLOCK_HEIGHT_ASC',
  BlockHeightDesc = 'BLOCK_HEIGHT_DESC',
  TxIdxAsc = 'TX_IDX_ASC',
  TxIdxDesc = 'TX_IDX_DESC',
  MsgIdxAsc = 'MSG_IDX_ASC',
  MsgIdxDesc = 'MSG_IDX_DESC',
  ChainNumAsc = 'CHAIN_NUM_ASC',
  ChainNumDesc = 'CHAIN_NUM_DESC',
  TimestampAsc = 'TIMESTAMP_ASC',
  TimestampDesc = 'TIMESTAMP_DESC',
  TxHashAsc = 'TX_HASH_ASC',
  TxHashDesc = 'TX_HASH_DESC',
  ProposalIdAsc = 'PROPOSAL_ID_ASC',
  ProposalIdDesc = 'PROPOSAL_ID_DESC',
  VoterAsc = 'VOTER_ASC',
  VoterDesc = 'VOTER_DESC',
  OptionAsc = 'OPTION_ASC',
  OptionDesc = 'OPTION_DESC',
  MetadataAsc = 'METADATA_ASC',
  MetadataDesc = 'METADATA_DESC',
  SubmitTimeAsc = 'SUBMIT_TIME_ASC',
  SubmitTimeDesc = 'SUBMIT_TIME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type IndexerAllEcocreditTxesQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type IndexerAllEcocreditTxesQuery = (
  { __typename?: 'Query' }
  & { allEcocreditTxes?: Maybe<(
    { __typename?: 'TxesConnection' }
    & Pick<TxesConnection, 'totalCount'>
    & { nodes: Array<Maybe<(
      { __typename?: 'Tx' }
      & Pick<Tx, 'txIdx' | 'hash' | 'blockHeight' | 'data'>
    )>> }
  )> }
);

export type IndexerAllRetirementsByOwnerQueryVariables = Exact<{
  owner: Scalars['String'];
  orderBy: RetirementsOrderBy;
}>;


export type IndexerAllRetirementsByOwnerQuery = (
  { __typename?: 'Query' }
  & { allRetirements?: Maybe<(
    { __typename?: 'RetirementsConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'Retirement' }
      & RetirementFieldsFragment
    )>> }
  )> }
);

export type IndexerAllTxesQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<TxesOrderBy> | TxesOrderBy>;
}>;


export type IndexerAllTxesQuery = (
  { __typename?: 'Query' }
  & { allTxes?: Maybe<(
    { __typename?: 'TxesConnection' }
    & Pick<TxesConnection, 'totalCount'>
    & { nodes: Array<Maybe<(
      { __typename?: 'Tx' }
      & Pick<Tx, 'txIdx' | 'hash' | 'blockHeight' | 'data'>
    )>> }
  )> }
);

export type IndexerClassesByIssuerQueryVariables = Exact<{
  issuer?: Maybe<Scalars['String']>;
}>;


export type IndexerClassesByIssuerQuery = (
  { __typename?: 'Query' }
  & { allClassIssuers?: Maybe<(
    { __typename?: 'ClassIssuersConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'ClassIssuer' }
      & Pick<ClassIssuer, 'blockHeight' | 'classId' | 'issuer'>
    )>> }
  )> }
);

export type IndexerIssuersByClassIdQueryVariables = Exact<{
  classId?: Maybe<Scalars['String']>;
}>;


export type IndexerIssuersByClassIdQuery = (
  { __typename?: 'Query' }
  & { allClassIssuers?: Maybe<(
    { __typename?: 'ClassIssuersConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'ClassIssuer' }
      & Pick<ClassIssuer, 'blockHeight' | 'classId' | 'issuer'>
    )>> }
  )> }
);

export type IndexerRetirementByNodeIdQueryVariables = Exact<{
  nodeId: Scalars['ID'];
}>;


export type IndexerRetirementByNodeIdQuery = (
  { __typename?: 'Query' }
  & { retirement?: Maybe<(
    { __typename?: 'Retirement' }
    & RetirementFieldsFragment
  )> }
);

export type IndexerRetirementByTxHashQueryVariables = Exact<{
  txHash: Scalars['String'];
}>;


export type IndexerRetirementByTxHashQuery = (
  { __typename?: 'Query' }
  & { retirementByTxHash?: Maybe<(
    { __typename?: 'Retirement' }
    & RetirementFieldsFragment
  )> }
);

export type RetirementFieldsFragment = (
  { __typename?: 'Retirement' }
  & Pick<Retirement, 'nodeId' | 'owner' | 'amount' | 'reason' | 'batchDenom' | 'batchDenoms' | 'jurisdiction' | 'timestamp' | 'txHash'>
);

export const RetirementFieldsFragmentDoc = gql`
    fragment retirementFields on Retirement {
  nodeId
  owner
  amount
  reason
  batchDenom
  batchDenoms
  jurisdiction
  timestamp
  reason
  txHash
}
    `;
export const IndexerAllEcocreditTxesDocument = gql`
    query IndexerAllEcocreditTxes($first: Int, $offset: Int) {
  allEcocreditTxes(first: $first, offset: $offset) {
    nodes {
      txIdx
      hash
      blockHeight
      data
    }
    totalCount
  }
}
    `;

/**
 * __useIndexerAllEcocreditTxesQuery__
 *
 * To run a query within a React component, call `useIndexerAllEcocreditTxesQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndexerAllEcocreditTxesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndexerAllEcocreditTxesQuery({
 *   variables: {
 *      first: // value for 'first'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useIndexerAllEcocreditTxesQuery(baseOptions?: Apollo.QueryHookOptions<IndexerAllEcocreditTxesQuery, IndexerAllEcocreditTxesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IndexerAllEcocreditTxesQuery, IndexerAllEcocreditTxesQueryVariables>(IndexerAllEcocreditTxesDocument, options);
      }
export function useIndexerAllEcocreditTxesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IndexerAllEcocreditTxesQuery, IndexerAllEcocreditTxesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IndexerAllEcocreditTxesQuery, IndexerAllEcocreditTxesQueryVariables>(IndexerAllEcocreditTxesDocument, options);
        }
export type IndexerAllEcocreditTxesQueryHookResult = ReturnType<typeof useIndexerAllEcocreditTxesQuery>;
export type IndexerAllEcocreditTxesLazyQueryHookResult = ReturnType<typeof useIndexerAllEcocreditTxesLazyQuery>;
export type IndexerAllEcocreditTxesQueryResult = Apollo.QueryResult<IndexerAllEcocreditTxesQuery, IndexerAllEcocreditTxesQueryVariables>;
export const IndexerAllRetirementsByOwnerDocument = gql`
    query IndexerAllRetirementsByOwner($owner: String!, $orderBy: RetirementsOrderBy!) {
  allRetirements(condition: {owner: $owner}, orderBy: [$orderBy]) {
    nodes {
      ...retirementFields
    }
  }
}
    ${RetirementFieldsFragmentDoc}`;

/**
 * __useIndexerAllRetirementsByOwnerQuery__
 *
 * To run a query within a React component, call `useIndexerAllRetirementsByOwnerQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndexerAllRetirementsByOwnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndexerAllRetirementsByOwnerQuery({
 *   variables: {
 *      owner: // value for 'owner'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useIndexerAllRetirementsByOwnerQuery(baseOptions: Apollo.QueryHookOptions<IndexerAllRetirementsByOwnerQuery, IndexerAllRetirementsByOwnerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IndexerAllRetirementsByOwnerQuery, IndexerAllRetirementsByOwnerQueryVariables>(IndexerAllRetirementsByOwnerDocument, options);
      }
export function useIndexerAllRetirementsByOwnerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IndexerAllRetirementsByOwnerQuery, IndexerAllRetirementsByOwnerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IndexerAllRetirementsByOwnerQuery, IndexerAllRetirementsByOwnerQueryVariables>(IndexerAllRetirementsByOwnerDocument, options);
        }
export type IndexerAllRetirementsByOwnerQueryHookResult = ReturnType<typeof useIndexerAllRetirementsByOwnerQuery>;
export type IndexerAllRetirementsByOwnerLazyQueryHookResult = ReturnType<typeof useIndexerAllRetirementsByOwnerLazyQuery>;
export type IndexerAllRetirementsByOwnerQueryResult = Apollo.QueryResult<IndexerAllRetirementsByOwnerQuery, IndexerAllRetirementsByOwnerQueryVariables>;
export const IndexerAllTxesDocument = gql`
    query IndexerAllTxes($first: Int, $offset: Int, $orderBy: [TxesOrderBy!]) {
  allTxes(first: $first, offset: $offset, orderBy: $orderBy) {
    nodes {
      txIdx
      hash
      blockHeight
      data
    }
    totalCount
  }
}
    `;

/**
 * __useIndexerAllTxesQuery__
 *
 * To run a query within a React component, call `useIndexerAllTxesQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndexerAllTxesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndexerAllTxesQuery({
 *   variables: {
 *      first: // value for 'first'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useIndexerAllTxesQuery(baseOptions?: Apollo.QueryHookOptions<IndexerAllTxesQuery, IndexerAllTxesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IndexerAllTxesQuery, IndexerAllTxesQueryVariables>(IndexerAllTxesDocument, options);
      }
export function useIndexerAllTxesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IndexerAllTxesQuery, IndexerAllTxesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IndexerAllTxesQuery, IndexerAllTxesQueryVariables>(IndexerAllTxesDocument, options);
        }
export type IndexerAllTxesQueryHookResult = ReturnType<typeof useIndexerAllTxesQuery>;
export type IndexerAllTxesLazyQueryHookResult = ReturnType<typeof useIndexerAllTxesLazyQuery>;
export type IndexerAllTxesQueryResult = Apollo.QueryResult<IndexerAllTxesQuery, IndexerAllTxesQueryVariables>;
export const IndexerClassesByIssuerDocument = gql`
    query IndexerClassesByIssuer($issuer: String) {
  allClassIssuers(condition: {latest: true, issuer: $issuer}) {
    nodes {
      blockHeight
      classId
      issuer
    }
  }
}
    `;

/**
 * __useIndexerClassesByIssuerQuery__
 *
 * To run a query within a React component, call `useIndexerClassesByIssuerQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndexerClassesByIssuerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndexerClassesByIssuerQuery({
 *   variables: {
 *      issuer: // value for 'issuer'
 *   },
 * });
 */
export function useIndexerClassesByIssuerQuery(baseOptions?: Apollo.QueryHookOptions<IndexerClassesByIssuerQuery, IndexerClassesByIssuerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IndexerClassesByIssuerQuery, IndexerClassesByIssuerQueryVariables>(IndexerClassesByIssuerDocument, options);
      }
export function useIndexerClassesByIssuerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IndexerClassesByIssuerQuery, IndexerClassesByIssuerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IndexerClassesByIssuerQuery, IndexerClassesByIssuerQueryVariables>(IndexerClassesByIssuerDocument, options);
        }
export type IndexerClassesByIssuerQueryHookResult = ReturnType<typeof useIndexerClassesByIssuerQuery>;
export type IndexerClassesByIssuerLazyQueryHookResult = ReturnType<typeof useIndexerClassesByIssuerLazyQuery>;
export type IndexerClassesByIssuerQueryResult = Apollo.QueryResult<IndexerClassesByIssuerQuery, IndexerClassesByIssuerQueryVariables>;
export const IndexerIssuersByClassIdDocument = gql`
    query IndexerIssuersByClassId($classId: String) {
  allClassIssuers(condition: {latest: true, classId: $classId}) {
    nodes {
      blockHeight
      classId
      issuer
    }
  }
}
    `;

/**
 * __useIndexerIssuersByClassIdQuery__
 *
 * To run a query within a React component, call `useIndexerIssuersByClassIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndexerIssuersByClassIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndexerIssuersByClassIdQuery({
 *   variables: {
 *      classId: // value for 'classId'
 *   },
 * });
 */
export function useIndexerIssuersByClassIdQuery(baseOptions?: Apollo.QueryHookOptions<IndexerIssuersByClassIdQuery, IndexerIssuersByClassIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IndexerIssuersByClassIdQuery, IndexerIssuersByClassIdQueryVariables>(IndexerIssuersByClassIdDocument, options);
      }
export function useIndexerIssuersByClassIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IndexerIssuersByClassIdQuery, IndexerIssuersByClassIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IndexerIssuersByClassIdQuery, IndexerIssuersByClassIdQueryVariables>(IndexerIssuersByClassIdDocument, options);
        }
export type IndexerIssuersByClassIdQueryHookResult = ReturnType<typeof useIndexerIssuersByClassIdQuery>;
export type IndexerIssuersByClassIdLazyQueryHookResult = ReturnType<typeof useIndexerIssuersByClassIdLazyQuery>;
export type IndexerIssuersByClassIdQueryResult = Apollo.QueryResult<IndexerIssuersByClassIdQuery, IndexerIssuersByClassIdQueryVariables>;
export const IndexerRetirementByNodeIdDocument = gql`
    query IndexerRetirementByNodeId($nodeId: ID!) {
  retirement(nodeId: $nodeId) {
    ...retirementFields
  }
}
    ${RetirementFieldsFragmentDoc}`;

/**
 * __useIndexerRetirementByNodeIdQuery__
 *
 * To run a query within a React component, call `useIndexerRetirementByNodeIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndexerRetirementByNodeIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndexerRetirementByNodeIdQuery({
 *   variables: {
 *      nodeId: // value for 'nodeId'
 *   },
 * });
 */
export function useIndexerRetirementByNodeIdQuery(baseOptions: Apollo.QueryHookOptions<IndexerRetirementByNodeIdQuery, IndexerRetirementByNodeIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IndexerRetirementByNodeIdQuery, IndexerRetirementByNodeIdQueryVariables>(IndexerRetirementByNodeIdDocument, options);
      }
export function useIndexerRetirementByNodeIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IndexerRetirementByNodeIdQuery, IndexerRetirementByNodeIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IndexerRetirementByNodeIdQuery, IndexerRetirementByNodeIdQueryVariables>(IndexerRetirementByNodeIdDocument, options);
        }
export type IndexerRetirementByNodeIdQueryHookResult = ReturnType<typeof useIndexerRetirementByNodeIdQuery>;
export type IndexerRetirementByNodeIdLazyQueryHookResult = ReturnType<typeof useIndexerRetirementByNodeIdLazyQuery>;
export type IndexerRetirementByNodeIdQueryResult = Apollo.QueryResult<IndexerRetirementByNodeIdQuery, IndexerRetirementByNodeIdQueryVariables>;
export const IndexerRetirementByTxHashDocument = gql`
    query IndexerRetirementByTxHash($txHash: String!) {
  retirementByTxHash(txHash: $txHash) {
    ...retirementFields
  }
}
    ${RetirementFieldsFragmentDoc}`;

/**
 * __useIndexerRetirementByTxHashQuery__
 *
 * To run a query within a React component, call `useIndexerRetirementByTxHashQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndexerRetirementByTxHashQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndexerRetirementByTxHashQuery({
 *   variables: {
 *      txHash: // value for 'txHash'
 *   },
 * });
 */
export function useIndexerRetirementByTxHashQuery(baseOptions: Apollo.QueryHookOptions<IndexerRetirementByTxHashQuery, IndexerRetirementByTxHashQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IndexerRetirementByTxHashQuery, IndexerRetirementByTxHashQueryVariables>(IndexerRetirementByTxHashDocument, options);
      }
export function useIndexerRetirementByTxHashLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IndexerRetirementByTxHashQuery, IndexerRetirementByTxHashQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IndexerRetirementByTxHashQuery, IndexerRetirementByTxHashQueryVariables>(IndexerRetirementByTxHashDocument, options);
        }
export type IndexerRetirementByTxHashQueryHookResult = ReturnType<typeof useIndexerRetirementByTxHashQuery>;
export type IndexerRetirementByTxHashLazyQueryHookResult = ReturnType<typeof useIndexerRetirementByTxHashLazyQuery>;
export type IndexerRetirementByTxHashQueryResult = Apollo.QueryResult<IndexerRetirementByTxHashQuery, IndexerRetirementByTxHashQueryVariables>;