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
  /** Reads and enables pagination through a set of `MsgEvent`. */
  msgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdx: MsgEventsConnection;
  /** Reads and enables pagination through a set of `MsgEventAttr`. */
  msgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdx: MsgEventAttrsConnection;
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


export type MsgMsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MsgEventAttrsOrderBy>>;
  condition?: Maybe<MsgEventAttrCondition>;
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
  /** Reads and enables pagination through a set of `Retirement`. */
  retirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType: RetirementsConnection;
  /** Reads and enables pagination through a set of `Proposal`. */
  proposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType: ProposalsConnection;
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


export type MsgEventProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProposalsOrderBy>>;
  condition?: Maybe<ProposalCondition>;
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
  /** Updates a single `Tx` using its globally unique id and a patch. */
  updateTx?: Maybe<UpdateTxPayload>;
  /** Updates a single `Tx` using a unique key and a patch. */
  updateTxByChainNumAndBlockHeightAndTxIdx?: Maybe<UpdateTxPayload>;
  /** Updates a single `Tx` using a unique key and a patch. */
  updateTxByHash?: Maybe<UpdateTxPayload>;
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
  /** Deletes a single `Tx` using its globally unique id. */
  deleteTx?: Maybe<DeleteTxPayload>;
  /** Deletes a single `Tx` using a unique key. */
  deleteTxByChainNumAndBlockHeightAndTxIdx?: Maybe<DeleteTxPayload>;
  /** Deletes a single `Tx` using a unique key. */
  deleteTxByHash?: Maybe<DeleteTxPayload>;
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
  blockByChainNumAndHeight?: Maybe<Block>;
  chainByNum?: Maybe<Chain>;
  chainByChainId?: Maybe<Chain>;
  msgByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Msg>;
  msgEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndType?: Maybe<MsgEvent>;
  msgEventAttrByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAndKeyAndValueHash?: Maybe<MsgEventAttr>;
  proposalByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Proposal>;
  retirementByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Retirement>;
  txByChainNumAndBlockHeightAndTxIdx?: Maybe<Tx>;
  txByHash?: Maybe<Tx>;
  /** Reads and enables pagination through a set of `Tx`. */
  allEcocreditTxes?: Maybe<TxesConnection>;
  /** Reads a single `Block` using its globally unique `ID`. */
  block?: Maybe<Block>;
  /** Reads a single `Chain` using its globally unique `ID`. */
  chain?: Maybe<Chain>;
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

export type Retirement = Node & {
  __typename?: 'Retirement';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  type: Scalars['String'];
  amount: Scalars['String'];
  batchDenom: Scalars['String'];
  jurisdiction: Scalars['String'];
  owner: Scalars['String'];
  reason: Scalars['String'];
  timestamp?: Maybe<Scalars['Datetime']>;
  blockHeight: Scalars['BigInt'];
  chainNum: Scalars['Int'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  txHash: Scalars['String'];
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
  /** Checks for equality with the object’s `amount` field. */
  amount?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `batchDenom` field. */
  batchDenom?: Maybe<Scalars['String']>;
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
};

/** An input for mutations affecting `Retirement` */
export type RetirementInput = {
  type: Scalars['String'];
  amount: Scalars['String'];
  batchDenom: Scalars['String'];
  jurisdiction: Scalars['String'];
  owner: Scalars['String'];
  reason: Scalars['String'];
  timestamp?: Maybe<Scalars['Datetime']>;
  blockHeight: Scalars['BigInt'];
  chainNum: Scalars['Int'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  txHash: Scalars['String'];
};

/** Represents an update to a `Retirement`. Fields that are set will be updated. */
export type RetirementPatch = {
  type?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['String']>;
  batchDenom?: Maybe<Scalars['String']>;
  jurisdiction?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Datetime']>;
  blockHeight?: Maybe<Scalars['BigInt']>;
  chainNum?: Maybe<Scalars['Int']>;
  txIdx?: Maybe<Scalars['Int']>;
  msgIdx?: Maybe<Scalars['Int']>;
  txHash?: Maybe<Scalars['String']>;
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
  AmountAsc = 'AMOUNT_ASC',
  AmountDesc = 'AMOUNT_DESC',
  BatchDenomAsc = 'BATCH_DENOM_ASC',
  BatchDenomDesc = 'BATCH_DENOM_DESC',
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

export type RetirementFieldsFragment = (
  { __typename?: 'Retirement' }
  & Pick<Retirement, 'nodeId' | 'owner' | 'amount' | 'reason' | 'batchDenom' | 'jurisdiction' | 'timestamp' | 'txHash'>
);

export const RetirementFieldsFragmentDoc = gql`
    fragment retirementFields on Retirement {
  nodeId
  owner
  amount
  reason
  batchDenom
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