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



/** A filter to be used against BigInt fields. All fields are combined with a logical ‘and.’ */
export type BigIntFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['BigInt']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['BigInt']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['BigInt']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['BigInt']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['BigInt']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['BigInt']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['BigInt']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['BigInt']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['BigInt']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['BigInt']>;
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
  filter?: Maybe<TxFilter>;
};

export type BlockAggregates = {
  __typename?: 'BlockAggregates';
  keys?: Maybe<Array<Scalars['String']>>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<BlockSumAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<BlockDistinctCountAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<BlockMinAggregates>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<BlockMaxAggregates>;
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<BlockAverageAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<BlockStddevSampleAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<BlockStddevPopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<BlockVarianceSampleAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<BlockVariancePopulationAggregates>;
};

export type BlockAverageAggregates = {
  __typename?: 'BlockAverageAggregates';
  /** Mean average of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Mean average of height across the matching connection */
  height?: Maybe<Scalars['BigFloat']>;
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

export type BlockDistinctCountAggregates = {
  __typename?: 'BlockDistinctCountAggregates';
  /** Distinct count of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigInt']>;
  /** Distinct count of height across the matching connection */
  height?: Maybe<Scalars['BigInt']>;
  /** Distinct count of data across the matching connection */
  data?: Maybe<Scalars['BigInt']>;
  /** Distinct count of time across the matching connection */
  time?: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `Block` object types. All fields are combined with a logical ‘and.’ */
export type BlockFilter = {
  /** Filter by the object’s `chainNum` field. */
  chainNum?: Maybe<IntFilter>;
  /** Filter by the object’s `height` field. */
  height?: Maybe<BigIntFilter>;
  /** Filter by the object’s `data` field. */
  data?: Maybe<JsonFilter>;
  /** Filter by the object’s `time` field. */
  time?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<BlockFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<BlockFilter>>;
  /** Negates the expression. */
  not?: Maybe<BlockFilter>;
};

/** Grouping methods for `Block` for usage during aggregation. */
export enum BlockGroupBy {
  ChainNum = 'CHAIN_NUM',
  Height = 'HEIGHT',
  Data = 'DATA',
  Time = 'TIME',
  TimeTruncatedToHour = 'TIME_TRUNCATED_TO_HOUR',
  TimeTruncatedToDay = 'TIME_TRUNCATED_TO_DAY'
}

export type BlockHavingAverageInput = {
  chainNum?: Maybe<HavingIntFilter>;
  height?: Maybe<HavingBigintFilter>;
  time?: Maybe<HavingDatetimeFilter>;
};

export type BlockHavingDistinctCountInput = {
  chainNum?: Maybe<HavingIntFilter>;
  height?: Maybe<HavingBigintFilter>;
  time?: Maybe<HavingDatetimeFilter>;
};

/** Conditions for `Block` aggregates. */
export type BlockHavingInput = {
  AND?: Maybe<Array<BlockHavingInput>>;
  OR?: Maybe<Array<BlockHavingInput>>;
  sum?: Maybe<BlockHavingSumInput>;
  distinctCount?: Maybe<BlockHavingDistinctCountInput>;
  min?: Maybe<BlockHavingMinInput>;
  max?: Maybe<BlockHavingMaxInput>;
  average?: Maybe<BlockHavingAverageInput>;
  stddevSample?: Maybe<BlockHavingStddevSampleInput>;
  stddevPopulation?: Maybe<BlockHavingStddevPopulationInput>;
  varianceSample?: Maybe<BlockHavingVarianceSampleInput>;
  variancePopulation?: Maybe<BlockHavingVariancePopulationInput>;
};

export type BlockHavingMaxInput = {
  chainNum?: Maybe<HavingIntFilter>;
  height?: Maybe<HavingBigintFilter>;
  time?: Maybe<HavingDatetimeFilter>;
};

export type BlockHavingMinInput = {
  chainNum?: Maybe<HavingIntFilter>;
  height?: Maybe<HavingBigintFilter>;
  time?: Maybe<HavingDatetimeFilter>;
};

export type BlockHavingStddevPopulationInput = {
  chainNum?: Maybe<HavingIntFilter>;
  height?: Maybe<HavingBigintFilter>;
  time?: Maybe<HavingDatetimeFilter>;
};

export type BlockHavingStddevSampleInput = {
  chainNum?: Maybe<HavingIntFilter>;
  height?: Maybe<HavingBigintFilter>;
  time?: Maybe<HavingDatetimeFilter>;
};

export type BlockHavingSumInput = {
  chainNum?: Maybe<HavingIntFilter>;
  height?: Maybe<HavingBigintFilter>;
  time?: Maybe<HavingDatetimeFilter>;
};

export type BlockHavingVariancePopulationInput = {
  chainNum?: Maybe<HavingIntFilter>;
  height?: Maybe<HavingBigintFilter>;
  time?: Maybe<HavingDatetimeFilter>;
};

export type BlockHavingVarianceSampleInput = {
  chainNum?: Maybe<HavingIntFilter>;
  height?: Maybe<HavingBigintFilter>;
  time?: Maybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `Block` */
export type BlockInput = {
  chainNum: Scalars['Int'];
  height: Scalars['BigInt'];
  data: Scalars['JSON'];
  time: Scalars['Datetime'];
};

export type BlockMaxAggregates = {
  __typename?: 'BlockMaxAggregates';
  /** Maximum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Maximum of height across the matching connection */
  height?: Maybe<Scalars['BigInt']>;
};

export type BlockMinAggregates = {
  __typename?: 'BlockMinAggregates';
  /** Minimum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Minimum of height across the matching connection */
  height?: Maybe<Scalars['BigInt']>;
};

/** Represents an update to a `Block`. Fields that are set will be updated. */
export type BlockPatch = {
  chainNum?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['BigInt']>;
  data?: Maybe<Scalars['JSON']>;
  time?: Maybe<Scalars['Datetime']>;
};

export type BlockStddevPopulationAggregates = {
  __typename?: 'BlockStddevPopulationAggregates';
  /** Population standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of height across the matching connection */
  height?: Maybe<Scalars['BigFloat']>;
};

export type BlockStddevSampleAggregates = {
  __typename?: 'BlockStddevSampleAggregates';
  /** Sample standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of height across the matching connection */
  height?: Maybe<Scalars['BigFloat']>;
};

export type BlockSumAggregates = {
  __typename?: 'BlockSumAggregates';
  /** Sum of chainNum across the matching connection */
  chainNum: Scalars['BigInt'];
  /** Sum of height across the matching connection */
  height: Scalars['BigFloat'];
};

export type BlockVariancePopulationAggregates = {
  __typename?: 'BlockVariancePopulationAggregates';
  /** Population variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population variance of height across the matching connection */
  height?: Maybe<Scalars['BigFloat']>;
};

export type BlockVarianceSampleAggregates = {
  __typename?: 'BlockVarianceSampleAggregates';
  /** Sample variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of height across the matching connection */
  height?: Maybe<Scalars['BigFloat']>;
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
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<BlockAggregates>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<BlockAggregates>>;
};


/** A connection to a list of `Block` values. */
export type BlocksConnectionGroupedAggregatesArgs = {
  groupBy: Array<BlockGroupBy>;
  having?: Maybe<BlockHavingInput>;
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
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TxesByChainNumAndBlockHeightCountAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_COUNT_ASC',
  TxesByChainNumAndBlockHeightCountDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_COUNT_DESC',
  TxesByChainNumAndBlockHeightSumChainNumAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_SUM_CHAIN_NUM_ASC',
  TxesByChainNumAndBlockHeightSumChainNumDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_SUM_CHAIN_NUM_DESC',
  TxesByChainNumAndBlockHeightSumBlockHeightAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_SUM_BLOCK_HEIGHT_ASC',
  TxesByChainNumAndBlockHeightSumBlockHeightDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_SUM_BLOCK_HEIGHT_DESC',
  TxesByChainNumAndBlockHeightSumTxIdxAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_SUM_TX_IDX_ASC',
  TxesByChainNumAndBlockHeightSumTxIdxDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_SUM_TX_IDX_DESC',
  TxesByChainNumAndBlockHeightSumHashAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_SUM_HASH_ASC',
  TxesByChainNumAndBlockHeightSumHashDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_SUM_HASH_DESC',
  TxesByChainNumAndBlockHeightSumDataAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_SUM_DATA_ASC',
  TxesByChainNumAndBlockHeightSumDataDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_SUM_DATA_DESC',
  TxesByChainNumAndBlockHeightDistinctCountChainNumAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_DISTINCT_COUNT_CHAIN_NUM_ASC',
  TxesByChainNumAndBlockHeightDistinctCountChainNumDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_DISTINCT_COUNT_CHAIN_NUM_DESC',
  TxesByChainNumAndBlockHeightDistinctCountBlockHeightAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_DISTINCT_COUNT_BLOCK_HEIGHT_ASC',
  TxesByChainNumAndBlockHeightDistinctCountBlockHeightDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_DISTINCT_COUNT_BLOCK_HEIGHT_DESC',
  TxesByChainNumAndBlockHeightDistinctCountTxIdxAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_DISTINCT_COUNT_TX_IDX_ASC',
  TxesByChainNumAndBlockHeightDistinctCountTxIdxDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_DISTINCT_COUNT_TX_IDX_DESC',
  TxesByChainNumAndBlockHeightDistinctCountHashAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_DISTINCT_COUNT_HASH_ASC',
  TxesByChainNumAndBlockHeightDistinctCountHashDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_DISTINCT_COUNT_HASH_DESC',
  TxesByChainNumAndBlockHeightDistinctCountDataAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_DISTINCT_COUNT_DATA_ASC',
  TxesByChainNumAndBlockHeightDistinctCountDataDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_DISTINCT_COUNT_DATA_DESC',
  TxesByChainNumAndBlockHeightMinChainNumAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_MIN_CHAIN_NUM_ASC',
  TxesByChainNumAndBlockHeightMinChainNumDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_MIN_CHAIN_NUM_DESC',
  TxesByChainNumAndBlockHeightMinBlockHeightAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_MIN_BLOCK_HEIGHT_ASC',
  TxesByChainNumAndBlockHeightMinBlockHeightDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_MIN_BLOCK_HEIGHT_DESC',
  TxesByChainNumAndBlockHeightMinTxIdxAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_MIN_TX_IDX_ASC',
  TxesByChainNumAndBlockHeightMinTxIdxDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_MIN_TX_IDX_DESC',
  TxesByChainNumAndBlockHeightMinHashAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_MIN_HASH_ASC',
  TxesByChainNumAndBlockHeightMinHashDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_MIN_HASH_DESC',
  TxesByChainNumAndBlockHeightMinDataAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_MIN_DATA_ASC',
  TxesByChainNumAndBlockHeightMinDataDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_MIN_DATA_DESC',
  TxesByChainNumAndBlockHeightMaxChainNumAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_MAX_CHAIN_NUM_ASC',
  TxesByChainNumAndBlockHeightMaxChainNumDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_MAX_CHAIN_NUM_DESC',
  TxesByChainNumAndBlockHeightMaxBlockHeightAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_MAX_BLOCK_HEIGHT_ASC',
  TxesByChainNumAndBlockHeightMaxBlockHeightDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_MAX_BLOCK_HEIGHT_DESC',
  TxesByChainNumAndBlockHeightMaxTxIdxAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_MAX_TX_IDX_ASC',
  TxesByChainNumAndBlockHeightMaxTxIdxDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_MAX_TX_IDX_DESC',
  TxesByChainNumAndBlockHeightMaxHashAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_MAX_HASH_ASC',
  TxesByChainNumAndBlockHeightMaxHashDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_MAX_HASH_DESC',
  TxesByChainNumAndBlockHeightMaxDataAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_MAX_DATA_ASC',
  TxesByChainNumAndBlockHeightMaxDataDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_MAX_DATA_DESC',
  TxesByChainNumAndBlockHeightAverageChainNumAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AVERAGE_CHAIN_NUM_ASC',
  TxesByChainNumAndBlockHeightAverageChainNumDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AVERAGE_CHAIN_NUM_DESC',
  TxesByChainNumAndBlockHeightAverageBlockHeightAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AVERAGE_BLOCK_HEIGHT_ASC',
  TxesByChainNumAndBlockHeightAverageBlockHeightDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AVERAGE_BLOCK_HEIGHT_DESC',
  TxesByChainNumAndBlockHeightAverageTxIdxAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AVERAGE_TX_IDX_ASC',
  TxesByChainNumAndBlockHeightAverageTxIdxDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AVERAGE_TX_IDX_DESC',
  TxesByChainNumAndBlockHeightAverageHashAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AVERAGE_HASH_ASC',
  TxesByChainNumAndBlockHeightAverageHashDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AVERAGE_HASH_DESC',
  TxesByChainNumAndBlockHeightAverageDataAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AVERAGE_DATA_ASC',
  TxesByChainNumAndBlockHeightAverageDataDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AVERAGE_DATA_DESC',
  TxesByChainNumAndBlockHeightStddevSampleChainNumAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_STDDEV_SAMPLE_CHAIN_NUM_ASC',
  TxesByChainNumAndBlockHeightStddevSampleChainNumDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_STDDEV_SAMPLE_CHAIN_NUM_DESC',
  TxesByChainNumAndBlockHeightStddevSampleBlockHeightAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_STDDEV_SAMPLE_BLOCK_HEIGHT_ASC',
  TxesByChainNumAndBlockHeightStddevSampleBlockHeightDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_STDDEV_SAMPLE_BLOCK_HEIGHT_DESC',
  TxesByChainNumAndBlockHeightStddevSampleTxIdxAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_STDDEV_SAMPLE_TX_IDX_ASC',
  TxesByChainNumAndBlockHeightStddevSampleTxIdxDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_STDDEV_SAMPLE_TX_IDX_DESC',
  TxesByChainNumAndBlockHeightStddevSampleHashAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_STDDEV_SAMPLE_HASH_ASC',
  TxesByChainNumAndBlockHeightStddevSampleHashDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_STDDEV_SAMPLE_HASH_DESC',
  TxesByChainNumAndBlockHeightStddevSampleDataAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_STDDEV_SAMPLE_DATA_ASC',
  TxesByChainNumAndBlockHeightStddevSampleDataDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_STDDEV_SAMPLE_DATA_DESC',
  TxesByChainNumAndBlockHeightStddevPopulationChainNumAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_STDDEV_POPULATION_CHAIN_NUM_ASC',
  TxesByChainNumAndBlockHeightStddevPopulationChainNumDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_STDDEV_POPULATION_CHAIN_NUM_DESC',
  TxesByChainNumAndBlockHeightStddevPopulationBlockHeightAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_STDDEV_POPULATION_BLOCK_HEIGHT_ASC',
  TxesByChainNumAndBlockHeightStddevPopulationBlockHeightDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_STDDEV_POPULATION_BLOCK_HEIGHT_DESC',
  TxesByChainNumAndBlockHeightStddevPopulationTxIdxAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_STDDEV_POPULATION_TX_IDX_ASC',
  TxesByChainNumAndBlockHeightStddevPopulationTxIdxDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_STDDEV_POPULATION_TX_IDX_DESC',
  TxesByChainNumAndBlockHeightStddevPopulationHashAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_STDDEV_POPULATION_HASH_ASC',
  TxesByChainNumAndBlockHeightStddevPopulationHashDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_STDDEV_POPULATION_HASH_DESC',
  TxesByChainNumAndBlockHeightStddevPopulationDataAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_STDDEV_POPULATION_DATA_ASC',
  TxesByChainNumAndBlockHeightStddevPopulationDataDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_STDDEV_POPULATION_DATA_DESC',
  TxesByChainNumAndBlockHeightVarianceSampleChainNumAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_VARIANCE_SAMPLE_CHAIN_NUM_ASC',
  TxesByChainNumAndBlockHeightVarianceSampleChainNumDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_VARIANCE_SAMPLE_CHAIN_NUM_DESC',
  TxesByChainNumAndBlockHeightVarianceSampleBlockHeightAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_VARIANCE_SAMPLE_BLOCK_HEIGHT_ASC',
  TxesByChainNumAndBlockHeightVarianceSampleBlockHeightDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_VARIANCE_SAMPLE_BLOCK_HEIGHT_DESC',
  TxesByChainNumAndBlockHeightVarianceSampleTxIdxAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_VARIANCE_SAMPLE_TX_IDX_ASC',
  TxesByChainNumAndBlockHeightVarianceSampleTxIdxDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_VARIANCE_SAMPLE_TX_IDX_DESC',
  TxesByChainNumAndBlockHeightVarianceSampleHashAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_VARIANCE_SAMPLE_HASH_ASC',
  TxesByChainNumAndBlockHeightVarianceSampleHashDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_VARIANCE_SAMPLE_HASH_DESC',
  TxesByChainNumAndBlockHeightVarianceSampleDataAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_VARIANCE_SAMPLE_DATA_ASC',
  TxesByChainNumAndBlockHeightVarianceSampleDataDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_VARIANCE_SAMPLE_DATA_DESC',
  TxesByChainNumAndBlockHeightVariancePopulationChainNumAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_VARIANCE_POPULATION_CHAIN_NUM_ASC',
  TxesByChainNumAndBlockHeightVariancePopulationChainNumDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_VARIANCE_POPULATION_CHAIN_NUM_DESC',
  TxesByChainNumAndBlockHeightVariancePopulationBlockHeightAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_VARIANCE_POPULATION_BLOCK_HEIGHT_ASC',
  TxesByChainNumAndBlockHeightVariancePopulationBlockHeightDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_VARIANCE_POPULATION_BLOCK_HEIGHT_DESC',
  TxesByChainNumAndBlockHeightVariancePopulationTxIdxAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_VARIANCE_POPULATION_TX_IDX_ASC',
  TxesByChainNumAndBlockHeightVariancePopulationTxIdxDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_VARIANCE_POPULATION_TX_IDX_DESC',
  TxesByChainNumAndBlockHeightVariancePopulationHashAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_VARIANCE_POPULATION_HASH_ASC',
  TxesByChainNumAndBlockHeightVariancePopulationHashDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_VARIANCE_POPULATION_HASH_DESC',
  TxesByChainNumAndBlockHeightVariancePopulationDataAsc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_VARIANCE_POPULATION_DATA_ASC',
  TxesByChainNumAndBlockHeightVariancePopulationDataDesc = 'TXES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_VARIANCE_POPULATION_DATA_DESC'
}

/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export type BooleanFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Boolean']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Boolean']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Boolean']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Boolean']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Boolean']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Boolean']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Boolean']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Boolean']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Boolean']>;
};

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
  filter?: Maybe<BlockFilter>;
};

export type ChainAggregates = {
  __typename?: 'ChainAggregates';
  keys?: Maybe<Array<Scalars['String']>>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<ChainSumAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<ChainDistinctCountAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<ChainMinAggregates>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<ChainMaxAggregates>;
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<ChainAverageAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<ChainStddevSampleAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<ChainStddevPopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<ChainVarianceSampleAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<ChainVariancePopulationAggregates>;
};

export type ChainAverageAggregates = {
  __typename?: 'ChainAverageAggregates';
  /** Mean average of num across the matching connection */
  num?: Maybe<Scalars['BigFloat']>;
};

/** A condition to be used against `Chain` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ChainCondition = {
  /** Checks for equality with the object’s `num` field. */
  num?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `chainId` field. */
  chainId?: Maybe<Scalars['String']>;
};

