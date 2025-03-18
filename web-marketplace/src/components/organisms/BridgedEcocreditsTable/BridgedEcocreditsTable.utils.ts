import { TxBody } from '@regen-network/api/cosmos/tx/v1beta1/tx';
import dayjs from 'dayjs';

import { TxMessages } from './BridgedEcocreditsTable.types';

export const hasTxBody = (txBody: TxBody): txBody is TxBody => {
  return !!txBody;
};

export const hasMessages = (
  txMessages: Partial<TxMessages>,
): txMessages is TxMessages => {
  return !!txMessages.messages;
};

type IsQueryEnabledParams = {
  page: number;
  rowsPerPage: number;
  queryIndex: number;
};

export const isQueryEnabled = ({
  page,
  queryIndex,
  rowsPerPage,
}: IsQueryEnabledParams): boolean => {
  return (
    page * rowsPerPage <= queryIndex && queryIndex < (page + 1) * rowsPerPage
  );
};

type IsTimestampBelowDurationParams = {
  duration: number;
  timestamp: string;
};

export const isTimestampBelowDuration = ({
  duration,
  timestamp,
}: IsTimestampBelowDurationParams): boolean => {
  const now = dayjs();
  const pastDate = dayjs(timestamp);
  return now.diff(pastDate) < duration;
};