export type ChainDistinctCountAggregates = {
  __typename?: 'ChainDistinctCountAggregates';
  /** Distinct count of num across the matching connection */
  num?: Maybe<Scalars['BigInt']>;
  /** Distinct count of chainId across the matching connection */
  chainId?: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `Chain` object types. All fields are combined with a logical ‘and.’ */
export type ChainFilter = {
  /** Filter by the object’s `num` field. */
  num?: Maybe<IntFilter>;
  /** Filter by the object’s `chainId` field. */
  chainId?: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ChainFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ChainFilter>>;
  /** Negates the expression. */
  not?: Maybe<ChainFilter>;
};

/** An input for mutations affecting `Chain` */
export type ChainInput = {
  num?: Maybe<Scalars['Int']>;
  chainId: Scalars['String'];
};

export type ChainMaxAggregates = {
  __typename?: 'ChainMaxAggregates';
  /** Maximum of num across the matching connection */
  num?: Maybe<Scalars['Int']>;
};

export type ChainMinAggregates = {
  __typename?: 'ChainMinAggregates';
  /** Minimum of num across the matching connection */
  num?: Maybe<Scalars['Int']>;
};

/** Represents an update to a `Chain`. Fields that are set will be updated. */
export type ChainPatch = {
  num?: Maybe<Scalars['Int']>;
  chainId?: Maybe<Scalars['String']>;
};

export type ChainStddevPopulationAggregates = {
  __typename?: 'ChainStddevPopulationAggregates';
  /** Population standard deviation of num across the matching connection */
  num?: Maybe<Scalars['BigFloat']>;
};

export type ChainStddevSampleAggregates = {
  __typename?: 'ChainStddevSampleAggregates';
  /** Sample standard deviation of num across the matching connection */
  num?: Maybe<Scalars['BigFloat']>;
};

export type ChainSumAggregates = {
  __typename?: 'ChainSumAggregates';
  /** Sum of num across the matching connection */
  num: Scalars['BigInt'];
};

export type ChainVariancePopulationAggregates = {
  __typename?: 'ChainVariancePopulationAggregates';
  /** Population variance of num across the matching connection */
  num?: Maybe<Scalars['BigFloat']>;
};

export type ChainVarianceSampleAggregates = {
  __typename?: 'ChainVarianceSampleAggregates';
  /** Sample variance of num across the matching connection */
  num?: Maybe<Scalars['BigFloat']>;
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
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<ChainAggregates>;
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
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  BlocksByChainNumCountAsc = 'BLOCKS_BY_CHAIN_NUM_COUNT_ASC',
  BlocksByChainNumCountDesc = 'BLOCKS_BY_CHAIN_NUM_COUNT_DESC',
  BlocksByChainNumSumChainNumAsc = 'BLOCKS_BY_CHAIN_NUM_SUM_CHAIN_NUM_ASC',
  BlocksByChainNumSumChainNumDesc = 'BLOCKS_BY_CHAIN_NUM_SUM_CHAIN_NUM_DESC',
  BlocksByChainNumSumHeightAsc = 'BLOCKS_BY_CHAIN_NUM_SUM_HEIGHT_ASC',
  BlocksByChainNumSumHeightDesc = 'BLOCKS_BY_CHAIN_NUM_SUM_HEIGHT_DESC',
  BlocksByChainNumSumDataAsc = 'BLOCKS_BY_CHAIN_NUM_SUM_DATA_ASC',
  BlocksByChainNumSumDataDesc = 'BLOCKS_BY_CHAIN_NUM_SUM_DATA_DESC',
  BlocksByChainNumSumTimeAsc = 'BLOCKS_BY_CHAIN_NUM_SUM_TIME_ASC',
  BlocksByChainNumSumTimeDesc = 'BLOCKS_BY_CHAIN_NUM_SUM_TIME_DESC',
  BlocksByChainNumDistinctCountChainNumAsc = 'BLOCKS_BY_CHAIN_NUM_DISTINCT_COUNT_CHAIN_NUM_ASC',
  BlocksByChainNumDistinctCountChainNumDesc = 'BLOCKS_BY_CHAIN_NUM_DISTINCT_COUNT_CHAIN_NUM_DESC',
  BlocksByChainNumDistinctCountHeightAsc = 'BLOCKS_BY_CHAIN_NUM_DISTINCT_COUNT_HEIGHT_ASC',
  BlocksByChainNumDistinctCountHeightDesc = 'BLOCKS_BY_CHAIN_NUM_DISTINCT_COUNT_HEIGHT_DESC',
  BlocksByChainNumDistinctCountDataAsc = 'BLOCKS_BY_CHAIN_NUM_DISTINCT_COUNT_DATA_ASC',
  BlocksByChainNumDistinctCountDataDesc = 'BLOCKS_BY_CHAIN_NUM_DISTINCT_COUNT_DATA_DESC',
  BlocksByChainNumDistinctCountTimeAsc = 'BLOCKS_BY_CHAIN_NUM_DISTINCT_COUNT_TIME_ASC',
  BlocksByChainNumDistinctCountTimeDesc = 'BLOCKS_BY_CHAIN_NUM_DISTINCT_COUNT_TIME_DESC',
  BlocksByChainNumMinChainNumAsc = 'BLOCKS_BY_CHAIN_NUM_MIN_CHAIN_NUM_ASC',
  BlocksByChainNumMinChainNumDesc = 'BLOCKS_BY_CHAIN_NUM_MIN_CHAIN_NUM_DESC',
  BlocksByChainNumMinHeightAsc = 'BLOCKS_BY_CHAIN_NUM_MIN_HEIGHT_ASC',
  BlocksByChainNumMinHeightDesc = 'BLOCKS_BY_CHAIN_NUM_MIN_HEIGHT_DESC',
  BlocksByChainNumMinDataAsc = 'BLOCKS_BY_CHAIN_NUM_MIN_DATA_ASC',
  BlocksByChainNumMinDataDesc = 'BLOCKS_BY_CHAIN_NUM_MIN_DATA_DESC',
  BlocksByChainNumMinTimeAsc = 'BLOCKS_BY_CHAIN_NUM_MIN_TIME_ASC',
  BlocksByChainNumMinTimeDesc = 'BLOCKS_BY_CHAIN_NUM_MIN_TIME_DESC',
  BlocksByChainNumMaxChainNumAsc = 'BLOCKS_BY_CHAIN_NUM_MAX_CHAIN_NUM_ASC',
  BlocksByChainNumMaxChainNumDesc = 'BLOCKS_BY_CHAIN_NUM_MAX_CHAIN_NUM_DESC',
  BlocksByChainNumMaxHeightAsc = 'BLOCKS_BY_CHAIN_NUM_MAX_HEIGHT_ASC',
  BlocksByChainNumMaxHeightDesc = 'BLOCKS_BY_CHAIN_NUM_MAX_HEIGHT_DESC',
  BlocksByChainNumMaxDataAsc = 'BLOCKS_BY_CHAIN_NUM_MAX_DATA_ASC',
  BlocksByChainNumMaxDataDesc = 'BLOCKS_BY_CHAIN_NUM_MAX_DATA_DESC',
  BlocksByChainNumMaxTimeAsc = 'BLOCKS_BY_CHAIN_NUM_MAX_TIME_ASC',
  BlocksByChainNumMaxTimeDesc = 'BLOCKS_BY_CHAIN_NUM_MAX_TIME_DESC',
  BlocksByChainNumAverageChainNumAsc = 'BLOCKS_BY_CHAIN_NUM_AVERAGE_CHAIN_NUM_ASC',
  BlocksByChainNumAverageChainNumDesc = 'BLOCKS_BY_CHAIN_NUM_AVERAGE_CHAIN_NUM_DESC',
  BlocksByChainNumAverageHeightAsc = 'BLOCKS_BY_CHAIN_NUM_AVERAGE_HEIGHT_ASC',
  BlocksByChainNumAverageHeightDesc = 'BLOCKS_BY_CHAIN_NUM_AVERAGE_HEIGHT_DESC',
  BlocksByChainNumAverageDataAsc = 'BLOCKS_BY_CHAIN_NUM_AVERAGE_DATA_ASC',
  BlocksByChainNumAverageDataDesc = 'BLOCKS_BY_CHAIN_NUM_AVERAGE_DATA_DESC',
  BlocksByChainNumAverageTimeAsc = 'BLOCKS_BY_CHAIN_NUM_AVERAGE_TIME_ASC',
  BlocksByChainNumAverageTimeDesc = 'BLOCKS_BY_CHAIN_NUM_AVERAGE_TIME_DESC',
  BlocksByChainNumStddevSampleChainNumAsc = 'BLOCKS_BY_CHAIN_NUM_STDDEV_SAMPLE_CHAIN_NUM_ASC',
  BlocksByChainNumStddevSampleChainNumDesc = 'BLOCKS_BY_CHAIN_NUM_STDDEV_SAMPLE_CHAIN_NUM_DESC',
  BlocksByChainNumStddevSampleHeightAsc = 'BLOCKS_BY_CHAIN_NUM_STDDEV_SAMPLE_HEIGHT_ASC',
  BlocksByChainNumStddevSampleHeightDesc = 'BLOCKS_BY_CHAIN_NUM_STDDEV_SAMPLE_HEIGHT_DESC',
  BlocksByChainNumStddevSampleDataAsc = 'BLOCKS_BY_CHAIN_NUM_STDDEV_SAMPLE_DATA_ASC',
  BlocksByChainNumStddevSampleDataDesc = 'BLOCKS_BY_CHAIN_NUM_STDDEV_SAMPLE_DATA_DESC',
  BlocksByChainNumStddevSampleTimeAsc = 'BLOCKS_BY_CHAIN_NUM_STDDEV_SAMPLE_TIME_ASC',
  BlocksByChainNumStddevSampleTimeDesc = 'BLOCKS_BY_CHAIN_NUM_STDDEV_SAMPLE_TIME_DESC',
  BlocksByChainNumStddevPopulationChainNumAsc = 'BLOCKS_BY_CHAIN_NUM_STDDEV_POPULATION_CHAIN_NUM_ASC',
  BlocksByChainNumStddevPopulationChainNumDesc = 'BLOCKS_BY_CHAIN_NUM_STDDEV_POPULATION_CHAIN_NUM_DESC',
  BlocksByChainNumStddevPopulationHeightAsc = 'BLOCKS_BY_CHAIN_NUM_STDDEV_POPULATION_HEIGHT_ASC',
  BlocksByChainNumStddevPopulationHeightDesc = 'BLOCKS_BY_CHAIN_NUM_STDDEV_POPULATION_HEIGHT_DESC',
  BlocksByChainNumStddevPopulationDataAsc = 'BLOCKS_BY_CHAIN_NUM_STDDEV_POPULATION_DATA_ASC',
  BlocksByChainNumStddevPopulationDataDesc = 'BLOCKS_BY_CHAIN_NUM_STDDEV_POPULATION_DATA_DESC',
  BlocksByChainNumStddevPopulationTimeAsc = 'BLOCKS_BY_CHAIN_NUM_STDDEV_POPULATION_TIME_ASC',
  BlocksByChainNumStddevPopulationTimeDesc = 'BLOCKS_BY_CHAIN_NUM_STDDEV_POPULATION_TIME_DESC',
  BlocksByChainNumVarianceSampleChainNumAsc = 'BLOCKS_BY_CHAIN_NUM_VARIANCE_SAMPLE_CHAIN_NUM_ASC',
  BlocksByChainNumVarianceSampleChainNumDesc = 'BLOCKS_BY_CHAIN_NUM_VARIANCE_SAMPLE_CHAIN_NUM_DESC',
  BlocksByChainNumVarianceSampleHeightAsc = 'BLOCKS_BY_CHAIN_NUM_VARIANCE_SAMPLE_HEIGHT_ASC',
  BlocksByChainNumVarianceSampleHeightDesc = 'BLOCKS_BY_CHAIN_NUM_VARIANCE_SAMPLE_HEIGHT_DESC',
  BlocksByChainNumVarianceSampleDataAsc = 'BLOCKS_BY_CHAIN_NUM_VARIANCE_SAMPLE_DATA_ASC',
  BlocksByChainNumVarianceSampleDataDesc = 'BLOCKS_BY_CHAIN_NUM_VARIANCE_SAMPLE_DATA_DESC',
  BlocksByChainNumVarianceSampleTimeAsc = 'BLOCKS_BY_CHAIN_NUM_VARIANCE_SAMPLE_TIME_ASC',
  BlocksByChainNumVarianceSampleTimeDesc = 'BLOCKS_BY_CHAIN_NUM_VARIANCE_SAMPLE_TIME_DESC',
  BlocksByChainNumVariancePopulationChainNumAsc = 'BLOCKS_BY_CHAIN_NUM_VARIANCE_POPULATION_CHAIN_NUM_ASC',
  BlocksByChainNumVariancePopulationChainNumDesc = 'BLOCKS_BY_CHAIN_NUM_VARIANCE_POPULATION_CHAIN_NUM_DESC',
  BlocksByChainNumVariancePopulationHeightAsc = 'BLOCKS_BY_CHAIN_NUM_VARIANCE_POPULATION_HEIGHT_ASC',
  BlocksByChainNumVariancePopulationHeightDesc = 'BLOCKS_BY_CHAIN_NUM_VARIANCE_POPULATION_HEIGHT_DESC',
  BlocksByChainNumVariancePopulationDataAsc = 'BLOCKS_BY_CHAIN_NUM_VARIANCE_POPULATION_DATA_ASC',
  BlocksByChainNumVariancePopulationDataDesc = 'BLOCKS_BY_CHAIN_NUM_VARIANCE_POPULATION_DATA_DESC',
  BlocksByChainNumVariancePopulationTimeAsc = 'BLOCKS_BY_CHAIN_NUM_VARIANCE_POPULATION_TIME_ASC',
  BlocksByChainNumVariancePopulationTimeDesc = 'BLOCKS_BY_CHAIN_NUM_VARIANCE_POPULATION_TIME_DESC'
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

export type ClassIssuerAggregates = {
  __typename?: 'ClassIssuerAggregates';
  keys?: Maybe<Array<Scalars['String']>>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<ClassIssuerSumAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<ClassIssuerDistinctCountAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<ClassIssuerMinAggregates>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<ClassIssuerMaxAggregates>;
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<ClassIssuerAverageAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<ClassIssuerStddevSampleAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<ClassIssuerStddevPopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<ClassIssuerVarianceSampleAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<ClassIssuerVariancePopulationAggregates>;
};

export type ClassIssuerAverageAggregates = {
  __typename?: 'ClassIssuerAverageAggregates';
  /** Mean average of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Mean average of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Mean average of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
  /** Mean average of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
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

export type ClassIssuerDistinctCountAggregates = {
  __typename?: 'ClassIssuerDistinctCountAggregates';
  /** Distinct count of type across the matching connection */
  type?: Maybe<Scalars['BigInt']>;
  /** Distinct count of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Distinct count of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigInt']>;
  /** Distinct count of timestamp across the matching connection */
  timestamp?: Maybe<Scalars['BigInt']>;
  /** Distinct count of txHash across the matching connection */
  txHash?: Maybe<Scalars['BigInt']>;
  /** Distinct count of classId across the matching connection */
  classId?: Maybe<Scalars['BigInt']>;
  /** Distinct count of issuer across the matching connection */
  issuer?: Maybe<Scalars['BigInt']>;
  /** Distinct count of latest across the matching connection */
  latest?: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `ClassIssuer` object types. All fields are combined with a logical ‘and.’ */
export type ClassIssuerFilter = {
  /** Filter by the object’s `type` field. */
  type?: Maybe<StringFilter>;
  /** Filter by the object’s `blockHeight` field. */
  blockHeight?: Maybe<BigIntFilter>;
  /** Filter by the object’s `txIdx` field. */
  txIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `msgIdx` field. */
  msgIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `chainNum` field. */
  chainNum?: Maybe<IntFilter>;
  /** Filter by the object’s `timestamp` field. */
  timestamp?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `txHash` field. */
  txHash?: Maybe<StringFilter>;
  /** Filter by the object’s `classId` field. */
  classId?: Maybe<StringFilter>;
  /** Filter by the object’s `issuer` field. */
  issuer?: Maybe<StringFilter>;
  /** Filter by the object’s `latest` field. */
  latest?: Maybe<BooleanFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ClassIssuerFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ClassIssuerFilter>>;
  /** Negates the expression. */
  not?: Maybe<ClassIssuerFilter>;
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

export type ClassIssuerMaxAggregates = {
  __typename?: 'ClassIssuerMaxAggregates';
  /** Maximum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Maximum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
  /** Maximum of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['Int']>;
  /** Maximum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
};

export type ClassIssuerMinAggregates = {
  __typename?: 'ClassIssuerMinAggregates';
  /** Minimum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Minimum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
  /** Minimum of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['Int']>;
  /** Minimum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
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

export type ClassIssuerStddevPopulationAggregates = {
  __typename?: 'ClassIssuerStddevPopulationAggregates';
  /** Population standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
};

export type ClassIssuerStddevSampleAggregates = {
  __typename?: 'ClassIssuerStddevSampleAggregates';
  /** Sample standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
};

export type ClassIssuerSumAggregates = {
  __typename?: 'ClassIssuerSumAggregates';
  /** Sum of blockHeight across the matching connection */
  blockHeight: Scalars['BigFloat'];
  /** Sum of txIdx across the matching connection */
  txIdx: Scalars['BigInt'];
  /** Sum of msgIdx across the matching connection */
  msgIdx: Scalars['BigInt'];
  /** Sum of chainNum across the matching connection */
  chainNum: Scalars['BigInt'];
};

export type ClassIssuerVariancePopulationAggregates = {
  __typename?: 'ClassIssuerVariancePopulationAggregates';
  /** Population variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Population variance of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
  /** Population variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
};

export type ClassIssuerVarianceSampleAggregates = {
  __typename?: 'ClassIssuerVarianceSampleAggregates';
  /** Sample variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
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
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<ClassIssuerAggregates>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<ClassIssuerAggregates>>;
};


/** A connection to a list of `ClassIssuer` values. */
export type ClassIssuersConnectionGroupedAggregatesArgs = {
  groupBy: Array<ClassIssuersGroupBy>;
  having?: Maybe<ClassIssuersHavingInput>;
};

/** A `ClassIssuer` edge in the connection. */
export type ClassIssuersEdge = {
  __typename?: 'ClassIssuersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ClassIssuer` at the end of the edge. */
  node?: Maybe<ClassIssuer>;
};

/** Grouping methods for `ClassIssuer` for usage during aggregation. */
export enum ClassIssuersGroupBy {
  Type = 'TYPE',
  BlockHeight = 'BLOCK_HEIGHT',
  TxIdx = 'TX_IDX',
  MsgIdx = 'MSG_IDX',
  ChainNum = 'CHAIN_NUM',
  Timestamp = 'TIMESTAMP',
  TimestampTruncatedToHour = 'TIMESTAMP_TRUNCATED_TO_HOUR',
  TimestampTruncatedToDay = 'TIMESTAMP_TRUNCATED_TO_DAY',
  TxHash = 'TX_HASH',
  ClassId = 'CLASS_ID',
  Issuer = 'ISSUER',
  Latest = 'LATEST'
}

export type ClassIssuersHavingAverageInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
};

export type ClassIssuersHavingDistinctCountInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
};

/** Conditions for `ClassIssuer` aggregates. */
export type ClassIssuersHavingInput = {
  AND?: Maybe<Array<ClassIssuersHavingInput>>;
  OR?: Maybe<Array<ClassIssuersHavingInput>>;
  sum?: Maybe<ClassIssuersHavingSumInput>;
  distinctCount?: Maybe<ClassIssuersHavingDistinctCountInput>;
  min?: Maybe<ClassIssuersHavingMinInput>;
  max?: Maybe<ClassIssuersHavingMaxInput>;
  average?: Maybe<ClassIssuersHavingAverageInput>;
  stddevSample?: Maybe<ClassIssuersHavingStddevSampleInput>;
  stddevPopulation?: Maybe<ClassIssuersHavingStddevPopulationInput>;
  varianceSample?: Maybe<ClassIssuersHavingVarianceSampleInput>;
  variancePopulation?: Maybe<ClassIssuersHavingVariancePopulationInput>;
};

export type ClassIssuersHavingMaxInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
};

export type ClassIssuersHavingMinInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
};

export type ClassIssuersHavingStddevPopulationInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
};

export type ClassIssuersHavingStddevSampleInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
};

export type ClassIssuersHavingSumInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
};

export type ClassIssuersHavingVariancePopulationInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
};

export type ClassIssuersHavingVarianceSampleInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
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

/** All input for the create `Order` mutation. */
export type CreateOrderInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Order` to be created by this mutation. */
  order: OrderInput;
};

/** The output of our create `Order` mutation. */
export type CreateOrderPayload = {
  __typename?: 'CreateOrderPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Order` that was created by this mutation. */
  order?: Maybe<Order>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Order`. May be used by Relay 1. */
  orderEdge?: Maybe<OrdersEdge>;
};


/** The output of our create `Order` mutation. */
export type CreateOrderPayloadOrderEdgeArgs = {
  orderBy?: Maybe<Array<OrdersOrderBy>>;
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



/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Datetime']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Datetime']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Datetime']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Datetime']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Datetime']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Datetime']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Datetime']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Datetime']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Datetime']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Datetime']>;
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

/** All input for the `deleteOrderByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndProjectIdAndAskDenom` mutation. */
export type DeleteOrderByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndProjectIdAndAskDenomInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  projectId: Scalars['String'];
  askDenom: Scalars['String'];
};

/** All input for the `deleteOrder` mutation. */
export type DeleteOrderInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Order` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Order` mutation. */
export type DeleteOrderPayload = {
  __typename?: 'DeleteOrderPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Order` that was deleted by this mutation. */
  order?: Maybe<Order>;
  deletedOrderId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Order`. May be used by Relay 1. */
  orderEdge?: Maybe<OrdersEdge>;
};


/** The output of our delete `Order` mutation. */
export type DeleteOrderPayloadOrderEdgeArgs = {
  orderBy?: Maybe<Array<OrdersOrderBy>>;
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

export type EventRetireAggregates = {
  __typename?: 'EventRetireAggregates';
  keys?: Maybe<Array<Scalars['String']>>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<EventRetireSumAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<EventRetireDistinctCountAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<EventRetireMinAggregates>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<EventRetireMaxAggregates>;
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<EventRetireAverageAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<EventRetireStddevSampleAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<EventRetireStddevPopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<EventRetireVarianceSampleAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<EventRetireVariancePopulationAggregates>;
};

export type EventRetireAverageAggregates = {
  __typename?: 'EventRetireAverageAggregates';
  /** Mean average of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Mean average of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Mean average of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Mean average of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
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

export type EventRetireDistinctCountAggregates = {
  __typename?: 'EventRetireDistinctCountAggregates';
  /** Distinct count of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigInt']>;
  /** Distinct count of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Distinct count of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of owner across the matching connection */
  owner?: Maybe<Scalars['BigInt']>;
  /** Distinct count of batchDenom across the matching connection */
  batchDenom?: Maybe<Scalars['BigInt']>;
  /** Distinct count of amount across the matching connection */
  amount?: Maybe<Scalars['BigInt']>;
  /** Distinct count of jurisdiction across the matching connection */
  jurisdiction?: Maybe<Scalars['BigInt']>;
  /** Distinct count of reason across the matching connection */
  reason?: Maybe<Scalars['BigInt']>;
  /** Distinct count of hasDuplicates across the matching connection */
  hasDuplicates?: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `EventRetire` object types. All fields are combined with a logical ‘and.’ */
export type EventRetireFilter = {
  /** Filter by the object’s `chainNum` field. */
  chainNum?: Maybe<IntFilter>;
  /** Filter by the object’s `blockHeight` field. */
  blockHeight?: Maybe<BigIntFilter>;
  /** Filter by the object’s `txIdx` field. */
  txIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `msgIdx` field. */
  msgIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `owner` field. */
  owner?: Maybe<StringFilter>;
  /** Filter by the object’s `batchDenom` field. */
  batchDenom?: Maybe<StringFilter>;
  /** Filter by the object’s `amount` field. */
  amount?: Maybe<StringFilter>;
  /** Filter by the object’s `jurisdiction` field. */
  jurisdiction?: Maybe<StringFilter>;
  /** Filter by the object’s `reason` field. */
  reason?: Maybe<StringFilter>;
  /** Filter by the object’s `hasDuplicates` field. */
  hasDuplicates?: Maybe<BooleanFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<EventRetireFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<EventRetireFilter>>;
  /** Negates the expression. */
  not?: Maybe<EventRetireFilter>;
};

/** Grouping methods for `EventRetire` for usage during aggregation. */
export enum EventRetireGroupBy {
  ChainNum = 'CHAIN_NUM',
  BlockHeight = 'BLOCK_HEIGHT',
  TxIdx = 'TX_IDX',
  MsgIdx = 'MSG_IDX',
  Owner = 'OWNER',
  BatchDenom = 'BATCH_DENOM',
  Amount = 'AMOUNT',
  Jurisdiction = 'JURISDICTION',
  Reason = 'REASON',
  HasDuplicates = 'HAS_DUPLICATES'
}

export type EventRetireHavingAverageInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type EventRetireHavingDistinctCountInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

/** Conditions for `EventRetire` aggregates. */
export type EventRetireHavingInput = {
  AND?: Maybe<Array<EventRetireHavingInput>>;
  OR?: Maybe<Array<EventRetireHavingInput>>;
  sum?: Maybe<EventRetireHavingSumInput>;
  distinctCount?: Maybe<EventRetireHavingDistinctCountInput>;
  min?: Maybe<EventRetireHavingMinInput>;
  max?: Maybe<EventRetireHavingMaxInput>;
  average?: Maybe<EventRetireHavingAverageInput>;
  stddevSample?: Maybe<EventRetireHavingStddevSampleInput>;
  stddevPopulation?: Maybe<EventRetireHavingStddevPopulationInput>;
  varianceSample?: Maybe<EventRetireHavingVarianceSampleInput>;
  variancePopulation?: Maybe<EventRetireHavingVariancePopulationInput>;
};

export type EventRetireHavingMaxInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type EventRetireHavingMinInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type EventRetireHavingStddevPopulationInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type EventRetireHavingStddevSampleInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type EventRetireHavingSumInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type EventRetireHavingVariancePopulationInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type EventRetireHavingVarianceSampleInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type EventRetireMaxAggregates = {
  __typename?: 'EventRetireMaxAggregates';
  /** Maximum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Maximum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Maximum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
  /** Maximum of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['Int']>;
};

export type EventRetireMinAggregates = {
  __typename?: 'EventRetireMinAggregates';
  /** Minimum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Minimum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Minimum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
  /** Minimum of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['Int']>;
};

export type EventRetireStddevPopulationAggregates = {
  __typename?: 'EventRetireStddevPopulationAggregates';
  /** Population standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type EventRetireStddevSampleAggregates = {
  __typename?: 'EventRetireStddevSampleAggregates';
  /** Sample standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type EventRetireSumAggregates = {
  __typename?: 'EventRetireSumAggregates';
  /** Sum of chainNum across the matching connection */
  chainNum: Scalars['BigInt'];
  /** Sum of blockHeight across the matching connection */
  blockHeight: Scalars['BigFloat'];
  /** Sum of txIdx across the matching connection */
  txIdx: Scalars['BigInt'];
  /** Sum of msgIdx across the matching connection */
  msgIdx: Scalars['BigInt'];
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

export type EventRetireV1Aggregates = {
  __typename?: 'EventRetireV1Aggregates';
  keys?: Maybe<Array<Scalars['String']>>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<EventRetireV1SumAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<EventRetireV1DistinctCountAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<EventRetireV1MinAggregates>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<EventRetireV1MaxAggregates>;
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<EventRetireV1AverageAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<EventRetireV1StddevSampleAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<EventRetireV1StddevPopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<EventRetireV1VarianceSampleAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<EventRetireV1VariancePopulationAggregates>;
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

export type EventRetireV1Alpha1Aggregates = {
  __typename?: 'EventRetireV1Alpha1Aggregates';
  keys?: Maybe<Array<Scalars['String']>>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<EventRetireV1Alpha1SumAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<EventRetireV1Alpha1DistinctCountAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<EventRetireV1Alpha1MinAggregates>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<EventRetireV1Alpha1MaxAggregates>;
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<EventRetireV1Alpha1AverageAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<EventRetireV1Alpha1StddevSampleAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<EventRetireV1Alpha1StddevPopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<EventRetireV1Alpha1VarianceSampleAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<EventRetireV1Alpha1VariancePopulationAggregates>;
};

export type EventRetireV1Alpha1AverageAggregates = {
  __typename?: 'EventRetireV1Alpha1AverageAggregates';
  /** Mean average of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Mean average of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Mean average of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Mean average of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
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

export type EventRetireV1Alpha1DistinctCountAggregates = {
  __typename?: 'EventRetireV1Alpha1DistinctCountAggregates';
  /** Distinct count of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigInt']>;
  /** Distinct count of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Distinct count of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of retirer across the matching connection */
  retirer?: Maybe<Scalars['BigInt']>;
  /** Distinct count of batchDenom across the matching connection */
  batchDenom?: Maybe<Scalars['BigInt']>;
  /** Distinct count of amount across the matching connection */
  amount?: Maybe<Scalars['BigInt']>;
  /** Distinct count of location across the matching connection */
  location?: Maybe<Scalars['BigInt']>;
  /** Distinct count of hasDuplicates across the matching connection */
  hasDuplicates?: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `EventRetireV1Alpha1` object types. All fields are combined with a logical ‘and.’ */
export type EventRetireV1Alpha1Filter = {
  /** Filter by the object’s `chainNum` field. */
  chainNum?: Maybe<IntFilter>;
  /** Filter by the object’s `blockHeight` field. */
  blockHeight?: Maybe<BigIntFilter>;
  /** Filter by the object’s `txIdx` field. */
  txIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `msgIdx` field. */
  msgIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `retirer` field. */
  retirer?: Maybe<StringFilter>;
  /** Filter by the object’s `batchDenom` field. */
  batchDenom?: Maybe<StringFilter>;
  /** Filter by the object’s `amount` field. */
  amount?: Maybe<StringFilter>;
  /** Filter by the object’s `location` field. */
  location?: Maybe<StringFilter>;
  /** Filter by the object’s `hasDuplicates` field. */
  hasDuplicates?: Maybe<BooleanFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<EventRetireV1Alpha1Filter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<EventRetireV1Alpha1Filter>>;
  /** Negates the expression. */
  not?: Maybe<EventRetireV1Alpha1Filter>;
};

/** Grouping methods for `EventRetireV1Alpha1` for usage during aggregation. */
export enum EventRetireV1Alpha1GroupBy {
  ChainNum = 'CHAIN_NUM',
  BlockHeight = 'BLOCK_HEIGHT',
  TxIdx = 'TX_IDX',
  MsgIdx = 'MSG_IDX',
  Retirer = 'RETIRER',
  BatchDenom = 'BATCH_DENOM',
  Amount = 'AMOUNT',
  Location = 'LOCATION',
  HasDuplicates = 'HAS_DUPLICATES'
}

export type EventRetireV1Alpha1HavingAverageInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type EventRetireV1Alpha1HavingDistinctCountInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

/** Conditions for `EventRetireV1Alpha1` aggregates. */
export type EventRetireV1Alpha1HavingInput = {
  AND?: Maybe<Array<EventRetireV1Alpha1HavingInput>>;
  OR?: Maybe<Array<EventRetireV1Alpha1HavingInput>>;
  sum?: Maybe<EventRetireV1Alpha1HavingSumInput>;
  distinctCount?: Maybe<EventRetireV1Alpha1HavingDistinctCountInput>;
  min?: Maybe<EventRetireV1Alpha1HavingMinInput>;
  max?: Maybe<EventRetireV1Alpha1HavingMaxInput>;
  average?: Maybe<EventRetireV1Alpha1HavingAverageInput>;
  stddevSample?: Maybe<EventRetireV1Alpha1HavingStddevSampleInput>;
  stddevPopulation?: Maybe<EventRetireV1Alpha1HavingStddevPopulationInput>;
  varianceSample?: Maybe<EventRetireV1Alpha1HavingVarianceSampleInput>;
  variancePopulation?: Maybe<EventRetireV1Alpha1HavingVariancePopulationInput>;
};

export type EventRetireV1Alpha1HavingMaxInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type EventRetireV1Alpha1HavingMinInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type EventRetireV1Alpha1HavingStddevPopulationInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type EventRetireV1Alpha1HavingStddevSampleInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type EventRetireV1Alpha1HavingSumInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type EventRetireV1Alpha1HavingVariancePopulationInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type EventRetireV1Alpha1HavingVarianceSampleInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type EventRetireV1Alpha1MaxAggregates = {
  __typename?: 'EventRetireV1Alpha1MaxAggregates';
  /** Maximum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Maximum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Maximum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
  /** Maximum of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['Int']>;
};

export type EventRetireV1Alpha1MinAggregates = {
  __typename?: 'EventRetireV1Alpha1MinAggregates';
  /** Minimum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Minimum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Minimum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
  /** Minimum of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['Int']>;
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
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<EventRetireV1Alpha1Aggregates>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<EventRetireV1Alpha1Aggregates>>;
};


/** A connection to a list of `EventRetireV1Alpha1` values. */
export type EventRetireV1Alpha1SConnectionGroupedAggregatesArgs = {
  groupBy: Array<EventRetireV1Alpha1GroupBy>;
  having?: Maybe<EventRetireV1Alpha1HavingInput>;
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

export type EventRetireV1Alpha1StddevPopulationAggregates = {
  __typename?: 'EventRetireV1Alpha1StddevPopulationAggregates';
  /** Population standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type EventRetireV1Alpha1StddevSampleAggregates = {
  __typename?: 'EventRetireV1Alpha1StddevSampleAggregates';
  /** Sample standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type EventRetireV1Alpha1SumAggregates = {
  __typename?: 'EventRetireV1Alpha1SumAggregates';
  /** Sum of chainNum across the matching connection */
  chainNum: Scalars['BigInt'];
  /** Sum of blockHeight across the matching connection */
  blockHeight: Scalars['BigFloat'];
  /** Sum of txIdx across the matching connection */
  txIdx: Scalars['BigInt'];
  /** Sum of msgIdx across the matching connection */
  msgIdx: Scalars['BigInt'];
};

export type EventRetireV1Alpha1VariancePopulationAggregates = {
  __typename?: 'EventRetireV1Alpha1VariancePopulationAggregates';
  /** Population variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Population variance of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type EventRetireV1Alpha1VarianceSampleAggregates = {
  __typename?: 'EventRetireV1Alpha1VarianceSampleAggregates';
  /** Sample variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type EventRetireV1AverageAggregates = {
  __typename?: 'EventRetireV1AverageAggregates';
  /** Mean average of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Mean average of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Mean average of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Mean average of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

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

export type EventRetireV1DistinctCountAggregates = {
  __typename?: 'EventRetireV1DistinctCountAggregates';
  /** Distinct count of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigInt']>;
  /** Distinct count of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Distinct count of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of owner across the matching connection */
  owner?: Maybe<Scalars['BigInt']>;
  /** Distinct count of batchDenom across the matching connection */
  batchDenom?: Maybe<Scalars['BigInt']>;
  /** Distinct count of amount across the matching connection */
  amount?: Maybe<Scalars['BigInt']>;
  /** Distinct count of jurisdiction across the matching connection */
  jurisdiction?: Maybe<Scalars['BigInt']>;
  /** Distinct count of reason across the matching connection */
  reason?: Maybe<Scalars['BigInt']>;
  /** Distinct count of hasDuplicates across the matching connection */
  hasDuplicates?: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `EventRetireV1` object types. All fields are combined with a logical ‘and.’ */
export type EventRetireV1Filter = {
  /** Filter by the object’s `chainNum` field. */
  chainNum?: Maybe<IntFilter>;
  /** Filter by the object’s `blockHeight` field. */
  blockHeight?: Maybe<BigIntFilter>;
  /** Filter by the object’s `txIdx` field. */
  txIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `msgIdx` field. */
  msgIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `owner` field. */
  owner?: Maybe<StringFilter>;
  /** Filter by the object’s `batchDenom` field. */
  batchDenom?: Maybe<StringFilter>;
  /** Filter by the object’s `amount` field. */
  amount?: Maybe<StringFilter>;
  /** Filter by the object’s `jurisdiction` field. */
  jurisdiction?: Maybe<StringFilter>;
  /** Filter by the object’s `reason` field. */
  reason?: Maybe<StringFilter>;
  /** Filter by the object’s `hasDuplicates` field. */
  hasDuplicates?: Maybe<BooleanFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<EventRetireV1Filter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<EventRetireV1Filter>>;
  /** Negates the expression. */
  not?: Maybe<EventRetireV1Filter>;
};

/** Grouping methods for `EventRetireV1` for usage during aggregation. */
export enum EventRetireV1GroupBy {
  ChainNum = 'CHAIN_NUM',
  BlockHeight = 'BLOCK_HEIGHT',
  TxIdx = 'TX_IDX',
  MsgIdx = 'MSG_IDX',
  Owner = 'OWNER',
  BatchDenom = 'BATCH_DENOM',
  Amount = 'AMOUNT',
  Jurisdiction = 'JURISDICTION',
  Reason = 'REASON',
  HasDuplicates = 'HAS_DUPLICATES'
}

export type EventRetireV1HavingAverageInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type EventRetireV1HavingDistinctCountInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

/** Conditions for `EventRetireV1` aggregates. */
export type EventRetireV1HavingInput = {
  AND?: Maybe<Array<EventRetireV1HavingInput>>;
  OR?: Maybe<Array<EventRetireV1HavingInput>>;
  sum?: Maybe<EventRetireV1HavingSumInput>;
  distinctCount?: Maybe<EventRetireV1HavingDistinctCountInput>;
  min?: Maybe<EventRetireV1HavingMinInput>;
  max?: Maybe<EventRetireV1HavingMaxInput>;
  average?: Maybe<EventRetireV1HavingAverageInput>;
  stddevSample?: Maybe<EventRetireV1HavingStddevSampleInput>;
  stddevPopulation?: Maybe<EventRetireV1HavingStddevPopulationInput>;
  varianceSample?: Maybe<EventRetireV1HavingVarianceSampleInput>;
  variancePopulation?: Maybe<EventRetireV1HavingVariancePopulationInput>;
};

export type EventRetireV1HavingMaxInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type EventRetireV1HavingMinInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type EventRetireV1HavingStddevPopulationInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type EventRetireV1HavingStddevSampleInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type EventRetireV1HavingSumInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type EventRetireV1HavingVariancePopulationInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type EventRetireV1HavingVarianceSampleInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type EventRetireV1MaxAggregates = {
  __typename?: 'EventRetireV1MaxAggregates';
  /** Maximum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Maximum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Maximum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
  /** Maximum of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['Int']>;
};

export type EventRetireV1MinAggregates = {
  __typename?: 'EventRetireV1MinAggregates';
  /** Minimum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Minimum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Minimum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
  /** Minimum of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['Int']>;
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
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<EventRetireV1Aggregates>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<EventRetireV1Aggregates>>;
};


/** A connection to a list of `EventRetireV1` values. */
export type EventRetireV1SConnectionGroupedAggregatesArgs = {
  groupBy: Array<EventRetireV1GroupBy>;
  having?: Maybe<EventRetireV1HavingInput>;
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

export type EventRetireV1StddevPopulationAggregates = {
  __typename?: 'EventRetireV1StddevPopulationAggregates';
  /** Population standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type EventRetireV1StddevSampleAggregates = {
  __typename?: 'EventRetireV1StddevSampleAggregates';
  /** Sample standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type EventRetireV1SumAggregates = {
  __typename?: 'EventRetireV1SumAggregates';
  /** Sum of chainNum across the matching connection */
  chainNum: Scalars['BigInt'];
  /** Sum of blockHeight across the matching connection */
  blockHeight: Scalars['BigFloat'];
  /** Sum of txIdx across the matching connection */
  txIdx: Scalars['BigInt'];
  /** Sum of msgIdx across the matching connection */
  msgIdx: Scalars['BigInt'];
};

export type EventRetireV1VariancePopulationAggregates = {
  __typename?: 'EventRetireV1VariancePopulationAggregates';
  /** Population variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Population variance of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type EventRetireV1VarianceSampleAggregates = {
  __typename?: 'EventRetireV1VarianceSampleAggregates';
  /** Sample variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type EventRetireVariancePopulationAggregates = {
  __typename?: 'EventRetireVariancePopulationAggregates';
  /** Population variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Population variance of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type EventRetireVarianceSampleAggregates = {
  __typename?: 'EventRetireVarianceSampleAggregates';
  /** Sample variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

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
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<EventRetireAggregates>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<EventRetireAggregates>>;
};


/** A connection to a list of `EventRetire` values. */
export type EventRetiresConnectionGroupedAggregatesArgs = {
  groupBy: Array<EventRetireGroupBy>;
  having?: Maybe<EventRetireHavingInput>;
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
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<FlywaySchemaHistoryAggregates>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<FlywaySchemaHistoryAggregates>>;
};


/** A connection to a list of `FlywaySchemaHistory` values. */
export type FlywaySchemaHistoriesConnectionGroupedAggregatesArgs = {
  groupBy: Array<FlywaySchemaHistoryGroupBy>;
  having?: Maybe<FlywaySchemaHistoryHavingInput>;
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

export type FlywaySchemaHistoryAggregates = {
  __typename?: 'FlywaySchemaHistoryAggregates';
  keys?: Maybe<Array<Scalars['String']>>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<FlywaySchemaHistorySumAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<FlywaySchemaHistoryDistinctCountAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<FlywaySchemaHistoryMinAggregates>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<FlywaySchemaHistoryMaxAggregates>;
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<FlywaySchemaHistoryAverageAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<FlywaySchemaHistoryStddevSampleAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<FlywaySchemaHistoryStddevPopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<FlywaySchemaHistoryVarianceSampleAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<FlywaySchemaHistoryVariancePopulationAggregates>;
};

export type FlywaySchemaHistoryAverageAggregates = {
  __typename?: 'FlywaySchemaHistoryAverageAggregates';
  /** Mean average of installedRank across the matching connection */
  installedRank?: Maybe<Scalars['BigFloat']>;
  /** Mean average of checksum across the matching connection */
  checksum?: Maybe<Scalars['BigFloat']>;
  /** Mean average of executionTime across the matching connection */
  executionTime?: Maybe<Scalars['BigFloat']>;
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

export type FlywaySchemaHistoryDistinctCountAggregates = {
  __typename?: 'FlywaySchemaHistoryDistinctCountAggregates';
  /** Distinct count of installedRank across the matching connection */
  installedRank?: Maybe<Scalars['BigInt']>;
  /** Distinct count of version across the matching connection */
  version?: Maybe<Scalars['BigInt']>;
  /** Distinct count of description across the matching connection */
  description?: Maybe<Scalars['BigInt']>;
  /** Distinct count of type across the matching connection */
  type?: Maybe<Scalars['BigInt']>;
  /** Distinct count of script across the matching connection */
  script?: Maybe<Scalars['BigInt']>;
  /** Distinct count of checksum across the matching connection */
  checksum?: Maybe<Scalars['BigInt']>;
  /** Distinct count of installedBy across the matching connection */
  installedBy?: Maybe<Scalars['BigInt']>;
  /** Distinct count of installedOn across the matching connection */
  installedOn?: Maybe<Scalars['BigInt']>;
  /** Distinct count of executionTime across the matching connection */
  executionTime?: Maybe<Scalars['BigInt']>;
  /** Distinct count of success across the matching connection */
  success?: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `FlywaySchemaHistory` object types. All fields are combined with a logical ‘and.’ */
export type FlywaySchemaHistoryFilter = {
  /** Filter by the object’s `installedRank` field. */
  installedRank?: Maybe<IntFilter>;
  /** Filter by the object’s `version` field. */
  version?: Maybe<StringFilter>;
  /** Filter by the object’s `description` field. */
  description?: Maybe<StringFilter>;
  /** Filter by the object’s `type` field. */
  type?: Maybe<StringFilter>;
  /** Filter by the object’s `script` field. */
  script?: Maybe<StringFilter>;
  /** Filter by the object’s `checksum` field. */
  checksum?: Maybe<IntFilter>;
  /** Filter by the object’s `installedBy` field. */
  installedBy?: Maybe<StringFilter>;
  /** Filter by the object’s `installedOn` field. */
  installedOn?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `executionTime` field. */
  executionTime?: Maybe<IntFilter>;
  /** Filter by the object’s `success` field. */
  success?: Maybe<BooleanFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<FlywaySchemaHistoryFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<FlywaySchemaHistoryFilter>>;
  /** Negates the expression. */
  not?: Maybe<FlywaySchemaHistoryFilter>;
};

/** Grouping methods for `FlywaySchemaHistory` for usage during aggregation. */
export enum FlywaySchemaHistoryGroupBy {
  Version = 'VERSION',
  Description = 'DESCRIPTION',
  Type = 'TYPE',
  Script = 'SCRIPT',
  Checksum = 'CHECKSUM',
  InstalledBy = 'INSTALLED_BY',
  InstalledOn = 'INSTALLED_ON',
  InstalledOnTruncatedToHour = 'INSTALLED_ON_TRUNCATED_TO_HOUR',
  InstalledOnTruncatedToDay = 'INSTALLED_ON_TRUNCATED_TO_DAY',
  ExecutionTime = 'EXECUTION_TIME',
  Success = 'SUCCESS'
}

export type FlywaySchemaHistoryHavingAverageInput = {
  installedRank?: Maybe<HavingIntFilter>;
  checksum?: Maybe<HavingIntFilter>;
  installedOn?: Maybe<HavingDatetimeFilter>;
  executionTime?: Maybe<HavingIntFilter>;
};

export type FlywaySchemaHistoryHavingDistinctCountInput = {
  installedRank?: Maybe<HavingIntFilter>;
  checksum?: Maybe<HavingIntFilter>;
  installedOn?: Maybe<HavingDatetimeFilter>;
  executionTime?: Maybe<HavingIntFilter>;
};

/** Conditions for `FlywaySchemaHistory` aggregates. */
export type FlywaySchemaHistoryHavingInput = {
  AND?: Maybe<Array<FlywaySchemaHistoryHavingInput>>;
  OR?: Maybe<Array<FlywaySchemaHistoryHavingInput>>;
  sum?: Maybe<FlywaySchemaHistoryHavingSumInput>;
  distinctCount?: Maybe<FlywaySchemaHistoryHavingDistinctCountInput>;
  min?: Maybe<FlywaySchemaHistoryHavingMinInput>;
  max?: Maybe<FlywaySchemaHistoryHavingMaxInput>;
  average?: Maybe<FlywaySchemaHistoryHavingAverageInput>;
  stddevSample?: Maybe<FlywaySchemaHistoryHavingStddevSampleInput>;
  stddevPopulation?: Maybe<FlywaySchemaHistoryHavingStddevPopulationInput>;
  varianceSample?: Maybe<FlywaySchemaHistoryHavingVarianceSampleInput>;
  variancePopulation?: Maybe<FlywaySchemaHistoryHavingVariancePopulationInput>;
};

export type FlywaySchemaHistoryHavingMaxInput = {
  installedRank?: Maybe<HavingIntFilter>;
  checksum?: Maybe<HavingIntFilter>;
  installedOn?: Maybe<HavingDatetimeFilter>;
  executionTime?: Maybe<HavingIntFilter>;
};

export type FlywaySchemaHistoryHavingMinInput = {
  installedRank?: Maybe<HavingIntFilter>;
  checksum?: Maybe<HavingIntFilter>;
  installedOn?: Maybe<HavingDatetimeFilter>;
  executionTime?: Maybe<HavingIntFilter>;
};

export type FlywaySchemaHistoryHavingStddevPopulationInput = {
  installedRank?: Maybe<HavingIntFilter>;
  checksum?: Maybe<HavingIntFilter>;
  installedOn?: Maybe<HavingDatetimeFilter>;
  executionTime?: Maybe<HavingIntFilter>;
};

export type FlywaySchemaHistoryHavingStddevSampleInput = {
  installedRank?: Maybe<HavingIntFilter>;
  checksum?: Maybe<HavingIntFilter>;
  installedOn?: Maybe<HavingDatetimeFilter>;
  executionTime?: Maybe<HavingIntFilter>;
};

export type FlywaySchemaHistoryHavingSumInput = {
  installedRank?: Maybe<HavingIntFilter>;
  checksum?: Maybe<HavingIntFilter>;
  installedOn?: Maybe<HavingDatetimeFilter>;
  executionTime?: Maybe<HavingIntFilter>;
};

export type FlywaySchemaHistoryHavingVariancePopulationInput = {
  installedRank?: Maybe<HavingIntFilter>;
  checksum?: Maybe<HavingIntFilter>;
  installedOn?: Maybe<HavingDatetimeFilter>;
  executionTime?: Maybe<HavingIntFilter>;
};

export type FlywaySchemaHistoryHavingVarianceSampleInput = {
  installedRank?: Maybe<HavingIntFilter>;
  checksum?: Maybe<HavingIntFilter>;
  installedOn?: Maybe<HavingDatetimeFilter>;
  executionTime?: Maybe<HavingIntFilter>;
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

export type FlywaySchemaHistoryMaxAggregates = {
  __typename?: 'FlywaySchemaHistoryMaxAggregates';
  /** Maximum of installedRank across the matching connection */
  installedRank?: Maybe<Scalars['Int']>;
  /** Maximum of checksum across the matching connection */
  checksum?: Maybe<Scalars['Int']>;
  /** Maximum of executionTime across the matching connection */
  executionTime?: Maybe<Scalars['Int']>;
};

export type FlywaySchemaHistoryMinAggregates = {
  __typename?: 'FlywaySchemaHistoryMinAggregates';
  /** Minimum of installedRank across the matching connection */
  installedRank?: Maybe<Scalars['Int']>;
  /** Minimum of checksum across the matching connection */
  checksum?: Maybe<Scalars['Int']>;
  /** Minimum of executionTime across the matching connection */
  executionTime?: Maybe<Scalars['Int']>;
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

export type FlywaySchemaHistoryStddevPopulationAggregates = {
  __typename?: 'FlywaySchemaHistoryStddevPopulationAggregates';
  /** Population standard deviation of installedRank across the matching connection */
  installedRank?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of checksum across the matching connection */
  checksum?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of executionTime across the matching connection */
  executionTime?: Maybe<Scalars['BigFloat']>;
};

export type FlywaySchemaHistoryStddevSampleAggregates = {
  __typename?: 'FlywaySchemaHistoryStddevSampleAggregates';
  /** Sample standard deviation of installedRank across the matching connection */
  installedRank?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of checksum across the matching connection */
  checksum?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of executionTime across the matching connection */
  executionTime?: Maybe<Scalars['BigFloat']>;
};

export type FlywaySchemaHistorySumAggregates = {
  __typename?: 'FlywaySchemaHistorySumAggregates';
  /** Sum of installedRank across the matching connection */
  installedRank: Scalars['BigInt'];
  /** Sum of checksum across the matching connection */
  checksum: Scalars['BigInt'];
  /** Sum of executionTime across the matching connection */
  executionTime: Scalars['BigInt'];
};

export type FlywaySchemaHistoryVariancePopulationAggregates = {
  __typename?: 'FlywaySchemaHistoryVariancePopulationAggregates';
  /** Population variance of installedRank across the matching connection */
  installedRank?: Maybe<Scalars['BigFloat']>;
  /** Population variance of checksum across the matching connection */
  checksum?: Maybe<Scalars['BigFloat']>;
  /** Population variance of executionTime across the matching connection */
  executionTime?: Maybe<Scalars['BigFloat']>;
};

export type FlywaySchemaHistoryVarianceSampleAggregates = {
  __typename?: 'FlywaySchemaHistoryVarianceSampleAggregates';
  /** Sample variance of installedRank across the matching connection */
  installedRank?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of checksum across the matching connection */
  checksum?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of executionTime across the matching connection */
  executionTime?: Maybe<Scalars['BigFloat']>;
};

export type HavingBigintFilter = {
  equalTo?: Maybe<Scalars['BigInt']>;
  notEqualTo?: Maybe<Scalars['BigInt']>;
  greaterThan?: Maybe<Scalars['BigInt']>;
  greaterThanOrEqualTo?: Maybe<Scalars['BigInt']>;
  lessThan?: Maybe<Scalars['BigInt']>;
  lessThanOrEqualTo?: Maybe<Scalars['BigInt']>;
};

export type HavingDatetimeFilter = {
  equalTo?: Maybe<Scalars['Datetime']>;
  notEqualTo?: Maybe<Scalars['Datetime']>;
  greaterThan?: Maybe<Scalars['Datetime']>;
  greaterThanOrEqualTo?: Maybe<Scalars['Datetime']>;
  lessThan?: Maybe<Scalars['Datetime']>;
  lessThanOrEqualTo?: Maybe<Scalars['Datetime']>;
};

export type HavingIntFilter = {
  equalTo?: Maybe<Scalars['Int']>;
  notEqualTo?: Maybe<Scalars['Int']>;
  greaterThan?: Maybe<Scalars['Int']>;
  greaterThanOrEqualTo?: Maybe<Scalars['Int']>;
  lessThan?: Maybe<Scalars['Int']>;
  lessThanOrEqualTo?: Maybe<Scalars['Int']>;
};

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Int']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Int']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Int']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Int']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Int']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Int']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Int']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Int']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Int']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Int']>;
};


/** A filter to be used against JSON fields. All fields are combined with a logical ‘and.’ */
export type JsonFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['JSON']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['JSON']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['JSON']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['JSON']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['JSON']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['JSON']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['JSON']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['JSON']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['JSON']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['JSON']>;
  /** Contains the specified JSON. */
  contains?: Maybe<Scalars['JSON']>;
  /** Contains the specified key. */
  containsKey?: Maybe<Scalars['String']>;
  /** Contains all of the specified keys. */
  containsAllKeys?: Maybe<Array<Scalars['String']>>;
  /** Contains any of the specified keys. */
  containsAnyKeys?: Maybe<Array<Scalars['String']>>;
  /** Contained by the specified JSON. */
  containedBy?: Maybe<Scalars['JSON']>;
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
  filter?: Maybe<MsgEventAttrFilter>;
};


export type MsgMsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MsgEventsOrderBy>>;
  condition?: Maybe<MsgEventCondition>;
  filter?: Maybe<MsgEventFilter>;
};

export type MsgAggregates = {
  __typename?: 'MsgAggregates';
  keys?: Maybe<Array<Scalars['String']>>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<MsgSumAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<MsgDistinctCountAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<MsgMinAggregates>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<MsgMaxAggregates>;
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<MsgAverageAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<MsgStddevSampleAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<MsgStddevPopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<MsgVarianceSampleAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<MsgVariancePopulationAggregates>;
};

export type MsgAverageAggregates = {
  __typename?: 'MsgAverageAggregates';
  /** Mean average of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Mean average of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Mean average of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Mean average of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
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

export type MsgDistinctCountAggregates = {
  __typename?: 'MsgDistinctCountAggregates';
  /** Distinct count of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigInt']>;
  /** Distinct count of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Distinct count of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of data across the matching connection */
  data?: Maybe<Scalars['BigInt']>;
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
  filter?: Maybe<ClassIssuerFilter>;
};


export type MsgEventProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ProposalsOrderBy>>;
  condition?: Maybe<ProposalCondition>;
  filter?: Maybe<ProposalFilter>;
};


export type MsgEventRetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<RetirementsOrderBy>>;
  condition?: Maybe<RetirementCondition>;
  filter?: Maybe<RetirementFilter>;
};


export type MsgEventVotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<VotesOrderBy>>;
  condition?: Maybe<VoteCondition>;
  filter?: Maybe<VoteFilter>;
};

export type MsgEventAggregates = {
  __typename?: 'MsgEventAggregates';
  keys?: Maybe<Array<Scalars['String']>>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<MsgEventSumAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<MsgEventDistinctCountAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<MsgEventMinAggregates>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<MsgEventMaxAggregates>;
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<MsgEventAverageAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<MsgEventStddevSampleAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<MsgEventStddevPopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<MsgEventVarianceSampleAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<MsgEventVariancePopulationAggregates>;
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

export type MsgEventAttrAggregates = {
  __typename?: 'MsgEventAttrAggregates';
  keys?: Maybe<Array<Scalars['String']>>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<MsgEventAttrSumAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<MsgEventAttrDistinctCountAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<MsgEventAttrMinAggregates>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<MsgEventAttrMaxAggregates>;
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<MsgEventAttrAverageAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<MsgEventAttrStddevSampleAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<MsgEventAttrStddevPopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<MsgEventAttrVarianceSampleAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<MsgEventAttrVariancePopulationAggregates>;
};

export type MsgEventAttrAverageAggregates = {
  __typename?: 'MsgEventAttrAverageAggregates';
  /** Mean average of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Mean average of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Mean average of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Mean average of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
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

export type MsgEventAttrDistinctCountAggregates = {
  __typename?: 'MsgEventAttrDistinctCountAggregates';
  /** Distinct count of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigInt']>;
  /** Distinct count of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Distinct count of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of type across the matching connection */
  type?: Maybe<Scalars['BigInt']>;
  /** Distinct count of key across the matching connection */
  key?: Maybe<Scalars['BigInt']>;
  /** Distinct count of value across the matching connection */
  value?: Maybe<Scalars['BigInt']>;
  /** Distinct count of valueHash across the matching connection */
  valueHash?: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `MsgEventAttr` object types. All fields are combined with a logical ‘and.’ */
export type MsgEventAttrFilter = {
  /** Filter by the object’s `chainNum` field. */
  chainNum?: Maybe<IntFilter>;
  /** Filter by the object’s `blockHeight` field. */
  blockHeight?: Maybe<BigIntFilter>;
  /** Filter by the object’s `txIdx` field. */
  txIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `msgIdx` field. */
  msgIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `type` field. */
  type?: Maybe<StringFilter>;
  /** Filter by the object’s `key` field. */
  key?: Maybe<StringFilter>;
  /** Filter by the object’s `value` field. */
  value?: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<MsgEventAttrFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<MsgEventAttrFilter>>;
  /** Negates the expression. */
  not?: Maybe<MsgEventAttrFilter>;
};

/** Grouping methods for `MsgEventAttr` for usage during aggregation. */
export enum MsgEventAttrGroupBy {
  ChainNum = 'CHAIN_NUM',
  BlockHeight = 'BLOCK_HEIGHT',
  TxIdx = 'TX_IDX',
  MsgIdx = 'MSG_IDX',
  Type = 'TYPE',
  Key = 'KEY',
  Value = 'VALUE',
  ValueHash = 'VALUE_HASH'
}

export type MsgEventAttrHavingAverageInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type MsgEventAttrHavingDistinctCountInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

/** Conditions for `MsgEventAttr` aggregates. */
export type MsgEventAttrHavingInput = {
  AND?: Maybe<Array<MsgEventAttrHavingInput>>;
  OR?: Maybe<Array<MsgEventAttrHavingInput>>;
  sum?: Maybe<MsgEventAttrHavingSumInput>;
  distinctCount?: Maybe<MsgEventAttrHavingDistinctCountInput>;
  min?: Maybe<MsgEventAttrHavingMinInput>;
  max?: Maybe<MsgEventAttrHavingMaxInput>;
  average?: Maybe<MsgEventAttrHavingAverageInput>;
  stddevSample?: Maybe<MsgEventAttrHavingStddevSampleInput>;
  stddevPopulation?: Maybe<MsgEventAttrHavingStddevPopulationInput>;
  varianceSample?: Maybe<MsgEventAttrHavingVarianceSampleInput>;
  variancePopulation?: Maybe<MsgEventAttrHavingVariancePopulationInput>;
};

export type MsgEventAttrHavingMaxInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type MsgEventAttrHavingMinInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type MsgEventAttrHavingStddevPopulationInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type MsgEventAttrHavingStddevSampleInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type MsgEventAttrHavingSumInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type MsgEventAttrHavingVariancePopulationInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type MsgEventAttrHavingVarianceSampleInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
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

export type MsgEventAttrMaxAggregates = {
  __typename?: 'MsgEventAttrMaxAggregates';
  /** Maximum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Maximum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Maximum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
  /** Maximum of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['Int']>;
};

export type MsgEventAttrMinAggregates = {
  __typename?: 'MsgEventAttrMinAggregates';
  /** Minimum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Minimum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Minimum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
  /** Minimum of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['Int']>;
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

export type MsgEventAttrStddevPopulationAggregates = {
  __typename?: 'MsgEventAttrStddevPopulationAggregates';
  /** Population standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type MsgEventAttrStddevSampleAggregates = {
  __typename?: 'MsgEventAttrStddevSampleAggregates';
  /** Sample standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type MsgEventAttrSumAggregates = {
  __typename?: 'MsgEventAttrSumAggregates';
  /** Sum of chainNum across the matching connection */
  chainNum: Scalars['BigInt'];
  /** Sum of blockHeight across the matching connection */
  blockHeight: Scalars['BigFloat'];
  /** Sum of txIdx across the matching connection */
  txIdx: Scalars['BigInt'];
  /** Sum of msgIdx across the matching connection */
  msgIdx: Scalars['BigInt'];
};

export type MsgEventAttrVariancePopulationAggregates = {
  __typename?: 'MsgEventAttrVariancePopulationAggregates';
  /** Population variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Population variance of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type MsgEventAttrVarianceSampleAggregates = {
  __typename?: 'MsgEventAttrVarianceSampleAggregates';
  /** Sample variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
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
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<MsgEventAttrAggregates>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<MsgEventAttrAggregates>>;
};


/** A connection to a list of `MsgEventAttr` values. */
export type MsgEventAttrsConnectionGroupedAggregatesArgs = {
  groupBy: Array<MsgEventAttrGroupBy>;
  having?: Maybe<MsgEventAttrHavingInput>;
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

export type MsgEventAverageAggregates = {
  __typename?: 'MsgEventAverageAggregates';
  /** Mean average of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Mean average of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Mean average of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Mean average of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

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

export type MsgEventDistinctCountAggregates = {
  __typename?: 'MsgEventDistinctCountAggregates';
  /** Distinct count of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigInt']>;
  /** Distinct count of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Distinct count of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of type across the matching connection */
  type?: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `MsgEvent` object types. All fields are combined with a logical ‘and.’ */
export type MsgEventFilter = {
  /** Filter by the object’s `chainNum` field. */
  chainNum?: Maybe<IntFilter>;
  /** Filter by the object’s `blockHeight` field. */
  blockHeight?: Maybe<BigIntFilter>;
  /** Filter by the object’s `txIdx` field. */
  txIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `msgIdx` field. */
  msgIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `type` field. */
  type?: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<MsgEventFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<MsgEventFilter>>;
  /** Negates the expression. */
  not?: Maybe<MsgEventFilter>;
};

/** Grouping methods for `MsgEvent` for usage during aggregation. */
export enum MsgEventGroupBy {
  ChainNum = 'CHAIN_NUM',
  BlockHeight = 'BLOCK_HEIGHT',
  TxIdx = 'TX_IDX',
  MsgIdx = 'MSG_IDX',
  Type = 'TYPE'
}

export type MsgEventHavingAverageInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type MsgEventHavingDistinctCountInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

/** Conditions for `MsgEvent` aggregates. */
export type MsgEventHavingInput = {
  AND?: Maybe<Array<MsgEventHavingInput>>;
  OR?: Maybe<Array<MsgEventHavingInput>>;
  sum?: Maybe<MsgEventHavingSumInput>;
  distinctCount?: Maybe<MsgEventHavingDistinctCountInput>;
  min?: Maybe<MsgEventHavingMinInput>;
  max?: Maybe<MsgEventHavingMaxInput>;
  average?: Maybe<MsgEventHavingAverageInput>;
  stddevSample?: Maybe<MsgEventHavingStddevSampleInput>;
  stddevPopulation?: Maybe<MsgEventHavingStddevPopulationInput>;
  varianceSample?: Maybe<MsgEventHavingVarianceSampleInput>;
  variancePopulation?: Maybe<MsgEventHavingVariancePopulationInput>;
};

export type MsgEventHavingMaxInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type MsgEventHavingMinInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type MsgEventHavingStddevPopulationInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type MsgEventHavingStddevSampleInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type MsgEventHavingSumInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type MsgEventHavingVariancePopulationInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type MsgEventHavingVarianceSampleInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

/** An input for mutations affecting `MsgEvent` */
export type MsgEventInput = {
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  type: Scalars['String'];
};

export type MsgEventMaxAggregates = {
  __typename?: 'MsgEventMaxAggregates';
  /** Maximum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Maximum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Maximum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
  /** Maximum of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['Int']>;
};

export type MsgEventMinAggregates = {
  __typename?: 'MsgEventMinAggregates';
  /** Minimum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Minimum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Minimum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
  /** Minimum of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['Int']>;
};

/** Represents an update to a `MsgEvent`. Fields that are set will be updated. */
export type MsgEventPatch = {
  chainNum?: Maybe<Scalars['Int']>;
  blockHeight?: Maybe<Scalars['BigInt']>;
  txIdx?: Maybe<Scalars['Int']>;
  msgIdx?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

export type MsgEventStddevPopulationAggregates = {
  __typename?: 'MsgEventStddevPopulationAggregates';
  /** Population standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type MsgEventStddevSampleAggregates = {
  __typename?: 'MsgEventStddevSampleAggregates';
  /** Sample standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type MsgEventSumAggregates = {
  __typename?: 'MsgEventSumAggregates';
  /** Sum of chainNum across the matching connection */
  chainNum: Scalars['BigInt'];
  /** Sum of blockHeight across the matching connection */
  blockHeight: Scalars['BigFloat'];
  /** Sum of txIdx across the matching connection */
  txIdx: Scalars['BigInt'];
  /** Sum of msgIdx across the matching connection */
  msgIdx: Scalars['BigInt'];
};

export type MsgEventVariancePopulationAggregates = {
  __typename?: 'MsgEventVariancePopulationAggregates';
  /** Population variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Population variance of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type MsgEventVarianceSampleAggregates = {
  __typename?: 'MsgEventVarianceSampleAggregates';
  /** Sample variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
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
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<MsgEventAggregates>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<MsgEventAggregates>>;
};


/** A connection to a list of `MsgEvent` values. */
export type MsgEventsConnectionGroupedAggregatesArgs = {
  groupBy: Array<MsgEventGroupBy>;
  having?: Maybe<MsgEventHavingInput>;
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
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeCountAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_COUNT_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeCountDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_COUNT_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTypeAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TYPE_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTypeDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TYPE_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumBlockHeightAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_BLOCK_HEIGHT_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumBlockHeightDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_BLOCK_HEIGHT_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTxIdxAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TX_IDX_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTxIdxDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TX_IDX_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumMsgIdxAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_MSG_IDX_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumMsgIdxDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_MSG_IDX_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumChainNumAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_CHAIN_NUM_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumChainNumDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_CHAIN_NUM_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTimestampAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TIMESTAMP_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTimestampDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TIMESTAMP_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTxHashAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TX_HASH_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTxHashDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TX_HASH_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumClassIdAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_CLASS_ID_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumClassIdDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_CLASS_ID_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumIssuerAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_ISSUER_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumIssuerDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_ISSUER_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumLatestAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_LATEST_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumLatestDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_LATEST_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTypeAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TYPE_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTypeDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TYPE_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountBlockHeightAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_BLOCK_HEIGHT_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountBlockHeightDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_BLOCK_HEIGHT_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTxIdxAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TX_IDX_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTxIdxDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TX_IDX_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountMsgIdxAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_MSG_IDX_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountMsgIdxDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_MSG_IDX_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountChainNumAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_CHAIN_NUM_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountChainNumDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_CHAIN_NUM_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTimestampAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TIMESTAMP_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTimestampDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TIMESTAMP_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTxHashAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TX_HASH_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTxHashDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TX_HASH_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountClassIdAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_CLASS_ID_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountClassIdDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_CLASS_ID_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountIssuerAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_ISSUER_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountIssuerDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_ISSUER_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountLatestAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_LATEST_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountLatestDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_LATEST_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTypeAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TYPE_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTypeDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TYPE_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinBlockHeightAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_BLOCK_HEIGHT_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinBlockHeightDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_BLOCK_HEIGHT_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTxIdxAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TX_IDX_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTxIdxDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TX_IDX_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinMsgIdxAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_MSG_IDX_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinMsgIdxDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_MSG_IDX_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinChainNumAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_CHAIN_NUM_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinChainNumDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_CHAIN_NUM_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTimestampAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TIMESTAMP_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTimestampDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TIMESTAMP_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTxHashAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TX_HASH_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTxHashDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TX_HASH_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinClassIdAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_CLASS_ID_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinClassIdDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_CLASS_ID_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinIssuerAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_ISSUER_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinIssuerDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_ISSUER_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinLatestAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_LATEST_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinLatestDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_LATEST_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTypeAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TYPE_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTypeDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TYPE_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxBlockHeightAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_BLOCK_HEIGHT_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxBlockHeightDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_BLOCK_HEIGHT_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTxIdxAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TX_IDX_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTxIdxDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TX_IDX_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxMsgIdxAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_MSG_IDX_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxMsgIdxDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_MSG_IDX_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxChainNumAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_CHAIN_NUM_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxChainNumDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_CHAIN_NUM_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTimestampAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TIMESTAMP_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTimestampDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TIMESTAMP_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTxHashAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TX_HASH_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTxHashDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TX_HASH_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxClassIdAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_CLASS_ID_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxClassIdDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_CLASS_ID_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxIssuerAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_ISSUER_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxIssuerDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_ISSUER_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxLatestAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_LATEST_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxLatestDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_LATEST_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTypeAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TYPE_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTypeDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TYPE_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageBlockHeightAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_BLOCK_HEIGHT_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageBlockHeightDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_BLOCK_HEIGHT_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTxIdxAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TX_IDX_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTxIdxDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TX_IDX_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageMsgIdxAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_MSG_IDX_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageMsgIdxDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_MSG_IDX_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageChainNumAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_CHAIN_NUM_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageChainNumDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_CHAIN_NUM_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTimestampAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TIMESTAMP_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTimestampDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TIMESTAMP_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTxHashAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TX_HASH_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTxHashDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TX_HASH_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageClassIdAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_CLASS_ID_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageClassIdDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_CLASS_ID_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageIssuerAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_ISSUER_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageIssuerDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_ISSUER_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageLatestAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_LATEST_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageLatestDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_LATEST_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTypeAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TYPE_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTypeDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TYPE_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleBlockHeightAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_BLOCK_HEIGHT_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleBlockHeightDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_BLOCK_HEIGHT_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTxIdxAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TX_IDX_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTxIdxDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TX_IDX_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleMsgIdxAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_MSG_IDX_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleMsgIdxDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_MSG_IDX_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleChainNumAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_CHAIN_NUM_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleChainNumDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_CHAIN_NUM_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTimestampAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TIMESTAMP_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTimestampDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TIMESTAMP_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTxHashAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TX_HASH_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTxHashDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TX_HASH_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleClassIdAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_CLASS_ID_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleClassIdDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_CLASS_ID_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleIssuerAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_ISSUER_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleIssuerDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_ISSUER_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleLatestAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_LATEST_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleLatestDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_LATEST_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTypeAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TYPE_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTypeDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TYPE_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationBlockHeightAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_BLOCK_HEIGHT_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationBlockHeightDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_BLOCK_HEIGHT_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTxIdxAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TX_IDX_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTxIdxDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TX_IDX_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationMsgIdxAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_MSG_IDX_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationMsgIdxDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_MSG_IDX_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationChainNumAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_CHAIN_NUM_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationChainNumDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_CHAIN_NUM_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTimestampAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TIMESTAMP_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTimestampDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TIMESTAMP_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTxHashAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TX_HASH_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTxHashDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TX_HASH_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationClassIdAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_CLASS_ID_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationClassIdDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_CLASS_ID_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationIssuerAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_ISSUER_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationIssuerDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_ISSUER_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationLatestAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_LATEST_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationLatestDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_LATEST_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTypeAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TYPE_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTypeDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TYPE_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleBlockHeightAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_BLOCK_HEIGHT_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleBlockHeightDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_BLOCK_HEIGHT_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTxIdxAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TX_IDX_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTxIdxDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TX_IDX_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleMsgIdxAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_MSG_IDX_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleMsgIdxDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_MSG_IDX_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleChainNumAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_CHAIN_NUM_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleChainNumDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_CHAIN_NUM_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTimestampAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TIMESTAMP_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTimestampDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TIMESTAMP_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTxHashAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TX_HASH_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTxHashDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TX_HASH_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleClassIdAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_CLASS_ID_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleClassIdDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_CLASS_ID_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleIssuerAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_ISSUER_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleIssuerDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_ISSUER_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleLatestAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_LATEST_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleLatestDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_LATEST_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTypeAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TYPE_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTypeDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TYPE_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationBlockHeightAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_BLOCK_HEIGHT_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationBlockHeightDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_BLOCK_HEIGHT_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTxIdxAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TX_IDX_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTxIdxDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TX_IDX_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationMsgIdxAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_MSG_IDX_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationMsgIdxDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_MSG_IDX_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationChainNumAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_CHAIN_NUM_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationChainNumDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_CHAIN_NUM_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTimestampAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TIMESTAMP_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTimestampDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TIMESTAMP_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTxHashAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TX_HASH_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTxHashDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TX_HASH_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationClassIdAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_CLASS_ID_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationClassIdDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_CLASS_ID_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationIssuerAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_ISSUER_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationIssuerDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_ISSUER_DESC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationLatestAsc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_LATEST_ASC',
  ClassIssuersByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationLatestDesc = 'CLASS_ISSUERS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_LATEST_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeCountAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_COUNT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeCountDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_COUNT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTypeAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TYPE_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTypeDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TYPE_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumBlockHeightAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_BLOCK_HEIGHT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumBlockHeightDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_BLOCK_HEIGHT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTxIdxAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TX_IDX_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTxIdxDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TX_IDX_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumMsgIdxAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_MSG_IDX_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumMsgIdxDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_MSG_IDX_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumChainNumAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_CHAIN_NUM_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumChainNumDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_CHAIN_NUM_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTimestampAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TIMESTAMP_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTimestampDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TIMESTAMP_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTxHashAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TX_HASH_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTxHashDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TX_HASH_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumProposalIdAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_PROPOSAL_ID_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumProposalIdDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_PROPOSAL_ID_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumStatusAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_STATUS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumStatusDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_STATUS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumGroupPolicyAddressAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_GROUP_POLICY_ADDRESS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumGroupPolicyAddressDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_GROUP_POLICY_ADDRESS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumMetadataAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_METADATA_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumMetadataDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_METADATA_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumProposersAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_PROPOSERS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumProposersDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_PROPOSERS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumSubmitTimeAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_SUBMIT_TIME_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumSubmitTimeDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_SUBMIT_TIME_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumGroupVersionAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_GROUP_VERSION_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumGroupVersionDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_GROUP_VERSION_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumGroupPolicyVersionAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_GROUP_POLICY_VERSION_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumGroupPolicyVersionDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_GROUP_POLICY_VERSION_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumFinalTallyResultAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_FINAL_TALLY_RESULT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumFinalTallyResultDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_FINAL_TALLY_RESULT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumVotingPeriodEndAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_VOTING_PERIOD_END_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumVotingPeriodEndDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_VOTING_PERIOD_END_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumExecutorResultAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_EXECUTOR_RESULT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumExecutorResultDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_EXECUTOR_RESULT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumMessagesAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_MESSAGES_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumMessagesDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_MESSAGES_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTypeAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TYPE_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTypeDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TYPE_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountBlockHeightAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_BLOCK_HEIGHT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountBlockHeightDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_BLOCK_HEIGHT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTxIdxAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TX_IDX_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTxIdxDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TX_IDX_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountMsgIdxAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_MSG_IDX_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountMsgIdxDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_MSG_IDX_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountChainNumAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_CHAIN_NUM_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountChainNumDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_CHAIN_NUM_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTimestampAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TIMESTAMP_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTimestampDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TIMESTAMP_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTxHashAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TX_HASH_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTxHashDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TX_HASH_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountProposalIdAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_PROPOSAL_ID_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountProposalIdDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_PROPOSAL_ID_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountStatusAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_STATUS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountStatusDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_STATUS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountGroupPolicyAddressAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_GROUP_POLICY_ADDRESS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountGroupPolicyAddressDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_GROUP_POLICY_ADDRESS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountMetadataAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_METADATA_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountMetadataDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_METADATA_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountProposersAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_PROPOSERS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountProposersDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_PROPOSERS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountSubmitTimeAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_SUBMIT_TIME_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountSubmitTimeDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_SUBMIT_TIME_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountGroupVersionAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_GROUP_VERSION_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountGroupVersionDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_GROUP_VERSION_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountGroupPolicyVersionAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_GROUP_POLICY_VERSION_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountGroupPolicyVersionDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_GROUP_POLICY_VERSION_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountFinalTallyResultAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_FINAL_TALLY_RESULT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountFinalTallyResultDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_FINAL_TALLY_RESULT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountVotingPeriodEndAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_VOTING_PERIOD_END_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountVotingPeriodEndDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_VOTING_PERIOD_END_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountExecutorResultAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_EXECUTOR_RESULT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountExecutorResultDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_EXECUTOR_RESULT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountMessagesAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_MESSAGES_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountMessagesDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_MESSAGES_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTypeAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TYPE_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTypeDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TYPE_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinBlockHeightAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_BLOCK_HEIGHT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinBlockHeightDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_BLOCK_HEIGHT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTxIdxAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TX_IDX_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTxIdxDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TX_IDX_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinMsgIdxAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_MSG_IDX_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinMsgIdxDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_MSG_IDX_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinChainNumAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_CHAIN_NUM_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinChainNumDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_CHAIN_NUM_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTimestampAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TIMESTAMP_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTimestampDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TIMESTAMP_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTxHashAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TX_HASH_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTxHashDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TX_HASH_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinProposalIdAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_PROPOSAL_ID_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinProposalIdDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_PROPOSAL_ID_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinStatusAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_STATUS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinStatusDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_STATUS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinGroupPolicyAddressAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_GROUP_POLICY_ADDRESS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinGroupPolicyAddressDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_GROUP_POLICY_ADDRESS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinMetadataAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_METADATA_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinMetadataDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_METADATA_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinProposersAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_PROPOSERS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinProposersDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_PROPOSERS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinSubmitTimeAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_SUBMIT_TIME_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinSubmitTimeDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_SUBMIT_TIME_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinGroupVersionAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_GROUP_VERSION_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinGroupVersionDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_GROUP_VERSION_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinGroupPolicyVersionAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_GROUP_POLICY_VERSION_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinGroupPolicyVersionDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_GROUP_POLICY_VERSION_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinFinalTallyResultAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_FINAL_TALLY_RESULT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinFinalTallyResultDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_FINAL_TALLY_RESULT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinVotingPeriodEndAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_VOTING_PERIOD_END_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinVotingPeriodEndDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_VOTING_PERIOD_END_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinExecutorResultAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_EXECUTOR_RESULT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinExecutorResultDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_EXECUTOR_RESULT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinMessagesAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_MESSAGES_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinMessagesDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_MESSAGES_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTypeAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TYPE_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTypeDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TYPE_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxBlockHeightAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_BLOCK_HEIGHT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxBlockHeightDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_BLOCK_HEIGHT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTxIdxAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TX_IDX_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTxIdxDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TX_IDX_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxMsgIdxAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_MSG_IDX_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxMsgIdxDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_MSG_IDX_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxChainNumAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_CHAIN_NUM_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxChainNumDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_CHAIN_NUM_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTimestampAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TIMESTAMP_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTimestampDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TIMESTAMP_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTxHashAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TX_HASH_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTxHashDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TX_HASH_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxProposalIdAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_PROPOSAL_ID_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxProposalIdDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_PROPOSAL_ID_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxStatusAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_STATUS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxStatusDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_STATUS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxGroupPolicyAddressAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_GROUP_POLICY_ADDRESS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxGroupPolicyAddressDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_GROUP_POLICY_ADDRESS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxMetadataAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_METADATA_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxMetadataDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_METADATA_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxProposersAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_PROPOSERS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxProposersDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_PROPOSERS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxSubmitTimeAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_SUBMIT_TIME_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxSubmitTimeDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_SUBMIT_TIME_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxGroupVersionAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_GROUP_VERSION_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxGroupVersionDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_GROUP_VERSION_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxGroupPolicyVersionAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_GROUP_POLICY_VERSION_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxGroupPolicyVersionDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_GROUP_POLICY_VERSION_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxFinalTallyResultAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_FINAL_TALLY_RESULT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxFinalTallyResultDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_FINAL_TALLY_RESULT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxVotingPeriodEndAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_VOTING_PERIOD_END_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxVotingPeriodEndDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_VOTING_PERIOD_END_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxExecutorResultAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_EXECUTOR_RESULT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxExecutorResultDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_EXECUTOR_RESULT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxMessagesAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_MESSAGES_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxMessagesDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_MESSAGES_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTypeAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TYPE_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTypeDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TYPE_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageBlockHeightAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_BLOCK_HEIGHT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageBlockHeightDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_BLOCK_HEIGHT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTxIdxAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TX_IDX_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTxIdxDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TX_IDX_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageMsgIdxAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_MSG_IDX_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageMsgIdxDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_MSG_IDX_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageChainNumAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_CHAIN_NUM_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageChainNumDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_CHAIN_NUM_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTimestampAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TIMESTAMP_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTimestampDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TIMESTAMP_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTxHashAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TX_HASH_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTxHashDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TX_HASH_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageProposalIdAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_PROPOSAL_ID_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageProposalIdDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_PROPOSAL_ID_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageStatusAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_STATUS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageStatusDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_STATUS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageGroupPolicyAddressAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_GROUP_POLICY_ADDRESS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageGroupPolicyAddressDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_GROUP_POLICY_ADDRESS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageMetadataAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_METADATA_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageMetadataDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_METADATA_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageProposersAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_PROPOSERS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageProposersDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_PROPOSERS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageSubmitTimeAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_SUBMIT_TIME_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageSubmitTimeDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_SUBMIT_TIME_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageGroupVersionAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_GROUP_VERSION_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageGroupVersionDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_GROUP_VERSION_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageGroupPolicyVersionAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_GROUP_POLICY_VERSION_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageGroupPolicyVersionDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_GROUP_POLICY_VERSION_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageFinalTallyResultAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_FINAL_TALLY_RESULT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageFinalTallyResultDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_FINAL_TALLY_RESULT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageVotingPeriodEndAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_VOTING_PERIOD_END_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageVotingPeriodEndDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_VOTING_PERIOD_END_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageExecutorResultAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_EXECUTOR_RESULT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageExecutorResultDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_EXECUTOR_RESULT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageMessagesAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_MESSAGES_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageMessagesDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_MESSAGES_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTypeAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TYPE_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTypeDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TYPE_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleBlockHeightAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_BLOCK_HEIGHT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleBlockHeightDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_BLOCK_HEIGHT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTxIdxAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TX_IDX_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTxIdxDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TX_IDX_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleMsgIdxAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_MSG_IDX_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleMsgIdxDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_MSG_IDX_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleChainNumAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_CHAIN_NUM_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleChainNumDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_CHAIN_NUM_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTimestampAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TIMESTAMP_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTimestampDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TIMESTAMP_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTxHashAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TX_HASH_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTxHashDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TX_HASH_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleProposalIdAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_PROPOSAL_ID_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleProposalIdDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_PROPOSAL_ID_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleStatusAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_STATUS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleStatusDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_STATUS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleGroupPolicyAddressAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_GROUP_POLICY_ADDRESS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleGroupPolicyAddressDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_GROUP_POLICY_ADDRESS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleMetadataAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_METADATA_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleMetadataDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_METADATA_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleProposersAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_PROPOSERS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleProposersDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_PROPOSERS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleSubmitTimeAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_SUBMIT_TIME_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleSubmitTimeDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_SUBMIT_TIME_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleGroupVersionAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_GROUP_VERSION_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleGroupVersionDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_GROUP_VERSION_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleGroupPolicyVersionAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_GROUP_POLICY_VERSION_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleGroupPolicyVersionDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_GROUP_POLICY_VERSION_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleFinalTallyResultAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_FINAL_TALLY_RESULT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleFinalTallyResultDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_FINAL_TALLY_RESULT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleVotingPeriodEndAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_VOTING_PERIOD_END_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleVotingPeriodEndDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_VOTING_PERIOD_END_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleExecutorResultAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_EXECUTOR_RESULT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleExecutorResultDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_EXECUTOR_RESULT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleMessagesAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_MESSAGES_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleMessagesDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_MESSAGES_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTypeAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TYPE_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTypeDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TYPE_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationBlockHeightAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_BLOCK_HEIGHT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationBlockHeightDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_BLOCK_HEIGHT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTxIdxAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TX_IDX_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTxIdxDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TX_IDX_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationMsgIdxAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_MSG_IDX_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationMsgIdxDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_MSG_IDX_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationChainNumAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_CHAIN_NUM_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationChainNumDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_CHAIN_NUM_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTimestampAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TIMESTAMP_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTimestampDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TIMESTAMP_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTxHashAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TX_HASH_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTxHashDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TX_HASH_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationProposalIdAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_PROPOSAL_ID_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationProposalIdDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_PROPOSAL_ID_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationStatusAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_STATUS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationStatusDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_STATUS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationGroupPolicyAddressAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_GROUP_POLICY_ADDRESS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationGroupPolicyAddressDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_GROUP_POLICY_ADDRESS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationMetadataAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_METADATA_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationMetadataDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_METADATA_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationProposersAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_PROPOSERS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationProposersDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_PROPOSERS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationSubmitTimeAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_SUBMIT_TIME_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationSubmitTimeDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_SUBMIT_TIME_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationGroupVersionAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_GROUP_VERSION_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationGroupVersionDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_GROUP_VERSION_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationGroupPolicyVersionAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_GROUP_POLICY_VERSION_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationGroupPolicyVersionDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_GROUP_POLICY_VERSION_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationFinalTallyResultAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_FINAL_TALLY_RESULT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationFinalTallyResultDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_FINAL_TALLY_RESULT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationVotingPeriodEndAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_VOTING_PERIOD_END_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationVotingPeriodEndDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_VOTING_PERIOD_END_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationExecutorResultAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_EXECUTOR_RESULT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationExecutorResultDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_EXECUTOR_RESULT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationMessagesAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_MESSAGES_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationMessagesDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_MESSAGES_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTypeAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TYPE_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTypeDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TYPE_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleBlockHeightAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_BLOCK_HEIGHT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleBlockHeightDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_BLOCK_HEIGHT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTxIdxAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TX_IDX_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTxIdxDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TX_IDX_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleMsgIdxAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_MSG_IDX_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleMsgIdxDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_MSG_IDX_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleChainNumAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_CHAIN_NUM_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleChainNumDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_CHAIN_NUM_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTimestampAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TIMESTAMP_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTimestampDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TIMESTAMP_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTxHashAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TX_HASH_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTxHashDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TX_HASH_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleProposalIdAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_PROPOSAL_ID_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleProposalIdDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_PROPOSAL_ID_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleStatusAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_STATUS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleStatusDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_STATUS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleGroupPolicyAddressAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_GROUP_POLICY_ADDRESS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleGroupPolicyAddressDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_GROUP_POLICY_ADDRESS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleMetadataAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_METADATA_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleMetadataDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_METADATA_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleProposersAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_PROPOSERS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleProposersDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_PROPOSERS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleSubmitTimeAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_SUBMIT_TIME_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleSubmitTimeDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_SUBMIT_TIME_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleGroupVersionAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_GROUP_VERSION_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleGroupVersionDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_GROUP_VERSION_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleGroupPolicyVersionAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_GROUP_POLICY_VERSION_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleGroupPolicyVersionDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_GROUP_POLICY_VERSION_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleFinalTallyResultAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_FINAL_TALLY_RESULT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleFinalTallyResultDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_FINAL_TALLY_RESULT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleVotingPeriodEndAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_VOTING_PERIOD_END_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleVotingPeriodEndDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_VOTING_PERIOD_END_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleExecutorResultAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_EXECUTOR_RESULT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleExecutorResultDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_EXECUTOR_RESULT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleMessagesAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_MESSAGES_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleMessagesDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_MESSAGES_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTypeAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TYPE_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTypeDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TYPE_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationBlockHeightAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_BLOCK_HEIGHT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationBlockHeightDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_BLOCK_HEIGHT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTxIdxAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TX_IDX_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTxIdxDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TX_IDX_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationMsgIdxAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_MSG_IDX_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationMsgIdxDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_MSG_IDX_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationChainNumAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_CHAIN_NUM_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationChainNumDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_CHAIN_NUM_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTimestampAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TIMESTAMP_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTimestampDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TIMESTAMP_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTxHashAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TX_HASH_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTxHashDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TX_HASH_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationProposalIdAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_PROPOSAL_ID_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationProposalIdDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_PROPOSAL_ID_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationStatusAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_STATUS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationStatusDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_STATUS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationGroupPolicyAddressAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_GROUP_POLICY_ADDRESS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationGroupPolicyAddressDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_GROUP_POLICY_ADDRESS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationMetadataAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_METADATA_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationMetadataDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_METADATA_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationProposersAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_PROPOSERS_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationProposersDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_PROPOSERS_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationSubmitTimeAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_SUBMIT_TIME_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationSubmitTimeDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_SUBMIT_TIME_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationGroupVersionAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_GROUP_VERSION_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationGroupVersionDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_GROUP_VERSION_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationGroupPolicyVersionAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_GROUP_POLICY_VERSION_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationGroupPolicyVersionDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_GROUP_POLICY_VERSION_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationFinalTallyResultAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_FINAL_TALLY_RESULT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationFinalTallyResultDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_FINAL_TALLY_RESULT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationVotingPeriodEndAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_VOTING_PERIOD_END_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationVotingPeriodEndDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_VOTING_PERIOD_END_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationExecutorResultAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_EXECUTOR_RESULT_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationExecutorResultDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_EXECUTOR_RESULT_DESC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationMessagesAsc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_MESSAGES_ASC',
  ProposalsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationMessagesDesc = 'PROPOSALS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_MESSAGES_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeCountAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_COUNT_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeCountDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_COUNT_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTypeAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TYPE_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTypeDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TYPE_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumJurisdictionAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_JURISDICTION_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumJurisdictionDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_JURISDICTION_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumOwnerAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_OWNER_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumOwnerDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_OWNER_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumReasonAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_REASON_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumReasonDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_REASON_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTimestampAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TIMESTAMP_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTimestampDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TIMESTAMP_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumBlockHeightAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_BLOCK_HEIGHT_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumBlockHeightDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_BLOCK_HEIGHT_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumChainNumAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_CHAIN_NUM_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumChainNumDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_CHAIN_NUM_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTxIdxAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TX_IDX_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTxIdxDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TX_IDX_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumMsgIdxAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_MSG_IDX_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumMsgIdxDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_MSG_IDX_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTxHashAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TX_HASH_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTxHashDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TX_HASH_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumAmountAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_AMOUNT_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumAmountDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_AMOUNT_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumBatchDenomAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_BATCH_DENOM_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumBatchDenomDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_BATCH_DENOM_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumBatchDenomsAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_BATCH_DENOMS_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumBatchDenomsDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_BATCH_DENOMS_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTypeAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TYPE_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTypeDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TYPE_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountJurisdictionAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_JURISDICTION_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountJurisdictionDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_JURISDICTION_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountOwnerAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_OWNER_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountOwnerDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_OWNER_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountReasonAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_REASON_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountReasonDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_REASON_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTimestampAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TIMESTAMP_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTimestampDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TIMESTAMP_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountBlockHeightAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_BLOCK_HEIGHT_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountBlockHeightDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_BLOCK_HEIGHT_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountChainNumAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_CHAIN_NUM_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountChainNumDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_CHAIN_NUM_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTxIdxAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TX_IDX_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTxIdxDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TX_IDX_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountMsgIdxAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_MSG_IDX_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountMsgIdxDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_MSG_IDX_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTxHashAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TX_HASH_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTxHashDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TX_HASH_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountAmountAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_AMOUNT_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountAmountDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_AMOUNT_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountBatchDenomAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_BATCH_DENOM_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountBatchDenomDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_BATCH_DENOM_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountBatchDenomsAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_BATCH_DENOMS_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountBatchDenomsDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_BATCH_DENOMS_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTypeAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TYPE_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTypeDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TYPE_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinJurisdictionAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_JURISDICTION_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinJurisdictionDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_JURISDICTION_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinOwnerAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_OWNER_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinOwnerDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_OWNER_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinReasonAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_REASON_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinReasonDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_REASON_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTimestampAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TIMESTAMP_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTimestampDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TIMESTAMP_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinBlockHeightAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_BLOCK_HEIGHT_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinBlockHeightDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_BLOCK_HEIGHT_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinChainNumAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_CHAIN_NUM_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinChainNumDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_CHAIN_NUM_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTxIdxAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TX_IDX_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTxIdxDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TX_IDX_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinMsgIdxAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_MSG_IDX_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinMsgIdxDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_MSG_IDX_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTxHashAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TX_HASH_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTxHashDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TX_HASH_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinAmountAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_AMOUNT_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinAmountDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_AMOUNT_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinBatchDenomAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_BATCH_DENOM_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinBatchDenomDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_BATCH_DENOM_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinBatchDenomsAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_BATCH_DENOMS_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinBatchDenomsDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_BATCH_DENOMS_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTypeAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TYPE_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTypeDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TYPE_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxJurisdictionAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_JURISDICTION_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxJurisdictionDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_JURISDICTION_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxOwnerAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_OWNER_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxOwnerDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_OWNER_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxReasonAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_REASON_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxReasonDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_REASON_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTimestampAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TIMESTAMP_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTimestampDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TIMESTAMP_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxBlockHeightAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_BLOCK_HEIGHT_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxBlockHeightDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_BLOCK_HEIGHT_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxChainNumAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_CHAIN_NUM_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxChainNumDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_CHAIN_NUM_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTxIdxAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TX_IDX_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTxIdxDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TX_IDX_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxMsgIdxAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_MSG_IDX_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxMsgIdxDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_MSG_IDX_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTxHashAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TX_HASH_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTxHashDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TX_HASH_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxAmountAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_AMOUNT_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxAmountDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_AMOUNT_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxBatchDenomAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_BATCH_DENOM_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxBatchDenomDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_BATCH_DENOM_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxBatchDenomsAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_BATCH_DENOMS_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxBatchDenomsDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_BATCH_DENOMS_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTypeAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TYPE_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTypeDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TYPE_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageJurisdictionAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_JURISDICTION_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageJurisdictionDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_JURISDICTION_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageOwnerAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_OWNER_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageOwnerDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_OWNER_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageReasonAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_REASON_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageReasonDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_REASON_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTimestampAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TIMESTAMP_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTimestampDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TIMESTAMP_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageBlockHeightAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_BLOCK_HEIGHT_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageBlockHeightDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_BLOCK_HEIGHT_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageChainNumAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_CHAIN_NUM_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageChainNumDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_CHAIN_NUM_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTxIdxAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TX_IDX_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTxIdxDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TX_IDX_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageMsgIdxAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_MSG_IDX_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageMsgIdxDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_MSG_IDX_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTxHashAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TX_HASH_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTxHashDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TX_HASH_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageAmountAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_AMOUNT_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageAmountDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_AMOUNT_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageBatchDenomAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_BATCH_DENOM_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageBatchDenomDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_BATCH_DENOM_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageBatchDenomsAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_BATCH_DENOMS_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageBatchDenomsDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_BATCH_DENOMS_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTypeAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TYPE_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTypeDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TYPE_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleJurisdictionAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_JURISDICTION_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleJurisdictionDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_JURISDICTION_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleOwnerAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_OWNER_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleOwnerDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_OWNER_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleReasonAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_REASON_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleReasonDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_REASON_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTimestampAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TIMESTAMP_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTimestampDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TIMESTAMP_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleBlockHeightAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_BLOCK_HEIGHT_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleBlockHeightDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_BLOCK_HEIGHT_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleChainNumAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_CHAIN_NUM_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleChainNumDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_CHAIN_NUM_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTxIdxAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TX_IDX_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTxIdxDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TX_IDX_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleMsgIdxAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_MSG_IDX_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleMsgIdxDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_MSG_IDX_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTxHashAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TX_HASH_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTxHashDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TX_HASH_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleAmountAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_AMOUNT_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleAmountDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_AMOUNT_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleBatchDenomAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_BATCH_DENOM_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleBatchDenomDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_BATCH_DENOM_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleBatchDenomsAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_BATCH_DENOMS_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleBatchDenomsDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_BATCH_DENOMS_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTypeAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TYPE_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTypeDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TYPE_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationJurisdictionAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_JURISDICTION_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationJurisdictionDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_JURISDICTION_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationOwnerAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_OWNER_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationOwnerDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_OWNER_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationReasonAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_REASON_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationReasonDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_REASON_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTimestampAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TIMESTAMP_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTimestampDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TIMESTAMP_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationBlockHeightAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_BLOCK_HEIGHT_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationBlockHeightDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_BLOCK_HEIGHT_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationChainNumAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_CHAIN_NUM_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationChainNumDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_CHAIN_NUM_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTxIdxAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TX_IDX_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTxIdxDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TX_IDX_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationMsgIdxAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_MSG_IDX_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationMsgIdxDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_MSG_IDX_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTxHashAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TX_HASH_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTxHashDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TX_HASH_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationAmountAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_AMOUNT_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationAmountDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_AMOUNT_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationBatchDenomAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_BATCH_DENOM_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationBatchDenomDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_BATCH_DENOM_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationBatchDenomsAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_BATCH_DENOMS_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationBatchDenomsDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_BATCH_DENOMS_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTypeAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TYPE_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTypeDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TYPE_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleJurisdictionAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_JURISDICTION_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleJurisdictionDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_JURISDICTION_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleOwnerAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_OWNER_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleOwnerDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_OWNER_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleReasonAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_REASON_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleReasonDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_REASON_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTimestampAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TIMESTAMP_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTimestampDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TIMESTAMP_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleBlockHeightAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_BLOCK_HEIGHT_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleBlockHeightDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_BLOCK_HEIGHT_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleChainNumAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_CHAIN_NUM_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleChainNumDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_CHAIN_NUM_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTxIdxAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TX_IDX_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTxIdxDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TX_IDX_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleMsgIdxAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_MSG_IDX_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleMsgIdxDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_MSG_IDX_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTxHashAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TX_HASH_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTxHashDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TX_HASH_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleAmountAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_AMOUNT_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleAmountDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_AMOUNT_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleBatchDenomAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_BATCH_DENOM_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleBatchDenomDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_BATCH_DENOM_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleBatchDenomsAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_BATCH_DENOMS_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleBatchDenomsDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_BATCH_DENOMS_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTypeAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TYPE_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTypeDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TYPE_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationJurisdictionAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_JURISDICTION_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationJurisdictionDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_JURISDICTION_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationOwnerAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_OWNER_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationOwnerDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_OWNER_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationReasonAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_REASON_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationReasonDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_REASON_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTimestampAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TIMESTAMP_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTimestampDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TIMESTAMP_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationBlockHeightAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_BLOCK_HEIGHT_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationBlockHeightDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_BLOCK_HEIGHT_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationChainNumAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_CHAIN_NUM_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationChainNumDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_CHAIN_NUM_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTxIdxAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TX_IDX_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTxIdxDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TX_IDX_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationMsgIdxAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_MSG_IDX_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationMsgIdxDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_MSG_IDX_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTxHashAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TX_HASH_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTxHashDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TX_HASH_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationAmountAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_AMOUNT_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationAmountDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_AMOUNT_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationBatchDenomAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_BATCH_DENOM_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationBatchDenomDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_BATCH_DENOM_DESC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationBatchDenomsAsc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_BATCH_DENOMS_ASC',
  RetirementsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationBatchDenomsDesc = 'RETIREMENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_BATCH_DENOMS_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeCountAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_COUNT_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeCountDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_COUNT_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTypeAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TYPE_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTypeDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TYPE_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumBlockHeightAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_BLOCK_HEIGHT_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumBlockHeightDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_BLOCK_HEIGHT_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTxIdxAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TX_IDX_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTxIdxDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TX_IDX_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumMsgIdxAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_MSG_IDX_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumMsgIdxDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_MSG_IDX_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumChainNumAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_CHAIN_NUM_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumChainNumDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_CHAIN_NUM_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTimestampAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TIMESTAMP_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTimestampDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TIMESTAMP_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTxHashAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TX_HASH_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumTxHashDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_TX_HASH_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumProposalIdAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_PROPOSAL_ID_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumProposalIdDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_PROPOSAL_ID_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumVoterAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_VOTER_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumVoterDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_VOTER_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumOptionAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_OPTION_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumOptionDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_OPTION_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumMetadataAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_METADATA_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumMetadataDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_METADATA_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumSubmitTimeAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_SUBMIT_TIME_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeSumSubmitTimeDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_SUM_SUBMIT_TIME_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTypeAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TYPE_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTypeDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TYPE_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountBlockHeightAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_BLOCK_HEIGHT_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountBlockHeightDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_BLOCK_HEIGHT_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTxIdxAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TX_IDX_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTxIdxDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TX_IDX_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountMsgIdxAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_MSG_IDX_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountMsgIdxDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_MSG_IDX_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountChainNumAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_CHAIN_NUM_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountChainNumDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_CHAIN_NUM_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTimestampAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TIMESTAMP_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTimestampDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TIMESTAMP_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTxHashAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TX_HASH_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountTxHashDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_TX_HASH_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountProposalIdAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_PROPOSAL_ID_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountProposalIdDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_PROPOSAL_ID_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountVoterAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_VOTER_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountVoterDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_VOTER_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountOptionAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_OPTION_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountOptionDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_OPTION_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountMetadataAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_METADATA_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountMetadataDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_METADATA_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountSubmitTimeAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_SUBMIT_TIME_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeDistinctCountSubmitTimeDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_DISTINCT_COUNT_SUBMIT_TIME_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTypeAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TYPE_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTypeDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TYPE_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinBlockHeightAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_BLOCK_HEIGHT_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinBlockHeightDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_BLOCK_HEIGHT_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTxIdxAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TX_IDX_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTxIdxDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TX_IDX_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinMsgIdxAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_MSG_IDX_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinMsgIdxDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_MSG_IDX_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinChainNumAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_CHAIN_NUM_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinChainNumDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_CHAIN_NUM_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTimestampAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TIMESTAMP_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTimestampDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TIMESTAMP_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTxHashAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TX_HASH_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinTxHashDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_TX_HASH_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinProposalIdAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_PROPOSAL_ID_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinProposalIdDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_PROPOSAL_ID_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinVoterAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_VOTER_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinVoterDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_VOTER_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinOptionAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_OPTION_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinOptionDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_OPTION_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinMetadataAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_METADATA_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinMetadataDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_METADATA_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinSubmitTimeAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_SUBMIT_TIME_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMinSubmitTimeDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MIN_SUBMIT_TIME_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTypeAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TYPE_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTypeDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TYPE_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxBlockHeightAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_BLOCK_HEIGHT_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxBlockHeightDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_BLOCK_HEIGHT_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTxIdxAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TX_IDX_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTxIdxDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TX_IDX_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxMsgIdxAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_MSG_IDX_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxMsgIdxDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_MSG_IDX_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxChainNumAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_CHAIN_NUM_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxChainNumDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_CHAIN_NUM_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTimestampAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TIMESTAMP_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTimestampDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TIMESTAMP_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTxHashAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TX_HASH_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxTxHashDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_TX_HASH_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxProposalIdAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_PROPOSAL_ID_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxProposalIdDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_PROPOSAL_ID_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxVoterAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_VOTER_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxVoterDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_VOTER_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxOptionAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_OPTION_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxOptionDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_OPTION_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxMetadataAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_METADATA_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxMetadataDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_METADATA_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxSubmitTimeAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_SUBMIT_TIME_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeMaxSubmitTimeDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_MAX_SUBMIT_TIME_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTypeAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TYPE_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTypeDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TYPE_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageBlockHeightAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_BLOCK_HEIGHT_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageBlockHeightDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_BLOCK_HEIGHT_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTxIdxAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TX_IDX_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTxIdxDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TX_IDX_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageMsgIdxAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_MSG_IDX_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageMsgIdxDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_MSG_IDX_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageChainNumAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_CHAIN_NUM_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageChainNumDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_CHAIN_NUM_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTimestampAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TIMESTAMP_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTimestampDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TIMESTAMP_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTxHashAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TX_HASH_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageTxHashDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_TX_HASH_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageProposalIdAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_PROPOSAL_ID_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageProposalIdDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_PROPOSAL_ID_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageVoterAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_VOTER_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageVoterDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_VOTER_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageOptionAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_OPTION_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageOptionDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_OPTION_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageMetadataAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_METADATA_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageMetadataDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_METADATA_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageSubmitTimeAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_SUBMIT_TIME_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeAverageSubmitTimeDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_AVERAGE_SUBMIT_TIME_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTypeAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TYPE_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTypeDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TYPE_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleBlockHeightAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_BLOCK_HEIGHT_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleBlockHeightDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_BLOCK_HEIGHT_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTxIdxAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TX_IDX_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTxIdxDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TX_IDX_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleMsgIdxAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_MSG_IDX_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleMsgIdxDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_MSG_IDX_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleChainNumAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_CHAIN_NUM_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleChainNumDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_CHAIN_NUM_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTimestampAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TIMESTAMP_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTimestampDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TIMESTAMP_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTxHashAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TX_HASH_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleTxHashDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_TX_HASH_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleProposalIdAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_PROPOSAL_ID_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleProposalIdDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_PROPOSAL_ID_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleVoterAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_VOTER_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleVoterDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_VOTER_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleOptionAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_OPTION_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleOptionDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_OPTION_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleMetadataAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_METADATA_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleMetadataDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_METADATA_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleSubmitTimeAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_SUBMIT_TIME_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevSampleSubmitTimeDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_SAMPLE_SUBMIT_TIME_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTypeAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TYPE_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTypeDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TYPE_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationBlockHeightAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_BLOCK_HEIGHT_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationBlockHeightDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_BLOCK_HEIGHT_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTxIdxAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TX_IDX_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTxIdxDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TX_IDX_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationMsgIdxAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_MSG_IDX_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationMsgIdxDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_MSG_IDX_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationChainNumAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_CHAIN_NUM_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationChainNumDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_CHAIN_NUM_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTimestampAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TIMESTAMP_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTimestampDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TIMESTAMP_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTxHashAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TX_HASH_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationTxHashDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_TX_HASH_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationProposalIdAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_PROPOSAL_ID_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationProposalIdDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_PROPOSAL_ID_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationVoterAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_VOTER_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationVoterDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_VOTER_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationOptionAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_OPTION_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationOptionDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_OPTION_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationMetadataAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_METADATA_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationMetadataDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_METADATA_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationSubmitTimeAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_SUBMIT_TIME_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeStddevPopulationSubmitTimeDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_STDDEV_POPULATION_SUBMIT_TIME_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTypeAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TYPE_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTypeDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TYPE_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleBlockHeightAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_BLOCK_HEIGHT_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleBlockHeightDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_BLOCK_HEIGHT_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTxIdxAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TX_IDX_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTxIdxDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TX_IDX_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleMsgIdxAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_MSG_IDX_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleMsgIdxDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_MSG_IDX_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleChainNumAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_CHAIN_NUM_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleChainNumDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_CHAIN_NUM_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTimestampAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TIMESTAMP_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTimestampDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TIMESTAMP_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTxHashAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TX_HASH_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleTxHashDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_TX_HASH_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleProposalIdAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_PROPOSAL_ID_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleProposalIdDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_PROPOSAL_ID_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleVoterAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_VOTER_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleVoterDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_VOTER_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleOptionAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_OPTION_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleOptionDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_OPTION_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleMetadataAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_METADATA_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleMetadataDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_METADATA_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleSubmitTimeAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_SUBMIT_TIME_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVarianceSampleSubmitTimeDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_SAMPLE_SUBMIT_TIME_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTypeAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TYPE_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTypeDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TYPE_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationBlockHeightAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_BLOCK_HEIGHT_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationBlockHeightDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_BLOCK_HEIGHT_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTxIdxAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TX_IDX_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTxIdxDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TX_IDX_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationMsgIdxAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_MSG_IDX_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationMsgIdxDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_MSG_IDX_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationChainNumAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_CHAIN_NUM_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationChainNumDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_CHAIN_NUM_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTimestampAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TIMESTAMP_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTimestampDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TIMESTAMP_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTxHashAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TX_HASH_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationTxHashDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_TX_HASH_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationProposalIdAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_PROPOSAL_ID_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationProposalIdDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_PROPOSAL_ID_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationVoterAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_VOTER_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationVoterDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_VOTER_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationOptionAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_OPTION_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationOptionDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_OPTION_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationMetadataAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_METADATA_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationMetadataDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_METADATA_DESC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationSubmitTimeAsc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_SUBMIT_TIME_ASC',
  VotesByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndTypeVariancePopulationSubmitTimeDesc = 'VOTES_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AND_TYPE_VARIANCE_POPULATION_SUBMIT_TIME_DESC'
}

/** A filter to be used against `Msg` object types. All fields are combined with a logical ‘and.’ */
export type MsgFilter = {
  /** Filter by the object’s `chainNum` field. */
  chainNum?: Maybe<IntFilter>;
  /** Filter by the object’s `blockHeight` field. */
  blockHeight?: Maybe<BigIntFilter>;
  /** Filter by the object’s `txIdx` field. */
  txIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `msgIdx` field. */
  msgIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `data` field. */
  data?: Maybe<JsonFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<MsgFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<MsgFilter>>;
  /** Negates the expression. */
  not?: Maybe<MsgFilter>;
};

/** Grouping methods for `Msg` for usage during aggregation. */
export enum MsgGroupBy {
  ChainNum = 'CHAIN_NUM',
  BlockHeight = 'BLOCK_HEIGHT',
  TxIdx = 'TX_IDX',
  MsgIdx = 'MSG_IDX',
  Data = 'DATA'
}

export type MsgHavingAverageInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type MsgHavingDistinctCountInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

/** Conditions for `Msg` aggregates. */
export type MsgHavingInput = {
  AND?: Maybe<Array<MsgHavingInput>>;
  OR?: Maybe<Array<MsgHavingInput>>;
  sum?: Maybe<MsgHavingSumInput>;
  distinctCount?: Maybe<MsgHavingDistinctCountInput>;
  min?: Maybe<MsgHavingMinInput>;
  max?: Maybe<MsgHavingMaxInput>;
  average?: Maybe<MsgHavingAverageInput>;
  stddevSample?: Maybe<MsgHavingStddevSampleInput>;
  stddevPopulation?: Maybe<MsgHavingStddevPopulationInput>;
  varianceSample?: Maybe<MsgHavingVarianceSampleInput>;
  variancePopulation?: Maybe<MsgHavingVariancePopulationInput>;
};

export type MsgHavingMaxInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type MsgHavingMinInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type MsgHavingStddevPopulationInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type MsgHavingStddevSampleInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type MsgHavingSumInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type MsgHavingVariancePopulationInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type MsgHavingVarianceSampleInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

/** An input for mutations affecting `Msg` */
export type MsgInput = {
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  data: Scalars['JSON'];
};

export type MsgMaxAggregates = {
  __typename?: 'MsgMaxAggregates';
  /** Maximum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Maximum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Maximum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
  /** Maximum of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['Int']>;
};

export type MsgMinAggregates = {
  __typename?: 'MsgMinAggregates';
  /** Minimum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Minimum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Minimum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
  /** Minimum of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['Int']>;
};

/** Represents an update to a `Msg`. Fields that are set will be updated. */
export type MsgPatch = {
  chainNum?: Maybe<Scalars['Int']>;
  blockHeight?: Maybe<Scalars['BigInt']>;
  txIdx?: Maybe<Scalars['Int']>;
  msgIdx?: Maybe<Scalars['Int']>;
  data?: Maybe<Scalars['JSON']>;
};

export type MsgStddevPopulationAggregates = {
  __typename?: 'MsgStddevPopulationAggregates';
  /** Population standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type MsgStddevSampleAggregates = {
  __typename?: 'MsgStddevSampleAggregates';
  /** Sample standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type MsgSumAggregates = {
  __typename?: 'MsgSumAggregates';
  /** Sum of chainNum across the matching connection */
  chainNum: Scalars['BigInt'];
  /** Sum of blockHeight across the matching connection */
  blockHeight: Scalars['BigFloat'];
  /** Sum of txIdx across the matching connection */
  txIdx: Scalars['BigInt'];
  /** Sum of msgIdx across the matching connection */
  msgIdx: Scalars['BigInt'];
};

export type MsgVariancePopulationAggregates = {
  __typename?: 'MsgVariancePopulationAggregates';
  /** Population variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Population variance of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type MsgVarianceSampleAggregates = {
  __typename?: 'MsgVarianceSampleAggregates';
  /** Sample variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
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
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<MsgAggregates>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<MsgAggregates>>;
};


/** A connection to a list of `Msg` values. */
export type MsgsConnectionGroupedAggregatesArgs = {
  groupBy: Array<MsgGroupBy>;
  having?: Maybe<MsgHavingInput>;
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
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxCountAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_COUNT_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxCountDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_COUNT_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumChainNumAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_CHAIN_NUM_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumChainNumDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_CHAIN_NUM_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumBlockHeightAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_BLOCK_HEIGHT_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumBlockHeightDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_BLOCK_HEIGHT_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumTxIdxAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_TX_IDX_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumTxIdxDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_TX_IDX_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumMsgIdxAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_MSG_IDX_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumMsgIdxDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_MSG_IDX_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumTypeAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_TYPE_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumTypeDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_TYPE_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumKeyAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_KEY_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumKeyDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_KEY_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumValueAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_VALUE_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumValueDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_VALUE_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumValueHashAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_VALUE_HASH_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumValueHashDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_VALUE_HASH_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountChainNumAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_CHAIN_NUM_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountChainNumDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_CHAIN_NUM_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountBlockHeightAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_BLOCK_HEIGHT_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountBlockHeightDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_BLOCK_HEIGHT_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountTxIdxAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_TX_IDX_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountTxIdxDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_TX_IDX_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountMsgIdxAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_MSG_IDX_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountMsgIdxDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_MSG_IDX_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountTypeAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_TYPE_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountTypeDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_TYPE_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountKeyAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_KEY_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountKeyDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_KEY_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountValueAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_VALUE_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountValueDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_VALUE_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountValueHashAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_VALUE_HASH_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountValueHashDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_VALUE_HASH_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinChainNumAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_CHAIN_NUM_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinChainNumDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_CHAIN_NUM_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinBlockHeightAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_BLOCK_HEIGHT_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinBlockHeightDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_BLOCK_HEIGHT_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinTxIdxAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_TX_IDX_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinTxIdxDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_TX_IDX_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinMsgIdxAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_MSG_IDX_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinMsgIdxDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_MSG_IDX_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinTypeAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_TYPE_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinTypeDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_TYPE_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinKeyAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_KEY_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinKeyDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_KEY_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinValueAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_VALUE_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinValueDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_VALUE_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinValueHashAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_VALUE_HASH_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinValueHashDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_VALUE_HASH_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxChainNumAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_CHAIN_NUM_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxChainNumDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_CHAIN_NUM_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxBlockHeightAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_BLOCK_HEIGHT_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxBlockHeightDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_BLOCK_HEIGHT_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxTxIdxAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_TX_IDX_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxTxIdxDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_TX_IDX_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxMsgIdxAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_MSG_IDX_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxMsgIdxDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_MSG_IDX_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxTypeAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_TYPE_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxTypeDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_TYPE_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxKeyAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_KEY_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxKeyDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_KEY_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxValueAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_VALUE_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxValueDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_VALUE_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxValueHashAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_VALUE_HASH_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxValueHashDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_VALUE_HASH_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageChainNumAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_CHAIN_NUM_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageChainNumDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_CHAIN_NUM_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageBlockHeightAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_BLOCK_HEIGHT_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageBlockHeightDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_BLOCK_HEIGHT_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageTxIdxAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_TX_IDX_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageTxIdxDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_TX_IDX_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageMsgIdxAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_MSG_IDX_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageMsgIdxDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_MSG_IDX_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageTypeAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_TYPE_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageTypeDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_TYPE_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageKeyAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_KEY_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageKeyDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_KEY_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageValueAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_VALUE_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageValueDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_VALUE_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageValueHashAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_VALUE_HASH_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageValueHashDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_VALUE_HASH_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleChainNumAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_CHAIN_NUM_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleChainNumDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_CHAIN_NUM_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleBlockHeightAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_BLOCK_HEIGHT_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleBlockHeightDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_BLOCK_HEIGHT_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleTxIdxAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_TX_IDX_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleTxIdxDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_TX_IDX_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleMsgIdxAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_MSG_IDX_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleMsgIdxDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_MSG_IDX_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleTypeAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_TYPE_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleTypeDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_TYPE_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleKeyAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_KEY_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleKeyDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_KEY_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleValueAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_VALUE_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleValueDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_VALUE_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleValueHashAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_VALUE_HASH_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleValueHashDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_VALUE_HASH_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationChainNumAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_CHAIN_NUM_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationChainNumDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_CHAIN_NUM_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationBlockHeightAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_BLOCK_HEIGHT_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationBlockHeightDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_BLOCK_HEIGHT_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationTxIdxAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_TX_IDX_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationTxIdxDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_TX_IDX_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationMsgIdxAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_MSG_IDX_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationMsgIdxDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_MSG_IDX_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationTypeAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_TYPE_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationTypeDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_TYPE_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationKeyAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_KEY_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationKeyDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_KEY_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationValueAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_VALUE_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationValueDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_VALUE_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationValueHashAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_VALUE_HASH_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationValueHashDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_VALUE_HASH_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleChainNumAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_CHAIN_NUM_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleChainNumDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_CHAIN_NUM_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleBlockHeightAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_BLOCK_HEIGHT_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleBlockHeightDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_BLOCK_HEIGHT_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleTxIdxAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_TX_IDX_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleTxIdxDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_TX_IDX_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleMsgIdxAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_MSG_IDX_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleMsgIdxDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_MSG_IDX_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleTypeAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_TYPE_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleTypeDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_TYPE_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleKeyAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_KEY_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleKeyDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_KEY_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleValueAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_VALUE_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleValueDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_VALUE_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleValueHashAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_VALUE_HASH_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleValueHashDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_VALUE_HASH_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationChainNumAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_CHAIN_NUM_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationChainNumDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_CHAIN_NUM_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationBlockHeightAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_BLOCK_HEIGHT_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationBlockHeightDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_BLOCK_HEIGHT_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationTxIdxAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_TX_IDX_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationTxIdxDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_TX_IDX_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationMsgIdxAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_MSG_IDX_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationMsgIdxDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_MSG_IDX_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationTypeAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_TYPE_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationTypeDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_TYPE_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationKeyAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_KEY_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationKeyDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_KEY_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationValueAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_VALUE_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationValueDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_VALUE_DESC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationValueHashAsc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_VALUE_HASH_ASC',
  MsgEventAttrsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationValueHashDesc = 'MSG_EVENT_ATTRS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_VALUE_HASH_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxCountAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_COUNT_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxCountDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_COUNT_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumChainNumAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_CHAIN_NUM_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumChainNumDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_CHAIN_NUM_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumBlockHeightAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_BLOCK_HEIGHT_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumBlockHeightDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_BLOCK_HEIGHT_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumTxIdxAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_TX_IDX_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumTxIdxDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_TX_IDX_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumMsgIdxAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_MSG_IDX_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumMsgIdxDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_MSG_IDX_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumTypeAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_TYPE_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxSumTypeDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_SUM_TYPE_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountChainNumAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_CHAIN_NUM_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountChainNumDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_CHAIN_NUM_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountBlockHeightAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_BLOCK_HEIGHT_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountBlockHeightDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_BLOCK_HEIGHT_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountTxIdxAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_TX_IDX_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountTxIdxDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_TX_IDX_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountMsgIdxAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_MSG_IDX_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountMsgIdxDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_MSG_IDX_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountTypeAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_TYPE_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxDistinctCountTypeDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_DISTINCT_COUNT_TYPE_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinChainNumAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_CHAIN_NUM_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinChainNumDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_CHAIN_NUM_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinBlockHeightAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_BLOCK_HEIGHT_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinBlockHeightDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_BLOCK_HEIGHT_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinTxIdxAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_TX_IDX_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinTxIdxDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_TX_IDX_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinMsgIdxAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_MSG_IDX_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinMsgIdxDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_MSG_IDX_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinTypeAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_TYPE_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMinTypeDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MIN_TYPE_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxChainNumAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_CHAIN_NUM_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxChainNumDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_CHAIN_NUM_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxBlockHeightAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_BLOCK_HEIGHT_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxBlockHeightDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_BLOCK_HEIGHT_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxTxIdxAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_TX_IDX_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxTxIdxDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_TX_IDX_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxMsgIdxAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_MSG_IDX_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxMsgIdxDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_MSG_IDX_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxTypeAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_TYPE_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxMaxTypeDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_MAX_TYPE_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageChainNumAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_CHAIN_NUM_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageChainNumDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_CHAIN_NUM_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageBlockHeightAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_BLOCK_HEIGHT_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageBlockHeightDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_BLOCK_HEIGHT_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageTxIdxAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_TX_IDX_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageTxIdxDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_TX_IDX_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageMsgIdxAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_MSG_IDX_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageMsgIdxDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_MSG_IDX_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageTypeAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_TYPE_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxAverageTypeDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_AVERAGE_TYPE_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleChainNumAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_CHAIN_NUM_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleChainNumDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_CHAIN_NUM_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleBlockHeightAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_BLOCK_HEIGHT_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleBlockHeightDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_BLOCK_HEIGHT_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleTxIdxAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_TX_IDX_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleTxIdxDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_TX_IDX_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleMsgIdxAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_MSG_IDX_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleMsgIdxDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_MSG_IDX_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleTypeAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_TYPE_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevSampleTypeDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_SAMPLE_TYPE_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationChainNumAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_CHAIN_NUM_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationChainNumDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_CHAIN_NUM_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationBlockHeightAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_BLOCK_HEIGHT_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationBlockHeightDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_BLOCK_HEIGHT_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationTxIdxAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_TX_IDX_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationTxIdxDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_TX_IDX_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationMsgIdxAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_MSG_IDX_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationMsgIdxDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_MSG_IDX_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationTypeAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_TYPE_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxStddevPopulationTypeDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_STDDEV_POPULATION_TYPE_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleChainNumAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_CHAIN_NUM_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleChainNumDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_CHAIN_NUM_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleBlockHeightAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_BLOCK_HEIGHT_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleBlockHeightDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_BLOCK_HEIGHT_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleTxIdxAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_TX_IDX_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleTxIdxDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_TX_IDX_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleMsgIdxAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_MSG_IDX_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleMsgIdxDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_MSG_IDX_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleTypeAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_TYPE_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVarianceSampleTypeDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_SAMPLE_TYPE_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationChainNumAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_CHAIN_NUM_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationChainNumDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_CHAIN_NUM_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationBlockHeightAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_BLOCK_HEIGHT_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationBlockHeightDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_BLOCK_HEIGHT_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationTxIdxAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_TX_IDX_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationTxIdxDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_TX_IDX_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationMsgIdxAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_MSG_IDX_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationMsgIdxDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_MSG_IDX_DESC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationTypeAsc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_TYPE_ASC',
  MsgEventsByChainNumAndBlockHeightAndTxIdxAndMsgIdxVariancePopulationTypeDesc = 'MSG_EVENTS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AND_MSG_IDX_VARIANCE_POPULATION_TYPE_DESC'
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
  /** Creates a single `Order`. */
  createOrder?: Maybe<CreateOrderPayload>;
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
  /** Updates a single `Order` using its globally unique id and a patch. */
  updateOrder?: Maybe<UpdateOrderPayload>;
  /** Updates a single `Order` using a unique key and a patch. */
  updateOrderByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndProjectIdAndAskDenom?: Maybe<UpdateOrderPayload>;
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
  /** Deletes a single `Order` using its globally unique id. */
  deleteOrder?: Maybe<DeleteOrderPayload>;
  /** Deletes a single `Order` using a unique key. */
  deleteOrderByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndProjectIdAndAskDenom?: Maybe<DeleteOrderPayload>;
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
export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
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
export type MutationUpdateOrderArgs = {
  input: UpdateOrderInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrderByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndProjectIdAndAskDenomArgs = {
  input: UpdateOrderByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndProjectIdAndAskDenomInput;
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
export type MutationDeleteOrderArgs = {
  input: DeleteOrderInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrderByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndProjectIdAndAskDenomArgs = {
  input: DeleteOrderByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndProjectIdAndAskDenomInput;
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

export type Order = Node & {
  __typename?: 'Order';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  timestamp?: Maybe<Scalars['Datetime']>;
  type: Scalars['String'];
  creditsAmount: Scalars['String'];
  projectId: Scalars['String'];
  buyerAddress: Scalars['String'];
  totalPrice: Scalars['String'];
  askDenom: Scalars['String'];
  retiredCredits: Scalars['Boolean'];
  retirementReason?: Maybe<Scalars['String']>;
  retirementJurisdiction?: Maybe<Scalars['String']>;
  blockHeight: Scalars['BigInt'];
  chainNum: Scalars['Int'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  txHash: Scalars['String'];
};

export type OrderAggregates = {
  __typename?: 'OrderAggregates';
  keys?: Maybe<Array<Scalars['String']>>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<OrderSumAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<OrderDistinctCountAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<OrderMinAggregates>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<OrderMaxAggregates>;
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<OrderAverageAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<OrderStddevSampleAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<OrderStddevPopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<OrderVarianceSampleAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<OrderVariancePopulationAggregates>;
};

export type OrderAverageAggregates = {
  __typename?: 'OrderAverageAggregates';
  /** Mean average of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Mean average of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Mean average of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Mean average of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

/** A condition to be used against `Order` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type OrderCondition = {
  /** Checks for equality with the object’s `timestamp` field. */
  timestamp?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `type` field. */
  type?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `creditsAmount` field. */
  creditsAmount?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `buyerAddress` field. */
  buyerAddress?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `totalPrice` field. */
  totalPrice?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `askDenom` field. */
  askDenom?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `retiredCredits` field. */
  retiredCredits?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `retirementReason` field. */
  retirementReason?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `retirementJurisdiction` field. */
  retirementJurisdiction?: Maybe<Scalars['String']>;
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

export type OrderDistinctCountAggregates = {
  __typename?: 'OrderDistinctCountAggregates';
  /** Distinct count of timestamp across the matching connection */
  timestamp?: Maybe<Scalars['BigInt']>;
  /** Distinct count of type across the matching connection */
  type?: Maybe<Scalars['BigInt']>;
  /** Distinct count of creditsAmount across the matching connection */
  creditsAmount?: Maybe<Scalars['BigInt']>;
  /** Distinct count of projectId across the matching connection */
  projectId?: Maybe<Scalars['BigInt']>;
  /** Distinct count of buyerAddress across the matching connection */
  buyerAddress?: Maybe<Scalars['BigInt']>;
  /** Distinct count of totalPrice across the matching connection */
  totalPrice?: Maybe<Scalars['BigInt']>;
  /** Distinct count of askDenom across the matching connection */
  askDenom?: Maybe<Scalars['BigInt']>;
  /** Distinct count of retiredCredits across the matching connection */
  retiredCredits?: Maybe<Scalars['BigInt']>;
  /** Distinct count of retirementReason across the matching connection */
  retirementReason?: Maybe<Scalars['BigInt']>;
  /** Distinct count of retirementJurisdiction across the matching connection */
  retirementJurisdiction?: Maybe<Scalars['BigInt']>;
  /** Distinct count of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Distinct count of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigInt']>;
  /** Distinct count of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of txHash across the matching connection */
  txHash?: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `Order` object types. All fields are combined with a logical ‘and.’ */
export type OrderFilter = {
  /** Filter by the object’s `timestamp` field. */
  timestamp?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `type` field. */
  type?: Maybe<StringFilter>;
  /** Filter by the object’s `creditsAmount` field. */
  creditsAmount?: Maybe<StringFilter>;
  /** Filter by the object’s `projectId` field. */
  projectId?: Maybe<StringFilter>;
  /** Filter by the object’s `buyerAddress` field. */
  buyerAddress?: Maybe<StringFilter>;
  /** Filter by the object’s `totalPrice` field. */
  totalPrice?: Maybe<StringFilter>;
  /** Filter by the object’s `askDenom` field. */
  askDenom?: Maybe<StringFilter>;
  /** Filter by the object’s `retiredCredits` field. */
  retiredCredits?: Maybe<BooleanFilter>;
  /** Filter by the object’s `retirementReason` field. */
  retirementReason?: Maybe<StringFilter>;
  /** Filter by the object’s `retirementJurisdiction` field. */
  retirementJurisdiction?: Maybe<StringFilter>;
  /** Filter by the object’s `blockHeight` field. */
  blockHeight?: Maybe<BigIntFilter>;
  /** Filter by the object’s `chainNum` field. */
  chainNum?: Maybe<IntFilter>;
  /** Filter by the object’s `txIdx` field. */
  txIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `msgIdx` field. */
  msgIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `txHash` field. */
  txHash?: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<OrderFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<OrderFilter>>;
  /** Negates the expression. */
  not?: Maybe<OrderFilter>;
};

/** An input for mutations affecting `Order` */
export type OrderInput = {
  timestamp?: Maybe<Scalars['Datetime']>;
  type: Scalars['String'];
  creditsAmount: Scalars['String'];
  projectId: Scalars['String'];
  buyerAddress: Scalars['String'];
  totalPrice: Scalars['String'];
  askDenom: Scalars['String'];
  retiredCredits: Scalars['Boolean'];
  retirementReason?: Maybe<Scalars['String']>;
  retirementJurisdiction?: Maybe<Scalars['String']>;
  blockHeight: Scalars['BigInt'];
  chainNum: Scalars['Int'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  txHash: Scalars['String'];
};

export type OrderMaxAggregates = {
  __typename?: 'OrderMaxAggregates';
  /** Maximum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Maximum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Maximum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
  /** Maximum of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['Int']>;
};

export type OrderMinAggregates = {
  __typename?: 'OrderMinAggregates';
  /** Minimum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Minimum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Minimum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
  /** Minimum of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['Int']>;
};

/** Represents an update to a `Order`. Fields that are set will be updated. */
export type OrderPatch = {
  timestamp?: Maybe<Scalars['Datetime']>;
  type?: Maybe<Scalars['String']>;
  creditsAmount?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['String']>;
  buyerAddress?: Maybe<Scalars['String']>;
  totalPrice?: Maybe<Scalars['String']>;
  askDenom?: Maybe<Scalars['String']>;
  retiredCredits?: Maybe<Scalars['Boolean']>;
  retirementReason?: Maybe<Scalars['String']>;
  retirementJurisdiction?: Maybe<Scalars['String']>;
  blockHeight?: Maybe<Scalars['BigInt']>;
  chainNum?: Maybe<Scalars['Int']>;
  txIdx?: Maybe<Scalars['Int']>;
  msgIdx?: Maybe<Scalars['Int']>;
  txHash?: Maybe<Scalars['String']>;
};

export type OrderStddevPopulationAggregates = {
  __typename?: 'OrderStddevPopulationAggregates';
  /** Population standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type OrderStddevSampleAggregates = {
  __typename?: 'OrderStddevSampleAggregates';
  /** Sample standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type OrderSumAggregates = {
  __typename?: 'OrderSumAggregates';
  /** Sum of blockHeight across the matching connection */
  blockHeight: Scalars['BigFloat'];
  /** Sum of chainNum across the matching connection */
  chainNum: Scalars['BigInt'];
  /** Sum of txIdx across the matching connection */
  txIdx: Scalars['BigInt'];
  /** Sum of msgIdx across the matching connection */
  msgIdx: Scalars['BigInt'];
};

export type OrderVariancePopulationAggregates = {
  __typename?: 'OrderVariancePopulationAggregates';
  /** Population variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Population variance of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type OrderVarianceSampleAggregates = {
  __typename?: 'OrderVarianceSampleAggregates';
  /** Sample variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

/** A connection to a list of `Order` values. */
export type OrdersConnection = {
  __typename?: 'OrdersConnection';
  /** A list of `Order` objects. */
  nodes: Array<Maybe<Order>>;
  /** A list of edges which contains the `Order` and cursor to aid in pagination. */
  edges: Array<OrdersEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Order` you could get from the connection. */
  totalCount: Scalars['Int'];
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<OrderAggregates>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<OrderAggregates>>;
};


/** A connection to a list of `Order` values. */
export type OrdersConnectionGroupedAggregatesArgs = {
  groupBy: Array<OrdersGroupBy>;
  having?: Maybe<OrdersHavingInput>;
};

/** A `Order` edge in the connection. */
export type OrdersEdge = {
  __typename?: 'OrdersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Order` at the end of the edge. */
  node?: Maybe<Order>;
};

/** Grouping methods for `Order` for usage during aggregation. */
export enum OrdersGroupBy {
  Timestamp = 'TIMESTAMP',
  TimestampTruncatedToHour = 'TIMESTAMP_TRUNCATED_TO_HOUR',
  TimestampTruncatedToDay = 'TIMESTAMP_TRUNCATED_TO_DAY',
  Type = 'TYPE',
  CreditsAmount = 'CREDITS_AMOUNT',
  ProjectId = 'PROJECT_ID',
  BuyerAddress = 'BUYER_ADDRESS',
  TotalPrice = 'TOTAL_PRICE',
  AskDenom = 'ASK_DENOM',
  RetiredCredits = 'RETIRED_CREDITS',
  RetirementReason = 'RETIREMENT_REASON',
  RetirementJurisdiction = 'RETIREMENT_JURISDICTION',
  BlockHeight = 'BLOCK_HEIGHT',
  ChainNum = 'CHAIN_NUM',
  TxIdx = 'TX_IDX',
  MsgIdx = 'MSG_IDX',
  TxHash = 'TX_HASH'
}

export type OrdersHavingAverageInput = {
  timestamp?: Maybe<HavingDatetimeFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type OrdersHavingDistinctCountInput = {
  timestamp?: Maybe<HavingDatetimeFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

/** Conditions for `Order` aggregates. */
export type OrdersHavingInput = {
  AND?: Maybe<Array<OrdersHavingInput>>;
  OR?: Maybe<Array<OrdersHavingInput>>;
  sum?: Maybe<OrdersHavingSumInput>;
  distinctCount?: Maybe<OrdersHavingDistinctCountInput>;
  min?: Maybe<OrdersHavingMinInput>;
  max?: Maybe<OrdersHavingMaxInput>;
  average?: Maybe<OrdersHavingAverageInput>;
  stddevSample?: Maybe<OrdersHavingStddevSampleInput>;
  stddevPopulation?: Maybe<OrdersHavingStddevPopulationInput>;
  varianceSample?: Maybe<OrdersHavingVarianceSampleInput>;
  variancePopulation?: Maybe<OrdersHavingVariancePopulationInput>;
};

export type OrdersHavingMaxInput = {
  timestamp?: Maybe<HavingDatetimeFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type OrdersHavingMinInput = {
  timestamp?: Maybe<HavingDatetimeFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type OrdersHavingStddevPopulationInput = {
  timestamp?: Maybe<HavingDatetimeFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type OrdersHavingStddevSampleInput = {
  timestamp?: Maybe<HavingDatetimeFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type OrdersHavingSumInput = {
  timestamp?: Maybe<HavingDatetimeFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type OrdersHavingVariancePopulationInput = {
  timestamp?: Maybe<HavingDatetimeFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type OrdersHavingVarianceSampleInput = {
  timestamp?: Maybe<HavingDatetimeFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

/** Methods to use when ordering `Order`. */
export enum OrdersOrderBy {
  Natural = 'NATURAL',
  TimestampAsc = 'TIMESTAMP_ASC',
  TimestampDesc = 'TIMESTAMP_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  CreditsAmountAsc = 'CREDITS_AMOUNT_ASC',
  CreditsAmountDesc = 'CREDITS_AMOUNT_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  BuyerAddressAsc = 'BUYER_ADDRESS_ASC',
  BuyerAddressDesc = 'BUYER_ADDRESS_DESC',
  TotalPriceAsc = 'TOTAL_PRICE_ASC',
  TotalPriceDesc = 'TOTAL_PRICE_DESC',
  AskDenomAsc = 'ASK_DENOM_ASC',
  AskDenomDesc = 'ASK_DENOM_DESC',
  RetiredCreditsAsc = 'RETIRED_CREDITS_ASC',
  RetiredCreditsDesc = 'RETIRED_CREDITS_DESC',
  RetirementReasonAsc = 'RETIREMENT_REASON_ASC',
  RetirementReasonDesc = 'RETIREMENT_REASON_DESC',
  RetirementJurisdictionAsc = 'RETIREMENT_JURISDICTION_ASC',
  RetirementJurisdictionDesc = 'RETIREMENT_JURISDICTION_DESC',
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

export type ProposalAggregates = {
  __typename?: 'ProposalAggregates';
  keys?: Maybe<Array<Scalars['String']>>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<ProposalSumAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<ProposalDistinctCountAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<ProposalMinAggregates>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<ProposalMaxAggregates>;
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<ProposalAverageAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<ProposalStddevSampleAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<ProposalStddevPopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<ProposalVarianceSampleAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<ProposalVariancePopulationAggregates>;
};

export type ProposalAverageAggregates = {
  __typename?: 'ProposalAverageAggregates';
  /** Mean average of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Mean average of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Mean average of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
  /** Mean average of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Mean average of proposalId across the matching connection */
  proposalId?: Maybe<Scalars['BigFloat']>;
  /** Mean average of groupVersion across the matching connection */
  groupVersion?: Maybe<Scalars['BigFloat']>;
  /** Mean average of groupPolicyVersion across the matching connection */
  groupPolicyVersion?: Maybe<Scalars['BigFloat']>;
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

export type ProposalDistinctCountAggregates = {
  __typename?: 'ProposalDistinctCountAggregates';
  /** Distinct count of type across the matching connection */
  type?: Maybe<Scalars['BigInt']>;
  /** Distinct count of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Distinct count of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigInt']>;
  /** Distinct count of timestamp across the matching connection */
  timestamp?: Maybe<Scalars['BigInt']>;
  /** Distinct count of txHash across the matching connection */
  txHash?: Maybe<Scalars['BigInt']>;
  /** Distinct count of proposalId across the matching connection */
  proposalId?: Maybe<Scalars['BigInt']>;
  /** Distinct count of status across the matching connection */
  status?: Maybe<Scalars['BigInt']>;
  /** Distinct count of groupPolicyAddress across the matching connection */
  groupPolicyAddress?: Maybe<Scalars['BigInt']>;
  /** Distinct count of metadata across the matching connection */
  metadata?: Maybe<Scalars['BigInt']>;
  /** Distinct count of proposers across the matching connection */
  proposers?: Maybe<Scalars['BigInt']>;
  /** Distinct count of submitTime across the matching connection */
  submitTime?: Maybe<Scalars['BigInt']>;
  /** Distinct count of groupVersion across the matching connection */
  groupVersion?: Maybe<Scalars['BigInt']>;
  /** Distinct count of groupPolicyVersion across the matching connection */
  groupPolicyVersion?: Maybe<Scalars['BigInt']>;
  /** Distinct count of finalTallyResult across the matching connection */
  finalTallyResult?: Maybe<Scalars['BigInt']>;
  /** Distinct count of votingPeriodEnd across the matching connection */
  votingPeriodEnd?: Maybe<Scalars['BigInt']>;
  /** Distinct count of executorResult across the matching connection */
  executorResult?: Maybe<Scalars['BigInt']>;
  /** Distinct count of messages across the matching connection */
  messages?: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `Proposal` object types. All fields are combined with a logical ‘and.’ */
export type ProposalFilter = {
  /** Filter by the object’s `type` field. */
  type?: Maybe<StringFilter>;
  /** Filter by the object’s `blockHeight` field. */
  blockHeight?: Maybe<BigIntFilter>;
  /** Filter by the object’s `txIdx` field. */
  txIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `msgIdx` field. */
  msgIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `chainNum` field. */
  chainNum?: Maybe<IntFilter>;
  /** Filter by the object’s `timestamp` field. */
  timestamp?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `txHash` field. */
  txHash?: Maybe<StringFilter>;
  /** Filter by the object’s `proposalId` field. */
  proposalId?: Maybe<BigIntFilter>;
  /** Filter by the object’s `status` field. */
  status?: Maybe<StringFilter>;
  /** Filter by the object’s `groupPolicyAddress` field. */
  groupPolicyAddress?: Maybe<StringFilter>;
  /** Filter by the object’s `metadata` field. */
  metadata?: Maybe<StringFilter>;
  /** Filter by the object’s `proposers` field. */
  proposers?: Maybe<StringListFilter>;
  /** Filter by the object’s `submitTime` field. */
  submitTime?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `groupVersion` field. */
  groupVersion?: Maybe<BigIntFilter>;
  /** Filter by the object’s `groupPolicyVersion` field. */
  groupPolicyVersion?: Maybe<BigIntFilter>;
  /** Filter by the object’s `finalTallyResult` field. */
  finalTallyResult?: Maybe<JsonFilter>;
  /** Filter by the object’s `votingPeriodEnd` field. */
  votingPeriodEnd?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `executorResult` field. */
  executorResult?: Maybe<StringFilter>;
  /** Filter by the object’s `messages` field. */
  messages?: Maybe<JsonFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ProposalFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ProposalFilter>>;
  /** Negates the expression. */
  not?: Maybe<ProposalFilter>;
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

export type ProposalMaxAggregates = {
  __typename?: 'ProposalMaxAggregates';
  /** Maximum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Maximum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
  /** Maximum of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['Int']>;
  /** Maximum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Maximum of proposalId across the matching connection */
  proposalId?: Maybe<Scalars['BigInt']>;
  /** Maximum of groupVersion across the matching connection */
  groupVersion?: Maybe<Scalars['BigInt']>;
  /** Maximum of groupPolicyVersion across the matching connection */
  groupPolicyVersion?: Maybe<Scalars['BigInt']>;
};

export type ProposalMinAggregates = {
  __typename?: 'ProposalMinAggregates';
  /** Minimum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Minimum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
  /** Minimum of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['Int']>;
  /** Minimum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Minimum of proposalId across the matching connection */
  proposalId?: Maybe<Scalars['BigInt']>;
  /** Minimum of groupVersion across the matching connection */
  groupVersion?: Maybe<Scalars['BigInt']>;
  /** Minimum of groupPolicyVersion across the matching connection */
  groupPolicyVersion?: Maybe<Scalars['BigInt']>;
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

export type ProposalStddevPopulationAggregates = {
  __typename?: 'ProposalStddevPopulationAggregates';
  /** Population standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of proposalId across the matching connection */
  proposalId?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of groupVersion across the matching connection */
  groupVersion?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of groupPolicyVersion across the matching connection */
  groupPolicyVersion?: Maybe<Scalars['BigFloat']>;
};

export type ProposalStddevSampleAggregates = {
  __typename?: 'ProposalStddevSampleAggregates';
  /** Sample standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of proposalId across the matching connection */
  proposalId?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of groupVersion across the matching connection */
  groupVersion?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of groupPolicyVersion across the matching connection */
  groupPolicyVersion?: Maybe<Scalars['BigFloat']>;
};

export type ProposalSumAggregates = {
  __typename?: 'ProposalSumAggregates';
  /** Sum of blockHeight across the matching connection */
  blockHeight: Scalars['BigFloat'];
  /** Sum of txIdx across the matching connection */
  txIdx: Scalars['BigInt'];
  /** Sum of msgIdx across the matching connection */
  msgIdx: Scalars['BigInt'];
  /** Sum of chainNum across the matching connection */
  chainNum: Scalars['BigInt'];
  /** Sum of proposalId across the matching connection */
  proposalId: Scalars['BigFloat'];
  /** Sum of groupVersion across the matching connection */
  groupVersion: Scalars['BigFloat'];
  /** Sum of groupPolicyVersion across the matching connection */
  groupPolicyVersion: Scalars['BigFloat'];
};

export type ProposalVariancePopulationAggregates = {
  __typename?: 'ProposalVariancePopulationAggregates';
  /** Population variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Population variance of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
  /** Population variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population variance of proposalId across the matching connection */
  proposalId?: Maybe<Scalars['BigFloat']>;
  /** Population variance of groupVersion across the matching connection */
  groupVersion?: Maybe<Scalars['BigFloat']>;
  /** Population variance of groupPolicyVersion across the matching connection */
  groupPolicyVersion?: Maybe<Scalars['BigFloat']>;
};

export type ProposalVarianceSampleAggregates = {
  __typename?: 'ProposalVarianceSampleAggregates';
  /** Sample variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of proposalId across the matching connection */
  proposalId?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of groupVersion across the matching connection */
  groupVersion?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of groupPolicyVersion across the matching connection */
  groupPolicyVersion?: Maybe<Scalars['BigFloat']>;
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
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<ProposalAggregates>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<ProposalAggregates>>;
};


/** A connection to a list of `Proposal` values. */
export type ProposalsConnectionGroupedAggregatesArgs = {
  groupBy: Array<ProposalsGroupBy>;
  having?: Maybe<ProposalsHavingInput>;
};

/** A `Proposal` edge in the connection. */
export type ProposalsEdge = {
  __typename?: 'ProposalsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Proposal` at the end of the edge. */
  node?: Maybe<Proposal>;
};

/** Grouping methods for `Proposal` for usage during aggregation. */
export enum ProposalsGroupBy {
  Type = 'TYPE',
  BlockHeight = 'BLOCK_HEIGHT',
  TxIdx = 'TX_IDX',
  MsgIdx = 'MSG_IDX',
  ChainNum = 'CHAIN_NUM',
  Timestamp = 'TIMESTAMP',
  TimestampTruncatedToHour = 'TIMESTAMP_TRUNCATED_TO_HOUR',
  TimestampTruncatedToDay = 'TIMESTAMP_TRUNCATED_TO_DAY',
  TxHash = 'TX_HASH',
  ProposalId = 'PROPOSAL_ID',
  Status = 'STATUS',
  GroupPolicyAddress = 'GROUP_POLICY_ADDRESS',
  Metadata = 'METADATA',
  Proposers = 'PROPOSERS',
  SubmitTime = 'SUBMIT_TIME',
  SubmitTimeTruncatedToHour = 'SUBMIT_TIME_TRUNCATED_TO_HOUR',
  SubmitTimeTruncatedToDay = 'SUBMIT_TIME_TRUNCATED_TO_DAY',
  GroupVersion = 'GROUP_VERSION',
  GroupPolicyVersion = 'GROUP_POLICY_VERSION',
  FinalTallyResult = 'FINAL_TALLY_RESULT',
  VotingPeriodEnd = 'VOTING_PERIOD_END',
  VotingPeriodEndTruncatedToHour = 'VOTING_PERIOD_END_TRUNCATED_TO_HOUR',
  VotingPeriodEndTruncatedToDay = 'VOTING_PERIOD_END_TRUNCATED_TO_DAY',
  ExecutorResult = 'EXECUTOR_RESULT',
  Messages = 'MESSAGES'
}

export type ProposalsHavingAverageInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
  proposalId?: Maybe<HavingBigintFilter>;
  submitTime?: Maybe<HavingDatetimeFilter>;
  groupVersion?: Maybe<HavingBigintFilter>;
  groupPolicyVersion?: Maybe<HavingBigintFilter>;
  votingPeriodEnd?: Maybe<HavingDatetimeFilter>;
};

export type ProposalsHavingDistinctCountInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
  proposalId?: Maybe<HavingBigintFilter>;
  submitTime?: Maybe<HavingDatetimeFilter>;
  groupVersion?: Maybe<HavingBigintFilter>;
  groupPolicyVersion?: Maybe<HavingBigintFilter>;
  votingPeriodEnd?: Maybe<HavingDatetimeFilter>;
};

/** Conditions for `Proposal` aggregates. */
export type ProposalsHavingInput = {
  AND?: Maybe<Array<ProposalsHavingInput>>;
  OR?: Maybe<Array<ProposalsHavingInput>>;
  sum?: Maybe<ProposalsHavingSumInput>;
  distinctCount?: Maybe<ProposalsHavingDistinctCountInput>;
  min?: Maybe<ProposalsHavingMinInput>;
  max?: Maybe<ProposalsHavingMaxInput>;
  average?: Maybe<ProposalsHavingAverageInput>;
  stddevSample?: Maybe<ProposalsHavingStddevSampleInput>;
  stddevPopulation?: Maybe<ProposalsHavingStddevPopulationInput>;
  varianceSample?: Maybe<ProposalsHavingVarianceSampleInput>;
  variancePopulation?: Maybe<ProposalsHavingVariancePopulationInput>;
};

export type ProposalsHavingMaxInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
  proposalId?: Maybe<HavingBigintFilter>;
  submitTime?: Maybe<HavingDatetimeFilter>;
  groupVersion?: Maybe<HavingBigintFilter>;
  groupPolicyVersion?: Maybe<HavingBigintFilter>;
  votingPeriodEnd?: Maybe<HavingDatetimeFilter>;
};

export type ProposalsHavingMinInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
  proposalId?: Maybe<HavingBigintFilter>;
  submitTime?: Maybe<HavingDatetimeFilter>;
  groupVersion?: Maybe<HavingBigintFilter>;
  groupPolicyVersion?: Maybe<HavingBigintFilter>;
  votingPeriodEnd?: Maybe<HavingDatetimeFilter>;
};

export type ProposalsHavingStddevPopulationInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
  proposalId?: Maybe<HavingBigintFilter>;
  submitTime?: Maybe<HavingDatetimeFilter>;
  groupVersion?: Maybe<HavingBigintFilter>;
  groupPolicyVersion?: Maybe<HavingBigintFilter>;
  votingPeriodEnd?: Maybe<HavingDatetimeFilter>;
};

export type ProposalsHavingStddevSampleInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
  proposalId?: Maybe<HavingBigintFilter>;
  submitTime?: Maybe<HavingDatetimeFilter>;
  groupVersion?: Maybe<HavingBigintFilter>;
  groupPolicyVersion?: Maybe<HavingBigintFilter>;
  votingPeriodEnd?: Maybe<HavingDatetimeFilter>;
};

export type ProposalsHavingSumInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
  proposalId?: Maybe<HavingBigintFilter>;
  submitTime?: Maybe<HavingDatetimeFilter>;
  groupVersion?: Maybe<HavingBigintFilter>;
  groupPolicyVersion?: Maybe<HavingBigintFilter>;
  votingPeriodEnd?: Maybe<HavingDatetimeFilter>;
};

export type ProposalsHavingVariancePopulationInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
  proposalId?: Maybe<HavingBigintFilter>;
  submitTime?: Maybe<HavingDatetimeFilter>;
  groupVersion?: Maybe<HavingBigintFilter>;
  groupPolicyVersion?: Maybe<HavingBigintFilter>;
  votingPeriodEnd?: Maybe<HavingDatetimeFilter>;
};

export type ProposalsHavingVarianceSampleInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
  proposalId?: Maybe<HavingBigintFilter>;
  submitTime?: Maybe<HavingDatetimeFilter>;
  groupVersion?: Maybe<HavingBigintFilter>;
  groupPolicyVersion?: Maybe<HavingBigintFilter>;
  votingPeriodEnd?: Maybe<HavingDatetimeFilter>;
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
  /** Reads and enables pagination through a set of `Order`. */
  allOrders?: Maybe<OrdersConnection>;
  /** Reads and enables pagination through a set of `Proposal`. */
  allProposals?: Maybe<ProposalsConnection>;
  /** Reads and enables pagination through a set of `Retirement`. */
  allRetirements?: Maybe<RetirementsConnection>;
  /** Reads and enables pagination through a set of `Tx`. */
  allTxes?: Maybe<TxesConnection>;
  /** Reads and enables pagination through a set of `UnifiedDataEvent`. */
  allUnifiedDataEvents?: Maybe<UnifiedDataEventsConnection>;
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
  orderByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndProjectIdAndAskDenom?: Maybe<Order>;
  proposalByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Proposal>;
  retirementByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<Retirement>;
  txByChainNumAndBlockHeightAndTxIdx?: Maybe<Tx>;
  txByHash?: Maybe<Tx>;
  unifiedDataEventByChainNumAndBlockHeightAndTxIdxAndMsgIdx?: Maybe<UnifiedDataEvent>;
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
  /** Reads a single `Order` using its globally unique `ID`. */
  order?: Maybe<Order>;
  /** Reads a single `Proposal` using its globally unique `ID`. */
  proposal?: Maybe<Proposal>;
  /** Reads a single `Retirement` using its globally unique `ID`. */
  retirement?: Maybe<Retirement>;
  /** Reads a single `Tx` using its globally unique `ID`. */
  tx?: Maybe<Tx>;
  /** Reads a single `UnifiedDataEvent` using its globally unique `ID`. */
  unifiedDataEvent?: Maybe<UnifiedDataEvent>;
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
  filter?: Maybe<BlockFilter>;
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
  filter?: Maybe<ChainFilter>;
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
  filter?: Maybe<ClassIssuerFilter>;
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
  filter?: Maybe<EventRetireFilter>;
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
  filter?: Maybe<EventRetireV1Filter>;
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
  filter?: Maybe<EventRetireV1Alpha1Filter>;
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
  filter?: Maybe<FlywaySchemaHistoryFilter>;
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
  filter?: Maybe<MsgFilter>;
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
  filter?: Maybe<MsgEventFilter>;
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
  filter?: Maybe<MsgEventAttrFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllOrdersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<OrdersOrderBy>>;
  condition?: Maybe<OrderCondition>;
  filter?: Maybe<OrderFilter>;
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
  filter?: Maybe<ProposalFilter>;
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
  filter?: Maybe<RetirementFilter>;
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
  filter?: Maybe<TxFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllUnifiedDataEventsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UnifiedDataEventsOrderBy>>;
  condition?: Maybe<UnifiedDataEventCondition>;
  filter?: Maybe<UnifiedDataEventFilter>;
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
  filter?: Maybe<VoteFilter>;
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
export type QueryOrderByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndProjectIdAndAskDenomArgs = {
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  projectId: Scalars['String'];
  askDenom: Scalars['String'];
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
export type QueryUnifiedDataEventByChainNumAndBlockHeightAndTxIdxAndMsgIdxArgs = {
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
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
  filter?: Maybe<TxFilter>;
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
export type QueryOrderArgs = {
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
export type QueryUnifiedDataEventArgs = {
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

export type RetirementAggregates = {
  __typename?: 'RetirementAggregates';
  keys?: Maybe<Array<Scalars['String']>>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<RetirementSumAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<RetirementDistinctCountAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<RetirementMinAggregates>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<RetirementMaxAggregates>;
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<RetirementAverageAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<RetirementStddevSampleAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<RetirementStddevPopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<RetirementVarianceSampleAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<RetirementVariancePopulationAggregates>;
};

export type RetirementAverageAggregates = {
  __typename?: 'RetirementAverageAggregates';
  /** Mean average of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Mean average of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Mean average of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Mean average of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
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

export type RetirementDistinctCountAggregates = {
  __typename?: 'RetirementDistinctCountAggregates';
  /** Distinct count of type across the matching connection */
  type?: Maybe<Scalars['BigInt']>;
  /** Distinct count of jurisdiction across the matching connection */
  jurisdiction?: Maybe<Scalars['BigInt']>;
  /** Distinct count of owner across the matching connection */
  owner?: Maybe<Scalars['BigInt']>;
  /** Distinct count of reason across the matching connection */
  reason?: Maybe<Scalars['BigInt']>;
  /** Distinct count of timestamp across the matching connection */
  timestamp?: Maybe<Scalars['BigInt']>;
  /** Distinct count of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Distinct count of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigInt']>;
  /** Distinct count of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of txHash across the matching connection */
  txHash?: Maybe<Scalars['BigInt']>;
  /** Distinct count of amount across the matching connection */
  amount?: Maybe<Scalars['BigInt']>;
  /** Distinct count of batchDenom across the matching connection */
  batchDenom?: Maybe<Scalars['BigInt']>;
  /** Distinct count of batchDenoms across the matching connection */
  batchDenoms?: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `Retirement` object types. All fields are combined with a logical ‘and.’ */
export type RetirementFilter = {
  /** Filter by the object’s `type` field. */
  type?: Maybe<StringFilter>;
  /** Filter by the object’s `jurisdiction` field. */
  jurisdiction?: Maybe<StringFilter>;
  /** Filter by the object’s `owner` field. */
  owner?: Maybe<StringFilter>;
  /** Filter by the object’s `reason` field. */
  reason?: Maybe<StringFilter>;
  /** Filter by the object’s `timestamp` field. */
  timestamp?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `blockHeight` field. */
  blockHeight?: Maybe<BigIntFilter>;
  /** Filter by the object’s `chainNum` field. */
  chainNum?: Maybe<IntFilter>;
  /** Filter by the object’s `txIdx` field. */
  txIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `msgIdx` field. */
  msgIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `txHash` field. */
  txHash?: Maybe<StringFilter>;
  /** Filter by the object’s `amount` field. */
  amount?: Maybe<StringFilter>;
  /** Filter by the object’s `batchDenom` field. */
  batchDenom?: Maybe<StringFilter>;
  /** Filter by the object’s `batchDenoms` field. */
  batchDenoms?: Maybe<StringListFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<RetirementFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<RetirementFilter>>;
  /** Negates the expression. */
  not?: Maybe<RetirementFilter>;
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

export type RetirementMaxAggregates = {
  __typename?: 'RetirementMaxAggregates';
  /** Maximum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Maximum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Maximum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
  /** Maximum of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['Int']>;
};

export type RetirementMinAggregates = {
  __typename?: 'RetirementMinAggregates';
  /** Minimum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Minimum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Minimum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
  /** Minimum of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['Int']>;
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

export type RetirementStddevPopulationAggregates = {
  __typename?: 'RetirementStddevPopulationAggregates';
  /** Population standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type RetirementStddevSampleAggregates = {
  __typename?: 'RetirementStddevSampleAggregates';
  /** Sample standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type RetirementSumAggregates = {
  __typename?: 'RetirementSumAggregates';
  /** Sum of blockHeight across the matching connection */
  blockHeight: Scalars['BigFloat'];
  /** Sum of chainNum across the matching connection */
  chainNum: Scalars['BigInt'];
  /** Sum of txIdx across the matching connection */
  txIdx: Scalars['BigInt'];
  /** Sum of msgIdx across the matching connection */
  msgIdx: Scalars['BigInt'];
};

export type RetirementVariancePopulationAggregates = {
  __typename?: 'RetirementVariancePopulationAggregates';
  /** Population variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Population variance of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type RetirementVarianceSampleAggregates = {
  __typename?: 'RetirementVarianceSampleAggregates';
  /** Sample variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
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
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<RetirementAggregates>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<RetirementAggregates>>;
};


/** A connection to a list of `Retirement` values. */
export type RetirementsConnectionGroupedAggregatesArgs = {
  groupBy: Array<RetirementsGroupBy>;
  having?: Maybe<RetirementsHavingInput>;
};

/** A `Retirement` edge in the connection. */
export type RetirementsEdge = {
  __typename?: 'RetirementsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Retirement` at the end of the edge. */
  node?: Maybe<Retirement>;
};

/** Grouping methods for `Retirement` for usage during aggregation. */
export enum RetirementsGroupBy {
  Type = 'TYPE',
  Jurisdiction = 'JURISDICTION',
  Owner = 'OWNER',
  Reason = 'REASON',
  Timestamp = 'TIMESTAMP',
  TimestampTruncatedToHour = 'TIMESTAMP_TRUNCATED_TO_HOUR',
  TimestampTruncatedToDay = 'TIMESTAMP_TRUNCATED_TO_DAY',
  BlockHeight = 'BLOCK_HEIGHT',
  ChainNum = 'CHAIN_NUM',
  TxIdx = 'TX_IDX',
  MsgIdx = 'MSG_IDX',
  TxHash = 'TX_HASH',
  Amount = 'AMOUNT',
  BatchDenom = 'BATCH_DENOM',
  BatchDenoms = 'BATCH_DENOMS'
}

export type RetirementsHavingAverageInput = {
  timestamp?: Maybe<HavingDatetimeFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type RetirementsHavingDistinctCountInput = {
  timestamp?: Maybe<HavingDatetimeFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

/** Conditions for `Retirement` aggregates. */
export type RetirementsHavingInput = {
  AND?: Maybe<Array<RetirementsHavingInput>>;
  OR?: Maybe<Array<RetirementsHavingInput>>;
  sum?: Maybe<RetirementsHavingSumInput>;
  distinctCount?: Maybe<RetirementsHavingDistinctCountInput>;
  min?: Maybe<RetirementsHavingMinInput>;
  max?: Maybe<RetirementsHavingMaxInput>;
  average?: Maybe<RetirementsHavingAverageInput>;
  stddevSample?: Maybe<RetirementsHavingStddevSampleInput>;
  stddevPopulation?: Maybe<RetirementsHavingStddevPopulationInput>;
  varianceSample?: Maybe<RetirementsHavingVarianceSampleInput>;
  variancePopulation?: Maybe<RetirementsHavingVariancePopulationInput>;
};

export type RetirementsHavingMaxInput = {
  timestamp?: Maybe<HavingDatetimeFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type RetirementsHavingMinInput = {
  timestamp?: Maybe<HavingDatetimeFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type RetirementsHavingStddevPopulationInput = {
  timestamp?: Maybe<HavingDatetimeFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type RetirementsHavingStddevSampleInput = {
  timestamp?: Maybe<HavingDatetimeFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type RetirementsHavingSumInput = {
  timestamp?: Maybe<HavingDatetimeFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type RetirementsHavingVariancePopulationInput = {
  timestamp?: Maybe<HavingDatetimeFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type RetirementsHavingVarianceSampleInput = {
  timestamp?: Maybe<HavingDatetimeFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
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

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['String']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['String']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['String']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['String']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['String']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['String']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['String']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['String']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['String']>;
  /** Contains the specified string (case-sensitive). */
  includes?: Maybe<Scalars['String']>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: Maybe<Scalars['String']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: Maybe<Scalars['String']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: Maybe<Scalars['String']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: Maybe<Scalars['String']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: Maybe<Scalars['String']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: Maybe<Scalars['String']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: Maybe<Scalars['String']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: Maybe<Scalars['String']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: Maybe<Scalars['String']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: Maybe<Scalars['String']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: Maybe<Scalars['String']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: Maybe<Scalars['String']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: Maybe<Scalars['String']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: Maybe<Scalars['String']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: Maybe<Scalars['String']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: Maybe<Scalars['String']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: Maybe<Scalars['String']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: Maybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: Maybe<Scalars['String']>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: Maybe<Array<Scalars['String']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: Maybe<Array<Scalars['String']>>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: Maybe<Scalars['String']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: Maybe<Scalars['String']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: Maybe<Scalars['String']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: Maybe<Scalars['String']>;
};

/** A filter to be used against String List fields. All fields are combined with a logical ‘and.’ */
export type StringListFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Contains the specified list of values. */
  contains?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Contained by the specified list of values. */
  containedBy?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Overlaps the specified list of values. */
  overlaps?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Any array item is equal to the specified value. */
  anyEqualTo?: Maybe<Scalars['String']>;
  /** Any array item is not equal to the specified value. */
  anyNotEqualTo?: Maybe<Scalars['String']>;
  /** Any array item is less than the specified value. */
  anyLessThan?: Maybe<Scalars['String']>;
  /** Any array item is less than or equal to the specified value. */
  anyLessThanOrEqualTo?: Maybe<Scalars['String']>;
  /** Any array item is greater than the specified value. */
  anyGreaterThan?: Maybe<Scalars['String']>;
  /** Any array item is greater than or equal to the specified value. */
  anyGreaterThanOrEqualTo?: Maybe<Scalars['String']>;
};

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
  filter?: Maybe<MsgFilter>;
};

export type TxAggregates = {
  __typename?: 'TxAggregates';
  keys?: Maybe<Array<Scalars['String']>>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<TxSumAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<TxDistinctCountAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<TxMinAggregates>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<TxMaxAggregates>;
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<TxAverageAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<TxStddevSampleAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<TxStddevPopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<TxVarianceSampleAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<TxVariancePopulationAggregates>;
};

export type TxAverageAggregates = {
  __typename?: 'TxAverageAggregates';
  /** Mean average of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Mean average of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Mean average of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
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

export type TxDistinctCountAggregates = {
  __typename?: 'TxDistinctCountAggregates';
  /** Distinct count of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigInt']>;
  /** Distinct count of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Distinct count of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of hash across the matching connection */
  hash?: Maybe<Scalars['BigInt']>;
  /** Distinct count of data across the matching connection */
  data?: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `Tx` object types. All fields are combined with a logical ‘and.’ */
export type TxFilter = {
  /** Filter by the object’s `chainNum` field. */
  chainNum?: Maybe<IntFilter>;
  /** Filter by the object’s `blockHeight` field. */
  blockHeight?: Maybe<BigIntFilter>;
  /** Filter by the object’s `txIdx` field. */
  txIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `data` field. */
  data?: Maybe<JsonFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<TxFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<TxFilter>>;
  /** Negates the expression. */
  not?: Maybe<TxFilter>;
};

/** Grouping methods for `Tx` for usage during aggregation. */
export enum TxGroupBy {
  ChainNum = 'CHAIN_NUM',
  BlockHeight = 'BLOCK_HEIGHT',
  TxIdx = 'TX_IDX',
  Data = 'DATA'
}

export type TxHavingAverageInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
};

export type TxHavingDistinctCountInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
};

/** Conditions for `Tx` aggregates. */
export type TxHavingInput = {
  AND?: Maybe<Array<TxHavingInput>>;
  OR?: Maybe<Array<TxHavingInput>>;
  sum?: Maybe<TxHavingSumInput>;
  distinctCount?: Maybe<TxHavingDistinctCountInput>;
  min?: Maybe<TxHavingMinInput>;
  max?: Maybe<TxHavingMaxInput>;
  average?: Maybe<TxHavingAverageInput>;
  stddevSample?: Maybe<TxHavingStddevSampleInput>;
  stddevPopulation?: Maybe<TxHavingStddevPopulationInput>;
  varianceSample?: Maybe<TxHavingVarianceSampleInput>;
  variancePopulation?: Maybe<TxHavingVariancePopulationInput>;
};

export type TxHavingMaxInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
};

export type TxHavingMinInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
};

export type TxHavingStddevPopulationInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
};

export type TxHavingStddevSampleInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
};

export type TxHavingSumInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
};

export type TxHavingVariancePopulationInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
};

export type TxHavingVarianceSampleInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
};

/** An input for mutations affecting `Tx` */
export type TxInput = {
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  hash: Scalars['String'];
  data: Scalars['JSON'];
};

export type TxMaxAggregates = {
  __typename?: 'TxMaxAggregates';
  /** Maximum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Maximum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Maximum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
};

export type TxMinAggregates = {
  __typename?: 'TxMinAggregates';
  /** Minimum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Minimum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Minimum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
};

/** Represents an update to a `Tx`. Fields that are set will be updated. */
export type TxPatch = {
  chainNum?: Maybe<Scalars['Int']>;
  blockHeight?: Maybe<Scalars['BigInt']>;
  txIdx?: Maybe<Scalars['Int']>;
  hash?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['JSON']>;
};

export type TxStddevPopulationAggregates = {
  __typename?: 'TxStddevPopulationAggregates';
  /** Population standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
};

export type TxStddevSampleAggregates = {
  __typename?: 'TxStddevSampleAggregates';
  /** Sample standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
};

export type TxSumAggregates = {
  __typename?: 'TxSumAggregates';
  /** Sum of chainNum across the matching connection */
  chainNum: Scalars['BigInt'];
  /** Sum of blockHeight across the matching connection */
  blockHeight: Scalars['BigFloat'];
  /** Sum of txIdx across the matching connection */
  txIdx: Scalars['BigInt'];
};

export type TxVariancePopulationAggregates = {
  __typename?: 'TxVariancePopulationAggregates';
  /** Population variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
};

export type TxVarianceSampleAggregates = {
  __typename?: 'TxVarianceSampleAggregates';
  /** Sample variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
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
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<TxAggregates>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<TxAggregates>>;
};


/** A connection to a list of `Tx` values. */
export type TxesConnectionGroupedAggregatesArgs = {
  groupBy: Array<TxGroupBy>;
  having?: Maybe<TxHavingInput>;
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
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxCountAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_COUNT_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxCountDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_COUNT_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxSumChainNumAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_SUM_CHAIN_NUM_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxSumChainNumDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_SUM_CHAIN_NUM_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxSumBlockHeightAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_SUM_BLOCK_HEIGHT_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxSumBlockHeightDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_SUM_BLOCK_HEIGHT_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxSumTxIdxAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_SUM_TX_IDX_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxSumTxIdxDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_SUM_TX_IDX_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxSumMsgIdxAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_SUM_MSG_IDX_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxSumMsgIdxDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_SUM_MSG_IDX_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxSumDataAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_SUM_DATA_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxSumDataDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_SUM_DATA_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxDistinctCountChainNumAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_DISTINCT_COUNT_CHAIN_NUM_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxDistinctCountChainNumDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_DISTINCT_COUNT_CHAIN_NUM_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxDistinctCountBlockHeightAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_DISTINCT_COUNT_BLOCK_HEIGHT_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxDistinctCountBlockHeightDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_DISTINCT_COUNT_BLOCK_HEIGHT_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxDistinctCountTxIdxAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_DISTINCT_COUNT_TX_IDX_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxDistinctCountTxIdxDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_DISTINCT_COUNT_TX_IDX_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxDistinctCountMsgIdxAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_DISTINCT_COUNT_MSG_IDX_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxDistinctCountMsgIdxDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_DISTINCT_COUNT_MSG_IDX_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxDistinctCountDataAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_DISTINCT_COUNT_DATA_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxDistinctCountDataDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_DISTINCT_COUNT_DATA_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxMinChainNumAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_MIN_CHAIN_NUM_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxMinChainNumDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_MIN_CHAIN_NUM_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxMinBlockHeightAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_MIN_BLOCK_HEIGHT_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxMinBlockHeightDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_MIN_BLOCK_HEIGHT_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxMinTxIdxAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_MIN_TX_IDX_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxMinTxIdxDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_MIN_TX_IDX_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxMinMsgIdxAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_MIN_MSG_IDX_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxMinMsgIdxDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_MIN_MSG_IDX_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxMinDataAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_MIN_DATA_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxMinDataDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_MIN_DATA_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxMaxChainNumAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_MAX_CHAIN_NUM_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxMaxChainNumDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_MAX_CHAIN_NUM_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxMaxBlockHeightAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_MAX_BLOCK_HEIGHT_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxMaxBlockHeightDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_MAX_BLOCK_HEIGHT_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxMaxTxIdxAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_MAX_TX_IDX_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxMaxTxIdxDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_MAX_TX_IDX_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxMaxMsgIdxAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_MAX_MSG_IDX_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxMaxMsgIdxDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_MAX_MSG_IDX_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxMaxDataAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_MAX_DATA_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxMaxDataDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_MAX_DATA_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxAverageChainNumAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AVERAGE_CHAIN_NUM_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxAverageChainNumDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AVERAGE_CHAIN_NUM_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxAverageBlockHeightAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AVERAGE_BLOCK_HEIGHT_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxAverageBlockHeightDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AVERAGE_BLOCK_HEIGHT_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxAverageTxIdxAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AVERAGE_TX_IDX_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxAverageTxIdxDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AVERAGE_TX_IDX_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxAverageMsgIdxAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AVERAGE_MSG_IDX_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxAverageMsgIdxDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AVERAGE_MSG_IDX_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxAverageDataAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AVERAGE_DATA_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxAverageDataDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_AVERAGE_DATA_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxStddevSampleChainNumAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_STDDEV_SAMPLE_CHAIN_NUM_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxStddevSampleChainNumDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_STDDEV_SAMPLE_CHAIN_NUM_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxStddevSampleBlockHeightAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_STDDEV_SAMPLE_BLOCK_HEIGHT_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxStddevSampleBlockHeightDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_STDDEV_SAMPLE_BLOCK_HEIGHT_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxStddevSampleTxIdxAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_STDDEV_SAMPLE_TX_IDX_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxStddevSampleTxIdxDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_STDDEV_SAMPLE_TX_IDX_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxStddevSampleMsgIdxAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_STDDEV_SAMPLE_MSG_IDX_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxStddevSampleMsgIdxDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_STDDEV_SAMPLE_MSG_IDX_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxStddevSampleDataAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_STDDEV_SAMPLE_DATA_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxStddevSampleDataDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_STDDEV_SAMPLE_DATA_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxStddevPopulationChainNumAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_STDDEV_POPULATION_CHAIN_NUM_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxStddevPopulationChainNumDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_STDDEV_POPULATION_CHAIN_NUM_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxStddevPopulationBlockHeightAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_STDDEV_POPULATION_BLOCK_HEIGHT_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxStddevPopulationBlockHeightDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_STDDEV_POPULATION_BLOCK_HEIGHT_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxStddevPopulationTxIdxAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_STDDEV_POPULATION_TX_IDX_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxStddevPopulationTxIdxDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_STDDEV_POPULATION_TX_IDX_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxStddevPopulationMsgIdxAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_STDDEV_POPULATION_MSG_IDX_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxStddevPopulationMsgIdxDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_STDDEV_POPULATION_MSG_IDX_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxStddevPopulationDataAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_STDDEV_POPULATION_DATA_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxStddevPopulationDataDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_STDDEV_POPULATION_DATA_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxVarianceSampleChainNumAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_VARIANCE_SAMPLE_CHAIN_NUM_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxVarianceSampleChainNumDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_VARIANCE_SAMPLE_CHAIN_NUM_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxVarianceSampleBlockHeightAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_VARIANCE_SAMPLE_BLOCK_HEIGHT_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxVarianceSampleBlockHeightDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_VARIANCE_SAMPLE_BLOCK_HEIGHT_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxVarianceSampleTxIdxAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_VARIANCE_SAMPLE_TX_IDX_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxVarianceSampleTxIdxDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_VARIANCE_SAMPLE_TX_IDX_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxVarianceSampleMsgIdxAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_VARIANCE_SAMPLE_MSG_IDX_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxVarianceSampleMsgIdxDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_VARIANCE_SAMPLE_MSG_IDX_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxVarianceSampleDataAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_VARIANCE_SAMPLE_DATA_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxVarianceSampleDataDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_VARIANCE_SAMPLE_DATA_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxVariancePopulationChainNumAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_VARIANCE_POPULATION_CHAIN_NUM_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxVariancePopulationChainNumDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_VARIANCE_POPULATION_CHAIN_NUM_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxVariancePopulationBlockHeightAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_VARIANCE_POPULATION_BLOCK_HEIGHT_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxVariancePopulationBlockHeightDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_VARIANCE_POPULATION_BLOCK_HEIGHT_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxVariancePopulationTxIdxAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_VARIANCE_POPULATION_TX_IDX_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxVariancePopulationTxIdxDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_VARIANCE_POPULATION_TX_IDX_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxVariancePopulationMsgIdxAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_VARIANCE_POPULATION_MSG_IDX_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxVariancePopulationMsgIdxDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_VARIANCE_POPULATION_MSG_IDX_DESC',
  MsgsByChainNumAndBlockHeightAndTxIdxVariancePopulationDataAsc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_VARIANCE_POPULATION_DATA_ASC',
  MsgsByChainNumAndBlockHeightAndTxIdxVariancePopulationDataDesc = 'MSGS_BY_CHAIN_NUM_AND_BLOCK_HEIGHT_AND_TX_IDX_VARIANCE_POPULATION_DATA_DESC'
}

export type UnifiedDataEvent = Node & {
  __typename?: 'UnifiedDataEvent';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  eventType?: Maybe<Scalars['String']>;
  iri?: Maybe<Scalars['String']>;
  attestor?: Maybe<Scalars['String']>;
  txHash?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['String']>;
};

export type UnifiedDataEventAggregates = {
  __typename?: 'UnifiedDataEventAggregates';
  keys?: Maybe<Array<Scalars['String']>>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<UnifiedDataEventSumAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<UnifiedDataEventDistinctCountAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<UnifiedDataEventMinAggregates>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<UnifiedDataEventMaxAggregates>;
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<UnifiedDataEventAverageAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<UnifiedDataEventStddevSampleAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<UnifiedDataEventStddevPopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<UnifiedDataEventVarianceSampleAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<UnifiedDataEventVariancePopulationAggregates>;
};

export type UnifiedDataEventAverageAggregates = {
  __typename?: 'UnifiedDataEventAverageAggregates';
  /** Mean average of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Mean average of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Mean average of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Mean average of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

/**
 * A condition to be used against `UnifiedDataEvent` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type UnifiedDataEventCondition = {
  /** Checks for equality with the object’s `chainNum` field. */
  chainNum?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `blockHeight` field. */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `txIdx` field. */
  txIdx?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `msgIdx` field. */
  msgIdx?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `eventType` field. */
  eventType?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `iri` field. */
  iri?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `attestor` field. */
  attestor?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `txHash` field. */
  txHash?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `timestamp` field. */
  timestamp?: Maybe<Scalars['String']>;
};

export type UnifiedDataEventDistinctCountAggregates = {
  __typename?: 'UnifiedDataEventDistinctCountAggregates';
  /** Distinct count of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigInt']>;
  /** Distinct count of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Distinct count of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of eventType across the matching connection */
  eventType?: Maybe<Scalars['BigInt']>;
  /** Distinct count of iri across the matching connection */
  iri?: Maybe<Scalars['BigInt']>;
  /** Distinct count of attestor across the matching connection */
  attestor?: Maybe<Scalars['BigInt']>;
  /** Distinct count of txHash across the matching connection */
  txHash?: Maybe<Scalars['BigInt']>;
  /** Distinct count of timestamp across the matching connection */
  timestamp?: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `UnifiedDataEvent` object types. All fields are combined with a logical ‘and.’ */
export type UnifiedDataEventFilter = {
  /** Filter by the object’s `chainNum` field. */
  chainNum?: Maybe<IntFilter>;
  /** Filter by the object’s `blockHeight` field. */
  blockHeight?: Maybe<BigIntFilter>;
  /** Filter by the object’s `txIdx` field. */
  txIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `msgIdx` field. */
  msgIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `eventType` field. */
  eventType?: Maybe<StringFilter>;
  /** Filter by the object’s `iri` field. */
  iri?: Maybe<StringFilter>;
  /** Filter by the object’s `attestor` field. */
  attestor?: Maybe<StringFilter>;
  /** Filter by the object’s `txHash` field. */
  txHash?: Maybe<StringFilter>;
  /** Filter by the object’s `timestamp` field. */
  timestamp?: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UnifiedDataEventFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UnifiedDataEventFilter>>;
  /** Negates the expression. */
  not?: Maybe<UnifiedDataEventFilter>;
};

/** Grouping methods for `UnifiedDataEvent` for usage during aggregation. */
export enum UnifiedDataEventGroupBy {
  ChainNum = 'CHAIN_NUM',
  BlockHeight = 'BLOCK_HEIGHT',
  TxIdx = 'TX_IDX',
  MsgIdx = 'MSG_IDX',
  EventType = 'EVENT_TYPE',
  Iri = 'IRI',
  Attestor = 'ATTESTOR',
  TxHash = 'TX_HASH',
  Timestamp = 'TIMESTAMP'
}

export type UnifiedDataEventHavingAverageInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type UnifiedDataEventHavingDistinctCountInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

/** Conditions for `UnifiedDataEvent` aggregates. */
export type UnifiedDataEventHavingInput = {
  AND?: Maybe<Array<UnifiedDataEventHavingInput>>;
  OR?: Maybe<Array<UnifiedDataEventHavingInput>>;
  sum?: Maybe<UnifiedDataEventHavingSumInput>;
  distinctCount?: Maybe<UnifiedDataEventHavingDistinctCountInput>;
  min?: Maybe<UnifiedDataEventHavingMinInput>;
  max?: Maybe<UnifiedDataEventHavingMaxInput>;
  average?: Maybe<UnifiedDataEventHavingAverageInput>;
  stddevSample?: Maybe<UnifiedDataEventHavingStddevSampleInput>;
  stddevPopulation?: Maybe<UnifiedDataEventHavingStddevPopulationInput>;
  varianceSample?: Maybe<UnifiedDataEventHavingVarianceSampleInput>;
  variancePopulation?: Maybe<UnifiedDataEventHavingVariancePopulationInput>;
};

export type UnifiedDataEventHavingMaxInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type UnifiedDataEventHavingMinInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type UnifiedDataEventHavingStddevPopulationInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type UnifiedDataEventHavingStddevSampleInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type UnifiedDataEventHavingSumInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type UnifiedDataEventHavingVariancePopulationInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type UnifiedDataEventHavingVarianceSampleInput = {
  chainNum?: Maybe<HavingIntFilter>;
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
};

export type UnifiedDataEventMaxAggregates = {
  __typename?: 'UnifiedDataEventMaxAggregates';
  /** Maximum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Maximum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Maximum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
  /** Maximum of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['Int']>;
};

export type UnifiedDataEventMinAggregates = {
  __typename?: 'UnifiedDataEventMinAggregates';
  /** Minimum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Minimum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Minimum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
  /** Minimum of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['Int']>;
};

export type UnifiedDataEventStddevPopulationAggregates = {
  __typename?: 'UnifiedDataEventStddevPopulationAggregates';
  /** Population standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type UnifiedDataEventStddevSampleAggregates = {
  __typename?: 'UnifiedDataEventStddevSampleAggregates';
  /** Sample standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type UnifiedDataEventSumAggregates = {
  __typename?: 'UnifiedDataEventSumAggregates';
  /** Sum of chainNum across the matching connection */
  chainNum: Scalars['BigInt'];
  /** Sum of blockHeight across the matching connection */
  blockHeight: Scalars['BigFloat'];
  /** Sum of txIdx across the matching connection */
  txIdx: Scalars['BigInt'];
  /** Sum of msgIdx across the matching connection */
  msgIdx: Scalars['BigInt'];
};

export type UnifiedDataEventVariancePopulationAggregates = {
  __typename?: 'UnifiedDataEventVariancePopulationAggregates';
  /** Population variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Population variance of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

export type UnifiedDataEventVarianceSampleAggregates = {
  __typename?: 'UnifiedDataEventVarianceSampleAggregates';
  /** Sample variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
};

/** A connection to a list of `UnifiedDataEvent` values. */
export type UnifiedDataEventsConnection = {
  __typename?: 'UnifiedDataEventsConnection';
  /** A list of `UnifiedDataEvent` objects. */
  nodes: Array<Maybe<UnifiedDataEvent>>;
  /** A list of edges which contains the `UnifiedDataEvent` and cursor to aid in pagination. */
  edges: Array<UnifiedDataEventsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UnifiedDataEvent` you could get from the connection. */
  totalCount: Scalars['Int'];
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<UnifiedDataEventAggregates>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<UnifiedDataEventAggregates>>;
};


/** A connection to a list of `UnifiedDataEvent` values. */
export type UnifiedDataEventsConnectionGroupedAggregatesArgs = {
  groupBy: Array<UnifiedDataEventGroupBy>;
  having?: Maybe<UnifiedDataEventHavingInput>;
};

/** A `UnifiedDataEvent` edge in the connection. */
export type UnifiedDataEventsEdge = {
  __typename?: 'UnifiedDataEventsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UnifiedDataEvent` at the end of the edge. */
  node?: Maybe<UnifiedDataEvent>;
};

/** Methods to use when ordering `UnifiedDataEvent`. */
export enum UnifiedDataEventsOrderBy {
  Natural = 'NATURAL',
  ChainNumAsc = 'CHAIN_NUM_ASC',
  ChainNumDesc = 'CHAIN_NUM_DESC',
  BlockHeightAsc = 'BLOCK_HEIGHT_ASC',
  BlockHeightDesc = 'BLOCK_HEIGHT_DESC',
  TxIdxAsc = 'TX_IDX_ASC',
  TxIdxDesc = 'TX_IDX_DESC',
  MsgIdxAsc = 'MSG_IDX_ASC',
  MsgIdxDesc = 'MSG_IDX_DESC',
  EventTypeAsc = 'EVENT_TYPE_ASC',
  EventTypeDesc = 'EVENT_TYPE_DESC',
  IriAsc = 'IRI_ASC',
  IriDesc = 'IRI_DESC',
  AttestorAsc = 'ATTESTOR_ASC',
  AttestorDesc = 'ATTESTOR_DESC',
  TxHashAsc = 'TX_HASH_ASC',
  TxHashDesc = 'TX_HASH_DESC',
  TimestampAsc = 'TIMESTAMP_ASC',
  TimestampDesc = 'TIMESTAMP_DESC',
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

/** All input for the `updateOrderByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndProjectIdAndAskDenom` mutation. */
export type UpdateOrderByChainNumAndBlockHeightAndTxIdxAndMsgIdxAndProjectIdAndAskDenomInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Order` being updated. */
  orderPatch: OrderPatch;
  chainNum: Scalars['Int'];
  blockHeight: Scalars['BigInt'];
  txIdx: Scalars['Int'];
  msgIdx: Scalars['Int'];
  projectId: Scalars['String'];
  askDenom: Scalars['String'];
};

/** All input for the `updateOrder` mutation. */
export type UpdateOrderInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Order` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Order` being updated. */
  orderPatch: OrderPatch;
};

/** The output of our update `Order` mutation. */
export type UpdateOrderPayload = {
  __typename?: 'UpdateOrderPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Order` that was updated by this mutation. */
  order?: Maybe<Order>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Order`. May be used by Relay 1. */
  orderEdge?: Maybe<OrdersEdge>;
};


/** The output of our update `Order` mutation. */
export type UpdateOrderPayloadOrderEdgeArgs = {
  orderBy?: Maybe<Array<OrdersOrderBy>>;
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

export type VoteAggregates = {
  __typename?: 'VoteAggregates';
  keys?: Maybe<Array<Scalars['String']>>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<VoteSumAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<VoteDistinctCountAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<VoteMinAggregates>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<VoteMaxAggregates>;
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<VoteAverageAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<VoteStddevSampleAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<VoteStddevPopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<VoteVarianceSampleAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<VoteVariancePopulationAggregates>;
};

export type VoteAverageAggregates = {
  __typename?: 'VoteAverageAggregates';
  /** Mean average of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Mean average of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Mean average of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
  /** Mean average of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Mean average of proposalId across the matching connection */
  proposalId?: Maybe<Scalars['BigFloat']>;
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

export type VoteDistinctCountAggregates = {
  __typename?: 'VoteDistinctCountAggregates';
  /** Distinct count of type across the matching connection */
  type?: Maybe<Scalars['BigInt']>;
  /** Distinct count of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Distinct count of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigInt']>;
  /** Distinct count of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigInt']>;
  /** Distinct count of timestamp across the matching connection */
  timestamp?: Maybe<Scalars['BigInt']>;
  /** Distinct count of txHash across the matching connection */
  txHash?: Maybe<Scalars['BigInt']>;
  /** Distinct count of proposalId across the matching connection */
  proposalId?: Maybe<Scalars['BigInt']>;
  /** Distinct count of voter across the matching connection */
  voter?: Maybe<Scalars['BigInt']>;
  /** Distinct count of option across the matching connection */
  option?: Maybe<Scalars['BigInt']>;
  /** Distinct count of metadata across the matching connection */
  metadata?: Maybe<Scalars['BigInt']>;
  /** Distinct count of submitTime across the matching connection */
  submitTime?: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `Vote` object types. All fields are combined with a logical ‘and.’ */
export type VoteFilter = {
  /** Filter by the object’s `type` field. */
  type?: Maybe<StringFilter>;
  /** Filter by the object’s `blockHeight` field. */
  blockHeight?: Maybe<BigIntFilter>;
  /** Filter by the object’s `txIdx` field. */
  txIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `msgIdx` field. */
  msgIdx?: Maybe<IntFilter>;
  /** Filter by the object’s `chainNum` field. */
  chainNum?: Maybe<IntFilter>;
  /** Filter by the object’s `timestamp` field. */
  timestamp?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `txHash` field. */
  txHash?: Maybe<StringFilter>;
  /** Filter by the object’s `proposalId` field. */
  proposalId?: Maybe<BigIntFilter>;
  /** Filter by the object’s `voter` field. */
  voter?: Maybe<StringFilter>;
  /** Filter by the object’s `option` field. */
  option?: Maybe<StringFilter>;
  /** Filter by the object’s `metadata` field. */
  metadata?: Maybe<StringFilter>;
  /** Filter by the object’s `submitTime` field. */
  submitTime?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<VoteFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<VoteFilter>>;
  /** Negates the expression. */
  not?: Maybe<VoteFilter>;
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

export type VoteMaxAggregates = {
  __typename?: 'VoteMaxAggregates';
  /** Maximum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Maximum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
  /** Maximum of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['Int']>;
  /** Maximum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Maximum of proposalId across the matching connection */
  proposalId?: Maybe<Scalars['BigInt']>;
};

export type VoteMinAggregates = {
  __typename?: 'VoteMinAggregates';
  /** Minimum of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigInt']>;
  /** Minimum of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['Int']>;
  /** Minimum of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['Int']>;
  /** Minimum of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['Int']>;
  /** Minimum of proposalId across the matching connection */
  proposalId?: Maybe<Scalars['BigInt']>;
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

export type VoteStddevPopulationAggregates = {
  __typename?: 'VoteStddevPopulationAggregates';
  /** Population standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of proposalId across the matching connection */
  proposalId?: Maybe<Scalars['BigFloat']>;
};

export type VoteStddevSampleAggregates = {
  __typename?: 'VoteStddevSampleAggregates';
  /** Sample standard deviation of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of proposalId across the matching connection */
  proposalId?: Maybe<Scalars['BigFloat']>;
};

export type VoteSumAggregates = {
  __typename?: 'VoteSumAggregates';
  /** Sum of blockHeight across the matching connection */
  blockHeight: Scalars['BigFloat'];
  /** Sum of txIdx across the matching connection */
  txIdx: Scalars['BigInt'];
  /** Sum of msgIdx across the matching connection */
  msgIdx: Scalars['BigInt'];
  /** Sum of chainNum across the matching connection */
  chainNum: Scalars['BigInt'];
  /** Sum of proposalId across the matching connection */
  proposalId: Scalars['BigFloat'];
};

export type VoteVariancePopulationAggregates = {
  __typename?: 'VoteVariancePopulationAggregates';
  /** Population variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Population variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Population variance of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
  /** Population variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Population variance of proposalId across the matching connection */
  proposalId?: Maybe<Scalars['BigFloat']>;
};

export type VoteVarianceSampleAggregates = {
  __typename?: 'VoteVarianceSampleAggregates';
  /** Sample variance of blockHeight across the matching connection */
  blockHeight?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of txIdx across the matching connection */
  txIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of msgIdx across the matching connection */
  msgIdx?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of chainNum across the matching connection */
  chainNum?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of proposalId across the matching connection */
  proposalId?: Maybe<Scalars['BigFloat']>;
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
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<VoteAggregates>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<VoteAggregates>>;
};


/** A connection to a list of `Vote` values. */
export type VotesConnectionGroupedAggregatesArgs = {
  groupBy: Array<VotesGroupBy>;
  having?: Maybe<VotesHavingInput>;
};

/** A `Vote` edge in the connection. */
export type VotesEdge = {
  __typename?: 'VotesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Vote` at the end of the edge. */
  node?: Maybe<Vote>;
};

/** Grouping methods for `Vote` for usage during aggregation. */
export enum VotesGroupBy {
  Type = 'TYPE',
  BlockHeight = 'BLOCK_HEIGHT',
  TxIdx = 'TX_IDX',
  MsgIdx = 'MSG_IDX',
  ChainNum = 'CHAIN_NUM',
  Timestamp = 'TIMESTAMP',
  TimestampTruncatedToHour = 'TIMESTAMP_TRUNCATED_TO_HOUR',
  TimestampTruncatedToDay = 'TIMESTAMP_TRUNCATED_TO_DAY',
  TxHash = 'TX_HASH',
  ProposalId = 'PROPOSAL_ID',
  Voter = 'VOTER',
  Option = 'OPTION',
  Metadata = 'METADATA',
  SubmitTime = 'SUBMIT_TIME',
  SubmitTimeTruncatedToHour = 'SUBMIT_TIME_TRUNCATED_TO_HOUR',
  SubmitTimeTruncatedToDay = 'SUBMIT_TIME_TRUNCATED_TO_DAY'
}

export type VotesHavingAverageInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
  proposalId?: Maybe<HavingBigintFilter>;
  submitTime?: Maybe<HavingDatetimeFilter>;
};

export type VotesHavingDistinctCountInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
  proposalId?: Maybe<HavingBigintFilter>;
  submitTime?: Maybe<HavingDatetimeFilter>;
};

/** Conditions for `Vote` aggregates. */
export type VotesHavingInput = {
  AND?: Maybe<Array<VotesHavingInput>>;
  OR?: Maybe<Array<VotesHavingInput>>;
  sum?: Maybe<VotesHavingSumInput>;
  distinctCount?: Maybe<VotesHavingDistinctCountInput>;
  min?: Maybe<VotesHavingMinInput>;
  max?: Maybe<VotesHavingMaxInput>;
  average?: Maybe<VotesHavingAverageInput>;
  stddevSample?: Maybe<VotesHavingStddevSampleInput>;
  stddevPopulation?: Maybe<VotesHavingStddevPopulationInput>;
  varianceSample?: Maybe<VotesHavingVarianceSampleInput>;
  variancePopulation?: Maybe<VotesHavingVariancePopulationInput>;
};

export type VotesHavingMaxInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
  proposalId?: Maybe<HavingBigintFilter>;
  submitTime?: Maybe<HavingDatetimeFilter>;
};

export type VotesHavingMinInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
  proposalId?: Maybe<HavingBigintFilter>;
  submitTime?: Maybe<HavingDatetimeFilter>;
};

export type VotesHavingStddevPopulationInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
  proposalId?: Maybe<HavingBigintFilter>;
  submitTime?: Maybe<HavingDatetimeFilter>;
};

export type VotesHavingStddevSampleInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
  proposalId?: Maybe<HavingBigintFilter>;
  submitTime?: Maybe<HavingDatetimeFilter>;
};

export type VotesHavingSumInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
  proposalId?: Maybe<HavingBigintFilter>;
  submitTime?: Maybe<HavingDatetimeFilter>;
};

export type VotesHavingVariancePopulationInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
  proposalId?: Maybe<HavingBigintFilter>;
  submitTime?: Maybe<HavingDatetimeFilter>;
};

export type VotesHavingVarianceSampleInput = {
  blockHeight?: Maybe<HavingBigintFilter>;
  txIdx?: Maybe<HavingIntFilter>;
  msgIdx?: Maybe<HavingIntFilter>;
  chainNum?: Maybe<HavingIntFilter>;
  timestamp?: Maybe<HavingDatetimeFilter>;
  proposalId?: Maybe<HavingBigintFilter>;
  submitTime?: Maybe<HavingDatetimeFilter>;
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

export type IndexerAllDataEventsByIriQueryVariables = Exact<{
  iri: Scalars['String'];
  eventTypeIncludes: Scalars['String'];
  orderBy?: Maybe<Array<UnifiedDataEventsOrderBy> | UnifiedDataEventsOrderBy>;
}>;


export type IndexerAllDataEventsByIriQuery = (
  { __typename?: 'Query' }
  & { allUnifiedDataEvents?: Maybe<(
    { __typename?: 'UnifiedDataEventsConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'UnifiedDataEvent' }
      & Pick<UnifiedDataEvent, 'iri' | 'attestor' | 'eventType' | 'blockHeight' | 'txHash' | 'timestamp'>
    )>> }
  )> }
);

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

export type IndexerOrdersByBuyerAddressQueryVariables = Exact<{
  buyerAddress: Scalars['String'];
}>;


export type IndexerOrdersByBuyerAddressQuery = (
  { __typename?: 'Query' }
  & { allOrders?: Maybe<(
    { __typename?: 'OrdersConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'Order' }
      & Pick<Order, 'timestamp' | 'creditsAmount' | 'projectId' | 'totalPrice' | 'askDenom' | 'retiredCredits' | 'retirementReason' | 'retirementJurisdiction' | 'txHash'>
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
  & { allRetirements?: Maybe<(
    { __typename?: 'RetirementsConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'Retirement' }
      & RetirementFieldsFragment
    )>> }
  )> }
);

export type RetirementFieldsFragment = (
  { __typename?: 'Retirement' }
  & Pick<Retirement, 'nodeId' | 'owner' | 'amount' | 'batchDenom' | 'batchDenoms' | 'jurisdiction' | 'timestamp' | 'reason' | 'txHash'>
);

export const RetirementFieldsFragmentDoc = gql`
    fragment retirementFields on Retirement {
  nodeId
  owner
  amount
  batchDenom
  batchDenoms
  jurisdiction
  timestamp
  reason
  txHash
}
    `;
export const IndexerAllDataEventsByIriDocument = gql`
    query IndexerAllDataEventsByIri($iri: String!, $eventTypeIncludes: String!, $orderBy: [UnifiedDataEventsOrderBy!]) {
  allUnifiedDataEvents(
    orderBy: $orderBy
    filter: {iri: {equalTo: $iri}, eventType: {includes: $eventTypeIncludes}}
  ) {
    nodes {
      iri
      attestor
      eventType
      blockHeight
      txHash
      timestamp
    }
  }
}
    `;

/**
 * __useIndexerAllDataEventsByIriQuery__
 *
 * To run a query within a React component, call `useIndexerAllDataEventsByIriQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndexerAllDataEventsByIriQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndexerAllDataEventsByIriQuery({
 *   variables: {
 *      iri: // value for 'iri'
 *      eventTypeIncludes: // value for 'eventTypeIncludes'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useIndexerAllDataEventsByIriQuery(baseOptions: Apollo.QueryHookOptions<IndexerAllDataEventsByIriQuery, IndexerAllDataEventsByIriQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IndexerAllDataEventsByIriQuery, IndexerAllDataEventsByIriQueryVariables>(IndexerAllDataEventsByIriDocument, options);
      }
export function useIndexerAllDataEventsByIriLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IndexerAllDataEventsByIriQuery, IndexerAllDataEventsByIriQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IndexerAllDataEventsByIriQuery, IndexerAllDataEventsByIriQueryVariables>(IndexerAllDataEventsByIriDocument, options);
        }
export type IndexerAllDataEventsByIriQueryHookResult = ReturnType<typeof useIndexerAllDataEventsByIriQuery>;
export type IndexerAllDataEventsByIriLazyQueryHookResult = ReturnType<typeof useIndexerAllDataEventsByIriLazyQuery>;
export type IndexerAllDataEventsByIriQueryResult = Apollo.QueryResult<IndexerAllDataEventsByIriQuery, IndexerAllDataEventsByIriQueryVariables>;
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
export const IndexerOrdersByBuyerAddressDocument = gql`
    query IndexerOrdersByBuyerAddress($buyerAddress: String!) {
  allOrders(condition: {buyerAddress: $buyerAddress}, orderBy: TIMESTAMP_DESC) {
    nodes {
      timestamp
      creditsAmount
      projectId
      totalPrice
      askDenom
      retiredCredits
      retirementReason
      retirementJurisdiction
      txHash
    }
  }
}
    `;

/**
 * __useIndexerOrdersByBuyerAddressQuery__
 *
 * To run a query within a React component, call `useIndexerOrdersByBuyerAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndexerOrdersByBuyerAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndexerOrdersByBuyerAddressQuery({
 *   variables: {
 *      buyerAddress: // value for 'buyerAddress'
 *   },
 * });
 */
export function useIndexerOrdersByBuyerAddressQuery(baseOptions: Apollo.QueryHookOptions<IndexerOrdersByBuyerAddressQuery, IndexerOrdersByBuyerAddressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IndexerOrdersByBuyerAddressQuery, IndexerOrdersByBuyerAddressQueryVariables>(IndexerOrdersByBuyerAddressDocument, options);
      }
export function useIndexerOrdersByBuyerAddressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IndexerOrdersByBuyerAddressQuery, IndexerOrdersByBuyerAddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IndexerOrdersByBuyerAddressQuery, IndexerOrdersByBuyerAddressQueryVariables>(IndexerOrdersByBuyerAddressDocument, options);
        }
export type IndexerOrdersByBuyerAddressQueryHookResult = ReturnType<typeof useIndexerOrdersByBuyerAddressQuery>;
export type IndexerOrdersByBuyerAddressLazyQueryHookResult = ReturnType<typeof useIndexerOrdersByBuyerAddressLazyQuery>;
export type IndexerOrdersByBuyerAddressQueryResult = Apollo.QueryResult<IndexerOrdersByBuyerAddressQuery, IndexerOrdersByBuyerAddressQueryVariables>;
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
  allRetirements(condition: {txHash: $txHash}, orderBy: TIMESTAMP_DESC) {
    nodes {
      ...retirementFields
    }
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